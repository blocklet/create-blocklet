const templatesData = [
  {
    name: 'blocklet-page',
    desc: { 
      en: '一个由 xmark 驱动的网站骨架，可用于构建个人站点或项目站点', 
      zh: '一个由 xmark 驱动的网站骨架，可用于构建个人站点或项目站点' 
    },
    blockletType: 'static',
    composable: true,
    framework: 'xmark',
    languages: 'JavaScript',
    useCase: 'Documentation / Website',
    author: 'ZhangHan',
  },
  {
    name: 'doc-site',
    desc: { 
      en: '一个由 xmark 驱动的文档站骨架，可以用于构建项目文档站点', 
      zh: '一个由 xmark 驱动的文档站骨架，可以用于构建项目文档站点' 
    },
    blockletType: 'static',
    composable: true,
    framework: 'xmark',
    languages: 'JavaScript',
    useCase: 'Documentation / Website',
    author: 'ZhangHan',
  },
  {
    name: 'express-api',
    desc: { 
      en: '一个基于 Express 构建的服务端 API 应用', 
      zh: '一个基于 Express 构建的服务端 API 应用' 
    },
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
    desc: { 
      en: '一个最简单的 HTML 静态页面应用。可以用于将已有的静态网页程序包装成 Blocklet', 
      zh: '一个最简单的 HTML 静态页面应用。可以用于将已有的静态网页程序包装成 Blocklet' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'HTML',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'nextjs-dapp',
    desc: { 
      en: '一个基于 Next.js 构建的 Dapp 应用骨架', 
      zh: '一个基于 Next.js 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'react-dapp',
    desc: { 
      en: '一个基于 React 构建的 Dapp 应用骨架', 
      zh: '一个基于 React 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'react-static',
    desc: { 
      en: '一个基于 React 构建的前端应用骨架', 
      zh: '一个基于 React 构建的前端应用骨架' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'solidjs-dapp',
    desc: { 
      en: '一个基于 SolidJS 构建的 Dapp 应用骨架', 
      zh: '一个基于 SolidJS 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'solidjs-static',
    desc: { 
      en: '一个基于 Solidjs 构建的前端应用骨架', 
      zh: '一个基于 Solidjs 构建的前端应用骨架' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'svelte-dapp',
    desc: { 
      en: '一个基于 Svelte 构建的 Dapp 应用骨架', 
      zh: '一个基于 Svelte 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'svelte-static',
    desc: { 
      en: '一个基于 Svelte 构建的前端应用骨架', 
      zh: '一个基于 Svelte 构建的前端应用骨架' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue-dapp',
    desc: { 
      en: '一个基于 Vue 3 构建的 Dapp 应用骨架', 
      zh: '一个基于 Vue 3 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue-static',
    desc: { 
      en: '一个基于 Vue 3 构建的前端应用骨架', 
      zh: '一个基于 Vue 3 构建的前端应用骨架' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue2-dapp',
    desc: { 
      en: '一个基于 Vue 2 构建的 Dapp 应用骨架', 
      zh: '一个基于 Vue 2 构建的 Dapp 应用骨架' 
    },
    blockletType: 'dapp',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
  {
    name: 'vue2-static',
    desc: { 
      en: '一个基于 Vue 2 构建的前端应用骨架', 
      zh: '一个基于 Vue 2 构建的前端应用骨架' 
    },
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