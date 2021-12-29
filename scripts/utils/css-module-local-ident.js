/* eslint-disable import/no-extraneous-dependencies */
/**
 * From: https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/getCSSModuleLocalIdent.js
 */

const loaderUtils = require('loader-utils');
const path = require('path');

const getLocalIdent = (context, localIdentName, localName, options) => {
  const fileNameOrFolder = context.resourcePath.match(/index\.module\.(css|scss|sass)$/)
    ? '[folder]' : '[name]';
  const hash = loaderUtils.getHashDigest(
    `${path.posix.relative(context.rootContext, context.resourcePath)}${localName}`,
    'md5',
    'base64',
    5,
  );
  const className = loaderUtils.interpolateName(
    context,
    `${fileNameOrFolder}_${localName}__${hash}`,
    options,
  );
  return className.replace('.module_', '_').replace(/\./g, '_');
};

module.exports = getLocalIdent;
