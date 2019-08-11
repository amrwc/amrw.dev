# Git

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
