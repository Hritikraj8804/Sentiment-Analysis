const express = require('express');
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

app.post('/submit', (req, res) => {
    res.send('Form submitted successfully');
    });

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});