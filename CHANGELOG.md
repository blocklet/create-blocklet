## 0.7.4 (2024-3-20)

- fix(api): force use png format logo as favicon

## 0.7.3 (2024-3-7)

- feat: add git-ignore env files

## 0.7.2 (2024-1-5)

- chore: update deps & lock `get-port` at 5.1.1

## 0.7.1 (2024-1-2)

- fix: compatible with vite5

## 0.7.0 (2023-12-21)

- chore: clean deps
- chore: remove docsite & website template
- chore: update deps

## 0.6.16 (2023-12-2)

- fix: update user type define

## 0.6.15 (2023-9-5)

- chore: bump deps to latest
- chore: use fallback middleware from blocklet sdk

## 0.6.14 (2023-8-24)

- feat: remove meta description in favor of server injected

## 0.6.13 (2023-8-16)

- fix: more favicon and logo loading

## 0.6.12 (2023-8-16)

- chore: use favicon from service instead of static file

## 0.6.11 (2023-8-15)

- feat: support smaller logo and favico size

## 0.6.10 (2023-7-31)

- fix: remove background color of loading

## 0.6.9 (2023-7-26)

- fix: vite-plugin-entry-inject cause dev error

## 0.6.8 (2023-7-25)

- fix: spinner logo size

## 0.6.7 (2023-7-25)

- chore: bump deps to latest
- feat: move entry js to body for production build
- feat: offload brotli/gzip compression to server

## 0.6.6 (2023-6-10)

- chore: update deps
- feat: show connect-url in create step

## 0.6.5 (2023-6-1)

- chore: translate PULL_REQUEST_TEMPLATE to english
- feat: enable loading plugin by default

## 0.6.4 (2023-5-23)

- feat: add nestjs-api template

## 0.6.3 (2023-5-12)

- chore: update vite to latest
- chore: update zx --quiet
- chore: update deps
- fix: bundle use blocklet.yml -> did first

## 0.6.2 (2023-4-25)

- chore: update create error process
- chore: disableNodePolyfills default -> false
- chore: update deps

## 0.6.1 (2023-4-11)

- fix: rename enum/index.js -> lib/constant.js

## 0.6.0 (2023-2-21)

- chore: add error catch
- fix: generate did
- chore: pass `monikers` to `blocklet init` command
- feat: support create monorepo with new did generate step
- feat: support get did from `blocklet init --onlyDid` command

## 0.5.21 (2023-4-3)

- chore: update deps
- chore: update site deploy config

## 0.5.20 (2023-3-30)

- chore: add vite-plugin-node-polyfills in vite-plugin-blocklet

## 0.5.19 (2023-3-30)

- fix(template): should only skip ci base on head commit

## 0.5.18 (2023-3-9)

- chore: support custom appType option for vite server

## 0.5.17 (2023-2-25)

- fix: doc links and vite default config

## 0.5.16 (2023-2-15)

- fix: ignore unused parameters for error handler

## 0.5.15 (2023-2-15)

- fix: correct handle express error

## 0.5.14 (2023-2-10)

- fix: add tsconfig for eslint and format code

## 0.5.13 (2023-2-7)

- feat: add react-dapp-ts template

## 0.5.12 (2023-2-1)

- fix: check version compatible with beta version

## 0.5.11 (2023-1-29)

- chore: add README
- feat: setupClient support pass confiFile params

## 0.5.10 (2023-1-28)

- chore: remove favicon link in some templates

## 0.5.9 (2022-12-14)

- chore: update deps
- fix: remove useless deps

## 0.5.8 (2022-12-6)

- chore: add navigation did
- fix: generate error did

## 0.5.7 (2022-12-6)

- fix: navigation

## 0.5.6 (2022-11-19)

## 0.5.5 (2022-11-10)

- chore: update deps
- fix: vite-plugin-blocklet peerDependencies vite should be ">=2"

## 0.5.4 (2022-11-4)

- fix: support bump blocklet version while bump-version fixes #161
- chore: add faq for "not found global / buffer / process" fixes #232
- chore: use node-linker=hoisted for pnpm

## 0.5.3 (2022-11-4)

- chore: update docs

## 0.5.2 (2022-11-3)

- chore: update deps
- chore: recover gun.js template
- fix: better hmr with xxx-dapp templates fixes #248

## 0.5.1 (2022-11-3)

- chore: update pull template
- fix: bump-version no modified blocklet version

## 0.5.0 (2022-11-2)

- chore: fix typo
- chore: update deps
- chore: update template title
- chore: update vue2-static with vite
- chore: update vue2-dapp with vite
- chore: update xxx-static template, remove vite-plugin-html
- chore: update svelte-dapp template
- chore: update solidjs-dapp template
- chore: update react-gun-dapp template
- chore: update react-dapp template
- feat: vite-plugin-blocklet can inject title automatic
- feat: better workflow in vue-dapp template

## 0.4.81 (2022-11-1)

- chore: fix husky no executable

## 0.4.80 (2022-10-31)

- chore: all templates support windows

## 0.4.79 (十月 27, 2022)

- chore: update docs

## 0.4.78 (October 20, 2022)

## 0.4.77 (October 19, 2022)

- replace makefile and bash script with npm script and zx

## 0.4.76 (十月 18, 2022)

- chore: update dependency module

## 0.4.75 (十月 17, 2022)

- fix: npm publish and pack leaving out files.

## 0.4.74 (十月 14, 2022)

- chore: additional English translation documentation
- chore: bump deps and fix dev issue
- chore: additional documentation for create-blocklet

## 0.4.73 (十月 13, 2022)

- fix: LICENSE is missing in items of type monorepo

## 0.4.72 (十月 13, 2022)

