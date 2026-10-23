import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import '@fontsource/ibm-plex-sans-arabic/400.css'
import '@fontsource/ibm-plex-sans-arabic/700.css'
import App from './App'
import './index.css'

// Chakra's dark tokens switch on the .dark class; follow the system, live
const dark = window.matchMedia('(prefers-color-scheme: dark)')
const applyDark = () => {
  document.documentElement.classList.toggle('dark', dark.matches)
  document.documentElement.style.colorScheme = dark.matches ? 'dark' : 'light'
}
applyDark()
dark.addEventListener('change', applyDark)

if ('serviceWorker' in navigator && import.meta.env.PROD) {
  navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`)
  // the bundle loaded before the worker existed, so cache what this page already fetched
  navigator.serviceWorker.ready.then(async () => {
    const urls = [location.href, ...performance.getEntriesByType('resource').map((r) => r.name)]
    const cache = await caches.open('wein-v1')
    await Promise.all(urls.filter((u) => u.startsWith(location.origin)).map((u) => cache.add(u).catch(() => {})))
  })
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
