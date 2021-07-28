# create-blocklet

## Scaffolding Your First Blocklet Project

> **Compatibility Note:**
> Blocklet template requires [Node.js](https://nodejs.org/) version >=14.0.0.

With NPM:

```bash
$ npm init blocklet@latest [blocklet-name]
```

With Yarn:

```bash
$ yarn create blocklet
```

With PNPM:

```bash
$ pnpx create-blocklet
```

Currently supported template presets include:

**dapp**

- `react`

**static**

- `react`

## Community Templates

create-blocklet is a tool to quickly start a project from a basic template for popular frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your project with github repository template.

```bash
npx degit user/project my-project
cd my-project

npm install
npm run dev
```

If the project uses `main` as the default branch, suffix the project repo with `#main`

```bash
npx degit user/project#main my-project
```
