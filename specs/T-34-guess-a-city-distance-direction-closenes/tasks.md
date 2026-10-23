# Guess a city: distance, direction, closeness, win or lose: tasks

Built as T-34: https://github.com/rayantaj/wein/pull/2.

- [x] src/game/guess.ts: evaluate(city, target) → { id, km, arrow, closeness } using geo.ts; gameState(guesses, targetId) → 'playing' | 'won' | 'lost' (won when a guess id equals the target, lost after 6 without a hit); squares(closeness) → 5 characters: 🟩 per full 20 %, one 🟨 for a partial 10 % or more, ⬜ for the rest. Tests.
- [x] src/game/search.ts: normalize(s) (lowercase; strip Arabic diacritics and tatweel; أ إ آ → ا; ة → ه; ى → ي; trim) and findCities(query, limit = 6): cities whose normalized ar or en starts with the normalized query first, then contains it. Tests with 'جد' → جدة, 'kho' → Khobar, 'الاحسا' → الأحساء-style spellings.
- [x] src/game/storage.ts: loadToday() / saveToday({ n, guessIds }) under 'wein:today' (ignored when n isn't today's), each in try/catch.
- [x] src/ui/GuessInput.tsx: a text box (autoFocus off on phones), a list of up to 6 matching cities under it (Arabic name, English name small and muted), arrow keys and Enter pick, tap picks; a city already guessed isn't offered. Submitting adds the guess.
- [x] src/ui/GuessRow.tsx: a filled row: the city's name, 'n كم', the arrow, 'n٪' and the five squares; Board.tsx renders filled rows then empty slots. From the third guess on, Board shows the hint line 'تلميح: المنطقة n' with the target's region.
- [x] src/App.tsx: holds target (cityOfDay(puzzleNumber())), guesses (restored from storage when the saved n matches), lang (ar for now). On a guess: evaluate, save, re-render. When the state is won or lost, hide the input and show src/ui/Result.tsx: 'أحسنت! عرفتها من n' or 'للأسف. المدينة كانت X' with the region; a Share button is not in this Feature (Result leaves a slot for it).
- [x] i18n.ts: add the strings this Feature shows, ar and en.

## Parts of the work
- Guessing: input, rows, win and loss, hint, persistence (web-developer)
