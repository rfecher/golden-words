let sttSupported = false;
let recognition = null;

function initSTT() {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
  if (SpeechRecognition) {
    sttSupported = true;
    recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 3;
  }
  
  return sttSupported;
}

function isSTTSupported() {
  return sttSupported;
}

function startListening(onResult, onError, onEnd) {
  if (!recognition) {
    if (onError) onError('Speech recognition not available');
    return false;
  }
  
  recognition.onresult = (event) => {
    const results = [];
    for (let i = 0; i < event.results[0].length; i++) {
      results.push(event.results[0][i].transcript.trim().toUpperCase());
    }
    if (onResult) onResult(results);
  };
  
  recognition.onerror = (event) => {
    if (onError) onError(event.error);
  };
  
  recognition.onend = () => {
    if (onEnd) onEnd();
  };
  
  try {
    recognition.start();
    return true;
  } catch (e) {
    if (onError) onError(e.message);
    return false;
  }
}

function stopListening() {
  if (recognition) {
    recognition.stop();
  }
}

function answersMatch(userInput, correctAnswer) {
  const normalize = s => s.toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  
  const normalizedInput = normalize(userInput);
  const normalizedAnswer = normalize(correctAnswer);
  
  if (normalizedInput === normalizedAnswer) return true;
  
  const words = normalizedAnswer.split(' ');
  for (let i = 1; i < words.length; i++) {
    const partial = words.slice(0, i).join(' ');
    if (normalizedInput.includes(partial) || partial.includes(normalizedInput)) {
      return true;
    }
  }
  
  const commonMisspellings = {
    'ROCK AROUND THE CLOCK': ['ROCK AROUND THE CLOC', 'ROCK AROUND THE CLO', 'ROCK AROUND TH ECLOCK'],
    'HEARTBREAK HOTEL': ['HEARTBREAK HOTLE', 'HEART BRAKE HOTEL'],
    'I LOVE LUCY': ['I LOVE LUCY', 'I LUV LUCY'],
    'MAYBERRY': ['MAYBERRY', 'MAY BERRY'],
  };
  
  if (commonMisspellings[normalizedAnswer]) {
    for (const variant of commonMisspellings[normalizedAnswer]) {
      if (normalizedInput.includes(variant)) return true;
    }
  }
  
  return false;
}

function matchSpokenAnswer(spokenAnswers, correctAnswer) {
  for (const spoken of spokenAnswers) {
    if (answersMatch(spoken, correctAnswer)) {
      return true;
    }
  }
  return false;
}
