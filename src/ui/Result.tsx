import { Box, Text } from '@chakra-ui/react'
import type { City } from '../data/cities'
import { t, type Lang } from '../i18n'

export function Result({ lang, won, count, target }: { lang: Lang; won: boolean; count: number; target: City }) {
  return (
    <Box mt="16px" textAlign="center">
      <Text fontSize="20px" fontWeight="bold">
        {won ? t(lang, 'won', { n: count }) : t(lang, 'lost', { city: target[lang] })}
      </Text>
      {!won && <Text color="fg.muted">{target.region[lang]}</Text>}
      {/* slot for the Share button (a later Feature) */}
    </Box>
  )
}
