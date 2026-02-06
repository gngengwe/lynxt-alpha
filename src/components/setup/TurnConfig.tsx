import type { GameState, GameAction, Direction } from '../../types'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

const TIMER_PRESETS = [30, 60, 90, 120]

export function TurnConfig({ state, dispatch }: Props) {
  const setDirection = (direction: Direction) => {
    dispatch({ type: 'SET_DIRECTION', direction })
  }

  const setTimer = (duration: number) => {
    dispatch({ type: 'SET_TIMER_DURATION', duration })
  }

  return (
    <div className="setup-screen">
      <div className="setup-card glass-panel animate-fade-in">
        <h2>Game Setup</h2>
        <p className="subtitle">Configure how turns work</p>

        {/* First Player */}
        <div className="config-section">
          <h3>First Player</h3>
          <div className="first-player-select">
            {state.players.map((player, index) => (
              <button
                key={player.id}
                className={`first-player-chip ${index === state.currentPlayerIndex ? 'active' : ''}`}
                style={{
                  '--chip-color': player.color,
                } as React.CSSProperties}
                onClick={() => dispatch({ type: 'SET_FIRST_PLAYER', index })}
              >
                {player.name}
              </button>
            ))}
          </div>
        </div>

        {/* Direction */}
        <div className="config-section">
          <h3>Turn Direction</h3>
          <div className="config-options">
            <button
              className={`config-option ${state.direction === 'clockwise' ? 'active' : ''}`}
              onClick={() => setDirection('clockwise')}
            >
              Clockwise
            </button>
            <button
              className={`config-option ${state.direction === 'counterclockwise' ? 'active' : ''}`}
              onClick={() => setDirection('counterclockwise')}
            >
              Counter-CW
            </button>
          </div>
        </div>

        {/* Timer */}
        <div className="config-section">
          <h3>Turn Timer</h3>
          <div className="config-options">
            {TIMER_PRESETS.map((seconds) => (
              <button
                key={seconds}
                className={`config-option ${state.timerDuration === seconds ? 'active' : ''}`}
                onClick={() => setTimer(seconds)}
              >
                {seconds}s
              </button>
            ))}
          </div>
        </div>

        {/* Sound */}
        <div className="config-section">
          <div
            className="config-toggle"
            onClick={() => dispatch({ type: 'TOGGLE_SOUND' })}
          >
            <span className="config-toggle-label">Sound Effects</span>
            <span className={`config-toggle-status ${state.soundEnabled ? 'on' : ''}`}>
              {state.soundEnabled ? 'ON' : 'OFF'}
            </span>
          </div>
        </div>

        <div className="form-actions">
          <button
            className="btn btn-primary btn-large"
            onClick={() => dispatch({ type: 'START_GAME' })}
          >
            Start Game
          </button>
        </div>
      </div>
    </div>
  )
}
