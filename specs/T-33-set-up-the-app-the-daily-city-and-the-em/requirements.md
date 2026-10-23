# Set up the app, the daily city and the empty board: requirements

T-33 · Feature · the plan Ray approved

## Goal
Set up the app, the daily city and the empty board

The first Feature: the app builds and tests run, the geometry and the daily pick are done, the page shows today's puzzle number and six empty slots, and every merge deploys to GitHub Pages.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. The page shows the title وين؟ and the line لغز رقم 1 (today's number) at the top, laid out right-to-left in an Arabic font.
2. Under the title there are six empty guess slots, one under the other, drawn as faint rounded rows.
3. At 360 px wide the page has no horizontal scroll and the six slots fill the width.

## Out of scope
- src/data/cities.ts and src/data/outline.ts: the content, already in the repo; don't edit or regenerate them.
- docs/: the stage documents.
