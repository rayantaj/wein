import { Box, Text } from '@chakra-ui/react'
import { cities, type City } from '../data/cities'
import { OUTLINE_PATH, VIEW_BOX, project } from '../data/outline'
import type { Guess } from '../game/guess'
import { t, type Lang } from '../i18n'

const color = (c: number) => (c < 40 ? '#9ca3af' : c < 80 ? '#f59e0b' : '#22c55e')

export function MapView({ lang, guesses, target, over }: { lang: Lang; guesses: Guess[]; target: City; over: boolean }) {
  const answer = project(target.lat, target.lon)
  return (
    <Box mt="16px">
      <svg viewBox={VIEW_BOX} width="100%" role="img" aria-label={t(lang, 'map')}>
        <path d={OUTLINE_PATH} fill="#f4f1ea" stroke="#1f2937" strokeWidth="1.5" />
        {guesses.map((g) => {
          const c = cities.find((x) => x.id === g.id)
          if (!c) return null
          const { x, y } = project(c.lat, c.lon)
          return <circle key={g.id} cx={x} cy={y} r="9" fill={color(g.closeness)} stroke="#1f2937" strokeWidth="1.5" />
        })}
        {over && <circle cx={answer.x} cy={answer.y} r="12" fill="#22c55e" stroke="#fff" strokeWidth="3" />}
      </svg>
      <Text fontSize="12px" color="fg.muted" textAlign="center">
        {t(lang, 'map')}
      </Text>
    </Box>
  )
}
