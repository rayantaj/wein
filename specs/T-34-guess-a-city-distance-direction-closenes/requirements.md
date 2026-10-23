# Guess a city: distance, direction, closeness, win or lose: requirements

T-34 · Feature · the plan Ray approved

## Goal
Guess a city: distance, direction, closeness, win or lose

The game itself: pick a city from a list, see how far and which way, win on a hit or lose after six, a region hint from the third guess, and today's game survives a reload.

## Done when
Each one is something Ray sees in the app; QA proves it with a screenshot.
1. Typing جد in the box lists جدة; picking it fills the first row with جدة, a distance in كم, a direction arrow and a closeness percentage with five squares.
2. Guessing today's city shows 🎯, a full green row, and the message أحسنت with the number of guesses; the input is gone.
3. After six wrong guesses the message says للأسف and names the hidden city with its region.
4. On the third guess a hint line appears under the rows with the hidden city's region.
5. Reloading the page keeps today's guesses in place.

## Out of scope
- src/data/*: the content.
- src/game/daily.ts and geo.ts: use them; change them only if a test proves a bug.
- .github/workflows/pages.yml.
