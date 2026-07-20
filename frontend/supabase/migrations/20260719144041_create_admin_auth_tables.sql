/*
# Create admins and admin_sessions tables for Express backend auth

This migration introduces a custom admin authentication schema for the standalone
Express backend. Instead of relying on Supabase Auth JWTs stored in the browser,
the Express server issues opaque session tokens. Passwords are hashed server-side
with bcrypt and stored in `admins.password_hash`. Active sessions live in
`admin_sessions` and are looked up by token.

1. New Tables

- `admins`
  - `id` (uuid, primary key)
  - `email` (text, unique, not null) — admin login email
  - `password_hash` (text, not null) — bcrypt hash of the password
  - `created_at` (timestamptz, default now())

- `admin_sessions`
  - `id` (uuid, primary key)
  - `admin_id` (uuid, references admins.id ON DELETE CASCADE)
  - `token` (text, unique, not null) — opaque session token sent to the frontend
  - `expires_at` (timestamptz, not null) — when the session becomes invalid
  - `created_at` (timestamptz, default now())

2. Security — RLS

RLS is enabled on both tables. Because the Express backend will use the
service-role key (which bypasses RLS), the policies below are intentionally
restrictive for direct client access: the anon role has NO access. This ensures
that even if the anon key leaks, no admin data can be read or written from the
browser. All admin operations go through the Express server.

- admins: no policies for anon/authenticated (locked down).
- admin_sessions: no policies for anon/authenticated (locked down).

Note: the existing `contact_submissions` table and its policies remain unchanged.
The Express backend will read/write it with the service-role key. Public inserts
from the frontend will go through the Express API (server-side), not direct
Supabase calls.
*/

CREATE TABLE IF NOT EXISTS admins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS admin_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_id uuid NOT NULL REFERENCES admins(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE admin_sessions ENABLE ROW LEVEL SECURITY;

-- Index for token lookups
CREATE INDEX IF NOT EXISTS idx_admin_sessions_token
  ON admin_sessions (token);

-- Index for listing a user's sessions
CREATE INDEX IF NOT EXISTS idx_admin_sessions_admin_id
  ON admin_sessions (admin_id);
