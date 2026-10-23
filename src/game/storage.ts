import { puzzleNumber } from './daily'

const KEY = 'wein:today'

export function loadToday(): string[] {
  try {
    const s = JSON.parse(localStorage.getItem(KEY) ?? 'null')
    return s?.n === puzzleNumber() && Array.isArray(s.guessIds) ? s.guessIds : []
  } catch {
    return []
  }
}

export function saveToday(s: { n: number; guessIds: string[] }): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(s))
  } catch {
    // private mode or full storage: the game still plays, it just won't survive a reload
  }
}
