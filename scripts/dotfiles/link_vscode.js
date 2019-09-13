/**
 * Creates symbolic links for Visual Studio Code's preferences. The repo's dotfiles directory will
 * be the source of all the preferences.
 *
 * NOTE: To use the script, the repository must be present locally, ideally in a place where it
 *       will stay indefinitely; otherwise, when moved, the script must be re-run.
 *
 * Usage:
 * From anywhere on your machine, run:
 * node [path_to_the_file/]link_vscode.js
 */

const os = require('os');
const path = require('path');
const { findRootDir, linkDotfile } = require('./link_utils');

// VS Code preferences location
const DESTINATION_DIR_PATH = `${os.homedir()}/Library/Application Support/Code/User`;
// Name of the root directory of the repository
const ROOT_DIR_NAME = 'amrwc.github.io';

// Traverse the directories upwards to find the repository's root directory.
const rootDirPath = findRootDir(ROOT_DIR_NAME, __dirname);
// Absolute path to the source dotfiles
const SOURCE_DIR_PATH = path.resolve(`${rootDirPath}/dotfiles/vscode`);

linkDotfile('keybindings.json', 'keybindings.json', SOURCE_DIR_PATH, DESTINATION_DIR_PATH);
linkDotfile('settings.json', 'settings.json', SOURCE_DIR_PATH, DESTINATION_DIR_PATH);
