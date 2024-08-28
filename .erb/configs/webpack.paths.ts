const path = require('path');

const rootPath = path.join(__dirname, '../..');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath);
const srcRendererPath = path.join(srcPath);

const srcNodeModulesPath = path.join(srcPath, 'node_modules');

const distPath = path.join(srcPath, 'dist')
// const distMainPath = path.join(distPath, 'main');
const distRendererPath = path.join(distPath);

export default {
  rootPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  srcNodeModulesPath,
  distPath,
//   distMainPath,
  distRendererPath,
};
