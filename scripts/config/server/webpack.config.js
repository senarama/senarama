const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const path = require('path');
const nodeExternals = require('webpack-node-externals');
const formatter = require('../../utils/eslint-formatter');

/** @type {import("webpack").Configuration} */
module.exports = {
  entry: './src/server/index.js',
  output: {
    filename: 'server.js',
    path: path.resolve('.', 'dist'),
  },
  resolve: {
    extensions: ['.js'],
  },
  externals: [nodeExternals()],
  target: 'node',
  stats: 'none',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  require.resolve('@babel/preset-env'),
                  { targets: { node: '16.3.1' }, modules: 'auto' },
                ],
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ESLintWebpackPlugin({
      eslintPath: require.resolve('eslint'),
      failOnError: true,
      formatter,
    }),
  ],
};
