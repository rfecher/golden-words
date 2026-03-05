# AGENTS.md — "Golden Words" Word Puzzle Game
### A Progressive Web App for a stroke survivor with left neglect

---

## 🎯 Project Purpose

You are building a word puzzle game for a woman in her 70s–80s who is recovering from a stroke that left her with **left-side spatial neglect** (she subconsciously ignores the left side of her visual field). She lives on her Samsung Galaxy Android tablet and loves 1950s/60s entertainment trivia. Her grandchildren — **Richie (10), Allison (8), and Will (1)** — are central to her life. She aims to walk 3,000 steps daily and should use her left arm more.

The game must be joyful, dignified, accessible, and buildable. It is called **"Golden Words."**

---

## 🛠️ Tech Stack

- **Platform:** Progressive Web App (PWA) — runs in Chrome on Samsung Galaxy tablet, installable to home screen via "Add to Home Screen," works offline
- **Framework:** Vanilla HTML5 + CSS3 + JavaScript (ES6+). No build step, no bundler. Single `index.html` + small sibling files. Keep it simple so the agent can reason about the whole codebase at once.
- **Storage:** `localStorage` for progress, scores, and settings. No backend required.
- **TTS:** Web Speech API — `window.speechSynthesis` (built into Chrome on Android)
- **STT:** Web Speech API — `webkitSpeechRecognition` / `SpeechRecognition` (built into Chrome on Android)
- **Icons/PWA:** Web App Manifest (`manifest.json`) + service worker (`sw.js`) for offline capability and home screen install
- **No dependencies.** Do not import React, Vue, npm packages, or CDN libraries. Pure vanilla.

### File Structure
```
/
├── index.html          # Main app shell, all screens rendered here
├── manifest.json       # PWA manifest
├── sw.js               # Service worker for offline caching
├── style.css           # All styles
├── app.js              # App initialization, screen routing, state
├── game.js             # Core game logic (scramble, fill-in-the-blank)
├── data.js             # All question/word content (see Content section)
├── tts.js              # Text-to-speech wrapper
├── stt.js              # Speech-to-text wrapper
├── wellness.js         # Step reminders and left-arm nudges
└── icons/              # App icons (generate simple colored SVGs)
```

---

## 🧩 Game Design

### Game Type: Word Scramble + Fill-in-the-Blank ("Golden Words")

**Why this design:**
- Crossword puzzles require a constraint-solving grid layout algorithm — this is extremely difficult to generate correctly with agentic coding and prone to bugs. Do NOT attempt crosswords.
- Word scrambles and fill-in-the-blank are round-based (one puzzle at a time), making them easy to build, easy to read aloud via TTS, and naturally compatible with voice input.
- One puzzle on screen at a time = ideal for left neglect (no scanning a full grid).

### Two Game Modes

#### Mode 1: "Golden Trivia" (Fill-in-the-Blank)
- A clue is displayed (and read aloud automatically via TTS)
- A partial word is shown with blanks: e.g., `R _ C K   A R _ U N D   T H E   C L O C K`
- The player taps letter tiles OR speaks the answer via STT
- Categories: 50s/60s Music, 50s/60s TV & Movies, 50s/60s Actors & Stars
- **The missing letters** are shown as large tappable buttons on the RIGHT side of the screen (not spread left-to-right)

#### Mode 2: "Family Round" (Word Scramble)
- A scrambled word is shown with a family-themed clue
- Player unscrambles by tapping letters in order
- Words are family names, family memories, kids' favorite things
- Grandkid "host" portraits (simple illustrated avatars — Richie, Allison, or Baby Will) introduce each clue with a fun line read by TTS

### Round Structure
- Each session = 10 puzzles (mix of both modes, ending on a Family Round)
- After every 5 puzzles: **Wellness Break screen** (see Wellness section)
- After 10 puzzles: **Victory Screen** with score, encouraging message, and a photo-frame placeholder the family can fill with a real photo

