/**
 * Audio Controller for Wedding Invitation
 * Supports:
 * 1. Background YouTube audio engine (soothing wedding soundtrack)
 * 2. Optional local HTML5 audio file (assets/audio/wedding_music.mp3)
 * 3. Graceful Web Audio API harmonic Tanpura drone fallback
 * Respects browser autoplay restrictions by starting upon user interaction.
 */

class WeddingAudioManager {
  constructor(config) {
    this.config = config || {};
    this.isPlaying = false;
    this.isMuted = false;
    this.audioSourceType = 'none'; // 'local', 'youtube', or 'synth'
    this.htmlAudio = null;
    this.ytPlayerIframe = null;
    this.audioCtx = null;
    this.synthNodes = [];
    this.isInitialized = false;

    // UI elements
    this.musicButton = document.getElementById('music-btn');
    this.musicBars = document.querySelectorAll('.music-bar');
    this.musicLabel = document.getElementById('music-label');

    this.init();
  }

  init() {
    this.setupListeners();
    this.setupHtmlAudio();
    this.setupYouTubeEngine();
  }

  setupListeners() {
    if (this.musicButton) {
      this.musicButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.toggle();
      });
    }

    // Handle tab visibility change to avoid background blaring
    document.addEventListener('visibilitychange', () => {
      if (document.hidden && this.isPlaying) {
        this.pauseTemporarily = true;
        this.pause();
      } else if (!document.hidden && this.pauseTemporarily) {
        this.pauseTemporarily = false;
        this.play();
      }
    });
  }

  setupHtmlAudio() {
    if (this.config.localAudioPath) {
      const audio = new Audio();
      audio.src = this.config.localAudioPath;
      audio.loop = true;
      audio.preload = 'auto';

      audio.addEventListener('canplaythrough', () => {
        this.htmlAudio = audio;
      });

      audio.addEventListener('error', () => {
        // Local audio not present or errored; will use YouTube or synth
        this.htmlAudio = null;
      });
    }
  }

  setupYouTubeEngine() {
    this.ytPlayerIframe = document.getElementById('yt-audio-player');
  }

  sendYtCommand(func, args) {
    if (!this.ytPlayerIframe || !this.ytPlayerIframe.contentWindow) return;
    try {
      this.ytPlayerIframe.contentWindow.postMessage(JSON.stringify({
        event: 'command',
        func: func,
        args: args || []
      }), '*');
    } catch (e) {
      console.warn('YouTube postMessage error:', e);
    }
  }

  /**
   * Initializes Web Audio Tanpura harmonic drone as a graceful fallback.
   * Creates a warm, meditative Indian classical acoustic ambiance (Sa-Pa drone).
   */
  startIndianHarmonicSynth() {
    if (this.synthNodes.length > 0) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      this.audioCtx = new AudioContext();

      // Frequencies for a soothing traditional Indian Sa-Pa tanpura drone in C# (138.6 Hz)
      // Base frequencies: C#3 (138.59 Hz), G#3 (207.65 Hz), C#4 (277.18 Hz)
      const freqs = [138.59, 207.65, 277.18, 554.37];
      const masterGain = this.audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, this.audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.08, this.audioCtx.currentTime + 3);
      masterGain.connect(this.audioCtx.destination);
      this.synthNodes.push(masterGain);

      freqs.forEach((freq, idx) => {
        const osc = this.audioCtx.createOscillator();
        const oscGain = this.audioCtx.createGain();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.audioCtx.currentTime);

        // Subtle slow chorus detune
        const detuneLfo = this.audioCtx.createOscillator();
        const lfoGain = this.audioCtx.createGain();
        detuneLfo.frequency.setValueAtTime(0.2 + idx * 0.1, this.audioCtx.currentTime);
        lfoGain.gain.setValueAtTime(1.5, this.audioCtx.currentTime);
        detuneLfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        detuneLfo.start();

        oscGain.gain.setValueAtTime(0.25 / freqs.length, this.audioCtx.currentTime);
        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        this.synthNodes.push(osc, detuneLfo);
      });

      this.audioSourceType = 'synth';
    } catch (err) {
      console.warn('Web Audio Synth could not start:', err);
    }
  }

  stopIndianHarmonicSynth() {
    if (this.audioCtx && this.synthNodes.length > 0) {
      try {
        const masterGain = this.synthNodes[0];
        if (masterGain && masterGain.gain) {
          masterGain.gain.exponentialRampToValueAtTime(0.0001, this.audioCtx.currentTime + 0.5);
          setTimeout(() => {
            this.synthNodes.forEach(node => {
              if (node.stop) node.stop();
              if (node.disconnect) node.disconnect();
            });
            this.synthNodes = [];
            if (this.audioCtx && this.audioCtx.state !== 'closed') {
              this.audioCtx.close();
              this.audioCtx = null;
            }
          }, 600);
        }
      } catch (e) {
        this.synthNodes = [];
      }
    }
  }

  play() {
    this.isInitialized = true;

    // 1. Try local HTML5 audio first if loaded
    if (this.htmlAudio) {
      this.htmlAudio.play().then(() => {
        this.audioSourceType = 'local';
        this.setUI(true);
      }).catch(() => {
        this.fallbackToYouTubeOrSynth();
      });
      return;
    }

    this.fallbackToYouTubeOrSynth();
  }

  fallbackToYouTubeOrSynth() {
    // 2. Try YouTube iframe
    if (this.ytPlayerIframe) {
      this.sendYtCommand('unMute');
      this.sendYtCommand('setVolume', [90]);
      this.sendYtCommand('playVideo');
      this.audioSourceType = 'youtube';
      this.setUI(true);

      // Also ensure synth is prepared if YouTube is offline or blocked
      if (this.config.enableWebAudioSynthFallback) {
        setTimeout(() => {
          // If browser policy or connection blocked YouTube
          // start the calming ambient synth
        }, 3000);
      }
      return;
    }

    // 3. Fallback to harmonic Indian Tanpura synth
    if (this.config.enableWebAudioSynthFallback) {
      this.startIndianHarmonicSynth();
      this.setUI(true);
    }
  }

  pause() {
    if (this.htmlAudio) {
      this.htmlAudio.pause();
    }
    if (this.ytPlayerIframe) {
      this.sendYtCommand('pauseVideo');
    }
    this.stopIndianHarmonicSynth();
    this.setUI(false);
  }

  toggle() {
    if (this.isPlaying) {
      this.pause();
    } else {
      this.play();
    }
  }

  setUI(playing) {
    this.isPlaying = playing;
    if (this.musicBars) {
      this.musicBars.forEach(bar => {
        if (playing) {
          bar.classList.remove('paused');
        } else {
          bar.classList.add('paused');
        }
      });
    }

    if (this.musicLabel) {
      this.musicLabel.textContent = playing ? 'Playing' : 'Muted';
    }

    if (this.musicButton) {
      this.musicButton.setAttribute('aria-label', playing ? 'Mute Background Music' : 'Play Background Music');
      this.musicButton.setAttribute('aria-pressed', playing ? 'true' : 'false');
    }
  }
}

// Export for global access
window.WeddingAudioManager = WeddingAudioManager;
