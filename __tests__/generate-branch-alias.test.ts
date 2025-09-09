/**
 * Unit tests for src/generate-branch-alias.ts
 */

import { generateBranchAlias } from '../src/generate-branch-alias'
import { expect } from '@jest/globals'

describe('generate-branch-alias.ts', () => {
  it.each([
    ['test-abc', 'test-abc'],
    ['Test-ABC', 'test-abc'],
    ['Test:abc', 'test-abc'],
    ['-test-abc-', 'test-abc'],
    ['abcdef123456abcdef123456abcdef123456', 'abcdef123456abcdef123456abcd']
  ])('.generateBranchAlias(%s)', (gitBranch, expected) => {
    const branchAlias = generateBranchAlias(gitBranch)
    expect(branchAlias).toBe(expected)
  })

  it('generate random branch name if input unusable', () => {
    const input = '-::::-'
    const branchAlias = generateBranchAlias(input)
    expect(branchAlias).toMatch(/^branch-[a-z0-9]{10}$/)
  })
})
