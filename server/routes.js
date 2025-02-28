const express = require('express');
const router = express.Router();
const { analyzeController } = require('./controllers/analyzeController');
const upload = require('./middleware/upload');

// Analysis route
router.post('/analyze', upload.single('csv_file'), analyzeController);

module.exports = router; 