const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ReactRefreshPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const { getStyleLoaders, testRegex } = require('../../utils/loader-config-utils');
const getLocalIdent = require('../../utils/css-module-local-ident');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'development',
  output: {
    filename: '[name].bundle.js',
    chunkFilename: '[name].bundle.chunk.js',
  },
  stats: 'none',
  devtool: 'eval-source-map',
  devServer: {
    static: './dist/public',
    liveReload: false,
    hot: true,
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: testRegex.js,
        exclude: /node_modules/,
        include: path.resolve('.', 'src'),
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                [
                  require.resolve('@babel/preset-react'),
                  { development: true, runtime: 'automatic' },
                ],
              ],
              plugins: [require.resolve('react-refresh/babel')],
            },
          },
        ],
      },
      // css only
      {
        test: testRegex.css,
        exclude: testRegex.cssModule,
        use: getStyleLoaders(
          { importLoaders: 1, modules: { mode: 'icss' }, sourceMap: true },
          false,
          false,
        ),
        sideEffects: true,
      },

      // css module
      {
        test: testRegex.cssModule,
        use: getStyleLoaders(
          {
            importLoaders: 1,
            modules: { mode: 'local', getLocalIdent },
            sourceMap: true,
          },
          false,
          false,
        ),
      },

      // sass only
      {
        test: testRegex.sass,
        exclude: testRegex.sassModule,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: { mode: 'icss' },
          },
          'sass-loader',
          false,
        ),
        sideEffects: true,
      },

      // sass module
      {
        test: testRegex.sassModule,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: true,
            modules: { mode: 'local', getLocalIdent },
          },
          'sass-loader',
          false,
        ),
      },

      // assets
      {
        test: testRegex.assets,
        type: 'asset/resource',
      },
    ].filter(Boolean),
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: './src/client/assets/templates/default.html',
      favicon: './src/client/assets/templates/favicon.ico',
    }),
  ].filter(Boolean),
};
