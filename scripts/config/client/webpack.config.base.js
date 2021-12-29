const path = require('path');
const EslintPlugin = require('eslint-webpack-plugin');
const formatter = require('../../utils/eslint-formatter');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './src/client/index.jsx',
  output: {
    path: path.resolve('.', 'dist/public'),
    publicPath: '/',
    clean: true,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@assets': path.resolve('.', 'src/client/assets/'),
      '@icons': path.resolve('.', 'src/client/assets/icons/'),
      '@images': path.resolve('.', 'src/client/assets/images/'),
      '@styles': path.resolve('.', 'src/client/assets/styles/'),
      '@components': path.resolve('.', 'src/client/components/'),
      '@data': path.resolve('.', 'src/client/data/'),
      '@hooks': path.resolve('.', 'src/client/hooks/'),
      '@store': path.resolve('.', 'src/client/store/'),
      '@utils': path.resolve('.', 'src/client/utils/'),
      '@views': path.resolve('.', 'src/client/views/'),
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        default: {
          chunks: 'all',
          minChunks: 2,
          priority: 10,
          reuseExistingChunk: true,
        },
        defaultVendors: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true,
        },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          priority: 20,
          reuseExistingChunk: true,
        },
        cssVendors: {
          test: /[\\/]assets[\\/]styles/,
          chunks: 'all',
          priority: 10,
          name: 'external',
          reuseExistingChunk: true,
        },
      },
    },
    runtimeChunk: {
      name: 'runtime',
    },
  },
  plugins: [
    new EslintPlugin({
      eslintPath: require.resolve('eslint'),
      extensions: ['js', 'jsx'],
      failOnError: true,
      formatter,
    }),
  ],
};
