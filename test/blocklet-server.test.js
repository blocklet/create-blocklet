import semver from 'semver';
import { expect, test } from 'vitest';
import { checkServerInstalled, getServerVersion, checkServerRunning, getServerDirectory } from '../lib/server.js';

test('blocklet server is installed', async () => {
  const isInstalled = await checkServerInstalled();
  expect(isInstalled).toBe(true);
});

test(
  'blocklet server version is 1.7.0',
  async () => {
    const version = await getServerVersion();
    expect(version).toBe('1.7.0');
    expect(semver.satisfies(version, '>= 1.7.0')).toBe(true);
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
    console.log({ directory });
    expect(directory).toBe('/Users/han/workspace/an-test/prod');
  },
  -1
);
