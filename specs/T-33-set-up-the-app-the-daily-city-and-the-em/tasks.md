# Set up the app, the daily city and the empty board: tasks

Built as T-33.

- [x] Scaffold the app: Vite + React 18 + TypeScript, Chakra UI v3 (Provider in main.tsx), @fontsource/ibm-plex-sans-arabic, ESLint (Vite's flat config), Vitest. package.json scripts: dev, build (tsc -b && vite build), lint (eslint .), test (vitest run), preview. vite.config.ts with base '/wein/'. Keep the existing src/data/cities.ts and src/data/outline.ts as they are.
- [x] src/game/geo.ts: distanceKm (haversine, rounded), bearing (initial bearing in degrees), arrow (8 arrows: ↑ ↗ → ↘ ↓ ↙ ← ↖, and 🎯 for 0 km), closeness (100 × (1 − km / 2000), floored at 0, rounded). Tests with known pairs (Riyadh–Jeddah is about 845 km and points west).
- [x] src/game/daily.ts: riyadhDate(now) → 'YYYY-MM-DD' in Asia/Riyadh via Intl; puzzleNumber(now) = days since 2026-10-23 + 1; cityOfDay(n) = shuffled[(n − 1) % cities.length] where shuffled is the city list permuted once by a Fisher–Yates with a mulberry32 PRNG seeded 20261023; randomCity(excludeId). Tests: the number is stable across a day and changes at Riyadh midnight; cityOfDay is deterministic; two consecutive days differ.
- [x] src/i18n.ts: the strings for this Feature in ar and en ({ title: 'وين؟', puzzle: 'لغز رقم {n}', guessesLeft: ... }) and t(lang, key, vars). Arabic is the default; the English strings are there for the next Features.
- [x] src/App.tsx + src/ui/Header.tsx + src/ui/Board.tsx: the page at phone width (max 480 px, centred), dir='rtl' lang='ar' on <html>, the header with the title and 'لغز رقم n', the board with six empty rows drawn as faint slots. No input yet.
- [x] .github/workflows/pages.yml: on push to main, actions/checkout@v4, actions/setup-node@v4 (node 22, cache npm), npm ci, npm run build, actions/configure-pages@v5, actions/upload-pages-artifact@v3 (path dist), actions/deploy-pages@v4; permissions contents: read, pages: write, id-token: write; concurrency group 'pages'.
- [x] index.html: lang='ar' dir='rtl', <title>وين؟</title>, viewport for phones, theme-color. README.md: one paragraph and the link.

## Parts of the work
- Scaffold, geometry, the daily pick, the empty board, the Pages workflow (web-developer)
