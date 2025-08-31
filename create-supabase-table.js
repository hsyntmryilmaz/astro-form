const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Creating users table in Supabase...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to create the users table
async function createUsersTable() {
  try {
    console.log('Connecting to Supabase...');
    
    // Since we can't execute DDL statements directly through the JS client,
    // we'll provide the SQL that needs to be executed in the Supabase dashboard
    console.log('\n📋 PLEASE FOLLOW THESE STEPS TO CREATE THE TABLE:');
    console.log('\n1. Go to your Supabase dashboard:');
    console.log('   https://app.supabase.com/project/' + supabaseUrl.split('/')[3] + '/sql');
    console.log('\n2. Click "New query"');
    console.log('\n3. Copy and paste the following SQL:');
    console.log('\n' + '='.repeat(50));
    console.log('-- Create the users table for astrological analysis reports');
    console.log('CREATE TABLE IF NOT EXISTS users (');
    console.log('  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,');
    console.log('  first_name TEXT NOT NULL,');
    console.log('  last_name TEXT NOT NULL,');
    console.log('  birth_date DATE NOT NULL,');
    console.log('  birth_time TIME NOT NULL,');
    console.log('  birth_place TEXT NOT NULL,');
    console.log('  face_image_path TEXT,');
    console.log('  hand_image_path TEXT,');
    console.log('  analysis_result JSONB,');
    console.log('  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()');
    console.log(');');
    console.log('');
    console.log('-- Add indexes for better query performance');
    console.log('CREATE INDEX IF NOT EXISTS idx_users_created_at ON users (created_at);');
    console.log('CREATE INDEX IF NOT EXISTS idx_users_last_name ON users (last_name);');
    console.log('');
    console.log('-- Enable RLS (Row Level Security) if needed');
    console.log('ALTER TABLE users ENABLE ROW LEVEL SECURITY;');
    console.log('='.repeat(50));
    console.log('\n4. Click "Run" to execute the query');
    console.log('\n✅ Once you\'ve completed these steps, your table will be ready!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createUsersTable();