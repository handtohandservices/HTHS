-- ===== Add Admin Password Reset RPC function =====

CREATE OR REPLACE FUNCTION admin_reset_password(
  p_token text,
  p_new_password text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_admin_id uuid;
BEGIN
  -- Verify the session and get the admin_id
  SELECT admin_id INTO v_admin_id
  FROM admin_sessions
  WHERE token = p_token AND expires_at > now();

  IF v_admin_id IS NULL THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  -- Update the password in admins table
  UPDATE admins
  SET password_hash = extensions.crypt(p_new_password, extensions.gen_salt('bf'))
  WHERE id = v_admin_id;

  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION admin_reset_password(text, text) TO anon, authenticated;
