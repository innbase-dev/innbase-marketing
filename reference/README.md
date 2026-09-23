# Supplied reference code

These files are preserved from the current source upload, unchanged.

- `innbase-blog-installation/` was a standalone installation package nested inside `src/app`. Its own README instructs copying its source and public assets into the matching project folders. Leaving the package inside `app` created unintended `/innbase-blog/src/app/blog/...` routes. The active blog remains in `src/app/blog`, `src/components/marketing/blog` and `src/data/blog`; its four OG fonts are now installed in `public/fonts`.
- `unused-app-trpc/` was the unreferenced `src/trpc` directory. It is a temporary main-app router mirror with imports from unavailable `features` packages. No marketing source imports it. It is preserved here for a future main-app integration, rather than fabricating backend types or disabling application type checks. The live referral integration in `src/lib/trpc` remains in place.

This reference folder is excluded from application type-checking and linting. All active application source remains checked.
