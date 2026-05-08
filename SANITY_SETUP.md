# Sanity CMS Setup

This portfolio is wired to read projects and skills from Sanity, with local fallback data from `src/data` when Sanity is not configured or the request fails.

## 1. Create or Find Your Sanity Project

This repo is connected to:

- Project ID: `sl7hlzy0`
- Dataset: `production`

## 2. Configure Environment Variables

Create `.env.local` in the project root:

```bash
VITE_SANITY_PROJECT_ID=sl7hlzy0
VITE_SANITY_DATASET=production
VITE_SANITY_API_VERSION=2026-05-08
VITE_SANITY_USE_CDN=true
SANITY_STUDIO_PROJECT_ID=sl7hlzy0
SANITY_STUDIO_DATASET=production
SANITY_STUDIO_API_VERSION=2026-05-08
```

Only the `VITE_` variables are exposed to the portfolio frontend. The `SANITY_STUDIO_` variables are used by Sanity Studio.

## 3. Run the Studio

```bash
npm run studio
```

The Studio uses these schema types:

- `siteSettings`
- `project`
- `skill`

Local Studio URL: `http://localhost:3333`

## Languages

The portfolio supports English and Dutch:

- English routes: `/`, `/projects`, `/projects/:slug`
- Dutch routes: `/nl`, `/nl/projects`, `/nl/projects/:slug`

Content documents have a `language` field. Dutch project and skill pages fall back to English content until Dutch documents are published in Sanity. Site-wide text, SEO, navigation labels, roles, about copy, social links, tech badges, and stats labels live in `siteSettings` documents for `en` and `nl`.

## 4. Run the Portfolio

```bash
npm run dev
```

If Sanity has published `project` or `skill` documents, the portfolio will use them. Otherwise, it will continue using the local files in `src/data`.

Local portfolio URL: `http://127.0.0.1:3000`

## Seed Content

The current local portfolio content and default English/Dutch site settings have been seeded into Sanity. To run that again after editing `src/data`, use:

```bash
npm run sanity:seed
```

The seed script uploads local images from `public/images` to Sanity image assets and connects them to the matching project hero, gallery, and avatar fields. Existing Sanity image assets are reused by filename, so rerunning the seed does not intentionally duplicate uploads.

## Notes

This project uses React 19 and Sanity Studio 5. The Studio navigation is grouped into featured projects, all projects, coming soon projects, and skills. Vision is configured against the same API version and dataset as the portfolio.
