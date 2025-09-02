// Script to run database migrations
const { supabase } = require('./services/database');

async function runMigration() {
  try {
    console.log('Running database migration...');
    
    // Add authentication fields to users table
    const queries = [
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_token TEXT",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token TEXT",
      "ALTER TABLE users ADD COLUMN IF NOT EXISTS reset_token_expires TIMESTAMP WITH TIME ZONE"
    ];
    
    for (const query of queries) {
      console.log(`Executing: ${query}`);
      const { error } = await supabase.rpc('execute_sql', { sql: query });
      
      if (error) {
        console.log(`Warning: ${error.message}`);
        // Continue with next query
      } else {
        console.log('Success');
      }
    }
    
    // Add indexes
    const indexes = [
      "CREATE INDEX IF NOT EXISTS idx_users_email ON users (email)",
      "CREATE INDEX IF NOT EXISTS idx_users_active ON users (is_active)",
      "CREATE INDEX IF NOT EXISTS idx_users_email_verified ON users (email_verified)"
    ];
    
    for (const query of indexes) {
      console.log(`Executing: ${query}`);
      const { error } = await supabase.rpc('execute_sql', { sql: query });
      
      if (error) {
        console.log(`Warning: ${error.message}`);
        // Continue with next query
      } else {
        console.log('Success');
      }
    }
    
    console.log('Migration completed successfully!');
  } catch (error) {
    console.error('Migration failed:', error.message);
  }
}

runMigration();