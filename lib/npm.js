import rc from 'rc';

export function getConfig(key) {
  const conf = rc('npm');
  return conf?.[key] || '';
}

export function getAuthor() {
  const name = getConfig('init.author.name');
  const email = getConfig('init.author.email');

  return { name, email };
}
