# Share the result, stats and streaks, countdown, practice mode: tasks

T-35 · in progress.

- [ ] src/game/share.ts: shareText({ n, guesses, won, lang, url }) → e.g. 'وين؟ #12 4/6' (or 'X/6' on a loss), one line per guess of the five squares followed by the arrow (🎯 on the hit), a blank line, then the url. Tests for a win, a loss, and English ('Wein? #12 4/6').
- [ ] src/game/stats.ts: Stats = { played, won, streak, best, dist: number[6], lastWonN?: number }; emptyStats(); recordResult(stats, { n, won, guessCount }): streak continues only when lastWonN === n − 1. Tests.
- [ ] src/game/storage.ts: loadStats() / saveStats(), 'wein:stats'; record a result once per puzzle (store n in today's record as 'recorded').
- [ ] src/ui/Result.tsx: the Share button copies shareText with navigator.clipboard (fallback: select a hidden textarea) and shows a toast 'تم النسخ'; a countdown 'اللغز القادم بعد 7س 12د' that ticks each minute, to the next Riyadh midnight; a 'تدريب' (practice) button.
- [ ] src/ui/StatsDialog.tsx: a Chakra Dialog opened from a header button: played, win %, current streak, best streak, and six horizontal bars labelled 1–6 with the count; opens on its own after today's game ends.
- [ ] Practice mode in App.tsx: mode 'daily' | 'practice'; practice picks randomCity(excluding today's) and plays the same board with no storage and no stats; its Result offers 'مرة ثانية' (another) and 'رجوع للغز اليوم' (back to today's).
- [ ] i18n.ts: the new strings in ar and en.

## Parts of the work
- Share text, stats and streaks, countdown, practice mode (web-developer)
