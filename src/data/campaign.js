// --- CAMPAIGN DATA ---

// Boss: Campaigner Borgus (non-playable)
const borgusChar = {
  name: 'BORGUS',
  color: '#994400',
  accent: '#ff8800',
  outline: '#552200',
  stats: { speed: 3.5, power: 1.3, defense: 1.3 },
  desc: 'Campaigner Boss',
  isBorgus: true,
  isBoss: true
};

// Boss: Campaigner Erictho (non-playable)
const ericthoChar = {
  name: 'ERICTHO',
  color: '#4a2066',
  accent: '#111111',
  outline: '#1a0a2a',
  stats: { speed: 5.0, power: 1.1, defense: 0.9 },
  desc: 'Shadow Sorceress',
  isErictho: true,
  isBoss: true
};

// Boss: Campaigner Quellic (non-playable)
const quellicChar = {
  name: 'QUELLIC',
  color: '#cc3300',
  accent: '#ff6600',
  outline: '#661100',
  stats: { speed: 4.5, power: 1.2, defense: 1.0 },
  desc: 'Fire Phaser',
  isQuellic: true,
  isBoss: true
};

// Boss: Campaigner Bojdobojdobojdo (non-playable)
const bojdo3Char = {
  name: 'BOJDOBOJDOBOJDO',
  color: '#1a1a1a',
  accent: '#9944cc',
  outline: '#444',
  stats: { speed: 4, power: 1.0, defense: 1.2 },
  desc: 'Ultimate Size Shifter',
  isBojdo: true,
  isBojdo3: true,
  isBoss: true,
  maxHealth: 250
};

// Campaign-only Bojdo: a standalone copy that never gets mutated by Bojdobojdo unlock
const campaignBojdoChar = {
  name: 'BOJDO',
  color: '#1a1a1a',
  accent: '#ffcc00',
  outline: '#444',
  stats: { speed: 4, power: 1.0, defense: 1.0 },
  desc: '???',
  isBojdo: true,
  isCampaignBojdo: true
};

// Campaign-only Bojdobojdo: standalone copy with extended size range
const campaignBojdobojdoChar = {
  name: 'BOJDOBOJDO',
  color: '#1a1a1a',
  accent: '#ff6600',
  outline: '#444',
  stats: { speed: 4, power: 1.0, defense: 1.0 },
  desc: 'Size Shifter Supreme',
  isBojdo: true
};

// Boss: Campaigner Six Iron-Nine Iron (non-playable)
const sixIronChar = {
  name: 'SIX IRON-NINE IRON',
  color: '#8B6B3D',
  accent: '#D4A04A',
  outline: '#5C4422',
  stats: { speed: 4.5, power: 1.2, defense: 1.0 },
  desc: 'Golf Cowboy',
  isSixIron: true,
  isBoss: true,
  maxHealth: 240
};

// Boss: The Count (non-playable)
const theCountChar = {
  name: 'THE COUNT',
  color: '#8B1A1A',
  accent: '#DAA520',
  outline: '#4A0A0A',
  stats: { speed: 4.0, power: 1.1, defense: 1.2 },
  desc: 'The Dark Celebrant',
  isTheCount: true,
  isBoss: true,
  maxHealth: 220
};

// Boss: Campaigner Relapmi (non-playable)
const relapmiChar = {
  name: 'RELAPMI',
  color: '#1a1a55',
  accent: '#111111',
  outline: '#33ff66',
  stats: { speed: 4.5, power: 1.3, defense: 1.1 },
  desc: 'Ghost of a Forgotten King',
  isRelapmi: true,
  isBoss: true,
  maxHealth: 250
};

// Bonus: Printer (non-playable, doesn't fight back)
const printerChar = {
  name: 'PRINTER',
  color: '#cccccc',
  accent: '#eeeeee',
  outline: '#888888',
  stats: { speed: 0, power: 0, defense: 0.6 },
  desc: 'Office Printer',
  isPrinter: true
};

// Boss: Campaigner Scalena (non-playable)
const scalenaChar = {
  name: 'SCALENA',
  color: '#2d5a27',
  accent: '#7bc96a',
  outline: '#1a3a14',
  stats: { speed: 4.0, power: 1.15, defense: 1.1 },
  desc: 'Serpent Queen',
  isScalena: true,
  isBoss: true,
  maxHealth: 200
};

