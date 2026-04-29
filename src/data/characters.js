const punchingBag = {
  name: 'BAG',
  color: '#8B4513',
  accent: '#D2691E',
  outline: '#5C3317',
  stats: { speed: 0, power: 0, defense: 1.0 },
  desc: 'Punching Bag'
};

const mannequin = {
  name: 'MANNEQUIN',
  color: '#c4a36e',
  accent: '#dbc09a',
  outline: '#8a7040',
  stats: { speed: 0, power: 0.6, defense: 1.0 },
  desc: 'Training Dummy',
  isMannequin: true
};

const drone = {
  name: 'DRONE',
  color: '#7a8a9a',
  accent: '#aabbcc',
  outline: '#4a5a6a',
  stats: { speed: 3.0, power: 0, defense: 1.0 },
  desc: 'Moving Target',
  isDrone: true
};

// --- CHARACTERS ---
const characters = [
  {
    name: 'BLAZE',
    color: '#e63946',
    accent: '#ff6b6b',
    outline: '#a31621',
    stats: { speed: 5, power: 1.1, defense: 0.9 },
    desc: 'Fast & furious'
  },
  {
    name: 'ARTIK',
    color: '#457b9d',
    accent: '#a8dadc',
    outline: '#1d3557',
    stats: { speed: 4, power: 1.0, defense: 1.1 },
    desc: 'Balanced fighter'
  },
  {
    name: 'VENOM',
    color: '#6a0dad',
    accent: '#c77dff',
    outline: '#3c096c',
    stats: { speed: 3.5, power: 1.3, defense: 0.85 },
    desc: 'Heavy hitter'
  },
  {
    name: 'SURGE',
    color: '#f4a261',
    accent: '#e9c46a',
    outline: '#e76f51',
    stats: { speed: 6, power: 0.85, defense: 0.85 },
    desc: 'Lightning speed'
  },
  {
    name: 'TITAN',
    color: '#606c38',
    accent: '#a7c957',
    outline: '#283618',
    stats: { speed: 2.5, power: 1.0, defense: 1.4 },
    desc: 'Iron defense'
  },
  {
    name: 'SHADE',
    color: '#555',
    accent: '#aaa',
    outline: '#222',
    stats: { speed: 5.5, power: 1.05, defense: 0.9 },
    desc: 'Tricky fighter'
  }
];

const bojdoChar = {
  name: 'BOJDO',
  color: '#1a1a1a',
  accent: '#ffcc00',
  outline: '#444',
  stats: { speed: 4, power: 1.0, defense: 1.0 },
  desc: '???',
  isBojdo: true
};

const rubbermanChar = {
  name: 'RUBBERMAN',
  color: '#e8451c',
  accent: '#ffdd44',
  outline: '#8b2500',
  stats: { speed: 4, power: 0.9, defense: 0.85 },
  desc: 'Stretchy striker',
  isRubberman: true
};

const torrenaChar = {
  name: 'TORRENA',
  color: '#1a8fbf',
  accent: '#66ddff',
  outline: '#0d4f6b',
  stats: { speed: 5, power: 1.0, defense: 0.9 },
  desc: 'Water phase shifter',
  isTorrena: true
};

const codemaxChar = {
  name: 'CODEMAX',
  color: '#0a0a2e',
  accent: '#00ff88',
  outline: '#001a0d',
  stats: { speed: 5, power: 0.95, defense: 0.9 },
  desc: 'Holographic swapper',
  isCodemax: true
};

const haystackChar = {
  name: 'HAYSTACK',
  color: '#c4a35a',
  accent: '#e8d491',
  outline: '#7a6230',
  stats: { speed: 3.5, power: 1.1, defense: 1.1 },
  desc: 'Explosive scarecrow',
  isHaystack: true
};

const snazzChar = {
  name: 'SNAZZ MCJAZZ',
  color: '#222222',
  accent: '#ff00ff',
  outline: '#111111',
  stats: { speed: 5, power: 1.0, defense: 0.85 },
  desc: 'Dances to heal',
  isSnazz: true
};

const duplaireChar = {
  name: 'DUPLAIRE',
  color: '#3a5c6e',
  accent: '#66b8cc',
  outline: '#1e3a4a',
  stats: { speed: 4.5, power: 1.0, defense: 0.9 },
  desc: 'Strength in numbers',
  isDuplaire: true
};

const telatrineChar = {
  name: 'TELATRINE',
  color: '#2e1a4a',
  accent: '#b366ff',
  outline: '#1a0a2e',
  stats: { speed: 5.5, power: 0.9, defense: 0.85 },
  desc: 'Beyond boundaries',
  isTelatrine: true
};

const golgarChar = {
  name: 'GOLGAR',
  color: '#5a5a6e',
  accent: '#8b7ec8',
  outline: '#2e2e3e',
  stats: { speed: 4, power: 1.1, defense: 1.05 },
  desc: 'Twin soul swapper',
  isGolgar: true
};

const corvidaChar = {
  name: 'CORVIDA',
  color: '#3a3a5c',
  accent: '#4a90d9',
  outline: '#1a1a2e',
  stats: { speed: 5.5, power: 0.95, defense: 0.85 },
  desc: 'Blue jay shifter',
  isCorvida: true
};

const bozollokChar = {
  name: 'BOZOLLOK',
  color: '#3a2e1a',
  accent: '#c8a030',
  outline: '#1a1400',
  stats: { speed: 4.5, power: 1.1, defense: 0.95 },
  desc: 'Molting insect',
  isBozollok: true
};

const gourmandChar = {
  name: 'GOURMAND',
  color: '#6b4226',
  accent: '#e8a852',
  outline: '#3a2010',
  stats: { speed: 3.5, power: 1.15, defense: 1.1 },
  desc: 'Ravenous devourer',
  isGourmand: true
};

