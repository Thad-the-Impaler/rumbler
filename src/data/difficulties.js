const difficulties = [
  {
    name: 'EASY',
    color: '#2ecc71',
    accent: '#a8e6cf',
    desc: 'Slow reactions, rarely blocks, light attacks only',
    reactMin: 35, reactRange: 30,       // slow reaction
    blockChance: 0.08,                   // rarely blocks
    attackChance: 0.30,                  // less aggressive
    assistChance: 0.05,                  // rarely uses assist
    uppercut: false,                     // no uppercuts
    damageMult: 0.7                      // reduced damage
  },
  {
    name: 'NORMAL',
    color: '#f39c12',
    accent: '#ffeaa7',
    desc: 'Balanced AI with moderate reactions',
    reactMin: 15, reactRange: 25,
    blockChance: 0.20,
    attackChance: 0.45,
    assistChance: 0.10,
    uppercut: true,
    damageMult: 1.0
  },
  {
    name: 'HARD',
    color: '#e74c3c',
    accent: '#ff7675',
    desc: 'Fast reactions, aggressive, blocks often',
    reactMin: 8, reactRange: 12,         // fast reaction
    blockChance: 0.35,                   // blocks often
    attackChance: 0.55,                  // very aggressive
    assistChance: 0.15,                  // uses assists more
    uppercut: true,
    damageMult: 1.2                      // bonus damage
  },
  {
    name: 'BRUTAL',
    color: '#8b0000',
    accent: '#ff4444',
    desc: 'Near-instant reactions, relentless pressure',
    reactMin: 3, reactRange: 6,          // near-instant
    blockChance: 0.45,                   // blocks very often
    attackChance: 0.60,                  // relentless
    assistChance: 0.20,                  // frequent assists
    uppercut: true,
    damageMult: 1.4                      // high damage
  }
];

