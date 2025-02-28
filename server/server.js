const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const routes = require('./routes');

const app = express();
const port = 3000;

// Function to clean up old analysis files on server start
function cleanupOldFiles() {
    const imageDir = path.join(__dirname, '..', 'public', 'images');
    const summaryFile = path.join(__dirname, '..', 'public', 'analysis_summary.json');

    // Clean up old images directory
    if (fs.existsSync(imageDir)) {
        fs.rmSync(imageDir, { recursive: true, force: true });
    }
    fs.mkdirSync(imageDir, { recursive: true });

    // Clean up old summary file
    if (fs.existsSync(summaryFile)) {
        fs.unlinkSync(summaryFile);
    }
}

// Clean up on server start
cleanupOldFiles();

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static('public'));

// Use routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);  // Add error logging
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
}); 