const batschChar = {
  name: 'BATSCH',
  color: '#6b5a3a',
  accent: '#c4a55a',
  outline: '#3a2e1a',
  stats: { speed: 3.5, power: 1.0, defense: 1.0 },
  desc: 'Shell-bound guardian',
  isBatsch: true
};

const paletapChar = {
  name: 'PALETAP',
  color: '#c8c8c8',
  accent: '#f0f0f0',
  outline: '#888888',
  stats: { speed: 3.0, power: 1.2, defense: 1.15 },
  desc: 'Towering tremor',
  isPaletap: true
};

const killawattChar = {
  name: 'KILLA WATT',
  color: '#e9c46a',
  accent: '#00e5ff',
  outline: '#e76f51',
  stats: { speed: 5.5, power: 0.95, defense: 0.8 },
  desc: 'Surge\'s electric sister',
  isKillawatt: true
};

const backtrackChar = {
  name: 'BACKTRACK',
  color: '#7b2d8e',
  accent: '#b44dff',
  outline: '#4a1a55',
  stats: { speed: 4.0, power: 1.0, defense: 1.0 },
  desc: 'Time rewinder',
  isBacktrack: true
};

const exorChar = {
  name: 'EXOR',
  color: '#1a2e1a',
  accent: '#39ff14',
  outline: '#0a1a0a',
  stats: { speed: 3.5, power: 0.85, defense: 0.9 },
  desc: 'Life force drainer',
  isExor: true
};

const buckChar = {
  name: 'BUCK',
  color: '#cc0000',
  accent: '#ffffff',
  outline: '#002868',
  stats: { speed: 3.0, power: 1.3, defense: 1.1 },
  desc: 'Patriotic powerhouse',
  isBuck: true
};

const matadorChar = {
  name: 'MATADOR',
  color: '#8b0000',
  accent: '#ff2222',
  outline: '#4a0000',
  stats: { speed: 4.5, power: 0.9, defense: 0.8 },
  desc: 'Dashing blade',
  isMatador: true
};

const vorticeChar = {
  name: 'VORTICE',
  color: '#4a6a5a',
  accent: '#88eebb',
  outline: '#2a4a3a',
  stats: { speed: 2.8, power: 1.0, defense: 1.2 },
  desc: 'Mistress of wind',
  isVortice: true
};

const xhaustChar = {
  name: 'X-HAUST',
  color: '#5a5a5a',
  accent: '#ff8833',
  outline: '#333333',
  stats: { speed: 2.2, power: 1.4, defense: 1.3 },
  desc: 'Combustion engine of war',
  isXhaust: true
};

const dryadChar = {
  name: 'DRYAD',
  color: '#3a6a2e',
  accent: '#8fc965',
  outline: '#1f3a18',
  stats: { speed: 4.0, power: 0.95, defense: 1.0 },
  desc: 'Forest wallmaker',
  isDryad: true
};

const kavakChar = {
  name: 'KAVAK',
  color: '#2a2a2e',
  accent: '#5a4a3a',
  outline: '#0f0f12',
  stats: { speed: 4.5, power: 1.0, defense: 0.95 },
  desc: 'The Mercenary',
  isKavak: true
};

const aetherChar = {
  name: 'AETHER',
  color: '#e89c2a',
  accent: '#ffe88a',
  outline: '#8a4a10',
  stats: { speed: 4.0, power: 1.0, defense: 1.0 },
  desc: 'Crowned of light',
  isAether: true
};

// Fixed order for secret characters (after base roster)
const secretCharOrder = [bojdoChar, rubbermanChar, torrenaChar, snazzChar, haystackChar, codemaxChar, corvidaChar, golgarChar, telatrineChar, duplaireChar, bozollokChar, gourmandChar, batschChar, paletapChar, matadorChar, killawattChar, backtrackChar, exorChar, buckChar, vorticeChar, xhaustChar, dryadChar, kavakChar, aetherChar];

// Locked character hints (code hints, not the actual code)
const secretCharHints = new Map([
  [bojdoChar, 'Think of his name...'],
  [rubbermanChar, 'He bounces back...'],
  [torrenaChar, 'A rising tide...'],
  [snazzChar, 'Stylish numbers...'],
  [haystackChar, 'Not so bright...'],
  [codemaxChar, 'Page not found...'],
  [corvidaChar, 'Birds of a kind...'],
  [golgarChar, 'Stone guardian...'],
  [telatrineChar, 'Into the nothing...'],
  [duplaireChar, 'Strength in numbers...'],
  [bozollokChar, 'Shedding skin...'],
  [gourmandChar, 'A grand meal...'],
  [batschChar, 'Hard exterior...'],
  [paletapChar, 'Shake and quake...'],
  [matadorChar, 'A bullfighter\'s grace...'],
  [killawattChar, 'Shocking voltage...'],
  [backtrackChar, 'Undo what was done...'],
  [exorChar, 'Draining the living...'],
  [buckChar, 'Stars and stripes forever...'],
  [vorticeChar, 'Caught in a spiral...'],
  [xhaustChar, 'Fuel the fire...'],
  [dryadChar, 'From seed to bloom...'],
  [kavakChar, 'A whirlwind of fists...'],
  [aetherChar, 'Light worn as a crown...'],
]);
function insertCharOrdered(char) {
  const orderIdx = secretCharOrder.indexOf(char);
  for (let i = 0; i < characters.length; i++) {
    const ci = secretCharOrder.indexOf(characters[i]);
    if (ci > orderIdx) {
      characters.splice(i, 0, char);
      return;
    }
  }
  characters.push(char);
}
