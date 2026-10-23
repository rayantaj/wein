import { Box, Button, Heading, Text } from '@chakra-ui/react'
import { t, type Lang } from '../i18n'

export function Header({ lang, n, onStats }: { lang: Lang; n: number; onStats: () => void }) {
  return (
    <Box as="header" textAlign="center" py="6" position="relative">
      <Button variant="ghost" size="sm" position="absolute" insetEnd="0" top="6" onClick={onStats}>
        {t(lang, 'stats')}
      </Button>
      <Heading as="h1" fontSize="28px" fontWeight="bold">
        {t(lang, 'title')}
      </Heading>
      <Text fontSize="14px" color="fg.muted">
        {t(lang, 'puzzle', { n })}
      </Text>
    </Box>
  )
}
