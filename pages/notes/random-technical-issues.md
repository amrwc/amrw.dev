# Random Technical Issues

Uncategorised issues, such as ‘mouse doesn’t work in such and such scenario and here’s how to fix it’.

## Netflix full screen flicker on Mac Safari

1. Go to System Preferences -> Accessibility -> Display.
1. Change the cursor size. It can be put back to the original value, but the flicker will stop.

## [Autojump](https://github.com/wting/autojump) doesn't work

Autojump (`j <dir_name>`) alias may not work after a Shell migration. Try reinstalling the program:

```bash
brew reinstall autojump
```

If the above didn't help, make sure you have the appropriate preset in your relevant `.*rc` file:

```bash
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh
# Append to .zshrc, for instance:
[ -f /usr/local/etc/profile.d/autojump.sh ] && . /usr/local/etc/profile.d/autojump.sh >> ~/.zshrc
source ~/.zshrc
```

## [thefuck](https://github.com/nvbn/thefuck) doesn't work

thefuck (`fuck -y`) alias may be missing from the relevant `.*rc` file:

```bash
eval $(thefuck --alias)
# Append to .zshrc, for instance:
eval $(thefuck --alias) >> ~/.zshrc
source ~/.zshrc
```
