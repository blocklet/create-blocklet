import rc from 'rc';

function getNPMConfig(key) {
  const conf = rc('npm');
  console.log('conf :>> ', conf);
  return conf?.[key] || '';
}

function getNpmAuthor() {
  const npmAuthor = getNPMConfig('init.author.name');
  const npmEmail = getNPMConfig('init.author.email');
  let author = '';
  if (npmAuthor) {
    author = npmEmail ? `${npmAuthor} <${npmEmail}>` : npmAuthor;
  }

  return author;
}

const info = getNpmAuthor();

console.log('info :>> ', info);
