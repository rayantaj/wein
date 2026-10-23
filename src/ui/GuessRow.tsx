import { Flex, Text } from '@chakra-ui/react'
import { cities } from '../data/cities'
import { squares, type Guess } from '../game/guess'
import { t, type Lang } from '../i18n'

export function GuessRow({ lang, guess }: { lang: Lang; guess: Guess }) {
  const city = cities.find((c) => c.id === guess.id)
  const hit = guess.km === 0
  return (
    <Flex
      role="listitem"
      align="center"
      gap="8px"
      h="52px"
      px="12px"
      borderRadius="10px"
      borderWidth="1px"
      bg={hit ? 'green.subtle' : undefined}
      fontSize="14px"
    >
      <Text flex="1" fontWeight="bold" truncate>
        {city?.[lang]}
      </Text>
      <span>{t(lang, 'km', { n: guess.km })}</span>
      <span>{guess.arrow}</span>
      <span>{guess.closeness}٪</span>
      <span style={{ fontFamily: 'monospace' }} dir="ltr">
        {squares(guess.closeness)}
      </span>
    </Flex>
  )
}
