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
const { exec } = require('child_process');

PATH_README_MD = '../../README.md';
PATH_README_HTML = '../../README.html';
PATH_INDEX_HTML = '../../index.html';

(async function() {
  await mume.init();
  const engine = new mume.MarkdownEngine({
    filePath: PATH_README_MD,
    config: {
      previewTheme: 'github-light.css',
      codeBlockTheme: 'github.css',
      printBackground: true,
      enableScriptExecution: true
    }
  });
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });
  await fs.renameSync(PATH_README_HTML, PATH_INDEX_HTML, err =>
    handleError(err)
  );

  // Replace the `.md` href extensions with `.html`
  exec(
    `perl -i -pe "s/.md\\">/.html\\">/g" ${PATH_INDEX_HTML}`,
    (err, stdout, stderr) => {
      handleError(err);
      console.log(stdout);
      console.error(stderr);
    }
  );

  return process.exit();
})();

function handleError(err) {
  if (err) {
    console.error(err);
    process.exit(1);
  }
}
