import type { City } from '../data/cities'
import { arrow, bearing, closeness, distanceKm } from './geo'

export interface Guess {
  id: string
  km: number
  arrow: string
  closeness: number
}

export const MAX_GUESSES = 6

export function evaluate(city: City, target: City): Guess {
  const km = distanceKm(city, target)
  return { id: city.id, km, arrow: arrow(bearing(city, target), km), closeness: closeness(km) }
}

export function gameState(guesses: { id: string }[], targetId: string): 'playing' | 'won' | 'lost' {
  if (guesses.some((g) => g.id === targetId)) return 'won'
  return guesses.length >= MAX_GUESSES ? 'lost' : 'playing'
}

export function squares(c: number): string {
  const green = Math.floor(c / 20)
  const yellow = c % 20 >= 10 ? 1 : 0
  return '🟩'.repeat(green) + '🟨'.repeat(yellow) + '⬜'.repeat(5 - green - yellow)
}
