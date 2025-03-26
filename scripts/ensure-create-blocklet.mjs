#!/usr/bin/env zx

import prompts from 'prompts';
import fs from 'fs-extra';
import path from 'path';
import { $, chalk } from 'zx';
import { tmpdir } from 'os';
import { cwd } from 'process';

const tmpDir = path.join(tmpdir());
console.log(`tmpDir: ${tmpDir}`);

const DID = process.env.DID || 'z2qa7BQdkEb3TwYyEYC1psK6uvmGnHSUHt5RM';
// 从环境变量获取 package manager
const PACKAGE_MANAGER = process.env.PACKAGE_MANAGER || 'pnpm';
const TEMPLATE_NAME = process.env.TEMPLATE || 'react-dapp'


async function cleanup(appDir) {
  try {
    const pidFile = path.join(appDir, 'dev.pid');
    if (await fs.pathExists(pidFile)) {
      const pid = (await fs.readFile(pidFile, 'utf-8')).trim();
      console.log(`Cleaning up process ${pid}...`);
      await $`kill ${pid}`;
      await fs.remove(pidFile);
    }
  } catch (error) {
    console.error('Error during cleanup:', error);
  }
}

async function testTemplate(template) {
  console.log(`Testing template: ${template}`);
  console.log(`Using package manager: ${PACKAGE_MANAGER}`);

  try {
    // 创建临时目录用于测试
    const testDir = path.join(tmpDir, 'apps');
    await fs.ensureDir(testDir);
    
    // 执行创建命令，使用 --template 参数直接指定模板
    const { stdout, stderr } = await $`cd ${testDir} && node ${cwd()}/packages/create-app/index.js --did ${DID} --e2e --template ${template} --packageName ${template} --authorName test-author --authorEmail test@example.com --packageManager ${PACKAGE_MANAGER}`;
    console.log(stdout);
    console.log(stderr);

    const appDir = path.join(testDir, template);
    console.log(`appDir is ${appDir}, install deps...`);
    await $`cd ${appDir} && ${PACKAGE_MANAGER} install`;
    console.log(`start blocklet dev`);
    
    // 创建一个临时文件来存储输出
    const outputFile = path.join(appDir, `${template}-output.log`);
    const devCommand = `npm run dev`
    console.log('devCommand: ', devCommand)

    const dev = $`cd ${appDir} && ${devCommand}`

    for await (const chunk of dev.stdout) {
      if (chunk.includes('You can access with the following URL')) break
    }
    
    // 使用 nohup 在后台运行 dev 命令，并将输出重定向到文件

    // await $`${devCommand}`.run({
    //   cwd: appDir,
    //   stdio: 'ignore',
    // }).quiet();

    // 等待 30 秒
    console.log('Waiting for 30 seconds...');

    await new Promise(resolve => setTimeout(resolve, 30000));
    
    // 读取并显示日志内容
    console.log(`\nLast 50 lines of dev server output:`);
    try {
      const { stdout } = await $`tail -n 50 ${outputFile}`;
      console.log(stdout);

      // 提取域名
      const urlMatch = stdout.match(/https:\/\/[a-zA-Z0-9]+\.did\.abtnet\.io/);
      if (!urlMatch) {
        throw new Error('No application URL found in the output');
      }

      const appUrl = urlMatch[0];
      console.log(`\nFound application URL: ${appUrl}`);

      // 发送 curl 请求检查状态
      console.log('Checking application status...');
      try {
        const { stdout: curlOutput } = await $`curl -I ${appUrl}`;
        if (curlOutput.includes('HTTP/') && curlOutput.includes('200')) {
          console.log('✅ Application is responding with 200 status code');
        } else {
          throw new Error(`Application is not responding with 200 status code. Response:\n${curlOutput}`);
        }
      } catch (error) {
        throw new Error(`Failed to check application status: ${error.message}`);
      }
    } catch (error) {
      console.error('Error:', error.message);
      throw error;
    }

    // 在测试结束后清理进程
    await cleanup(appDir);

    console.log(`✅ Successfully created template: ${template}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to create template ${template}:`, error);
    return false;
  }
}

async function main() {
  try {

    await testTemplate(TEMPLATE_NAME);

    
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
