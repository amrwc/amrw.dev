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
exports.linkDotfile = function(srcFileName, destFileName, srcDirPath, destDirPath) {
  const path = require('path');
  const fs = require('fs');

  const sourceFilePath = path.resolve(`${srcDirPath}/${srcFileName}`);
  const destinationFilePath = path.resolve(`${destDirPath}/${destFileName}`);

  const errorCallback = err => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
  };

  // If the file exists...
  if (fs.existsSync(destinationFilePath)) {
    // ...make its dated copy before replacing it with a symlink.
    const backupFilePath =
      destDirPath +
      '/' +
      path.basename(destinationFilePath, path.extname(destinationFilePath)) +
      '_' +
      exports.getCurrentDateTime() +
      path.extname(destinationFilePath);

    fs.copyFile(destinationFilePath, backupFilePath, errorCallback);
    fs.unlink(destinationFilePath, errorCallback);
  }
  // TODO: Create an else-if statement to check whether a symlink already exists
  //	     and simply use unlink on it.

  fs.symlink(sourceFilePath, destinationFilePath, errorCallback);
};
