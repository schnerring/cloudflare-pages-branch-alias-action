// Author: Daniel Walsh (https://github.com/WalshyDev)
// Source: https://community.cloudflare.com/t/algorithm-to-generate-a-preview-dns-subdomain-from-a-branch-name/477633/2
// License: ?

const invalidCharsRegex = /[^a-z0-9-]/g;
const maxAliasLength = 28
const alphanum = "abcdefghijklmnopqrstuvwxyz0123456789"

function generateBranchAlias(branch: string) {
	const normalised = trim(branch.toLowerCase().replace(invalidCharsRegex, '-'), '-');

	if (normalised === '') {
		return 'branch-' + randAlphaNum(10);
	}

	if (normalised.length > maxAliasLength) {
		return normalised.substring(0, maxAliasLength);
	}

	return normalised;
}

function trim(str: string, char: string): string {
	while (str.charAt(0) === char) {
		if (str.length === 1) {
			return "";
		}
		str = str.substring(1);
	}

	while (str.charAt(str.length - 1) === char) {
		if (str.length === 1) {
			return "";
		}
		str = str.substring(0, str.length - 1);
	}

	return str;
}

function randAlphaNum(length: number): string {
	let result: string = '';

	for (let i = 0; i < length; i++) {
		result += alphanum[Math.floor(Math.random() * alphanum.length)];
	}

	return result;
}