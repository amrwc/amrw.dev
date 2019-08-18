# macOS System Preferences Importing Instructions

## Find out what is being changed by the System Preferences.app

Source: https://apple.stackexchange.com/a/79765

```bash
# Save all the current preferences
mkdir -p ~/Downloads/__BACKUP_CONFIGS && cp -r ~/Library/Preferences/ ${_}/before_PREFERENCES
```

Open System Preferences.app and do the changes you want to be able to perform in the script.

```bash
# Save the new preferences
cp -r ~/Library/Preferences/ ~/Downloads/__BACKUP_CONFIGS/after_PREFERENCES
# Find out which files have changed
diff -ur ~/Downloads/__BACKUP_CONFIGS/before_PREFERENCES \
~/Downloads/__BACKUP_CONFIGS/after_PREFERENCES | grep differ
```

The above will tell which files have changed. The next step is to decompile them to XML and compare them to see which key-value pair has changed.

```bash
cd ~/Downloads/__BACKUP_CONFIGS
plutil -convert xml1 -o /dev/stdout ~/Library/Preferences/<domain_name> > before
plutil -convert xml1 -o /dev/stdout ~/Library/Preferences/<domain_name> > after
code --diff before after
```

Remember to quit System Preferences.app before applying the change using `defaults`.

```bash
osascript -e 'tell application "System Preferences" to quit'
```

## Idioms for NSGlobalDomain

- kCFPreferencesAnyApplication,
- .GlobalPreferences – it's a file name, therefore if it doesn't exist, `defaults` will fail.

## Not sure whether these work

- [ ] Keyboard > Shortcuts > Input Sources,
- [ ] Keyboard > Shortcuts > App Shortcuts,
- [ ] Keyboard > Input Sources.
