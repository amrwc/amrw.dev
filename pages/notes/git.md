# Git

## Change commit editor to something else than `vim`

```bash
git config --global core.editor "nano"
```

## Error: `could not read '~/.stCommitMsg': No such file or directory`

To solve [this issue](https://stackoverflow.com/q/41606853/10620237), remove `commit.template` item from `~/.gitconfig`.

## Set up GnuPG

It's used for [verifying the identity of the commiter (signing commits)](https://help.github.com/en/articles/managing-commit-signature-verification).

```bash
# Installs GnuPG and pinentry (passphrase helper)
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

### Cache the GPG passphrase

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

### Error: `gpg failed to sign the data`

To avoid [certain issues with signing data](https://stackoverflow.com/q/41052538/10620237), run the following:

```bash
# Appends 'export GPG_TTY=$(tty)' to .zshrc
line="\nexport GPG_TTY=$(tty)\n"
printf "$line" >> ~/.zshrc
source ~/.zshrc
```

### Error: miscellaneous

If the above tips didn't help, try removing the gpg programs and go through [the comprehensive guide on SO](https://stackoverflow.com/a/40066889/10620237).

```bash
brew uninstall gpg pinentry-mac
rm -rf ~/.gnupg # Careful! You will lose your GPG keys.
```

## GPG sign all previous commits

In a case where the repository was cloned and commits were made without properly setting up automatic GPG signing, or the commits were simply unsigned, [there is a way to sign all previous commits](https://stackoverflow.com/a/41883164/10620237).

_WARNING: All the commit IDs will change, therefore you're rewriting the history. Proceed with care, especially if you collaborate with other developers._

```bash
git filter-branch --commit-filter 'git commit-tree -S "$@";' -- --all
```

### Known issues

- When all commits were made from one machine (all `Unverified`), and the last commit was done through GitHub (adding LICENCE), the last commit changed from `Verified` to `Unverified`. Running the above snippet again didn't help. The solution was to hard-reset the last commit and re-add the licence.

  ```bash
  git reset --hard HEAD^1
  git push -f
  # Then re-add the licence
  ```
