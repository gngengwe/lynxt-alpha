import type { GameState, GameAction } from '../../types'
import { PlayerSeat } from './PlayerSeat'
import { TurnDisplay } from './TurnDisplay'
import { TimerRing } from './Timer'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
  sparklingPlayer: number | null
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  if (!result) return '255, 255, 255'
  return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
}

export function CircularTable({ state, dispatch, sparklingPlayer }: Props) {
  const { players, currentPlayerIndex, timerRemaining, timerDuration, timerExpired, direction } = state
  const activePlayer = players[currentPlayerIndex]
  const timerRatio = timerRemaining / timerDuration
  const isUrgent = timerRatio <= 0.33 && !timerExpired

  // Compute next player index
  const delta = direction === 'clockwise' ? 1 : -1
  const nextPlayerIndex = ((currentPlayerIndex + delta) % players.length + players.length) % players.length

  const handleDone = () => {
    dispatch({ type: 'ADVANCE_TURN' })
  }

  const handleSeatClick = (index: number) => {
    if (index === currentPlayerIndex) {
      handleDone()
    }
  }

  return (
    <div className="table-container">
      <div
        className={`table-surface ${activePlayer ? 'has-active' : ''}`}
        style={{
          '--active-color-rgb': hexToRgb(activePlayer.color),
        } as React.CSSProperties}
      />

      <TimerRing
        remaining={timerRemaining}
        duration={timerDuration}
        expired={timerExpired}
        color={activePlayer.color}
      />

      {players.map((player, index) => {
        const angle = (360 / players.length) * index
        return (
          <PlayerSeat
            key={player.id}
            player={player}
            isActive={index === currentPlayerIndex}
            isNextUp={index === nextPlayerIndex}
            isUrgent={isUrgent}
            isExpired={timerExpired}
            sparkle={sparklingPlayer === index}
            seatIndex={index}
            angle={angle}
            radius={42}
            onClick={() => handleSeatClick(index)}
          />
        )
      })}

      <TurnDisplay
        player={activePlayer}
        timerRemaining={timerRemaining}
        timerDuration={timerDuration}
        timerExpired={timerExpired}
        onDone={handleDone}
      />
    </div>
  )
}
