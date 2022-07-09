## 0.4.13 (七月 09, 2022)

- feat： add faq->publish-to-blocklet-store
- chore: set priority for all pages
- feat: add service page
- feat: add faq pages
- chore: tweak styles
- chore: update deps
- feat: add logo

## 0.4.12 (七月 09, 2022)

- feat: polish the github workflows to support publish plugins

## 0.4.11 (七月 08, 2022)

- feat: bump-version script can update the create-app/templates plugin version
- feat: support the templates of vue/solidjs/svelte(use vite) dev in the component mode

## 0.4.10 (七月 07, 2022)

- feat: support the templates of vue(use @vue/cli) dev in the component mode

## 0.4.9 (七月 06, 2022)

- feat: support the templates of craco dev in the component mode

## 0.4.8 (七月 05, 2022)

- fix: delay ux locale change

## 0.4.7 (七月 05, 2022)

- fix: safe with AsciinemaPlayer dispose

## 0.4.6 (七月 05, 2022)

- chore: update deps

## 0.4.5 (六月 29, 2022)

- chore: update create-app favicon.ico
- feat: use `@xmark/theme-docs`

## 0.4.4 (六月 28, 2022)

- fix: use `npm publish` rather than `pnpm publish`
- feat: support deploy docs-site as child blocklet of page-site
- chore: change docs-site logo

## 0.4.3 (六月 24, 2022)

- chore: update docs-site
- chore: complete page-site
- chore: update deps

## 0.4.2 (六月 22, 2022)

- chore: update default logo size

## 0.4.1 (六月 21, 2022)

- fix: correct page site & docs site link

## 0.4.0 (六月 21, 2022)

- chore: add scripts to bump-version
- fix: header should go to path with basename
- chore: add deploy staging ci
- chore: update .npmrc
- chore: use virtual:context module rather than @xmark/utils/inject
- chore: change blocklet.yml & docs-site, page-site bundle command
- chore: rename doc-site -> docs-site
- chore: adjust Header components
- chore: polish theme-docs style
- chore: polish Siderbar style
- feat: support docs footer
- feat: support locale change in header
- feat: support passin custom components to mdx
- chore(deps): update dependencies
- Merge branch 'main' into feat-monorepo
- feat: add create-blocklet doc site
- feat: add create-blocklet homepage site
- feat:change repo to monorepo

## 0.3.15 (六月 17, 2022)

- chore: replace the default created logo
- chore: introduce developers to use blocklet dev

## 0.3.14 (六月 17, 2022)

- chore: turn off react templates to strict mode
- chore: remove blocklet.md and README.md in blocklet.yml
- chore: add npm run lint:fix script

## 0.3.13 (六月 03, 2022)

- fix: react-xxx template should remove react-import

## 0.3.12 (六月 02, 2022)

- chore(deps): update dependencies
- fix: polish html-static

## 0.3.11 (五月 23, 2022)

- chore: update dependencies

## 0.3.10 (五月 10, 2022)

- fix: dapp use `BLOCKLET_PORT` in production mode

## 0.3.9 (四月 30, 2022)

- chore: update template dependencies
- feat: add svelte-dapp template
- chore: fix some template error
- feat: add svelte-static template
- feat: add solidjs-dapp template
- feat: add solidjs-static template
- feat: add html-static template
- feat: xxx-dapp template will generate random port as api-port
- feat: add version-check in templates
- fix: remove bump_version extra '\n'

## 0.3.8 (四月 15, 2022)

- feat: add ".editorconfig" file

## 0.3.7 (四月 15, 2022)

- fix: update prettier "jsxBracketSameLine" -> "bracketSameLine"

## 0.3.6 (April 07, 2022)

- fix: get blocklet server user info
- fix: show react + gunjs in create-blocklet flow
- chore: add new template for react-gunjs
- chore: tune react template home page

## 0.3.5 (四月 02, 2022)

- fix: Initial user info is 'undefined'
- fix: polish templates
- chore: tweak templates folder structure

## 0.3.4 (四月 01, 2022)

- fix: update create blocklet flow fixes #89 #86 #83
- chore: add test for lib/did
- fix: change `charging` -> `payment` in blocklet.yml fixes #85

## 0.3.3 (三月 26, 2022)

- feat: add `blocklet config` to get name & email

## 0.3.2 (三月 25, 2022)

- fix: echoBrand version

## 0.3.1 (三月 24, 2022)

- feat: add dapp/nextjs
- fix: make vite hmr works perfect
- chore: update create step prompt message
- feat: add api/express template

## 0.3.0 (三月 22, 2022)

- chore: polish templates closed #34 #35 #38 #50 #56
- fix: initGitRepo
- feat: use zx
- fix: closed #71, polish github action ci default value
- fix: template dapps return empty object when it's not login
- fix: closed #70, disabled random logo
- chore: update template blocklet-page dependencies

## 0.2.18 (March 14, 2022)

- chore: remove service selection

## 0.2.17 (二月 24, 2022)

- chore: update readme

## 0.2.16 (二月 24, 2022)

- fix: change .npmrc -> \_npmrc to aviod ignore .npmrc file

## 0.2.15 (二月 24, 2022)

- feat: add blocklet page template (static)

## 0.2.14 (February 23, 2022)

- feat: make blocklet bundle work with pnpm

## 0.2.13 (February 22, 2022)

- chore: deprecate window.env, use meta.js instead

## 0.2.12 (January 27, 2022)

- chore: polish server template for new blocklet sdk

## 0.2.11 (January 18, 2022)

- feat: add uncaughtException handler in pre-start hook

## 0.2.10 (一月 17, 2022)

- fix(ci): update templates ci variables
- chore(docs): polish rebrand Abtnode -> Blocklet Server
- fix(cli): update `getServerStatus` function

## 0.2.9 (十二月 22, 2021)

- chore: rebrand abtnode -> blocklet server

## 0.2.8 (十一月 26, 2021)

- feat: rebrand blocklet registry -> blocklet store

## 0.2.7 (十一月 21, 2021)

- chore: prettier default useTabs: false

## 0.2.6 (十一月 20, 2021)

- feat: add vue2 + @vue/cli template

## 0.2.5 (十一月 20, 2021)

- feat: add vite + vue3 template

## 0.2.4 (October 28, 2021)

- chore: bump deps to latest

## 0.2.3 (十一月 08, 2021)

- chore: update README.md
- chore: remove sharp

## 0.2.2 (十月 19, 2021)

- chore: use blocklet/sdk WalletHandlers

## 0.2.1 (十月 15, 2021)

- feat: use action-workflow

## 0.2.0 (九月 30, 2021)

- feat: add npm script "upload"
- fix #25
- fix #22
- fix #21
- fix #24
- fix #23

## 0.1.7 (八月 12, 2021)

- feat: support generate did
- fix: remove yarn command

## 0.1.6 (八月 06, 2021)

- fix: [#8](https://github.com/blocklet/create-blocklet/issues/8)

## 0.1.5 (八月 03, 2021)

- chore: enhanced use of blocklet command

## 0.1.4 (八月 02, 2021)

- fix: add 'lib' to npm publish files

## 0.1.3 (八月 02, 2021)

- feat: add react-dom-router
- fix: #4
- fix: #3
- fix: #2
- fix: #1

## 0.1.2 (七月 23, 2021)

- fix: dapp npm bundle

## 0.1.1 (七月 23, 2021)

- fix: add folder to npm publish
