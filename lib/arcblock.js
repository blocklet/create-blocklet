import figlet from 'figlet';
import terminalLink from 'terminal-link';
import { green } from 'kolorist';
import gradient from 'gradient-string';

export function echoBrand() {
  let msg;
  return new Promise((resolve, reject) => {
    figlet.text('ArcBlock', { width: 44 }, (err, data) => {
      if (err) {
        return reject(err);
      }
      const symbolLen = 44;
      const indent = (symbolLen - 10) / 2;
      msg = gradient(['cyan', 'rgb(0, 111, 150)', 'rgb(0, 246,136)']).multiline(
        ['', `${' '.repeat(indent)}Powered By`, data].join('\n')
      );
      console.log(msg);
      return resolve(msg);
    });
  });
}
export function echoDocument() {
  const url = 'https://docs.arcblock.io/abtnode/';
  let msg;
  if (terminalLink.isSupported) {
    msg = green(terminalLink(`Documentation: ${url}`, url));
  } else {
    msg = green(`Documentation: ${url}`);
  }
  console.log(msg, '\n');
  return msg;
}
