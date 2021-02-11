#!/usr/bin/env node
'use strict';

// Render
//
// Renders GitHub flavoured HTML out of Markdown documents.
//
// Usage:
//   render.js (-f|--file) <file> [-i|--index]
//   render.js (-r|--recursive)
//
// Options:
//   -h, --help              Show this help
//   --version               Show the version
//   -f, --file=<file>       Input file
//   -r, --recursive         Traverse the current working directory recursively

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
    const { filePath, isIndex, isRecursive } = parseArgv();
    await mume.init();
    if (isIndex) {
        if (!filePath) {
            raiseError(1, 'No file path provided');
        }
        await convertMarkdownToHtml(filePath);
        const indexHtmlPath = processIndexPage(filePath);
        let html = fs.readFileSync(indexHtmlPath, 'utf8');
        html = replaceTitle(html, 'amrw');
        html = replaceMarkdownExtensions(html);
        fs.writeFileSync(indexHtmlPath, html);
    } else if (isRecursive) {
        const markdownFilePaths = getMarkdownFilePathsRecursively([], process.cwd());
        for (const mdFilePath of markdownFilePaths) {
            await processMarkdownFile(mdFilePath);
        }
    } else {
        await processMarkdownFile(filePath);
    }

    // It's needed because of some inherent issue within `mume` that keeps the process running
    // See: https://github.com/shd101wyy/mume/issues/70
    return process.exit(0);
}

async function processMarkdownFile(filePath) {
    if (!filePath) {
        raiseError(1, 'No file path provided');
    }
    const htmlPath = await convertMarkdownToHtml(filePath);
    let html = fs.readFileSync(htmlPath, 'utf8');
    html = replaceTitle(html);
    fs.writeFileSync(htmlPath, html);
}

async function convertMarkdownToHtml(filePath) {
    const markdownEngine = new mume.MarkdownEngine({
        filePath,
        config: MUME_CONFIG,
    });
    await markdownEngine.htmlExport({ offline: false, runAllCodeChunks: true });
    return filePath.replace('.md', '.html');
}

function replaceTitle(html, replacement = '') {
    try {
        let pageTitle = '';
        if (!replacement) {
            // This could be done _way_ easier (and the `htmlparser2` dependency could be removed) by using the
            // original Markdown file's `h1` tag (the single pound sign `#`) which is at the very top of each file,
            // assuming there indeed is the `h1` tag near the top as is recommended by the linter. This would, however,
            // involve reading two files instead of just one.
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
        return html.replace(/<title>(.+?)<\/title>/, `<title>${pageTitle}</title>`);
    } catch (err) {
        console.warn('Error replacing page title:');
        console.warn(err);
    }
}

function replaceMarkdownExtensions(html) {
    return html.replace(/\.md">/g, '.html">');
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
