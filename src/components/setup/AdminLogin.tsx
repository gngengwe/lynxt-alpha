import { useState } from 'react'
import type { GameState, GameAction } from '../../types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

function LogoIcon() {
  return (
    <svg className="landing-logo-svg" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Outer orbital ring */}
      <circle className="logo-ring logo-ring-outer" cx="60" cy="60" r="55" stroke="url(#logoGrad)" strokeWidth="1" />
      {/* Inner orbital ring */}
      <circle className="logo-ring logo-ring-inner" cx="60" cy="60" r="40" stroke="url(#logoGrad)" strokeWidth="0.5" />
      {/* Orbiting dots (players around a table) */}
      <circle className="logo-dot logo-dot-1" cx="60" cy="5" r="3.5" fill="#00e5ff" />
      <circle className="logo-dot logo-dot-2" cx="107.5" cy="37.5" r="3" fill="#ff4081" />
      <circle className="logo-dot logo-dot-3" cx="107.5" cy="82.5" r="3" fill="#ffab00" />
      <circle className="logo-dot logo-dot-4" cx="60" cy="115" r="3.5" fill="#00e676" />
      <circle className="logo-dot logo-dot-5" cx="12.5" cy="82.5" r="3" fill="#b388ff" />
      <circle className="logo-dot logo-dot-6" cx="12.5" cy="37.5" r="3" fill="#ff6e40" />
      {/* Center pulse */}
      <circle className="logo-center-pulse" cx="60" cy="60" r="8" fill="url(#logoGrad)" />
      <defs>
        <linearGradient id="logoGrad" x1="0" y1="0" x2="120" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#00e5ff" />
          <stop offset="1" stopColor="#ff4081" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function AdminLogin({ state, dispatch }: Props) {
  const [name, setName] = useState(state.adminName)
  const [entered, setEntered] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    setEntered(true)
    // Delay dispatch so exit animation can play
    setTimeout(() => {
      dispatch({ type: 'SET_ADMIN', name: name.trim() })
      dispatch({ type: 'GO_TO_PLAYERS' })
    }, 400)
  }

  return (
    <div className={`setup-screen landing-screen ${entered ? 'landing-exit' : ''}`}>
      {/* Animated logo */}
      <div className="landing-logo">
        <LogoIcon />
      </div>

      {/* Wordmark */}
      <h1 className="landing-title">
        <span className="logo-text">lynxt</span>
      </h1>

      {/* Login card */}
      <div className="landing-card glass-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your name</label>
            <input
              className="input landing-input"
              type="text"
              placeholder="Enter your name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
              maxLength={20}
            />
          </div>

          <div className="form-actions">
            <button
              type="submit"
              className="btn btn-primary btn-large"
              disabled={!name.trim()}
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
