# Share the result, stats and streaks, countdown, practice mode: requirements

T-35 · Feature · the plan Ray approved

## Goal
Share the result, stats and streaks, countdown, practice mode

After the game: a share text with the square grid, stats and streaks kept on the phone, a countdown to the next puzzle, and practice rounds with random cities.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. After the game ends, tapping مشاركة shows the toast تم النسخ and the copied text starts with وين؟ #n and has one row of squares and an arrow per guess.
2. The stats dialog shows played, win percentage, the current and best streak, and six bars; after one win in 3 guesses the bar for 3 shows 1.
3. The result card shows a countdown to the next puzzle in hours and minutes.
4. تدريب starts a new round with a different hidden city on an empty board, and finishing it does not change the stats.

## Out of scope
- src/data/*, src/game/daily.ts, src/game/geo.ts, src/game/guess.ts, src/game/search.ts: use them as they are.
- .github/workflows/pages.yml.
