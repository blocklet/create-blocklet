/* eslint-disable no-console */
const dotenv = require('dotenv-flow');
dotenv.config();

const { server: app } = require('./functions/app');

const port = parseInt(process.env.BLOCKLET_PORT, 10) || 3030;
const server = app.listen(port, (err) => {
  if (err) throw err;
  console.log(`> app ready on ${port}`);
});

module.exports = { app, server };
