const fs = require("fs");
const path = require("path");
const YAML = require("js-yaml");

const configFile = path.resolve(
  path.dirname(__filename),
  "../.blocklet-pages/config.yml"
);
const outDir = path.join(path.dirname(__filename), "../pages");

const source = fs.readFileSync(configFile, "utf8");
const {
  themeConfig: { sidebar },
} = YAML.load(source);

sidebar.zh.forEach((x, i) => {
  const names = ["index.mdx", "index.zh.mdx"];
  const files = Array.isArray(x.items)
    ? x.items.map((c, j) => ({
        p: path.join(outDir, c.link),
        t: [sidebar.en[i].items[j].text, c.text],
      }))
    : [{ p: path.join(outDir, x.link), t: [sidebar.en[i].text, x.text] }];

  files.forEach(({ p, t }) => {
    if (fs.existsSync(p)) {
      return;
    }

    names.forEach((n, k) => {
      fs.mkdirSync(p, { recursive: true });
      const fileName = path.join(p, n);
      fs.writeFileSync(
        fileName,
        `---
layout: 'documentation'
title: ${t[k]}
---

:::Alert
this page is a draft and need to be updated
:::

  `
      );
      console.log(fileName);
    });
  });
});
