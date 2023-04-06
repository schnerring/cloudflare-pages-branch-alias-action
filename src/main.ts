import * as core from '@actions/core'
import {generateBranchAlias} from './generate-branch-alias'

function run(): void {
  try {
    const gitBranch: string = core.getInput('git-branch')
    core.debug(`git-branch: ${gitBranch}`)

    core.debug(new Date().toTimeString())

    const branchAlias = generateBranchAlias(gitBranch)

    core.debug(new Date().toTimeString())

    core.setOutput('branch-alias', branchAlias)
    core.debug(`branch-alias: ${branchAlias}`)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
