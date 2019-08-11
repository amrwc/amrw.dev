# Random Scripting Snippets

## Replace file contents matched with regex

Replace in all files in the supplied directory:

```bash
# Source: https://superuser.com/a/118386
find <dir/path> -type f -exec perl -i -pe "s/<search_regex>/<replacement>/g" {} \;
# The following example replaces all occurrences of `.md\"` with `.html\"`
# in files in the current directory while providing backup files.
find . -type f -exec perl -i.bak -pe "s/.md\">/.html\">/g" {} \;
```

Replace in a given file:

```bash
# Source: https://stackoverflow.com/a/4247319/10620237
perl -i -pe "s/<search_regex>/<replacement>/g" <path>
# Example:
perl -i -pe "s/.md\">/.html\">/g" index.html
```
