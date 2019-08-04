/**
 * @read https://github.com/shd101wyy/mume
 * 
 * Example usage:
 * npm i @shd101wyy/mume
 * node render.js ./page-rendering.md
 * node render.js ../mac-setup/setup-instructions.md
 */

// node.js
const mume = require('@shd101wyy/mume');

// es6
// import * as mume from "@shd101wyy/mume"

async function main() {
  await mume.init();

  const engine = new mume.MarkdownEngine({
    filePath: `${process.argv[2]}`,
    config: {
      previewTheme: 'github-light.css',
      // revealjsTheme: "white.css"
      codeBlockTheme: 'github.css',
      printBackground: true,
      enableScriptExecution: true // <= for running code chunks
    }
  });

  // open in browser
  // await engine.openInBrowser({ runAllCodeChunks: true });

  // html export
  await engine.htmlExport({ offline: false, runAllCodeChunks: true });

  // chrome (puppeteer) export
  // await engine.chromeExport({ fileType: 'pdf', runAllCodeChunks: true }); // fileType = 'pdf'|'png'|'jpeg'

  // prince export
  // await engine.princeExport({ runAllCodeChunks: true });

  // ebook export
  // await engine.eBookExport({ fileType: 'epub' }); // fileType = 'epub'|'pdf'|'mobi'|'html'

  // pandoc export
  // await engine.pandocExport({ runAllCodeChunks: true });

  // markdown(gfm) export
  // await engine.markdownExport({ runAllCodeChunks: true });

  return process.exit();
}

main();
