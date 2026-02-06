import type { Player } from '../../types'
import { getPenaltyIcon } from '../../utils/colors'

interface Props {
  player: Player
  isActive: boolean
  isNextUp: boolean
  isUrgent: boolean
  isExpired: boolean
  sparkle: boolean
  seatIndex: number
  angle: number
  radius: number
  onClick: () => void
}

export function PlayerSeat({ player, isActive, isNextUp, isUrgent, isExpired, sparkle, seatIndex, angle, radius, onClick }: Props) {
  const radians = (angle - 90) * (Math.PI / 180)
  const x = 50 + radius * Math.cos(radians)
  const y = 50 + radius * Math.sin(radians)

  const initial = player.name.charAt(0).toUpperCase()

  let seatClass = 'player-seat'
  if (isActive) {
    seatClass += ' active'
    if (isExpired) seatClass += ' expired'
    else if (isUrgent) seatClass += ' urgent'
  } else {
    seatClass += ' inactive'
    seatClass += ` idle-float-${(seatIndex % 4) + 1}`
    if (isNextUp) seatClass += ' next-up'
  }
  if (sparkle) seatClass += ' sparkle'

  const penaltyDisplay = () => {
    if (player.delayPenalties === 0) return null
    if (player.delayPenalties <= 3) {
      return (
        <div className="seat-penalties">
          {Array.from({ length: player.delayPenalties }, (_, i) => (
            <span key={i} className="penalty-badge">{getPenaltyIcon(i)}</span>
          ))}
        </div>
      )
    }
    return (
      <div className="seat-penalties">
        <span className="penalty-badge">{getPenaltyIcon(0)}</span>
        <span className="penalty-count">&times;{player.delayPenalties}</span>
      </div>
    )
  }

  return (
    <div
      className={seatClass}
      style={{
        left: `${x}%`,
        top: `${y}%`,
        '--glow-color': player.color,
        '--seat-color': player.color,
      } as React.CSSProperties}
      onClick={onClick}
    >
      <div
        className="seat-avatar"
        style={{
          backgroundColor: player.color,
          boxShadow: isActive ? undefined : 'none',
        }}
      >
        {initial}
        {player.isAdmin && <span className="seat-crown">👑</span>}
      </div>
      <span className="seat-name">{player.name}</span>
      {penaltyDisplay()}
      {sparkle && <div className="sparkle-burst" />}
    </div>
  )
}
