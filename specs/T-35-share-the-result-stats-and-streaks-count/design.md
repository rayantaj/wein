# Share the result, stats and streaks, countdown, practice mode: design

## Files

New: `src/game/share.ts`, `src/game/share.test.ts`, `src/game/stats.ts`, `src/game/stats.test.ts`, `src/ui/StatsDialog.tsx`. Changed: `src/game/storage.ts`, `src/ui/Result.tsx`, `src/ui/Header.tsx` (stats button), `src/App.tsx`, `src/i18n.ts`.

## Share text

```
وين؟ #12 4/6
⬜⬜⬜⬜⬜ ↗
🟩🟩⬜⬜⬜ ←
🟩🟩🟩🟨⬜ ↖
🟩🟩🟩🟩🟩 🎯

https://rayantaj.github.io/wein/
```

## Stats

`wein:stats` = `{ played, won, streak, best, dist: [0,0,0,0,0,0], lastWonN }`. Today's record gains `recorded: true` once the result is in the stats, so a reload doesn't count it twice.

## Countdown

Next midnight in Asia/Riyadh: compute from `riyadhDate` + 1 day; show `h` and `m`; `setInterval` 60 s.

## Practice

`mode` in App state. Practice target: `randomCity(todayId)`; a new target on 'another'. No `saveToday`, no `recordResult`.

## Not in the code yet
Named above but not there when the plan was approved: new files, or check them.
- `src/game/share.ts`
- `src/game/share.test.ts`
- `src/game/stats.ts`
- `src/game/stats.test.ts`
- `src/ui/StatsDialog.tsx`
