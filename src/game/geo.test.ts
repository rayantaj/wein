import { describe, expect, it } from 'vitest'
import { arrow, bearing, closeness, distanceKm } from './geo'

const riyadh = { lat: 24.6383, lon: 46.715 }
const jeddah = { lat: 21.5433, lon: 39.1728 }

describe('geo', () => {
  it('Riyadh to Jeddah is about 845 km and points west', () => {
    const km = distanceKm(riyadh, jeddah)
    expect(Math.abs(km - 845)).toBeLessThan(15)
    const b = bearing(riyadh, jeddah) // ~244°: west-southwest
    expect(b).toBeGreaterThan(225)
    expect(b).toBeLessThan(270)
    expect(arrow(b, km)).toBe('↙')
  })

  it('same place is 0 km with the target arrow', () => {
    expect(distanceKm(riyadh, riyadh)).toBe(0)
    expect(arrow(0, 0)).toBe('🎯')
  })

  it('arrows follow the compass', () => {
    expect([0, 45, 90, 135, 180, 225, 270, 315, 359].map((d) => arrow(d))).toEqual(['↑', '↗', '→', '↘', '↓', '↙', '←', '↖', '↑'])
  })

  it('closeness is 100 at 0 km, floors at 0', () => {
    expect([closeness(0), closeness(1000), closeness(2000), closeness(3000)]).toEqual([100, 50, 0, 0])
  })
})
