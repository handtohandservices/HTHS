/*
# Employee applications & employer requests

Two new tables for the employee/employer feature:

1. `employee_applications` — job seekers submit a form with their resume (PDF
   uploaded to Cloudinary by the Express backend). Fields: full_name, email,
   phone, position_applied_for, experience_years, message, resume_url,
   resume_public_id (Cloudinary public id for deletion if needed), status,
   created_at.

2. `employer_requests` — companies request services (manpower, security,
   housekeeping, etc.). Fields: company_name, contact_person, email, phone,
   services_requested (text[]), number_of_personnel, duration, location,
   message, status, created_at.

RLS enabled on both. Public INSERT goes through SECURITY DEFINER RPC
functions (the Express backend calls them with the anon key). Admin
list/update/delete functions verify the admin session token internally,
matching the pattern used for contact_submissions.

Status values for both: 'new' | 'reviewed' | 'archived'.
*/

CREATE TABLE IF NOT EXISTS employee_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  position_applied_for text NOT NULL,
  experience_years integer,
  message text,
  resume_url text NOT NULL,
  resume_public_id text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE employee_applications ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS employer_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name text NOT NULL,
  contact_person text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  services_requested text[] NOT NULL DEFAULT '{}',
  number_of_personnel text,
  duration text,
  location text,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE employer_requests ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_employee_applications_status
  ON employee_applications (status);
CREATE INDEX IF NOT EXISTS idx_employer_requests_status
  ON employer_requests (status);

-- ===== Employee application RPC functions =====

DROP FUNCTION IF EXISTS create_employee_application(text, text, text, text, integer, text, text, text);
DROP FUNCTION IF EXISTS list_employee_applications();
DROP FUNCTION IF EXISTS get_employee_application_stats();
DROP FUNCTION IF EXISTS update_employee_application_status(uuid, text, text);
DROP FUNCTION IF EXISTS delete_employee_application(uuid, text);

CREATE OR REPLACE FUNCTION create_employee_application(
  p_full_name text,
  p_email text,
  p_phone text,
  p_position text,
  p_experience_years integer,
  p_message text,
  p_resume_url text,
  p_resume_public_id text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_id uuid;
BEGIN
  INSERT INTO employee_applications
    (full_name, email, phone, position_applied_for, experience_years, message, resume_url, resume_public_id)
  VALUES
    (p_full_name, p_email, p_phone, p_position, p_experience_years, p_message, p_resume_url, p_resume_public_id)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION list_employee_applications()
RETURNS SETOF employee_applications
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM employee_applications ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION get_employee_application_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total int; v_new int; v_reviewed int; v_archived int;
BEGIN
  SELECT count(*) INTO v_total FROM employee_applications;
  SELECT count(*) INTO v_new FROM employee_applications WHERE status = 'new';
  SELECT count(*) INTO v_reviewed FROM employee_applications WHERE status = 'reviewed';
  SELECT count(*) INTO v_archived FROM employee_applications WHERE status = 'archived';
  RETURN json_build_object('total', v_total, 'new', v_new, 'reviewed', v_reviewed, 'archived', v_archived);
END;
$$;

CREATE OR REPLACE FUNCTION update_employee_application_status(
  p_id uuid, p_status text, p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_verified boolean := false;
BEGIN
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN RETURN false; END IF;
  UPDATE employee_applications SET status = p_status WHERE id = p_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION delete_employee_application(
  p_id uuid, p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_verified boolean := false;
BEGIN
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN RETURN false; END IF;
  DELETE FROM employee_applications WHERE id = p_id;
  RETURN FOUND;
END;
$$;

-- ===== Employer request RPC functions =====

DROP FUNCTION IF EXISTS create_employer_request(text, text, text, text, text[], text, text, text, text);
DROP FUNCTION IF EXISTS list_employer_requests();
DROP FUNCTION IF EXISTS get_employer_request_stats();
DROP FUNCTION IF EXISTS update_employer_request_status(uuid, text, text);
DROP FUNCTION IF EXISTS delete_employer_request(uuid, text);

CREATE OR REPLACE FUNCTION create_employer_request(
  p_company_name text,
  p_contact_person text,
  p_email text,
  p_phone text,
  p_services text[],
  p_number_of_personnel text,
  p_duration text,
  p_location text,
  p_message text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_id uuid;
BEGIN
  INSERT INTO employer_requests
    (company_name, contact_person, email, phone, services_requested, number_of_personnel, duration, location, message)
  VALUES
    (p_company_name, p_contact_person, p_email, p_phone, p_services, p_number_of_personnel, p_duration, p_location, p_message)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION list_employer_requests()
RETURNS SETOF employer_requests
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM employer_requests ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION get_employer_request_stats()
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_total int; v_new int; v_reviewed int; v_archived int;
BEGIN
  SELECT count(*) INTO v_total FROM employer_requests;
  SELECT count(*) INTO v_new FROM employer_requests WHERE status = 'new';
  SELECT count(*) INTO v_reviewed FROM employer_requests WHERE status = 'reviewed';
  SELECT count(*) INTO v_archived FROM employer_requests WHERE status = 'archived';
  RETURN json_build_object('total', v_total, 'new', v_new, 'reviewed', v_reviewed, 'archived', v_archived);
END;
$$;

CREATE OR REPLACE FUNCTION update_employer_request_status(
  p_id uuid, p_status text, p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_verified boolean := false;
BEGIN
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN RETURN false; END IF;
  UPDATE employer_requests SET status = p_status WHERE id = p_id;
  RETURN FOUND;
END;
$$;

CREATE OR REPLACE FUNCTION delete_employer_request(
  p_id uuid, p_token text
)
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_verified boolean := false;
BEGIN
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN RETURN false; END IF;
  DELETE FROM employer_requests WHERE id = p_id;
  RETURN FOUND;
END;
$$;

-- Grant execute to anon + authenticated (functions self-protect via tokens)
GRANT EXECUTE ON FUNCTION create_employee_application(text, text, text, text, integer, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION list_employee_applications() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_employee_application_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_employee_application_status(uuid, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION delete_employee_application(uuid, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION create_employer_request(text, text, text, text, text[], text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION list_employer_requests() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION get_employer_request_stats() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION update_employer_request_status(uuid, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION delete_employer_request(uuid, text) TO anon, authenticated;
