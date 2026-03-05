const WELLNESS = {
  stepReminderEnabled: true,
  stepReminderInterval: 2,
  leftArmReminderEnabled: true,
  lastStepReminder: 0,
  lastSessionTime: 0,
  leftArmNudgeShown: false,
  leftArmTaps: 0
};

function initWellness() {
  const savedSettings = localStorage.getItem('wellnessSettings');
  if (savedSettings) {
    const settings = JSON.parse(savedSettings);
    WELLNESS.stepReminderEnabled = settings.stepReminderEnabled !== false;
    WELLNESS.stepReminderInterval = settings.stepReminderInterval || 2;
    WELLNESS.leftArmReminderEnabled = settings.leftArmReminderEnabled !== false;
    WELLNESS.lastStepReminder = parseInt(localStorage.getItem('lastStepReminder') || '0');
    WELLNESS.lastSessionTime = parseInt(localStorage.getItem('lastSessionTime') || '0');
  }
}

function saveWellnessSettings() {
  localStorage.setItem('wellnessSettings', JSON.stringify({
    stepReminderEnabled: WELLNESS.stepReminderEnabled,
    stepReminderInterval: WELLNESS.stepReminderInterval,
    leftArmReminderEnabled: WELLNESS.leftArmReminderEnabled
  }));
}

function setStepReminderEnabled(enabled) {
  WELLNESS.stepReminderEnabled = enabled;
  saveWellnessSettings();
}

function setStepReminderInterval(hours) {
  WELLNESS.stepReminderInterval = hours;
  saveWellnessSettings();
}

function setLeftArmReminderEnabled(enabled) {
  WELLNESS.leftArmReminderEnabled = enabled;
  saveWellnessSettings();
}

function checkStepReminderNeeded() {
  if (!WELLNESS.stepReminderEnabled) return false;
  
  const now = Date.now();
  const hoursSinceLastReminder = (now - WELLNESS.lastStepReminder) / (1000 * 60 * 60);
  
  return hoursSinceLastReminder >= WELLNESS.stepReminderInterval;
}

function markStepReminderShown() {
  WELLNESS.lastStepReminder = Date.now();
  localStorage.setItem('lastStepReminder', WELLNESS.lastStepReminder.toString());
}

function shouldShowLeftArmNudge(currentPuzzleIndex) {
  if (!WELLNESS.leftArmReminderEnabled) return false;
  if (WELLNESS.leftArmNudgeShown) return false;
  return currentPuzzleIndex === 4;
}

function resetLeftArmNudge() {
  WELLNESS.leftArmNudgeShown = false;
  WELLNESS.leftArmTaps = 0;
}

function recordLeftArmTap() {
  WELLNESS.leftArmTaps++;
  return WELLNESS.leftArmTaps >= 5;
}

function markLeftArmNudgeShown() {
  WELLNESS.leftArmNudgeShown = true;
}

function getWellnessSettings() {
  return {
    stepReminderEnabled: WELLNESS.stepReminderEnabled,
    stepReminderInterval: WELLNESS.stepReminderInterval,
    leftArmReminderEnabled: WELLNESS.leftArmReminderEnabled
  };
}

function startGameSession() {
  WELLNESS.lastSessionTime = Date.now();
  localStorage.setItem('lastSessionTime', WELLNESS.lastSessionTime.toString());
  WELLNESS.leftArmNudgeShown = false;
  WELLNESS.leftArmTaps = 0;
}

function getTimeSinceLastSession() {
  return (Date.now() - WELLNESS.lastSessionTime) / (1000 * 60 * 60);
}
