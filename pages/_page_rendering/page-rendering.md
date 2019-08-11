# Page Rendering

This document describes how to render HTML pages with GitHub Flavoured Markdown (gfm) styling, including syntax highlighting, from Markdown files.

## `index.html`

`index.html` is rendered from `README.md` using `render-index.js` script.

```bash
node render-index.js
```

## [mume](https://github.com/shd101wyy/mume)

Install `mume` and run the preconfigured `render.js` script.

```bash
npm i @shd101wyy/mume
node render.js <file_path>
```

The rendered HTML will appear next to the source files.

## [github-markdown-css](https://github.com/sindresorhus/github-markdown-css)

_Note that this method doesn't support syntax highlighting in code blocks. To achieve that, use the above `mume` method._

Get [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) or [generate it yourself](https://github.com/sindresorhus/generate-github-markdown-css):

```bash
npm install --global generate-github-markdown-css
generate-github-markdown-css > ~/Downloads/github-markdown.css
```

Convert Markdown files to HTML:

```bash
pandoc <source_name>.md > <destination_name>.html
```

Wrap the body in any tag with the `.markdown-body` class and the `include github-markdown.css` stylesheet.

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="github-markdown.css">
<style>
  .markdown-body {
    box-sizing: border-box;
    min-width: 200px;
    max-width: 980px;
    margin: 0 auto;
    padding: 45px;
  }

  @media (max-width: 767px) {
    .markdown-body {
      padding: 15px;
    }
  }
</style>
<article class="markdown-body">
  <h1>Heading</h1>
  <p>Paragraph</p>
</article>
```

## GitHub's auto-rendering

GitHub renders all Markdown documents to HTML, therefore an uploaded document at `/pages/doc.md` should be referred to as `/pages/doc.html` to display the rendered version.

This behaviour can be leveraged in README to, for instance, compose a table of contents:

```Markdown
- [Page](./pages/page.md)
  - [Subpage](./pages/subpages/subpage.md)
```

In the repository the above will link to Markdown files on GitHub, but if the page was accessed through the hosted site, the file extensions in the links would change to `html`.

The caveat of auto-rendered Markdown files is that GitHub adds the pages name at the top and `This site is open source. Improve this page.` as the footer. To avoid this, the steps from the top of the page to manually generate HTML are necessary.

## Special treatment for `index.html`

Whichever method is used, when the `index.html` is re-rendered it requires additional steps.

### Replace `.md` extensions with `.html` (deprecated)

_Please note: this case is deprecated, because the case has been covered in the `render-index.js` script._

`index.html` is rendered from `README.md` which contains URLs to other parts of the repository and the website. For instance, the table of content inside of README points to other Markdown documents, but after it's rendered, the hyperlinks will be broken when `index.html` is deployed to GitHub Pages. Therefore, run the following one-liner that will fix the href's.

```bash
perl -i -pe "s/.md\">/.html\">/g" index.html
```
