import type { GameState, GameAction } from '../types';
import { getPlayerColor } from '../utils/colors';

let nextPlayerId = 1;

export const initialState: GameState = {
  phase: 'login',
  adminName: '',
  players: [],
  direction: 'clockwise',
  timerDuration: 60,
  soundEnabled: true,
  currentPlayerIndex: 0,
  timerRemaining: 60,
  timerRunning: false,
  timerExpired: false,
  turnCount: 0,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_ADMIN':
      return { ...state, adminName: action.name };

    case 'GO_TO_PLAYERS': {
      const adminPlayer = {
        id: `player-${nextPlayerId++}`,
        name: state.adminName,
        color: getPlayerColor(0),
        isAdmin: true,
        delayPenalties: 0,
      };
      return {
        ...state,
        phase: 'addPlayers',
        players: [adminPlayer],
      };
    }

    case 'ADD_PLAYER': {
      const newPlayer = {
        id: `player-${nextPlayerId++}`,
        name: action.name,
        color: getPlayerColor(state.players.length),
        isAdmin: false,
        delayPenalties: 0,
      };
      return {
        ...state,
        players: [...state.players, newPlayer],
      };
    }

    case 'REMOVE_PLAYER':
      return {
        ...state,
        players: state.players.filter((p) => p.id !== action.id),
      };

    case 'GO_TO_CONFIGURE':
      return { ...state, phase: 'configure' };

    case 'SET_DIRECTION':
      return { ...state, direction: action.direction };

    case 'SET_TIMER_DURATION':
      return { ...state, timerDuration: action.duration, timerRemaining: action.duration };

    case 'TOGGLE_SOUND':
      return { ...state, soundEnabled: !state.soundEnabled };

    case 'SET_FIRST_PLAYER':
      return { ...state, currentPlayerIndex: action.index };

    case 'START_GAME':
      return {
        ...state,
        phase: 'playing',
        timerRemaining: state.timerDuration,
        timerRunning: true,
        timerExpired: false,
        turnCount: 1,
      };

    case 'TICK_TIMER': {
      if (!state.timerRunning || state.timerExpired) return state;
      const next = state.timerRemaining - 1;
      if (next <= 0) {
        return { ...state, timerRemaining: 0, timerRunning: false, timerExpired: true };
      }
      return { ...state, timerRemaining: next };
    }

    case 'TIMER_EXPIRED': {
      const players = state.players.map((p, i) =>
        i === state.currentPlayerIndex
          ? { ...p, delayPenalties: p.delayPenalties + 1 }
          : p
      );
      return { ...state, players };
    }

    case 'ADVANCE_TURN': {
      const count = state.players.length;
      const delta = state.direction === 'clockwise' ? 1 : -1;
      const nextIndex = ((state.currentPlayerIndex + delta) % count + count) % count;
      return {
        ...state,
        currentPlayerIndex: nextIndex,
        timerRemaining: state.timerDuration,
        timerRunning: true,
        timerExpired: false,
        turnCount: state.turnCount + 1,
      };
    }

    case 'OVERRIDE_TURN':
      return {
        ...state,
        currentPlayerIndex: action.playerIndex,
        timerRemaining: state.timerDuration,
        timerRunning: true,
        timerExpired: false,
      };

    case 'BACK_TO_SETUP':
      return {
        ...state,
        phase: 'configure',
        timerRunning: false,
        timerExpired: false,
        timerRemaining: state.timerDuration,
      };

    default:
      return state;
  }
}
