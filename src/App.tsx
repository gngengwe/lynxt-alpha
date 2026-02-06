import { useReducer } from 'react'
import './App.css'
import { gameReducer, initialState } from './state/gameReducer'
import { SetupScreen } from './components/setup/SetupScreen'
import { PlayScreen } from './components/play/PlayScreen'

function Particles() {
  return (
    <div className="particles">
      {Array.from({ length: 8 }, (_, i) => (
        <div key={i} className="particle" />
      ))}
    </div>
  )
}

function App() {
  const [state, dispatch] = useReducer(gameReducer, initialState)

  const activePlayer = state.phase === 'playing' ? state.players[state.currentPlayerIndex] : null
  const colorWash = activePlayer ? activePlayer.color : 'transparent'

  return (
    <div className="app">
      <div
        className="cinematic-bg"
        style={{ '--player-color-wash': colorWash } as React.CSSProperties}
      />
      <Particles />

      {state.phase !== 'playing' ? (
        <SetupScreen state={state} dispatch={dispatch} />
      ) : (
        <PlayScreen state={state} dispatch={dispatch} />
      )}
    </div>
  )
}

export default App
