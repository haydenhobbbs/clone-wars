(function () {
  let audio = null;
  function getAudio() {
    if (!audio) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      audio = new AudioCtx();
    }
    if (audio.state === 'suspended') audio.resume();
    return audio;
  }

  function tone(context, start, frequency, endFrequency, duration, gainAmount, type) {
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    oscillator.type = type;
    oscillator.frequency.setValueAtTime(frequency, start);
    oscillator.frequency.exponentialRampToValueAtTime(Math.max(30, endFrequency), start + duration);
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(gainAmount, start + 0.01);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(start);
    oscillator.stop(start + duration + 0.02);
  }

  window.SOUNDS = {
    flap: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        // A quick, bright laser pew for the player's launch.
        tone(context, now, 980, 220, 0.12, 0.16, 'square');
      } catch (error) {}
    },
    score: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        // A rising sweep gives the brief rush of a hyperspace whoosh.
        tone(context, now, 180, 1100, 0.28, 0.14, 'sine');
      } catch (error) {}
    },
    crash: function () {
      try {
        const context = getAudio();
        if (!context) return;
        const now = context.currentTime;
        // Two descending bursts make a compact original explosion.
        tone(context, now, 150, 38, 0.24, 0.2, 'sawtooth');
        tone(context, now + 0.02, 72, 28, 0.3, 0.12, 'square');
      } catch (error) {}
    }
  };
})();
