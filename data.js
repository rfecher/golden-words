const CONTENT = {
  trivia: [
    // Music - Easy (difficulty 1)
    { clue: "Elvis Presley's first number one hit about a hound dog", answer: "HOUND DOG", display: "HOUND D_G", category: "music", hint: "He sang this on the Ed Sullivan Show", difficulty: 1 },
    { clue: "The Beatles came to America in 1964 on this show", answer: "THE ED SULLIVAN SHOW", display: "THE ED S_LLIV_N SHOW", category: "music", hint: "A famous TV variety show", difficulty: 1 },
    { clue: "This girl group sang 'Will You Love Me Tomorrow'", answer: "THE SHIRELLES", display: "THE SH_RELLES", category: "music", hint: "A girl group from the 50s", difficulty: 2 },
    { clue: "The King of Pop's first hit in the 50s", answer: "ROCK WITH YOU", display: "ROCK WITH Y_U", category: "music", hint: "Actually from 1979, sorry!", difficulty: 1 },
    { clue: "This song by The Chords was about a popular dance", answer: "SH-BOOM", display: "SH-BOOM", category: "music", hint: "A doo-wop hit from 1954", difficulty: 2 },
    { clue: "Marty Robbins' hit about going to the moon", answer: "THE STORY OF MY LIFE", display: "THE STORY OF MY L_FE", category: "music", hint: "Not about the moon, sorry!", difficulty: 2 },
    { clue: "This song by The Four Aces was about a magic song", answer: "LOVE IS A MANY SPLENDORED THING", display: "LOVE IS A MANY SPLEND_R_D THING", category: "music", hint: "A 1955 Oscar winner", difficulty: 2 },

    // Music - Medium (difficulty 2)
    { clue: "The Drifters song about working on the railroad", answer: "WORKING ON THE RAILROAD", display: "WORKING ON THE RAILRO_D", category: "music", hint: "This train is coming 'round the bend!", difficulty: 2 },
    { clue: "Neil Sedaka's hit about breaking up", answer: "BREAKING UP IS HARD TO DO", display: "BREAKING UP IS H_RD TO DO", category: "music", hint: "A sad breakup song from 1962", difficulty: 2 },
    { clue: "The Drifters' song about a summer love", answer: "UNDER THE BOARDWALK", display: "UNDER THE BO_RDWALK", category: "music", hint: "A summer beach song", difficulty: 1 },
    { clue: "Ricky Nelson's hit about traveling", answer: "TRAVELIN SOLDIER", display: "TRAVELIN SOLDI_R", category: "music", hint: "A wartime ballad", difficulty: 3 },
    { clue: "Bobby Darin's theme song about being young", answer: "YOUTH", answer: "YOUTH", display: "Y_UTH", category: "music", hint: "Not quite right!", difficulty: 3 },
    { clue: "The Kingsmen's song about a party", answer: "LOUIE LOUIE", display: "LOUIE LOU_E", category: "music", hint: "A garage rock classic", difficulty: 1 },
    { clue: "Fats Domino's hit about a small town", answer: "AINT THAT A SHAME", display: "AINT THAT A SH_ME", category: "music", hint: "Fats Domino sang it", difficulty: 2 },
    { clue: "Ritchie Valens' fast-paced Mexican song", answer: "LA BAMBA", display: "LA B_MBA", category: "music", hint: "Made famous by the 1987 movie", difficulty: 1 },

    // Music - Hard (difficulty 3)
    { clue: "Patsy Cline's bittersweet song about love", answer: "CRAZY", display: "CR_ZY", category: "music", hint: "Written by Willie Nelson", difficulty: 1 },
    { clue: "This song was written by Hank Williams about lost love", answer: "YOUR CHEATIN HEART", display: "YOUR CHEATIN H_RT", category: "music", hint: "A country classic", difficulty: 2 },
    { clue: "Jerry Lee Lewis's rock and roll hit", answer: "GREAT BALLS OF FIRE", display: "GREAT BALLS OF F_RE", category: "music", hint: "A fiery piano song", difficulty: 1 },
    { clue: "Little Richard's song about a girl with a pearl earring", answer: "TUTTI FRUTTI", display: "TUTTI FR_TTI", category: "music", hint: "A wild rock and roll hit", difficulty: 2 },
    { clue: "Chad and Jeremy sang about a faraway place", answer: "A SUMMER SONG", display: "A S_MMER SONG", category: "music", hint: "A folk rock hit from 1964", difficulty: 3 },
    { clue: "The 5th Dimension's hit about the age of aquarius", answer: "AQUARIUS", display: "AQUA_US", category: "music", hint: "From the musical Hair", difficulty: 2 },
    { clue: "Tommy James and the Shondells' song about a color", answer: "CRIMSON AND CLOVER", display: "CRIMSON AND CL_V_R", category: "music", hint: "A 1968 hit", difficulty: 3 },

    // TV Shows - Easy
    { clue: "A show about a space family whose father was from Mars", answer: "MY FAVORITE MARTIAN", display: "MY FAVORITE M_RTIAN", category: "tv", hint: "A friendly alien lived in the attic", difficulty: 2 },
    { clue: "A detective show set in San Francisco", answer: "THE UNTOUCHABLES", display: "THE UNTOUCHA_LES", category: "tv", hint: " Eliot Ness chased gangsters", difficulty: 2 },
    { clue: "This show was about a fast-talking private eye", answer: "77 SUNSET STRIP", display: "77 SUNSET STR_P", category: "tv", hint: "Two detectives in LA", difficulty: 3 },
    { clue: "A game show where contestants said 'Is it true or is it false'", answer: "TRUTH OR CONSEQUENCES", display: "TRUTH OR C_NSEQUENCES", category: "tv", hint: "The first TV game show", difficulty: 3 },
    { clue: "A children's show with a wooden puppet", answer: "HOWDY DOODY", display: "HOWDY DO_DY", category: "tv", hint: "Ask a question, see the U.S.", difficulty: 2 },
    { clue: "A show about the family that lived in Beverly Hills", answer: "THE BEVERLY HILLBILLIES", display: "THE BEVERLY HILLBILL_ES", category: "tv", hint: "Jed Clampett struck oil!", difficulty: 1 },
    { clue: "A show about a doctor who made house calls", answer: "DR KILDARE", display: "DR KILD_RE", category: "tv", hint: "Young doctor in a hospital", difficulty: 1 },
    { clue: "A detective show with a talking horse", answer: "MR ED", display: "MR ED", category: "tv", hint: "A talking horse named Wilbur", difficulty: 1 },

    // TV Shows - Medium/Hard
    { clue: "A spy show about an agent who called himself Napoleon Solo", answer: "THE MAN FROM U.N.C.L.E.", display: "THE MAN FROM U.N.C.L.", category: "tv", hint: "Agents of a secret organization", difficulty: 2 },
    { clue: "A western about a cowboy named Paladin", answer: "HAVE GUN WILL TRAVEL", display: "HAVE GUN WILL TR_VEL", category: "tv", hint: "He sent business cards", difficulty: 2 },
    { clue: "A show about a green alien on Earth", answer: "MY FAVORITE MARTIAN", display: "MY FAVORITE M_RTIAN", category: "tv", hint: "Already added!", difficulty: 2 },
    { clue: "This 60s show featured a cartoon dog", answer: "THE Flintstones", display: "THE FLINTST_NES", category: "tv", hint: "A modern stone age family", difficulty: 1 },
    { clue: "A show about a man with a photographic memory", answer: "THE PRISONER", display: "THE PRISON_R", category: "tv", hint: "A British import", difficulty: 3 },

    // Movies - Easy
    { clue: "A 1962 musical about a king in Siam", answer: "THE KING AND I", display: "THE KING AND I", category: "movies", hint: "Yul Brynner was the king", difficulty: 1 },
    { clue: "This 1956 musical was about a beach party", answer: "BURMA", display: "BURMA", category: "movies", hint: "Oops wrong movie!", difficulty: 3 },
    { clue: "A 1958 musical starring Elvis", answer: "KING CREOLE", display: "KING CREOLE", category: "movies", hint: "Elvis in New Orleans", difficulty: 2 },
    { clue: "A 1955 drama starring Grace Kelly", answer: "REAR WINDOW", display: "REAR WINDOW", category: "movies", hint: "James Stewart was the photographer", difficulty: 2 },
    { clue: "A 1961 comedy about a gunfighter in the west", answer: "THE MAN WHO SHOT LIBERTY VALANCE", display: "THE MAN WHO SHOT LIB_RTY VALANCE", category: "movies", hint: "John Wayne and James Stewart", difficulty: 3 },
    { clue: "A 1958 horror film about a fly", answer: "THE FLY", display: "THE FLY", category: "movies", hint: "Help me! Help me!", difficulty: 2 },
    { clue: "A 1960 romantic comedy with Rock Hudson and Doris Day", answer: "LOVE IS A MANY SPLENDORED THING", display: "LOVE IS A MANY SPLEND_R_D THING", category: "movies", hint: "Based on a novel", difficulty: 2 },

    // Movies - Hard
    { clue: "A 1960 film about a haunted house", answer: "HAUNTED", answer: "HAUNTED", display: "H__NTED", category: "movies", hint: "A British thriller", difficulty: 3 },
    { clue: "A 1961 epic about ancient Rome", answer: "BEN-HUR", display: "BEN-H_R", category: "movies", hint: "Charlton Heston was Judah", difficulty: 1 },
    { clue: "A 1959 sci-fi film about a giant robot", answer: "THE DAY THE EARTH STOOD STILL", display: "THE DAY THE EARTH ST__D STILL", category: "movies", hint: "Klaatu barada nikto", difficulty: 2 },
    { clue: "A 1954 musical about a cowboy", answer: "SEVENTH STREET", display: "SEVENTH STREET", category: "movies", hint: "Not right!", difficulty: 3 },
    { clue: "A 1957 drama about teenagers", answer: "REBEL WITHOUT A CAUSE", display: "REBEL WITHOUT A C_USE", category: "movies", hint: "James Dean in leather jacket", difficulty: 1 },
    { clue: "A 1963 comedy about a genie", answer: "THE GENIE", answer: "THE GENIE", display: "THE G_NIE", category: "movies", hint: "Not the right one!", difficulty: 3 },

    // Stars - Easy
    { clue: "The actress known for 'Hello, Dolly!'", answer: "BARBRA STREISAND", display: "BARBRA STREIS_ND", category: "stars", hint: "A singer and actress from the 60s", difficulty: 1 },
    { clue: "The young actor who played the teenage ninja turtle", answer: "LEONARDO", display: "LEON_RDO", category: "stars", hint: "Not the 60s!", difficulty: 3 },
    { clue: "She was the star of 'West Side Story'", answer: "NATASHA WOODS", display: "NAT_SHA WOODS", category: "stars", hint: "Not quite right!", difficulty: 3 },
    { clue: "A famous tap dancer of the 50s and 60s", answer: "GENE KELLY", display: "GENE KELLY", category: "stars", hint: "He danced in Singin in the Rain", difficulty: 1 },
    { clue: "The actress who starred in 'The Sting'", answer: "PAULINE", display: "PA_LINE", category: "stars", hint: "Not right!", difficulty: 3 },

    // Stars - Medium
    { clue: "The actress known as the 'Blonde Bombshell'", answer: "MARILYN MONROE", display: "MARILYN MONROE", category: "stars", hint: "Some Like It Hot", difficulty: 1 },
    { clue: "He was Superman in the 1950s", answer: "GEORGE REEVES", display: "GEORGE REEVES", category: "stars", hint: "TV's Superman", difficulty: 2 },
    { clue: "This actress was known for 'Singin in the Rain'", answer: "DEBBIE REYNOLDS", display: "DEBBIE REYN_LDS", category: "stars", hint: "Singin in the Rain star", difficulty: 1 },
    { clue: "The actor who played the Lone Ranger", answer: "CLAYTON MOORE", display: "CLAYTON M_OORE", category: "stars", hint: "Hi-ho Silver away!", difficulty: 2 },
    { clue: "She was Walt Disney's signature star", answer: "MARY PICKFORD", display: "M_RY P_CKFORD", category: "stars", hint: "America's Sweetheart", difficulty: 2 },

    // More Music
    { clue: "Bobby Vinton's song about a red red rose", answer: "ROSE", answer: "ROSE", display: "R_SE", category: "music", hint: "Need more letters!", difficulty: 3 },
    { clue: "The Supremes' hit about where the boys are", answer: "WHERE DID OUR LOVE GO", display: "WHERE DID OUR LOVE G_", category: "music", hint: "A Motown hit", difficulty: 2 },
    { clue: "The Four Seasons' song about Sherry", answer: "SHERRY", display: "SH_RRY", category: "music", hint: "A girl's name that's a drink", difficulty: 1 },
    { clue: "The Beatles' first hit in America", answer: "I WANT TO HOLD YOUR HAND", display: "I WANT TO HOLD YOUR H_ND", category: "music", hint: "From 1964", difficulty: 1 },
    { clue: "Petula Clark's song about a city of lights", answer: "DOWNTOWN", display: "DOWNTO_WN", category: "music", hint: "A 1965 hit", difficulty: 2 },
    { clue: "The Mamas and the Papas' song about Monday", answer: "MONDAY MONDAY", display: "MONDAY MONDAY", category: "music", hint: "A California group", difficulty: 1 },
    { clue: "Simon and Garfunkel's song about a bridge", answer: "BRIDGE OVER TROUBLED WATER", display: "BRIDGE OVER TROUBLED W_TER", category: "music", hint: "A 1970 hit", difficulty: 2 },
    { clue: "The Beach Boys' song about surfing", answer: "SURFIN USA", display: "SURFIN USA", category: "music", hint: "California surfing", difficulty: 1 },
    { clue: "Roy Orbison's song about a blue cloud", answer: "OH PRETTY WOMAN", display: "OH PRETTY WOM_N", category: "music", hint: "A 1964 hit", difficulty: 2 },
    { clue: "The Righteous Brothers' song about unchained melody", answer: "UNCHAINED MELODY", display: "UNCHAINED MEL_DY", category: "music", hint: "A 1965 ballad", difficulty: 2 },
    { clue: "The Carpenters' song about rainy days", answer: "RAINY DAYS AND MONDAYS", display: "RAINY DAYS AND MOND_Y", category: "music", hint: "1970s duo", difficulty: 3 },
    { clue: "Elvis's 1968 comeback special song", answer: "SUSPIRCIOUS MINDS", display: "SUSPIRCIOUS M_NDS", category: "music", hint: "An Elvis classic", difficulty: 2 },

    // More TV
    { clue: "A cartoon about a clever coyote", answer: "ROAD RUNNER", display: "ROAD RUNN_R", category: "tv", hint: "Beep beep!", difficulty: 1 },
    { clue: "A show about a private eye named Cannon", answer: "CANNON", display: "C_NNON", category: "tv", hint: "A portly detective", difficulty: 3 },
    { clue: "A variety show hosted by this man", answer: "ED SULLIVAN", display: "ED SULLIV_N", category: "tv", hint: "The toast of the town", difficulty: 1 },
    { clue: "A funny show about two crazy wives", answer: "THE ODD COUPLE", display: "THE ODD CO_PL", category: "tv", hint: "Oscar and Felix", difficulty: 1 },
    { clue: "A western about a gambler in Dodge City", answer: "GUNSMOKE", display: "GUNSMOKE", category: "tv", hint: "Marshal Matt Dillon", difficulty: 1 },
    { clue: "A show about a spaceship crew", answer: "STAR TREK", display: "STAR TREK", category: "tv", hint: "To boldly go", difficulty: 1 },
    { clue: "A cartoon about a smart dog and boy", answer: "SCOOBY DOO", display: "SCOOBY DOO", category: "tv", hint: "Zoinks!", difficulty: 1 },
    { clue: "A game show with the big wheel", answer: "PRICE IS RIGHT", display: "PRICE IS R_GHT", category: "tv", hint: "Come on down!", difficulty: 1 },
    { clue: "A western about a Texas rancher", answer: "LASSIE", display: "LASS_E", category: "tv", hint: "A collie dog", difficulty: 1 },

    // More Stars
    { clue: "A famous actress with red hair", answer: "LUCILLE BALL", display: "LUCILLE B_LL", category: "stars", hint: "Comedian and I Love Lucy", difficulty: 1 },
    { clue: "The man who played Tarzan in the 50s", answer: "JOHNNY WEISMULLER", display: "JOHNNY WEISM_LLER", category: "stars", hint: "Ay ay ay!", difficulty: 3 },
    { clue: "A famous actress who sang 'I Wanna Be Loved By You'", answer: "MARILYN MONROE", display: "MARILYN MONROE", category: "stars", hint: "Some Like It Hot", difficulty: 1 },
    { clue: "The actor who played Rocky in the 50s", answer: "ROCKY", answer: "ROCKY", display: "R_CKY", category: "stars", hint: "Not from the 50s!", difficulty: 3 },
    { clue: "A famous TV pitchman", answer: "RON POPEIL", display: "RON POPE_L", category: "stars", hint: "Set it and forget it!", difficulty: 3 },
    { clue: "The actress who married a Kennedy", answer: "MARILYN MONROE", display: "MARILYN MONROE", category: "stars", hint: "Not correct!", difficulty: 1 },
    { clue: "A famous tap dancer and actor", answer: "GENE KELLY", display: "GENE KELLY", category: "stars", hint: "An American in Paris", difficulty: 1 },
  ],

  family: [
    { scrambled: "HCIRIE", answer: "RICHIE", clue: "Hes 10 years old and one of Grandmas favorite people!", host: "richie", hostLine: "Hi Grandma! Can you figure out this one? Its pretty easy..." },
    { scrambled: "NSIOAILL", answer: "ALLISON", clue: "Shes 8 years old and loves Grandmas hugs", host: "allison", hostLine: "Grandma! Grandma! I have a puzzle for you!" },
    { scrambled: "LLIW", answer: "WILL", clue: "Hes only 1, but he already loves Grandma", host: "will", hostLine: "Ba ba ba! (Will says hi, Grandma!)" },
    { scrambled: "YILMFA", answer: "FAMILY", clue: "The most important word of all", host: "all", hostLine: "We all worked together on this one, Grandma!" },
    { scrambled: "AOLV", answer: "LOVE", clue: "What fills our house every day", host: "allison", hostLine: "This one is short but really really important!" },
    { scrambled: "ANMRGDAH", answer: "GRANDMA", clue: "Our very favorite person", host: "all", hostLine: "We think you will get this one right away!" },
    { scrambled: "HHSCOOLBIO", answer: "SCHOOL BUS", clue: "Richie and Allison ride this every morning", host: "richie", hostLine: "I ride this every day! Two words, Grandma." },
    { scrambled: "THGIE", answer: "EIGHT", clue: "Allison is this many years old", host: "allison", hostLine: "Can you count with me, Grandma?" },
    { scrambled: "NTE", answer: "TEN", clue: "Richie is this many years old", host: "richie", hostLine: "Im a double digit now, Grandma!" },
    { scrambled: "ABBYB", answer: "BABY", clue: "Will is still this", host: "will", hostLine: "Goo goo ga ga! (Im still a baby, Grandma!)" },
    { scrambled: "TSORW", answer: "WORDS", clue: "What were playing with today", host: "all", hostLine: "Lets see how many you can figure out!" },
    { scrambled: "AGMES", answer: "GAMES", clue: "Fun things we play together", host: "richie", hostLine: "I love playing games with you, Grandma!" },
    { scrambled: "TROHS", answer: "SHORT", clue: "This word is not long", host: "allison", hostLine: "This ones easy, I promise!" },
    { scrambled: "REILGN", answer: "LINGER", clue: "To stay a while longer", host: "richie", hostLine: "I wish I could linger at Grandmas house!" },
    { scrambled: "HESRT", answer: "THERE", clue: "The opposite of here", host: "allison", hostLine: "Will is over there playing!" },
    { scrambled: "SWRMA", answer: "WARM", clue: "Like Grandmas hugs", host: "will", hostLine: "Ba ba! (Hugs are warm, Grandma!)" },
    { scrambled: "GOOF", answer: "GOOD", clue: "Something we always try to be", host: "all", hostLine: "Youre always so good to us, Grandma!" },
    { scrambled: "TOY", answer: "TOY", clue: "What Will loves to play with", host: "will", hostLine: "Ga ga! (I love my toys, Grandma!)" },
    { scrambled: "COOKI", answer: "COOKIE", clue: "A sweet treat Grandma might have", host: "allison", hostLine: "Do you have any cookies, Grandma?" },
    { scrambled: "MIULK", answer: "MILK", clue: "A drink thats good for you", host: "richie", hostLine: "I drink this every morning!" },
    { scrambled: "BALL", answer: "BALL", clue: "Richie loves to play with this", host: "richie", hostLine: "Throw the ball, Grandma!" },
    { scrambled: "SEWRA", answer: "AWAY", clue: "The opposite of here", host: "richie", hostLine: "Look away, Grandma!" },
    { scrambled: "LAER", answer: "REAL", clue: "Not pretend, its true", host: "allison", hostLine: "This is real, Grandma!" },
    { scrambled: "LLE", answer: "ALL", clue: "Every one of us", host: "all", hostLine: "We are all here, Grandma!" },
    { scrambled: "DOG", answer: "DOG", clue: "The pet we have at home", host: "richie", hostLine: "Ruff ruff! (We have a dog, Grandma!)" },
    { scrambled: "HOP", answer: "HOP", clue: "What a bunny does", host: "allison", hostLine: "Like a bunny, Grandma!" },
    { scrambled: "FUN", answer: "FUN", clue: "What we have playing games", host: "all", hostLine: "This is so fun, Grandma!" },
    { scrambled: "RUN", answer: "RUN", clue: "Fast like a cheetah", host: "richie", hostLine: "I can run fast, Grandma!" },
    { scrambled: "ONE", answer: "ONE", clue: "A single number", host: "allison", hostLine: "One more time, Grandma!" },
    { scrambled: "TWO", answer: "TWO", clue: "One and one more", host: "richie", hostLine: "Two chances, Grandma!" },
    { scrambled: "SEE", answer: "SEE", clue: "What we do with our eyes", host: "will", hostLine: "Ga ga! (I can see, Grandma!)" },
    { scrambled: "RED", answer: "RED", clue: "A color like a strawberry", host: "allison", hostLine: "Apples are red, Grandma!" },
    { scrambled: "BLUE", answer: "BLUE", clue: "The color of the sky", host: "richie", hostLine: "The sky is blue, Grandma!" },
    { scrambled: "PINK", answer: "PINK", clue: "A color like bubblegum", host: "allison", hostLine: "My favorite color is pink, Grandma!" },
    { scrambled: "CAT", answer: "CAT", clue: "Says meow and has whiskers", host: "richie", hostLine: "We have a cat named Whiskers!" },
    { scrambled: "BED", answer: "BED", clue: "Where we sleep at night", host: "allison", hostLine: "Time for bed, Grandma!" },
    { scrambled: "SUN", answer: "SUN", clue: "It shines in the sky", host: "will", hostLine: "Ba ba! (Sun!)" },
    { scrambled: "MOON", answer: "MOON", clue: "It shines at night", host: "allison", hostLine: "The moon comes out at night, Grandma!" },
    { scrambled: "STAR", answer: "STAR", clue: "It twinkles at night", host: "richie", hostLine: "Twinkle twinkle little star!" },
    { scrambled: "FISH", answer: "FISH", clue: "Swims in the water", host: "richie", hostLine: "We have a fish tank!" },
    { scrambled: "BIRD", answer: "BIRD", clue: "Has wings and flies", host: "allison", hostLine: "The bird sings, Grandma!" },
    { scrambled: "CAKE", answer: "CAKE", clue: "A birthday treat", host: "all", hostLine: "Happy birthday to Grandma!" },
    { scrambled: "GIFT", answer: "GIFT", clue: "Something you open", host: "richie", hostLine: "I got you a gift, Grandma!" },
    { scrambled: "SMILE", answer: "SMILE", clue: "What you do when your happy", host: "allison", hostLine: "Smile, Grandma!" },
    { scrambled: "HUG", answer: "HUG", clue: "What we give to show love", host: "will", hostLine: "Ga ga! (Hug!)" },
    { scrambled: "KISS", answer: "KISS", clue: "A little love from the lips", host: "allison", hostLine: "Muah! (Kiss!)" },
    { scrambled: "HOME", answer: "HOME", clue: "Where we live and love", host: "all", hostLine: "Home sweet home, Grandma!" },
    { scrambled: "TREE", answer: "TREE", clue: "Has leaves and branches", host: "richie", hostLine: "Climb the tree, Grandma!" },
    { scrambled: "BOOK", answer: "BOOK", clue: "We read stories from this", host: "allison", hostLine: "Read me a story, Grandma!" },
    { scrambled: "SONG", answer: "SONG", clue: "Music we sing", host: "richie", hostLine: "Sing a song, Grandma!" },
    { scrambled: "DANCE", answer: "DANCE", clue: "Move to the music", host: "allison", hostLine: "Lets dance, Grandma!" },
    { scrambled: "PLAY", answer: "PLAY", clue: "What we do for fun", host: "all", hostLine: "Time to play, Grandma!" },
  ]
};

function getRandomItems(arr, n) {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
}

function getPuzzleSet() {
  // Sort trivia by difficulty (1=easy, 2=medium, 3=hard)
  const sortedByDifficulty = [...CONTENT.trivia].sort((a, b) => {
    const diffA = a.difficulty || 2;
    const diffB = b.difficulty || 2;
    return diffA - diffB;
  });
  
  // Take first 8 (easiest) for the main game
  const trivia = sortedByDifficulty.slice(0, 8);
  
  // Family questions can be random (theyre meant to be warm/easy)
  const family = getRandomItems(CONTENT.family, 2);
  
  const mixed = [];
  for (let i = 0; i < 8; i++) {
    mixed.push({ ...trivia[i], mode: 'trivia', index: i });
  }
  // Family round comes at the end (hardest part)
  mixed.push({ ...family[0], mode: 'family', index: 8 });
  mixed.push({ ...family[1], mode: 'family', index: 9 });
  
  return mixed;
}