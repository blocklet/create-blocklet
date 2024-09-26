## PROJECT_DESCRIPTION
This blocklet is a dapp project, which means this is a full-stack application. It's contained both `server` and `client` code.

## Launch on Blocklet Server

[![Launch on Blocklet Server](https://assets.arcblock.io/icons/launch_on_blocklet_server.svg)](https://install.arcblock.io/launch?action=blocklet-install&meta_url=https%3A%2F%2Fgithub.com%2Fblocklet%2Fpages-kit%2Freleases%2Fdownload%2Fv0.1.33%2Fblocklet.json)

## FILE_STRUCTURE

- public/ - static files
  - favicon.ico - favicon
  - favicon.svg - favicon
  - index.html - main html file, template for react
- screenshots/ - Screenshots
- api/
  - src/ - Api side code
    - hooks/ - blocklet lifecycle hooks
    - libs/ - Api side libraries
    - middlewares/ - Api side middlewares
    - routes/ - Api side routes
    - index.ts - Api side entry point
- src/ - Client side code (A standard react app structure)
- .env - Environment variables
- .env.local - Local environment variables
- .eslintrc.js - ESLint configuration
- .gitignore - Git ignore file
- .prettierrc - Prettier configuration
- blocklet.md - Blocklet README
- blocklet.yml - Blocklet configuration
- LICENSE - License file
- logo.png - Blocklet logo file
- package.json - Npm package file
- README.md - A guide for this blocklet
- version - Version file
