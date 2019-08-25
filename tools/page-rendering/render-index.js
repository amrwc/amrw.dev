/**
 * @read https://github.com/shd101wyy/mume
 *
 * Usage:
 * npm i
 * node render-index.js
 */

const mume = require('@shd101wyy/mume');
const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Paths relative to the script's location rather than where it's being called.
PATH_README_MD = `${__dirname}${path.sep}..${path.sep}..${path.sep}README.md`;
PATH_README_HTML = `${__dirname}${path.sep}..${path.sep}..${path.sep}README.html`;
PATH_INDEX_HTML = `${__dirname}${path.sep}..${path.sep}..${path.sep}index.html`;

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
  // Replace the `README` page title with `amrw`
  exec(
    `perl -i -pe "s/<title>README<\\/title>/<title>amrw<\\/title>/g" ${PATH_INDEX_HTML}`,
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
