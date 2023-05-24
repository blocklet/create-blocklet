import { Injectable } from '@nestjs/common';
const env = require('@blocklet/sdk/lib/env');
const environment = {
  ...env,
  chainHost: process.env.CHAIN_HOST || '',
};

@Injectable()
export class AppService {
  getHello(): string {
    return `
    <div style="display:flex;flex-direction:column;align-items:center;padding:64px 0;">
    <h1 style="margin:64px 0;">
      <span style="display:inline-block;padding:8px 24px;background:#1dc1c7;color:#fff;">Blocklet</span>
      <span style="color:#777;">+ NestJS</span>
    </h1>
    <pre>
    ${JSON.stringify(environment, null, 2)}
    </pre>
    </div>
      `;
  }
}
