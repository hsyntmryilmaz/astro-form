// Script to update users table with new columns
const { supabase } = require('./services/database');

async function updateTable() {
  try {
    console.log('Updating users table with new columns...');
    
    // Try to add columns one by one using Supabase's alter table functionality
    const updates = [
      { name: 'email', type: 'text', isUnique: true },
      { name: 'password_hash', type: 'text' },
      { name: 'is_active', type: 'boolean', default: true },
      { name: 'email_verified', type: 'boolean', default: false },
      { name: 'verification_token', type: 'text' },
      { name: 'reset_token', type: 'text' },
      { name: 'reset_token_expires', type: 'timestamp with time zone' }
    ];
    
    for (const column of updates) {
      try {
        console.log(`Adding column: ${column.name}`);
        
        // For Supabase, we need to use the proper syntax
        let query = `ALTER TABLE users ADD COLUMN IF NOT EXISTS ${column.name} ${column.type}`;
        
        if (column.default !== undefined) {
          if (column.type === 'boolean') {
            query += ` DEFAULT ${column.default}`;
          } else {
            query += ` DEFAULT '${column.default}'`;
          }
        }
        
        if (column.isUnique) {
          query += ' UNIQUE';
        }
        
        console.log(`Executing: ${query}`);
        
        // Try to execute the query
        const { error } = await supabase.rpc('execute_sql', { sql: query });
        
        if (error) {
          console.log(`Warning: ${error.message}`);
        } else {
          console.log('Success');
        }
      } catch (err) {
        console.log(`Error adding ${column.name}: ${err.message}`);
      }
    }
    
    console.log('Table update completed!');
  } catch (error) {
    console.error('Update failed:', error.message);
  }
}

updateTable();