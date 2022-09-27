const templatesData = [
  {
    name: 'blocklet-page',
    blockletType: 'static',
    composable: true,
    framework: 'xmark',
    languages: 'JavaScript',
    useCase: 'Documentation / Website',
    author: 'ZhangHan',
  },
  {
    name: 'doc-site',
    blockletType: 'static',
    composable: true,
    framework: 'xmark',
    languages: 'JavaScript',
    useCase: 'Documentation / Website',
    author: 'ZhangHan',
  },
  {
    name: 'express-api',
    displayName: 'Express API',
    blockletType: 'dapp',
    composable: true,
    framework: 'Express',
    languages: 'JavaScript',
    useCase: 'Server Side API Application',
    author: 'ZhangHan',
  },
  {
    name: 'html-static',
    blockletType: 'static',
    composable: true,
    languages: 'HTML',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'nextjs-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'react-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'react-static',
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'solidjs-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'solidjs-static',
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'svelte-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'svelte-static',
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue-static',
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue2-dapp',
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue2-static',
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
];

const toDisplayName = (text) => {
  return text.replace(/(^\w|-\w)/g, (str) => str.replace(/-/, ' ').toUpperCase());
}

const getImage = (name) => {
  return new URL(`../../pages/templates/images/${name}.png`, import.meta.url).href
}

export const templates = templatesData.map(item => ({
  ...item,
  displayName: item.displayName || toDisplayName(item.name),
  readme: `https://github.com/blocklet/create-blocklet/blob/main/packages/create-app/templates/${item.name}/README.md`,
  coverImage: getImage(item.name),
}));

const templatesKeyByName = templates.reduce((acc, cur) => ({ ...acc, [cur.name]: cur }), {});

export const findByName = (name) => templatesKeyByName[name];

export const search = (conditions = {}) => {
  return templates.filter(template => {
    const fields = Object.keys(conditions);
    return fields.every(field => conditions[field] === template[field]);
  });
}

export const labels = {
  en: {
    name: 'xxxx',
    blockletType: 'xxxx',
    composable: 'xxxx',
    languages: 'xxxx',
    useCase: 'xxxx',
    author: 'xxxx',
  },
  zh: {
    name: 'xxxx',
    blockletType: 'xxxx',
    composable: 'xxxx',
    languages: 'xxxx',
    useCase: 'xxxx',
    author: 'xxxx',
  }
};