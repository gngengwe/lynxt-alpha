import { useState } from 'react'
import type { GameState, GameAction } from '../../types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function AdminLogin({ state, dispatch }: Props) {
  const [name, setName] = useState(state.adminName)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    dispatch({ type: 'SET_ADMIN', name: name.trim() })
    dispatch({ type: 'GO_TO_PLAYERS' })
  }

  return (
    <div className="setup-screen">
      <div className="setup-card glass-panel animate-fade-in">
        <h1>
          <span className="logo-text">Lynxt</span>
        </h1>
        <p className="subtitle">Polite turn management for tabletop games</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Your name (Admin)</label>
            <input
              className="input"
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
