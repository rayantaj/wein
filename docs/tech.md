# وين؟: the technical choices

Decided 23 Oct 2026, at the Tech stage.

## Platform

A static web app, hosted on GitHub Pages at `https://rayantaj.github.io/wein/` (so Vite's `base` is `/wein/`). Phones first: it must work on an iPhone's Safari and Android's Chrome at 360 px wide, and still look fine on a laptop. Installable as a PWA (a manifest and a small service worker), so it opens from the home screen and works offline after the first visit.

## Stack

- **React 18 + Vite + TypeScript**, like Ray's other web projects.
- **Chakra UI v3** for layout and components, with RTL set from the language.
- **Vitest** for the game logic (distance, direction, the daily pick, the share text, stats).
- **Fonts:** `@fontsource/ibm-plex-sans-arabic` (self-hosted through npm, so no runtime call to Google), falling back to the system Arabic fonts.
- No other dependencies unless a Feature can't ship without one. In particular no map library: the map is an inline SVG of the country's outline (Natural Earth, public domain) with dots plotted on a fixed bounding box.

## Data

- **Cities:** `src/data/cities.ts`, about a hundred entries: `{ id, en, ar, region: { en, ar }, lat, lon, pop }`. Gathered from Wikipedia with a source per city. The list is the whole game, so every change to it is a risky path.
- **The daily city:** a deterministic pick from the date in Riyadh time (`Asia/Riyadh`): puzzle number `n` = days since the launch date; the city is `shuffled[n % cities.length]`, where `shuffled` is a fixed permutation seeded once (so the order can't be guessed from the list order). No server, so anyone who reads the code can find the answer; that's fine for a game like this.
- **Storage:** `localStorage`, two keys: `wein:today` (the puzzle number and the guesses so far) and `wein:stats`. Language in `wein:lang`.

## Geometry

- Distance: the haversine formula, in km, rounded.
- Direction: the initial bearing from the guess to the hidden city, snapped to 8 arrows (↑ ↗ → ↘ ↓ ↙ ← ↖). A correct guess shows 🎯.
- Closeness: `100 × (1 − distance / 2000)`, floored at 0 (2,000 km is about the longest distance inside the country). The share grid uses 5 squares: each 🟩 is 20 %, a 🟨 is a partial 20 %, the rest ⬜.

## Checks the runner runs

`npm ci`, `npm run lint`, `npm run build`, `npm test`.

## Risky paths

`src/data/**`, `src/game/daily.ts`, `.github/**`, `package.json`, `package-lock.json`, `vite.config.ts`.

## Deploy

A GitHub Actions workflow, `.github/workflows/pages.yml`: on every push to `main`, `npm ci && npm run build`, then upload `dist/` and deploy to Pages. Pages is already set to "GitHub Actions" on the repo. Nothing in the repo is secret.

## RTL

The page direction follows the language: `dir="rtl"` and `lang="ar"` on the root for Arabic, `ltr`/`en` for English. Numbers stay Western digits (٠١٢ are not used), distances are "km" in English and "كم" in Arabic. Arrows point by compass, so they are the same in both directions of text.
