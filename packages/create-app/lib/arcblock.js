import figlet from 'figlet';
import terminalLink from 'terminal-link';
import gradient from 'gradient-string';
import { chalk, echo } from 'zx';

const { green } = chalk;

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
export function echoDocument() {
  const url = 'https://www.arcblock.io/docs/blocklet-developer';
  let msg;
  if (terminalLink.isSupported) {
    msg = green(terminalLink(`Documentation: ${url}`, url));
  } else {
    msg = green(`Check documentation in here: ${url}`);
  }
  echo('\n', msg, '\n');
  return msg;
}
