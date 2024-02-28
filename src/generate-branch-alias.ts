// Author: Daniel Walsh (https://github.com/WalshyDev)
// Source: https://community.cloudflare.com/t/algorithm-to-generate-a-preview-dns-subdomain-from-a-branch-name/477633/2
// License: ?
//
// Modified by: Michael Schnerring

const invalidCharsRegex = /[^a-z0-9-]/g
const maxAliasLength = 28
const alphanum = 'abcdefghijklmnopqrstuvwxyz0123456789'

export function generateBranchAlias(branch: string): string {
  let normalised = branch.toLowerCase().replace(invalidCharsRegex, '-')

  if (normalised.length > maxAliasLength) {
    normalised = normalised.substring(0, maxAliasLength)
  }

  normalised = trim(normalised, '-')

  if (normalised === '') {
    return `branch-${randAlphaNum(10)}`
  }
  
  return normalised
}

function trim(str: string, char: string): string {
  while (str.startsWith(char)) {
    if (str.length === 1) {
      return ''
    }
    str = str.substring(1)
  }

  while (str.endsWith(char)) {
    if (str.length === 1) {
      return ''
    }
    str = str.substring(0, str.length - 1)
  }

  return str
}

function randAlphaNum(length: number): string {
  let result = ''

  for (let i = 0; i < length; i++) {
    result += alphanum[Math.floor(Math.random() * alphanum.length)]
  }

  return result
}
