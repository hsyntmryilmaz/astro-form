// Script to update Supabase schema with new authentication fields
const { supabase } = require('./services/database');

async function updateSchema() {
  try {
    console.log('Updating Supabase schema with authentication fields...');
    
    // Add email column
    const { error: emailError } = await supabase.rpc('execute_sql', {
      sql: "ALTER TABLE users ADD COLUMN IF NOT EXISTS email TEXT UNIQUE"
    });
    
    if (emailError) {
      console.log('Email column error:', emailError);
    } else {
      console.log('Email column added successfully');
    }
    
    // Add password_hash column
    const { error: passwordError } = await supabase.rpc('execute_sql', {
      sql: "ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash TEXT"
    });
    
    if (passwordError) {
      console.log('Password hash column error:', passwordError);
    } else {
      console.log('Password hash column added successfully');
    }
    
    // Add is_active column
    const { error: activeError } = await supabase.rpc('execute_sql', {
      sql: "ALTER TABLE users ADD COLUMN IF NOT EXISTS is_active BOOLEAN DEFAULT true"
    });
    
    if (activeError) {
      console.log('Is active column error:', activeError);
    } else {
      console.log('Is active column added successfully');
    }
    
    // Add email_verified column
    const { error: verifiedError } = await supabase.rpc('execute_sql', {
      sql: "ALTER TABLE users ADD COLUMN IF NOT EXISTS email_verified BOOLEAN DEFAULT false"
    });
    
    if (verifiedError) {
      console.log('Email verified column error:', verifiedError);
    } else {
      console.log('Email verified column added successfully');
    }
    
    console.log('Schema update completed!');
  } catch (error) {
    console.error('Schema update failed:', error.message);
  }
}

updateSchema();