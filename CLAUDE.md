# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Create Blocklet is a scaffolding tool that helps developers quickly set up blocklet projects for Blocklet Server. It provides multiple templates for different frameworks and architectures, including dapps, static sites, and APIs.

## Architecture

This is a monorepo managed by pnpm workspaces with the following structure:

- **`packages/create-app/`**: Main CLI tool implementation
- **`plugins/`**: Vite plugins for blocklet development
- **`website/`**: Documentation and marketing sites
- **`scripts/`**: Build and maintenance scripts

### Key Components

- **`packages/create-app/index.js`**: Main CLI entry point with interactive prompts
- **`packages/create-app/lib/`**: Core utilities:
  - `constant.js`: Blocklet command configuration
  - `server.js`: Blocklet server integration
  - `did.js`: DID (Decentralized Identifier) management
  - `git.js`: Git repository initialization
  - `npm.js`: Package manager integration
- **`packages/create-app/templates/`**: All project templates organized by type:
  - `*-dapp`: Full-stack applications with backend APIs
  - `*-static`: Static frontend applications
  - `*-api`: Backend API services

## Common Development Commands

### Build and Development
```bash
# Install dependencies
pnpm install

# Run linting across all packages
pnpm -r lint

# Test the CLI tool directly
node packages/create-app/index.js

# Run e2e tests
sh scripts/ensure-create-blocklet.sh
```

### Testing
```bash
# Run tests in create-app package
cd packages/create-app
npm test

# Run tests with UI
npm run test:ui

# Run tests once
npm run test:run
```

### Version Management
```bash
# Bump version across packages
npm run bump-version

# Publish plugins
npm run publish-plugins
```

## Template System

Templates are organized in `packages/create-app/templates/` and include:

- **React**: `react-dapp`, `react-static`, `react-dapp-ts`
- **Vue**: `vue-dapp`, `vue-static`, `vue-ts-static`
- **Svelte**: `svelte-dapp`, `svelte-static`
- **SolidJS**: `solidjs-dapp`, `solidjs-static`
- **Specialized**: `did-connect-dapp`, `did-wallet-dapp`, `todo-list-example`

Each template contains:
- `blocklet.yml`: Blocklet configuration
- `package.json`: Dependencies and scripts
- `template-info.json`: Template metadata
- Framework-specific source files

## Key Configuration

### Blocklet Command
The blocklet CLI command is configurable via `packages/create-app/lib/constant.js`:
```javascript
export const BLOCKLET_COMMAND = 'blocklet';
```

### Template Selection
Templates are defined in `packages/create-app/index.js` with display names, colors, and metadata.

## Development Workflow

1. **Adding Templates**: Create new template directories in `packages/create-app/templates/`
2. **Modifying CLI**: Update `packages/create-app/index.js` for new prompts or logic
3. **Testing**: Use `scripts/ensure-create-blocklet.sh` for e2e testing
4. **Plugin Development**: Work in `plugins/` directory for Vite integrations

## Dependencies

- **CLI Framework**: Uses `prompts` for interactive CLI, `ora` for spinners
- **File Operations**: `fs-extra` for file system operations
- **Template Processing**: `ejs` for template rendering
- **Package Management**: Supports npm, yarn, and pnpm
- **DID Integration**: `@arcblock/did` for decentralized identifiers

## Notes

- The project uses ESM modules (`"type": "module"`)
- Pre-commit hooks run linting via `simple-git-hooks`
- E2E tests validate template creation and startup
- Templates support both single blocklets and monorepo compositions