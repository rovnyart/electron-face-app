const { spawn } = require('child_process');
const path = require('path');

const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const appPath = path.resolve(__dirname, 'src');

module.exports = {
  node: {
    __dirname: false,
  },
  externals: {
    sequelize: "require('sequelize')",
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        use: [{ loader: 'babel-loader' }],
        exclude: [/node_modules/],
        include: appPath,
      },
    ],
  },
  target: 'electron-renderer',
  plugins: [
    new HtmlWebpackPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    stats: {
      colors: true,
      chunks: false,
      children: false,
    },
    before() {
      spawn(
        'electron',
        ['.'],
        { shell: true, env: process.env, stdio: 'inherit' },
      )
        .on('close', () => process.exit(0))
        .on('error', (spawnError) => console.error(spawnError)); // eslint-disable-line no-console
    },
  },
};
