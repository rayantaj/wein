import { Stack } from '@chakra-ui/react'

export function Board() {
  return (
    <Stack gap="8px" role="list">
      {Array.from({ length: 6 }, (_, i) => (
        <div key={i} role="listitem" style={{ height: 52, borderRadius: 10, border: '1px solid var(--chakra-colors-border-muted, #e4e4e7)' }} />
      ))}
    </Stack>
  )
}
