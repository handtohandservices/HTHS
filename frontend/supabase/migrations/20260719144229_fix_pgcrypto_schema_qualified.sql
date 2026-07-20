/*
# Fix pgcrypto function calls — schema-qualify as extensions.crypt / extensions.gen_salt

pgcrypto is installed in the `extensions` schema, which is not on the
search_path inside SECURITY DEFINER functions (search_path = public).
Schema-qualify all pgcrypto function calls so they resolve regardless of
the caller's search_path.

Functions updated: admin_sign_in, admin_create.
*/

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
  IF v_admin.password_hash IS NULL
     OR extensions.crypt(p_password, v_admin.password_hash) <> v_admin.password_hash THEN
    RETURN;
  END IF;

  v_token := md5(gen_random_uuid()::text) || md5(gen_random_uuid()::text);
  v_expires := now() + interval '7 days';

  INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (v_admin.id, v_token, v_expires);

  RETURN QUERY SELECT v_admin.id, v_admin.email, v_token, v_expires;
END;
$$;

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
  IF EXISTS (SELECT 1 FROM admins WHERE admins.email = p_email) THEN
    RETURN;
  END IF;

  v_token := md5(gen_random_uuid()::text) || md5(gen_random_uuid()::text);
  v_expires := now() + interval '7 days';

  INSERT INTO admins (email, password_hash)
    VALUES (p_email, extensions.crypt(p_password, extensions.gen_salt('bf')))
    RETURNING id INTO v_id;

  INSERT INTO admin_sessions (admin_id, token, expires_at)
    VALUES (v_id, v_token, v_expires);

  RETURN QUERY SELECT v_id, p_email, v_token, v_expires;
END;
$$;
