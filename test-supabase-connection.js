const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Testing Supabase connection...');

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase URL and Key are required in environment variables');
  console.error('Please add them to your .env file:');
  console.error('SUPABASE_URL=your_supabase_project_url_here');
  console.error('SUPABASE_KEY=your_supabase_anon_key_here');
  process.exit(1);
}

console.log(' Supabase URL:', supabaseUrl);
console.log(' Supabase Key length:', supabaseKey.length, 'characters');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
async function testConnection() {
  try {
    // Try a simple query to test the connection
    const { data, error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    // If we get an error about the table not existing, that's expected and means connection works
    if (error && error.message.includes('relation "users" does not exist')) {
      console.log('✅ Connection successful!');
      console.log(' Database access working (users table does not exist yet, which is expected)');
    } else if (error) {
      console.error('❌ Connection failed:', error.message);
      console.error('Please check your Supabase URL and Key');
      process.exit(1);
    } else {
      console.log('✅ Connection successful!');
      console.log(' Database access working');
    }
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    console.error('Please check your Supabase URL and Key');
    process.exit(1);
  }
}

testConnection();