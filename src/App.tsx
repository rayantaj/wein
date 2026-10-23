import { Box } from '@chakra-ui/react'
import { puzzleNumber } from './game/daily'
import { Board } from './ui/Board'
import { Header } from './ui/Header'

export default function App() {
  return (
    <Box maxW="480px" mx="auto" px="16px">
      <Header lang="ar" n={puzzleNumber()} />
      <Board />
    </Box>
  )
}
