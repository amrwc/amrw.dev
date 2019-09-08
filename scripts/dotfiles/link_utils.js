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
 *
 * @param {string} srcFileName
 * @param {string} destFileName
 * @param {string} srcDirPath
 * @param {string} destDirPath
 */
exports.linkDotfile = async function(srcFileName, destFileName, srcDirPath, destDirPath) {
  const path = require('path');
  const fs = require('fs');

  const srcFilePath = path.resolve(`${srcDirPath}/${srcFileName}`);
  const destFilePath = path.resolve(`${destDirPath}/${destFileName}`);

  const errorCallbackGeneric = err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  };

  // NOTE: 'fs.existsSync' gives unexpected results when supplied a symlink.
  //       Find more reliable way of detecting whether a real file exists,
  //       or whether it's a symlink.
  const existsDestFile = fs.existsSync(destFilePath);
  // const existsDestFile = (await fs.open(destFilePath, 'r', (err, fd) => {
  //   errorCallbackGeneric(err);
  // }))
  //   ? true
  //   : false;

  let existsDestSymlink = false;
  await fs.lstat(destFilePath, (err, stats) => {
    if (!err && stats) existsDestSymlink = true;
  });

  // If the file or a symlink with the same path exists...
  if (existsDestFile || existsDestSymlink) {
    if (existsDestFile && !existsDestSymlink) {
      // ...make a dated copy of the file before replacing it with a symlink.
      const backupFilePath =
        destDirPath +
        '/' +
        path.basename(destFilePath, path.extname(destFilePath)) +
        '_' +
        exports.getCurrentDateTime() +
        path.extname(destFilePath);

      await fs.copyFile(destFilePath, backupFilePath, errorCallbackGeneric);
    }

    await fs.unlink(destFilePath, errorCallbackGeneric);
  }

  await fs.symlink(srcFilePath, destFilePath, errorCallbackGeneric);
};
