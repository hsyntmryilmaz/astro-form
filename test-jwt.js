// Test JWT functionality
const jwt = require('jsonwebtoken');
const { secret, expiresIn } = require('./config/jwt');

function testJWT() {
  try {
    console.log('Testing JWT functionality...');
    
    // Create a test payload
    const payload = {
      id: '12345',
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User'
    };
    
    // Generate token
    const token = jwt.sign(payload, secret, { expiresIn });
    console.log('Generated token:', token);
    
    // Verify token
    const decoded = jwt.verify(token, secret);
    console.log('Decoded token:', decoded);
    
    console.log('JWT tests completed successfully!');
  } catch (error) {
    console.error('JWT test failed:', error.message);
  }
}

testJWT();