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
- Sitemap is generated automatically before build:

```sh
node tools/generate-sitemap.mjs
```

## Deployment (Vercel)

The project is configured to deploy with:

- Build command: `npx nx build business-showcase --configuration=production`
- Output directory: `dist/apps/business-showcase/browser`

## Search Console Verification

Set real tokens in:

- `apps/business-showcase/src/index.html`

Replace:

- `REPLACE_WITH_GOOGLE_SITE_VERIFICATION_TOKEN`
- `REPLACE_WITH_BING_SITE_VERIFICATION_TOKEN`
