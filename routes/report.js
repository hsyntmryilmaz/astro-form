const express = require('express');
const { getUserData } = require('../services/database');

const router = express.Router();

// GET /api/report/:id endpoint
router.get('/report/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Get user data from database
    const userData = await getUserData(id);
    
    if (!userData) {
      return res.status(404).json({ error: 'Report not found' });
    }
    
    // Parse analysis result if it's a string
    let analysisResult;
    if (typeof userData.analysis_result === 'string') {
      try {
        analysisResult = JSON.parse(userData.analysis_result);
      } catch (e) {
        // If parsing fails, treat as plain text
        analysisResult = { analysis: userData.analysis_result };
      }
    } else {
      analysisResult = userData.analysis_result;
    }
    
    // Send HTML response
    res.send(generateReportHTML(userData, analysisResult));
    
  } catch (error) {
    console.error('Report error:', error);
    res.status(500).json({ 
      error: 'An error occurred while retrieving the report',
      message: error.message
    });
  }
});

/**
 * Generate HTML for the analysis report
 * @param {Object} userData - User information
 * @param {Object} analysisResult - Analysis result from AI
 * @returns {string} HTML string for the report
 */
function generateReportHTML(userData, analysisResult) {
  const analysisText = analysisResult.analysis || analysisResult || 'Analiz sonucu bulunamadı.';
  
  // Format the analysis text into sections if it contains specific keywords
  let formattedAnalysis = analysisText;
  if (typeof analysisText === 'string') {
    // Add some basic formatting for better readability
    formattedAnalysis = analysisText
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags if not already formatted
    if (!formattedAnalysis.startsWith('<p>')) {
      formattedAnalysis = `<p>${formattedAnalysis}</p>`;
    }
  }
  
  return `
  <!DOCTYPE html>
  <html lang="tr">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Astroloji Analiz Raporu</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 900px;
        margin: 0 auto;
        padding: 20px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
      }
      .report-container {
        background: white;
        border-radius: 15px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
        overflow: hidden;
      }
      .report-header {
        background: linear-gradient(120deg, #2c3e50, #3498db);
        color: white;
        padding: 30px;
        text-align: center;
      }
      .report-header h1 {
        margin: 0;
        font-size: 2.5em;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      .report-header p {
        font-size: 1.2em;
        opacity: 0.9;
        margin: 10px 0 0;
      }
      .report-content {
        padding: 30px;
      }
      .user-info-section {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 20px;
        margin-bottom: 30px;
        border-left: 5px solid #3498db;
      }
      .user-info-section h2 {
        color: #2c3e50;
        margin-top: 0;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
      }
      .user-info-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 15px;
        margin-top: 15px;
      }
      .info-item {
        background: white;
        padding: 15px;
        border-radius: 8px;
        box-shadow: 0 2px 5px rgba(0,0,0,0.1);
      }
      .info-label {
        font-weight: bold;
        color: #3498db;
        font-size: 0.9em;
        text-transform: uppercase;
        letter-spacing: 1px;
      }
      .info-value {
        font-size: 1.1em;
        margin-top: 5px;
      }
      .analysis-section {
        margin-top: 30px;
      }
      .analysis-section h2 {
        color: #2c3e50;
        border-bottom: 2px solid #eee;
        padding-bottom: 10px;
      }
      .analysis-content {
        background: #f8f9fa;
        border-radius: 10px;
        padding: 25px;
        line-height: 1.8;
      }
      .analysis-content p {
        margin: 0 0 15px 0;
        text-align: justify;
      }
      .model-info {
        display: flex;
        justify-content: space-between;
        margin-top: 30px;
        padding-top: 20px;
        border-top: 1px solid #eee;
        font-size: 0.9em;
        color: #666;
      }
      .model-info span {
        background: #e8f4fc;
        padding: 5px 10px;
        border-radius: 5px;
      }
      .footer {
        text-align: center;
        margin-top: 30px;
        padding: 20px;
        color: #7f8c8d;
        font-size: 0.9em;
        border-top: 1px solid #eee;
      }
      @media (max-width: 768px) {
        body {
          padding: 10px;
        }
        .report-header {
          padding: 20px;
        }
        .report-header h1 {
          font-size: 2em;
        }
        .report-content {
          padding: 20px;
        }
        .user-info-grid {
          grid-template-columns: 1fr;
        }
      }
    </style>
  </head>
  <body>
    <div class="report-container">
      <div class="report-header">
        <h1>Astroloji Analiz Raporu</h1>
        <p>${userData.first_name} ${userData.last_name} için kişisel yorum</p>
      </div>
      
      <div class="report-content">
        <div class="user-info-section">
          <h2>Kullanıcı Bilgileri</h2>
          <div class="user-info-grid">
            <div class="info-item">
              <div class="info-label">Ad Soyad</div>
              <div class="info-value">${userData.first_name} ${userData.last_name}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Doğum Tarihi</div>
              <div class="info-value">${userData.birth_date}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Doğum Saati</div>
              <div class="info-value">${userData.birth_time}</div>
            </div>
            <div class="info-item">
              <div class="info-label">Doğum Yeri</div>
              <div class="info-value">${userData.birth_place}</div>
            </div>
          </div>
        </div>
        
        <div class="analysis-section">
          <h2>Analiz Sonuçları</h2>
          <div class="analysis-content">
            ${formattedAnalysis}
          </div>
        </div>
        
        <div class="model-info">
          <div>AI Modeli: <span>${analysisResult.model || 'GPT-4o'}</span></div>
          <div>Tarih: <span>${analysisResult.timestamp ? new Date(analysisResult.timestamp).toLocaleString('tr-TR') : new Date(userData.created_at).toLocaleString('tr-TR')}</span></div>
        </div>
      </div>
      
      <div class="footer">
        <p>Bu rapor Astro-Form-Analyzer tarafından otomatik olarak oluşturulmuştur.</p>
      </div>
    </div>
  </body>
  </html>
  `;
}

module.exports = router;