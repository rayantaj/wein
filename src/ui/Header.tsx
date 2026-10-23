import { Box, Heading, Text } from '@chakra-ui/react'
import { t, type Lang } from '../i18n'

export function Header({ lang, n }: { lang: Lang; n: number }) {
  return (
    <Box as="header" textAlign="center" py="6">
      <Heading as="h1" fontSize="28px" fontWeight="bold">
        {t(lang, 'title')}
      </Heading>
      <Text fontSize="14px" color="fg.muted">
        {t(lang, 'puzzle', { n })}
      </Text>
    </Box>
  )
}
