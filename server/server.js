const express = require('express');
const path = require('path');
const cors = require('cors');
const fs = require('fs');
const routes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Function to clean up old analysis files
function cleanupOldFiles() {
    const imageDir = path.join(__dirname, '..', 'public', 'images');
    const summaryFile = path.join(__dirname, '..', 'public', 'analysis_summary.json');
    const uploadsDir = path.join(__dirname, '..', 'uploads');

    // Clean up and recreate directories
    [imageDir, uploadsDir].forEach(dir => {
        if (fs.existsSync(dir)) {
            fs.rmSync(dir, { recursive: true, force: true });
        }
        fs.mkdirSync(dir, { recursive: true });
    });

    // Clean up summary file
    if (fs.existsSync(summaryFile)) {
        fs.unlinkSync(summaryFile);
    }
}

// Clean up on server start (only in production)
if (process.env.NODE_ENV === 'production') {
    cleanupOldFiles();
}

// Enable CORS
app.use(cors());

// Serve static files from public directory
app.use(express.static(path.join(__dirname, '..', 'public')));

// Serve files from data directory
app.get('/data/:filename', (req, res) => {
    const dataDir = path.join(__dirname, '..', 'data');
    const filePath = path.join(dataDir, req.params.filename);
    
    // Check if file exists and is a CSV
    if (fs.existsSync(filePath) && filePath.endsWith('.csv')) {
        res.download(filePath);
    } else {
        res.status(404).json({ error: 'File not found' });
    }
});

// Basic health check endpoint
app.get('/', (req, res) => {
    res.json({ status: 'ok' });
});

// Use routes
app.use('/api', routes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Internal Server Error'
    });
});

// Start server
const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

// Handle server errors
server.on('error', (error) => {
    console.error('Server error:', error);
}); 