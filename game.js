const GAME = {
  puzzles: [],
  currentPuzzleIndex: 0,
  score: 0,
  hintsUsed: 0,
  currentAnswer: [],
  availableLetters: [],
  gameMode: null,
  isListening: false,
  sessionComplete: false
};

function initGame(mode) {
  try {
    console.log('Starting game with mode:', mode);
    GAME.gameMode = mode;
    GAME.puzzles = getPuzzleSet();
    console.log('Puzzles loaded:', GAME.puzzles.length);
    GAME.currentPuzzleIndex = 0;
    GAME.score = 0;
    GAME.sessionComplete = false;
    
    startGameSession();
    
    loadPuzzle(GAME.currentPuzzleIndex);
  } catch (e) {
    console.error('Error starting game:', e);
    alert('Error starting game: ' + e.message);
  }
}

window.startGame = initGame;

function loadPuzzle(index) {
  if (index >= GAME.puzzles.length) {
    endGame();
    return;
  }
  
  const puzzle = GAME.puzzles[index];
  GAME.hintsUsed = 0;
  GAME.currentAnswer = [];
  
  if (puzzle.mode === 'trivia') {
    GAME.availableLetters = getJumbledLetters(puzzle.answer);
  } else {
    GAME.availableLetters = shuffleString(puzzle.scrambled).split('');
  }
  
  renderPuzzle();
  
  setTimeout(() => {
    readPuzzle(puzzle);
  }, 600);
}

function readPuzzle(puzzle) {
  if (puzzle.mode === 'family') {
    speak(puzzle.hostLine, { rate: 0.9 });
    setTimeout(() => {
      speak(puzzle.clue, { rate: 0.85 });
    }, 1500);
  } else {
    speak(puzzle.clue, { rate: 0.85 });
  }
}

function renderPuzzle() {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  const container = document.getElementById('game-container');
  
  let html = `
    <div class="game-header">
      <span class="category-badge">${puzzle.mode === 'trivia' ? puzzle.category.toUpperCase() : 'FAMILY'}</span>
      <span class="star-score">${getStarDisplay()}</span>
      <button id="read-again-btn" class="read-again-btn" onclick="readCurrentPuzzle()">
        <span class="icon">🔊</span> Read Again
      </button>
    </div>
    <div class="left-attention-zone">
      <div class="floating-star">★</div>
    </div>
    <div class="game-content">
  `;
  
  if (puzzle.mode === 'family') {
    html += renderFamilyRound(puzzle);
  } else {
    html += renderTriviaRound(puzzle);
  }
  
  html += `
    </div>
    <div class="game-controls">
      <button id="hint-btn" class="control-btn hint-btn" onclick="useHint()">
        💡 Hint
      </button>
      <button id="clear-btn" class="control-btn clear-btn" onclick="clearAnswer()">
        ↩ Clear
      </button>
      <button id="skip-btn" class="control-btn skip-btn" onclick="skipPuzzle()">
        Skip
      </button>
      <button id="speak-btn" class="control-btn speak-btn" onclick="toggleSpeechInput()">
        🎤 Speak Answer
      </button>
    </div>
  `;
  
  container.innerHTML = html;
}

function renderFamilyRound(puzzle) {
  const avatarHtml = getHostAvatar(puzzle.host);
  
  return `
    ${avatarHtml}
    <div class="clue-card">
      <p class="clue-text">${puzzle.clue}</p>
    </div>
    <div class="puzzle-display scramble-display">
      ${renderScrambleAnswer()}
    </div>
    <div class="letter-tiles">
      ${GAME.availableLetters.map((letter, i) => `
        <button class="letter-tile" data-letter="${letter}" onclick="selectLetter('${letter}', ${i})">${letter}</button>
      `).join('')}
    </div>
  `;
}

function renderTriviaRound(puzzle) {
  return `
    <div class="clue-card">
      <p class="clue-text">${puzzle.clue}</p>
    </div>
    <div class="puzzle-display fill-blank-display">
      ${renderFillBlankAnswer()}
    </div>
    <div class="letter-tiles">
      ${GAME.availableLetters.map((letter, i) => `
        <button class="letter-tile" data-letter="${letter}" onclick="selectLetter('${letter}', ${i})">${letter}</button>
      `).join('')}
    </div>
  `;
}

function renderScrambleAnswer() {
  const answerLength = GAME.puzzles[GAME.currentPuzzleIndex].answer.length;
  return GAME.currentAnswer.map((item, i) => `
    <div class="answer-slot filled" onclick="removeLetter(${i})">${item.letter}</div>
  `).join('') + 
  Array(Math.max(0, answerLength - GAME.currentAnswer.length)).fill(0).map(() => `
    <div class="answer-slot empty"></div>
  `).join('');
}

