const { initializeDatabase } = require('./services/database');

// Initialize the database
initializeDatabase()
  .then(() => {
    console.log('Database initialized successfully');
    console.log('Please ensure you have created the users table in your Supabase project');
    console.log('Refer to SUPABASE_SETUP.md for detailed instructions');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  });