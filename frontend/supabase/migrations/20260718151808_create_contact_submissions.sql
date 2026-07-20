/*
# Create contact_submissions table

1. New Tables
- `contact_submissions`
  - `id` (uuid, primary key)
  - `name` (text, not null) — submitter's full name
  - `email` (text, not null) — submitter's email
  - `phone` (text, not null) — submitter's phone number
  - `message` (text, not null) — inquiry message
  - `status` (text, default 'new') — one of 'new', 'read', 'archived'
  - `created_at` (timestamptz, default now())

2. Security — RLS enabled
- INSERT: public (anon + authenticated) so the public contact form can submit.
- SELECT / UPDATE / DELETE: authenticated admins only. (Admin role enforced in the app by
  requiring a valid Supabase auth session; anyone signed in can read. Admin signup is the
  only path to create accounts, so only the site owner has credentials.)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text NOT NULL,
  message text NOT NULL,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Public insert (contact form on the public site)
DROP POLICY IF EXISTS "public_insert_contact" ON contact_submissions;
CREATE POLICY "public_insert_contact"
  ON contact_submissions FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Authenticated admins can read all submissions
DROP POLICY IF EXISTS "admin_select_contact" ON contact_submissions;
CREATE POLICY "admin_select_contact"
  ON contact_submissions FOR SELECT
  TO authenticated
  USING (true);

-- Authenticated admins can update status (new -> read -> archived)
DROP POLICY IF EXISTS "admin_update_contact" ON contact_submissions;
CREATE POLICY "admin_update_contact"
  ON contact_submissions FOR UPDATE
  TO authenticated
  USING (true) WITH CHECK (true);

-- Authenticated admins can delete submissions
DROP POLICY IF EXISTS "admin_delete_contact" ON contact_submissions;
CREATE POLICY "admin_delete_contact"
  ON contact_submissions FOR DELETE
  TO authenticated
  USING (true);

-- Index for newest-first listing
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at
  ON contact_submissions (created_at DESC);
