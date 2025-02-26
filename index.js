const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'), (err) => {
      if (err) {
        res.status(500).send('Internal Server Error');
        console.error(err);
      }
    });
  });

  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Save files in the 'uploads' folder
    },
    filename: function (req, file, cb) {
        // Use the original file name
        cb(null, file.originalname);
    },
});

const upload = multer({ storage: storage }); // Use the custom storage configuration

app.post('/formcsv', upload.single('csv_file'), (req, res) => {
    if (!req.file) {
        return res.status(400).send('No file uploaded.'); // Send error if no file is uploaded
    }
    res.send('File submitted successfully');
});


app.listen(3000, () => {
  console.log('Server is running on port 3000');
});