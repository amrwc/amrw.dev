# Bash

## Variable expansion / substring replacement

Strings can be expanded with colon notation to get a substring. After the first colon, there is a position from which the substring starts, after the second colon, the length of the substring.

```bash
${variable:position:length}
```

```bash
# Cuts away 2 of the first characters
name="John"
echo "${name:2}"
> hn

# Cuts away the first character and trims the substring to length 3
surname="Smith"
echo "${surname:1:3}"
> mit
```

Example use case:

```bash
case ${1} in # If the script's first argument is...
  -r|--root ) # ...'-r' or '--root', set path to root.
    path="/"
  ;;
  -d|--docs ) # ...'-d' or '--docs', set path to Documents.
    path="${HOME}/Documents/"
  ;;
  * ) # ...or else, set path to HOME (~).
    path="${HOME}"
  ;;
esac
```

More information: http://www.tldp.org/LDP/abs/html/parameter-substitution.html#EXPREPL1
