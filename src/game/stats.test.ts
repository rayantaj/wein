import { describe, expect, it } from 'vitest'
import { emptyStats, recordResult } from './stats'

describe('recordResult', () => {
  it('first win', () => {
    expect(recordResult(emptyStats(), { n: 1, won: true, guessCount: 3 })).toEqual({
      played: 1, won: 1, streak: 1, best: 1, dist: [0, 0, 1, 0, 0, 0], lastWonN: 1,
    })
  })
  it('streak continues only on consecutive days', () => {
    let s = recordResult(emptyStats(), { n: 1, won: true, guessCount: 2 })
    s = recordResult(s, { n: 2, won: true, guessCount: 2 })
    expect(s.streak).toBe(2)
    s = recordResult(s, { n: 4, won: true, guessCount: 2 })
    expect(s.streak).toBe(1)
    expect(s.best).toBe(2)
  })
  it('a loss resets the streak and counts as played', () => {
    let s = recordResult(emptyStats(), { n: 1, won: true, guessCount: 1 })
    s = recordResult(s, { n: 2, won: false, guessCount: 6 })
    expect(s).toMatchObject({ played: 2, won: 1, streak: 0, best: 1 })
  })
})
