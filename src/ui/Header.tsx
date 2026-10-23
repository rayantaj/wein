import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { t, type Lang } from '../i18n'

interface Props {
  lang: Lang
  n: number
  onStats: () => void
  onHelp: () => void
  onLang: () => void
}

export function Header({ lang, n, onStats, onHelp, onLang }: Props) {
  return (
    <Box as="header" textAlign="center" py="6" position="relative">
      <Button variant="ghost" size="sm" position="absolute" insetStart="0" top="6" onClick={onLang} aria-label={t(lang, 'langLabel')}>
        {t(lang, 'langBtn')}
      </Button>
      <Box position="absolute" insetEnd="0" top="6">
        <Button variant="ghost" size="sm" onClick={onHelp} aria-label={t(lang, 'help')}>
          ?
        </Button>
        <Button variant="ghost" size="sm" onClick={onStats}>
          {t(lang, 'stats')}
        </Button>
      </Box>
      <Heading as="h1" fontSize="28px" fontWeight="bold">
        {t(lang, 'title')}
      </Heading>
      <Text fontSize="14px" color="fg.muted">
        {t(lang, 'puzzle', { n })}
      </Text>
    </Box>
  )
}
