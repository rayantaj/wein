import { CloseButton, Dialog, Portal, Text } from '@chakra-ui/react'
import { t, type Lang } from '../i18n'
import { GuessRow } from './GuessRow'

// a sample guess: 412 km away, to the north-east, 74% close
const example = { id: 'jeddah', km: 412, arrow: '↗', closeness: 74 }

export function HelpDialog({ lang, open, onClose }: { lang: Lang; open: boolean; onClose: () => void }) {
  return (
    <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()} placement="center">
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content mx="16px">
            <Dialog.Header>
              <Dialog.Title>{t(lang, 'help')}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="24px">
              <Text mb="4px">{t(lang, 'help1')}</Text>
              <Text mb="4px">{t(lang, 'help2')}</Text>
              <Text mb="12px">{t(lang, 'help3')}</Text>
              <GuessRow lang={lang} guess={example} />
              <Text mt="8px" fontSize="12px" color="fg.muted">
                {t(lang, 'helpExample')}
              </Text>
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
