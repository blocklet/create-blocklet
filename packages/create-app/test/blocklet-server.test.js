import semver from 'semver';
import { expect, test } from 'vitest';
import { checkServerInstalled, getServerVersion, checkServerRunning, getServerDirectory } from '../lib/server.js';

test('blocklet server is installed', async () => {
  const isInstalled = await checkServerInstalled();
  expect(isInstalled).toBe(true);
});

test(
  'blocklet server version is bigger than 1.7.0',
  async () => {
    const version = await getServerVersion();
    const cleanVersion = semver.valid(semver.coerce(version));
    expect(semver.satisfies(cleanVersion), '>=1.7.0').toBe(true);
  },
  -1
);

test(
  'blocklet server running status check',
  async () => {
    const isRunning = await checkServerRunning();
    console.log('isRunning', isRunning === true);
    expect(isRunning).toBe(true);
  },
  -1
);

test(
  'blocklet server directory',
  async () => {
    const directory = await getServerDirectory();
    expect(directory).toBe('/workspace/.run/prod');
  },
  -1
);
