/**
 * Tiny Web Audio click utility.
 *
 * Synthesizes a short tone on demand — no asset, no dependency. Used for
 * tactile feedback on intentional user actions (e.g., theme toggle).
 *
 * Lazy-singleton AudioContext: created on first call, reused thereafter
 * to avoid the browser warning about creating many AudioContexts.
 */

let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  const AC =
    window.AudioContext ||
    (window as unknown as { webkitAudioContext?: typeof AudioContext })
      .webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  return ctx;
}

export interface PlayClickOptions {
  /** Frequency in Hz. Default 880. */
  freq?: number;
  /** Volume 0..1. Default 0.06. */
  volume?: number;
  /** Decay length in seconds. Default 0.08. */
  duration?: number;
  /** Oscillator waveform. Default "triangle". */
  type?: OscillatorType;
}

/**
 * Play a soft click. No-ops on the server or in browsers without Web Audio.
 * Must be invoked from a user gesture (e.g., onClick) for autoplay-policy
 * compliance.
 */
export function playClick(opts: PlayClickOptions = {}): void {
  const c = getCtx();
  if (!c) return;

  if (c.state === "suspended") {
    c.resume().catch(() => {
      /* ignore — context will simply stay suspended */
    });
  }

  const {
    freq = 880,
    volume = 0.06,
    duration = 0.08,
    type = "triangle",
  } = opts;

  const osc = c.createOscillator();
  const gain = c.createGain();
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.value = volume;
  osc.connect(gain).connect(c.destination);

  const now = c.currentTime;
  osc.start(now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
  osc.stop(now + duration + 0.02);
}
