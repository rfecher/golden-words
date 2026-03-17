let currentScreen = 'home';
let hasInteracted = false;

function initApp() {
  loadTTSSettings();
  initTTS();
  initSTT();
  initWellness();
  
  setupEventListeners();
  
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(err => {
      console.log('SW registration failed:', err);
    });
  }
  
  setupInstallPrompt();
  
  setTimeout(() => {
    if (!hasInteracted && !localStorage.getItem('visited')) {
      showInstallPrompt();
    }
    localStorage.setItem('visited', 'true');
  }, 30000);
  
  renderHomeScreen();
}

function setupEventListeners() {
  document.addEventListener('click', () => {
    if (!hasInteracted) {
      hasInteracted = true;
    }
  }, { once: true });
  
  document.addEventListener('touchstart', () => {
    if (!hasInteracted) {
      hasInteracted = true;
    }
  }, { once: true });
}

function navigateTo(screen) {
  currentScreen = screen;
  
  switch(screen) {
    case 'home':
      renderHomeScreen();
      break;
    case 'settings':
      renderSettingsScreen();
      break;
    case 'game':
      break;
  }
}

function renderHomeScreen() {
  const container = document.getElementById('app-container');
  
  container.innerHTML = `
    <div class="left-attention-zone">
      <div class="floating-star">★</div>
      <div class="floating-star delay-1">★</div>
      <div class="floating-star delay-2">★</div>
    </div>
    <div class="home-screen">
      <div class="title-section">
        <h1 class="game-title">
          <span class="title-star">★</span> Golden Words
        </h1>
        <p class="subtitle">Your puzzle game — made with love</p>
      </div>
      <div class="menu-buttons">
        <button class="menu-btn trivia-btn" onclick="startGame('trivia')">
          <span class="btn-icon">🎵</span>
          <span class="btn-text">Golden Trivia</span>
          <span class="btn-subtitle">50s & 60s clues</span>
        </button>
        <button class="menu-btn family-btn" onclick="startGame('family')">
          <span class="btn-icon">👨‍👩‍👧‍👦</span>
          <span class="btn-text">Family Round</span>
          <span class="btn-subtitle">Words from the kids</span>
        </button>
      </div>
      <button class="settings-btn" onclick="navigateTo('settings')">
        ⚙️ Settings
      </button>
    </div>
  `;
  
  setTimeout(() => {
    if (hasInteracted) {
      speak("Welcome to Golden Words! Tap Golden Trivia or Family Round to play.", { rate: 0.85 });
    }
  }, 500);
}

function startGame(mode) {
  const gameContainer = document.getElementById('app-container');
  gameContainer.innerHTML = `
    <div id="game-container"></div>
  `;
  
  currentScreen = 'game';
  initGame(mode);
}

