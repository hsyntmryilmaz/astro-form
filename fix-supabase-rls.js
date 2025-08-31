<<<<<<< HEAD
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

// Get Supabase credentials from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

console.log('Fixing Supabase RLS settings...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fix RLS settings
async function fixRLSSettings() {
  try {
    console.log('Connecting to Supabase...');
    
    // Provide instructions for fixing RLS settings
    console.log('\n🔧 RLS (Row Level Security) Fix Instructions:');
    console.log('\n1. Go to your Supabase dashboard:');
    console.log('   https://app.supabase.com');
    console.log('\n2. Select your project');
    console.log('\n3. Go to "Table Editor" and select the "users" table');
    console.log('\n4. Click on the "Policies" tab');
    console.log('\n5. You have two options:');
    console.log('\n   Option A: Disable RLS (Recommended for testing)');
    console.log('   - Toggle off "Enable Row Level Security"');
    console.log('\n   Option B: Create policies for the users table');
    console.log('   - Click "New policy"');
    console.log('   - Select "Enable read access for all users"');
    console.log('   - Click "Save"');
    console.log('   - Click "New policy" again');
    console.log('   - Select "Enable insert access for all users"');
    console.log('   - Click "Save"');
    console.log('\n6. Alternatively, you can run this SQL in the SQL Editor:');
    console.log('\n' + '='.repeat(50));
    console.log('-- Disable RLS for the users table (for testing only)');
    console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
    console.log('\n-- Or create permissive policies');
    console.log('CREATE POLICY "Enable read access for all users" ON users');
    console.log('FOR SELECT USING (true);');
    console.log('');
    console.log('CREATE POLICY "Enable insert access for all users" ON users');
    console.log('FOR INSERT WITH CHECK (true);');
    console.log('');
    console.log('ALTER TABLE users ENABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE users FORCE ROW LEVEL SECURITY;');
    console.log('='.repeat(50));
    
    console.log('\n✅ Once you\'ve applied one of these solutions, your app should work correctly!');
    
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

console.log('Fixing Supabase RLS settings...');

// Create Supabase client
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to fix RLS settings
async function fixRLSSettings() {
  try {
    console.log('Connecting to Supabase...');
    
    // Provide instructions for fixing RLS settings
    console.log('\n🔧 RLS (Row Level Security) Fix Instructions:');
    console.log('\n1. Go to your Supabase dashboard:');
    console.log('   https://app.supabase.com');
    console.log('\n2. Select your project');
    console.log('\n3. Go to "Table Editor" and select the "users" table');
    console.log('\n4. Click on the "Policies" tab');
    console.log('\n5. You have two options:');
    console.log('\n   Option A: Disable RLS (Recommended for testing)');
    console.log('   - Toggle off "Enable Row Level Security"');
    console.log('\n   Option B: Create policies for the users table');
    console.log('   - Click "New policy"');
    console.log('   - Select "Enable read access for all users"');
    console.log('   - Click "Save"');
    console.log('   - Click "New policy" again');
    console.log('   - Select "Enable insert access for all users"');
    console.log('   - Click "Save"');
    console.log('\n6. Alternatively, you can run this SQL in the SQL Editor:');
    console.log('\n' + '='.repeat(50));
    console.log('-- Disable RLS for the users table (for testing only)');
    console.log('ALTER TABLE users DISABLE ROW LEVEL SECURITY;');
    console.log('\n-- Or create permissive policies');
    console.log('CREATE POLICY "Enable read access for all users" ON users');
    console.log('FOR SELECT USING (true);');
    console.log('');
    console.log('CREATE POLICY "Enable insert access for all users" ON users');
    console.log('FOR INSERT WITH CHECK (true);');
    console.log('');
    console.log('ALTER TABLE users ENABLE ROW LEVEL SECURITY;');
    console.log('ALTER TABLE users FORCE ROW LEVEL SECURITY;');
    console.log('='.repeat(50));
    
    console.log('\n✅ Once you\'ve applied one of these solutions, your app should work correctly!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

>>>>>>> 4939126ee5c953624a0df2c93b0c18153fd12173
fixRLSSettings();