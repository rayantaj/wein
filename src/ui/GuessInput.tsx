import { useState } from 'react'
import { Box, Input, Text } from '@chakra-ui/react'
import type { City } from '../data/cities'
import { findCities } from '../game/search'
import { t, type Lang } from '../i18n'

export function GuessInput({ lang, guessedIds, onGuess }: { lang: Lang; guessedIds: string[]; onGuess: (c: City) => void }) {
  const [q, setQ] = useState('')
  const [active, setActive] = useState(0)
  const options = findCities(q, 6 + guessedIds.length)
    .filter((c) => !guessedIds.includes(c.id))
    .slice(0, 6)

  const pick = (c: City | undefined) => {
    if (!c) return
    setQ('')
    setActive(0)
    onGuess(c)
  }

  return (
    <Box mt="16px" position="relative">
      <Input
        value={q}
        placeholder={t(lang, 'placeholder')}
        // keyboards pop up on phones, so only focus where there is a mouse
        autoFocus={window.matchMedia('(pointer: fine)').matches}
        role="combobox"
        aria-expanded={options.length > 0}
        aria-controls="city-options"
        onChange={(e) => {
          setQ(e.target.value)
          setActive(0)
        }}
        onKeyDown={(e) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setActive((a) => Math.min(a + 1, options.length - 1))
          } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            setActive((a) => Math.max(a - 1, 0))
          } else if (e.key === 'Enter') pick(options[active])
        }}
      />
      {options.length > 0 && (
        <Box id="city-options" role="listbox" mt="4px" borderWidth="1px" borderRadius="10px" overflow="hidden">
          {options.map((c, i) => (
            <Box
              key={c.id}
              role="option"
              aria-selected={i === active}
              px="12px"
              py="8px"
              cursor="pointer"
              bg={i === active ? 'bg.muted' : undefined}
              onMouseDown={(e) => {
                e.preventDefault()
                pick(c)
              }}
            >
              {c.ar}{' '}
              <Text as="span" fontSize="12px" color="fg.muted">
                {c.en}
              </Text>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  )
}
