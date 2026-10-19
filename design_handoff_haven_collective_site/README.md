# Handoff: Haven Collective website

## Overview
Public website for Haven Collective — six artists in Port Townsend, WA, connected by motherhood. The site introduces the artists (collective + individual statements), publicizes upcoming shows, archives past shows, and showcases work as photos (and eventually video).

Six page templates, all designed and linked: Home, Artists index, Artist page, Events index, Event page (upcoming and past variants), About.

## About the design files
Everything in `design/` is a **design reference built in HTML** — it shows intended look and behavior, it is not production code to copy. Recreate these designs in whatever stack you choose for the real site. Content and data should come from a CMS or a content folder, not be hard-coded as it is in the prototypes.

**Recommended stack (no codebase exists yet):** a static site generator with a lightweight CMS — e.g. Astro + Markdown/MDX content collections (or Eleventy), deployed to Netlify/Vercel/Cloudflare Pages, with Decap CMS or Keystatic so the artists can edit their own statements, add work photos, and post events without touching code. Image optimization (responsive `srcset`, lazy loading) matters: source photos are 2–5 MB phone shots.

## Fidelity
**High-fidelity.** Colors, type, spacing, and copy are final-intent. Recreate closely, but the real site should use proper responsive CSS (media queries / container queries) instead of the JS-measured column counts the prototypes use.

Note: `Haven Collective Wireframes.dc.html` is low-fidelity ideation and is included for context only.

## Site map
```
/                      Home
/artists               Artists index
/artists/<slug>        Artist page (6 pages)
/events                Events index (upcoming + past)
/events/<slug>         Event page (upcoming or past variant)
/about                 About (collective statement, contact)
```

## Content model
Define these as content types in the CMS.

**Artist**
- name, slug, medium (short string, e.g. "textiles & painting")
- bio: 1–3 paragraphs
- keyWork: image (used for index tiles and the artist page hero band)
- portrait: image (optional; prototypes crop a group photo as interim)
- work[]: { image, title, meta (medium, year), video?: URL }
- Optional: external links (left out for now — the collective has no Instagram yet)

**Event**
- title, slug, startDate, endDate, status (derived: upcoming if endDate ≥ today)
- venue, address, mapUrl
- reception: text (e.g. "Saturday, November 7 · 5–8pm")
- blurb: 1–3 paragraphs
- poster: image/PDF (optional); pressRelease: PDF (optional)
- hero: image (past shows)
- photos[]: { image, caption, emphasis: none | tall | wide }
- artists[]: references

**Site settings**: contact email (`amandafmrose@gmail.com`), location string ("Port Townsend, WA"), collective statement paragraphs.

**Seed data** is in `design/haven-data.js` (artists, bios, events, photo captions). Current facts: six artists — Amanda Rose, Sarah Aubin, Morgan Terry, Jaimie Baird, Courtney Astrea Stroming, Ali Luis Yates (statement pending). Past show: "Mothers Makers", Aug 22–23 2026, Baird Studio. Upcoming: "Haven Collective", opens Nov 7 2026, Black Cat Pilates.

## Design tokens
Colors
- Page background (linen): `#f3ede3`
- Paper / cards: `#faf6ee`
- Ink (text): `#2b2521`
- Muted ink: `#6f655c`
- Clay accent (links, badges, underlines): `#a9694b`
- Hairline: `#d9cfc0`
- Placeholder fill: `#e6ddcf` / stripe `#efe7da`
- Image caption on photos: `#faf6ee` with `text-shadow: 0 1px 8px rgba(0,0,0,.6)`

