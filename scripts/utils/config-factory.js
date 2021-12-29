// eslint-disable-next-line import/no-extraneous-dependencies
const { merge } = require('webpack-merge');
const serverConfig = require('../config/server/webpack.config');
const clientBaseConfig = require('../config/client/webpack.config.base');
const clientDevConfig = require('../config/client/webpack.config.dev');
const clientProdConfig = require('../config/client/webpack.config.prod');

const scriptArgs = process.argv.slice(2)[0].split(':');
const isProduction = scriptArgs[0] === 'build';
const buildType = scriptArgs[1];
if (isProduction) {
  serverConfig.mode = 'production';
} else {
  serverConfig.mode = 'development';
}

const configFactory = () => {
  if (isProduction) {
    if (buildType === 'server') return serverConfig;
    if (buildType === 'client') return merge(clientBaseConfig, clientProdConfig);
  }

  if (buildType === 'client') return merge(clientBaseConfig, clientDevConfig);
  return serverConfig;
};

module.exports = configFactory;
