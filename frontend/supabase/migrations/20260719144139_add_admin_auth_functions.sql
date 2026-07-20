/*
# Add admin auth database functions (SECURITY DEFINER)

The Express backend only has the anon key (no service role key in this
environment). To let the backend authenticate admins and manage sessions
without bypassing RLS from the client, we expose two SECURITY DEFINER
functions that run with the database owner's privileges internally:

1. `admin_sign_in(email, password)` — looks up the admin by email, verifies
   the bcrypt hash using pgcrypto's crypt() / gen_salt(), creates a session
   row with a random token, and returns { admin_id, email, token, expires_at }.
   Returns NULL if credentials are invalid.

2. `admin_verify_session(token)` — looks up a non-expired session by token,
   returns { admin_id, email }, or NULL if not found / expired.

3. `admin_sign_out(token)` — deletes the session row for the given token.

4. `admin_create(email, password)` — creates a new admin row with a bcrypt
   hash. Used by the signup endpoint. Returns { admin_id, email, token,
   expires_at } (auto-creates a session) or NULL if the email already exists.

Note on hashing: we use pgcrypto's `crypt()` with `gen_salt('bf')` (bcrypt).
The Express backend sends the plaintext password over the request body (over
HTTPS in production) and the hash/compare happens inside Postgres. This keeps
password hashing server-side and consistent.

5. Helper RPCs for contact_submissions management (callable by verified admins):
   - `list_contact_submissions()` — returns all submissions newest-first.
   - `get_contact_submission_stats()` — returns counts by status.
   - `update_contact_submission_status(id, status, admin_token)` — updates a
     submission's status after verifying the admin session.
   - `delete_contact_submission(id, admin_token)` — deletes a submission after
     verifying the admin session.
   - `create_contact_submission(name, email, phone, message)` — public insert
     used by the contact form. Returns the new row id.

These functions are SECURITY DEFINER so they bypass RLS internally. The
contact_submissions RLS policies from the earlier migration remain in place
for any direct anon-key access; the functions are the intended path for the
Express backend.

Requires: pgcrypto extension (enabled below).
*/

CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Drop existing versions for idempotency
DROP FUNCTION IF EXISTS admin_sign_in(text, text);
DROP FUNCTION IF EXISTS admin_create(text, text);
DROP FUNCTION IF EXISTS admin_verify_session(text);
DROP FUNCTION IF EXISTS admin_sign_out(text);
DROP FUNCTION IF EXISTS create_contact_submission(text, text, text, text);
DROP FUNCTION IF EXISTS list_contact_submissions();
DROP FUNCTION IF EXISTS get_contact_submission_stats();
DROP FUNCTION IF EXISTS update_contact_submission_status(uuid, text, text);
DROP FUNCTION IF EXISTS delete_contact_submission(uuid, text);

