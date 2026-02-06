export const PLAYER_COLORS = [
  '#00e5ff', // cyan
  '#ff4081', // magenta/pink
  '#ffab00', // amber
  '#00e676', // emerald
  '#ff6e40', // coral
  '#b388ff', // violet
  '#18ffff', // teal
  '#ff80ab', // rose
  '#ffd740', // gold
  '#69f0ae', // mint
  '#ea80fc', // orchid
  '#84ffff', // ice blue
];

export function getPlayerColor(index: number): string {
  return PLAYER_COLORS[index % PLAYER_COLORS.length];
}

export const PENALTY_ICONS = ['🐢', '⏳', '🐌', '💤'];

export function getPenaltyIcon(penaltyIndex: number): string {
  return PENALTY_ICONS[penaltyIndex % PENALTY_ICONS.length];
}
