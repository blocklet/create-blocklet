const templatesData = [
  {
    name: 'blocklet-page',
    desc: { 
      en: 'An xmark-driven website skeleton that can be used to build personal sites or project sites' ,
      zh: '一个由 xmark 驱动的网站骨架，可用于构建个人站点或项目站点', 
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
      en: 'An xmark-driven documentation site skeleton that can be used to build project documentation sites', 
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
      en: 'A server-side API application built on Express', 
      zh: '一个基于 Express 构建的服务端 API 应用' 
    },
    displayName: 'Express API',
    blockletType: 'dapp',
    composable: true,
    framework: 'Express',
    languages: 'JavaScript',
    useCase: 'Server Side Application',
    author: 'ZhangHan',
  },
  {
    name: 'html-static',
    desc: {
      en: 'A simple HTML static page application. Can be used to wrap an existing static web application into a Blocklet', 
      zh: '一个简单的 HTML 静态页面应用。可以用于将已有的静态网页程序包装成 Blocklet' 
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
      en: 'A Dapp Blocklet skeleton built with Next.js and Express', 
      zh: '一个基于 Next.js 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A Dapp Blocklet skeleton built with React and Express', 
      zh: '一个基于 React 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A front-end application skeleton built with React', 
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
      en: 'A Dapp Blocklet skeleton built with SolidJS and Express', 
      zh: '一个基于 SolidJS 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A front-end application skeleton built with Solidjs', 
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
      en: 'A Dapp Blocklet skeleton built with Svelte and Express', 
      zh: '一个基于 Svelte 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A front-end application skeleton built with Svelte', 
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
      en: 'A Dapp Blocklet skeleton built with Vue 3 and Express', 
      zh: '一个基于 Vue 3 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A front-end application skeleton built with Vue 3', 
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
      en: 'A Dapp Blocklet skeleton built with Vue 2 and Express', 
      zh: '一个基于 Vue 2 构建的 Dapp Blocklet 应用骨架' 
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
      en: 'A front-end application skeleton built with Vue 2', 
      zh: '一个基于 Vue 2 构建的前端应用骨架' 
    },
    blockletType: 'static',
    composable: true,
    languages: 'JavaScript',
    useCase: 'Starter',
    author: 'ZhangHan',
  },
];

// "react-static" => "React Static"
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
