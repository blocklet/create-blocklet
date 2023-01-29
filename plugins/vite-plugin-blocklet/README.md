# vite-plugi-blocklet

The Vite library plugin, which enhanced development of [ArcBlock blocklet](http://developer.blocklet.io/)

## Use examples

### Example of front-end project
``` js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [react(), createBlockletPlugin()],
  };
});
```

### Example of back-end project

`api/index.js`
```js
const express = require('express');
const app = express();

module.exports = { app };
```

`api/dev.js`
```js
const { setupClient } = require('vite-plugin-blocklet');
const { app } = require('./index');

setupClient(app);
```

`package.json`
```json
"start": "NODE_ENV=development nodemon api/dev.js -w api",
```

Basically, you `vite.config.js` file should be in the root of project folders, if you need setup a custom vite config file, you should change your npm scripts, like:

`package.json`
```json
"start": "NODE_ENV=development nodemon api/dev.js -w api -- --config=./config/vite.config.js",
```

Or you can just pass vite config file path to `setupClient` function, like this:

```js
const { setupClient } = require('vite-plugin-blocklet');
const { app } = require('./index');

setupClient(app, { configFile: './config/vite.config.js'});
```
