import { cities, type City } from '../data/cities'

export const normalize = (s: string): string =>
  s
    .toLowerCase()
    .replace(/[ً-ٰٟـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ة/g, 'ه')
    .replace(/ى/g, 'ي')
    .trim()

const index = cities.map((c) => ({ c, names: [normalize(c.ar), normalize(c.en)] }))

export function findCities(query: string, limit = 6): City[] {
  const q = normalize(query)
  if (!q) return []
  const starts = index.filter((e) => e.names.some((n) => n.startsWith(q)))
  const has = index.filter((e) => !starts.includes(e) && e.names.some((n) => n.includes(q)))
  return [...starts, ...has].slice(0, limit).map((e) => e.c)
}
