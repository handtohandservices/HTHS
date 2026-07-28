/*
# Create gallery_items table and operations
*/

CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  category text NOT NULL,
  category_slug text NOT NULL,
  src text NOT NULL,
  alt text NOT NULL,
  location text NOT NULL,
  image_public_id text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE gallery_items ENABLE ROW LEVEL SECURITY;

CREATE INDEX IF NOT EXISTS idx_gallery_items_category_slug ON gallery_items (category_slug);

-- Pre-seed current data
INSERT INTO gallery_items (title, category, category_slug, src, alt, location)
VALUES
  ('PSARA Verified Security Guards Deployment', 'Private Security', 'security', '/Private_Security.jpeg', 'Security guards standing in formation', 'Corporate Tower, South Delhi'),
  ('Commercial Deep Cleaning & Janitorial Operations', 'Housekeeping & Facilities', 'housekeeping', '/Housekeeping.jpeg', 'Housekeeping team cleaning office premises', 'IT Park, Gurgaon'),
  ('VIP Escort & Event Bouncer Management', 'Events & Cultural', 'events', '/Event_Organization.jpeg', 'Event security personnel at stage venue', 'Exhibition Center, New Delhi'),
  ('Traditional Cultural Festival Stage Production', 'Events & Cultural', 'events', '/Cultural_Programs.jpeg', 'Cultural dance stage performance', 'Auditorium, Noida'),
  ('Fire Safety, First Aid & Skill Training Workshop', 'Skill & AI Training', 'training', '/Health_Education.jpeg', 'Security personnel in training workshop', 'Training Center, Delhi NCR'),
  ('Lady Guard Training & Empowerment Program', 'Women Empowerment', 'women-empowerment', '/Women_Empowerment.jpeg', 'Lady security guards in professional attire', 'Community Facility, Bhopal'),
  ('Corporate Fleet & Tour Transportation Vehicles', 'Logistics & Supplies', 'logistics', '/Tour_Travel.jpeg', 'Tour travel luxury bus fleet', 'Delhi-NCR Route'),
  ('Express Document Courier & Cargo Dispatch', 'Logistics & Supplies', 'logistics', '/Courier_Cargo.jpeg', 'Logistics cargo truck and courier parcels', 'Distribution Center, Indore'),
  ('Government Tender Materials & Safety Uniforms', 'Logistics & Supplies', 'logistics', '/Government_Private.jpeg', 'Tender procurement supplies warehouse', 'Supply Depot, South Delhi'),
  ('ISO 9001:2015 Quality Systems Audit & Certification', 'Private Security', 'security', '/ISO.png', 'ISO Certification symbol and quality badge', 'Head Office, New Delhi'),
  ('CCTV Control Room & 24/7 Gate Surveillance', 'Private Security', 'security', 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=1200&q=80', 'Surveillance monitors in control room', 'Industrial Hub, Pithampur'),
  ('Corporate Entrance Access Control Guarding', 'Private Security', 'security', 'https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&w=1200&q=80', 'Corporate entrance security checkpoint', 'Financial Center, Delhi NCR'),
  ('Sanitization & Office Desk Deep Cleaning', 'Housekeeping & Facilities', 'housekeeping', 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80', 'Professional office sanitizer at work', 'Commercial Complex, Gurgaon'),
  ('Industrial Floor Machine Polishing & Maintenance', 'Housekeeping & Facilities', 'housekeeping', 'https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=1200&q=80', 'Industrial floor scrubber machine operation', 'Warehouse Center, Noida'),
  ('High-Profile Concert VIP Escort & Stage Lighting', 'Events & Cultural', 'events', 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80', 'Stage lights and crowd security control', 'Stadia Ground, New Delhi'),
  ('Practical AI & Digital Literacy Workshop for Staff', 'Skill & AI Training', 'training', 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80', 'Staff members interacting during computer workshop', 'Skill Academy, South Delhi'),
  ('Front Desk & Hospitality Executive Placement', 'Women Empowerment', 'women-empowerment', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1200&q=80', 'Executive woman in corporate setting', 'Corporate Office, Noida'),
  ('Express Parcel Cargo Distribution Logistics', 'Logistics & Supplies', 'logistics', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80', 'Cargo warehouse loading operation', 'Logistics Park, Greater Noida');

-- ===== Gallery Item RPC functions =====

DROP FUNCTION IF EXISTS list_gallery_items();
DROP FUNCTION IF EXISTS create_gallery_item(text, text, text, text, text, text, text, text);
DROP FUNCTION IF EXISTS delete_gallery_item(uuid, text);

CREATE OR REPLACE FUNCTION list_gallery_items()
RETURNS SETOF gallery_items
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY SELECT * FROM gallery_items ORDER BY created_at DESC;
END;
$$;

CREATE OR REPLACE FUNCTION create_gallery_item(
  p_title text,
  p_category text,
  p_category_slug text,
  p_src text,
  p_alt text,
  p_location text,
  p_image_public_id text,
  p_token text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_verified boolean := false;
  v_id uuid;
BEGIN
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  INSERT INTO gallery_items
    (title, category, category_slug, src, alt, location, image_public_id)
  VALUES
    (p_title, p_category, p_category_slug, p_src, p_alt, p_location, p_image_public_id)
  RETURNING id INTO v_id;
  RETURN v_id;
END;
$$;

CREATE OR REPLACE FUNCTION delete_gallery_item(
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
  SELECT EXISTS (SELECT 1 FROM admin_sessions s WHERE s.token = p_token AND s.expires_at > now())
    INTO v_verified;
  IF NOT v_verified THEN
    RAISE EXCEPTION 'Unauthorized';
  END IF;

  DELETE FROM gallery_items WHERE id = p_id;
  RETURN FOUND;
END;
$$;

GRANT EXECUTE ON FUNCTION list_gallery_items() TO anon, authenticated;
GRANT EXECUTE ON FUNCTION create_gallery_item(text, text, text, text, text, text, text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION delete_gallery_item(uuid, text) TO anon, authenticated;
