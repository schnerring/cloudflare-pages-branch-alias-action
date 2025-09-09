/**
 * Unit tests for the action's main functionality, src/main.ts
 *
 * To mock dependencies in ESM, you can create fixtures that export mock
 * functions and objects. For example, the core module is mocked in this test,
 * so that the actual '@actions/core' module is not imported.
 */
import { jest } from '@jest/globals'
import * as core from '../__fixtures__/core.js'
import { generateBranchAlias } from '../__fixtures__/generate-branch-alias.js'

// Mocks should be declared before the module being tested is imported.
jest.unstable_mockModule('@actions/core', () => core)
jest.unstable_mockModule('../src/generate-branch-alias.js', () => ({
  generateBranchAlias
}))

// The module being tested should be imported dynamically. This ensures that the
// mocks are used in place of any actual dependencies.
const { run } = await import('../src/main.js')

describe('main.ts', () => {
  beforeEach(() => {
    // Set the action's inputs as return values from core.getInput().
    core.getInput.mockImplementation(() => 'test-abc')

    // Mock the generateBranchAlias function.
    generateBranchAlias.mockImplementation(() => 'test-abc')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  it('Sets the branch-alias output', async () => {
    await run()

    // Verify that all of the core library functions were called correctly
    expect(core.debug).toHaveBeenNthCalledWith(1, 'git-branch: test-abc')

    const timeRegex = /^\d{2}:\d{2}:\d{2}/
    expect(core.debug).toHaveBeenNthCalledWith(
      2,
      expect.stringMatching(timeRegex)
    )
    expect(core.debug).toHaveBeenNthCalledWith(
      3,
      expect.stringMatching(timeRegex)
    )

    // Verify the branch-alias output was set.
    expect(core.setOutput).toHaveBeenNthCalledWith(
      1,
      'branch-alias',
      'test-abc'
    )

    expect(core.error).not.toHaveBeenCalled()
  })
})
