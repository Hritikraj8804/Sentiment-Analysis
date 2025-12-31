const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const analyzeController = async (req, res) => {
    console.log('Analyze request received');
    console.log('File:', req.file);

    if (!req.file) {
        console.log('No file uploaded');
        return res.status(400).json({
            success: false,
            message: 'No file uploaded'
        });
    }

    try {
        // Run Python script
        console.log('Starting Python analysis...');
        const pythonScript = path.join(process.cwd(), 'seti.py');
        console.log('Python script path:', pythonScript);
        const pythonProcess = spawn('python', [pythonScript, req.file.path]);
        let pythonData = '';
        let pythonError = '';

        pythonProcess.stdout.on('data', (data) => {
            pythonData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            pythonError += data.toString();
        });

        pythonProcess.on('close', (code) => {
            // Clean up uploaded file
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });

            if (code !== 0) {
                return res.status(500).json({
                    success: false,
                    message: pythonError || 'Error running analysis'
                });
            }

            try {
                const result = JSON.parse(pythonData);
                res.json(result);
            } catch (error) {
                res.status(500).json({
                    success: false,
                    message: 'Error parsing analysis results'
                });
            }
        });
    } catch (error) {
        // Clean up uploaded file in case of error
        if (req.file && req.file.path) {
            fs.unlink(req.file.path, (err) => {
                if (err) console.error('Error deleting file:', err);
            });
        }

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    analyzeController
}; 