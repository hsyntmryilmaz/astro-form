const axios = require('axios');
const fs = require('fs');

/**
 * Analyze user data with z.ai
 * @param {Object} userData - User information and image paths
 * @returns {Promise<Object>} AI analysis result
 */
async function analyzeWithZAI(userData) {
  try {
    const { 
      firstName, 
      lastName, 
      birthDate, 
      birthTime, 
      birthPlace, 
      faceImagePath, 
      handImagePath 
    } = userData;
    
    // Create prompt for AI based on provided data
    let prompt = `Kullanıcı bilgileri: ${firstName} ${lastName}, ${birthDate}, ${birthTime}, ${birthPlace}.`;
    
    if (faceImagePath && handImagePath) {
      prompt += '\nAnaliz için yüz ve el fotoğrafları da gönderildi.';
    } else if (faceImagePath) {
      prompt += '\nAnaliz için sadece yüz fotoğrafı gönderildi.';
    } else if (handImagePath) {
      prompt += '\nAnaliz için sadece el (avuç içi) fotoğrafı gönderildi.';
    } else {
      prompt += '\nAnaliz için herhangi bir fotoğraf gönderilmedi. Sadece astrolojik analiz yapınız.';
    }
    
    prompt += '\nLütfen mevcut bilgilere göre kişisel yorum yapınız.';
    
    // Prepare request data for z.ai API
    const requestData = {
      prompt: prompt,
      // Add any other required parameters for z.ai API
    };
    
    // If images are provided, add them to the request
    if (faceImagePath) {
      // In a production environment, you would need to convert images to base64
      // and add them to the request data
      // requestData.faceImage = fs.readFileSync(faceImagePath, 'base64');
    }
    
    if (handImagePath) {
      // requestData.handImage = fs.readFileSync(handImagePath, 'base64');
    }
    
    // Make request to z.ai API
    const response = await axios.post(process.env.Z_AI_API_URL, requestData, {
      headers: {
        'Authorization': `Bearer ${process.env.Z_AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    
    // Return the analysis result
    const analysisText = response.data.result || response.data.analysis || 'Analiz sonucu alınamadı.';
    
    return {
      analysis: analysisText,
      model: "z.ai",
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('z.ai API error:', error);
    throw new Error('Failed to analyze with z.ai: ' + error.message);
  }
}

module.exports = {
  analyzeWithZAI
};