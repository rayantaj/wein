# Set up the app, the daily city and the empty board: design

## Files

New: `package.json`, `package-lock.json`, `vite.config.ts` (base `/wein/`), `tsconfig.json`, `tsconfig.app.json`, `tsconfig.node.json`, `eslint.config.js`, `index.html`, `src/main.tsx`, `src/App.tsx`, `src/i18n.ts`, `src/game/geo.ts`, `src/game/geo.test.ts`, `src/game/daily.ts`, `src/game/daily.test.ts`, `src/ui/Header.tsx`, `src/ui/Board.tsx`, `.github/workflows/pages.yml`, `README.md`.

Already there (read, don't change): `src/data/cities.ts` exports `cities: City[]` with `{ id, en, ar, region: { en, ar }, lat, lon, pop }`; `src/data/outline.ts` exports the SVG path and `project(lat, lon)`.

## Logic

`geo.ts`: `distanceKm(a: LatLon, b: LatLon): number`, `bearing(a, b): number` (0–360, 0 = north), `arrow(bearingDeg: number): string`, `closeness(km: number): number`.

`daily.ts`: `LAUNCH = '2026-10-23'`, `riyadhDate(now = new Date()): string`, `puzzleNumber(now?)`, `cityOfDay(n): City`, `randomCity(excludeId?): City`. The shuffle uses mulberry32(20261023) and Fisher–Yates over a copy of `cities`, computed once at module load.

## Screen

One column, `maxW=480px`, 16 px side padding. `Header`: title (28 px, bold) and the puzzle line (14 px, muted). `Board`: six rows, each `h=52px`, `rounded=10px`, a faint border, 8 px apart. Chakra's `Provider` wraps the app; the Arabic font is applied on `body`.

## Deploy

`.github/workflows/pages.yml` as the plan says. The build output is `dist/`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `package.json`
- `package-lock.json`
- `vite.config.ts`
- `tsconfig.json`
- `tsconfig.app.json`
- `tsconfig.node.json`
- `eslint.config.js`
- `index.html`
- `src/main.tsx`
- `src/App.tsx`
- `src/i18n.ts`
- `src/game/geo.ts`
- `src/game/geo.test.ts`
- `src/game/daily.ts`
- `src/game/daily.test.ts`
- `src/ui/Header.tsx`
- `src/ui/Board.tsx`
- `.github/workflows/pages.yml`
- `geo.ts`
- `daily.ts`
- `dist/`
