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
- src/game/guess.ts: evaluate(city, target) gives id, km, arrow, closeness; gameState gives playing, won or lost; squares(closeness); MAX_GUESSES = 6.
- src/game/search.ts: normalize(s) for Arabic spelling; findCities(query, limit) lists starts-with matches first, then contains.
- src/game/storage.ts: loadToday and saveToday under 'wein:today'; loadToday ignores a saved n that isn't today's. Both in try/catch.
- src/game/*.test.ts: Vitest tests (geo, daily, guess, search).
- src/i18n.ts: every shown string in ar and en, and t(lang, key, vars). Arabic is the default.
- src/main.tsx: mounts React and the Chakra Provider.
- src/App.tsx: the page. Holds target, guesses (restored from storage) and lang; on a guess it evaluates, saves and re-renders. Shows GuessInput while playing, Result when won or lost.
- src/ui/Header.tsx: the title and 'لغز رقم n'.
- src/ui/Board.tsx: filled rows, then empty slots; from the third guess, the region hint line.
- src/ui/GuessInput.tsx: the text box and up to 6 city options (arrow keys, Enter, tap); hides cities already guessed.
- src/ui/GuessRow.tsx: a filled row: name, km, arrow, percent and five squares.
- src/ui/Result.tsx: the win or lose message, with the hidden city's region when lost. Leaves a slot for Share.
- src/index.css: global styles.
- index.html: lang ar, dir rtl, title, phone viewport, theme-color.
- vite.config.ts: base '/wein/' (the Pages path).
- .github/workflows/pages.yml: on push to main, build and deploy dist/ to GitHub Pages.
- README.md: one paragraph and the link.
- docs/: stage documents (brief, tech, architecture). Tasks don't edit them.
- specs/: one folder per built Feature (requirements, design, tasks).
  - specs/T-33-set-up-the-app-the-daily-city-and-the-em/: Feature 1, app setup, daily city, empty board.
  - specs/T-34-guess-a-city-distance-direction-closenes/: Feature 2, the guessing game.

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
- src/ui/GuessInput.tsx: options have no ids and the input has no aria-activedescendant, so screen readers don't hear the option the arrow keys pick (review nit, T-34).
- src/App.tsx: guesses don't reset if the tab stays open past midnight in Riyadh (review nit, T-34).
