import { describe, expect, it } from 'vitest'
import { cities } from '../data/cities'
import { evaluate, gameState, squares } from './guess'

const [a, b] = cities

describe('guess', () => {
  it('evaluates a hit as 0 km, 🎯, 100 %', () => {
    expect(evaluate(a, a)).toEqual({ id: a.id, km: 0, arrow: '🎯', closeness: 100 })
  })
  it('evaluates a miss with distance and arrow', () => {
    const g = evaluate(a, b)
    expect(g.km).toBeGreaterThan(0)
    expect(g.arrow).not.toBe('🎯')
  })
  it('tracks the state', () => {
    const miss = { id: 'x' }
    expect(gameState([], a.id)).toBe('playing')
    expect(gameState([miss, { id: a.id }], a.id)).toBe('won')
    expect(gameState(Array(5).fill(miss), a.id)).toBe('playing')
    expect(gameState(Array(6).fill(miss), a.id)).toBe('lost')
    expect(gameState([...Array(5).fill(miss), { id: a.id }], a.id)).toBe('won')
  })
  it('draws squares', () => {
    expect(squares(100)).toBe('🟩🟩🟩🟩🟩')
    expect(squares(65)).toBe('🟩🟩🟩⬜⬜')
    expect(squares(70)).toBe('🟩🟩🟩🟨⬜')
    expect(squares(0)).toBe('⬜⬜⬜⬜⬜')
  })
})
