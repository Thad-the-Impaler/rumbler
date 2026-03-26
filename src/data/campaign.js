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
      // Fights 11-20: placeholder
      null, null, null, null, null,
      null, null, null, null, null
    ]
  }
};

const campaignKeys = Object.keys(campaigns);
