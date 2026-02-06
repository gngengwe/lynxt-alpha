import { useEffect, useRef, useCallback } from 'react'
import type { GameState, GameAction } from '../../types'
import { CircularTable } from './CircularTable'
import { AdminControls } from './AdminControls'
import { playTurnChime, playTickBeep, playPenaltyBloop, playAdvanceWhoosh } from '../../utils/audio'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function PlayScreen({ state, dispatch }: Props) {
  const prevPlayerIndex = useRef(state.currentPlayerIndex)
  const hasPlayedExpiredSound = useRef(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Timer tick
  useEffect(() => {
    if (state.timerRunning && !state.timerExpired) {
      timerRef.current = setInterval(() => {
        dispatch({ type: 'TICK_TIMER' })
      }, 1000)
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current)
        timerRef.current = null
      }
    }
  }, [state.timerRunning, state.timerExpired, dispatch])

  // Sound: turn change chime
  useEffect(() => {
    if (prevPlayerIndex.current !== state.currentPlayerIndex) {
      if (state.soundEnabled) {
        playAdvanceWhoosh()
        setTimeout(() => playTurnChime(), 150)
      }
      prevPlayerIndex.current = state.currentPlayerIndex
      hasPlayedExpiredSound.current = false
    }
  }, [state.currentPlayerIndex, state.soundEnabled])

  // Sound: timer warning beeps
  useEffect(() => {
    if (!state.soundEnabled || state.timerExpired) return
    const ratio = state.timerRemaining / state.timerDuration

    if (state.timerRemaining <= 10 && state.timerRemaining > 0) {
      const urgency = 1 - (state.timerRemaining / 10)
      playTickBeep(urgency)
    } else if (ratio <= 0.33 && state.timerRemaining % 5 === 0 && state.timerRemaining > 0) {
      playTickBeep(0.3)
    }
  }, [state.timerRemaining, state.timerDuration, state.timerExpired, state.soundEnabled])

  // Timer expired: award penalty
  useEffect(() => {
    if (state.timerExpired && !hasPlayedExpiredSound.current) {
      dispatch({ type: 'TIMER_EXPIRED' })
      if (state.soundEnabled) {
        playPenaltyBloop()
      }
      hasPlayedExpiredSound.current = true
    }
  }, [state.timerExpired, state.soundEnabled, dispatch])

  // Play initial chime on mount
  const hasPlayedInitial = useRef(false)
  useEffect(() => {
    if (!hasPlayedInitial.current && state.soundEnabled) {
      playTurnChime()
      hasPlayedInitial.current = true
    }
  }, [state.soundEnabled])

  // Wrap dispatch to track turn advances for audio
  const wrappedDispatch = useCallback((action: GameAction) => {
    dispatch(action)
  }, [dispatch])

  return (
    <div className="play-screen">
      <CircularTable state={state} dispatch={wrappedDispatch} />
      <AdminControls state={state} dispatch={wrappedDispatch} />

      {/* Turn counter */}
      <div className="turn-counter">
        Turn {state.turnCount}
      </div>
    </div>
  )
}
