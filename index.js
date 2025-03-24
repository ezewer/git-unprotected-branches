'use strict'

import { Octokit } from '@octokit/rest'

async function check() {
  const orgName = process.env.ORG
  if (!orgName) throw new Error('ORG missing, please check README for instructions')
  
  const token = process.env.GITHUB_TOKEN
  if (!token) throw new Error('GITHUB_TOKEN missing, please check README for instructions')
  
  const octokit = new Octokit({ auth: token })
  let page = 1
  const perPage = 100
  const unpRepos = []
  let checkedRepos = 0
  let running = true
  console.log('Start running:')

  while (running) {
    try {
      const { data: repos } = await octokit.repos.listForOrg({
        org: orgName,
        type: "all",
        per_page: perPage,
        page,
      })

      if (repos.length === 0) {
        console.log('Finished')
        running = false
      }

      for (const repo of repos) {
        try {
          const { data: unpBrnches } = await octokit.repos.listBranches({
            owner: orgName,
            repo: repo.name,
            protected: false,  //  Filter for unprotected branches
            per_page: 100 // Only displays 100 unprotected branches
          })

          if (unpBrnches.length > 0) {
            unpRepos.push({
              repo: repo.name,
              unprotectedBranches: unpBrnches.map(b => b.name)
            })
          }
          checkedRepos++
          process.stdout.write(`Running, repos checked until now: ${checkedRepos}; Unproteced repos found: ${unpRepos.length}.\r`)
        } catch (err) {
          console.log(`Error fetching branches for ${repo.name}: ${err.message}`)
        }
      }

      page++
    } catch (err) {
      console.log(`Error fetching repos: ${err.message}`)
      break
    }
  }

  console.log(`Organization ${orgName} had ${checkedRepos} checked and found ${unpRepos.length} unproteceted`)
  if (unpRepos.length) {
    console.log('Details of unproteceted repositories: ', JSON.stringify(unpRepos, null, 2))
  }
}

check()