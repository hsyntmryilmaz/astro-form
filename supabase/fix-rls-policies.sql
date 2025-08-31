-- Fix RLS policies for the users table
-- This script creates permissive policies to allow read and insert operations

-- First, ensure the table exists
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place TEXT NOT NULL,
  face_image_path TEXT,
  hand_image_path TEXT,
  analysis_result JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add indexes
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_name ON users (last_name);

-- Fix RLS policies
-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Enable read access for all users" ON users;
DROP POLICY IF EXISTS "Enable insert access for all users" ON users;

-- Create permissive policies
CREATE POLICY "Enable read access for all users" ON users
FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" ON users
FOR INSERT WITH CHECK (true);

-- Enable RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE users FORCE ROW LEVEL SECURITY;

-- Grant necessary permissions to anon role
GRANT ALL ON TABLE users TO anon;
GRANT ALL ON TABLE users TO authenticated;