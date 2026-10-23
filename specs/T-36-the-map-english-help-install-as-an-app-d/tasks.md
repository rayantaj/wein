# The map, English, help, install as an app, dark mode: tasks

Built as T-36: https://github.com/rayantaj/wein/pull/4.

- [x] src/ui/MapView.tsx: an inline SVG (viewBox from src/data/outline.ts) with the country path (paper fill, ink stroke 1.5) and one dot per guess at project(lat, lon), radius 9, coloured by closeness (grey under 40, amber under 80, green at 80 and above), with a thin ink stroke; when the game is over, the hidden city as a larger green dot with a white ring. Shown under the board, full width, with a muted caption 'خريطة التخمينات'.
- [x] Language: src/game/storage.ts loadLang()/saveLang() under 'wein:lang'; Header gets a button 'EN' / 'ع' that toggles; App sets document.documentElement.lang and dir, and passes lang everywhere; city names, the region hint, 'كم'/'km', the result, the stats and the share text all follow it. Chakra's direction follows dir.
- [x] src/ui/HelpDialog.tsx: a '?' button in the header opens three short lines on how to play and one example row (a sample guess with km, arrow, closeness and squares); opens on its own the first time the page is visited (flag in 'wein:seen').
- [x] PWA: public/manifest.webmanifest (name 'وين؟', short_name 'وين؟', start_url '/wein/', display standalone, theme and background colours, icons 192 and 512 from public/icon.svg rendered to PNG at build time is NOT needed: ship the SVG icon plus one 512 PNG made by hand in the repo), <link rel=manifest> and apple-touch-icon in index.html, and a minimal service worker (public/sw.js) that caches the built files on install and serves cache-first, registered from main.tsx in production only.
- [x] Dark mode: Chakra colour mode follows the system; check the board, rows, map and dialogs read well in dark.
- [x] i18n.ts: every remaining string in ar and en; README.md: how to play, in both languages, and the link.

## Parts of the work
- Map, English, help, PWA, dark mode (web-developer)
