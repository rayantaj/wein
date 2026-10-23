# Guess a city: distance, direction, closeness, win or lose: design

## Files

New: `src/game/guess.ts`, `src/game/guess.test.ts`, `src/game/search.ts`, `src/game/search.test.ts`, `src/game/storage.ts`, `src/ui/GuessInput.tsx`, `src/ui/GuessRow.tsx`, `src/ui/Result.tsx`. Changed: `src/App.tsx`, `src/ui/Board.tsx`, `src/i18n.ts`.

## Types

`Guess = { id: string; km: number; arrow: string; closeness: number }` (the city is looked up by id from `cities`).

## Row layout

One line, 52 px: name (bold, grows), then km, arrow, closeness, then the five squares in a monospace run. Correct guess: green background, 🎯 as the arrow, 100 %, five 🟩.

## Flow

`App`: `const n = puzzleNumber(); const target = cityOfDay(n);` `useState<Guess[]>(() => restored)`; `onGuess(city)`. `GuessInput` is rendered only while `gameState === 'playing'`; otherwise `Result`.

## Storage key

`wein:today` = `{ n: number, guessIds: string[] }`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/game/guess.ts`
- `src/game/guess.test.ts`
- `src/game/search.ts`
- `src/game/search.test.ts`
- `src/game/storage.ts`
- `src/ui/GuessInput.tsx`
- `src/ui/GuessRow.tsx`
- `src/ui/Result.tsx`
