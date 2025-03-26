#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import getPort from 'get-port';

const flagFile = path.join(process.cwd(), '.init-component-studio');

// write the BLOCKLET_PORT to .env.development.local
async function ensureBlockletPortToDevEnv() {
  if (fs.existsSync(path.join(process.cwd(), '.env.development.local'))) {
    return;
  }

  const port = await getPort({ port: 8118 });
  fs.writeFileSync(path.join(process.cwd(), '.env.development.local'), `BLOCKLET_PORT=${port}`);
}

// check the flag file is exists
if (fs.existsSync(flagFile)) {
  try {
    // remove flag file to avoid infinite loop
    fs.unlinkSync(flagFile);

    // execute update:deps script
    console.log('auto updating dependencies...');
    execSync('pnpm run update:deps', { stdio: 'inherit' });

    // write the BLOCKLET_PORT to .env.development.local
    ensureBlockletPortToDevEnv();
  } catch (error) {
    process.exit(1);
  }
} else {
  // skip script
}
