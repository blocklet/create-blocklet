## PROJECT_DESCRIPTION

Block Studio 是一个用于开发 Pages Kit 可视化区块的开发工具。通过该工具，开发者可以：

- 创建和管理可复用的前端区块组件
- 提供可视化编辑界面，方便区块配置和预览
- 支持多种可视化组件类型开发（图表、表单、动画等）
- 无缝集成到 ArcBlock Blocklet 生态系统中

## FILE_STRUCTURE

```
your-component-studio/
├── api/              # 后端API代码
│   ├── dev.ts        # 开发服务器入口
│   ├── src/          # API源代码目录
│   └── third.d.ts    # 三方库类型声明
├── scripts/          # 构建和版本管理脚本
│   ├── build-clean.mjs  # 清理构建脚本
│   └── bump-version.mjs # 版本升级脚本
├── src/              # 前端源代码
│   ├── HelloWorld/   # 示例HelloWorld区块
│   │   └── index.tsx   # 区块入口
│   │   └── @metadata.json # 区块元数据
│   │   └── @preview-images/ # 区块预览图目录
│   └── <your-component-name>/ # 你的区块目录
│       └── index.tsx   # 区块入口
│       └── @metadata.json # 区块元数据
│       └── @preview-images/ # 区块预览图目录
├── _theme.tsx        # Block Studio 主题文件(请勿修改)
├── package.json      # 项目配置和依赖
├── vite.config.mts   # Vite客户端配置
└── vite-server.config.ts # Vite服务端配置
```

## 开发流程

1. 使用 `pnpm run dev` 启动开发环境，点击 `Terminal` 中的 url 访问 Block Studio 界面
2. 通过点击 `+` 按钮，创建新的区块（当然也可以在 `src/` 目录下创建新的区块组件）
3. 开发区块组件，并使用 `pnpm run build-lib` 构建可发布的区块
4. 通过点击 `Create Resource` 按钮，创建 Resource Blocklet，并发布到 Blocklet Store
5. 在 Pages Kit 中安装 Resource Blocklet，并且在页面中使用
