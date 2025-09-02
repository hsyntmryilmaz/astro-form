// Test authentication system
const { registerUser, loginUser } = require('./services/auth');

async function testAuth() {
  try {
    console.log('Testing authentication system...');
    
    // Test registration
    console.log('\n1. Testing user registration...');
    const newUser = {
      firstName: 'Test',
      lastName: 'User',
      email: 'test@example.com',
      password: 'password123',
      birthDate: '1990-01-01',
      birthTime: '12:00',
      birthPlace: 'Istanbul'
    };
    
    const registeredUser = await registerUser(newUser);
    console.log('Registration successful:', registeredUser);
    
    // Test login
    console.log('\n2. Testing user login...');
    const loggedInUser = await loginUser('test@example.com', 'password123');
    console.log('Login successful:', loggedInUser);
    
    console.log('\nAuthentication tests completed successfully!');
  } catch (error) {
    console.error('Authentication test failed:', error.message);
  }
}

testAuth();