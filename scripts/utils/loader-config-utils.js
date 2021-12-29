/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const testRegex = {
  js: /\.jsx?$/,
  css: /\.css$/i,
  cssModule: /\.module\.css$/i,
  sass: /\.(sass|scss)$/i,
  sassModule: /\.module\.(sass|scss)/i,
  assets: /\.(png|jpe?g|gif|webm)/i,
};

const getStyleLoaders = (cssOptions, preProcessor, isProduction = true) => {
  const loaders = [
    // default css loader
    { loader: isProduction ? MiniCssExtractPlugin.loader : 'style-loader' },

    // css
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },

    // postcss
    {
      loader: require.resolve('postcss-loader'),
      options: {
        postcssOptions: {
          plugins: [
            'postcss-flexbugs-fixes',
            [
              'postcss-preset-env',
              { autoprefixer: { flexbox: 'no-2009' }, stage: 3 },
            ],
          ],
        },
        sourceMap: !isProduction,
      },
    },
  ].filter(Boolean);

  if (preProcessor) {
    return loaders.concat([
      // url loader
      {
        loader: require.resolve('resolve-url-loader'),
        options: { root: path.resolve('.', 'src'), sourceMap: !isProduction },
      },

      // pre-processor
      {
        loader: require.resolve(preProcessor),
        options: { sourceMap: true },
      },
    ]);
  }

  return loaders;
};

module.exports = { getStyleLoaders, testRegex };
