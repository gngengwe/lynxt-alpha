import { useState } from 'react'
import type { GameState, GameAction } from '../../types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function PlayerEntry({ state, dispatch }: Props) {
  const [name, setName] = useState('')

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault()
    if (!name.trim()) return
    if (state.players.length >= 12) return
    dispatch({ type: 'ADD_PLAYER', name: name.trim() })
    setName('')
  }

  const canProceed = state.players.length >= 2

  return (
    <div className="setup-screen">
      <div className="setup-card glass-panel animate-fade-in">
        <h2>Add Players</h2>
        <p className="subtitle">Everyone at the table</p>

        <form onSubmit={handleAdd} className="player-input-row">
          <input
            className="input"
            type="text"
            placeholder="Player name..."
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
            maxLength={20}
          />
          <button
            type="submit"
            className="btn btn-primary"
            disabled={!name.trim() || state.players.length >= 12}
          >
            Add
          </button>
        </form>

        <p className="player-count">
          {state.players.length} player{state.players.length !== 1 ? 's' : ''} at the table
          {!canProceed && ' (need at least 2)'}
        </p>

        <ul className="player-list">
          {state.players.map((player) => (
            <li key={player.id} className="player-list-item">
              <div
                className="player-color-dot"
                style={{ backgroundColor: player.color, color: player.color }}
              />
              <span className="player-list-name">{player.name}</span>
              {player.isAdmin && (
                <span className="player-admin-badge">Admin</span>
              )}
              {!player.isAdmin && (
                <button
                  className="player-remove-btn"
                  onClick={() => dispatch({ type: 'REMOVE_PLAYER', id: player.id })}
                  aria-label={`Remove ${player.name}`}
                >
                  &times;
                </button>
              )}
            </li>
          ))}
        </ul>

        <div className="form-actions">
          <button
            className="btn btn-primary btn-large"
            disabled={!canProceed}
            onClick={() => dispatch({ type: 'GO_TO_CONFIGURE' })}
          >
            Configure Game
          </button>
        </div>
      </div>
    </div>
  )
}
