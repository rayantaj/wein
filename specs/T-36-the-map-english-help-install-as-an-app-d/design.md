# The map, English, help, install as an app, dark mode: design

## Files

New: `src/ui/MapView.tsx`, `src/ui/HelpDialog.tsx`, `public/manifest.webmanifest`, `public/icon.svg`, `public/icon-512.png`, `public/sw.js`. Changed: `src/App.tsx`, `src/ui/Header.tsx`, `src/ui/GuessRow.tsx`, `src/ui/Result.tsx`, `src/ui/StatsDialog.tsx`, `src/game/storage.ts`, `src/game/share.ts` (url and English title), `src/i18n.ts`, `src/main.tsx` (register sw in production), `index.html`, `README.md`.

## Map

`outline.ts` gives `OUTLINE_PATH`, `VIEW_BOX = '0 0 1000 816'` and `project(lat, lon) → { x, y }`. Dots: `<circle r=9>`; the answer: `<circle r=12>` green with `stroke=white strokeWidth=3`.

## Language

`Lang = 'ar' | 'en'`; `t(lang, key, vars)`. City display name: `lang === 'ar' ? city.ar : city.en`. `document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'`.

## Service worker

On `install`: cache `['/wein/', '/wein/index.html', '/wein/manifest.webmanifest']` plus the built asset URLs read from `self.__WB_MANIFEST`-style list is not available without a plugin, so: cache on `fetch` instead (network first, then put in cache; fall back to cache when offline). Scope `/wein/`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/ui/MapView.tsx`
- `src/ui/HelpDialog.tsx`
- `public/sw.js`
