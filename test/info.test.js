import { test, expect } from 'vitest';
import { getUser } from '../lib/index';

test(
  'getUser should work',
  async () => {
    const user = await getUser();
    expect(user).toEqual({
      email: 'lancelot_lewis@163.com',
      name: 'LancelotLewis',
    });
  },
  -1
);
