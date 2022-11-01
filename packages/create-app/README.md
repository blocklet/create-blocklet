# create-blocklet

## Scaffolding Your First Blocklet

> **Compatibility Note:**
> Blocklet template requires [Node.js](https://nodejs.org/) version >=14.0.0.

## What can i do?

By using `create-blocklet` you can create a new blocklet in a few minutes. You can get a demo blocklet, understand how a blocklet works and how to use them.

## Start

With NPM:

```bash
npm init blocklet@latest [blocklet-name]
```

With Yarn: (recommend)

```bash
yarn create blocklet [blocklet-name]
```

With PNPM: (recommend)

```bash
pnpm create blocklet [blocklet-name]
```

Currently supported template presets include:

**dapp**

- `react`
- `vue3 + vite`
- `vue2 + @vue/cli`
- `solid-js`
- `svelte`
- `next.js`
- `react + gunjs`

**static**

- `react`
- `vue3 + vite`
- `vue2 + @vue/cli`
- `solid-js`
- `svelte`
- `website powered by blocklet pages`
- `documentation site powered by blocklet pages`
- `html`

**api**

- `express`

## Community Templates

create-blocklet is a tool to quickly start a blocklet from a basic template for popular frameworks. You can use a tool like [degit](https://github.com/Rich-Harris/degit) to scaffold your blocklet with github repository template.

```bash
npx degit user/blocklet my-blocklet
cd my-blocklet

npm install
npm run dev
```

If the blocklet uses `main` as the default branch, suffix the blocklet repo with `#main`

```bash
npx degit user/blocklet#main my-blocklet
```

## Development

Use `node /pathToCreateBlockletRepo/index.js` to create a blocklet, or you can use

```bash
ln -s /pathToCreateBlockletRepo/index.js /usr/local/bin/cb

cb
```

to create a blocklet

## Docs

View full documentation in [here](https://www.createblocklet.dev)
