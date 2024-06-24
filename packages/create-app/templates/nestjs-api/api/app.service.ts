import { Injectable } from '@nestjs/common';
const env = require('@blocklet/sdk/lib/env');
const environment = {
  ...env,
  chainHost: process.env.CHAIN_HOST || '',
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello from Blocklet app!';
  }
}
