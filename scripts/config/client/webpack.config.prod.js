const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { getStyleLoaders, testRegex } = require('../../utils/loader-config-utils');
const getLocalIdent = require('../../utils/css-module-local-ident');

/** @type {import('webpack').Configuration} */
module.exports = {
  mode: 'production',
  output: {
    filename: 'static/js/[name].[contenthash:8].js',
    chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
  },
  module: {
    rules: [
      // js and jsx
      {
        test: testRegex.js,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                require.resolve('@babel/preset-env'),
                [
                  require.resolve('@babel/preset-react'),
                  { runtime: 'automatic' },
                ],
              ],
            },
          },
        ],
      },

      // css only
      {
        test: testRegex.css,
        exclude: testRegex.cssModule,
        use: getStyleLoaders({ importLoaders: 1, modules: { mode: 'icss' } }),
        sideEffects: true,
      },

      // css module
      {
        test: testRegex.cssModule,
        use: getStyleLoaders({
          importLoaders: 1,
          modules: { mode: 'local', getLocalIdent },
        }),
      },

      // sass only
      {
        test: testRegex.sass,
        exclude: testRegex.sassModule,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: false,
            modules: { mode: 'icss' },
          },
          'sass-loader',
        ),
        sideEffects: true,
      },

      // sass module
      {
        test: testRegex.sassModule,
        use: getStyleLoaders(
          {
            importLoaders: 3,
            sourceMap: false,
            modules: { mode: 'local', getLocalIdent },
          },
          'sass-loader',
        ),
      },

      // assets
      {
        test: testRegex.assets,
        type: 'asset',
        generator: { filename: 'static/media/[hash][ext]' },
      },
    ].filter(Boolean),
  },
  optimization: {
    minimizer: [
      '...',
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/assets/templates/default.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeEmptyAttributes: true,
        keepClosingSlash: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
      },
    }),

    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),

    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.(js|css)/i,
      deleteOriginalAssets: true,
    }),
  ],
};
