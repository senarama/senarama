/* eslint-disable import/no-extraneous-dependencies */
const webpack = require('webpack');
const chalk = require('chalk');
const WebpackDevServer = require('webpack-dev-server');
const configFactory = require('./utils/config-factory');
const {
  createCompiler,
  handler,
  startWatching,
  nodemonHandler,
} = require('./utils/compiler-handler');
const clearConsole = require('./utils/clear-console');

const config = configFactory();

const buildInfo = process.argv.slice(2)[0].split(':');

if (buildInfo[0] === 'build') {
  console.log(chalk.bold.blue(`\n${buildInfo[1]}: Creating production build...`));
  const compiler = webpack(config);
  compiler.run(handler);
  compiler.hooks.done.tap('done', (stats) => {
    if (!stats.hasErrors() && !stats.hasWarnings()) {
      console.log(chalk.bold.green(' => Compiled successfully!.\n'));
    } else if (stats.hasErrors()) {
      console.log(chalk.bold.red(' x Compilation failed.\n'));
    } else {
      console.log(chalk.bold.yellow(' ~ Compled with warnings.\n'));
    }
  });
}

if (buildInfo[0] === 'dev' && buildInfo[1] === 'client') {
  // delete config.optimization;
  const compiler = createCompiler(config);

  const devServer = new WebpackDevServer(config.devServer, compiler);
  devServer.startCallback((err) => {
    if (process.stdout.isTTY) {
      clearConsole();
    }

    if (err) {
      if (err.message) {
        console.log(err.message);
      }
    }

    console.log(chalk.blue('Starting development server...\n'));
  });

  ['SIGINT', 'SIGTERM'].forEach((sig) => {
    process.on(sig, () => {
      devServer.close();
      process.exit(128);
    });
  });

  if (process.env.CI !== 'true') {
    // Gracefully exit when stdin ends
    process.stdin.on('end', () => {
      devServer.close();
      process.exit(0);
    });
  }
}

if (buildInfo[0] === 'dev' && buildInfo[1] === 'server') {
  const watching = startWatching(config);
  const monitor = nodemonHandler();
  process.once('exit', () => {
    monitor.emit('exit');
    watching.close(() => {});
  });

  process.once('SIGINT', () => {
    process.exit(0);
  });
}
