#!/usr/bin/env node
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const flagFile = path.join(process.cwd(), '.init-component-studio');

// check the flag file is exists
if (fs.existsSync(flagFile)) {
  try {
    // remove flag file to avoid infinite loop
    fs.unlinkSync(flagFile);
    // execute update:deps script
    execSync('pnpm run update:deps', { stdio: 'inherit' });
    // change did to z2qa7rr3eUyVnWp2PCxEVARuUfLFh6cE5V2xV
    const blockletYmlPath = path.join(process.cwd(), 'blocklet.yml');
    const blockletYml = fs.readFileSync(blockletYmlPath, 'utf-8');
    const blockletYmlContent = blockletYml.replace(/did: .+/, `did: z2qa7rr3eUyVnWp2PCxEVARuUfLFh6cE5V2xV`);
    fs.writeFileSync(blockletYmlPath, blockletYmlContent);
  } catch (error) {
    process.exit(1);
  }
} else {
  // skip script
}
