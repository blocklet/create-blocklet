#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const flagFile = path.join(process.cwd(), '.should-update-deps');

// check the flag file is exists
if (fs.existsSync(flagFile)) {
  try {
    // remove flag file to avoid infinite loop
    fs.unlinkSync(flagFile);
    // execute update:deps script
    execSync('pnpm run update:deps', { stdio: 'inherit' });
  } catch (error) {
    process.exit(1);
  }
} else {
  // skip script
}
