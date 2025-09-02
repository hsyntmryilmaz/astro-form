// Script to check users table structure
const { supabase } = require('./services/database');

async function checkTable() {
  try {
    console.log('Checking users table structure...');
    
    // Get table info
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('Error:', error.message);
      return;
    }
    
    console.log('Table structure:');
    if (data && data.length > 0) {
      console.log('Columns:', Object.keys(data[0]));
    } else {
      console.log('Table is empty or does not exist');
    }
  } catch (error) {
    console.error('Check failed:', error.message);
  }
}

checkTable();