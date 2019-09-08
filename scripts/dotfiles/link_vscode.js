/**
 * Creates symbolic links for Visual Studio Code's preferences. The repo's
 * dotfiles directory will be the source of all the preferences.
 */

const os = require('os');
const path = require('path');
const { linkDotfile } = require('./link_utils');

// VS Code preferences location
const DESTINATION_DIR_PATH = `${os.homedir()}/Library/Application Support/Code/User`;
// Name of the root of the repository
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
// Absolute path to the source dotfiles
const SOURCE_DIR_PATH = path.resolve(`${perhapsRootDir}/dotfiles/vscode`);

linkDotfile('keybindings.json', 'keybindings.json', SOURCE_DIR_PATH, DESTINATION_DIR_PATH);
linkDotfile('settings.json', 'settings.json', SOURCE_DIR_PATH, DESTINATION_DIR_PATH);
