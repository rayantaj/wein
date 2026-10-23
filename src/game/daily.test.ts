import { describe, expect, it } from 'vitest'
import { cityOfDay, puzzleNumber, randomCity, riyadhDate } from './daily'

describe('daily', () => {
  it('number is stable across a Riyadh day and changes at Riyadh midnight', () => {
    // Riyadh is UTC+3: 21:00Z is midnight there.
    expect(puzzleNumber(new Date('2026-10-22T21:00:00Z'))).toBe(1)
    expect(puzzleNumber(new Date('2026-10-23T20:59:59Z'))).toBe(1)
    expect(puzzleNumber(new Date('2026-10-23T21:00:00Z'))).toBe(2)
    expect(riyadhDate(new Date('2026-10-23T21:00:00Z'))).toBe('2026-10-24')
  })

  it('cityOfDay is deterministic and consecutive days differ', () => {
    expect(cityOfDay(1)).toBe(cityOfDay(1))
    expect(cityOfDay(1).id).not.toBe(cityOfDay(2).id)
  })

  it('randomCity skips the excluded id', () => {
    const id = cityOfDay(1).id
    for (let i = 0; i < 50; i++) expect(randomCity(id).id).not.toBe(id)
  })
})
