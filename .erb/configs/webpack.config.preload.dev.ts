import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-preload',
//   entry: path.join(webpackPaths.srcMainPath, 'preload.ts'),
//   entry: path.resolve(webpackPaths.srcMainPath),
  entry: path.resolve(webpackPaths.srcMainPath, 'preload.ts'),
  output: {
    // path: webpackPaths.distPath,
    path: path.resolve(__dirname, '../dist'),
    publicPath: './',
    filename: 'preload.js',
    library: {
      type: 'umd',
    },
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      NODE_ENV: 'development',
    }),
  ],
  node: {
    __dirname: false,
    __filename: false,
  },
  watch: true,
};

export default merge(baseConfig, configuration);