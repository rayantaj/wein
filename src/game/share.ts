import { squares, type Guess } from './guess'
import type { Lang } from '../i18n'

export function shareText({ n, guesses, won, lang, url }: { n: number; guesses: Guess[]; won: boolean; lang: Lang; url: string }): string {
  const title = lang === 'ar' ? 'وين؟' : 'Wein?'
  const head = `${title} #${n} ${won ? guesses.length : 'X'}/6`
  const rows = guesses.map((g) => `${squares(g.closeness)} ${g.arrow}`)
  return [head, ...rows, '', url].join('\n')
}
