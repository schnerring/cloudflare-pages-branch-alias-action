import {generateBranchAlias} from '../src/generate-branch-alias'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'
import {expect, test} from '@jest/globals'

test.each([
  ['test-abc', 'test-abc'],
  ['Test-ABC', 'test-abc'],
  ['Test:abc', 'test-abc'],
  ['-test-abc-', 'test-abc'],
  ['abcdef123456abcdef123456abcdef123456', 'abcdef123456abcdef123456abcd']
])('.generateBranchAlias(%s)', (gitBranch, expected) => {
  const branchAlias = generateBranchAlias(gitBranch)
  expect(branchAlias).toBe(expected)
})

test('Generate random branch name if input unusable', () => {
  const input = '-::::-'
  const branchAlias = generateBranchAlias(input)
  expect(branchAlias).toMatch(/^branch-[a-z0-9]{10}$/)
})

// shows how the runner will run a javascript action with env / stdout protocol
test('test runs', () => {
  process.env['INPUT_GIT-BRANCH'] = 'test-abc'
  const np = process.execPath
  const ip = path.join(__dirname, '..', 'lib', 'main.js')
  const options: cp.ExecFileSyncOptions = {
    env: process.env
  }
  console.log(cp.execFileSync(np, [ip], options).toString())
})
