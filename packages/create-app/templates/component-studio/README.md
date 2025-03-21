## PROJECT_DESCRIPTION

Component Studio is a development tool for creating Pages Kit visual blocks. With this tool, developers can:

- Create and manage reusable frontend block components
- Provide a visual editing interface for easy block configuration and preview
- Support development of various visualization component types (charts, forms, animations, etc.)
- Seamlessly integrate into the ArcBlock Blocklet ecosystem

## FILE_STRUCTURE

```
your-component-studio/
├── api/              # Backend API code
│   ├── dev.ts        # Development server entry
│   ├── src/          # API source code directory
│   └── third.d.ts    # Third-party library type declarations
├── scripts/          # Build and version management scripts
│   ├── build-clean.mjs  # Build cleanup script
│   └── bump-version.mjs # Version upgrade script
├── src/              # Frontend source code
│   ├── HelloWorld/   # Example HelloWorld block
│   │   └── index.tsx   # Block entry
│   │   └── @metadata.json # Block metadata
│   │   └── @preview-images/ # Block preview images directory
│   └── <your-component-name>/ # Your block directory
│   |   └── index.tsx   # Block entry
│   |   └── @metadata.json # Block metadata
│   |   └── @preview-images/ # Block preview images directory
│   └── components/ # Components directory
│   └── utils/ # Utility functions directory
│   └── types/ # Type declarations directory
├── package.json      # Project configuration and dependencies
├── vite.config.mts   # Vite client configuration
└── vite-server.config.ts # Vite server configuration
```

## DEVELOPMENT

1. Use `pnpm run dev` to start the development environment, click the URL in the `Terminal` to access the Component Studio interface
2. Create new blocks by clicking the `+` button (alternatively, you can create new block components directly in the `src/` directory)
3. Develop block components and use `pnpm run build-lib` to build publishable blocks
4. Create a Resource Blocklet by clicking the `Create Resource` button, and publish it to the Blocklet Store
5. Install the Resource Blocklet in Pages Kit and use it in your pages
