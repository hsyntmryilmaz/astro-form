const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('Error: Supabase URL and Key are required in environment variables');
  console.error('Please add them to your .env file:');
  console.error('SUPABASE_URL=your_supabase_project_url_here');
  console.error('SUPABASE_KEY=your_supabase_anon_key_here');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create the users table
async function createUsersTable() {
  try {
    console.log('Connecting to Supabase...');
    
    // Test the connection first
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    // If we get an error about the table not existing, that's expected
    if (error && !error.message.includes('relation "users" does not exist')) {
      console.error('Connection error:', error.message);
      process.exit(1);
    }
    
    console.log('Connection successful!');
    console.log('Creating users table...');
    
    // Create the users table using raw SQL
    const { error: createError } = await supabase.rpc('exec_sql', {
      sql: `
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
        
        CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);
        CREATE INDEX IF NOT EXISTS idx_users_last_name ON users (last_name);
      `
    });
    
    if (createError) {
      // If rpc method doesn't work, try direct approach
      console.log('Trying alternative method...');
      
      // Since we can't directly execute DDL statements through the JS client,
      // we'll show the SQL that needs to be executed
      console.log('\nPlease execute the following SQL in your Supabase SQL Editor:');
      console.log(`
-- Create the users table for astrological analysis reports
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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_name ON users (last_name);

-- Enable RLS (Row Level Security) if needed
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
      `);
      
      process.exit(1);
    } else {
      console.log('Users table created successfully!');
    }
    
  } catch (error) {
    console.error('Error:', error.message);
    
    // Provide instructions for manual setup
    console.log('\nPlease execute the following SQL in your Supabase SQL Editor:');
    console.log(`
-- Create the users table for astrological analysis reports
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

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);
CREATE INDEX IF NOT EXISTS idx_users_last_name ON users (last_name);
    `);
    
    process.exit(1);
  }
}

// Run the function
createUsersTable();