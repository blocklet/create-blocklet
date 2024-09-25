# Getting Started with Create Blocklet

This project was bootstrapped with [Create Blocklet](https://github.com/blocklet/create-blocklet).

{PROJECT_DESCRIPTION}

## File Structure

{FILE_STRUCTURE}

## Development

1. Make sure you have [@blocklet/cli](https://www.npmjs.com/package/@blocklet/cli) installed

   Blocklet needs blocklet server as a dependency. So you need to install it first.
   `npm install -g @blocklet/cli`
   See details in [ https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli#start-blocklet-server]( https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli#start-blocklet-server)

2. Init blocklet server & start blocklet server

   Before starting an blocklet server, you need to init blocklet server.
   `blocklet server init`
   `blocklet server start`
   See details in [https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli#start-blocklet-server](https://www.arcblock.io/docs/blocklet-developer/install-blocklet-cli#start-blocklet-server)
   
3. Go to the project directory `cd [name]`
4. Install dependencies: `npm install` or `yarn`
5. Start development server: `blocklet dev`

## Bundle

After developing a blocklet, you may need to bundle it. Use `npm run bundle` command.

## Deploy

- If you want to deploy this blocklet to local blocklet server, you can use `blocklet deploy .blocklet/bundle --app-id {appId}` command(Make sure the blocklet is bundled before deployment).
  - appId is the id of the container you want to run on your server, you can see it in your server's dashboard
- If you want to deploy this blocklet to remote blocklet server, you can use the command below.

  ```shell
  blocklet deploy .blocklet/bundle --endpoint {your blocklet server url} --access-key {blocklet server access key} --access-secret {blocklet server access secret}
  ```

## Upload to blocklet store

- If you want to upload the blocklet to any store for other users to download and use, you can following the following instructions.

  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Connect to a store, You may need some testnet tokens to deploy your blocklet, you can get some from https://faucet.abtnetwork.io/

  ```shell
  blocklet connect https://test.store.blocklet.dev/
  ```

  Upload a new version to a store.

  > Make sure the blocklet is bundled before upload.

  ```shell
  blocklet upload
  ```

  Or you can simply use `npm run upload` command.

- You also can upload a new version to a store by Github CI.
  Bump version at first.

  ```shell
  npm run bump-version
  ```

  Push your code to Github main/master branch, or make a pull request to the main/master branch.
  The CI workflow will automatically upload a new version to a store.


## Q & A

1. Q: How to change a blocklet's logo?

   Change the `logo.png` file root folder.

   Or you can change the `logo` field in the `blocklet.yml` file.

   > Make sure you have added the logo path to the `blocklet.yml` file `files` field.

{QA_SECTION}

## Learn More

- Full specification of `blocklet.yml`: [https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md](https://github.com/blocklet/blocklet-specification/blob/main/docs/meta.md)
- Full document of Blocklet Server & blocklet development: [https://www.arcblock.io/docs/blocklet-developer](https://www.arcblock.io/docs/blocklet-developer)



## License

The code is licensed under the Apache 2.0 license found in the
[LICENSE](LICENSE) file.
