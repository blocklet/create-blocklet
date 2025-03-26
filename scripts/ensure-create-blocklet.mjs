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

 function getTemplates() {
  const templates = [
    // dapp
    {
      name: 'react-dapp',
      display: '[dapp] react + express.js',
      color: chalk.yellow,
    },
    {
      name: 'react-dapp-ts',
      display: '[dapp] react + express + typescript',
      color: chalk.yellow,
    },
    {
      name: 'react-aigne-dapp',
      display: '[dapp] react + express + AIGNE Framework',
      color: chalk.yellow,
    },
    {
      name: 'did-wallet-dapp',
      display: '[dapp: did-wallet] Full stack app (react.js + express.js) with DID Wallet integration',
      color: chalk.yellow,
    },
    {
      name: 'todo-list-example',
      display: '[dapp: todo-list] react + express + typescript + DID Spaces',
      color: chalk.yellow,
    },
    {
      name: 'did-connect-dapp',
      display: '[dapp: did-connect] Full stack app (react.js + express.js) with DID Connect integration',
      color: chalk.yellow,
    },
    {
      name: 'solidjs-dapp',
      display: '[dapp] solid + express.js',
      color: chalk.yellow,
    },
    {
      name: 'vue-dapp',
      display: '[dapp] vue3 + express.js',
      color: chalk.yellow,
    },
    // {
    //   name: 'vue2-dapp',
    //   display: '[dapp] vue2 + express.js',
    //   color: green,
    // },
    {
      name: 'svelte-dapp',
      display: '[dapp] svelte + express.js',
      color: chalk.yellow,
    },
    // FIXME: @zhanghan add this template in the future
    // {
    //   name: 'nextjs-dapp',
    //   display: '[dapp] next.js',
    //   color: blue,
    // },
    // {
    //   name: 'react-gun-dapp',
    //   display: '[dapp] react + gun.js + express.js',
    //   color: blue,
    // },
    // static
    {
      name: 'react-static',
      display: '[static] react',
      color: chalk.green,
    },
    {
      name: 'solidjs-static',
      display: '[static] solidjs',
      color: chalk.green,
    },
    {
      name: 'vue-static',
      display: '[static] vue3',
      color: chalk.green,
    },
    {
      name: 'vue-ts-static',
      display: '[static] vue3 + typescript',
      color: chalk.green,
    },
    // {
    //   name: 'vue2-static',
    //   display: '[static] vue2',
    //   color: green,
    // },
    {
      name: 'svelte-static',
      display: '[static] svelte',
      color: chalk.green,
    },
    {
      name: 'html-static',
      display: '[static] html',
      color: chalk.green,
    },
    // api
    {
      name: 'express-api',
      display: '[api] express.js',
      color: chalk.blue,
    },
    {
      name: 'nestjs-api',
      display: '[api] nestjs',
      color: chalk.blue,
    },
    // dev
    {
      name: 'component-studio',
      display: '[dev] component studio (beta): Local studio using for component development',
      color: chalk.magenta,
      // use this permanent did as blocklet.yml did always
      permanentDid: 'z2qa7BQdkEb3TwYyEYC1psK6uvmGnHSUHt5RM',
    },
  ];

  return templates;
}

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
  console.log(`Testing template: ${template.name}`);
  console.log(`Using package manager: ${PACKAGE_MANAGER}`);
  
  // 注入测试数据，使用 undefined 跳过不需要的问题
  prompts.inject([
    template.name,          // projectName (有默认值)
    false,          // overwrite (条件判断)
    false,          // overwriteChecker (条件判断)
    template.name,          // packageName (条件判断)
    [template.name], // templateNames
    undefined, // template
    'test-author',      // authorName (必需)
    'test@example.com', // authorEmail (必需)
    undefined,          // packageManager (条件判断)
  ]);

  try {
    // 创建临时目录用于测试
    const testDir = path.join(tmpDir, 'apps');
    await fs.ensureDir(testDir);
    
    // 执行创建命令，使用 --template 参数直接指定模板
    const { stdout, stderr } = await $`cd ${testDir} && node ${cwd()}/packages/create-app/index.js --did ${DID} --e2e --template ${template.name} --packageName ${template.name} --authorName test-author --authorEmail test@example.com --packageManager ${PACKAGE_MANAGER}`;
    console.log(stdout);
    console.log(stderr);

    const appDir = path.join(testDir, template.name);
    console.log(`appDir is ${appDir}, install deps...`);
    await $`cd ${appDir} && ${PACKAGE_MANAGER} install`;
    console.log(`start blocklet dev`);
    
    // 创建一个临时文件来存储输出
    const outputFile = path.join(appDir, `${template.name}-output.log`);
    const devCommand = `npm run dev`
    console.log('devCommand: ', devCommand)

    const dev = $`${devCommand}`.run({
      cwd: appDir,
    })

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

    console.log(`✅ Successfully created template: ${template.name}`);
    return true;
  } catch (error) {
    console.error(`❌ Failed to create template ${template.name}:`, error);
    return false;
  }
}

async function main() {
  try {
    // 获取所有模板
    const templates =  getTemplates().filter((_v, i) => i < 1);

    // 测试结果数组
    const results = [];

    // 依次测试每个模板
    for (const template of templates) {
      const success = await testTemplate(template);
      results.push({ template, success });
    }

    // 输出测试结果
    console.log('\nTest Results:');
    results.forEach(({ template, success }) => {
      console.log(`${success ? '✅' : '❌'} ${template.name}`);
    });

    // 如果有失败的测试，退出码设为1
    if (results.some(r => !r.success)) {
      process.exit(1);
    }
  } catch (error) {
    console.error('Test execution failed:', error);
    process.exit(1);
  }
}

main().catch(console.error);
