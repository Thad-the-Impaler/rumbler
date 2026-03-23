// --- ATTACKS ---
const attacks = {
  jab:      { damage: 6,  range: 60,  startup: 4,  active: 3,  recovery: 8,  hitstun: 12, blockstun: 6,  height: 'mid', name: 'Jab' },
  lowKick:  { damage: 7,  range: 65,  startup: 6,  active: 3,  recovery: 10, hitstun: 14, blockstun: 7,  height: 'low', name: 'Low Kick' },
  uppercut: { damage: 14, range: 55,  startup: 10, active: 4,  recovery: 18, hitstun: 24, blockstun: 12, height: 'high', name: 'Uppercut', launch: true },
  highKick: { damage: 10, range: 70,  startup: 8,  active: 4,  recovery: 14, hitstun: 18, blockstun: 9,  height: 'high', name: 'High Kick' }
};
