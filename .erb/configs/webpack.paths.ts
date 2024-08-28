const path = require('path');

const rootPath = path.join(__dirname, '../..');

const srcPath = path.join(rootPath, 'src');
const srcMainPath = path.join(srcPath);
const srcRendererPath = path.join(srcPath);

const releasePath = path.join(rootPath, 'src');
const appPath = path.join(releasePath, 'dist');
const appPackagePath = path.join(appPath, 'package.json');
const appNodeModulesPath = path.join(appPath, 'node_modules');
const srcNodeModulesPath = path.join(srcPath, 'node_modules');

const distPath = path.join(srcPath, 'dist')
const distMainPath = path.join(distPath, 'main');
// const distRendererPath = path.join(distPath, 'renderer');
const distRendererPath = path.join(distPath);

const buildPath = path.join(releasePath, 'build');

export default {
  rootPath,
  srcPath,
  srcMainPath,
  srcRendererPath,
  releasePath,
  appPath,
  appPackagePath,
  appNodeModulesPath,
  srcNodeModulesPath,
  distPath,
  distMainPath,
  distRendererPath,
  buildPath,
};
