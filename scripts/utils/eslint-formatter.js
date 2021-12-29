/* eslint-disable import/no-extraneous-dependencies */
/**
 * Adapted From:
 * https://github.com/facebook/create-react-app/packages/react-dev-utils/eslintFormatter.js
 */

const path = require('path');
const chalk = require('chalk');
const stripAnsi = require('strip-ansi');
const table = require('text-table');

const cwd = process.cwd();

const emitErrorsAsWarnings = false;

function isError(message) {
  if (message.fatal || message.severity === 2) {
    return true;
  }
  return false;
}

function getRelativePath(filePath) {
  return `./${path.relative(cwd, filePath)}`;
}

function formatter(results) {
  let output = '\n';
  const resume = { errors: 0, warnings: 0 };
  let hasErrors = false;
  let reportContainsErrorRuleIDs = false;

  results.forEach((result) => {
    let { messages } = result;
    if (messages.length === 0) {
      return;
    }

    messages = messages.map((message) => {
      let messageType;
      if (isError(message) && !emitErrorsAsWarnings) {
        messageType = 'error';
        resume.errors += 1;
        hasErrors = true;
        if (message.ruleId) {
          reportContainsErrorRuleIDs = true;
        }
      } else {
        messageType = 'warn';
        resume.warnings += 1;
      }

      let line = message.line || 0;
      if (message.column) {
        line += `:${message.column}`;
      }
      const position = chalk.bold(`At ${getRelativePath(result.filePath)}:${line}:`);
      return [
        '',
        position,
        messageType,
        message.message.replace(/\.$/, ''),
        chalk.underline(message.ruleId || ''),
      ];
    });

    // if there are error messages, we want to show only errors
    if (hasErrors) {
      messages = messages.filter((m) => m[2] === 'error');
    }

    // add color to rule keywords
    messages.forEach((m) => {
      const newMessage = m;
      newMessage[4] = m[2] === 'error' ? chalk.red(m[4]) : chalk.yellow(m[4]);
      newMessage.splice(2, 1);
    });

    const outputTable = table(messages, {
      align: ['l', 'l', 'l'],
      stringLength(str) {
        return stripAnsi(str).length;
      },
    });

    // print the filename and relative path
    output += chalk.bold.yellow(`Problems in the file: ${getRelativePath(result.filePath)}\n\n`);

    // print the errors
    output += `${outputTable}\n\n`;
  });

  if (reportContainsErrorRuleIDs) {
    // Unlike with warnings, we have to do it here.
    // We have similar code in react-scripts for warnings,
    // but warnings can appear in multiple files so we only
    // print it once at the end. For errors, however, we print
    // it here because we always show at most one error, and
    // we can only be sure it's an ESLint error before exiting
    // this function.

    output += chalk.bold.red(
      [
        `${resume.errors + resume.warnings} problems`,
        `(${resume.errors} errors, ${resume.warnings} warnings)\n\n`,
      ].join(' '),
    );

    output += [
      'Search for the',
      `${chalk.underline(chalk.red('keywords'))}`,
      'to learn more about each error.',
    ].join(' ');
  }

  return output;
}

module.exports = formatter;
