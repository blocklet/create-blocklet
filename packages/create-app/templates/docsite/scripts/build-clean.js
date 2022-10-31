const rimraf = require('rimraf');

console.log('clean .blocklet folder && node_modules/.vite');
rimraf.sync('.blocklet');
rimraf.sync('node_modules/.vite');
console.log('clean .blocklet folder  && node_modules/.vite done!');