// Boss: Campaigner Birdeater (non-playable)
const birdeaterChar = {
  name: 'BIRDEATER',
  color: '#8B6914',
  accent: '#DAA520',
  outline: '#5C4400',
  stats: { speed: 3.0, power: 1.3, defense: 1.4 },
  desc: 'Giant Arachnid',
  isBirdeater: true,
  isBoss: true,
  maxHealth: 230
};

// Boss: Campaigner Hangman (non-playable)
const hangmanChar = {
  name: 'HANGMAN',
  color: '#5a4a6a',
  accent: '#9988bb',
  outline: '#2a1a3a',
  stats: { speed: 4.0, power: 1.2, defense: 1.0 },
  desc: 'The Disassembler',
  isHangman: true,
  isBoss: true,
  maxHealth: 200
};

// Boss: Campaigner Twins (non-playable, two fighters)
const twinsChar = {
  name: 'TWINS',
  color: '#8B6B3D',       // Helios: brown
  accent: '#DAA520',       // Helios: yellow/gold
  outline: '#5C4422',
  twinColor: '#4466aa',    // Selene: blue
  twinAccent: '#ccddff',   // Selene: white-blue
  twinOutline: '#223366',
  stats: { speed: 4.5, power: 1.0, defense: 0.85 },
  desc: 'Helios & Selene',
  isTwins: true,
  isBoss: true,
  maxHealth: 220
};

// Boss: Tube Warden (non-playable)
const tubeWardenChar = {
  name: 'TUBE WARDEN',
  color: '#3a3a3a',
  accent: '#00ccbb',
  outline: '#1a1a1a',
  stats: { speed: 3.5, power: 1.25, defense: 1.3 },
  desc: 'Vial Launcher',
  isTubeWarden: true,
  isBoss: true,
  scale: 1.2,
  maxHealth: 220
};

// Boss: Orcus (non-playable)
const orcusChar = {
  name: 'ORCUS',
  color: '#1a1a2e',
  accent: '#2a2a3e',
  outline: '#00ff44',
  stats: { speed: 4.0, power: 1.2, defense: 1.1 },
  desc: 'Otherworldly Master',
  isOrcus: true,
  isBoss: true,
  maxHealth: 240
};

// Boss: Head (non-playable)
const headChar = {
  name: 'HEAD',
  color: '#ddcc66',
  accent: '#ffee88',
  outline: '#aa9933',
  stats: { speed: 3.0, power: 1.0, defense: 1.0 },
  desc: 'Just A Head',
  isHead: true,
  isBoss: true,
  maxHealth: 300
};

// Boss: Dark Bojdo (non-playable)
const darkBojdoChar = {
  name: 'DARK BOJDO',
  color: '#ffcc00',
  accent: '#1a1a1a',
  outline: '#aa8800',
  stats: { speed: 4, power: 1.0, defense: 1.0 },
  desc: 'Reverse Size Shifter',
  isDarkBojdo: true,
  isBojdo: true, // uses Bojdo size-shifting system
  isBoss: true,
  maxHealth: 220
};

// Boss: Six Driver-Nine Iron (enhanced Six Iron)
const sixDriverChar = {
  name: 'SIX DRIVER-NINE IRON',
  color: '#5a3a1a',
  accent: '#cc8844',
  outline: '#3a2010',
  stats: { speed: 4.5, power: 1.3, defense: 1.1 },
  desc: 'Enhanced Cowboy Golfer',
  isSixIron: true, // reuse Six Iron mechanics
  isSixDriver: true,
  isBoss: true,
  maxHealth: 230
};

// Boss: Maneater (enhanced Birdeater)
const maneaterChar = {
  name: 'MANEATER',
  color: '#3a1a0a',
  accent: '#cc6622',
  outline: '#1a0a00',
  stats: { speed: 4.0, power: 1.4, defense: 1.3 },
  desc: 'Giant Arachnid',
  isBirdeater: true,
  isManeater: true,
  isBoss: true,
  scale: 1.5,
  maxHealth: 280
};