- copy fix some files are missing

## 0.4.71 (十月 11, 2022)

- refactor: migrate react template's framework from carco to vite

## 0.4.70 (十月 10, 2022)

- chore: update dependency module

## 0.4.69 (十月 10, 2022)

- feat: update xmark
- fix: article error link

## 0.4.68 (October 08, 2022)

- chore: split template infos into individual template-info.json files

## 0.4.67 (September 30, 2022)

- chore: support '--template' arg to create-blocklet command

## 0.4.66 (September 30, 2022)

- chore: rename blocklet pages template

## 0.4.65 (September 30, 2022)

- chore: update github actions

## 0.4.64 (九月 30, 2022)

- docs: ui improvements for template pages

## 0.4.63 (九月 29, 2022)

- fix: error caused by locale context

## 0.4.62 (九月 29, 2022)

- docs: add template gallery and template detail pages

## 0.4.61 (九月 29, 2022)

- chrore: add @xmark/client for "website/page"

## 0.4.60 (September 29, 2022)

- fix: home page link

## 0.4.59 (September 28, 2022)

- chore: use latest xmark

## 0.4.58 (September 28, 2022)

- feat: add template argument to create-blocklet command

## 0.4.57 (September 28, 2022)

- chore: polish quick start

## 0.4.56 (September 28, 2022)

- fix: navigation

## 0.4.55 (September 27, 2022)

- chore: rename children to components in blocklet.yml

## 0.4.54 (September 27, 2022)

- chore: welcome page
- chore: refer to blocklet developer links
- chore: bump xmark to latest
- chore: add faq and chapter redirect
- chore: new doc structure

## 0.4.53 (九月 24, 2022)

- chore: update deps
- chore: node-linker=hoisted
- feat: add docs search

## 0.4.52 (九月 22, 2022)

- fix: monorepo bump version

## 0.4.51 (九月 22, 2022)

- fix: single project name
- fix: bugbash-0921

## 0.4.50 (九月 17, 2022)

- chore: update monorepo readme
- chore: support monorepo template
- chore: rename website&&docsite

## 0.4.49 (九月 13, 2022)

- fix: blocklet.md irrelevant content and template name

## 0.4.48 (九月 02, 2022)

- chore: update bump-version
- chore: add github actions

## 0.4.46 (August 30, 2022)

- chore: fix production cache and fullstack-react building

## 0.4.45 (August 22, 2022)

- chore: add logo wall

## 0.4.44 (八月 19, 2022)

- chore: bump deps to latest

## 0.4.43 (August 19, 2022)

- chore: bump deps to latest

## 0.4.42 (八月 19, 2022)

- chore: update logo

## 0.4.41 (八月 19, 2022)

- chore: update logo.png

## 0.4.40 (八月 19, 2022)

- chore: remove assets
- fix: i18n
- chore: remove comments
- chore: update theme-config

## 0.4.39 (August 19, 2022)

- fix(site): fix docs in navigation

## 0.4.38 (August 18, 2022)

- docs: update developer documentation link

## 0.4.37 (August 15, 2022)

- chore: update create-blocklet home page
- chore: move github link to theme config
- chore: update theme color
- chore: update deps

## 0.4.36 (August 15, 2022)

- chore: update site links

## 0.4.35 (August 13, 2022)

- fix: deploy action folder

## 0.4.34 (August 13, 2022)

- chore: bump xmark to latest
- chore: update deploy target machine

## 0.4.33 (August 13, 2022)

- chore: update xmark and add github link

## 0.4.32 (August 11, 2022)

- chore: update deps

## 0.4.31 (August 09, 2022)

- chore: update xmark and polish home page

## 0.4.30 (八月 09, 2022)

- chore: update xmark

## 0.4.29 (八月 04, 2022)

- chore: refactor docs folder
- chore: update deps

## 0.4.28 (七月 26, 2022)

- fix: ci npm publish

## 0.4.27 (七月 26, 2022)

- chore: update page-site & docs-site
- chore: update deps

## 0.4.26 (July 24, 2022)

- fix: payment field error in some templates

## 0.4.25 (July 21, 2022)

- chore: cleanup useless code

## 0.4.24 (七月 19, 2022)-

- fix: vite-plugin-blocklet hmr isInBlocklet

## 0.4.23 (七月 19, 2022)

- fix: add "dist" in vite-plugin-blocklet

## 0.4.22 (七月 17, 2022)

- fix: remove "postinstall scripts" in plugins/\*

## 0.4.21 (七月 14, 2022)

- fix: vite-plugin-blocklet config plugin

## 0.4.20 (七月 14, 2022)

- feat: replace Create Blocklet logo
- fix: vite-plugin-blocklet append url with prefix when dev as component blocklet

## 0.4.19 (七月 13, 2022)

- chore: bump-version

## 0.4.18 (七月 12, 2022)

- chore: update create-blocklet templates with vite
- feat: add vite-plugin-blocklet

## 0.4.17 (七月 12, 2022)

- chore: update ci deploy to prod-1

## 0.4.16 (七月 11, 2022)

- chore: update templates deps
- fix: #144 @blocklet/sdk version is 1.8.2
- feat: add page "Available Templates"
- chore: replace create blocklet logo
- chore: replace AsciinemaPlayer to gif
- chore: update page site cover logo
- feat: add notification-service
- feat: add auth-services
- feat: add faq

## 0.4.15 (七月 11, 2022)

- feat: support the templates of nextjs dev in the component mode

## 0.4.14 (七月 11, 2022)

- fix: polish the templates of vite can't be builded bug

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
- chore: rename docsite -> docs-site
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
- chore: update template website dependencies

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
