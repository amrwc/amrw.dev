# Mac Setup

## Homebrew

Run the following to install `brew`. It will also take care of the Xcode Command Line Tools installation.

```bash
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

Install relevant programs:

```bash
brew install autojump git gpg pandoc thefuck the_silver_searcher zsh
brew cask install iterm2 slack visual-studio-code
```

## iTerm2

- Amend the `Quit iTerm2` keyboard shortcut to prevent accidental quits:
  1. Open `System Preferences -> Keyboard`.
  1. Go to `Shortcuts -> App Shortcuts`.
  1. Press the `+` button to add a shortcut.
     - `Application`: iTerm.app`,
     - `Menu Title`: `Quit iTerm2`,
     - `Keyboard Shortcut`: `cmd + alt + Q`
- Import JSON profile:
  1. Open `Preferences…` (`cmd + ,`).
  1. In `Profiles` tab press `Other Actions…` at near the bottom and choose `Import JSON Profiles…`.
  1. Navigate to the downloaded JSON profile and choose it.

## Shell

- Install `Oh My Zsh`:
  ```bash
  sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
  ```
- [Change default shell](https://stackoverflow.com/a/26321141/10620237) from `Bash` to `Zsh`:

  ```bash
  chsh -s /bin/zsh
  # Alternatively:
  # chsh -s $(which zsh)
  ```

- (optional) More useful tips:
  - https://sourabhbajaj.com/mac-setup/iTerm/zsh.html
- Import dotfiles:
  ```bash
  bash <(curl -sL amrw.dev/scripts/import_dotfiles)
  source ~/.zshrc
  ```

## Git

- [set commit editor](https://stackoverflow.com/a/2596835/10620237) to `nano` (as opposed to the default `vim`)

  ```bash
  git config --global core.editor "nano"
  ```

- [create and add an SSH key to the account](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent) – this enables to push to private repositories without providing credentials every time,
- set up GnuPG – it's used for [verifying the identity of the commiter (signing commits)](https://help.github.com/en/articles/managing-commit-signature-verification)

  ```bash
  # Installs GnuPG
  brew install gpg

  # Starts an interactive setup
  gpg --full-generate-key

  # Lists the local gpg keys – copy the right ssb
  # (the part after 'rsa4096/')
  gpg --list-secret-keys --keyid-format LONG

  # Exports the GPG key – copy-paste it to GitHub/GitLab/whatever
  gpg --armor --export <the_ssb_from_above>

  # Arms Git with the signing key
  git config --global user.signingkey <the_ssb_from_above>

  # These two are necessary for GitHub and others
  # to properly recognise the signature
  # The email looks like the following:
  # 01231230+username@users.noreply.github.com
  git config --global user.email "your.github.or.gitlab@email.address"
  git config --global user.name "Your Name"

  # This tells Git to always sign the local commits
  git config --global commit.gpgSign true
  ```

- Error: `gpg failed to sign the data`

  To avoid [certain issues with signing data](https://stackoverflow.com/q/41052538/10620237), run the following:

  ```bash
  # Appends 'export GPG_TTY=$(tty)' to .zshrc
  line="\nexport GPG_TTY=$(tty)\n"
  printf "$line" >> ~/.zshrc
  source ~/.zshrc
  ```

- Cache the GPG passphrase

  To [keep the signature's passphrase cached](https://superuser.com/q/624343) for a certain amout of time in order to skip the prompt on every commit, run the following:

  ```bash
  # Appends 'cache-ttl' values to
  # gpg-agent.conf to keep the GPG
  # passphrase cached for 400 days
  printf "\ndefault-cache-ttl 34560000
  max-cache-ttl 34560000" >> ~/.gnupg/gpg-agent.conf

  # Restarts the gpg-agent
  gpg-connect-agent reloadagent /bye
  ```

- Error: `could not read '~/.stCommitMsg': No such file or directory`

  To solve [this issue](https://stackoverflow.com/q/41606853/10620237), remove `commit.template` item from `~/.gitconfig`.

## System Preferences

- Dock
  - disable `Show recent applications in Dock`,
  - Remove every icon from the Dock, keep Downloads and Documents.
  - enable `Automatically hide and show the Dock`.
- Mission Control
  - disable `Automatically rearrange Spaces based on most recent use`,
  - disable `When switching to an application, switch to a Space (…)`.
- Language & Region
  - Just make sure these settings won't cause any confusion.
- Security & Privacy
  - General
    - set `Require password (…)` to `immediately`,
  - FileVault
    - It requires an iCloud account as a backup option, or else it will return a recovery key that has to be saved somewhere.
    - It's actually a quick process when the disk isn't full.
  - Firewall
    - Ask the employer for details.
  - Privacy
    - disable Location Services,
    - disable Analytics,
    - disable Advertising.
- Displays
  - Display
    - disable `Automatically adjust brightness`.
- Energy Saver
  - Battery
    - `Turn display off after`: 3min,
    - disable `Slightly dim the display while on battery power`.
- Keyboard
  - Text
    - disable `Correct spelling automatically`,
    - disable `Capitalise words automatically`,
    - disable `Add full stop with double-space`,
    - disable `Use smart quotes and dashes`.
  - Shortcuts
    - `Full Keyboard Acces`: All controls,
    - Input Sources
      - disable `Select the previous input source`,
    - App Shortcuts
      - Override `Quit <app_name>` with `cmd + Q` behaviour of the system by adding shortcuts here. `Menu Title` would be, for instance, 'Quit Safari'. The spelling must be correct. `Keyboard Shortcut` is whatever combination of keys; use `cmd + option + Q`.
      - Re-bind copy-paste
        1. Press `+` down below.
        1. Application: `All Applications`.
        1. Menu Title: `Copy`/`Paste`.
        1. Keyboard Shortcut: `cmd + ;`/`cmd + '`.
  - Input Sources
    - add `British`,
    - add `Polish - Pro`,
    - enable `Show Input menu in menu bar`.
- Trackpad
  - `Look up & data detectors`: Tap with three fingers,
  - enable `Tap to click`,
  - enable every other gesture and keep defaults.
- Sound
  - enable `Show volume in menu bar`.
- iCloud
  - Make a company-specific account using the company-issued email address.
- Software Update
  - `Advanced…`
    - disable `Download new updates when available`.
- Bluetooth
  - Turn Bluetooth off, unless you use external devices.
- Extensions
  - Touch Bar
    - Only keep the ESC, brightness, volume and mute buttons.
- Touch ID
  - add the fingerprints,
  - `Use Touch ID for`: enable all.
- Siri
  - disable `Ask Siri`,
  - disable `Show Siri in menu bar`.
- Date & Time
  - Clock
    - enable `Show date and time in menu bar`,
    - disable `Use a 24-hour clock`,
    - enable `Show AM/PM`,
    - enable `Show the day of the week`,
    - enable `Show date`.

## Finder

- Preferences (`cmd + ,`)
  - General
    - New Finder windows show: `Documents`,
  - Tags
    - Select all the tags (`cmd + a`) and remove them (the `-` button below).
  - Sidebar
    - disable `Recents`.
  - Advanced
    - enable `Show all filename extensions`.
- Show hidden files
  1. Open Terminal.
  2. Run
     ```bash
     defaults write com.apple.finder AppleShowAllFiles YES
     ```
  3. Relaunch (Force Quit) Finder.

## Safari

- View
  - enable `Show Status Bar` – status bar is the bottom-left link preview.
- Extensions
  - Bitwarden (or any other relevant password manager),
  - uBlock Origin.
- Preferences
  - General
    - `New windows open with`: Empty Page,
    - `New tabs open with`: Empty Page,
    - `Homepage`: `https://duckduckgo.com`,
    - `Remove history items`: Manually,
    - `Remove download list itmems`: Manually,
    - disable `Open "safe" files after downloading`.
  - Tabs
    - enable `Show website icons in tabs`.
  - AutoFill
    - disable all.
  - Search
    - `Search engine`: DuckDuckGo.
  - Websites
    - Notifications
      - (optional) disable `Allow websites to ask for permission to send push notifications`.
  - Advanced
    - enable `Show full website address`,
    - `Default encoding`: Unicode (UTF-8),
    - enable `Show Develop menu in menu bar`.
- Toolbar
  - Control-click (two fingers) an empty space near the top of the window and press `Customise Toolbar…`
  - Add the following:
    - Home,
    - Bookmarks,
    - Web Inspector.
- DuckDuckGo
  1. Open [settings](https://duckduckgo.com/settings).
  1. Import the settings (the passphrase from the password manager).

## VS Code

- [Install 'code' command in PATH](https://stackoverflow.com/a/36882426),
- settings.json – `cmd + ,` and copy-paste the contents into JSON version of the settings,
- [keybindings.json](https://code.visualstudio.com/docs/getstarted/keybindings) (`cmd + K cmd + S`),
- plug-ins:
  - Bracket Pair Colorizer,
  - GitLens – Git supercharged,
  - Markdown Preview Enhanced,
  - Prettier – Code formatter,
  - Quit Control for VSCode,
  - TODO Highlight,
  - Visual Studio IntelliCode.

## Terminal (deprecated)

- com.apple.Terminal.plist

  ```bash
  cp com.apple.Terminal.plist ~/Library/Preferences/
  ```

- .bash_profile, .bashrc, etc.

  ```bash
  cp .* ~/
  ```
