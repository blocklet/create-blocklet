const templateInfoModules = import.meta.glob('../../node_modules/create-blocklet/templates/*/template-info.json', { import: 'default', eager: true })

const templatesData = Object.values(templateInfoModules);

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
