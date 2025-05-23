import isMobile from 'ismobilejs';
import { isInBlocklet } from './utils.js';

/**
 * Creates a config plugin for Vite development server.
 *
 * @param {object} options - The options for the plugin.
 * @param {'all'|'mobile'|'desktop'} [options.debugPlatform='mobile'] - The platforms to enable debug mode for.
 * @param {string} [options.debugScript] - The initialization code for the debug script.
 * @param {number} [options.positionX = 0] - The initialization positionX for entry button.
 * @param {number} [options.positionY = 0] - The initialization positionY for entry button.
 * @return {object} The Vite config plugin.
 */
export default function createConfigPlugin(options) {
  return {
    name: 'blocklet:debug', // plugin name
    /**
     * Configure server
     * @param {import('vite').ViteDevServer} server vite server
     */
    configureServer(server) {
      if (isInBlocklet) {
        server.middlewares.use((req, res, next) => {
          /**
           * Enabled debug mode by platform
           * @type {boolean}
           */
          let enabled = false;
          const debugPlatform = options.debugPlatform || 'mobile';
          if (debugPlatform.includes('all')) {
            enabled = true;
          }
          const isMobileFn = isMobile.default ? isMobile.default : isMobile;
          if (isMobileFn(req.headers['user-agent']).any) {
            if (debugPlatform.includes('mobile')) {
              enabled = true;
            }
          } else {
            if (debugPlatform.includes('desktop')) {
              enabled = true;
            }
          }
          if (enabled) {
            try {
              const url = new URL(req.url, 'http://localhost');
              if (url.pathname === '/') {
                url.searchParams.set('debug', '');
                req.originalUrl = url.pathname + url.search;
              }
            } catch {}
          }
          return next();
        });
      }
    },
    /**
     * Transform index html
     * @param {string} html original html content
     * @param {import('vite').IndexHtmlTransformContext} ctx vite context
     * @returns {import('vite').IndexHtmlTransformResult}
     */
    transformIndexHtml(html, ctx) {
      const entryButtonWidth = 50;
      const entryButtonHeight = 50 + 50; // Avoid bottom occlusion in ArcSphere
      const debugScript =
        options.debugScript ||
        `import('https://esm.run/eruda').then(({ default: eruda }) => {
  const positionX = Number(${options.positionX});
  const positionY = Number(${options.positionY});
  const entryButtonWidth = ${entryButtonWidth};
  const entryButtonHeight = ${entryButtonHeight};

  const initialized = !!localStorage.getItem('eruda-entry-button');
  eruda.init();
  const position = eruda.position();

  if (!Number.isNaN(positionX)) position.x = positionX;
  if (!Number.isNaN(positionY)) position.y = positionY;
  if (position.x >= window.innerWidth - entryButtonWidth) position.x = window.innerWidth - entryButtonWidth;
  if (position.y >= window.innerHeight - entryButtonHeight) position.y = window.innerHeight - entryButtonHeight;

  if (!initialized) eruda.position(position);
});`;
      try {
        const url = new URL(ctx.originalUrl, 'http://localhost');
        if (url.searchParams.has('debug')) {
          return {
            html,
            tags: [
              {
                tag: 'script',
                children: debugScript,
                injectTo: 'body',
              },
            ],
          };
        }
      } catch {}
      return html;
    },
  };
}
