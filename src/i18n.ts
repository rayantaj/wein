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
  },
}

export type Key = keyof typeof strings.ar

export const t = (lang: Lang, key: Key, vars: Record<string, string | number> = {}): string =>
  strings[lang][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
