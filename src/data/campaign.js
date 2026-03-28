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
  }
};

const campaignKeys = Object.keys(campaigns);
