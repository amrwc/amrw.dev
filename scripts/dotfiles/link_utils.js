/**
 * Returns an escape sequence that can be used to format console outputs.
 *
 * @source https://stackoverflow.com/a/41407246/10620237
 * @param {string} util
 */
exports.txtUtils = function(util) {
  const utils = {
    reset: '\x1b[0m',
    bright: '\x1b[1m',
    dim: '\x1b[2m',
    underscore: '\x1b[4m',
    blink: '\x1b[5m',
    reverse: '\x1b[7m',
    hidden: '\x1b[8m',

    black: '\x1b[30m',
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    blue: '\x1b[34m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    white: '\x1b[37m',

    bgBlack: '\x1b[40m',
    bgRed: '\x1b[41m',
    bgGreen: '\x1b[42m',
    bgYellow: '\x1b[43m',
    bgBlue: '\x1b[44m',
    bgMagenta: '\x1b[45m',
    bgCyan: '\x1b[46m',
    bgWhite: '\x1b[47m',
  };

  return utils[util];
};

/**
 * Returns current date-time in 'YYYY_MM_DD_HH_MM_SS' format.
 *
 * @source https://stackoverflow.com/q/7357734/10620237#comment85093531_16426519
 * @returns {string}
 */
exports.getCurrentDateTime = function() {
  return new Date()
    .toJSON()
    .slice(0, 19)
    .replace(/[T\:\-]/g, '_');
};

/**
 * Replaces a dotfile with a symbolic link to its source in the repository.
 * NOTE: The script is Unix-specific due to the shell commands used with exec.
 *
 * @param {string} srcFileName
 * @param {string} destFileName
 * @param {string} srcDirPath
 * @param {string} destDirPath
 */
exports.linkDotfile = function(srcFileName, destFileName, srcDirPath, destDirPath) {
  const execSync = require('child_process').execSync;
  const fs = require('fs');
  const path = require('path');

  const srcFilePath = path.resolve(`${srcDirPath}/${srcFileName}`);
  const destFilePath = path.resolve(`${destDirPath}/${destFileName}`);

  // Test whether the destination file exists.
  const existsDestFile =
    execSync(`test -f "${destFilePath}" && printf "true" || printf "false"`).toString() === 'true'
      ? true
      : false;

  // If the full destination path exists...
  if (existsDestFile) {
    // ...test whether it's a symlink, since the '-f' flag in 'test' is true for symlinks too...
    const existsDestSymlink =
      execSync(`test -L "${destFilePath}" && printf "true" || printf "false"`).toString() === 'true'
        ? true
        : false;
    // ...and if the file is indeed not a symlink...
    if (!existsDestSymlink) {
      // ...make a dated copy of the file before replacing it with a symlink...
      const backupFilePath =
        destDirPath +
        '/' +
        path.basename(destFilePath, path.extname(destFilePath)) +
        '_backup_' +
        exports.getCurrentDateTime() +
        path.extname(destFilePath);
      fs.copyFileSync(destFilePath, backupFilePath);
      console.info(
        `${exports.txtUtils('yellow')}Created a dated backup of ${destFileName}:\n `,
        `${exports.txtUtils('reset')}${backupFilePath}`
      );
    }
    // ...then remove the existing file/symlink.
    fs.unlinkSync(destFilePath);
    console.info(
      `${exports.txtUtils('yellow')}Removed the old file/symlink:\n `,
      `${exports.txtUtils('reset')}${srcFilePath}`
    );
  }

  fs.symlink(srcFilePath, destFilePath, err => {
    if (err) {
      console.error(err);
      process.exit(err.errno);
    } else
      console.info(
        `${exports.txtUtils('green')}Created a new symlink to ${destFileName}:\n `,
        `${exports.txtUtils('reset')}${srcFilePath} ->\n `,
        `${destFilePath}`
      );
  });
};
