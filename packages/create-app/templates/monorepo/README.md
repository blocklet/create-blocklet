## PROJECT_DESCRIPTION

This project is a monorepo project, which means that there are multiple blocklet applications.

## File Structure

- .prettierrc - Prettier configuration
- LICENSE - License file
- Makefile - Makefile
- package.json - Npm package file
- eslintrc.js
- lerna.json
- README.md - A guide for this blocklet
- version - Version file
- .gitignore
- .npmrc
- scripts/
  - batch-modify-deps-version.mjs
  - bump-version.mjs
- blocklets/ - Blocklet applications

## Development

1. Make sure you have [@blocklet/cli](https://www.npmjs.com/package/@blocklet/cli) installed

   Blocklet needs blocklet server as a dependency. So you need to install it first.
   `npm install -g @blocklet/cli`
   See details in [https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli](https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli)

2. Init blocklet server & start blocklet server

   Before starting an blocklet server, you need to init blocklet server.
   `blocklet server init --mode=debug`
   `blocklet server start`
   See details in [https://www.arcblock.io/docs/blocklet-developer/getting-started](https://www.arcblock.io/docs/blocklet-developer/getting-started)

3. init project

```bash
 npm run init
```

4. Go to the main blocklet directory `cd blocklets/[main blocklet]`
5. Start development server: `npm run dev`
6. Go to the other blocklet directory `cd blocklets/[other blocklet]`
7. Start development server: `npm run dev:child`

## update version

```bash
npm run bump-version
```

## Bundle

## Deploy

## Upload to blocklet store

## Q & A

## Learn More


