# Mac Setup

## Quick steps

1. Open Terminal.
1. Install [Homebrew](https://brew.sh).

   ```console
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
   ```

1. Install prerequisites.

   ```console
   brew install git nvm
   source ~/.zshrc
   ```

1. Install Node.

   ```console
   mkdir ~/.nvm

   # Find latest long-term service branch from the list
   nvm ls-remote

   # Install the LTS
   nvm install --lts=Fermium
   ```

1. Get the repository with dotfiles.

   ```console
   git clone https://github.com/amrwc/amrwc.github.io.git
   ```

1. Symlink dotfiles to the repository (the script uses Node).

   ```console
   cd amrwc.github.io
   ./scripts/dotfiles/link/link_all
   ```

1. Install [Karabiner-Elements](https://karabiner-elements.pqrs.org) to avoid
   further frustration about key mapping.

   ```console
   brew cask install karabiner-elements
   ```

   In case you encounter problems with installing the virtual keyboard/mouse
   driver, as instructed in the app (as of `13.1.0`), the latest known version
   to work flawlessly is `12.10.0` (the disk image
   [can be found on GitHub](https://github.com/pqrs-org/Karabiner-Elements/releases/tag/v12.10.0)).

1. [Change default shell](https://stackoverflow.com/a/26321141/10620237) from
   `Bash` to `Zsh`.

   ```bash
   chsh -s /bin/zsh
   # Alternatively:
   chsh -s "$(which zsh)"
   ```

1. Install `Oh My Zsh`.

   ```console
   sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
   ```

1. Install remaining applications.

   ```console
   brew install autojump gpg pandoc thefuck the_silver_searcher zsh
   brew cask install 1password firefox flux iterm2 slack visual-studio-code
   source ~/.zshrc
   ```

## Less important

1. Set f.lux preferences.

- Location: use the current city.
- Daytime: full brightness (Normal (Daylight)).
- Sunset: 3400K (Halogen).
- Bedtime: 1600K.
- In the dropdown from the menu bar:
  - Options:
    - Fast transitions enabled.
    - Notifications from f.lux website disabled.
    - Backwards alarm clock disabled.
  - Color effects:
    - OS X Dark theme at sunset.

1. Turn on English spell-checking in `Spell Right` in VS Code – press the 'dot
   with halo' icon in the bottom-right corner and choose the language from the
   list.

## Git

- [create and add an SSH key to the account](https://help.github.com/en/articles/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
  – this enables to push to private repositories without providing credentials
  every time,
- set up GnuPG – it's used for
  [verifying the identity of the commiter (signing commits)](https://help.github.com/en/articles/managing-commit-signature-verification)

  <https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/generating-a-new-gpg-key>

  ```console
  # Installs GnuPG
  brew install gpg pinentry-mac

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

## Firefox

### General

1. Allow Firefox to
   - Choose 'Check for updates but let you choose to install them'.

### Home

1. Firefox Home Content
   - Uncheck 'Recommended by Pocket'.

### Search

1. Default Search Engine
   - Choose 'DuckDuckGo'.

### Privacy & Security

1. Firefox Data Collection and Use
   - Uncheck 'Allow Firefox to send technical and interaction data to Mozilla'.
1. HTTPS-Only Mode
   - Check 'Enable HTTPS-Only Mode in all windows'.

### Sync

1. Device Name
   - Give a descriptive name for the device.

### Extensions

#### 1Password

- Set up Touch ID unlocking.
  - Download the 'companion app extension' from
    <https://1password.com/downloads/mac/#browsers>.
    - If you see an error saying 'The add-on could not be downloaded because of
      a connection failure', it's probably due to uBlock/uMatrix. Disable them
      temporarily and try again.

#### uBlock Origin

- Settings
  - Uncheck 'Show the number of blocked requests on the icon'.

#### uMatrix

- Settings
  - Uncheck 'Show the number of blocked resources on the icon'.
- Import uMatrix rules from `kitchen-sink` repository.

#### Cookie AutoDelete

- Settings
  - Extension Options
    - Uncheck 'Show Number of Cookies for that Domain over the Icon'.
- Disable number badge.
- Whitelist common pages.
- TODO: Try exporting the config.

#### Tampermonkey

- Import userscripts from `userscripts` repository.
  - Simply view the 'raw file' in the GitHub repository and Tampermonkey should
    recognise the text on the page as a userscript and offer to install it.

#### Allow extensions in private windows

- Go to `about:addons` and enable all the extensions to work in private
  windows.

## 1Password

- Preferences
  - Security
    - Require Master Password every 1 day.
    - Clear clipboard contents after 10 seconds.
  - Notifications
    - Enable 'Watchtower alerts'.
  - Updates
    - Disable 'Automatically install updates'.
  - Advanced
    - Enable 'Show numbers and symbols first'.

## Finder

- Show items as a list.
- Preferences
  - General
    - New Finder windows show: Documents.
  - Sidebar
    - Uncheck Recents.
- Advanced
  - Enable 'Show all filename extensions'.

## Spotify

- Preferences
  - Music Quality
    - Streaming quality: Very High.
    - Disable 'Normalize volume'.
  - Display Options
    - Enable 'Show unavailable songs in playlists'.
    - Disable 'Show Friend Activity'. (It's the annoying side bar to the
      right.)
  - Startup and Window Behaviour
    - Open Spotify automatically after you log into the computer: No.

## iTerm2 (TODO: deprecated? – check whether the symlinked/imported files handle all the points.)

- Amend the `Quit iTerm2` keyboard shortcut to prevent accidental quits:
  1. Open `System Preferences -> Keyboard`.
  1. Go to `Shortcuts -> App Shortcuts`.
  1. Press the `+` button to add a shortcut.
     - `Application`: iTerm.app`,
     - `Menu Title`: `Quit iTerm2`,
     - `Keyboard Shortcut`: `cmd + alt + Q`
- Import JSON profile:
  1. Open `Preferences…` (`cmd + ,`).
  1. In `Profiles` tab press `Other Actions…` at near the bottom and choose
     `Import JSON Profiles…`.
  1. Navigate to the downloaded JSON profile and choose it.

## System Preferences

### iCloud

- Sign in to iCloud. Ask the employer whether you should use a company-provided
  account, make a new one with the company's email, or just use whatever you
  prefer. It's definitely nice to be able to sync notes, reminders, and
  calendars between the computer and phone.

### Apple ID

This item appears after you've signed in to iCloud.

- iCloud
  - Uncheck 'News'.
  - Uncheck 'Home'.
- Verify devices list and remove any that should no longer be there.

### General

- Appearance: Auto.
- Default web browser: Firefox.app.
- Check 'Ask to keep changes when closing documents'.
- Recent items: None. (This is the menu available via the Apple icon in
  top-left corner.)

### Dock

- Check 'Automatically hide and show the Dock'.
- Uncheck 'Show recent applications in Dock'.

### Mission Control

- Uncheck 'Automatically rearrange Spaces based on most recent use'.
- Uncheck 'When switching to an application, switch to a Space with open
  windows for the application'.

### Siri

- Uncheck 'Enable Ask Siri'.
- Uncheck 'Show Siri in menu bar'.

### Spotlight

- Search Results
  - Uncheck:
    - Bookmarks & History
    - Films
    - Fonts
    - Images
    - Mail & Messages
    - Music
    - Other
    - PDF Documents
    - Presentations
    - Spotlight Suggestions
    - Spreadsheets
  - Uncheck 'Allow Spotlight Suggestions in Look up'.
- Privacy
  - Add any directories that take lots of space, and may be the reason for
    slower results, such as `node_modules`.

### Notifications

Adjust notification settings for individual applications.

### Language & Region

Just make sure these settings won't cause any confusion.

### Touch ID

Set it up to unlock your Mac with it. Currently, there are only 3 fingerprints
slots, so it may get tricky as you can't, for instance, use both index fingers
and both thumbs. Unless... 😳

<https://apple.stackexchange.com/q/270229>

Basically, alternate fingers while you register them. This way, more than one
finger can get saved into one memory slot. Of course, the accuracy goes down,
but for two fingers in each slot it works quite well.

### Users & Groups

- Login Items
  - Make sure the items make sense and that no redundant apps launch at login.

### Security & Privacy

- General
  - Require password `immediately` after sleep or screen saver begins.
- FileVault
  - It requires an iCloud account as a backup option, or else it will return a
    recovery key that has to be saved somewhere.
  - It's actually a quick process when the disk isn't full.
- Firewall
  - Ask the employer for details.
- Privacy
  - Location Services
    - Uncheck 'Enable Location Services'.
  - Advertising
    - Check 'Limit Ad Tracking'.
  - Analytics and Improvements
    - Uncheck all.
- Advanced...
  - Check 'Require an administrator password to access system-wide
    preferences'.

### Software Update

- Uncheck 'Automatically keep my Mac up to date'.
- Advanced...
  - Only leave 'Check for updates' checked.

### Network

- Wi-Fi
  - Advanced...
    - DNS
      - DNS Servers
        - Add `1.1.1.1`.
        - Press OK.
        - Press Apply to save the settings.
- Thunderbolt Bridge
  - Advanced...
    - DNS
      - DNS Servers
        - Add `1.1.1.1`.
        - Press OK.
        - Press Apply to save the settings.

### Bluetooth

- Check 'Show Bluetooth in menu bar'.

### Sound

- Alert volume
  - Put the slider in the middle.
- Check 'Show volume in menu bar'.

### Keyboard

- Keyboard
  - Key Repeat
    - Put the slider in the fastest possible position.
      ```console
      defaults write NSGlobalDomain KeyRepeat -int 2
      ```
  - Delay Until Repeat
    - Put the slider in the fastest possible position.
      ```console
      defaults write NSGlobalDomain InitialKeyRepeat -int 15
      ```
  - Check 'Adjust keyboard brightness in low light'.
  - Check 'Turn keyboard backlight off after `10 secs` of inactivity.
  - Touch Bar shows `Expanded Control Strip`.
  - Customise Control Strip...
    - Put these items in the following order:
      - Brightness
      - Quick Actions
      - Keyboard Brightness
      - Space
      - Media
      - Volume
- Text
  - Uncheck
    - 'Correct spelling automatically'
    - 'Capitalise words automatically'
    - 'Add full stop with double-space'
    - 'Use smart quotes and dashes'
- Shortcuts
  - Input Sources
    - Uncheck both input source navigation options as to avoid accidentally
      changing keyboard layout.
  - Check 'Use keyboard navigation to move focus between controls'.
  - App Shortcuts
    - Override `Quit <app_name>` with `cmd + Q` behaviour of the system by
      adding shortcuts here. `Menu Title` would be, for instance, 'Quit
      Safari'. The spelling must, of course, be correct. `Keyboard Shortcut` is
      whatever combination of keys you want; use `cmd + option + Q`. For
      example:
      - Application: `Firefox.app`
      - Menu title: `Quit Firefox`
      - Keyboard shortcut: `cmd + option + Q`
- Input Sources
  - Add 'British - PC'.
  - Add 'Polish - Pro'.
  - Check 'Show Input menu in menu bar'.

### Trackpad

- Point & Click
  - Look up & data detectors: `Tap with three fingers`.
  - Check 'Tap to click'.
- More gestures
  - Check 'App Exposé'.

### Mouse

- Disable mouse acceleration.

  ```console
  defaults write .GlobalPreferences com.apple.mouse.scaling -1
  ```

  The above may no longer work, according to some threads on Ask Different:

  - <https://apple.stackexchange.com/q/333989/365339>
  - <https://apple.stackexchange.com/q/251456/365339>

  Though, I suspect they didn't restart the machine after they made the change.

  Since I use a SteelSeries mouse, I suppose it doesn't affect me much as I use
  their driver.

  Could also try the
  [ExactMouse tool](https://downloads.steelseriescdn.com/drivers/tools/steelseries-exactmouse-tool.dmg)
  from SteelSeries – some comments claim that it works with any mouse, not just
  SteelSeries's.

### Displays

- Display
  - ~~Uncheck 'Automatically adjust brightness'.~~

### Energy Saver

- Check/uncheck (TODO: test with this option on first to see whether there are
  any side effects) 'Automatic graphics switching'.
- Battery
  - Turn display off after: `3 minutes`.
  - Uncheck 'Slightly dim the display while on battery power'.
- Power Adapter
  - Turn display off after: `5 minutes`.
  - Check 'Prevent computer from sleeping when the display is off'.
  - Uncheck 'Wake for Wi-Fi network access'.
  - Uncheck 'Enable Power Nap while plugged into a power adapter'.
- Check 'Show battery status in menu bar'.
- Battery Health...
  - Uncheck 'Battery health management'.

### Date & Time

- Clock
  - Check 'Show date and time in menu bar'.
  - Uncheck 'Use a 24-hour clock'.
  - Check 'Show am/pm'.
  - Check 'Show the day of the week'.
  - Check 'Show date'.

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

## Safari (deprecated)

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
      - (optional) disable
        `Allow websites to ask for permission to send push notifications`.
  - Advanced
    - enable `Show full website address`,
    - `Default encoding`: Unicode (UTF-8),
    - enable `Show Develop menu in menu bar`.
- Toolbar
  - Control-click (two fingers) an empty space near the top of the window and
    press `Customise Toolbar…`
  - Add the following:
    - Home,
    - Bookmarks,
    - Web Inspector.
- DuckDuckGo
  1. Open [settings](https://duckduckgo.com/settings).
  1. Import the settings (the passphrase from the password manager).

## VS Code

- [Install 'code' command in PATH](https://stackoverflow.com/a/36882426),
- settings.json – `cmd + ,` and copy-paste the contents into JSON version of
  the settings,
- [keybindings.json](https://code.visualstudio.com/docs/getstarted/keybindings)
  (`cmd + K cmd + S`),
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
