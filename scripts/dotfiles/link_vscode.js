/**
 * Creates symbolic links for Visual Studio Code's preferences. The repo's
 * dotfiles directory will be the source of all the preferences.
 */

const fs = require('fs');
const os = require('os');
const path = require('path');

// Current date-time in 'YYYY_MM_DD_HH_MM_SS' format.
// Source: https://stackoverflow.com/q/7357734/10620237#comment85093531_16426519
const CURRENT_DATE_TIME = new Date()
  .toJSON()
  .slice(0, 19)
  .replace(/[T\:\-]/g, '_');

const DESTINATION_PATH = `${os.homedir()}/Library/Application Support/Code/User`;
const ROOT_DIR_NAME = 'amrwc.github.io';

// Traverse the directories upwards to find the repository's root directory.
let perhapsRootDir = __dirname;
while (path.basename(perhapsRootDir) !== ROOT_DIR_NAME) {
  perhapsRootDir = path.resolve(`${perhapsRootDir}/../`);
  if (perhapsRootDir === '/') {
    console.error(`Error: Couldn't locate the root '${ROOT_DIR_NAME}'.`);
    process.exit(1);
  }
}
const DOTFILES_DIR_PATH = path.resolve(`${perhapsRootDir}/dotfiles/vscode`);

/**
 * Replaces a dotfile with a symbolic link to its source in the repository.
 * @param {string} fileName
 */
function linkDotfile(fileName) {
  const sourceFilePath = path.resolve(`${DOTFILES_DIR_PATH}/${fileName}`);
  const destinationFilePath = path.resolve(`${DESTINATION_PATH}/${fileName}`);

  // If the file exists...
  if (fs.existsSync(destinationFilePath)) {
    // ...make its dated copy before replacing it with a symlink.
    const backupFilePath =
      DESTINATION_PATH +
      '/' +
      path.basename(destinationFilePath, path.extname(destinationFilePath)) +
      '_' +
      CURRENT_DATE_TIME +
      path.extname(destinationFilePath);

    const callback = err => {
      if (err) {
        console.error(err);
        process.exit(1);
      }
    };
    fs.copyFile(destinationFilePath, backupFilePath, callback);
    fs.unlink(destinationFilePath, callback);
    fs.symlink(sourceFilePath, destinationFilePath, callback);
  }
}

linkDotfile('settings.json');
linkDotfile('keybindings.json');
