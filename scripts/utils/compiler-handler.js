/* eslint-disable no-console */
const chalk = require('chalk');
const webpack = require('webpack');
const nodemon = require('nodemon');
const clearConsole = require('./clear-console');
const formatWebpackMessages = require('./format-webpack-messages');

const createCompiler = (config = {}) => {
  let firstTime = true;
  const compiler = webpack(config);

  // hooks
  compiler.hooks.done.tap('done', async (stats) => {
    if (process.stdout.isTTY) {
      clearConsole();
    }

    const statsData = stats.toJson({ all: false, errors: true, warnings: true });
    const { errors, warnings } = formatWebpackMessages(statsData);

    if (!errors.length && !warnings.length) {
      console.log(chalk.bold.green('Compiled successfully!.'));
      if (firstTime) {
        console.log(chalk.blue('\n\n=> Open: http://localhost:3000 in your web browser'));
        firstTime = false;
      }
    }
    if (errors.length) {
      if (errors.length > 1) {
        errors.length = 1;
      }
      console.log(chalk.bold.red('Failed to compile.\n'));
      console.log(errors.join('\n\n'));
    }

    if (warnings.length) {
      if (warnings.length > 1) {
        warnings.length = 1;
      }

      console.log(chalk.bold.yellow('Compiler with warnings...\n'));
      console.log(warnings.join('\n\n'));

      // for eslint errors
      console.log([
        '\nSearch for the',
        chalk.underline(chalk.yellow('keywords')),
        'to learn more about each warning.',
      ].join(' '));
    }
  });

  return compiler;
};

const handler = (err, stats) => {
  let messages = null;
  let errMessage = null;
  if (err) {
    if (!err.message) {
      console.log('Something is happing...');
    } else {
      errMessage = err.message;
      messages = formatWebpackMessages({ errors: [errMessage], warnings: [] });
    }
  }
  if (stats) {
    messages = formatWebpackMessages(stats.toJson({
      all: false,
      warnings: true,
      errors: true,
    }));
  }
  if (messages.warnings.length || messages.errors.length) {
    if (stats.compilation.options.watch) clearConsole();
  }
  if (messages.errors.length > 0) {
    console.log(messages.errors[0]);
  }
  if (messages.warnings.length > 0) {
    console.log(messages.warnings[0]);
  }
};

const nodemonHandler = () => {
  const monitor = nodemon({
    ignore: ['src/*', 'node_modules/*', 'scripts/*'],
    script: './dist/server.js',
    verbose: false,
  });

  monitor.on('restart', () => {
    clearConsole();
    console.log(chalk.bold.green('Restarting nodemon...\n'));
  });

  monitor.on('crash', () => {
    console.log(chalk.bold.red('\nNodemon crashed... Waiting for changes...'));
  });

  return monitor;
};

const startWatching = (config) => {
  const watchOptions = {
    aggregateTimeout: 400,
    ignored: /node_modules/,
    poll: 1000,
  };
  const compier = webpack(config);
  const watching = compier.watch(watchOptions, handler);

  return watching;
};

module.exports = {
  createCompiler,
  handler,
  startWatching,
  nodemonHandler,
};
