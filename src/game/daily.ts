import { cities, type City } from '../data/cities'

export const LAUNCH = '2026-10-23'

const fmt = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Riyadh', year: 'numeric', month: '2-digit', day: '2-digit' })

/** Today's date in Riyadh as YYYY-MM-DD. */
export const riyadhDate = (now: Date = new Date()): string => fmt.format(now)

export function puzzleNumber(now?: Date): number {
  const days = (Date.parse(riyadhDate(now)) - Date.parse(LAUNCH)) / 86400000
  return days + 1
}

function mulberry32(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const shuffled = (() => {
  const a = [...cities]
  const rnd = mulberry32(20261023)
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
})()

export const cityOfDay = (n: number): City => shuffled[(((n - 1) % shuffled.length) + shuffled.length) % shuffled.length]

export function randomCity(excludeId?: string): City {
  const pool = cities.filter((c) => c.id !== excludeId)
  return pool[Math.floor(Math.random() * pool.length)]
}
