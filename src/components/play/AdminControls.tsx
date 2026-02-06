import type { GameState, GameAction } from '../../types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function AdminControls({ state, dispatch }: Props) {
  const nextIndex = () => {
    const count = state.players.length
    const delta = state.direction === 'clockwise' ? 1 : -1
    return ((state.currentPlayerIndex + delta) % count + count) % count
  }

  return (
    <div className="admin-controls">
      <button
        className="btn"
        onClick={() => dispatch({ type: 'ADVANCE_TURN' })}
      >
        Skip → {state.players[nextIndex()].name}
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
      >
        Sound: {state.soundEnabled ? 'ON' : 'OFF'}
      </button>
      <button
        className="btn"
        onClick={() => dispatch({ type: 'BACK_TO_SETUP' })}
      >
        End Game
      </button>
    </div>
  )
}
