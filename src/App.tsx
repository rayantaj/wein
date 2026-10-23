import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import { cities, type City } from './data/cities'
import { cityOfDay, puzzleNumber } from './game/daily'
import { evaluate, gameState, type Guess } from './game/guess'
import { loadToday, saveToday } from './game/storage'
import { Board } from './ui/Board'
import { GuessInput } from './ui/GuessInput'
import { Header } from './ui/Header'
import { Result } from './ui/Result'

const lang = 'ar'

export default function App() {
  const n = puzzleNumber()
  const target = cityOfDay(n)
  const [guesses, setGuesses] = useState<Guess[]>(() =>
    loadToday().flatMap((id) => {
      const c = cities.find((x) => x.id === id)
      return c ? [evaluate(c, target)] : []
    }),
  )
  const state = gameState(guesses, target.id)

  const onGuess = (city: City) => {
    const next = [...guesses, evaluate(city, target)]
    setGuesses(next)
    saveToday({ n, guessIds: next.map((g) => g.id) })
  }

  return (
    <Box maxW="480px" mx="auto" px="16px">
      <Header lang={lang} n={n} />
      <Board lang={lang} guesses={guesses} target={target} />
      {state === 'playing' ? (
        <GuessInput lang={lang} guessedIds={guesses.map((g) => g.id)} onGuess={onGuess} />
      ) : (
        <Result lang={lang} won={state === 'won'} count={guesses.length} target={target} />
      )}
    </Box>
  )
}
