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
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </StrictMode>,
)
