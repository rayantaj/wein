export type Lang = 'ar' | 'en'

const strings = {
  ar: {
    title: 'وين؟',
    puzzle: 'لغز رقم {n}',
    guessesLeft: 'باقي {n} محاولات',
    placeholder: 'اكتب اسم مدينة',
    km: '{n} كم',
    hint: 'تلميح: {region}',
    won: 'أحسنت! عرفتها من {n}',
    lost: 'للأسف. المدينة كانت {city}',
    share: 'مشاركة',
    copied: 'تم النسخ',
    next: 'اللغز القادم بعد {h}س {m}د',
    practice: 'تدريب',
    another: 'مرة ثانية',
    backToToday: 'رجوع للغز اليوم',
    stats: 'الإحصائيات',
    played: 'لعبت',
    winPct: 'نسبة الفوز ٪',
    streak: 'السلسلة الحالية',
    best: 'أفضل سلسلة',
    close: 'إغلاق',
  },
  en: {
    title: 'Wein?',
    puzzle: 'Puzzle {n}',
    guessesLeft: '{n} guesses left',
    placeholder: 'Type a city name',
    km: '{n} km',
    hint: 'Hint: {region}',
    won: 'Well done! Got it in {n}',
    lost: 'Too bad. The city was {city}',
    share: 'Share',
    copied: 'Copied',
    next: 'Next puzzle in {h}h {m}m',
    practice: 'Practice',
    another: 'Another',
    backToToday: "Back to today's puzzle",
    stats: 'Stats',
    played: 'Played',
    winPct: 'Win %',
    streak: 'Current streak',
    best: 'Best streak',
    close: 'Close',
  },
}

export type Key = keyof typeof strings.ar

export const t = (lang: Lang, key: Key, vars: Record<string, string | number> = {}): string =>
  strings[lang][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
