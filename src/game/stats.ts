export interface Stats {
  played: number
  won: number
  streak: number
  best: number
  dist: number[]
  lastWonN?: number
}

export const emptyStats = (): Stats => ({ played: 0, won: 0, streak: 0, best: 0, dist: [0, 0, 0, 0, 0, 0] })

export function recordResult(s: Stats, { n, won, guessCount }: { n: number; won: boolean; guessCount: number }): Stats {
  if (!won) return { ...s, played: s.played + 1, streak: 0 }
  const streak = s.lastWonN === n - 1 ? s.streak + 1 : 1
  const dist = s.dist.map((c, i) => (i === guessCount - 1 ? c + 1 : c))
  return { played: s.played + 1, won: s.won + 1, streak, best: Math.max(s.best, streak), dist, lastWonN: n }
}
