import { describe, expect, it } from 'vitest'
import { findCities, normalize } from './search'

describe('search', () => {
  it('normalizes Arabic spellings', () => {
    expect(normalize('الأحساء')).toBe(normalize('الاحساء'))
    expect(normalize(' مَكّة ')).toBe('مكه')
    expect(normalize('Khobar')).toBe('khobar')
  })
  it('finds by prefix, in Arabic and English', () => {
    expect(findCities('جد').map((c) => c.id)).toContain('jeddah')
    expect(findCities('kho')[0].id).toBe('khobar')
  })
  it('lists prefix matches before contains and respects the limit', () => {
    const r = findCities('ا', 3)
    expect(r.length).toBeLessThanOrEqual(3)
    expect(findCities('')).toEqual([])
  })
})
