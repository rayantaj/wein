import { Box, CloseButton, Dialog, Flex, Portal, Text } from '@chakra-ui/react'
import type { Stats } from '../game/stats'
import { t, type Lang } from '../i18n'

export function StatsDialog({ lang, stats, open, onClose }: { lang: Lang; stats: Stats; open: boolean; onClose: () => void }) {
  const pct = stats.played ? Math.round((stats.won / stats.played) * 100) : 0
  const max = Math.max(1, ...stats.dist)
  const nums: [string, number][] = [
    ['played', stats.played],
    ['winPct', pct],
    ['streak', stats.streak],
    ['best', stats.best],
  ]
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx="16px">
            <Dialog.Header>
              <Dialog.Title>{t(lang, 'stats')}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="24px">
              <Flex justify="space-around" textAlign="center" mb="16px">
                {nums.map(([k, v]) => (
                  <Box key={k}>
                    <Text fontSize="24px" fontWeight="bold">
                      {v}
                    </Text>
                    <Text fontSize="12px" color="fg.muted">
                      {t(lang, k as 'played')}
                    </Text>
                  </Box>
                ))}
              </Flex>
              {stats.dist.map((c, i) => (
                <Flex key={i} align="center" gap="8px" mb="4px">
                  <Text w="16px">{i + 1}</Text>
                  <Box bg="green.500" color="white" h="20px" minW="20px" px="6px" fontSize="12px" w={`${(c / max) * 100}%`}>
                    {c}
                  </Box>
                </Flex>
              ))}
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" aria-label={t(lang, 'close')} />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  )
}
