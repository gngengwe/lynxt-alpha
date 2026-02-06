export type GamePhase = 'login' | 'addPlayers' | 'configure' | 'playing';
export type Direction = 'clockwise' | 'counterclockwise';

export interface Player {
  id: string;
  name: string;
  color: string;
  isAdmin: boolean;
  delayPenalties: number;
}

export interface GameState {
  phase: GamePhase;
  adminName: string;
  players: Player[];
  direction: Direction;
  timerDuration: number;
  soundEnabled: boolean;
  currentPlayerIndex: number;
  timerRemaining: number;
  timerRunning: boolean;
  timerExpired: boolean;
  turnCount: number;
}

export type GameAction =
  | { type: 'SET_ADMIN'; name: string }
  | { type: 'GO_TO_PLAYERS' }
  | { type: 'ADD_PLAYER'; name: string }
  | { type: 'REMOVE_PLAYER'; id: string }
  | { type: 'GO_TO_CONFIGURE' }
  | { type: 'SET_DIRECTION'; direction: Direction }
  | { type: 'SET_TIMER_DURATION'; duration: number }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'SET_FIRST_PLAYER'; index: number }
  | { type: 'START_GAME' }
  | { type: 'ADVANCE_TURN' }
  | { type: 'TICK_TIMER' }
  | { type: 'TIMER_EXPIRED' }
  | { type: 'OVERRIDE_TURN'; playerIndex: number }
  | { type: 'BACK_TO_SETUP' };
