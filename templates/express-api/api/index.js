const express = require('express');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.send('Hello World, Blocklet!');
});

app.listen(port, () => {
  console.log(`Blocklet app listening on port ${port}`);
});
