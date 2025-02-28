const express = require('express');
const path = require('path');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3000;

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