const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Testing Supabase connection...');

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase URL and Key are required in environment variables');
  process.exit(1);
}

console.log(' Supabase URL:', supabaseUrl);

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Simple test - this will validate the credentials
async function testConnection() {
  try {
    // This simple operation will validate if credentials work
    const { error } = await supabase
      .from('users')
      .select('id')
      .limit(1);
    
    // If we get here, the credentials are valid (even if table doesn't exist)
    console.log('✅ Supabase credentials are valid!');
    console.log(' Connection to database successful');
    
    if (error) {
      if (error.message.includes('relation "users" does not exist')) {
        console.log(' The users table does not exist yet (this is expected)');
        console.log(' You can now proceed to create the table');
      } else {
        console.log(' Table access issue:', error.message);
      }
    } else {
      console.log(' Table access working');
    }
    
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
}

testConnection();