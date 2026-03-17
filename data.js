const CONTENT = {
  trivia: [
    { clue: "Bill Haley's 1954 rock anthem that started it all", answer: "ROCK AROUND THE CLOCK", display: "R_CK AR__ND THE CL_CK", category: "music", hint: "It played over the opening credits of Blackboard Jungle", difficulty: 2 },
    { clue: "Elvis's first big hit — a whole lot of shaking going on", answer: "HEARTBREAK HOTEL", display: "H__RTBR__K HOT_L", category: "music", hint: "Elvis checked in here in 1956", difficulty: 2 },
    { clue: "Buddy Holly's band", answer: "THE CRICKETS", display: "THE CR_CK_TS", category: "music", hint: "Named after an insect that chirps at night", difficulty: 1 },
    { clue: "She sang 'Que Sera Sera' — Whatever will be, will be", answer: "DORIS DAY", display: "D_R_S D_Y", category: "stars", hint: "Also starred in many romantic comedies with Rock Hudson", difficulty: 1 },
    { clue: "The King of Rock and Roll", answer: "ELVIS PRESLEY", display: "ELV_S PR_SL_Y", category: "stars", hint: "His home in Memphis is called Graceland", difficulty: 1 },
    { clue: "He taught us to 'Put Your Head on My Shoulder'", answer: "PAUL ANKA", display: "P__L ANK_", category: "music", hint: "Canadian teen idol who also wrote My Way for Frank Sinatra", difficulty: 2 },
    { clue: "The Everly Brothers had this famous song about being apart", answer: "ALL I HAVE TO DO IS DREAM", display: "ALL I H_VE TO DO IS DR__M", category: "music", hint: "A dreamy ballad about longing", difficulty: 2 },
    { clue: "Nat King Cole's smooth ballad about lovers", answer: "UNFORGETTABLE", display: "UNFORGETT_BLE", category: "music", hint: "Something that can never be forgotten", difficulty: 1 },
    { clue: "Johnny Cash's first big hit about a ring of fire", answer: "RING OF FIRE", display: "RING OF F_RE", category: "music", hint: "Josephine Cash wrote this for Johnny", difficulty: 2 },
    { clue: "Patti Page's hit about a dog in the window", answer: "HOW MUCH IS THAT DOGGIE IN THE WINDOW", display: "HOW MUCH IS TH_T D_GG_E IN THE W_NDOW", category: "music", hint: "A cute song about a pet shop", difficulty: 2 },
    { clue: "The Chordettes' sweet song about a sandman", answer: "MR SANDMAN", display: "MR S_NDM_N", category: "music", hint: "Bring me a dream", difficulty: 1 },
    { clue: "Frank Sinatra's signature song about doing it his way", answer: "MY WAY", display: "MY W_Y", category: "music", hint: "Paul Anka wrote this for Frank", difficulty: 1 },
    { clue: "Perry Como's hit about catching a falling star", answer: "CATCH A FALLING STAR", display: "C_TCH A F_LLING ST_R", category: "music", hint: "A whimsical song about wishes", difficulty: 3 },
    { clue: "Dean Martin's famous song about love", answer: "THAT'S AMORE", display: "TH_T'S AM_R_", category: "music", hint: "When the moon hits your eye", difficulty: 2 },
    { clue: "The Platters' romantic ballad about this", answer: "THE GREAT PRETENDER", display: "THE GR__T PR_T_NDER", category: "music", hint: "Oh oh oh", difficulty: 2 },
    { clue: "Marty Robbins' country hit about a white sport coat", answer: "A WHITE SPORT COAT", display: "A WH_TE SP_RT C__T", category: "music", hint: "And a pink carnation", difficulty: 3 },
    { clue: "She had a hit with 'I Will Wait for You'", answer: "CONNIE FRANCIS", display: "C_NNIE FR_NCIS", category: "music", hint: "Also sang Stupid Cupid", difficulty: 3 },
    { clue: "Bobby Vee's song about taking good care", answer: "TAKE GOOD CARE OF MY BABY", display: "TAKE GOOD C_RE OF MY B_BY", category: "music", hint: "A 1961 pop hit", difficulty: 3 },
    { clue: "A sass song about independence", answer: "YOU DONT OWN ME", display: "YOU D_NT OWN ME", category: "music", hint: "A classic about freedom", difficulty: 2 },

    { clue: "Ricky Ricardo's real-life wife played his TV wife in this classic sitcom", answer: "I LOVE LUCY", display: "I L_V_ L_CY", category: "tv", hint: "Lucille Ball starred", difficulty: 1 },
    { clue: "Andy, Opie, and Aunt Bee lived in this fictional North Carolina town", answer: "MAYBERRY", display: "M_YB_RRY", category: "tv", hint: "The Andy Griffith Show", difficulty: 1 },
    { clue: "Ed Norton and Ralph Kramden were best friends in this 50s sitcom", answer: "THE HONEYMOONERS", display: "THE H_N_YM__N_RS", category: "tv", hint: "Jackie Gleason starred as Ralph", difficulty: 2 },
    { clue: "This TV cowboy rode a horse named Champion", answer: "GENE AUTRY", display: "G_N_ _UTR_", category: "tv", hint: "The Singing Cowboy", difficulty: 2 },
    { clue: "Lassie was this type of dog", answer: "COLLIE", display: "C_LL_E", category: "tv", hint: "A famous movie and TV dog breed", difficulty: 1 },
    { clue: "This show was about a nun who could fly", answer: "FLYING NUN", display: "FLYING N_N", category: "tv", hint: "A sitcom about a jet pilot's son", difficulty: 2 },
    { clue: "A sitcom about a witch married to a mortal", answer: "BEWITCHED", display: "BEW_TCHED", category: "tv", hint: "Samantha was the witch", difficulty: 1 },
    { clue: "The Bradys lived in this house", answer: "BRADY BUNCH", display: "BR_DY B_NCH", category: "tv", hint: "A blended family sitcom", difficulty: 1 },
    { clue: "Lucy and Ethel worked at this candy factory", answer: "CANDY FACTORY", display: "C_NDY F_CTORY", category: "tv", hint: "Where Lucy got into trouble", difficulty: 2 },
    { clue: "This show featured Ozzie, Harriet, and their sons", answer: "THE ADVENTURES OF OZZIE AND HARRIET", display: "THE ADV_NTURES OF OZZIE AND H_RRIET", category: "tv", hint: "A show about the Nelson family", difficulty: 3 },
    { clue: "Darrin Stephens was married to a witch in this show", answer: "BEWITCHED", display: "BEW_TCHED", category: "tv", hint: "Samantha was the witch", difficulty: 1 },
    { clue: "The Petries and the Drummonds were neighbors in this show", answer: "THE DICK VAN DYKE SHOW", display: "THE DICK VAN DYKE SH_W", category: "tv", hint: "Alan Brady was the boss", difficulty: 2 },
    { clue: "This show was about a horse named Trigger", answer: "ROY ROGERS", display: "ROY RO_GERS", category: "tv", hint: "King of the Cowboys", difficulty: 2 },
    { clue: "Shirley Jones was part of this musical family", answer: "THE PARTRIDGE FAMILY", display: "THE P_TRIDGE F_MILY", category: "tv", hint: "A family band on TV", difficulty: 1 },
    { clue: "The Cartwrights lived at this ranch", answer: "BONANZA", display: "B_N_NZA", category: "tv", hint: "A long-running Western", difficulty: 1 },

    { clue: "Marilyn Monroe, Tony Curtis, and Jack Lemmon in a classic 1959 comedy", answer: "SOME LIKE IT HOT", display: "S_M_ L_K_ IT H_T", category: "movies", hint: "Two musicians disguise themselves as women", difficulty: 1 },
    { clue: "This 1952 musical had Gene Kelly dancing in the rain", answer: "SINGIN IN THE RAIN", display: "SINGIN IN THE R__N", category: "movies", hint: "Its a classic Hollywood musical", difficulty: 1 },
    { clue: "Cary Grant and Audrey Hepburn in this 1964 romantic comedy", answer: "CHARADE", display: "CH_R_DE", category: "movies", hint: "Set in Paris", difficulty: 2 },
    { clue: "James Dean in this 1955 drama about rebels", answer: "REBEL WITHOUT A CAUSE", display: "REBEL WITHOUT A C_USE", category: "movies", hint: "A teen rebellion classic", difficulty: 1 },
    { clue: "This 1958 musical starred James Dean", answer: "GIANT", display: "G__NT", category: "movies", hint: "A Texas-sized romance", difficulty: 3 },
    { clue: "Audrey Hepburn in this 1961 romantic drama", answer: "BREAKFAST AT TIFFANYS", display: "BREAKFAST AT TIFF_NYS", category: "movies", hint: "A holly golightly movie", difficulty: 1 },
    { clue: "Elvis Presley starred in this 1957 musical", answer: "JAILHOUSE ROCK", display: "JAILHOUSE R_CK", category: "movies", hint: "A musical prison drama", difficulty: 2 },
    { clue: "This 1959 western starred John Wayne", answer: "THE SEARCHERS", display: "THE SE_RCHERS", category: "movies", hint: "A western about a search", difficulty: 2 },
    { clue: "Debbie Reynolds sang about this in 1957", answer: "TAMMY", display: "T_MMY", category: "movies", hint: "A beach movie song", difficulty: 2 },
    { clue: "This 1960 film made Sandra Dee a star", answer: "GIDGET", display: "G_DGET", category: "movies", hint: "A teen beach movie", difficulty: 2 },
    { clue: "The Von Trapp family sang their way through this 1965 film", answer: "THE SOUND OF MUSIC", display: "THE SOUND OF M_SIC", category: "movies", hint: "Do Re Mi", difficulty: 1 },
    { clue: "This 1954 horror film featured a giant ape", answer: "KING KONG", display: "KING KONG", category: "movies", hint: "A giant ape climbs a building", difficulty: 1 },
    { clue: "James Stewart and Donna Reed in this beloved film", answer: "ITS A WONDERFUL LIFE", display: "ITS A W_NDERFUL LIFE", category: "movies", hint: "An angel gets his wings", difficulty: 1 },
    { clue: "The 1951 film about a horse that won the Triple Crown", answer: "SEA BISCUIT", display: "SE_ B_SCUIT", category: "movies", hint: "A racing horse legend", difficulty: 3 },
    { clue: "This 1956 film starred Yul Brynner as a king", answer: "THE KING AND I", display: "THE KING AND I", category: "movies", hint: "A musical about Anna and the King", difficulty: 1 },

    { clue: "She was known as the Girl Next Door", answer: "JUDY GARLAND", display: "J_DY G_RLAND", category: "stars", hint: "Dorothy from The Wizard of Oz", difficulty: 1 },
    { clue: "The dramatic actor known for Here's looking at you kid", answer: "HUMPHREY BOGART", display: "H_MPHREY B_GART", category: "stars", hint: "Rick from Casablanca", difficulty: 1 },
    { clue: "She was Americas Sweetheart", answer: "MARY PICKFORD", display: "M_RY P_CKFORD", category: "stars", hint: "A silent film star", difficulty: 3 },
    { clue: "The tough guy actor known for westerns", answer: "JOHN WAYNE", display: "J_HN W_YNE", category: "stars", hint: "The Duke", difficulty: 1 },
    { clue: "She danced with Fred Astaire", answer: "AUDREY HEPBURN", display: "A_DREY H_PB_RN", category: "stars", hint: "Also starred in Roman Holiday", difficulty: 1 },
    { clue: "The Rat Pack leader", answer: "FRANK SINATRA", display: "FR_NK SIN_TRA", category: "stars", hint: "Ol Blue Eyes", difficulty: 1 },
    { clue: "He played Frankenstein's monster", answer: "BORIS KARLOFF", display: "B_RIS K_RLOFF", category: "stars", hint: "The queen of horror", difficulty: 2 },
    { clue: "The comedy duo who asked whos on first", answer: "ABBOTT AND COSTELLO", display: "ABBOTT AND COST_LLO", category: "stars", hint: "A famous comedy team", difficulty: 2 },
    { clue: "She was Marilyns rival the blonde bombshell", answer: "JAYNE MANSFIELD", display: "J_YNE M_NSFIELD", category: "stars", hint: "A 1950s actress", difficulty: 3 },
    { clue: "The teenage dream of the 1950s", answer: "RICKY NELSON", display: "R_CKY N_LSON", category: "stars", hint: "The Adventures of Ozzie and Harriet", difficulty: 2 },

    { clue: "Ritchie Valens song about a girl from La Brea", answer: "LA BAMBA", display: "LA B_MBA", category: "music", hint: "A Mexican folk song made famous in 1958", difficulty: 2 },
    { clue: "A romantic ballad about love", answer: "A THOUSAND STARS", display: "A THO_SAND ST_RS", category: "music", hint: "A Kathy Young hit", difficulty: 3 },
    { clue: "A popular dance of the 60s", answer: "THE BUS STOP", display: "THE BUS ST_P", category: "music", hint: "The Dovells song about a dance", difficulty: 3 },
    { clue: "Chubby Checkers hit about twisting", answer: "THE TWIST", display: "THE TW_ST", category: "music", hint: "Twist and shout", difficulty: 1 },
    { clue: "Sam Cookes civil rights anthem", answer: "A CHANGE IS GONNA COME", display: "A CH_NGE IS GONNA COME", category: "music", hint: "A 1964 soul classic", difficulty: 3 }
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
    { scrambled: "BALL", answer: "BALL", clue: "Richie loves to play with this", host: "richie", hostLine: "Throw the ball, Grandma!" }
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
  
  // Family questions can be random (they're meant to be warm/easy)
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
