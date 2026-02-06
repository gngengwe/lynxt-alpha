let audioContext: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext();
  }
  return audioContext;
}

function playTone(frequency: number, duration: number, volume: number = 0.15, type: OscillatorType = 'sine') {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = type;
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);

  gainNode.gain.setValueAtTime(volume, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

export function playTurnChime() {
  playTone(660, 0.15, 0.12);
  setTimeout(() => playTone(880, 0.2, 0.1), 120);
}

export function playTickBeep(urgency: number) {
  // urgency: 0 = calm, 1 = max urgency
  const freq = 400 + urgency * 400;
  const vol = 0.05 + urgency * 0.1;
  playTone(freq, 0.08, vol);
}

export function playPenaltyBloop() {
  playTone(300, 0.1, 0.15, 'square');
  setTimeout(() => playTone(200, 0.2, 0.12, 'square'), 100);
  setTimeout(() => playTone(150, 0.3, 0.1, 'sine'), 200);
}

export function playAdvanceWhoosh() {
  const ctx = getAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(200, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.15);

  gainNode.gain.setValueAtTime(0.08, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.2);
}
