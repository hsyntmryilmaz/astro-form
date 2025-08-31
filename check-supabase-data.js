<<<<<<< HEAD
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Checking Supabase data...');

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase URL and Key are required in environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check if data is being saved
async function checkSupabaseData() {
  try {
    console.log('Connecting to Supabase...');
    
    // Check if the users table exists and has data
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) {
      if (error.message.includes('relation "users" does not exist')) {
        console.log('❌ Users table does not exist yet');
        console.log('Please create the table using the SQL script provided earlier');
        return;
      } else {
        console.error('❌ Error querying users table:', error.message);
        return;
      }
    }
    
    console.log(`✅ Successfully connected to Supabase!`);
    console.log(`📊 Found ${count} records in the users table`);
    
    if (data && data.length > 0) {
      console.log('\n📋 Latest 5 records:');
      data.forEach((record, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log(`ID: ${record.id}`);
        console.log(`Name: ${record.first_name} ${record.last_name}`);
        console.log(`Birth Date: ${record.birth_date}`);
        console.log(`Birth Time: ${record.birth_time}`);
        console.log(`Birth Place: ${record.birth_place}`);
        console.log(`Created At: ${record.created_at}`);
        if (record.face_image_path) {
          console.log(`Face Image: ${record.face_image_path}`);
        }
        if (record.hand_image_path) {
          console.log(`Hand Image: ${record.hand_image_path}`);
        }
        if (record.analysis_result) {
          console.log('Analysis Result: Data exists (not showing full content for brevity)');
        }
      });
    } else {
      console.log('\n📝 No records found in the users table yet');
      console.log('This is normal if you haven\'t submitted any forms yet');
    }
    
    console.log('\n✅ Supabase integration is working correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

=======
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Checking Supabase data...');

// Validate credentials
if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Error: Supabase URL and Key are required in environment variables');
  process.exit(1);
}

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to check if data is being saved
async function checkSupabaseData() {
  try {
    console.log('Connecting to Supabase...');
    
    // Check if the users table exists and has data
    const { data, error, count } = await supabase
      .from('users')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);
    
    if (error) {
      if (error.message.includes('relation "users" does not exist')) {
        console.log('❌ Users table does not exist yet');
        console.log('Please create the table using the SQL script provided earlier');
        return;
      } else {
        console.error('❌ Error querying users table:', error.message);
        return;
      }
    }
    
    console.log(`✅ Successfully connected to Supabase!`);
    console.log(`📊 Found ${count} records in the users table`);
    
    if (data && data.length > 0) {
      console.log('\n📋 Latest 5 records:');
      data.forEach((record, index) => {
        console.log(`\n--- Record ${index + 1} ---`);
        console.log(`ID: ${record.id}`);
        console.log(`Name: ${record.first_name} ${record.last_name}`);
        console.log(`Birth Date: ${record.birth_date}`);
        console.log(`Birth Time: ${record.birth_time}`);
        console.log(`Birth Place: ${record.birth_place}`);
        console.log(`Created At: ${record.created_at}`);
        if (record.face_image_path) {
          console.log(`Face Image: ${record.face_image_path}`);
        }
        if (record.hand_image_path) {
          console.log(`Hand Image: ${record.hand_image_path}`);
        }
        if (record.analysis_result) {
          console.log('Analysis Result: Data exists (not showing full content for brevity)');
        }
      });
    } else {
      console.log('\n📝 No records found in the users table yet');
      console.log('This is normal if you haven\'t submitted any forms yet');
    }
    
    console.log('\n✅ Supabase integration is working correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

>>>>>>> 4939126ee5c953624a0df2c93b0c18153fd12173
checkSupabaseData();