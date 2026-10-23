# The map, English, help, install as an app, dark mode: requirements

T-36 · Feature · the plan Ray approved

## Goal
The map, English, help, install as an app, dark mode

Polish: the outline map with the guesses as dots, an English switch with LTR, a help dialog, a manifest and service worker so it installs and works offline, and dark mode.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. Under the board a map of Saudi Arabia shows one dot per guess, placed where that city is, coloured grey, amber or green by closeness; when the game is over the hidden city is marked.
2. Tapping EN switches the whole page to English and left-to-right: title Wein?, city names in English, km, and the result and stats in English; a reload keeps English.
3. The ? button opens a help dialog with how to play and an example row.
4. The page has a web app manifest named وين؟ with an icon, and after a first visit it still loads with the network off.
5. With the system in dark mode the page shows a dark background and readable rows and map.

## Out of scope
- src/data/cities.ts: the content.
- src/game/*.ts logic other than storage.ts: use as is.
- .github/workflows/pages.yml.
