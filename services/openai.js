const OpenAI = require('openai');
const fs = require('fs');

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Analyze user data with AI
 * @param {Object} userData - User information and image paths
 * @returns {Promise<Object>} AI analysis result
 */
async function analyzeWithAI(userData) {
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
    
    // Prepare messages for chat completion
    const messages = [
      {
        role: "system",
        content: "You are an expert astrologer and palm reader. Analyze the provided information and provide a detailed personal analysis. If face or hand images are not provided, only analyze the astrological information. If images are provided, include face reading and palm reading in your analysis."
      },
      {
        role: "user",
        content: prompt
      }
    ];
    
    // If images are provided, we would add them to the messages
    // Note: In a production environment, you would need to convert images to base64
    // and add them to the messages array
    
    // For now, we'll make a simple text-based request
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: messages,
      max_tokens: 1500, // Increased token limit for more detailed analysis
      temperature: 0.7
    });
    
    // Return the analysis result
    const analysisText = response.choices[0].message.content;
    
    return {
      analysis: analysisText,
      model: "gpt-4o",
      timestamp: new Date().toISOString()
    };
    
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to analyze with AI: ' + error.message);
  }
}

module.exports = {
  analyzeWithAI
};