export interface LatLon {
  lat: number
  lon: number
}

const rad = (d: number) => (d * Math.PI) / 180

export function distanceKm(a: LatLon, b: LatLon): number {
  const dLat = rad(b.lat - a.lat)
  const dLon = rad(b.lon - a.lon)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLon / 2) ** 2
  return Math.round(2 * 6371 * Math.asin(Math.sqrt(h)))
}

/** Initial bearing from a to b in degrees, 0 = north, clockwise. */
export function bearing(a: LatLon, b: LatLon): number {
  const dLon = rad(b.lon - a.lon)
  const y = Math.sin(dLon) * Math.cos(rad(b.lat))
  const x = Math.cos(rad(a.lat)) * Math.sin(rad(b.lat)) - Math.sin(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.cos(dLon)
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360
}

const ARROWS = ['↑', '↗', '→', '↘', '↓', '↙', '←', '↖']

export function arrow(bearingDeg: number, km = 1): string {
  return km === 0 ? '🎯' : ARROWS[Math.round((((bearingDeg % 360) + 360) % 360) / 45) % 8]
}

export function closeness(km: number): number {
  return Math.max(0, Math.round(100 * (1 - km / 2000)))
}
