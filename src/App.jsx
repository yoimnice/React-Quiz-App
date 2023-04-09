import React from 'react'
import Background from './components/Background'
import Settings from './components/Settings'
import StartScreen from './components/StartScreen'
import Quiz from './components/Quiz'

function App() {
  const [ready, setReady] = React.useState(false)
  const [apiUrl, setApiUrl] = React.useState('https://opentdb.com/api.php?amount=5')
  const [darkMode, setDarkMode] = React.useState(false)

  function handleSettingsChange(newApiUrl){
    setApiUrl(newApiUrl)
  }

  function handleDarkModeChange(){
    setDarkMode(!darkMode)
  }

  const startGame = () => {
    setReady(true)
  }

  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Background />
      <Settings
        darkMode={darkMode}
        onSettingsChange={handleSettingsChange}
        onDarkModeChange={handleDarkModeChange}
      />
      {ready ? <Quiz apiUrl={apiUrl} /> : <StartScreen start={startGame} />}
    </div>
  )
}

export default App
