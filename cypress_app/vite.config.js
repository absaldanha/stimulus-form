const { resolve } = require('path');
const { defineConfig } = require('vite');
const glob = require('tiny-glob');
const path = require('path');

async function processGlob(globStr, opts = { filesOnly: true }) {
  const entryPoints = await glob(globStr, opts);
  let obj = {};

  entryPoints.forEach((entry) => {
    let name = entry.slice(entry.lastIndexOf("/") + 1).replace(".html", "");
    obj[name] = resolve(__dirname, entry);
  });
  return obj;
}

export default defineConfig(async () => {
  return {
    server: {
      host: '0.0.0.0',
      port: 3636
    },
    watch: {
      usePolling: true
    },
    resolve: {
      alias: {
        'stimulus-form': path.resolve(__dirname, '../dist/index.js')
      }
    },
    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          ...await processGlob('./fixtures/*.html'),
        }
      },
    },
  };
});
