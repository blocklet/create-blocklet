# create-blocklet

<p align="center">
  <strong>The fastest way to create modern blocklet applications</strong>
</p>

<p align="center">
  <a href="https://www.createblocklet.dev">📚 Documentation</a> •
  <a href="https://github.com/blocklet/create-blocklet/issues">🐛 Issues</a> •
  <a href="https://github.com/blocklet/create-blocklet/discussions">💬 Discussions</a>
</p>

<p align="center">
  <img src="https://img.shields.io/npm/v/create-blocklet?style=flat-square" alt="npm version" />
  <img src="https://img.shields.io/npm/dm/create-blocklet?style=flat-square" alt="npm downloads" />
  <img src="https://img.shields.io/github/license/blocklet/create-blocklet?style=flat-square" alt="license" />
</p>

---

## ✨ Features

- 🚀 **Quick Setup** - Get started in seconds with a single command
- 🎯 **Multiple Templates** - Choose from 20+ production-ready templates
- 🔧 **Framework Agnostic** - Support for React, Vue, Svelte, SolidJS, and more
- 🌐 **Full-Stack Ready** - Templates for dApps, static sites, and APIs
- 📦 **Modern Tooling** - Built with Vite, TypeScript, and modern build tools
- 🔒 **DID Integration** - Built-in support for decentralized identity
- 🎨 **Customizable** - Easy to extend and customize for your needs

## 🚀 Quick Start

```bash
# Create a new blocklet project
npx create-blocklet my-blocklet

# Or use your preferred package manager
pnpm create blocklet my-blocklet
yarn create blocklet my-blocklet
```

> **Compatibility Note:**
> Blocklet templates require [Node.js](https://nodejs.org/) version >=20.0.0.

## 📋 Available Templates

### 🌐 Full-Stack Applications (dApps)
Interactive applications with both frontend and backend components.

| Template | Description | Tech Stack |
|----------|-------------|------------|
| `react-dapp` | React + Express.js application | React, Express, JavaScript |
| `react-dapp-ts` | React + Express with TypeScript | React, Express, TypeScript |
| `react-aigne-dapp` | React + AIGNE Framework | React, Express, AI Integration |
| `vue-dapp` | Vue 3 + Express.js application | Vue 3, Express, JavaScript |
| `svelte-dapp` | Svelte + Express.js application | Svelte, Express, JavaScript |
| `solidjs-dapp` | SolidJS + Express.js application | SolidJS, Express, JavaScript |
| `nextjs-dapp` | Next.js full-stack application | Next.js, React |

### 🎯 Static Applications
Frontend-only applications for static hosting.

| Template | Description | Tech Stack |
|----------|-------------|------------|
| `react-static` | React single-page application | React, Vite |
| `vue-static` | Vue 3 single-page application | Vue 3, Vite |
| `vue-ts-static` | Vue 3 with TypeScript | Vue 3, TypeScript, Vite |
| `svelte-static` | Svelte single-page application | Svelte, Vite |
| `solidjs-static` | SolidJS single-page application | SolidJS, Vite |
| `html-static` | Plain HTML static site | HTML, CSS, JavaScript |

### 🔧 API Services
Backend-only services and APIs.

| Template | Description | Tech Stack |
|----------|-------------|------------|
| `express-api` | Express.js REST API | Express, JavaScript |
| `nestjs-api` | NestJS API with TypeScript | NestJS, TypeScript |

### 🎨 Specialized Templates
Purpose-built templates for specific use cases.

| Template | Description | Tech Stack |
|----------|-------------|------------|
| `did-connect-dapp` | DID Connect integration demo | React, Express, DID Connect |
| `did-wallet-dapp` | DID Wallet integration demo | React, Express, DID Wallet |
| `todo-list-example` | Full-featured todo app | React, Express, TypeScript |
| `component-studio` | Component development studio | React, TypeScript, Vite |

## 🏗️ Project Structure

Each generated blocklet follows this structure:

```
my-blocklet/
├── blocklet.yml          # Blocklet configuration
├── package.json          # Dependencies and scripts
├── src/                  # Frontend source code
├── api/                  # Backend API (dApps only)
│   ├── index.js         # API entry point
│   ├── libs/            # Shared utilities
│   └── routes/          # API endpoints
├── public/              # Static assets
└── screenshots/         # Blocklet screenshots
```

## ⚙️ Common Commands

After creating a blocklet, use these commands:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
# or
blocklet dev

# Build for production
npm run build
# or
npm run bundle

# Deploy to Blocklet Server
blocklet deploy

# Run tests (if available)
npm test
```

## 🔧 Configuration

### blocklet.yml
Core blocklet configuration file:

```yaml
name: my-blocklet
version: 1.0.0
title: My Blocklet
description: A sample blocklet
keywords: [blocklet, example]
group: dapp
author:
  name: Your Name
  email: you@example.com
interfaces:
  - type: web
    port: 3000
```

### Package Scripts
Standard scripts included in generated projects:

- `dev` - Start development server with hot reload
- `build` - Build for production
- `bundle` - Create deployable bundle
- `lint` - Run code linting
- `test` - Run tests (where applicable)

## 🛠️ Development

### Local Testing
To test the CLI tool locally:

```bash
# Clone the repository
git clone https://github.com/blocklet/create-blocklet.git
cd create-blocklet

# Install dependencies
pnpm install

# Test the CLI tool directly
node packages/create-app/index.js test-demo

# Or create a symlink for easier testing
ln -s $(pwd)/packages/create-app/index.js /usr/local/bin/create-blocklet-dev
create-blocklet-dev my-test-project
```

### Adding New Templates
To add a new template:

1. Create template directory in `packages/create-app/templates/`
2. Add required files: `blocklet.yml`, `package.json`, source code
3. Create `template-info.json` with metadata
4. Update template list in `packages/create-app/index.js`
5. Test with: `TEMPLATE=your-template sh scripts/ensure-create-blocklet.sh`

### CLI Architecture
The CLI tool (`packages/create-app/index.js`) includes:

- **Template Selection** - Interactive prompts for choosing templates
- **Project Generation** - File copying and template processing
- **DID Generation** - Automatic blocklet DID creation
- **Package Management** - Dependency installation support
- **Git Integration** - Repository initialization

## 📖 Documentation

- [📚 Full Documentation](https://www.createblocklet.dev)
- [🚀 Quick Start Guide](https://www.createblocklet.dev/docs/quick-start)
- [🎯 Templates Guide](https://www.createblocklet.dev/docs/templates)

## 🌟 Ecosystem

- [Blocklet Server](https://www.arcblock.io/docs/blocklet-developer) - The runtime environment
- [Blocklet CLI](https://www.arcblock.io/docs/blocklet-developer/en/blocklet-cli) - Command-line tools
- [DID Connect](https://www.arcblock.io/docs/did-connect) - DID Connect: decentralized identity for your applications
- [DID Spaces](https://www.arcblock.io/docs/did-spaces) - DID Spaces: decentralized spaces for your applications

## 📝 License

This project is licensed under the MIT License.

## 💖 Support

- Give us a ⭐️ if this project helped you!
- Follow us on [Twitter](https://twitter.com/blocklet_io)
- Join our [Community](https://community.arcblock.io/)

---

<div align="center">
  <p>Made with ❤️ by the <a href="https://arcblock.io">ArcBlock</a> team</p>
</div>
