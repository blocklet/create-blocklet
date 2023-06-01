const { createRequestHandler } = require('@remix-run/express');
const { installGlobals } = require('@remix-run/node');
const compression = require('compression');
const express = require('express');
const morgan = require('morgan');
const serverBuild = require('./build/index.js');

installGlobals();

const app = express();

app.use(compression());

// http://expressjs.com/en/advanced/best-practice-security.html#at-a-minimum-disable-x-powered-by-header
app.disable('x-powered-by');

// Remix fingerprints its assets so we can cache forever.
app.use('/build', express.static('public/build', { immutable: true, maxAge: '1y' }));

// Everything else (like favicon.ico) is cached for an hour. You may want to be
// more aggressive with this caching.
app.use(express.static('public', { maxAge: '1h' }));

app.use(morgan('tiny'));

app.all('*', (req, res, next) => {
  return createRequestHandler({
    build: serverBuild,
    mode: process.env.NODE_ENV,
  })(req, res, next);
});

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});
