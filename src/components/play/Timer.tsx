interface Props {
  remaining: number
  duration: number
  expired: boolean
  color: string
}

export function TimerRing({ remaining, duration, expired, color }: Props) {
  const radius = 45
  const circumference = 2 * Math.PI * radius
  const progress = expired ? 0 : remaining / duration
  const dashOffset = circumference * (1 - progress)

  const ratio = remaining / duration
  let strokeColor = color
  if (expired) strokeColor = '#ff6b6b'
  else if (ratio <= 0.15) strokeColor = '#ff4081'
  else if (ratio <= 0.33) strokeColor = '#ffab00'

  return (
    <div className="timer-ring-container">
      <svg className="timer-ring-svg" viewBox="0 0 100 100">
        <circle
          className="timer-ring-track"
          cx="50"
          cy="50"
          r={radius}
        />
        <circle
          className="timer-ring-progress"
          cx="50"
          cy="50"
          r={radius}
          stroke={strokeColor}
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{
            opacity: expired ? 0.4 : 0.6,
          }}
        />
      </svg>
    </div>
  )
}