### Scoring
- Correct on first try: ⭐⭐⭐
- Correct with one hint: ⭐⭐
- Correct with two hints: ⭐
- Incorrect/skipped: 💛 (gold heart — "Good try, keep going!")
- Show a running star total. Never show "wrong" or "fail" — always affirming language.

---

## ♿ Accessibility — Left Neglect Design Rules

These rules are **non-negotiable** and must be respected throughout every screen.

### Layout Rules
1. **Nothing critical on the far left.** All interactive controls (buttons, letter tiles, answer input) must be positioned in the **center-to-right 65% of the screen**.
2. **The left 35% is "soft space"** — decorative only (background color, subtle pattern, or a gentle animated element that draws the eye leftward).
3. **Left-attention pullers:** Place a slow-pulsing glow, a bouncing star, or a gentle animated bird/flower in the LEFT margin that subtly draws the eye without being distracting. This helps rehabilitate left-side attention naturally.
4. **All text is left-to-right but center-justified** within the active zone (center-right area).
5. **Minimum touch target size:** 72×72px for all interactive elements.
6. **Font size:** Minimum 28px for body text, 36px+ for clues and puzzle letters.
7. **High contrast:** Dark text (#1a1a1a) on warm light backgrounds (#FFF8E7 — warm cream). Avoid blue-white color schemes.
8. **Single column layout only.** Never side-by-side columns.
9. **No horizontal scrolling.** Everything fits in one viewport.

### Visual Hierarchy
- The clue (in large text, read aloud) sits at the **top center-right** with a large colored card behind it
- The puzzle (blanks or scrambled letters) sits **center-right**, large
- Answer buttons sit **right-of-center**, stacked vertically or in a 2×N grid biased right
- Navigation (Next, Skip, Hint) buttons sit **bottom-center-right**, large

### Screen Safe Zones
```
|--- 35% LEFT SOFT ZONE ---|--- 65% ACTIVE ZONE (center + right) ---|
| animated attention puller |  clue card                             |
|                           |  puzzle display                        |
|                           |  letter/answer buttons                 |
|                           |  navigation controls                   |
```

---

## 🔊 Text-to-Speech (TTS)

### Implementation (`tts.js`)
```javascript
// Use Web Speech API — available in Chrome Android
function speak(text, options = {}) {
  window.speechSynthesis.cancel(); // stop any current speech
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.rate = options.rate || 0.85;   // slightly slower than default
  utterance.pitch = options.pitch || 1.0;
  utterance.volume = options.volume || 1.0;
  // Prefer a warm female voice if available
  const voices = window.speechSynthesis.getVoices();
  const preferred = voices.find(v => v.lang === 'en-US' && v.name.includes('Female'))
    || voices.find(v => v.lang === 'en-US')
    || voices[0];
  if (preferred) utterance.voice = preferred;
  window.speechSynthesis.speak(utterance);
}
```

### When to Speak
- **Auto-read every clue** when it appears (with a 600ms delay so the visual settles first)
- **Read the puzzle letters** after the clue (e.g., "The word is... R, blank, C, K")
- **Read feedback** after every answer: "That's right!" / "So close — the answer was Rock Around the Clock. Let's keep going!"
- **Read wellness reminders** (see Wellness section)
- **A large 🔊 "Read Again" button** always visible — at least 80px tall, in the active zone

### TTS Settings (accessible from main menu)
- Speed: Slow / Normal / Fast (slider)
- Volume: toggle mute (but default ON always)
- Voice: if multiple voices available, let user pick from a dropdown (read each voice name aloud when highlighted)

---

## 🎙️ Speech-to-Text (STT)

### Implementation (`stt.js`)
```javascript
function startListening(onResult, onError) {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    onError('Speech recognition not available');
    return;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'en-US';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 3;
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.trim().toUpperCase();
    onResult(transcript);
  };
  recognition.onerror = (event) => onError(event.error);
  recognition.start();
}
```

### How STT Is Used
- A large **🎤 "Speak Answer" button** (minimum 100px tall, warm gold color) appears below the puzzle
- When tapped: button pulses red, TTS says "I'm listening...", mic activates for up to 8 seconds
- The spoken answer is matched against the correct answer using a **fuzzy match** (normalize case, trim, allow common mishearings — e.g., "rock around the clock" matches "ROCK AROUND THE CLOCK")
- If STT is unavailable or fails: gracefully fall back to keyboard/tap input only, with a friendly message: "Let's use the buttons instead!"
- Do not require STT — it is always optional alongside the letter-tap interface

---

## 📦 Content Data (`data.js`)

### Structure
```javascript
const CONTENT = {
  trivia: [ ...],      // 50s/60s fill-in-the-blank
  family: [ ... ],     // family word scrambles
};
```

### Trivia Questions — 50s/60s Fill-in-the-Blank
Include AT LEAST 60 questions covering these categories. Every question must have:
- `clue`: the spoken/displayed clue
- `answer`: the full answer (uppercase, spaces OK)
- `display`: the answer with some letters replaced by `_`, keeping enough letters to be solvable with a hint. Vowels are the LAST to be removed.
- `category`: one of `"music"`, `"tv"`, `"movies"`, `"stars"`
- `hint`: a second softer clue

**Sample questions to include (expand to 60+):**

```javascript
// Music
{ clue: "Bill Haley's 1954 rock anthem that started it all",
  answer: "ROCK AROUND THE CLOCK",
  display: "R_CK AR__ND THE CL_CK",
  category: "music",
  hint: "It played over the opening credits of Blackboard Jungle" },

{ clue: "Elvis's first big hit — a whole lot of shaking going on... or was it this?",
  answer: "HEARTBREAK HOTEL",
  display: "H__RTBR__K HOT_L",
  category: "music",
  hint: "Elvis checked in here in 1956" },

{ clue: "Buddy Holly's band",
  answer: "THE CRICKETS",
  display: "THE CR_CK_TS",
  category: "music",
  hint: "Named after an insect that chirps at night" },

{ clue: "She sang 'Que Sera Sera' — Whatever will be, will be",
  answer: "DORIS DAY",
  display: "D_R_S D_Y",
  category: "stars",
  hint: "Also starred in many romantic comedies with Rock Hudson" },

{ clue: "The King of Rock and Roll",
  answer: "ELVIS PRESLEY",
  display: "ELV_S PR_SL_Y",
  category: "stars",
  hint: "His home in Memphis is called Graceland" },

{ clue: "He taught us to 'Put Your Head on My Shoulder'",
  answer: "PAUL ANKA",
  display: "P__L ANK_",
  category: "music",
  hint: "Canadian teen idol who also wrote My Way for Frank Sinatra" },

// TV
{ clue: "Ricky Ricardo's real-life wife played his TV wife in this classic sitcom",
  answer: "I LOVE LUCY",
  display: "I L_V_ L_CY",
  category: "tv",
  hint: "Lucille Ball starred" },

{ clue: "Andy, Opie, and Aunt Bee lived in this fictional North Carolina town",
  answer: "MAYBERRY",
  display: "M_YB_RRY",
  category: "tv",
  hint: "The Andy Griffith Show" },

{ clue: "Ed Norton and Ralph Kramden were best friends in this 50s sitcom",
  answer: "THE HONEYMOONERS",
  display: "THE H_N_YM__N_RS",
  category: "tv",
  hint: "Jackie Gleason starred as Ralph" },

{ clue: "This TV cowboy rode a horse named Champion",
  answer: "GENE AUTRY",
  display: "G_N_ _UTR_",
  category: "tv",
  hint: "The Singing Cowboy" },

// Movies
{ clue: "Marilyn Monroe, Tony Curtis, and Jack Lemmon in a classic 1959 comedy",
  answer: "SOME LIKE IT HOT",
  display: "S_M_ L_K_ IT H_T",
  category: "movies",
  hint: "Two musicians disguise themselves as women" },

{ clue: "This 1952 musical had Gene Kelly dancing in the rain",
  answer: "SINGIN IN THE RAIN",
  display: "SINGIN IN THE R__N",
  category: "movies",
  hint: "It's a classic Hollywood musical" },

// ... (agent must generate 48 more to reach 60 total, following the same pattern)
```

### Family Round Questions — Word Scrambles
Include AT LEAST 20 family scrambles. Every entry must have:
- `scrambled`: the shuffled letters (string, uppercase, spaces between letter groups OK)
- `answer`: the correct word/phrase
- `clue`: a warm family-themed clue
- `host`: one of `"richie"`, `"allison"`, `"will"`, `"all"` — which grandkid "hosts" this clue
- `hostLine`: what that grandkid says (read by TTS) before the clue

**Sample family scrambles to include (expand to 20+):**
```javascript
{ scrambled: "HCIRIE",
  answer: "RICHIE",
  clue: "He's 10 years old and one of Grandma's favorite people!",
  host: "richie",
  hostLine: "Hi Grandma! Can you figure out this one? It's pretty easy..." },

{ scrambled: "NSIOAILL",
  answer: "ALLISON",
  clue: "She's 8 years old and loves Grandma's hugs",
  host: "allison",
  hostLine: "Grandma! Grandma! I have a puzzle for you!" },

{ scrambled: "LLIW",
  answer: "WILL",
  clue: "He's only 1, but he already loves Grandma",
  host: "will",
  hostLine: "Ba ba ba! (Will says hi, Grandma!)" },

{ scrambled: "YILMFA",
  answer: "FAMILY",
  clue: "The most important word of all",
  host: "all",
  hostLine: "We all worked together on this one, Grandma!" },

{ scrambled: "AOLV",
  answer: "LOVE",
  clue: "What fills our house every day",
  host: "allison",
  hostLine: "This one is short but really really important!" },

{ scrambled: "ANMRGDAH",
  answer: "GRANDMA",
  clue: "Our very favorite person",
  host: "all",
  hostLine: "We think you'll get this one right away!" },

{ scrambled: "HHSCOOLBIO",
  answer: "SCHOOL BUS",
  clue: "Richie and Allison ride this every morning",
  host: "richie",
  hostLine: "I ride this every day! Two words, Grandma." },

// ... agent generates more using simple, warm, family-centered words
```

**Important for content generation:** 
- Keep all trivia within 1955–1969 era
- All family content should be warm, encouraging, and age-appropriate
- Will's host lines should always be "baby talk" parenthetically narrated — sweet and funny
- Never use words that are ambiguous, unkind, or potentially confusing for someone reading carefully

---

## 💚 Wellness Integration (`wellness.js`)

Wellness features must be **gentle, optional, and never interruptive during a puzzle.** They appear only at natural break points.

### Step Reminder
- After every completed game session (10 puzzles), if it's been more than 2 hours since app was opened, show a **Wellness Break screen**
- Large warm card: 🚶 "Time for a little walk? Even 10 minutes helps! Your goal is 3,000 steps today. You've got this!"
- TTS reads it aloud
- Two buttons: "I'll go walk!" (green, large) and "Keep playing" (smaller, gray)
- If "I'll go walk!" — app shows a cheerful send-off screen, then locks to a simple screensaver for 15 minutes (tap anywhere to unlock)
- Track last-reminded timestamp in localStorage so reminders aren't more frequent than every 2 hours

### Left Arm Nudge
- Once per session (mid-game, after puzzle 5), show a brief animated card:
  💪 "Quick stretch! Try tapping the screen 5 times with your LEFT hand before the next puzzle."
  - Show a large animated LEFT HAND graphic in the center-right area (not far left — she needs to see it)
  - Count 5 taps anywhere on screen
  - Celebrate: "Wonderful! Your left arm is getting stronger every day!"
  - This is skippable with a small "Skip" link below the card
  - TTS reads the instruction automatically

### Wellness Settings
- In Settings, family can **enable/disable** each reminder type separately
- Family can set the step reminder interval (Off / Every 1 hr / Every 2 hrs / Every session)

---

## 🎨 Visual Design

### Color Palette
- Background: `#FFF8E7` (warm cream — easy on eyes, not stark white)
- Primary accent: `#D4A017` (warm gold — evokes the "golden" era)
- Secondary accent: `#8B2FC9` (soft purple — friendly, visible)
- Success: `#2E7D32` (deep green)
- Text: `#1A1A1A` (near-black)
- Card background: `#FFFFFF` with `box-shadow: 0 4px 20px rgba(0,0,0,0.12)`
- Left soft zone: `#FFF3D0` with a slow CSS animation (floating stars or gentle sparkles)

### Typography
- Body/UI: `Georgia, 'Times New Roman', serif` — warm, familiar, easy to read
- Puzzle letters: Bold, monospace-ish, very large (48–64px)
- Clue text: 30–36px, line-height 1.6
- Buttons: 24–28px, bold, high contrast

### Grandkid Avatars
- Create simple CSS/SVG illustrated avatars for Richie, Allison, and Will
- Richie: older kid energy, baseball cap, wide smile
- Allison: pigtails or curly hair, big eyes, bright expression
- Will: round baby face, open mouth, tiny tuft of hair — always looks delighted
- These appear in a speech-bubble layout when they "host" a Family Round clue
- Keep them simple enough to be CSS/SVG (no external image dependencies)

### Animations
- All transitions: gentle fade or slide-up (300ms ease-in-out)
- Correct answer: brief golden confetti burst (pure CSS or simple canvas, no library)
- Letter tiles: tap → scale down slightly (0.9) → scale back → flip or highlight
- Left-margin attention puller: a slow floating star or small bird that drifts left-to-right and back, very subtle opacity (0.3–0.5)

---

## 📱 Android Tablet UX

- **Target viewport:** 1200×800px landscape (Samsung Galaxy Tab default Chrome window)
- **Also support portrait:** 800×1200px — layout should reflow gracefully
- **Touch-optimized:** No hover states required. All interactions are tap.
- **Prevent zoom:** `<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">`
- **Prevent text selection** on puzzle elements (feels wrong when tapping letters): `user-select: none`
- **PWA Install prompt:** On first visit, after 30 seconds, show a gentle banner: "Add Golden Words to your home screen for easy access!" with instructions.
- **Offline:** Service worker must cache all assets so the game works with no internet connection.
- **No keyboard required:** The entire game must be playable with touch only (tap letter tiles, tap buttons). Keyboard is a bonus, not required.

---

## 🏠 App Screens

### 1. Home Screen
- Large warm title: **"Golden Words"** with a gold star
- Subtitle: "Your puzzle game — made with love"
- Two large buttons (stacked, center-right): 
  - 🎵 "Golden Trivia" (50s & 60s clues)
  - 👨‍👩‍👧‍👦 "Family Round"
- Small gear icon (⚙️) for Settings — bottom right corner
- TTS auto-reads: "Welcome to Golden Words! Tap Golden Trivia or Family Round to play."

### 2. Settings Screen
- TTS speed slider
- TTS mute toggle  
- Step reminder toggle + frequency
- Left arm reminder toggle
- "About this game" — shows a sweet message: "Golden Words was made especially for you, with love from your family."
- Back button (large, bottom right)

### 3. Game Screen (shared layout for both modes)
- **Top bar:** Category label + star score + 🔊 Read Again button (all right-aligned)
- **Left soft zone (35%):** animated attention element
- **Clue card (center-right, 65%):** large clue text, grandkid avatar if Family Round
- **Puzzle display:** blanks or scrambled letters, large, center-right
- **Answer input area:** letter tile buttons, centered-right
- **Bottom bar:** Hint button | Skip button | Speak Answer button (🎤)

### 4. Wellness Break Screen
- Warm full-screen card, centered (slightly right-biased)
- Step or left-arm content (see Wellness section)
- Large action buttons

### 5. Victory Screen
- Confetti, star count, encouraging message
- "Play Again" button (large, gold)
- Placeholder photo frame: "Your family loves you ❤️" with a border where a family photo would go (rendered as a styled empty div with a warm border — family can print and frame it as a cute keepsake too)

---

## 🔒 Data & Privacy

- All data stored in `localStorage` only. No network requests except for PWA caching.
- No user accounts, no logins, no analytics.
- Family can clear all data from Settings.

---

## ⚠️ Agent Implementation Notes & Pitfalls

### DO
- Build and test one screen at a time before moving to the next
- Implement TTS first — it affects the feel of the whole app and should work before anything else
- Use CSS Grid or Flexbox for layout — avoid absolute positioning for the main content zones
- Generate all 60 trivia questions and 20 family scrambles in `data.js` before building game logic — content is what makes this game meaningful
- Handle `speechSynthesis.getVoices()` async behavior: voices may not be loaded on first call. Use `speechSynthesis.onvoiceschanged` event.
- Test the left-zone layout carefully: draw a vertical line at 35% of screen width. Nothing interactive should be left of it.
- Make the "Read Again" button prominent and always visible during gameplay — this is the most important accessibility control in the app

### DON'T
- Do NOT attempt crossword puzzle generation — it requires constraint-solving that is error-prone to code agentically and is out of scope
- Do NOT use any npm packages, frameworks, or CDN libraries
- Do NOT store any sensitive family information beyond the grandkids' first names and ages already provided
- Do NOT make the left-arm or step reminders mandatory or blocking — always skippable
- Do NOT design any layout that requires horizontal scrolling or small touch targets
- Do NOT show red X or "Wrong!" for incorrect answers — always use warm, encouraging language
- Do NOT auto-play audio on page load without user gesture (Chrome will block it) — wait for first tap, then enable TTS

### Fuzzy Answer Matching
```javascript
function answersMatch(userInput, correctAnswer) {
  const normalize = s => s.toUpperCase()
    .replace(/[^A-Z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return normalize(userInput) === normalize(correctAnswer);
}
```
For STT, also try matching any of the top 3 STT alternatives before marking wrong.

### Letter Tile Tap Interface
For fill-in-the-blank: show the answer letters jumbled as individual large tap buttons. When tapped, they fly into the next blank slot. This is simpler than typing and works well for touch.

For word scramble: show all scrambled letters as tiles. Tapping them moves them into an answer slot in order. A backspace tile allows correction.

---

## 🧪 Testing Checklist (Agent Should Verify Before Finishing)

- [ ] TTS reads every clue aloud automatically when puzzle appears
- [ ] "Read Again" button re-reads the current clue
- [ ] STT "Speak Answer" button activates mic and accepts spoken answers
- [ ] STT failure falls back gracefully to tap input
- [ ] All interactive elements are in the right 65% of the screen
- [ ] Left soft zone has a gentle animated element
- [ ] Minimum touch target size is 72px on all buttons
- [ ] Font size is at least 28px everywhere, 36px+ for clues
- [ ] Step reminder appears after a full session and is dismissible
- [ ] Left arm nudge appears at puzzle 5 and is skippable
- [ ] Game works fully offline (service worker caching)
- [ ] PWA is installable ("Add to Home Screen" works in Chrome Android)
- [ ] All 60 trivia questions are in data.js and valid
- [ ] All 20 family scramble questions are in data.js and valid
- [ ] Grandkid avatars (Richie, Allison, Will) appear correctly in Family Round
- [ ] Victory screen shows after 10 puzzles
- [ ] Settings screen allows TTS/wellness controls
- [ ] Incorrect answers show warm encouraging messages, never "Wrong!"
- [ ] App works in both landscape and portrait orientation

---

## 💌 A Note to the Agent

This game is being made for a real person navigating real challenges with grace and courage. The grandkids Richie, Allison, and baby Will are real kids who love their grandma. The trivia questions should reflect genuine joy for an era she grew up in. Every design decision — the right-biased layout, the gentle left-attention puller, the encouraging feedback, the TTS auto-read — exists to help her succeed and feel celebrated.

Build it with care. Make it warm. Make it work.
