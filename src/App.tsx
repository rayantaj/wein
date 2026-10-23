import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { cities, type City } from './data/cities'
import { cityOfDay, puzzleNumber, randomCity } from './game/daily'
import { evaluate, gameState, type Guess } from './game/guess'
import { shareText } from './game/share'
import { recordResult } from './game/stats'
import { loadLang, loadSeen, loadStats, loadToday, saveLang, saveSeen, saveStats, saveToday } from './game/storage'
import { Board } from './ui/Board'
import { GuessInput } from './ui/GuessInput'
import { Header } from './ui/Header'
import { HelpDialog } from './ui/HelpDialog'
import { MapView } from './ui/MapView'
import { Result } from './ui/Result'
import { StatsDialog } from './ui/StatsDialog'

const URL = 'https://rayantaj.github.io/wein/'

export default function App() {
  const n = puzzleNumber()
  const today = cityOfDay(n)
  const [dailyGuesses, setDailyGuesses] = useState<Guess[]>(() =>
    loadToday().flatMap((id) => {
      const c = cities.find((x) => x.id === id)
      return c ? [evaluate(c, today)] : []
    }),
  )
  // practice: a random city and its own guesses; null means today's puzzle
  const [practice, setPractice] = useState<{ target: City; guesses: Guess[] } | null>(null)
  const [stats, setStats] = useState(loadStats)
  const [showStats, setShowStats] = useState(false)

  const [lang, setLang] = useState(loadLang)
  const [showHelp, setShowHelp] = useState(() => !loadSeen())
  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
    saveLang(lang)
  }, [lang])

  const target = practice?.target ?? today
  const guesses = practice?.guesses ?? dailyGuesses
  const state = gameState(guesses, target.id)

  const onGuess = (city: City) => {
    const next = [...guesses, evaluate(city, target)]
    if (practice) return setPractice({ target, guesses: next })
    setDailyGuesses(next)
    const end = gameState(next, target.id)
    const guessIds = next.map((g) => g.id)
    if (end === 'playing') return saveToday({ n, guessIds })
    const s = recordResult(stats, { n, won: end === 'won', guessCount: next.length })
    setStats(s)
    saveStats(s)
    saveToday({ n, guessIds, recorded: true })
    setShowStats(true)
  }

  const startPractice = () => setPractice({ target: randomCity(today.id), guesses: [] })

  return (
    <Box maxW="480px" mx="auto" px="16px">
      <Header
        lang={lang}
        n={n}
        onStats={() => setShowStats(true)}
        onHelp={() => setShowHelp(true)}
        onLang={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      />
      <Board lang={lang} guesses={guesses} target={target} />
      <MapView lang={lang} guesses={guesses} target={target} over={state !== 'playing'} />
      {state === 'playing' ? (
        <GuessInput key={practice ? target.id : 'daily'} lang={lang} guessedIds={guesses.map((g) => g.id)} onGuess={onGuess} />
      ) : (
        <Result
          lang={lang}
          won={state === 'won'}
          count={guesses.length}
          target={target}
          share={shareText({ n, guesses, won: state === 'won', lang, url: URL })}
          practice={!!practice}
          onPractice={startPractice}
          onBack={() => setPractice(null)}
        />
      )}
      <StatsDialog lang={lang} stats={stats} open={showStats} onClose={() => setShowStats(false)} />
      <HelpDialog
        lang={lang}
        open={showHelp}
        onClose={() => {
          setShowHelp(false)
          saveSeen()
        }}
      />
    </Box>
  )
}
