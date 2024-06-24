#!/usr/bin/env node

import ejs from 'ejs';
import boxen from 'boxen';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { cd, argv, fs, YAML, chalk, path } from 'zx';
import ora from 'ora';
import prompts from 'prompts';
import { isValid, toTypeInfo, types } from '@arcblock/did';
import * as envfile from 'envfile';

import { echoBrand, echoDocument } from './lib/arcblock.js';
import { getUser } from './lib/index.js';
import { checkServerInstalled, checkServerRunning, checkSatisfiedVersion, getServerDirectory } from './lib/server.js';
import { getBlockletDidList } from './lib/did.js';
import { initGitRepo } from './lib/git.js';
import {
  copy,
  emptyDir,
  isEmpty,
  isValidPackageName,
  toValidPackageName,
  fuzzyQuery,
  checkLerna,
  checkYarn,
} from './lib/utils.js';

const { yellow, red, green, cyan, blue, bold, magenta } = chalk;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const cwd = process.cwd();

const templates = [
  {
    name: 'react-dapp',
    display: '[dapp] react + express.js',
    color: yellow,
  },
  {
    name: 'react-dapp-ts',
    display: '[dapp] react + express + typescript',
    color: yellow,
  },
  {
    name: 'todo-list-example',
    display: '[dapp: todo-list] react + express + typescript + DID Spaces',
    color: yellow,
  },
  {
    name: 'solidjs-dapp',
    display: '[dapp] solid + express.js',
    color: yellow,
  },
  {
    name: 'vue-dapp',
    display: '[dapp] vue3 + express.js',
    color: green,
  },
  // {
  //   name: 'vue2-dapp',
  //   display: '[dapp] vue2 + express.js',
  //   color: green,
  // },
  {
    name: 'svelte-dapp',
    display: '[dapp] svelte + express.js',
    color: magenta,
  },
  {
    name: 'nextjs-dapp',
    display: '[dapp] next.js',
    color: blue,
  },
  // {
  //   name: 'react-gun-dapp',
  //   display: '[dapp] react + gun.js + express.js',
  //   color: blue,
  // },
  {
    name: 'react-static',
    display: '[static] react',
    color: yellow,
  },
  {
    name: 'solidjs-static',
    display: '[static] solidjs',
    color: yellow,
  },
  {
    name: 'vue-static',
    display: '[static] vue3',
    color: green,
  },
  // {
  //   name: 'vue2-static',
  //   display: '[static] vue2',
  //   color: green,
  // },
  {
    name: 'svelte-static',
    display: '[static] svelte',
    color: magenta,
  },
  {
    name: 'html-static',
    display: '[static] html',
    color: blue,
  },
  {
    name: 'express-api',
    display: '[api] express.js',
    color: yellow,
  },
  {
    name: 'nestjs-api',
    display: '[api] nestjs',
    color: yellow,
  },
];

//see: https://github.com/npm/npm/issues/3763
const renameFiles = {
  _gitignore: '.gitignore',
  _npmrc: '.npmrc',
};

function checkDid(did = '') {
  if (did) {
    if (!isValid(did)) {
      return false;
    }
    const typeInfo = toTypeInfo(did);
    if (typeInfo.role !== types.RoleType.ROLE_BLOCKLET) {
      return `The DID must be an blocklet DID: ${did}`;
    }
  }
  return true;
}

