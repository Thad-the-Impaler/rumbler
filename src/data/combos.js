const characterCombos = {
  'BLAZE': [
    {
      name: 'INFERNO RUSH',
      sequence: ['jab', 'jab', 'uppercut'],
      keys: 'Z, Z, X',
      desc: 'Flaming uppercut, burns foe',
      effect: 'burn',
      damageMult: 1.4,
      launch: true,
      effectDuration: 90,
      effectDamage: 4,
      effectTicks: 3,
      effectColor: '#ff4400'
    },
    {
      name: 'BLAZE KICK',
      sequence: ['lowKick', 'highKick', 'highKick'],
      keys: 'C, V, V',
      desc: 'Fire kick with extended range',
      effect: 'knockback',
      damageMult: 1.5,
      launch: false,
      rangeBonus: 30,
      knockbackForce: 8,
      effectColor: '#ff6600'
    }
  ],
  'ARTIK': [
    {
      name: 'FLASH FREEZE',
      sequence: ['jab', 'lowKick', 'jab'],
      keys: 'Z, C, Z',
      desc: 'Freezes opponent in place',
      effect: 'freeze',
      damageMult: 1.2,
      launch: false,
      effectDuration: 50,
      effectColor: '#00ddff'
    },
    {
      name: 'GLACIER SLAM',
      sequence: ['uppercut', 'jab', 'uppercut'],
      keys: 'X, Z, X',
      desc: 'Heavy ice slam, slows foe',
      effect: 'slow',
      damageMult: 1.8,
      launch: true,
      effectDuration: 120,
      effectColor: '#b44dff'
    }
  ],
  'VENOM': [
    {
      name: 'TOXIC BITE',
      sequence: ['jab', 'jab', 'lowKick'],
      keys: 'Z, Z, C',
      desc: 'Poisons foe over time',
      effect: 'poison',
      damageMult: 1.2,
      launch: false,
      effectDuration: 150,
      effectDamage: 3,
      effectTicks: 5,
      effectColor: '#44ff00'
    },
    {
      name: 'VENOM BLAST',
      sequence: ['highKick', 'uppercut', 'uppercut'],
      keys: 'V, X, X',
      desc: 'Explosive poison launch',
      effect: 'poison',
      damageMult: 2.0,
      launch: true,
      effectDuration: 90,
      effectDamage: 3,
      effectTicks: 3,
      effectColor: '#88ff44'
    }
  ],
  'SURGE': [
    {
      name: 'THUNDER CHAIN',
      sequence: ['jab', 'jab', 'jab'],
      keys: 'Z, Z, Z',
      desc: 'Electric triple strike',
      effect: 'chain',
      damageMult: 1.0,
      launch: false,
      chainHits: 3,
      chainDamage: 5,
      effectColor: '#ffff00'
    },
    {
      name: 'BOLT STRIKE',
      sequence: ['lowKick', 'lowKick', 'highKick'],
      keys: 'C, C, V',
      desc: 'Teleport kick, hard to dodge',
      effect: 'teleport_strike',
      damageMult: 1.6,
      launch: false,
      teleportDist: 60,
      rangeBonus: 40,
      effectColor: '#ffdd00'
    }
  ],
  'TITAN': [
    {
      name: 'IRON WALL',
      sequence: ['jab', 'uppercut', 'jab'],
      keys: 'Z, X, Z',
      desc: 'Gains super armor briefly',
      effect: 'armor',
      damageMult: 1.0,
      launch: false,
      effectDuration: 120,
      effectColor: '#ccaa44'
    },
    {
      name: 'EARTHQUAKE',
      sequence: ['lowKick', 'lowKick', 'uppercut'],
      keys: 'C, C, X',
      desc: 'Massive ground pound',
      effect: 'earthquake',
      damageMult: 1.8,
      launch: true,
      shakeIntensity: 14,
      shakeDuration: 20,
      effectColor: '#88aa44'
    }
  ],
  'SHADE': [
    {
      name: 'SHADOW STEP',
      sequence: ['jab', 'highKick', 'jab'],
      keys: 'Z, V, Z',
      desc: 'Teleport behind, bypass block',
      effect: 'shadow_step',
      damageMult: 1.5,
      launch: false,
      effectColor: '#8844aa'
    },
    {
      name: 'PHANTOM SLASH',
      sequence: ['highKick', 'jab', 'highKick'],
      keys: 'V, Z, V',
      desc: 'Go semi-transparent, halve damage taken',
      effect: 'phase',
      damageMult: 1.3,
      launch: false,
      effectDuration: 120,
      effectColor: '#aa88cc'
    }
  ]
};
