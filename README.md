<br/>

<p align="center">
<img src="./website/docs/public/logos/logo-h.png" style="width:200px;" />
</p>

## Features

A tool helps you to quickly setup a blocklet for Blocklet Server, with:

- Out of the box to use
- Plenty of templates
- Seamless integration with Blocklet Server

View more details on [Create Blocklet](./packages/create-app)

Check docs in [here](https://www.createblocklet.dev)

## Docs

Our docs site is generate by Create Blocklet itself.

We use Blocklet Page to write our docs

check more details on

- [home page site](./website/pages)
- [docs site](./website/docs)

## plugins

TBD

## Install deps

```bash
pnpm install

```

## Run the command

```bash
node packages/create-app/index.js test-demo
```

## Change Blocklet Server Command

Change the file `packages/create-app/lib/constant.js`

```
// your command alias
export const BLOCKLET_COMMAND = 'bn';
```
