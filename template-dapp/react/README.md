# Getting Started with Create Blocklet

This project was bootstrapped with [Create Blocklet](https://github.com/blocklet/create-blocklet).

This blocklet is a dapp project, which means this is a fullstacked application. It's cantained both `server` and `client` code.

## File Structure

- .blocklet/ - blocklet bundle result
- public/ - static files
  - favicon.ico - favicon
  - favicon.svg - favicon
  - index.html - main html file, template for react
- screenshots/ - Screenshots
- server/ - Server side code
  - hooks/ - `blocklet dev` hooks
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

   Blocklet need abtnode as a dependency. So you need to install it first.  
   `npm install -g @abtnode/cli`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#use-the-binary-distribution)

2. Init abtnode & start abtnode

   Before start a abtnode, you need to init abtnode.  
   `abtnode init`  
   `abtnode start`  
   See details in [https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node](https://docs.arcblock.io/abtnode/en/introduction/abtnode-setup#configure-abt-node)

3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Start development server: `blocklet dev`

## Bundle

After development a blocklet, you may need to bundle it. Use `npm run bundle` command.

## Deploy

- If you want to deploy this blocklet to local abtnode, you can use `npm run deploy` command.
- If you want to deploy this blocklet to remote abtnode, you can use the command below.

  ```shell
  blocklet deploy .blocklet/bundle --endpoint {your abtnode url} --access-key {abtnode access key} --access-secret {abtnode access secret} --skip-hooks
  ```

  > Be sure you have bundle blocklet at first.

## Publish

- If you want to publish this blocklet to local registry, you can use command below.

  Bump version at first.

  ```shell
  make bump-version
  ```

  Realease a new version to registry.

  ```shell
  blocklet config registry {local registry url}
  npm run release
  ```

- If you want to publish this blocklet to remote registry by hand, you can use the command below.

  Bump version at first.

  ```shell
  make bump-version
  ```

  Get a developer-sk by use this command.

  ```shell
  blocklet developer:init
  ```

  Realease a new version to registry.

  ```shell
  blocklet config registry {remote registry url}
  blocklet publish --developer-sk {developerk-sk}
  ```

- You can publish a new version to remote registry by github CI.
  Bump version at first.

  ```shell
  make bump-version
  ```

  Push your code to github main/master branch, or make a pull request to main/master branch.  
  The CI workflow will automatically publish a new version to remote registry.

## Q & A

1. Q: How to change a blocklet's name?

   A: Change the `name` field in `package.json` file, change the `name` field in `blocklet.yml` file.

   You can also change the `title` field and `description` field in `blocklet.yml` file .

   Run `blocklet meta` command, you will get a `did` config, copy the `did` value.

   Replace this command `"bundle:client": "PUBLIC_URL='/.blocklet/proxy/{did}' npm run build",` in `package.json`

   Replace `did` field in `blocklet.yml`

2. Q: How to change a blocklet's logo?

   Change the `logo.png` file root folder.

   Or you can change the `logo` field in `blocklet.yml` file.

   > Make sure you have add the logo path to `blocklet.yml` file `files` field.

## Learn More

- Full configure of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of AbtNode & blocklet development: [https://docs.arcblock.io/abtnode/en/introduction](https://docs.arcblock.io/abtnode/en/introduction)

## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
