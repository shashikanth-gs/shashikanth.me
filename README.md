# shashikanth.me

Public personal website for Shashi Kanth G S.

This repository is intentionally focused on personal branding, writing, and SEO landing pages for `shashikanth.me`.

## Repo Separation

- `shashikanth.me` (this repo): personal public site
- `spartan-workspace` (separate repo): private multi-suite workspace and reusable platform foundation

## Tech Stack

- Nx workspace
- Angular SSR/SSG output
- Spartan UI-based component library (local workspace libs)
- Vercel deployment (`vercel.json`)

## Run Locally

```sh
npm install
npx nx serve business-showcase
```

## Production Build

```sh
npx nx build business-showcase --configuration=production
```

## SEO Automation

- Route-level SEO metadata + JSON-LD is configured in app code.
- The following files are generated automatically before build:
  - `apps/business-showcase/public/sitemap.xml`
  - `apps/business-showcase/public/llms.txt`
  - `apps/business-showcase/public/rss.xml`
  - `apps/business-showcase/public/atom.xml`
  - `apps/business-showcase/public/feed.json`

```sh
npm run generate:seo-assets
```

## IndexNow Automation

- IndexNow key file is published at:
  - `https://shashikanth.me/24f7d92c48bde2c216f3014aa4b38dd5.txt`
- On Vercel production builds, sitemap URLs are submitted automatically via:
  - `tools/indexnow-submit.mjs`
- You can run it manually:

```sh
npm run indexnow:submit
```

## Google Search Console Automation

- On Vercel production builds, sitemap submission to Google Search Console runs via:
  - `tools/google-search-console-submit.mjs`
- Configure these Vercel environment variables:
  - `GSC_CLIENT_EMAIL` (service account email)
  - `GSC_PRIVATE_KEY` (service account private key; keep `\n` escaped)
  - `GSC_SITE_URL` (Search Console property, for example `https://shashikanth.me/` or `sc-domain:shashikanth.me`)
- Optional:
  - `GSC_SITEMAP_URL` (defaults to `https://shashikanth.me/sitemap.xml`)
- Important:
  - Add the service account email (`GSC_CLIENT_EMAIL`) as an owner or user on the same Search Console property.

Manual run:

```sh
npm run google:submit-sitemap
```

## Deployment (Vercel)

The project is configured to deploy with:

- Build command:
  - `npx nx build business-showcase --configuration=production && node tools/indexnow-submit.mjs --production-only && node tools/google-search-console-submit.mjs --production-only`
- Output directory: `dist/apps/business-showcase/browser`

## Search Console Verification

Verification meta tags are already set in:

- `apps/business-showcase/src/index.html`
