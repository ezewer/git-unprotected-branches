# Repo Auditor — Find Repositories with Unprotected Branches

**Description**  
This project provides a Node.js script to audit all repositories in a specified GitHub organization and find which repos have at least one unprotected branch. It uses the [@octokit/rest](https://github.com/octokit/rest.js) library to query GitHub’s API, iterating through all your organization’s repos, fetching unprotected branches, and then reporting which repositories contain them.

## Install

```console
git clone https://github.com/ezewer/git-unprotected-branches
cd git-unprotected-branches
npm i
```

## How to use
1. **Go to the folder** where this program is located (e.g., `cd ./Dcuments/git-unprotected-branches`).
2. **Open a terminal** in that folder.
3. **Set your environment variable** for GitHub access:
   ```console 
   export ORG=NAME_OF_THE_ORGANIZATION
   export GITHUB_TOKEN=GITHUB_ACCESS_TOKEN
   ```
4. **Run program** 
    ```console 
   node index.js
   ```