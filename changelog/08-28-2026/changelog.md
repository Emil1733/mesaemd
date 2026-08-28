# Changelog - August 28, 2026

## Features & Additions
- **GSC Data Analysis:** Pulled and analyzed 30-day GSC data showing massive impressions for neighboring cities but poor average positions (Page 7-9).
- **New City Landing Pages:** Generated 7 highly detailed, 1200+ word, SEO-optimized service area pages to capture local traffic outside of Mesa:
  - Phoenix (`/service-areas/phoenix-pool-removal`)
  - Scottsdale (`/service-areas/scottsdale-pool-removal`)
  - Tempe (`/service-areas/tempe-pool-removal`)
  - Queen Creek (`/service-areas/queen-creek-pool-removal`)
  - Gilbert (`/service-areas/gilbert-pool-removal`)
  - Chandler (`/service-areas/chandler-pool-removal`)
  - San Tan Valley (`/service-areas/san-tan-valley-pool-removal`)
- **JSON-LD FAQs:** Injected structured `FAQPage` JSON-LD schemas into all 7 new city landing pages to capture rich snippet real estate.
- **Internal Linking:** Added all 7 new city pages to the global `Footer.tsx` component and the Next.js `sitemap.ts` to ensure immediate indexing and prevent orphan pages.
- **Custom Image Asset:** Generated a custom, highly-realistic local image (`/hero_pool_demolition.jpg`) to replace generic stock photography.

## Fixes & Polish
- **UI/UX Optimization:** Globally reduced the top padding of the hero container from massive values (`4rem`/`6rem`/`8rem`) down to `2rem` across 14 separate files. This pulls the H1 and Lead Capture forms higher up the page, improving LCP and reducing bounce rates.
- **Stock Image Purge:** Completely stripped all `images.unsplash.com` placeholder URLs across 22 files and replaced them with the custom local asset, significantly improving brand trust and SEO uniqueness. Also updated the `LocalBusinessSchema.tsx` image to an absolute URL pointing to the custom asset.
- **Dependencies:** Installed missing `@supabase/supabase-js` package to fix a Turbopack crashing bug occurring during Next.js client component builds.
