const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { analyzeWithAI } = require('../services/openai');
const { analyzeWithZAI } = require('../services/zai');
const { saveUserData } = require('../services/database');

const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '..', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

// POST /api/analyze endpoint
router.post('/analyze', upload.fields([
  { name: 'faceImage', maxCount: 1 },
  { name: 'handImage', maxCount: 1 }
]), async (req, res) => {
  try {
    // Extract form data
    const { firstName, lastName, birthDate, birthTime, birthPlace } = req.body;
    
    // Validate required fields
    if (!firstName || !lastName || !birthDate || !birthTime || !birthPlace) {
      return res.status(400).json({ 
        error: 'All required fields must be provided' 
      });
    }
    
    // Get file paths if images were uploaded
    const faceImagePath = req.files && req.files.faceImage ? 
      req.files.faceImage[0].path : null;
    const handImagePath = req.files && req.files.handImage ? 
      req.files.handImage[0].path : null;
    
    // Determine which AI model to use based on environment variable
    const aiModel = process.env.AI_MODEL || '1';
    let analysisResult;
    
    if (aiModel === '2') {
      // Use z.ai model
      analysisResult = await analyzeWithZAI({
        firstName,
        lastName,
        birthDate,
        birthTime,
        birthPlace,
        faceImagePath,
        handImagePath
      });
    } else {
      // Use OpenAI GPT-4o model (default)
      analysisResult = await analyzeWithAI({
        firstName,
        lastName,
        birthDate,
        birthTime,
        birthPlace,
        faceImagePath,
        handImagePath
      });
    }
    
    // Save to database
    const userData = {
      firstName,
      lastName,
      birthDate,
      birthTime,
      birthPlace,
      faceImagePath,
      handImagePath,
      analysisResult
    };
    
    const savedRecord = await saveUserData(userData);
    
    // Return result with report URL
    res.json({
      success: true,
      data: savedRecord,
      reportUrl: `/api/report/${savedRecord.id}`
    });
    
  } catch (error) {
    console.error('Analysis error:', error);
    res.status(500).json({ 
      error: 'An error occurred during analysis',
      message: error.message
    });
  }
});

module.exports = router;