import { puzzleNumber } from './daily'
import { emptyStats, type Stats } from './stats'

const KEY = 'wein:today'
const STATS_KEY = 'wein:stats'

interface Today {
  n: number
  guessIds: string[]
  recorded?: boolean
}

function readToday(): Today | null {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    return s?.n === puzzleNumber() && Array.isArray(s.guessIds) ? s : null
  } catch {
    return null
  }
}

export const loadToday = (): string[] => readToday()?.guessIds ?? []

export const isRecorded = (): boolean => readToday()?.recorded === true

export function saveToday(s: Today): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // private mode or full storage: the game still plays, it just won't survive a reload
  }
}

export function loadStats(): Stats {
  try {
    const s = JSON.parse(localStorage.getItem(STATS_KEY) ?? 'null')
    return s && Array.isArray(s.dist) && s.dist.length === 6 ? s : emptyStats()
  } catch {
    return emptyStats()
  }
}

export function saveStats(s: Stats): void {
  try {
    localStorage.setItem(STATS_KEY, JSON.stringify(s))
  } catch {
    // same as saveToday
  }
}