// Boss: Groove McSmooth (Dark Snazz McJazz)
const grooveMcSmoothChar = {
  name: 'GROOVE MCSMOOTH',
  color: '#6a2d8a',
  accent: '#333333',
  outline: '#3a1a4a',
  stats: { speed: 5.0, power: 1.0, defense: 0.9 },
  desc: 'The Eternal Dancer',
  isSnazz: true,
  isGrooveMcSmooth: true,
  isBoss: true,
  maxHealth: 200
};

// Boss: The Count (enhanced, final battle)
const theCountFinalChar = {
  name: 'THE COUNT',
  color: '#8B1A1A',
  accent: '#DAA520',
  outline: '#4A0A0A',
  stats: { speed: 6.0, power: 1.5, defense: 1.3 },
  desc: 'The Dark Celebrant',
  isTheCount: true,
  isTheCountFinal: true,
  isBoss: true,
  maxHealth: 350
};

// Boss: Dark Duplaire
const darkDuplaireChar = {
  name: 'DARK DUPLAIRE',
  color: '#00ccbb',
  accent: '#005550',
  outline: '#003a35',
  stats: { speed: 5.0, power: 0.9, defense: 0.8 },
  desc: 'The Clone Army',
  isDuplaire: true,
  isDarkDuplaire: true,
  isBoss: true,
  maxHealth: 220
};

// Boss: Canis
const canisChar = {
  name: 'CANIS',
  color: '#6a4a2a',
  accent: '#a07040',
  outline: '#3a2a1a',
  stats: { speed: 5.0, power: 1.1, defense: 1.0 },
  desc: 'The Shapeshifter',
  isCanis: true,
  isBoss: true,
  maxHealth: 210
};

// Printer Boss (for practice mode — the actual fight creates this dynamically)
const printerBossChar = {
  name: 'PRINTER',
  color: '#999999',
  accent: '#cccccc',
  outline: '#666666',
  stats: { speed: 3.5, power: 1.2, defense: 1.1 },
  desc: 'The Awakened Printer',
  isPrinterBoss: true,
  isBoss: true,
  maxHealth: 250
};

