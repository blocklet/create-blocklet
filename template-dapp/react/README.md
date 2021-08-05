# Getting Started with Create Blocklet

This project was bootstrapped with [Create Blocklet](https://github.com/blocklet/create-blocklet).

This blocklet is a dapp project, which means this is a full-stack application. It's contained both `server` and `client` code.

## File Structure

- public/ - static files
  - favicon.ico - favicon
  - favicon.svg - favicon
  - index.html - main html file, template for react
- screenshots/ - Screenshots
- server/ - Server side code
  - hooks/ - blocklet lifecycle hooks
  - libs/ - Server side libraries
  - middlewares/ - Server side middlewares
  - routes/ - Server side routes
  - index.js - Server side entry point
- src/ - Client side code (A standard react app structure)
- tools/ - Tools
  - publish.sh - Scripts for github CI
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- Makefile - Makefile
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file

## Development

1. Make sure you have [@abtnode/cli](https://www.npmjs.com/package/@abtnode/cli) installed

   Blocklet needs abtnode as a dependency. So you need to install it first.  
   `npm install -g @abtnode/cli`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution)

2. Init abtnode & start abtnode

   Before starting an abtnode, you need to init abtnode.  
   `abtnode init --mode=debug`  
   `abtnode start`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node)

3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Start development server: `blocklet dev`

## Bundle

After developing a blocklet, you may need to bundle it. Use `npm run bundle` command.

## Deploy

- If you want to deploy this blocklet to local abtnode, you can use `blocklet deploy .blocklet/bundle` command(Make sure the blocklet is bundled before deployment).
  > Or you can simply use `npm run deploy` command.
- If you want to deploy this blocklet to remote abtnode, you can use the command below.

  ```shell
  blocklet deploy .blocklet/bundle --endpoint {your abtnode url} --access-key {abtnode access key} --access-secret {abtnode access secret}
  ```

  > Make sure the blocklet is bundled before deployment.

## Publish

- If you want to publish the blocklet to any registry for other users to download and use, you can following the following instructions.

  Bump version at first.

  ```shell
  make bump-version
  ```

  Get a `developer-sk` by using this command.

  > Why we need a `developer-sk`?  
  > A `developer-sk` means we have a self-signed key, which help us publish our blocklet to any registry.

  ```shell
  blocklet developer:init
  ```

  Then config registry publish url to a `blocklet registry`

  You can use those registry url in below.

  1. [https://registry.arcblock.io/](https://registry.arcblock.io/)
  2. [https://dev.registry.arcblock.io/](https://dev.registry.arcblock.io/)
  3. A blocklet registry started by yourself.
     > Make sure you have installed a `blocklet registry` on your own abtnode. Check it on here: [https://registry.arcblock.io/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ](https://registry.arcblock.io/blocklet/z8ia29UsENBg6tLZUKi2HABj38Cw1LmHZocbQ)

  ```shell
  blocklet config registry {registry url}
  ```

  Release a new version to a registry.

  > Make sure the blocklet is bundled before publish.

  ```shell
  blocklet publish
  ```

  Or you can simply use `npm run release` command.

- You also can publish a new version to a registry by Github CI.  
  Bump version at first.

  ```shell
  make bump-version
  ```

  Push your code to Github main/master branch, or make a pull request to the main/master branch.  
  The CI workflow will automatically publish a new version to a registry.

## Q & A

1. Q: How to change a blocklet's name?

   A: Change the `name` field in the `package.json` file, change the `name` field in the `blocklet.yml` file.

   You can also change the `title` field and `description` field in the `blocklet.yml` file.

   Run `blocklet meta` command, you will get a `did` config, copy the `did` value.

   Replace this command `"bundle:client": "PUBLIC_URL='/.blocklet/proxy/{did}' npm run build",` in `package.json`

   Replace `did` field in the `blocklet.yml`

2. Q: How to change a blocklet's logo?

   Change the `logo.png` file root folder.

   Or you can change the `logo` field in the `blocklet.yml` file.

   > Make sure you have added the logo path to the `blocklet.yml` file `files` field.

## Learn More

- Full specification of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of AbtNode & blocklet development: [https://docs.arcblock.io/abtnode/en/introduction](https://docs.arcblock.io/abtnode/en/introduction)

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
