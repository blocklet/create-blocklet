import figlet from 'figlet';
import terminalLink from 'terminal-link';
import gradient from 'gradient-string';
import { echo, chalk } from 'zx';
import { join } from 'path';

export function echoBrand({ version = '' }) {
  let msg;
  return new Promise((resolve, reject) => {
    figlet.text('ArcBlock', { width: 44 }, (err, data) => {
      if (err) {
        return reject(err);
      }
      const symbolLen = 44;
      const indent = (symbolLen - 10) / 2;
      const msgList = [`\n${' '.repeat(indent)}Powered By`, data];
      if (version) {
        msgList.push(`${' '.repeat((symbolLen - 20) / 2)}Create Blocklet v${version}\n`);
      }
      msg = gradient(['cyan', 'rgb(0, 111, 150)', 'rgb(0, 246,136)']).multiline(msgList.join('\n'));
      echo(msg);
      return resolve(msg);
    });
  });
}

export const echoHelpMessage = (projectRoot) => {
  const docsUrl = 'https://www.arcblock.io/docs/blocklet-developer';
  const communityUrl = 'https://community.arcblock.io/';

  console.log(chalk.bold('📚 Resources: \n'));
  const readmeLink = join(projectRoot, 'README.md');
  if (terminalLink.isSupported) {
    console.log(`  ✅ Quick Start: ${terminalLink(readmeLink, readmeLink)}`);
    console.log(`  ✅ Documentation: ${terminalLink(`🔗 ${docsUrl}`, docsUrl)} (with code examples)`);
    console.log(`  ✅ Community: ${terminalLink(`💬 ${communityUrl}`, communityUrl)} (get expert help)`);
  } else {
    console.log(`  ✅ Quick Start: ${readmeLink}`);
    console.log(`  ✅ Documentation: ${docsUrl} (with code examples)`);
    console.log(`  ✅ Community: ${communityUrl} (get expert help)`);
  }
  console.log();
};
