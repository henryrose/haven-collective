# Haven Collective

Public website for Haven Collective: six artists in Port Townsend, WA, connected by motherhood.
Built with [Astro](https://astro.build) and content collections so the artists can edit content as Markdown without touching code.

## Develop

Requires Node 22+ (Node 24 via nvm works).

```sh
npm install
npm run dev      # http://localhost:4321
npm run build    # static output in dist/
npm run preview  # serve dist/
npm run check    # type-check .astro files and content
```

## Deploy

Pushes to `main` run `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages at https://henryrose.github.io/haven-collective/. The Pages source must be set to "GitHub Actions" in the repo settings (Settings → Pages). Internal links go through `src/lib/url.ts` so they carry the `/haven-collective` base path; when the site moves to a custom domain, set `site` and remove `base` in `astro.config.mjs`.

## Content

All site content lives in `src/content/` and is validated by the schemas in `src/content.config.ts`.

| Folder | One file per | Notes |
| --- | --- | --- |
| `artists/*.md` | artist | Frontmatter: name, medium, order, key work image + crop, portrait, `work[]`. Body: bio paragraphs. Filename is the URL slug. |
| `events/*.md` | show | Frontmatter: title, start/end dates, venue, reception, poster, hero, `featured[]` (mosaic), `photos[]` with captions and `emphasis` (none/tall/wide), participating artists. Body: blurb paragraphs. Status (upcoming/past) is derived from `endDate` at build time. |
| `site/settings.json` | site | Name, location, tagline, contact email, collective statement, Home hero image and lead copy. |

Image paths in content are relative to the content file (for example `../../assets/media/spoons.jpg`). Astro generates WebP `srcset` variants at build time, so drop full-size photos into `src/assets/media/`.

## Layout

- `src/layouts/Base.astro` — document shell, self-hosted fonts (Karla, Courier Prime), header and footer
- `src/pages/` — Home, `artists/` (index + `[slug]`), `events/` (index + `[slug]` + `[slug].ics` calendar file), `about`
- `src/components/` — `Hero` (scroll parallax, disabled under reduced motion), `Statement`, `ArtistGrid`, `PastShows`, `EventMosaic`, `Lightbox` (uncropped work photos, prev/next, Esc)
- `src/lib/events.ts` — upcoming/past split, date formatting, mosaic image selection; `src/lib/text.ts` — paragraph and excerpt helpers
- `src/styles/global.css` — design tokens from the handoff

## Design reference

`design_handoff_haven_collective_site/` holds the handoff README, HTML design references for every page, seed data, and web-sized media. `context/` holds the original photos and show wording.

All six page templates are built: Home, Artists index, Artist page, Events index, Event page (upcoming and past variants), About.

Content still needed from the artists: Ali's statement and medium, headshots (portraits currently crop the group photo), a poster for the Nov 7 show (`poster` and `posterPdf` on the event), and Jaimie's video link.
