# Cloudflare Pages Branch Alias

A GitHub Action that generates a valid branch alias for Cloudflare Pages deployments from a Git branch name.

When using [Direct Uploads for Cloudflare Pages](https://developers.cloudflare.com/pages/platform/direct-upload/), the deployment URL is only available _after_ the deployment has finished. This is insufficient if the deployment URL is required before uploading. For example, the static site generator [Hugo](https://gohugo.io) requires a `baseUrl` parameter at _build time_. This Action serves as a workaround until natively supported by the [cloudflare/workers-sdk](https://github.com/cloudflare/workers-sdk/issues/2410).

[From the Cloudflare docs about Pages Preview Aliases](https://developers.cloudflare.com/pages/platform/preview-deployments/#preview-aliases)

> When a preview deployment is published, it is given a unique, hash-based address — for example, `<hash>.<project>.pages.dev`. These are atomic and may always be visited in the future. However, Pages also creates an alias [`<git-branch>.<project>.pages.dev`] for `git` branch’s name and updates it so that the alias always maps to the latest commit of that branch. [...]
>
> Branch name aliases are lowercased and non-alphanumeric characters are replaced with a hyphen — for example, the `fix/api` branch creates the `fix-api.<project>.pages.dev` alias.

Full credit goes to [Daniel Walsh](https://github.com/WalshyDev) who shared a [JavaScript algorithm to calculate the `<git-branch>` prefix on the Cloudflare Community forums](https://community.cloudflare.com/t/algorithm-to-generate-a-preview-dns-subdomain-from-a-branch-name/477633/2). This Action is merely a wrapper around that script.

## Usage

The following shows how the action can be used to pass the calculated branch alias to Hugo via `--baseURL` flag.

```yml
name: Build Hugo Site

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      deployments: write
    steps:
      - uses: actions/checkout@v3
        with:
          fetch-depth: 0

      - name: Setup Hugo
        uses: peaceiris/actions-hugo@v2
        with:
          hugo-version: "0.111.3"

      - uses: schnerring/cloudflare-pages-branch-alias-action@v1
        id: pages-branch-alias
        with:
          # git-branch input
          git-branch: ${{ github.ref_name }}

      - name: Build Hugo
        # branch-alias output
        run: |
          hugo \
            --minify \
            --baseURL "https://${{ steps.pages-branch-alias.outputs.branch-alias }}.my-project.pages.dev"
```
