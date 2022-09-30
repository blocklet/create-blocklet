const express = require('express');
const env = require('./libs/env');

const app = express();

const port = process.env.BLOCKLET_PORT || process.env.PORT || 3030;

app.get('/', (req, res) => {
  res.send(`
<div style="display:flex;flex-direction:column;align-items:center;padding:64px 0;">
<h1 style="margin:64px 0;">
  <span style="display:inline-block;padding:8px 24px;background:#1dc1c7;color:#fff;">Blocklet</span>
  <span style="color:#777;">+ Express</span>
</h1>
<pre>
${JSON.stringify(env, null, 2)}
</pre>
</div>
  `);
});

app.listen(port, () => {
  console.log(`Blocklet app listening on port ${port}`);
});
