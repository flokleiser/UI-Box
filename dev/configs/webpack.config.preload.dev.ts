import path from 'path';
import webpack from 'webpack';
import { merge } from 'webpack-merge';
import baseConfig from './webpack.config.base';

const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: 'electron-preload',
  //works
  entry: path.resolve(__dirname, '../../src/preload.ts'),
  output: {
    //works
    path: path.resolve(__dirname, '../../src/dist'),
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