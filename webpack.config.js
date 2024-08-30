const path = require('path');

module.exports = {
  entry: {
    main: './src/main.ts',
    preload:'./src/preload.ts',
    renderer:'./src/renderer.tsx'
  },
  target: 'electron-main',
  mode:'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: 'ts-loader'
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react',
              '@babel/preset-typescript',
            ],
          },
        },
      },
    ]
  },
  resolve: {
        extensions: ['.ts', '.js','.tsx','.jsx']
  },
  output: {
    // filename: 'bundle.js', // Single output file
    filename:'[name].js',
    path: path.resolve(__dirname, 'src/dist')
  },
};


// const path = require('path');

// module.exports = {
//   entry: {
//     main: './src/main.ts',
//     preload:'./src/preload.ts',
//     renderer:'./src/renderer.tsx'
//   },
//   target: 'electron-main',
//   mode:'development',
//   devtool: 'source-map',
//   module: {
//     rules: [
//       {
//         test: /\.(ts|tsx)$/,
//         exclude: /node_modules/,
//         use: 'ts-loader'
//       },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         use: {
//           loader: 'babel-loader',
//           options: {
//             presets: [
//               '@babel/preset-env',
//               '@babel/preset-react',
//               '@babel/preset-typescript',
//             ],
//           },
//         },
//       },
//       {
//         test: /\.mp3$/,
//         // use: 'file-loader',
//         use: {
//           loader: 'file-loader',
//           options: {
//             outputPath: 'dist',
//             publicPath: 'dist', // Ensure this is set correctly
//           },
//         },
//       },
//       {
//         test: /\.css$/,
//         use: ['style-loader', 'css-loader'],
//       },
//       {
//         test: /\.(png|jpg|jpeg|gif)$/i,
//         type: 'asset/resource',
//       },
//       {
//         test: /\.svg$/,
//         use: ['@svgr/webpack'],
//       },
//     ]
//   },
//   resolve: {
//         extensions: ['.ts', '.js','.tsx','.jsx']
//   },
//   output: {
//     // filename: 'bundle.js', // Single output file
//     filename:'[name].js',
//     path: path.resolve(__dirname, 'src/dist')
//   },
// };