function renderFillBlankAnswer() {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  const display = puzzle.display;
  let answerIndex = 0;
  
  // Count how many blanks there are
  const blankCount = (display.match(/_/g) || []).length;
  
  return display.split('').map(char => {
    if (char === '_') {
      if (answerIndex < GAME.currentAnswer.length) {
        const letter = GAME.currentAnswer[answerIndex].letter;
        answerIndex++;
        return `<div class="answer-slot filled" onclick="removeLetter(${answerIndex - 1})">${letter}</div>`;
      }
      return '<div class="answer-slot empty"></div>';
    }
    if (char === ' ') {
      return '<div class="answer-slot space"></div>';
    }
    return `<div class="answer-slot permanent">${char}</div>`;
  }).join('');
}

function getExpectedAnswer() {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  const display = puzzle.display;
  const answer = puzzle.answer;
  let result = '';
  
  // Align display with answer by position, skipping spaces in both
  let displayIdx = 0;
  let answerIdx = 0;
  
  while (displayIdx < display.length && answerIdx < answer.length) {
    const d = display[displayIdx];
    const a = answer[answerIdx];
    
    if (d === ' ') {
      displayIdx++;
      continue;
    }
    if (a === ' ') {
      answerIdx++;
      continue;
    }
    
    if (d === '_') {
      result += a;
    }
    displayIdx++;
    answerIdx++;
  }
  
  return result;
}

function getHostAvatar(host) {
  const avatars = {
    richie: '<div class="avatar richie"><div class="avatar-face"><div class="hair"></div><div class="eyes"><div class="eye"></div><div class="eye"></div></div><div class="mouth smile"></div></div><div class="speech-bubble">Hey Grandma!</div></div>',
    allison: '<div class="avatar allison"><div class="avatar-face pigtails"><div class="pigtail left"></div><div class="pigtail right"></div><div class="eyes"><div class="eye"></div><div class="eye"></div></div><div class="mouth smile"></div></div><div class="speech-bubble">Hi!</div></div>',
    will: '<div class="avatar will"><div class="avatar-face baby"><div class="hair-tuft"></div><div class="eyes"><div class="eye"></div><div class="eye"></div></div><div class="mouth open">Aa</div></div><div class="speech-bubble">Ba ba!</div></div>',
    all: '<div class="avatar all"><div class="avatar-face"><div class="eyes"><div class="eye"></div><div class="eye"></div></div><div class="mouth smile"></div></div><div class="speech-bubble">We love you!</div></div>'
  };
  
  return avatars[host] || avatars.all;
}

function getJumbledLetters(answer) {
  const letters = answer.replace(/\s/g, '').split('');
  return shuffleString(letters.join('')).split('');
}

function shuffleString(str) {
  const arr = str.split('');
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.join('');
}

function selectLetter(letter, index) {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  let maxLetters;
  
  if (puzzle.mode === 'family') {
    maxLetters = puzzle.answer.length;
  } else {
    // For trivia, count the blanks in the display
    maxLetters = (puzzle.display.match(/_/g) || []).length;
  }
  
  if (GAME.currentAnswer.length >= maxLetters) return;
  
  GAME.currentAnswer.push({ letter, index });
  
  GAME.availableLetters.splice(index, 1);
  
  renderPuzzle();
  checkAnswer();
}

function removeLetter(answerIndex) {
  const removed = GAME.currentAnswer.splice(answerIndex, 1)[0];
  GAME.availableLetters.splice(removed.index, 0, removed.letter);
  
  renderPuzzle();
}

function clearAnswer() {
  while (GAME.currentAnswer.length > 0) {
    const removed = GAME.currentAnswer.pop();
    GAME.availableLetters.splice(removed.index, 0, removed.letter);
  }
  renderPuzzle();
}

function useHint() {
  if (GAME.hintsUsed >= 2) return;
  
  GAME.hintsUsed++;
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  
  speak(puzzle.hint || 'Try thinking about it differently', { rate: 0.85 });
  
  updateHintButton();
}

function updateHintButton() {
  const hintBtn = document.getElementById('hint-btn');
  if (hintBtn) {
    if (GAME.hintsUsed >= 2) {
      hintBtn.disabled = true;
      hintBtn.classList.add('used');
    }
  }
}

