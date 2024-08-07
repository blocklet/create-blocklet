/* eslint-disable import/prefer-default-export */
import { $ } from 'zx';

export async function getAuthor() {
  try {
    const { stdout: name } = await $`npm config get init.author.name`;
    const { stdout: email } = await $`npm config get init.author.email`;

    return { name: name?.trim(), email: email?.trim() };
  } catch {
    return {
      name: '',
      email: '',
    };
  }
}
