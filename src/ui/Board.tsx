import { Stack, Text } from '@chakra-ui/react'
import type { City } from '../data/cities'
import { MAX_GUESSES, type Guess } from '../game/guess'
import { t, type Lang } from '../i18n'
import { GuessRow } from './GuessRow'

export function Board({ lang, guesses, target }: { lang: Lang; guesses: Guess[]; target: City }) {
  return (
    <Stack gap="8px" role="list">
      {guesses.map((g) => (
        <GuessRow key={g.id} lang={lang} guess={g} />
      ))}
      {Array.from({ length: MAX_GUESSES - guesses.length }, (_, i) => (
        <div key={i} role="listitem" style={{ height: 52, borderRadius: 10, border: '1px solid var(--chakra-colors-border-muted, #e4e4e7)' }} />
      ))}
      {guesses.length >= 3 && (
        <Text fontSize="14px" color="fg.muted" textAlign="center">
          {t(lang, 'hint', { region: target.region[lang] })}
        </Text>
      )}
    </Stack>
  )
}
