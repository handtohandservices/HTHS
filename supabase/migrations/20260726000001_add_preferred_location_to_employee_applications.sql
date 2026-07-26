/*
  # Add preferred_location column to employee_applications

  Adds column `preferred_location` to `employee_applications` table
  and updates `create_employee_application` RPC procedure to accept p_preferred_location.
*/

ALTER TABLE employee_applications ADD COLUMN IF NOT EXISTS preferred_location text;

CREATE OR REPLACE FUNCTION create_employee_application(
  p_full_name text,
  p_email text,
  p_phone text,
  p_position text,
  p_experience_years integer,
  p_message text,
  p_resume_url text,
  p_resume_public_id text,
  p_preferred_location text DEFAULT NULL
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
    (full_name, email, phone, position_applied_for, experience_years, message, resume_url, resume_public_id, preferred_location)
  VALUES
    (p_full_name, p_email, p_phone, p_position, p_experience_years, p_message, p_resume_url, p_resume_public_id, p_preferred_location)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
