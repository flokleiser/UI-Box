import 'webpack-dev-server';
import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { spawn } from 'child_process';
import { merge } from 'webpack-merge';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import baseConfig from './webpack.config.base';
import webpackPaths from './webpack.paths';

const port = process.env.PORT || 1212;
const configuration: webpack.Configuration = {
  devtool: 'inline-source-map',
  mode: 'development',
  target: ['web', 'electron-renderer'],
  entry: [
    `webpack-dev-server/client?http://localhost:${port}/dist`,
    'webpack/hot/only-dev-server',
    path.join(webpackPaths.srcRendererPath, 'renderer.tsx'),
  ],
  output: {
    path: webpackPaths.distRendererPath,
    // path: './src/dist',
    // path: 'src/dist',
    publicPath: '/',
    filename: 'renderer.js',
    library: {
      type: 'umd',
    },
  },
  module: {
    rules: [
      {
        test: /\.mp3$/,
        use: 'file-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(webpackPaths.srcRendererPath, 'index.ejs'),
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    port,
    hot: true,
    static: {
      directory: webpackPaths.distRendererPath,
    },
    historyApiFallback: true,
  setupMiddlewares(middlewares) {
    const preloadProcess = spawn('npm', ['run', 'start:preload'], {
      shell: true,
      stdio: 'inherit',
    })
      .on('close', (code: number) => process.exit(code!))
      .on('error', (spawnError) => console.error(spawnError));

    let args = ['run', 'start:main'];
    if (process.env.MAIN_ARGS) {
      args = args.concat(
        ['--', ...process.env.MAIN_ARGS.matchAll(/"[^"]+"|[^\s"]+/g)].flat(),
      );
    }
    spawn('npm', args, {
      shell: true,
      stdio: 'inherit',
    })
      .on('close', (code: number) => {
        preloadProcess.kill();
        process.exit(code!);
      })
      .on('error', (spawnError) => console.error(spawnError));
    return middlewares;
  },
},
};

export default merge(baseConfig, configuration);