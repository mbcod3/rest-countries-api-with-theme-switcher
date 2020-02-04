import React, {useContext} from 'react'
import {ThemeContext} from './DarkThemeContext';

export default function Navbar() {
  const [theme, setTheme] = useContext(ThemeContext)

  const handleClick = () => {
    setTheme(theme => !theme)
  }
  return (
    <nav>
      <h2>Where in the world?</h2>
      <button onClick={handleClick}>Dark Mode</button>
    </nav>
  )
}
