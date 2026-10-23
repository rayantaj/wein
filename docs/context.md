# wein (وين؟)
A daily Saudi-city guessing game: one hidden city a day, six guesses, each giving km, direction and closeness. Arabic first, English second. A practice mode plays random cities without touching stats. Static site on GitHub Pages: https://rayantaj.github.io/wein/
Stage docs: docs/brief.md (what), docs/tech.md (how), docs/architecture.md (parts and screens).

## Stack
React 18, Vite, TypeScript, Chakra UI v3 (Provider in main.tsx), IBM Plex Sans Arabic via @fontsource, Vitest, ESLint flat config. Node 22 in CI. Target: 360 px phone width in iOS Safari and Android Chrome. Web, so no minimum OS.

## Where things live
- src/data/cities.ts: the city list, the only game content. Don't edit or regenerate.
- src/data/outline.ts: country outline as an SVG path, plus project(lat, lon) on a fixed box. Don't edit.
- src/game/geo.ts: distanceKm, bearing, arrow, closeness (pure, tested).
- src/game/daily.ts: riyadhDate, puzzleNumber (day 1 = 2026-10-23), cityOfDay (seeded shuffle), randomCity(excludeId?).
- src/game/guess.ts: evaluate(city, target) gives id, km, arrow, closeness; gameState gives playing, won or lost; squares(closeness); MAX_GUESSES = 6.
- src/game/search.ts: normalize(s) for Arabic spelling; findCities(query, limit) lists starts-with matches first, then contains.
- src/game/share.ts: shareText({ n, guesses, won, lang, url }): a title line, then one row of squares and an arrow per guess (🎯 on the hit), a blank line, then the url.
- src/game/stats.ts: Stats, emptyStats(), recordResult(); the streak continues only when lastWonN is n − 1.
- src/game/storage.ts: loadToday and saveToday under 'wein:today'; loadToday ignores a saved n that isn't today's. loadStats and saveStats under 'wein:stats'. isRecorded(). All in try/catch.
- src/game/*.test.ts: Vitest tests (geo, daily, guess, search, share, stats).
- src/i18n.ts: every shown string in ar and en, and t(lang, key, vars). Arabic is the default.
- src/main.tsx: mounts React and the Chakra Provider.
- src/App.tsx: the page. Holds mode ('daily' or 'practice'), target, guesses (restored from storage), stats and lang. On a guess it evaluates and re-renders; a daily guess is also saved, and practice saves nothing. Shows GuessInput while playing, Result when won or lost, and opens StatsDialog once today's game ends.
- src/ui/Header.tsx: the title, 'لغز رقم n', and the stats button.
- src/ui/Board.tsx: filled rows, then empty slots; from the third guess, the region hint line.
- src/ui/GuessInput.tsx: the text box and up to 6 city options (arrow keys, Enter, tap); hides cities already guessed.
- src/ui/GuessRow.tsx: a filled row: name, km, arrow, percent and five squares.
- src/ui/Result.tsx: the win or lose message, with the hidden city's region when lost. Daily only: Share (navigator.clipboard, textarea fallback), a role=status line 'تم النسخ', and a countdown to the next Riyadh midnight that ticks each minute. تدريب starts practice; in practice it shows مرة ثانية and رجوع للغز اليوم.
- src/ui/StatsDialog.tsx: Chakra Dialog with played, win %, current and best streak, and six bars for guesses 1–6.
- src/index.css: global styles.
- index.html: lang ar, dir rtl, title, phone viewport, theme-color.
- vite.config.ts: base '/wein/' (the Pages path).
- .github/workflows/pages.yml: on push to main, build and deploy dist/ to GitHub Pages.
- README.md: one paragraph and the link.
- docs/: stage documents (brief, tech, architecture). Tasks don't edit them.
- specs/: one folder per built Feature (requirements, design, tasks).
  - specs/T-33-set-up-the-app-the-daily-city-and-the-em/: Feature 1, app setup, daily city, empty board.
  - specs/T-34-guess-a-city-distance-direction-closenes/: Feature 2, the guessing game.
  - specs/T-35-share-the-result-stats-and-streaks-count/: Feature 3, share, stats and streaks, countdown, practice mode.

## Checks
npm ci && npm run lint && npm run build && npm test. build is tsc -b && vite build.

## Rules
- Game logic is pure functions in src/game/ with Vitest tests. Components only render and call them.
- Every string a person sees goes through src/i18n.ts. City names live only in src/data/cities.ts.
- Puzzle day is the Riyadh date via Intl (Asia/Riyadh), never the device's zone. The countdown's next midnight is fixed at +03:00.
- No runtime network calls: the page is complete in dist/.
- Page direction follows the language: dir='rtl' lang='ar' on the root.
- Practice rounds write no storage and no stats.
- Risky paths: src/data/**, src/game/daily.ts, .github/**, package.json, package-lock.json, vite.config.ts. Changing the city list or the seed changes every future puzzle.

## Known debt
- README.md has no link to the Pages URL yet (review nit, T-33).
- src/ui/Board.tsx: the list has no accessible name (review nit, T-33). Name it from i18n.
- src/ui/GuessInput.tsx: options have no ids and the input has no aria-activedescendant, so screen readers don't hear the option the arrow keys pick (review nit, T-34).
- src/App.tsx: guesses don't reset if the tab stays open past midnight in Riyadh (review nit, T-34).
- src/game/storage.ts: isRecorded() is unused; remove it, or check it before recordResult so two open tabs can't record twice (review nit, T-35).
- src/ui/Result.tsx: copy() shows 'تم النسخ' even if the copy fails; show it only when the copy worked (review nit, T-35).
- src/App.tsx: 'مرة ثانية' can pick the same practice city again; exclude the current practice city too (review nit, T-35).