async function init() {
  const { version } = await fs.readJSONSync(path.resolve(__dirname, 'package.json'));
  await echoBrand({ version });

  let targetDir = argv._[0] ? String(argv._[0]) : undefined;
  const inputTemplateName = argv.template;
  const connectUrl = argv.connectUrl;
  const inputDid = argv.did;
  const checkRes = checkDid(inputDid);
  if (typeof checkRes === 'string') {
    console.error(checkRes);
    return;
  } else if (checkRes !== true) {
    console.error(`Invalid blocklet did: ${inputDid}`);
    return;
  }
  if (inputTemplateName && !templates.find((item) => item.name === inputTemplateName)) {
    console.error(`${red('✖')} The template ${inputTemplateName} is invalid.`);
    return;
  }

  const defaultProjectName = !targetDir ? 'blocklet-project' : targetDir;

  let result = {};
  const authorInfo = await getUser();

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => {
            targetDir = state.value.trim() || defaultProjectName;
          },
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm'),
          name: 'overwrite',
          message: () =>
            `${
              targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`
            } is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(`${red('✖')} Operation cancelled`);
            }
            return null;
          },
          name: 'overwriteChecker',
        },
        {
          type: () => (isValidPackageName(targetDir) ? null : 'text'),
          name: 'packageName',
          message: 'Package name:',
          initial: () => toValidPackageName(targetDir),
          validate: (dir) => isValidPackageName(dir) || 'Invalid package.json name',
        },
        ...(inputTemplateName
          ? []
          : [
              {
                type: 'autocompleteMultiselect',
                name: 'templateNames',
                message: 'Choose one or more blocklet templates:',
                choices: templates.map((template) => {
                  const templateColor = template.color;
                  return {
                    title: templateColor(template.display),
                    value: template.name,
                  };
                }),
                min: 1,
                suggest: (input, choices) => Promise.resolve(choices.filter((i) => i.title.includes(input))),
              },
              {
                type: (templateNames = []) => {
                  return templateNames.length > 1 ? 'select' : null;
                },
                name: 'mainBlocklet',
                message: 'Please choose the main blocklet',
                //
                choices: (templateNames = []) =>
                  templateNames.map((templateName) => {
                    const template = templates.find((x) => x.name === templateName);
                    return {
                      title: template.display,
                      value: template.name,
                    };
                  }),
                initial: 1,
              },
            ]),
        {
          type: 'text',
          name: 'authorName',
          message: 'Author name:',
          initial: authorInfo?.name || '',
          validate: (name) => (name ? true : 'Author name is required'),
        },
        {
          type: 'text',
          name: 'authorEmail',
          message: 'Author email:',
          initial: authorInfo?.email || '',
          validate: (email) => (email ? true : 'Author email is required'),
        },
      ],
      {
        onCancel: () => {
          throw new Error(`${red('✖')} Operation cancelled`);
        },
      }
    );
  } catch (cancelled) {
    console.error(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const {
    mainBlocklet = null,
    templateNames = inputTemplateName ? [inputTemplateName] : [],
    overwrite,
    packageName,
    authorName,
    authorEmail,
  } = result;

  await echoDocument();

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  const checkSpinner = ora({
    text: 'Checking blocklet server runtime environment\n',
  }).start();

  const isServerInstalled = await checkServerInstalled();
  const isSatisfiedVersion = await checkSatisfiedVersion();
  const isServerRunning = await checkServerRunning();
  checkSpinner.succeed('Done');

  console.log(`\nScaffolding project in ${cyan(root)}`);

  const scaffoldSpinner = ora('Creating project...\n').start();
  // name 是用户输入的项目名称
  const name = packageName || targetDir;

  // 如果选中了多个则说明是 monorepo 类型的模板
  if (mainBlocklet) {
    await checkLerna();
    await checkYarn();
    const monorepoDir = path.join(__dirname, 'templates', 'monorepo');
    const monorepoFiles = fs.readdirSync(monorepoDir);
    for (const file of monorepoFiles) {
      const targetPath = path.join(root, renameFiles[file] || file);
      copy(path.join(monorepoDir, file), targetPath);
    }
  }

  let didList = [];
  if (inputDid && templateNames.length === 1) {
    didList = [inputDid];
  } else {
    try {
      didList = await getBlockletDidList(templateNames, connectUrl);
    } catch (err) {
      console.error(red(err.message));
      process.exit(1);
    }
  }

  for (const templateName of templateNames) {
    const index = templateNames.indexOf(templateName);
    const templateDir = path.join(__dirname, `templates/${templateName}`);
    const finalTemplateName = `${name}-${templateName}`;
    // TODO: 需要把 common file copy 的逻辑移除，不同的 template 之间的差异越来越多，就会需要越来越多特殊处理的代码，违背了初衷，移除这部分逻辑可能是更好的选择
    // copy common files
    (() => {
      const commonDir = path.join(__dirname, 'common');
      const commonFiles = fs.readdirSync(commonDir);
      for (const file of commonFiles) {
        // 如果选择多个模板，每个子 package 中 只会包含必要的 文件
        if (mainBlocklet && !['screenshots', 'public', 'logo.png', '.prettierrc', 'LICENSE'].includes(file)) {
          continue;
        }
        // html-staic 和 xmark 相关的模板不添加 .husky
        if (fuzzyQuery(['html-static'], templateName) && ['.husky'].includes(file)) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const targetPath = renameFiles[file]
          ? path.join(root, mainBlocklet ? `blocklets/${templateName}` : '', renameFiles[file])
          : path.join(root, mainBlocklet ? `blocklets/${templateName}` : '', file);

        copy(path.join(commonDir, file), targetPath);
      }
    })();
    // copy template files
    (() => {
      // 过滤掉 template-info.json 文件
      let files = fs.readdirSync(templateDir).filter((file) => file !== 'template-info.json');
      for (const file of files) {
        write(file, null, templateDir, templateName);
      }
      // 如果选择了多个模板，每个子 package 中的 bump-version.mjs 文件
      if (mainBlocklet) {
        fs.removeSync(path.join(root, `blocklets/${templateName}`, 'scripts/bump-version.mjs'));
      }
    })();

    modifyPackage(
      (pkg) => {
        pkg.name = mainBlocklet ? finalTemplateName : name;
      },
      templateDir,
      templateName
    );
    modifyBlockletYaml(
      (yamlConfig) => {
        yamlConfig.name = mainBlocklet ? finalTemplateName : name;
        yamlConfig.title = mainBlocklet ? templateName : name;
      },
      templateDir,
      templateName
    );

    // patch blocklet author
    modifyBlockletYaml(
      async (yamlConfig) => {
        yamlConfig.author.name = authorName;
        yamlConfig.author.email = authorEmail;
      },
      templateDir,
      templateName
    );

    // patch did
    async function patchDid() {
      const did = didList[index];
      modifyBlockletYaml(
        (yamlConfig) => {
          yamlConfig.did = did;
        },
        templateDir,
        templateName
      );
      modifyPackage(
        (pkg) => {
          try {
            if (templateName.includes('dapp')) {
              pkg.scripts['bundle:client'] = ejs.render(pkg.scripts['bundle:client'], { did });
            } else if (templateName.includes('static')) {
              pkg.scripts.bundle = ejs.render(pkg.scripts.bundle, { did });
            }
            if (mainBlocklet) {
              delete pkg.scripts['bump-version'];
            }
            // 如果用户选了多个模板，为其他应用配置好 dev:child 和 deploy:child
            if (mainBlocklet && templateName !== mainBlocklet) {
              const mainBlockletDid = didList[templateNames.indexOf(mainBlocklet)];
              pkg.scripts['dev:child'] = ejs.render(pkg.scripts['dev:child'], { did: mainBlockletDid });
              pkg.scripts['deploy:child'] = ejs.render(pkg.scripts['deploy:child'], { did: mainBlockletDid });
            }
            if (!mainBlocklet || templateName === mainBlocklet) {
              delete pkg.scripts['dev:child'];
              delete pkg.scripts['deploy:child'];
            }
          } catch {
            console.info('\nNo need to patch bundle script\n');
          }
        },
        templateDir,
        templateName
      );
      // disabled random logo
      // const pngIcon = toDidIcon(did, undefined, true);
      // fs.writeFileSync(path.join(root, 'logo.png'), pngIcon);
    }
    await patchDid();
  }

  scaffoldSpinner.succeed('✨  Done. Now run:\n');

  const related = path.relative(cwd, root);

  // const pkgManager =
  //   // eslint-disable-next-line no-nested-ternary
  //   /pnpm/.test(process.env.npm_execpath) || /pnpm/.test(process.env.npm_config_user_agent)
  //     ? 'pnpm'
  //     : /yarn/.test(process.env.npm_execpath)
  //     ? 'yarn'
  //     : 'npm';
  try {
    // const { yes } = await prompts(
    //   {
    //     type: 'confirm',
    //     name: 'yes',
    //     initial: 'Y',
    //     message: 'Install and start it now?',
    //   },
    //   {
    //     onCancel: () => {
    //       throw new Error(`${red('✖')} Operation cancelled`);
    //     },
    //   }
    // );
    const yes = false;
    let hasStart = false;

    await initGitRepo(root);

    let defaultAgent = 'npm';
    let agentList = ['npm', 'yarn', 'pnpm'];

    // switch (templateNames) {
    //   case 'react':
    //   case 'website':
    //     agentList = ['npm', 'yarn'];
    //     break;
    //   default:
    //     break;
    // }
    if (yes) {
      const { agent } = await prompts({
        name: 'agent',
        type: 'select',
        message: 'Select npm client (package manager)',
        choices: agentList.map((i) => ({ value: i, title: i })),
      });

      if (!agent) {
        return;
      }
      defaultAgent = agent;

      await cd(root);
      execSync(`${agent} install`, { stdio: 'inherit' });
      if (isServerInstalled && isServerRunning && isSatisfiedVersion) {
        console.log(
          boxen(bold('blocklet dev'), {
            padding: 1,
            margin: 1,
            float: 'center',
          })
        );
        hasStart = true;
        execSync('blocklet dev', { stdio: 'inherit' });
      } else {
        console.log();
      }
    } else {
      console.log();
    }

    if (!isServerInstalled) {
      // 未安装 blocklet server
      console.log(red('To run the blocklet, you need a running blocklet server instance on local machine.'), '\n');
      console.log(`Checkout ${green('README.md')} for more usage instructions.`);
      console.log('Now you should run:', '\n');
      console.log(cyan(`${defaultAgent} install -g @blocklet/cli`));
      console.log(cyan('blocklet server start -a'));
    } else if (!isSatisfiedVersion) {
      // 已安装 blocklet server，但版本不满足
      console.log(red('Your blocklet server version is outdate, please update it to the latest version.'));
      console.log('Now you should run:', '\n');
      if (isServerRunning) {
        // blocklet server 已经启动
        const serverPath = await getServerDirectory();
        console.log(cyan(`cd ${serverPath}`));
        console.log(cyan('blocklet server stop'));
        console.log(cyan(`${defaultAgent} install -g @blocklet/cli`));
        console.log(cyan('blocklet server start'));
      } else {
        // blocklet server 未启动
        // TODO: 如何获取未启动的 blocklet server 实例目录？
        console.log(cyan(`${defaultAgent} install -g @blocklet/cli`));
        console.log(cyan('blocklet server start -a'));
      }
    } else if (!isServerRunning) {
      // 已经安装 blocklet server，且版本满足，并且 blocklet server 未启动
      console.log(red('You need to start your blocklet server before develop this blocklet.'));
      console.log('Now you should run:', '\n');
      // TODO: 如何获取未启动的 blocklet server 实例目录？
      console.log(cyan('blocklet server start -a'));
    }

    if (!hasStart) {
      // console.log(dim('\n  start it later by:\n'));
      if (root !== cwd) console.log(blue(`  cd ${bold(related)}`));
      if (mainBlocklet) {
        console.log(blue(`npm run init`));
      } else {
        console.log(blue(`${defaultAgent === 'yarn' ? 'yarn' : `${defaultAgent} install`}`));
        console.log(cyan('blocklet dev'));
      }

      console.log('\n', `Find more usage in ${green('README.md')}`, '\n');
    }
  } catch (cancelled) {
    console.error(cancelled.message);
  }

  // inside functions
  function write(file, content, templateDir, templateName) {
    const targetPath = renameFiles[file]
      ? path.join(root, mainBlocklet ? `blocklets/${templateName}` : '', renameFiles[file])
      : path.join(root, mainBlocklet ? `blocklets/${templateName}` : '', file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  }
  function read(file, templateName) {
    const targetPath = path.join(root, mainBlocklet ? `blocklets/${templateName}` : '', file);
    if (fs.existsSync(targetPath)) {
      return fs.readFileSync(targetPath, 'utf8');
    }
    return null;
  }

  function modifyPackage(modifyFn = () => {}, templateDir, templateName) {
    const pkg = JSON.parse(read('package.json', templateName));
    modifyFn(pkg);
    write('package.json', JSON.stringify(pkg, null, 2), templateDir, templateName);
  }

  function modifyBlockletYaml(modifyFn = () => {}, templateDir, templateName) {
    const blockletYaml = read('blocklet.yml', templateName);
    const yamlConfig = YAML.parse(blockletYaml);
    modifyFn(yamlConfig);
    write('blocklet.yml', YAML.stringify(yamlConfig, 2), templateDir, templateName);
  }

  function modifyEnv(modifyFn = (...args) => ({ ...args }), templateDir, templateName) {
    const envContent = read('.env', templateName);
    if (envContent) {
      const env = envfile.parse(envContent);
      modifyFn(env);
      write('.env', envfile.stringify(env), templateDir, templateName);
    }
    // else {
    //   console.warn(`\n${yellow('No .env file found, please add one.')}`);
    // }
  }
}

init().catch((e) => {
  console.error(e);
});