function renderSettingsScreen() {
  const container = document.getElementById('app-container');
  const settings = getWellnessSettings();
  const voices = getAvailableVoices();
  
  let voiceOptions = '';
  voices.forEach((voice, i) => {
    voiceOptions += `<option value="${i}">${voice.name}</option>`;
  });
  
  container.innerHTML = `
    <div class="left-attention-zone">
      <div class="floating-star">★</div>
    </div>
    <div class="settings-screen">
      <h1>Settings</h1>
      
      <div class="settings-section">
        <h2>🔊 Speech</h2>
        
        <div class="setting-item">
          <label>Speed</label>
          <input type="range" id="speed-slider" min="0.5" max="1.2" step="0.1" value="${ttsRate}" 
            onchange="updateTTSSpeed(this.value)">
          <span class="speed-label">${ttsRate === 0.7 ? 'Slow' : ttsRate === 0.85 ? 'Normal' : 'Fast'}</span>
        </div>
        
        <div class="setting-item">
          <label>Mute</label>
          <button id="mute-toggle" class="toggle-btn ${ttsMuted ? 'off' : 'on'}" 
            onclick="toggleMute()">
            ${ttsMuted ? 'OFF' : 'ON'}
          </button>
        </div>
        
        <div class="setting-item">
          <label>Voice</label>
          <select id="voice-select" onchange="changeVoice(this.value)">
            ${voiceOptions || '<option>Default</option>'}
          </select>
        </div>
        
        <button class="test-voice-btn" onclick="testVoice()">
          🔊 Test Voice
        </button>
      </div>
      
      <div class="settings-section">
        <h2>💚 Wellness</h2>
        
        <div class="setting-item">
          <label>Step Reminders</label>
          <button id="step-toggle" class="toggle-btn ${settings.stepReminderEnabled ? 'on' : 'off'}"
            onclick="toggleStepReminder()">
            ${settings.stepReminderEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
        
        <div class="setting-item">
          <label>Step Reminder Every</label>
          <select id="step-interval" onchange="changeStepInterval(this.value)">
            <option value="1" ${settings.stepReminderInterval === 1 ? 'selected' : ''}>1 hour</option>
            <option value="2" ${settings.stepReminderInterval === 2 ? 'selected' : ''}>2 hours</option>
            <option value="3" ${settings.stepReminderInterval === 3 ? 'selected' : ''}>3 hours</option>
          </select>
        </div>
        
        <div class="setting-item">
          <label>Left Arm Nudges</label>
          <button id="arm-toggle" class="toggle-btn ${settings.leftArmReminderEnabled ? 'on' : 'off'}"
            onclick="toggleLeftArmReminder()">
            ${settings.leftArmReminderEnabled ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
      
      <div class="settings-section">
        <h2>ℹ️ About</h2>
        <p class="about-text">Golden Words was made especially for you, with love from your family.</p>
      </div>
      
      <div class="settings-section danger-zone">
        <button class="clear-data-btn" onclick="clearAllData()">
          Clear All Data
        </button>
      </div>
      
      <button class="back-btn" onclick="navigateTo('home')">
        ← Back
      </button>
    </div>
  `;
}

function updateTTSSpeed(value) {
  setTTSRate(parseFloat(value));
  const label = document.querySelector('.speed-label');
  if (label) {
    const labels = { 0.7: 'Slow', 0.85: 'Normal', 1.0: 'Fast' };
    label.textContent = labels[value] || 'Normal';
  }
}

function toggleMute() {
  setTTSMuted(!ttsMuted);
  const btn = document.getElementById('mute-toggle');
  btn.classList.toggle('on');
  btn.classList.toggle('off');
  btn.textContent = ttsMuted ? 'OFF' : 'ON';
}

function changeVoice(index) {
  setPreferredVoice(parseInt(index));
}

function testVoice() {
  speak("This is how your voice will sound. Hello, Grandma!", { rate: 0.85 });
}

function toggleStepReminder() {
  setStepReminderEnabled(!WELLNESS.stepReminderEnabled);
  const btn = document.getElementById('step-toggle');
  btn.classList.toggle('on');
  btn.classList.toggle('off');
  btn.textContent = WELLNESS.stepReminderEnabled ? 'ON' : 'OFF';
}

function changeStepInterval(value) {
  setStepReminderInterval(parseInt(value));
}

function toggleLeftArmReminder() {
  setLeftArmReminderEnabled(!WELLNESS.leftArmReminderEnabled);
  const btn = document.getElementById('arm-toggle');
  btn.classList.toggle('on');
  btn.classList.toggle('off');
  btn.textContent = WELLNESS.leftArmReminderEnabled ? 'ON' : 'OFF';
}

function clearAllData() {
  if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
    localStorage.clear();
    location.reload();
  }
}

let deferredPrompt = null;

function setupInstallPrompt() {
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });
  
  window.addEventListener('appinstalled', () => {
    deferredPrompt = null;
    hideInstallBanner();
  });
}

function showInstallBanner() {
  const existing = document.getElementById('install-banner');
  if (existing) return;
  
  const banner = document.createElement('div');
  banner.id = 'install-banner';
  banner.innerHTML = `
    <p>Add Golden Words to your home screen for easy access!</p>
    <button onclick="promptInstall()">Add to Home Screen</button>
    <button onclick="hideInstallBanner()">Not now</button>
  `;
  document.body.appendChild(banner);
}

function hideInstallBanner() {
  const banner = document.getElementById('install-banner');
  if (banner) banner.remove();
}

async function promptInstall() {
  if (deferredPrompt) {
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    deferredPrompt = null;
  }
  const banner = document.getElementById('install-banner');
  if (banner) banner.remove();
}

function showInstallPrompt() {
  showInstallBanner();
}

document.addEventListener('DOMContentLoaded', initApp);
