#!/usr/bin/env node

const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const YAML = require('yaml');
const argv = require('minimist')(process.argv.slice(2));
const prompts = require('prompts');
const shell = require('shelljs');
const stripAnsi = require('strip-ansi');
const { yellow, red } = require('kolorist');

const cwd = process.cwd();

const TYPES = [
  {
    name: 'dapp',
    color: yellow,
    frameworks: [
      {
        name: 'react',
        display: 'react',
        color: yellow,
      },
    ],
  },
  {
    name: 'static',
    color: yellow,
    frameworks: [
      {
        name: 'react',
        display: 'react',
        color: yellow,
      },
    ],
  },
];

const SERVICES = [
  {
    name: 'auth',
    display: 'Auth Service',
    color: yellow,
  },
];

const renameFiles = {
  _gitignore: '.gitignore',
};

async function init() {
  let targetDir = argv._[0];

  const defaultProjectName = !targetDir ? 'blocklet-project' : targetDir;

  let result = {};

  try {
    result = await prompts(
      [
        {
          type: targetDir ? null : 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: defaultProjectName,
          onState: (state) => (targetDir = state.value.trim() || defaultProjectName),
        },
        {
          type: () => (!fs.existsSync(targetDir) || isEmpty(targetDir) ? null : 'confirm'),
          name: 'overwrite',
          message: () =>
            (targetDir === '.' ? 'Current directory' : `Target directory "${targetDir}"`) +
            ` is not empty. Remove existing files and continue?`,
        },
        {
          type: (_, { overwrite } = {}) => {
            if (overwrite === false) {
              throw new Error(red('✖') + ' Operation cancelled');
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
        {
          type: 'select',
          name: 'type',
          message: 'What type blocklet you want to create:',
          initial: 0,
          choices: TYPES.map((type) => {
            const typeColor = type.color;
            return {
              title: typeColor(type.name),
              value: type.name,
            };
          }),
        },
        {
          type: (typeName) => {
            const type = TYPES.find((item) => item.name === typeName);
            return type && type.frameworks ? 'select' : null;
          },
          name: 'framework',
          message: 'Select a framework:',
          choices: (typeName) => {
            const type = TYPES.find((item) => item.name === typeName);
            return type.frameworks.map((framework) => {
              const frameworkColor = framework.color;
              return {
                title: frameworkColor(framework.display),
                value: framework.name,
              };
            });
          },
        },
        {
          type: 'multiselect',
          name: 'services',
          message: 'Choose blocklet services:',
          initial: 0,
          choices: SERVICES.map((service) => {
            const serviceColor = service.color;
            return {
              title: serviceColor(service.display),
              value: service.name,
            };
          }),
        },
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled');
        },
      }
    );
  } catch (cancelled) {
    console.log(cancelled.message);
    return;
  }

  // user choice associated with prompts
  const { type, framework, overwrite, packageName, services } = result;

  const root = path.join(cwd, targetDir);

  if (overwrite) {
    emptyDir(root);
  } else if (!fs.existsSync(root)) {
    fs.mkdirSync(root);
  }

  console.log(`\nScaffolding project in ${root}...`);

  const templateDir = path.join(__dirname, `template-${type}/${framework}`);
  const name = packageName || targetDir;

  // copy common files
  (() => {
    const commonDir = path.join(__dirname, `common`);
    const commonFiles = fs.readdirSync(commonDir);
    for (const file of commonFiles) {
      const targetPath = renameFiles[file] ? path.join(root, renameFiles[file]) : path.join(root, file);
      copy(path.join(commonDir, file), targetPath);
    }
  })();

  // copy template files
  (() => {
    const files = fs.readdirSync(templateDir);
    for (const file of files) {
      write(file);
    }
  })();

  // correctName
  modifyPackage((pkg) => {
    pkg.name = name;
  });
  modifyBlockletYaml((yamlConfig) => {
    yamlConfig.name = name;
  });
  modifyBlockletMd((md) => {
    return md.replace(/# template-react/g, `# ${name}`);
  });

  // patch services
  modifyBlockletYaml((yamlConfig) => {
    if (services.includes('auth')) {
      yamlConfig.interfaces[0].services = [
        {
          name: '@abtnode/auth-service',
          config: {
            blockUnauthenticated: true,
          },
        },
      ];
    }
  });

  // patch did
  (() => {
    const did = getDid();
    modifyBlockletYaml((yamlConfig) => {
      yamlConfig.did = did;
    });
    modifyPackage((pkg) => {
      if (type === 'dapp') {
        pkg.scripts['bundle:client'] = ejs.render(pkg.scripts['bundle:client'], { did });
      } else if (type === 'static') {
        pkg.scripts['bundle'] = ejs.render(pkg.scripts['bundle'], { did });
      }
    });
  })();

  const pkgManager = /yarn/.test(process.env.npm_execpath) ? 'yarn' : 'npm';

  console.log(`\nDone. Now run:\n`);
  if (root !== cwd) {
    console.log(`  cd ${path.relative(cwd, root)}`);
  }
  console.log(`  ${pkgManager === 'yarn' ? `yarn` : `npm install`}`);
  console.log(`  ${pkgManager === 'yarn' ? `yarn dev` : `npm run dev`}`);
  console.log();

  // inside functions
  function write(file, content) {
    const targetPath = renameFiles[file] ? path.join(root, renameFiles[file]) : path.join(root, file);
    if (content) {
      fs.writeFileSync(targetPath, content);
    } else {
      copy(path.join(templateDir, file), targetPath);
    }
  }
  function read(file) {
    const targetPath = path.join(root, file);
    return fs.readFileSync(targetPath, 'utf8');
  }

  function modifyPackage(modifyFn = () => {}) {
    const pkg = JSON.parse(read('package.json'));
    modifyFn(pkg);
    write('package.json', JSON.stringify(pkg, null, 2));
  }

  function modifyBlockletYaml(modifyFn = () => {}) {
    const blockletYaml = read('blocklet.yml');
    const yamlConfig = YAML.parse(blockletYaml);
    modifyFn(yamlConfig);
    write('blocklet.yml', YAML.stringify(yamlConfig, 2));
  }
  function modifyBlockletMd(modifyFn = (...args) => ({ ...args })) {
    const blockletMd = read('blocklet.md', 'utf8');
    const modifyMd = modifyFn(blockletMd);
    write('blocklet.md', modifyMd);
  }

  function getDid() {
    const shellRes = shell.exec(`cd ${root} && blocklet meta`, { silent: true });
    const output = stripAnsi(shellRes.stdout);

    const [didStr] = output.match(/did:[\s\S]*?\n/gm) || [];

    const did = didStr.replace(/did:[\s]*([\S]+)\n/gm, '$1');
    return did;
  }
}

// common functions
function copy(src, dest) {
  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    copyDir(src, dest);
  } else {
    fs.copyFileSync(src, dest);
  }
}

function isValidPackageName(projectName) {
  return /^(?:@[a-z0-9-*~][a-z0-9-*._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(projectName);
}

function toValidPackageName(projectName) {
  return projectName
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/^[._]/, '')
    .replace(/[^a-z0-9-~]+/g, '-');
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true });
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.resolve(srcDir, file);
    const destFile = path.resolve(destDir, file);
    copy(srcFile, destFile);
  }
}

function isEmpty(path) {
  return fs.readdirSync(path).length === 0;
}

function emptyDir(dir) {
  if (!fs.existsSync(dir)) {
    return;
  }
  for (const file of fs.readdirSync(dir)) {
    const abs = path.resolve(dir, file);
    // baseline is Node 12 so can't use rmSync :(
    if (fs.lstatSync(abs).isDirectory()) {
      emptyDir(abs);
      fs.rmdirSync(abs);
    } else {
      fs.unlinkSync(abs);
    }
  }
}

init().catch((e) => {
  console.error(e);
});
