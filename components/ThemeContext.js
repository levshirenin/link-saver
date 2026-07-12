import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

function getInitialDark() {
  if (typeof window === 'undefined') return false
  return localStorage.getItem('theme') === 'dark'
}

export function ThemeProvider({ children }) {
  const [dark, setDark] = useState(getInitialDark)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    localStorage.setItem('theme', dark ? 'dark' : 'light')
  }, [dark])

  return (
    <ThemeContext.Provider value={{ dark, toggle: () => setDark(d => !d) }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  return useContext(ThemeContext)
}