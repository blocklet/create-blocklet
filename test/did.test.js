import { test, expect } from 'vitest';
import { toBlockletDid } from '../lib/did.js';

test('toBlockletDid should work with string', () => {
  const did = toBlockletDid('hello-did');
  expect(did).toBe('z8iZzFA6S5Q4wmzfwR7nvxKNh8NaoWait3E9b');
});

test('toBlockletDid should work with "z" start string', () => {
  const did = toBlockletDid('ztest-did');
  expect(did).toBe('z8ia4NB1yJNZkKi3mkXQpvhCNDWqcst1hpS5r');
});
