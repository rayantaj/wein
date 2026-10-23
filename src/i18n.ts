export type Lang = 'ar' | 'en'

const strings = {
  ar: { title: 'وين؟', puzzle: 'لغز رقم {n}', guessesLeft: 'باقي {n} محاولات' },
  en: { title: 'Wein?', puzzle: 'Puzzle {n}', guessesLeft: '{n} guesses left' },
}

export type Key = keyof typeof strings.ar

export const t = (lang: Lang, key: Key, vars: Record<string, string | number> = {}): string =>
  strings[lang][key].replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))
