// --- LEVELS ---
const defaultLevels = [
  { name: 'CLASSIC', desc: 'The original arena', color: '#4a4a7a', accent: '#8888cc' },
  { name: 'THE TEMPLE', desc: 'An ancient shrine to forgotten gods', color: '#8B7355', accent: '#D4A574' },
  { name: 'THE PEAK', desc: 'A snow-capped mountain summit', color: '#87CEEB', accent: '#E8F4FD' },
  { name: 'THE DEN', desc: 'A burning hellscape of fire and lava', color: '#8B0000', accent: '#FF4500' },
  { name: 'THE VOID', desc: 'The surface of a meteor adrift in space', color: '#1a0a2e', accent: '#6644aa' }
];

const secretLevelOrder = ['SNOWY CITY', 'FOGGY CITY', 'RAINY CITY', 'GLOWING CITY', 'SUNNY CITY'];
const secretLevelHints = {
  'SNOWY CITY': 'The city that never sleeps',
  'FOGGY CITY': 'The city by the bay',
  'RAINY CITY': 'The emerald city',
  'GLOWING CITY': 'The city of lights',
  'SUNNY CITY': 'The city of angels'
};

const secretLevels = [
  { name: 'SNOWY CITY', desc: 'The skyline of NYC in winter snow', color: '#4169E1', accent: '#ADD8E6', unlocked: () => snowyCityUnlocked },
  { name: 'FOGGY CITY', desc: 'The skyline of SF shrouded in fog', color: '#C85A17', accent: '#FFB347', unlocked: () => foggyCityUnlocked },
  { name: 'RAINY CITY', desc: 'The skyline of Seattle in the rain', color: '#2F4F4F', accent: '#708090', unlocked: () => rainyCityUnlocked },
  { name: 'GLOWING CITY', desc: 'The skyline of Las Vegas at night', color: '#FFD700', accent: '#FF69B4', unlocked: () => glowingCityUnlocked },
  { name: 'SUNNY CITY', desc: 'The skyline of LA under golden sun', color: '#FF8C00', accent: '#FFD700', unlocked: () => sunnyCityUnlocked }
];

// Campaign-only levels (not selectable in other modes)
const campaignLevels = [
  { name: 'THE DUST', desc: 'A forgotten realm of ancient kings', color: '#1a0a2e', accent: '#ff6b35' }
];

function getLevels() {
  const lvls = [...defaultLevels];
  for (const sl of secretLevels) {
    if (sl.unlocked()) lvls.push(sl);
  }
  return lvls;
}
