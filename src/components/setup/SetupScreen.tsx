import type { GameState, GameAction } from '../../types'
import { AdminLogin } from './AdminLogin'
import { PlayerEntry } from './PlayerEntry'
import { TurnConfig } from './TurnConfig'

interface Props {
  state: GameState
  dispatch: React.Dispatch<GameAction>
}

export function SetupScreen({ state, dispatch }: Props) {
  switch (state.phase) {
    case 'login':
      return <AdminLogin state={state} dispatch={dispatch} />
    case 'addPlayers':
      return <PlayerEntry state={state} dispatch={dispatch} />
    case 'configure':
      return <TurnConfig state={state} dispatch={dispatch} />
    default:
      return null
  }
}
