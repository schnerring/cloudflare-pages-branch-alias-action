import { jest } from '@jest/globals'

export const generateBranchAlias =
  jest.fn<
    typeof import('../src/generate-branch-alias.js').generateBranchAlias
  >()
