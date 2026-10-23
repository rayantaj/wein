import { useEffect, useState } from 'react'
import { Box, Button, Flex, Text } from '@chakra-ui/react'
import type { City } from '../data/cities'
import { riyadhDate } from '../game/daily'
import { t, type Lang } from '../i18n'

// Riyadh has no DST (UTC+3), so the next midnight is a fixed offset.
const minutesLeft = () => Math.floor((Date.parse(`${riyadhDate()}T00:00:00+03:00`) + 86400000 - Date.now()) / 60000)

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    document.execCommand('copy')
    ta.remove()
  }
}

interface Props {
  lang: Lang
  won: boolean
  count: number
  target: City
  share: string
  practice: boolean
  onPractice: () => void
  onBack: () => void
}

export function Result({ lang, won, count, target, share, practice, onPractice, onBack }: Props) {
  const [copied, setCopied] = useState(false)
  const [mins, setMins] = useState(minutesLeft)
  useEffect(() => {
    const id = setInterval(() => setMins(minutesLeft()), 60000)
    return () => clearInterval(id)
  }, [])

  return (
    <Box mt="16px" textAlign="center">
      <Text fontSize="20px" fontWeight="bold">
        {won ? t(lang, 'won', { n: count }) : t(lang, 'lost', { city: target[lang] })}
      </Text>
      {!won && <Text color="fg.muted">{target.region[lang]}</Text>}
      {!practice && (
        <>
          <Text mt="8px" color="fg.muted">
            {t(lang, 'next', { h: Math.floor(mins / 60), m: mins % 60 })}
          </Text>
          <Button
            mt="12px"
            onClick={async () => {
              await copy(share)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
          >
            {t(lang, 'share')}
          </Button>
          <Text role="status" minH="24px" color="green.600">
            {copied && t(lang, 'copied')}
          </Text>
        </>
      )}
      <Flex justify="center" gap="8px" mt="8px">
        <Button variant="outline" onClick={onPractice}>
          {t(lang, practice ? 'another' : 'practice')}
        </Button>
        {practice && (
          <Button variant="outline" onClick={onBack}>
            {t(lang, 'backToToday')}
          </Button>
        )}
      </Flex>
    </Box>
  )
}
