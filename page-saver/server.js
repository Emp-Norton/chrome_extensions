const express = require('express');
const fs = require('fs');
const app = express();

app.post('/capture-text', (req, res) => {
  const fileName = req.query.filename;
  const text = req.body;
  console.log(`File: ${fileName}\nText:${text}`)
  fs.writeFile(fileName, text, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing file');
    } else {
      res.send(`File written successfully: ${fileName}`);
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