const campaigns = {
  'brawler': {
    name: "BRAWLER'S CAMPAIGN",
    desc: 'Fight through a gauntlet of 20 challengers',
    fights: [
      { opponent: 'VENOM', difficulty: 'Easy', level: 'CLASSIC' },
      { opponent: 'TITAN', difficulty: 'Easy', level: 'THE TEMPLE' },
      { opponent: 'BLAZE', difficulty: 'Easy', level: 'THE DEN' },
      { opponent: 'TORRENA', difficulty: 'Easy', level: 'THE VOID' },
      { opponent: borgusChar, difficulty: 'Easy', level: 'CLASSIC', isBoss: true },
      { opponent: 'ARTIK', difficulty: 'Normal', level: 'THE PEAK' },
      { opponent: 'CODEMAX', difficulty: 'Normal', level: 'THE TEMPLE' },
      { opponent: 'SURGE', difficulty: 'Normal', level: 'THE VOID' },
      { opponent: 'HAYSTACK', difficulty: 'Normal', level: 'THE DEN' },
      { opponent: ericthoChar, difficulty: 'Normal', level: 'THE TEMPLE', isBoss: true },
      { opponent: campaignBojdoChar, difficulty: 'Hard', level: 'FOGGY CITY' },
      { opponent: 'BOZOLLOK', difficulty: 'Hard', level: 'SUNNY CITY' },
      { opponent: 'MATADOR', difficulty: 'Hard', level: 'SNOWY CITY' },
      { opponent: 'SHADE', difficulty: 'Hard', level: 'RAINY CITY' },
      { opponent: quellicChar, difficulty: 'Hard', level: 'GLOWING CITY', isBoss: true },
      { opponent: 'CORVIDA', difficulty: 'Brutal', level: 'RAINY CITY' },
      { opponent: 'BUCK', difficulty: 'Brutal', level: 'SNOWY CITY' },
      { opponent: 'PALETAP', difficulty: 'Brutal', level: 'FOGGY CITY' },
      { opponent: 'GOLGAR', difficulty: 'Brutal', level: 'GLOWING CITY' },
      { opponent: bojdo3Char, difficulty: 'Brutal', level: 'SUNNY CITY', isBoss: true },
      { opponent: printerChar, difficulty: 'Easy', level: 'CLASSIC', isBonus: true, bonusType: 'testYourMight', bonusTime: 30 }
    ]
  },
  'warrior': {
    name: "WARRIOR'S CAMPAIGN",
    desc: 'A tougher gauntlet of 25 challengers',
    fights: [
      { opponent: 'SNAZZ MCJAZZ', difficulty: 'Normal', level: 'GLOWING CITY' },
      { opponent: 'DUPLAIRE', difficulty: 'Normal', level: 'CLASSIC' },
      { opponent: 'ARTIK', difficulty: 'Normal', level: 'THE TEMPLE' },
      { opponent: 'TELATRINE', difficulty: 'Normal', level: 'SUNNY CITY' },
      { opponent: scalenaChar, difficulty: 'Normal', level: 'THE DEN', isBoss: true },
      { opponent: 'KILLA WATT', difficulty: 'Hard', level: 'THE VOID' },
      { opponent: 'BATSCH', difficulty: 'Hard', level: 'FOGGY CITY' },
      { opponent: 'EXOR', difficulty: 'Hard', level: 'THE PEAK' },
      { opponent: 'BLAZE', difficulty: 'Hard', level: 'CLASSIC' },
      { opponent: birdeaterChar, difficulty: 'Hard', level: 'THE TEMPLE', isBoss: true },
      { opponent: campaignBojdobojdoChar, difficulty: 'Hard', level: 'SNOWY CITY' },
      { opponent: 'VORTICE', difficulty: 'Hard', level: 'RAINY CITY' },
      { opponent: 'GOURMAND', difficulty: 'Hard', level: 'THE DEN' },
      { opponent: 'BACKTRACK', difficulty: 'Hard', level: 'SUNNY CITY' },
      { opponent: sixIronChar, difficulty: 'Hard', level: 'FOGGY CITY', isBoss: true },
      { opponent: 'HAYSTACK', difficulty: 'Brutal', level: 'THE TEMPLE' },
      { opponent: 'GOLGAR', difficulty: 'Brutal', level: 'RAINY CITY' },
      { opponent: 'CORVIDA', difficulty: 'Brutal', level: 'THE VOID' },
      { opponent: 'MATADOR', difficulty: 'Brutal', level: 'CLASSIC' },
      { opponent: relapmiChar, difficulty: 'Brutal', level: 'THE DUST', isBoss: true },
      { opponent: 'BUCK', difficulty: 'Brutal', level: 'SUNNY CITY' },
      { opponent: 'X-HAUST', difficulty: 'Brutal', level: 'THE DEN' },
      { opponent: 'PALETAP', difficulty: 'Brutal', level: 'RAINY CITY' },
      { opponent: 'RUBBERMAN', difficulty: 'Brutal', level: 'THE PEAK' },
      { opponent: theCountChar, difficulty: 'Easy', level: 'THE DUST', isBoss: true, music: 'THE COUNT' },
      { opponent: printerChar, difficulty: 'Easy', level: 'CLASSIC', isBonus: true, bonusType: 'testYourMight', bonusTime: 30 }
    ]
  },
  'champion': {
    name: "CHAMPION'S CAMPAIGN",
    desc: 'The ultimate 45-fight gauntlet',
    displayFightCount: 35, // show 35 until fight 36 is reached, then reveal true count
    revealAtFight: 35, // 0-indexed: after completing fight 35 (the 36th), reveal real count
    fights: [
      { opponent: 'TITAN', difficulty: 'Easy', level: 'THE TEMPLE' },
      { opponent: 'ARTIK', difficulty: 'Easy', level: 'THE PEAK' },
      { opponent: 'SNAZZ MCJAZZ', difficulty: 'Easy', level: 'GLOWING CITY' },
      { opponent: 'CODEMAX', difficulty: 'Easy', level: 'FOGGY CITY' },
      { opponent: hangmanChar, difficulty: 'Easy', level: 'THE VOID', isBoss: true },
      { opponent: 'BLAZE', difficulty: 'Normal', level: 'THE DEN' },
      { opponent: 'TORRENA', difficulty: 'Normal', level: 'RAINY CITY' },
      { opponent: 'VENOM', difficulty: 'Normal', level: 'SUNNY CITY' },
      { opponent: 'TELATRINE', difficulty: 'Normal', level: 'THE VOID' },
      { opponent: twinsChar, difficulty: 'Normal', level: 'THE TEMPLE', isBoss: true },
      { opponent: 'DUPLAIRE', difficulty: 'Hard', level: 'SNOWY CITY' },
      { opponent: 'VORTICE', difficulty: 'Hard', level: 'THE PEAK' },
      { opponent: campaignBojdoChar, difficulty: 'Hard', level: 'FOGGY CITY' },
      { opponent: 'BOZOLLOK', difficulty: 'Hard', level: 'CLASSIC' },
      { opponent: tubeWardenChar, difficulty: 'Hard', level: 'THE DUST', isBoss: true },
      { opponent: 'CORVIDA', difficulty: 'Hard', level: 'THE TEMPLE' },
      { opponent: 'SURGE', difficulty: 'Hard', level: 'RAINY CITY' },
      { opponent: 'KILLA WATT', difficulty: 'Hard', level: 'GLOWING CITY' },
      { opponent: 'EXOR', difficulty: 'Hard', level: 'THE VOID' },
      { opponent: orcusChar, difficulty: 'Hard', level: 'THE DUST', isBoss: true },
      { opponent: 'BATSCH', difficulty: 'Hard', level: 'THE TEMPLE' },
      { opponent: 'SHADE', difficulty: 'Hard', level: 'CLASSIC' },
      { opponent: 'HAYSTACK', difficulty: 'Hard', level: 'SUNNY CITY' },
      { opponent: 'GOURMAND', difficulty: 'Hard', level: 'FOGGY CITY' },
      { opponent: headChar, difficulty: 'Hard', level: 'THE DUST', isBoss: true },
      { opponent: 'X-HAUST', difficulty: 'Hard', level: 'CLASSIC' },
      { opponent: 'BACKTRACK', difficulty: 'Hard', level: 'GLOWING CITY' },
      { opponent: 'BUCK', difficulty: 'Hard', level: 'SNOWY CITY' },
      { opponent: 'PALETAP', difficulty: 'Hard', level: 'THE VOID' },
      { opponent: darkBojdoChar, difficulty: 'Hard', level: 'THE DUST', isBoss: true },
      { opponent: 'GOLGAR', difficulty: 'Brutal', level: 'THE TEMPLE' },
      { opponent: 'RUBBERMAN', difficulty: 'Brutal', level: 'RAINY CITY' },
      { opponent: campaignBojdobojdoChar, difficulty: 'Brutal', level: 'SUNNY CITY' },
      { opponent: 'MATADOR', difficulty: 'Brutal', level: 'THE DEN' },
      { opponent: sixDriverChar, difficulty: 'Brutal', level: 'FOGGY CITY', isBoss: true },
      { opponent: printerChar, difficulty: 'Easy', level: 'CLASSIC', isBonus: true, bonusType: 'testYourMight', bonusTime: 30, isPrinterBoss: true },
      { opponent: maneaterChar, difficulty: 'Brutal', level: 'THE DEN', isBoss: true },
      { opponent: ericthoChar, difficulty: 'Brutal', level: 'THE TEMPLE', isBoss: true },
      { opponent: quellicChar, difficulty: 'Brutal', level: 'CLASSIC', isBoss: true },
      { opponent: scalenaChar, difficulty: 'Brutal', level: 'SNOWY CITY', isBoss: true },
      { opponent: grooveMcSmoothChar, difficulty: 'Brutal', level: 'GLOWING CITY', isBoss: true },
      { opponent: darkDuplaireChar, difficulty: 'Brutal', level: 'THE VOID', isBoss: true },
      { opponent: canisChar, difficulty: 'Brutal', level: 'THE PEAK', isBoss: true },
      { opponent: relapmiChar, difficulty: 'Brutal', level: 'THE DUST', isBoss: true },
      { opponent: theCountFinalChar, difficulty: 'Brutal', level: 'THE PULP', isBoss: true, music: 'THE COUNT' }
    ]
  }
};

const campaignKeys = Object.keys(campaigns);
