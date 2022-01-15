require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('client'));
app.use(express.static('build/contracts'));
app.get('/', (req, res) => {
    res.sendFile(`${__dirname}/client/index.html`);
  });


  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}...`);
  });