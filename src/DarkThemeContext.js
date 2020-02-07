import React,{useState, createContext, useEffect} from 'react'

export const ThemeContext = createContext();

export function ThemeProvider(props) {
  const [theme, setTheme] = useState(() => (
    JSON.parse(window.localStorage.getItem('theme') || false)
  ))
  
  useEffect(() => {
    window.localStorage.setItem('theme', theme)
  }, [theme])
  return (
    <ThemeContext.Provider value={[theme, setTheme]}>
      {props.children}
    </ThemeContext.Provider>
  )
}
