/*
  # Add service_category and service_type columns to employer_requests

  Adds two columns `service_category` and `service_type` to `employer_requests` table
  and updates `create_employer_request` RPC procedure to accept p_service_category and p_service_type.
*/

ALTER TABLE employer_requests ADD COLUMN IF NOT EXISTS service_category text;
ALTER TABLE employer_requests ADD COLUMN IF NOT EXISTS service_type text;

CREATE OR REPLACE FUNCTION create_employer_request(
  p_company_name text,
  p_contact_person text,
  p_email text,
  p_phone text,
  p_services text[],
  p_number_of_personnel text,
  p_duration text,
  p_location text,
  p_message text,
  p_service_category text DEFAULT NULL,
  p_service_type text DEFAULT NULL
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE v_id uuid;
BEGIN
  INSERT INTO employer_requests
    (company_name, contact_person, email, phone, services_requested, number_of_personnel, duration, location, message, service_category, service_type)
  VALUES
    (p_company_name, p_contact_person, p_email, p_phone, p_services, p_number_of_personnel, p_duration, p_location, p_message, p_service_category, p_service_type)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;
