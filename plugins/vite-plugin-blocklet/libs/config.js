import fs from 'fs';
import path from 'path';
import { isEqual, joinURL, withTrailingSlash } from 'ufo';
import { toBlockletDid, isInBlocklet, blockletPort, blockletPrefix, getBlockletYAML } from './utils.js';

export default function createConfigPlugin({ chunkSizeLimit = 2048 }) {
  let resolvedConfig;

  return {
    name: 'blocklet:config',
    configureServer(server) {
      if (isInBlocklet) {
        server.middlewares.use((req, res, next) => {
          // blocklet server 会把设置的 base 从请求 url 中移除，所以需要再加回 base
          if (!req.url.startsWith(blockletPrefix)) {
            req.url = joinURL(blockletPrefix || '/', req.url);
          }
          // NOTICE: 由于传递给 vite 的 base 是带有结尾 slash 的，所以需要确保传递的 vite 的 url 在等于 blockletPrefix 也一定要带有结尾 slash
          if (isEqual(req.url, blockletPrefix)) {
            req.url = withTrailingSlash(req.url);
          }
          return next();
        });
      }
    },
    async config(config, { command }) {
      if (command === 'serve') {
        const targetConfig = {};
        targetConfig.base = withTrailingSlash(joinURL('/', config.base || blockletPrefix));
        targetConfig.server = config.server || {};

        if (!targetConfig.server.port) {
          const port = blockletPort || 3000;
          targetConfig.server.port = port;
        }
        targetConfig.server.allowedHosts = true;

        return targetConfig;
      }

      if (command === 'build') {
        let targetConfig = {
          build: {
            chunkSizeWarningLimit: chunkSizeLimit,
          },
        };
        if (!config.base) {
          try {
            let { name, did } = await getBlockletYAML();
            if (!did && name) {
              did = toBlockletDid(name);
            }
            if (did) {
              const base = `/.blocklet/proxy/${did}/`;
              targetConfig.base = base;
              return targetConfig;
            }
          } catch (err) {
            console.error(err);
            return targetConfig;
          }
        }
      }

      return {};
    },
    configResolved(config) {
      resolvedConfig = config;
    },
    closeBundle() {
      const limitInKB = chunkSizeLimit;
      const outDir = resolvedConfig.build.outDir || 'dist';
      const distPath = path.resolve(resolvedConfig.root, outDir);

      if (!fs.existsSync(distPath)) return;

      // 递归获取所有文件（包含子目录，如 assets/）
      const getAllFiles = (dirPath, arrayOfFiles = []) => {
        const files = fs.readdirSync(dirPath);
        files.forEach((file) => {
          const fullPath = path.join(dirPath, file);
          if (fs.statSync(fullPath).isDirectory()) {
            getAllFiles(fullPath, arrayOfFiles);
          } else {
            arrayOfFiles.push(fullPath);
          }
        });
        return arrayOfFiles;
      };

      const allFiles = getAllFiles(distPath);
      const overSizedFiles = [];

      allFiles.forEach((filePath) => {
        // 只检查 JS 和 CSS
        if (filePath.endsWith('.js') || filePath.endsWith('.css')) {
          const stats = fs.statSync(filePath);
          const sizeKB = Number((stats.size / 1024).toFixed(2));

          if (sizeKB > limitInKB) {
            overSizedFiles.push({
              // 显示相对路径，方便查看是哪个 chunk
              File: path.relative(distPath, filePath),
              'Size(KB)': sizeKB,
              'Limit(KB)': limitInKB,
            });
          }
        }
      });

      if (overSizedFiles.length > 0) {
        overSizedFiles.sort((a, b) => b['Size(KB)'] - a['Size(KB)']);
        console.log('\n\x1b[41m\x1b[37m ERROR \x1b[0m \x1b[31mChunk Size Limit Exceeded:\x1b[0m');
        console.table(overSizedFiles); // 以表格形式漂亮地打印

        console.error(`\x1b[31mTotal ${overSizedFiles.length} files exceeded the ${limitInKB}KB limit.\x1b[0m\n`);

        // 强制退出，确保 CI/CD 流程中断
        process.exit(1);
      } else {
        console.log('\n\x1b[42m\x1b[30m DONE \x1b[0m All chunks are within the size limit.');
      }
    },
  };
}
