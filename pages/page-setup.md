# Page setup

Get [GitHub Markdown CSS](https://github.com/sindresorhus/github-markdown-css) or [generate it](https://github.com/sindresorhus/generate-github-markdown-css):

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
