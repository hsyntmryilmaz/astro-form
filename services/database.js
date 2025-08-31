const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Supabase URL and Key are required in environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

/**
 * Save user data and analysis result to database
 * @param {Object} userData - User information and analysis result
 * @returns {Promise<Object>} Saved record
 */
async function saveUserData(userData) {
  try {
    const {
      firstName,
      lastName,
      birthDate,
      birthTime,
      birthPlace,
      faceImagePath,
      handImagePath,
      analysisResult
    } = userData;

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          first_name: firstName,
          last_name: lastName,
          birth_date: birthDate,
          birth_time: birthTime,
          birth_place: birthPlace,
          face_image_path: faceImagePath,
          hand_image_path: handImagePath,
          analysis_result: JSON.stringify(analysisResult)
        }
      ])
      .select()
      .single();

    if (error) {
      throw new Error('Failed to save user data: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to save user data: ' + error.message);
  }
}

/**
 * Get user data by ID
 * @param {string} id - User ID
 * @returns {Promise<Object>} User record
 */
async function getUserData(id) {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      throw new Error('Failed to retrieve user data: ' + error.message);
    }

    return data;
  } catch (error) {
    console.error('Database error:', error);
    throw new Error('Failed to retrieve user data: ' + error.message);
  }
}

/**
 * Initialize database tables
 * Note: With Supabase, tables are created through the Supabase dashboard
 * This function is kept for compatibility but doesn't perform any action
 */
async function initializeDatabase() {
  console.log('With Supabase, tables should be created through the Supabase dashboard');
  console.log('Please ensure the users table exists with the required columns');
  return Promise.resolve();
}

module.exports = {
  saveUserData,
  getUserData,
  initializeDatabase
};