let voices = [];
let preferredVoice = null;
let ttsMuted = false;
let ttsRate = 0.85;

function initTTS() {
  const loadVoices = () => {
    voices = window.speechSynthesis.getVoices();
    preferredVoice = voices.find(v => v.lang === 'en-US' && v.name.includes('Female'))
      || voices.find(v => v.lang === 'en-US')
      || voices[0];
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    loadVoices();
  }
  
  window.speechSynthesis.onvoiceschanged = loadVoices;
}

function speak(text, options = {}) {
  if (ttsMuted) return;
  
  window.speechSynthesis.cancel();
  
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || ttsRate;
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;
  
  if (preferredVoice) {
    utterance.voice = preferredVoice;
  }
  
  window.speechSynthesis.speak(utterance);
  return utterance;
}

function stopSpeaking() {
  window.speechSynthesis.cancel();
}

function setTTSRate(rate) {
  ttsRate = rate;
  localStorage.setItem('ttsRate', rate);
}

function setTTSMuted(muted) {
  ttsMuted = muted;
  localStorage.setItem('ttsMuted', muted);
  if (muted) {
    stopSpeaking();
  }
}

function loadTTSSettings() {
  const savedRate = localStorage.getItem('ttsRate');
  const savedMuted = localStorage.getItem('ttsMuted');
  
  if (savedRate) ttsRate = parseFloat(savedRate);
  if (savedMuted) ttsMuted = savedMuted === 'true';
}

function getAvailableVoices() {
  return voices;
}

function setPreferredVoice(voiceIndex) {
  if (voices[voiceIndex]) {
    preferredVoice = voices[voiceIndex];
    localStorage.setItem('preferredVoice', voiceIndex);
  }
}
