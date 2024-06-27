const express = require('express');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;

app.get('/', (_, res) => {
  res.send('Hello Blocklet!');
});

app.listen(port, () => {
  console.log(`Blocklet app listening on port ${port}`);
});
