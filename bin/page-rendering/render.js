#!/usr/bin/env node
'use strict';

// # Render
//
// Renders GitHub flavoured HTML out of Markdown documents.
//
// ## Usage
//
// ```console
// ./render.js -f ./page-rendering.md
// ./render.js --file ../mac-setup/setup-instructions.md
// ./render.js --file ../README.md --index
// ./render.js --recursive
// ```

const childProcess = require('child_process');
const fs = require('fs');
const path = require('path');

const htmlparser2 = require('htmlparser2');
const mume = require('@shd101wyy/mume');

const MUME_CONFIG = {
    previewTheme: 'github-light.css',
    codeBlockTheme: 'github.css',
    printBackground: true,
    enableScriptExecution: true, // needed for `runAllCodeChunks: true` in `htmlExport()`
};
const RENDERING_EXEMPTIONS = new Set(['node_modules', 'README.md']);

async function main() {
    const props = parseArgv();
    await mume.init();
    if (props.isIndex) {
        const { filePath } = props;
        verifyFilePath(props);
        await convertMarkdownToHtml(filePath);
        const indexHtmlPath = processIndexPage(filePath);
        replaceTitle(indexHtmlPath, 'amrw');
    } else if (props.isRecursive) {
        const markdownFilePaths = getMarkdownFilePathsRecursively([], process.cwd());
        for (const mdFile of markdownFilePaths) {
            await convertMarkdownToHtml(mdFile);
            replaceTitle(mdFile.replace('.md', '.html'));
        }
    } else {
        const { filePath } = props;
        verifyFilePath(props);
        await convertMarkdownToHtml(filePath);
        replaceTitle(filePath.replace('.md', '.html'));
    }

    // It's needed because of some inherent issue within `mume` that keeps the process running perpetually
    // See: https://github.com/shd101wyy/mume/issues/70
    return process.exit(0);
}

async function convertMarkdownToHtml(filePath) {
    const markdownEngine = new mume.MarkdownEngine({
        filePath,
        config: MUME_CONFIG,
    });
    await markdownEngine.htmlExport({ offline: false, runAllCodeChunks: true });
}

function replaceTitle(filePath, replacement = '') {
    try {
        const html = fs.readFileSync(filePath, 'utf8');
        let pageTitle = '';
        if (!replacement) {
            const headers = [];
            const htmlParser = new htmlparser2.Parser({
                onopentag(tagname, attributes) {
                    if (tagname === 'h1') {
                        headers.push('<h1>'); // ['<h1>']
                    }
                },
                ontext(text) {
                    if (headers[headers.length - 1] === '<h1>') {
                        headers.push(text); // ['<h1>', 'Page title']
                    }
                },
                onclosetag(tagname) {
                    if (tagname === 'h1') {
                        headers.push('</h1>'); // ['<h1>', 'Page title', '</h1>']
                    }
                },
            });
            htmlParser.write(html);
            htmlParser.end();
            pageTitle = headers[1]; // 'Page title'
        } else {
            pageTitle = replacement;
        }
        const htmlReplaced = html.replace(/<title>(.+?)<\/title>/, `<title>${pageTitle}</title>`);
        fs.writeFileSync(filePath, htmlReplaced);
    } catch (err) {
        console.warn('Error replacing page title:');
        console.warn(err);
    }
}

function getMarkdownFilePathsRecursively(filePaths, directory) {
    fs.readdirSync(directory).forEach(file => {
        const absolutePath = path.join(directory, file);
        if (RENDERING_EXEMPTIONS.has(file)) {
            console.info(`Skipping rendering for: ${absolutePath}`);
            return;
        }
        if (fs.statSync(absolutePath).isDirectory()) {
            getMarkdownFilePathsRecursively(filePaths, absolutePath);
        } else if (path.extname(absolutePath) === '.md') {
            filePaths.push(absolutePath);
        }
    });
    return filePaths;
}

function verifyFilePath(props) {
    if (!props.filePath) {
        raiseError(1, 'No file path provided');
    }
}

function processIndexPage(mdFilePath) {
    // The HTML file rendered from the given Markdown file must be renamed to 'index.html'
    const srcHtmlPathParts = path.join(process.cwd(), mdFilePath).split('/'); // ['', 'Users', ..., 'README.md']
    const srcHtmlName = srcHtmlPathParts[srcHtmlPathParts.length - 1].split('.'); // ['README', 'md']
    srcHtmlName[1] = 'html'; // ['README', 'html']
    srcHtmlPathParts[srcHtmlPathParts.length - 1] = srcHtmlName.join('.'); // ['', 'Users', ..., 'README.html']
    const srcHtmlPath = srcHtmlPathParts.join('/'); // /Users/.../README.html

    const indexPathParts = srcHtmlPathParts.slice(); // ['', 'Users', ..., 'README.html']
    indexPathParts[indexPathParts.length - 1] = 'index.html'; // ['', 'Users', ..., 'index.html']
    const indexPath = indexPathParts.join('/'); // /Users/.../index.html

    // README.html -> index.html
    fs.renameSync(srcHtmlPath, indexPath, err => {
        if (err) {
            raiseError(1, err);
        }
    });

    const callback = (err, stdout, stderr) => {
        if (err) {
            raiseError(1, err);
        }
        console.log(stdout);
        if (stderr) {
            raiseError(1, stderr);
        }
    };
    // Replace the `.md` href extensions in the file with `.html`
    childProcess.exec(`perl -i -pe "s/.md\\">/.html\\">/g" ${indexPath}`, callback);
    // Replace the `README` page title with `amrw`
    childProcess.exec(`perl -i -pe "s/<title>README<\\/title>/<title>amrw<\\/title>/g" ${indexPath}`, callback);
    // Return the path for future convenience
    return indexPath;
}

function parseArgv() {
    const argv = process.argv.slice();
    if (argv.length < 3) {
        raiseError(1, 'Not enough arguments');
    }
    while (!argv[0].includes('render.js')) {
        argv.splice(0, 1);
    }
    argv.splice(0, 1); // Remove the redundant script name argument

    const props = {};
    let i = 0;
    while (i < argv.length) {
        let arg = argv[i];
        if (!isOptionOrFlag(arg)) {
            i++;
            continue;
        }
        switch (arg) {
            case '-f':
            case '--file':
                props.filePath = argv[i + 1];
                i += 2;
                break;
            case '-i':
            case '--index':
                props.isIndex = true;
                i++;
                break;
            case '-r':
            case '--recursive':
                props.isRecursive = true;
                i++;
                break;
            default:
                break;
        }
    }
    return props;
}

function isOptionOrFlag(arg) {
    return arg.startsWith('--') || arg.startsWith('-');
}

function raiseError(errorCode, message) {
    console.error(message);
    process.exit(errorCode);
}

main();
