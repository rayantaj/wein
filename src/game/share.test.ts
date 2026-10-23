import { describe, expect, it } from 'vitest'
import { shareText } from './share'

const g = (closeness: number, arrow: string, km = 100) => ({ id: 'x', km, arrow, closeness })
const url = 'https://rayantaj.github.io/wein/'

describe('shareText', () => {
  const win = [g(5, '↗'), g(50, '←'), g(100, '🎯', 0)]
  it('win in Arabic', () => {
    expect(shareText({ n: 12, guesses: win, won: true, lang: 'ar', url })).toBe(
      `وين؟ #12 3/6\n⬜⬜⬜⬜⬜ ↗\n🟩🟩🟨⬜⬜ ←\n🟩🟩🟩🟩🟩 🎯\n\n${url}`,
    )
  })
  it('loss shows X/6', () => {
    const lines = shareText({ n: 12, guesses: Array(6).fill(g(0, '↑')), won: false, lang: 'ar', url }).split('\n')
    expect(lines[0]).toBe('وين؟ #12 X/6')
    expect(lines).toHaveLength(1 + 6 + 2)
  })
  it('English', () => {
    expect(shareText({ n: 12, guesses: win, won: true, lang: 'en', url }).split('\n')[0]).toBe('Wein? #12 3/6')
  })
})
