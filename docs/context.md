# wein (وين؟)
A daily Saudi-city guessing game: one hidden city a day, six guesses, each giving km, direction and closeness. Arabic first, English second. Static site on GitHub Pages: https://rayantaj.github.io/wein/
Stage docs: docs/brief.md (what), docs/tech.md (how), docs/architecture.md (parts and screens).

## Stack
React 18, Vite, TypeScript, Chakra UI v3 (Provider in main.tsx), IBM Plex Sans Arabic via @fontsource, Vitest, ESLint flat config. Node 22 in CI. Target: 360 px phone width in iOS Safari and Android Chrome. Web, so no minimum OS.

## Where things live
- src/data/cities.ts: the city list, the only game content. Don't edit or regenerate.
- src/data/outline.ts: country outline as an SVG path, plus project(lat, lon) on a fixed box. Don't edit.
- src/game/geo.ts: distanceKm, bearing, arrow, closeness (pure, tested).
- src/game/daily.ts: riyadhDate, puzzleNumber (day 1 = 2026-10-23), cityOfDay (seeded shuffle), randomCity.
- src/game/geo.test.ts, src/game/daily.test.ts: Vitest tests.
- src/i18n.ts: every shown string in ar and en, and t(lang, key, vars). Arabic is the default.
- src/main.tsx: mounts React and the Chakra Provider.
- src/App.tsx: the page; renders Header and Board.
- src/ui/Header.tsx: the title and 'لغز رقم n'.
- src/ui/Board.tsx: six empty slots; no input yet.
- src/index.css: global styles.
- index.html: lang ar, dir rtl, title, phone viewport, theme-color.
- vite.config.ts: base '/wein/' (the Pages path).
- .github/workflows/pages.yml: on push to main, build and deploy dist/ to GitHub Pages.
- README.md: one paragraph and the link.
- docs/: stage documents (brief, tech, architecture). Tasks don't edit them.
- specs/: one folder per built Feature (requirements, design, tasks).
  - specs/T-33-set-up-the-app-the-daily-city-and-the-em/: Feature 1, app setup, daily city, empty board.

## Checks
npm ci && npm run lint && npm run build && npm test. build is tsc -b && vite build.

## Rules
- Game logic is pure functions in src/game/ with Vitest tests. Components only render and call them.
- Every string a person sees goes through src/i18n.ts. City names live only in src/data/cities.ts.
- Puzzle day is the Riyadh date via Intl (Asia/Riyadh), never the device's zone.
- No runtime network calls: the page is complete in dist/.
- Page direction follows the language: dir='rtl' lang='ar' on the root.
- Risky paths: src/data/**, src/game/daily.ts, .github/**, package.json, package-lock.json, vite.config.ts. Changing the city list or the seed changes every future puzzle.

## Known debt
- README.md has no link to the Pages URL yet (review nit, T-33).
- src/ui/Board.tsx: the list has no accessible name (review nit, T-33). Name it from i18n.
