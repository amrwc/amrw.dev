/**
 * @read https://github.com/shd101wyy/mume
 *
 * Example usage:
 * npm i @shd101wyy/mume
 * node render.js ./page-rendering.md
 * node render.js ../mac-setup/setup-instructions.md
 */

const mume = require('@shd101wyy/mume');
const fs = require('fs');

(async function() {
  await mume.init();
  const engine = new mume.MarkdownEngine({
    filePath: `../../README.md`,
    config: {
      previewTheme: 'github-light.css',
      codeBlockTheme: 'github.css',
      printBackground: true,
      enableScriptExecution: true
    }
  });
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });
  await fs.rename('../../README.html', '../../index.html', err => {
    if (err) console.error(err);
  });
  return process.exit();
})();
