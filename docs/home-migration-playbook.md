# Home Page Concrete Migration Patch Guide

This project now includes a concrete migrated home implementation at:
- `src/app/(public)/page.tsx`
- `src/components/public/home-migrated.tsx`

Use the following steps to migrate your original static `index.html`, `css/`, and `images/` assets.

## 1) Copy static assets

```bash
mkdir -p public/images/home
cp -R <old-project>/images/* public/images/home/
```

Images are then available at `/images/home/<filename>`.

## 2) Copy legacy CSS

```bash
mkdir -p src/styles/legacy
cp -R <old-project>/css/* src/styles/legacy/
```

Import the legacy stylesheet(s) at the top of `src/app/globals.css` while migrating.

## 3) Convert HTML sections into React blocks

For `index.html`, migrate section-by-section in this order:
1. Hero + CTA
2. Service highlights
3. Featured projects
4. Latest news

The new `home-migrated.tsx` is intentionally structured in that sequence to make one-to-one mapping easy.

## 4) Replace hardcoded data with API data

The home route already loads from backend APIs:
- `/api/services`
- `/api/projects`
- `/api/news`

These are fetched in `src/app/(public)/page.tsx` and passed into `MigratedHomePage`.

## 5) Image policy

For CMS/editor content, use Cloudinary URLs only.
For migrated static presentation imagery, prefer Cloudinary-hosted assets as well.
