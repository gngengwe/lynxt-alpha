import type { Player } from '../../types'

interface Props {
  player: Player
  timerRemaining: number
  timerDuration: number
  timerExpired: boolean
  onDone: () => void
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}s`
}

export function TurnDisplay({ player, timerRemaining, timerDuration, timerExpired, onDone }: Props) {
  const ratio = timerRemaining / timerDuration
  let timerClass = 'turn-timer-text'
  if (timerExpired) timerClass += ' expired'
  else if (ratio <= 0.15) timerClass += ' critical'
  else if (ratio <= 0.33) timerClass += ' warning'

  return (
    <div className="table-center">
      <div
        className="turn-player-name"
        style={{ color: player.color }}
      >
        {player.name}
      </div>
      <div className="turn-message">
        {timerExpired
          ? "Time's up! Tap when you're done."
          : "It's your turn. Tap after you play."}
      </div>
      <div className={timerClass}>
        {timerExpired ? 'OVERTIME' : formatTime(timerRemaining)}
      </div>
      <button className="done-button" onClick={onDone}>
        Done
      </button>
    </div>
  )
}