function skipPuzzle() {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  const feedback = `So close! The answer was ${puzzle.answer}. Lets keep going!`;
  speak(feedback, { rate: 0.85 });
  
  GAME.score += 0;
  nextPuzzle();
}

function checkAnswer() {
  const expected = getExpectedAnswer();
  const currentString = GAME.currentAnswer.map(a => a.letter).join('');
  
  // Only check when user has entered all required letters
  if (currentString.length < expected.length) {
    return;
  }
  
  console.log('checkAnswer:', currentString, '==', expected, '=', currentString === expected);
  
  if (currentString === expected) {
    console.log('Correct! Calling onCorrectAnswer');
    onCorrectAnswer();
  }
}

function onCorrectAnswer() {
  let stars;
  if (GAME.hintsUsed === 0) {
    stars = 3;
  } else if (GAME.hintsUsed === 1) {
    stars = 2;
  } else {
    stars = 1;
  }
  
  GAME.score += stars;
  
  const messages = [
    "That's right! Wonderful!",
    "Perfect! You did it!",
    "Amazing! Keep it up!",
    "Fantastic work!"
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  speak(message, { rate: 0.9 });
  
  showConfetti();
  
  setTimeout(() => {
    nextPuzzle();
  }, 2000);
}

function onIncorrectAnswer() {
  const messages = [
    "Good try! Keep going!",
    "Not quite, but you're doing great!",
    "Almost there! Give it another shot!",
    "That's okay! Try again!"
  ];
  
  const message = messages[Math.floor(Math.random() * messages.length)];
  speak(message, { rate: 0.85 });
}

function nextPuzzle() {
  GAME.currentPuzzleIndex++;
  
  if (GAME.currentPuzzleIndex === 5 && shouldShowLeftArmNudge(5)) {
    showLeftArmNudge();
    return;
  }
  
  if (GAME.currentPuzzleIndex >= GAME.puzzles.length) {
    endGame();
    return;
  }
  
  loadPuzzle(GAME.currentPuzzleIndex);
}

function endGame() {
  GAME.sessionComplete = true;
  showVictoryScreen();
}

function showVictoryScreen() {
  const container = document.getElementById('game-container');
  const maxScore = GAME.puzzles.length * 3;
  const percentage = Math.round((GAME.score / maxScore) * 100);
  
  let message;
  if (percentage >= 90) {
    message = "Absolutely wonderful! You're a star!";
  } else if (percentage >= 70) {
    message = "Great job! Keep playing and you'll get even better!";
  } else {
    message = "Good try! Every puzzle helps keep your mind sharp!";
  }
  
  speak("Congratulations! You've completed the game! " + message, { rate: 0.85 });
  
  container.innerHTML = `
    <div class="victory-screen">
      <div class="confetti-container">
        ${generateConfetti()}
      </div>
      <h1>Wonderful!</h1>
      <p class="victory-message">${message}</p>
      <div class="final-score">
        <span class="score-label">Your Score</span>
        <span class="score-stars">${getStarDisplay(GAME.score)}</span>
        <span class="score-number">${GAME.score} / ${maxScore}</span>
      </div>
      <div class="photo-frame">
        <p>Your family loves you ❤️</p>
      </div>
      <button class="play-again-btn" onclick="returnToHome()">
        Play Again
      </button>
    </div>
  `;
  
  checkStepReminderNeeded();
}

function generateConfetti() {
  const colors = ['#D4A017', '#8B2FC9', '#2E7D32', '#FF6B6B', '#4ECDC4'];
  let html = '';
  for (let i = 0; i < 50; i++) {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const delay = Math.random() * 2;
    const size = 8 + Math.random() * 8;
    html += `<div class="confetti" style="left: ${left}%; background: ${color}; animation-delay: ${delay}s; width: ${size}px; height: ${size}px;"></div>`;
  }
  return html;
}

function getStarDisplay(score = null) {
  const s = score !== null ? score : GAME.score;
  return '⭐'.repeat(Math.ceil(s / 3)) + '♡'.repeat(Math.max(0, Math.floor((GAME.puzzles.length * 3 - s) / 3)));
}

function readCurrentPuzzle() {
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  readPuzzle(puzzle);
}

function toggleSpeechInput() {
  if (GAME.isListening) {
    stopListening();
    return;
  }
  
  const puzzle = GAME.puzzles[GAME.currentPuzzleIndex];
  
  speak("I'm listening...", { rate: 0.9 });
  
  GAME.isListening = true;
  const speakBtn = document.getElementById('speak-btn');
  speakBtn.classList.add('listening');
  
  const started = startListening(
    (results) => {
      GAME.isListening = false;
      speakBtn.classList.remove('listening');
      
      if (matchSpokenAnswer(results, puzzle.answer)) {
        GAME.currentAnswer = puzzle.answer.replace(/\s/g, '').split('').map(l => ({ letter: l }));
        onCorrectAnswer();
      } else {
        const spoken = results[0];
        speak(`I heard "${spoken}". Let me try again!`, { rate: 0.85 });
      }
    },
    (error) => {
      GAME.isListening = false;
      speakBtn.classList.remove('listening');
      
      if (error === 'no-speech') {
        speak("I didn't hear anything. Let's use the buttons instead!", { rate: 0.85 });
      } else {
        speak("Let's use the buttons instead!", { rate: 0.85 });
      }
    },
    () => {
      GAME.isListening = false;
      if (speakBtn) speakBtn.classList.remove('listening');
    }
  );
  
  if (!started) {
    speak("Let's use the buttons instead!", { rate: 0.85 });
    GAME.isListening = false;
  }
}

function returnToHome() {
  navigateTo('home');
}

function showConfetti() {
  const existing = document.querySelector('.confetti-overlay');
  if (existing) existing.remove();
  
  const overlay = document.createElement('div');
  overlay.className = 'confetti-overlay';
  overlay.innerHTML = generateConfetti();
  document.body.appendChild(overlay);
  
  setTimeout(() => overlay.remove(), 3000);
}

function showLeftArmNudge() {
  const container = document.getElementById('game-container');
  
  speak("Time for a little stretch! Try tapping the screen 5 times with your left hand!", { rate: 0.85 });
  
  WELLNESS.leftArmTaps = 0;
  
  container.innerHTML = `
    <div class="wellness-break">
      <div class="left-arm-card">
        <h2>💪 Left Arm Stretch</h2>
        <p class="stretch-instruction">Tap anywhere 5 times with your LEFT hand!</p>
        <div class="left-hand-graphic">
          <div class="hand">👈</div>
        </div>
        <p class="tap-count">Taps: <span id="tap-counter">0</span> / 5</p>
        <button class="skip-stretch-btn" onclick="skipLeftArmNudge()">
          Skip
        </button>
      </div>
    </div>
  `;
  
  document.querySelector('.wellness-break').addEventListener('click', handleLeftArmTap);
}

function handleLeftArmTap(e) {
  if (e.target.classList.contains('skip-stretch-btn')) return;
  
  const done = recordLeftArmTap();
  const counter = document.getElementById('tap-counter');
  if (counter) counter.textContent = WELLNESS.leftArmTaps;
  
  if (done) {
    speak("Wonderful! Your left arm is getting stronger every day!", { rate: 0.9 });
    markLeftArmNudgeShown();
    
    setTimeout(() => {
      GAME.currentPuzzleIndex++;
      if (GAME.currentPuzzleIndex >= GAME.puzzles.length) {
        endGame();
      } else {
        loadPuzzle(GAME.currentPuzzleIndex);
      }
    }, 2500);
  }
}

function skipLeftArmNudge() {
  markLeftArmNudgeShown();
  GAME.currentPuzzleIndex++;
  loadPuzzle(GAME.currentPuzzleIndex);
}

function showStepReminder() {
  const container = document.getElementById('game-container');
  
  speak("Time for a little walk? You've been playing for a while!", { rate: 0.85 });
  
  container.innerHTML = `
    <div class="wellness-break">
      <div class="step-card">
        <h2>🚶 Time for a Walk?</h2>
        <p class="step-message">Your goal is 3,000 steps today. Even 10 minutes helps!</p>
        <div class="step-icons">🚶‍♂️🚶‍♀️</div>
        <div class="wellness-buttons">
          <button class="walk-btn" onclick="goForWalk()">
            I'll go walk!
          </button>
          <button class="keep-playing-btn" onclick="skipStepReminder()">
            Keep playing
          </button>
        </div>
      </div>
    </div>
  `;
}

function goForWalk() {
  markStepReminderShown();
  speak("Have a wonderful walk! Tap to come back when you're ready!", { rate: 0.85 });
  
  document.getElementById('game-container').innerHTML = `
    <div class="screensaver">
      <div class="screensaver-content">
        <div class="walking-animation">🚶</div>
        <p>Enjoy your walk!</p>
        <p class="tap-to-return">Tap anywhere to return</p>
      </div>
    </div>
  `;
  
  setTimeout(() => {
    document.querySelector('.screensaver').addEventListener('click', () => {
      returnToHome();
    });
  }, 100);
}

function skipStepReminder() {
  returnToHome();
}
