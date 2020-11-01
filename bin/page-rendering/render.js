#!/usr/bin/env node

/**
 * Example usage:
 * ./render.js -f ./page-rendering.md
 * ./render.js --file ../mac-setup/setup-instructions.md
 * ./render.js --file ../README.md --index
 * ./render.js --recursive
 *
 * @see https://github.com/shd101wyy/mume
 */

const fs = require('fs');
const path = require('path');

const mume = require('@shd101wyy/mume');

const MUME_CONFIG = {
    previewTheme: 'github-light.css',
    codeBlockTheme: 'github.css',
    printBackground: true,
    enableScriptExecution: true, // needed for `runAllCodeChunks: true` in `htmlExport()`
};

async function main() {
    const props = parseArgv();
    await mume.init();
    if (props.isRecursive) {
        const markdownFilePaths = getMarkdownFilePathsRecursively([], process.cwd());
        for (mdFile of markdownFilePaths) {
            await convertMarkdownToHtml(mdFile);
        }
    } else {
        if (!props.filePath) {
            raiseError('No file path provided');
        }
        await convertMarkdownToHtml(props.filePath);
    }
    return process.exit(0);
}

async function convertMarkdownToHtml(filePath) {
    const markdownEngine = new mume.MarkdownEngine({
        filePath,
        config: MUME_CONFIG,
    });
    await markdownEngine.htmlExport({ offline: false, runAllCodeChunks: true });
}

function getMarkdownFilePathsRecursively(filePaths, directory) {
    fs.readdirSync(directory).forEach(file => {
        const absolutePath = path.join(directory, file);
        if (fs.statSync(absolutePath).isDirectory()) {
            getMarkdownFilePathsRecursively(filePaths, absolutePath);
        } else if (absolutePath.split('.').pop() === 'md') {
            filePaths.push(absolutePath);
        }
    });
    return filePaths;
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
        if (existsOptionValue(argv, i)) {
            i += 2;
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

function existsOptionValue(argv, index) {
    if (index > argv.length) {
        return false;
    }
    return argv[index] && !isOptionOrFlag(argv[index]);
}

function raiseError(errorCode, message) {
    console.error(message);
    process.exit(errorCode);
}

main();