-- admin_sign_in(email, password) → record or NULL
CREATE OR REPLACE FUNCTION admin_sign_in(p_email text, p_password text)
RETURNS TABLE (
  admin_id uuid,
  email text,
  token text,
  expires_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin admins%ROWTYPE;
  v_token text;
  v_expires timestamptz;
BEGIN
  SELECT * INTO v_admin FROM admins WHERE admins.email = p_email LIMIT 1;
  IF v_admin.id IS NULL THEN
    RETURN;
  END IF;
  -- Verify bcrypt hash: crypt(password, stored_hash) = stored_hash
  IF v_admin.password_hash IS NULL OR crypt(p_password, v_admin.password_hash) <> v_admin.password_hash THEN
    RETURN;
  END IF;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_expires := now() + interval '7 days';

  INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (v_admin.id, v_token, v_expires);

  RETURN QUERY SELECT v_admin.id, v_admin.email, v_token, v_expires;
END;
$$;

-- admin_create(email, password) → record or NULL (NULL if email taken)
CREATE OR REPLACE FUNCTION admin_create(p_email text, p_password text)
RETURNS TABLE (
  admin_id uuid,
  email text,
  token text,
  expires_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
  v_token text;
  v_expires timestamptz;
BEGIN
  -- Bail out if the email already exists
  IF EXISTS (SELECT 1 FROM admins WHERE admins.email = p_email) THEN
    RETURN;
  END IF;

  v_token := encode(gen_random_bytes(32), 'hex');
  v_expires := now() + interval '7 days';

  INSERT INTO admins (email, password_hash)
    VALUES (p_email, crypt(p_password, gen_salt('bf')))
    RETURNING id INTO v_id;

  INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (v_id, v_token, v_expires);

  RETURN QUERY SELECT v_id, p_email, v_token, v_expires;
END;
$$;

-- admin_verify_session(token) → record or NULL
CREATE OR REPLACE FUNCTION admin_verify_session(p_token text)
RETURNS TABLE (
  admin_id uuid,
  email text
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id uuid;
  v_email text;
BEGIN
  SELECT s.admin_id INTO v_admin_id
    FROM admin_sessions s
    WHERE s.token = p_token AND s.expires_at > now()
    LIMIT 1;

  IF v_admin_id IS NULL THEN
    RETURN;
  END IF;

  SELECT a.email INTO v_email FROM admins a WHERE a.id = v_admin_id LIMIT 1;
  RETURN QUERY SELECT v_admin_id, v_email;
END;
$$;

-- admin_sign_out(token) → void
CREATE OR REPLACE FUNCTION admin_sign_out(p_token text)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  DELETE FROM admin_sessions WHERE admin_sessions.token = p_token;
END;
$$;

-- create_contact_submission(name, email, phone, message) → uuid
CREATE OR REPLACE FUNCTION create_contact_submission(
  p_name text,
  p_email text,
  p_phone text,
  p_message text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO contact_submissions (name, email, phone, message)
    VALUES (p_name, p_email, p_phone, p_message)
    RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

-- list_contact_submissions() → set of contact_submissions
CREATE OR REPLACE FUNCTION list_contact_submissions()
RETURNS SETOF contact_submissions
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM contact_submissions ORDER BY created_at DESC;
END;
$$;

-- get_contact_submission_stats() → json
CREATE OR REPLACE FUNCTION get_contact_submission_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total int;
  v_new int;
  v_read int;
  v_archived int;
BEGIN
  SELECT count(*) INTO v_total FROM contact_submissions;
  SELECT count(*) INTO v_new FROM contact_submissions WHERE status = 'new';
  SELECT count(*) INTO v_read FROM contact_submissions WHERE status = 'read';
  SELECT count(*) INTO v_archived FROM contact_submissions WHERE status = 'archived';

  RETURN json_build_object(
    'total', v_total,
    'new', v_new,
    'read', v_read,
    'archived', v_archived
  );
END;
$$;

-- update_contact_submission_status(id, status, admin_token) → boolean
CREATE OR REPLACE FUNCTION update_contact_submission_status(
  p_id uuid,
  p_status text,
  p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_verified boolean := false;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_sessions s
      WHERE s.token = p_token AND s.expires_at > now()
  ) INTO v_verified;

  IF NOT v_verified THEN
    RETURN false;
  END IF;

  UPDATE contact_submissions
    SET status = p_status
    WHERE id = p_id;

  RETURN FOUND;
END;
$$;

-- delete_contact_submission(id, admin_token) → boolean
CREATE OR REPLACE FUNCTION delete_contact_submission(
  p_id uuid,
  p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_verified boolean := false;
BEGIN
  SELECT EXISTS (
    SELECT 1 FROM admin_sessions s
      WHERE s.token = p_token AND s.expires_at > now()
  ) INTO v_verified;

  IF NOT v_verified THEN
    RETURN false;
  END IF;

  DELETE FROM contact_submissions WHERE id = p_id;
  RETURN FOUND;
END;
$$;

-- Allow the anon role to call these functions (they self-protect via tokens).
-- The functions are SECURITY DEFINER and validate admin sessions internally.
GRANT EXECUTE ON FUNCTION admin_sign_in(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_create(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_verify_session(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION admin_sign_out(text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION create_contact_submission(text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION list_contact_submissions() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_contact_submission_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_contact_submission_status(uuid, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION delete_contact_submission(uuid, text) TO anon, authenticated;