Typography (Google Fonts)
- Primary: **Karla** 400 / 500 / 700 / 800 (+ 400 italic)
- Labels & captions: **Courier Prime** 400 (typewriter / gallery-label feel)
- Wordmark: Karla 800, 19px, uppercase, `letter-spacing: .12em`
- Page title (h1): Karla 800, `clamp(40px, 6vw, 72px)`, line-height .95, `letter-spacing: -.02em`
- Section heading (h2): Karla 800, `clamp(22px, 2.6vw, 30px)`, `letter-spacing: -.01em`
- Statement / lead copy: Karla 500, `clamp(24px, 3.2vw, 38px)`, line-height 1.25
- Body: Karla 400, 16–20px, line-height 1.5–1.55; use `text-wrap: pretty`
- Label (eyebrow): Courier Prime 12px, uppercase, `letter-spacing: .08em`
- Meta (medium, dates): Courier Prime 12–13px, muted ink
- Nav links: Karla 500, 15px

Spacing & layout
- Horizontal page padding: `clamp(20px, 4vw, 56px)`
- Section vertical padding: `clamp(44px, 6vw, 72px)`; statement block `clamp(56px, 8vw, 104px)`
- Sections separated by 1px hairline `#d9cfc0`
- Gaps: grids `clamp(14px, 2vw, 24px)` (tight) to `clamp(16px, 2.5vw, 32px)`
- Radius: **0 everywhere** except circular portraits
- Shadows (cards on photos only): `0 18px 40px -20px rgba(43,37,33,.45)`
- Buttons: 1.5px solid ink border, 9–10px × 16–18px padding, Karla 700 14px; hover inverts (ink bg, paper text)
- Text links: Karla 700 with 1.5px clay underline (border-bottom, 2px padding-bottom); hover text → clay
- Image placeholders: 45° repeating stripes (#e6ddcf / #efe7da, 10–14px), centered Courier Prime label

## Screens

### Shared: header & footer
- Header: flex, space-between, 22px vertical padding, bottom hairline. Left: wordmark + "Port Townsend, WA" (Courier 12px muted) on the same baseline, gap 14px. Right: nav `Artists · Events · About`, gap 28px. Active page gets a 1.5px clay underline. Wraps to two rows on narrow screens.
- Footer: top hairline, 28px/36px padding, space-between. Left: small wordmark (13px) + "Six artists, connected by motherhood · Port Townsend, WA". Right: single "Contact" link → /about.

### Home (`design/Haven Collective Home.dc.html`)
1. **Hero** — full-bleed photo, height `clamp(440px, 66vh, 680px)`, overflow hidden. Default image: install shot of the ceramic on plinth (`media/install-plinth.jpg`, position `center 42%`). Bottom-left **show card** on paper (`#faf6ee`), padding 22/26/24, max-width `min(440px, 100% − 40px)`, shadow: eyebrow "● Upcoming show" (clay, Courier), h1 "Haven Collective" `clamp(32px, 4vw, 44px)` 800, "Opens November 7, 2026" 17px, venue line muted, button "Show details →" → event page. Top-right photo caption (Courier 12px, paper color with shadow).
   - **Motion (chosen: scroll parallax)** — the image layer is 18% taller than the hero and translates `translateY(scrollY × 0.35)`; use `transform` only, `will-change: transform`, update on rAF. Honor `prefers-reduced-motion` (no movement). Alternatives explored and tweakable in the prototype: still; slow drift (`scale 1→1.08, translate −1.5%/1.2%` over 28s alternate); crossfade of three images every 6s with 1.8s opacity ease. Card tilt (−1.2°) exists as an option but is **off** in the chosen direction.
2. **Statement** — centered, lead copy "We are artists who are also mothers. We are mothers who are also, *still*, artists. This is about refusing to choose." (`still` italic 400). Sub-line 16px muted, max-width 560. Link "Read the collective statement" → /about.
3. **The six artists** — h2 + "All artists →". Grid of 6 tiles, 4:5 images (`object-fit: cover`), name Karla 700 16px, medium Courier 12px muted. **Columns must divide 6: 6 ≥ ~760px, 3 ≥ ~400px, else 2** (never 4 or 5 — avoids an orphan). Placeholder tile for artists without a key work photo.
4. **Past shows** — h2 + "Archive →". Two-column (`minmax(min(100%,260px),1fr)`): left a 3-image mosaic (3fr/2fr columns, tall image spans 2 rows, rows `minmax(120px, 22vw)`, 10px gap), right a paper card: date (Courier eyebrow), title `clamp(26px,3vw,34px)` 800, venue muted, one-paragraph blurb, "See the show →". Mosaic spans both columns only at ≥6-column widths; otherwise stacks.
5. Footer.

### Artists index (`design/Haven Collective Artists.dc.html`)
- Title row: h1 "Artists" + right-aligned intro (17px muted, max 460px): "Six practices that look different from one another, returning again and again to the same terrain."
- Grid: 3 columns ≥760px, 2 ≥440px, else 1. Row gap `clamp(20px,3vw,40px)`, column gap `clamp(16px,2.5vw,32px)`. Each tile: 4:5 key work image; name (Karla 800 22px) with medium right-aligned on the same baseline (Courier 12px); one-sentence excerpt (first sentence of bio, 15px muted). Whole tile links to the artist page.

### Artist page (`design/Haven Collective Artist.dc.html`)
- **Hero band**: key work, wide crop, height `clamp(260px, 38vh, 440px)`; striped placeholder if missing.
- **Intro**: two columns `minmax(min(100%,300px),1fr)`, gap `clamp(28px,5vw,72px)`. Left: "← All artists" (Courier 12px), 64px circular portrait beside h1 name (`clamp(32px,4.5vw,52px)`, 800, line-height .98) and medium (Courier 13px, clay). Right: bio paragraphs, `clamp(17px,1.6vw,20px)`, line-height 1.55, max 620px.
- **Work**: h2; grid `auto-fill, minmax(min(100%,220px),1fr)`, 4:5 images; caption row: title (Karla 700 15px) left, meta (Courier 12px muted) right. Placeholders say "work photo" or "▶ video embed". Clicking a work should open a lightbox with the **uncropped** image + title/meta (not built in the prototype).
- **In shows**: h2; row of 120×80 thumbnail + show title (800 20px) + date · venue (Courier). Links to the event page.
- **Prev / next artist** links (Karla 700 15px), space-between, wrapping order through the six.
- Prototype routes via URL hash `#<slug>`; real site uses `/artists/<slug>`.

### Events index (`design/Haven Collective Events.dc.html`)
- h1 "Events".
- **Upcoming**: clay eyebrow "● Upcoming"; a paper card (padding `clamp(18px,2.5vw,28px)`, shadow) with poster slot (3:4, max 360px) left and details right: title `clamp(34px,4.5vw,56px)` 800, "Opens Saturday, November 7, 2026" `clamp(18px,2vw,22px)`, venue + reception muted 16px, one-paragraph blurb, button "Show details →". Whole card links.
- **Past**: hairline + muted eyebrow "Past"; each row = 3-image mosaic left, text right (date Courier, title `clamp(28px,3.5vw,40px)` 800, venue muted, "See the show →"). Reverse-chronological.

### Event page (`design/Haven Collective Event.dc.html`)
Two variants from one template.
- **Past** adds a full-bleed hero band at top (height `clamp(260px,42vh,480px)`) and an **"In the room"** gallery after the details.
- **Details** (both): two columns. Left: "← All events", status eyebrow (clay "● Upcoming show" or muted "● Past show · Aug 22–23, 2026"), h1 title `clamp(36px,5.5vw,64px)` 800, date line `clamp(18px,2vw,22px)`, then a hairline-topped two-column definition list (Courier labels "Venue", "Reception" at 12px muted; values 16px; venue line includes "Map" link in clay underline). Buttons: "Poster PDF", "Press release", plus "Add to calendar" (ICS) for upcoming. Right: poster slot (3:4, max 420px, 12px paper mat, shadow — upcoming only) and blurb paragraphs.
- **In the room** (past): h2; grid `auto-fill, minmax(min(100%,220px),1fr)`, rows `minmax(160px,20vw)`, `grid-auto-flow: dense`, 10px gap. Photos tagged *tall* span 2 rows, *wide* span 2 columns — **only when the container is ≥460px**; below that everything is 1×1. Each photo has a bottom gradient caption (Courier 12px, paper color) — on touch devices show always; on pointer devices showing on hover is acceptable.
- **Artists in this show**: h2; grid `auto-fill, minmax(min(100%,150px),1fr)`, square images, name 700 15px, medium Courier 12px.
- Footer nav link: "Next: <title> →" / "Previous: <title> →".

### About (`design/Haven Collective About.dc.html`)
- Full-bleed group photo band, height `clamp(300px,52vh,560px)`, position `center 42%`, bottom-right caption "Mothers Makers · Baird Studio · August 2026".
- Two columns: left h1 "About the collective" + Courier clay sub-line ("Six artists · connected by motherhood / Port Townsend, Washington"); right the three statement paragraphs at `clamp(18px,1.7vw,21px)`, final paragraph bold.
- **The artists**: h2 + "All artists →"; `auto-fill, minmax(min(100%,260px),1fr)` list of hairline-topped rows: name 700 17px left, medium Courier right. Each links to the artist page.
- **Contact**: Courier eyebrow "Contact", `mailto:amandafmrose@gmail.com` as a bold clay-underlined link, helper "Press, venues, and collaborations." No Instagram or newsletter — intentionally removed.

## Interactions & behavior
- Links: text → clay on hover; buttons invert on hover. No other hover effects on tiles (consider a subtle image `scale(1.02)` over 400ms if desired).
- Parallax hero as above; disable under `prefers-reduced-motion`.
- Events: compute upcoming/past from dates at build or request time; when nothing is upcoming, the Home hero card should fall back to the most recent past show with a "Latest show" eyebrow (not designed — simple variant).
- Work lightbox: uncropped image, title, meta, prev/next, Esc to close.
- Responsive: all grids use `minmax(min(100%, N), 1fr)` so nothing overflows at 320px; header wraps; see column-count rules per screen. Test at 390px — the prototype's `Haven Collective Mobile Preview.dc.html` frames every page at that width.
- Images: serve WebP/AVIF with `srcset`; hero ~1600px wide max; tiles ~800px. Use `object-fit: cover` + `object-position` to carry the crop values noted in `haven-data.js` (`pos`, and `size` for the interim quilt crops pulled from the wall shot).

## Assets (`design/media/`)
Web-sized (≤1400px) copies of the artists' photos; originals live in the GitHub repo `henryrose/haven-collective` under `context/`.
- `install-plinth.jpg` — Protea Pelvis on plinth, quilts behind (Home hero, Courtney key work)
- `install-quilt-wall.jpg` — Morgan Terry's satin portraits installed (Past-show hero, mosaic)
- `install-sarah-wall.jpg`, `install-hanging.jpg` — install shots
- `group-1.jpg`, `group-2.jpg` — the collective under the tent (About hero; interim portraits via crop)
- `spoons.jpg` — Amanda Rose key work; `quilt-detail.jpg` — Morgan Terry key work
- `sarah-hand.jpg`, `sarah-1.jpg`, `sarah-2.jpg` — Sarah Aubin photographs
Missing and needed from the artists: key work photos for Jaimie Baird and Ali Luis Yates; Ali's statement and medium; headshots; a poster for the Nov 7 show; Jaimie's video link.

## Files
- `design/Haven Collective Home.dc.html` — home (tweakable hero image/motion)
- `design/Haven Collective Artists.dc.html`, `design/Haven Collective Artist.dc.html`
- `design/Haven Collective Events.dc.html`, `design/Haven Collective Event.dc.html`
- `design/Haven Collective About.dc.html`
- `design/Haven Collective Mobile Preview.dc.html` — all pages framed at 390px
- `design/Haven Collective Wireframes.dc.html` — early lo-fi exploration (context only)
- `design/haven-data.js` — seed content (artists, bios, events, photo crops/captions)
- `design/support.js` — prototype runtime; ignore
- `design/media/` — images

Open any `.dc.html` directly in a browser to see the reference.
