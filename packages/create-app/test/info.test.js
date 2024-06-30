import { test, expect } from 'vitest';
import { getUser } from '../lib/index';

test.only(
  'getUser should work',
  async () => {
    const user = await getUser();
    expect(user).toEqual({
      email: 'lancelot_lewis@163.com',
      name: 'zhanghan',
    });
  },
  -1,
);
