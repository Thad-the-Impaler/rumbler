function drawPauseOverlay() {
  ctx.fillStyle = 'rgba(0,0,0,0.8)';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 42px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('PAUSED', 480, 55);

  // Left column: Controls
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ccc';
  ctx.fillText('CONTROLS', 240, 100);

  const controls = [
    ['Movement', 'Arrows / WASD'],
    ['Jump', 'Up / W'],
    ['Crouch', 'Down / S'],
    ['Block', 'Q / Walk Back'],
    ['Jab', 'Z'],
    ['Uppercut', 'X'],
    ['Low Kick', 'C'],
    ['High Kick', 'V'],
    ['Assist', 'B'],
    ['Pause', 'Space'],
    ['Quit', 'Escape'],
    ...(gameMode === 'practice' ? [['Reset ' + (selectedCPU.isMannequin ? 'Mannequin' : selectedCPU.isDrone ? 'Drone' : 'Bag'), 'M']] : [])
  ];

  ctx.font = '13px Arial';
  for (let i = 0; i < controls.length; i++) {
    const y = 130 + i * 26;
    ctx.textAlign = 'right';
    ctx.fillStyle = '#bbb';
    ctx.fillText(controls[i][0], 220, y);
    ctx.textAlign = 'left';
    ctx.fillStyle = '#ff6b35';
    ctx.fillText(controls[i][1], 250, y);
  }

  // Right column: Rumble move (during finishHim) or Combo Moves (during fight)
  if (gameState === 'finishHim') {
    const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
    const rumbleEntry = characterRumbles[winChar.name];
    const rumbleList = rumbleEntry ? (Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry]) : [];

    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff2222';
    ctx.fillText(rumbleList.length > 1 ? 'RUMBLES' : 'RUMBLE', 700, 100);

    if (rumbleList.length > 0 && winner === 'player') {
      let yOffset = 130;
      for (let ri = 0; ri < rumbleList.length; ri++) {
        const rumble = rumbleList[ri];
        // Rumble move name (supports *italic* markers)
        ctx.textAlign = 'left';
        ctx.fillStyle = winChar.accent;
        const nameParts = rumble.name.split('*');
        let nameX = 540;
        for (let np = 0; np < nameParts.length; np++) {
          ctx.font = np % 2 === 1 ? 'bold italic 15px Arial' : 'bold 15px Arial';
          ctx.fillText(nameParts[np], nameX, yOffset);
          nameX += ctx.measureText(nameParts[np]).width;
        }

        // Code key caps
        const codeLetters = rumble.code.toUpperCase().split('');
        for (let k = 0; k < codeLetters.length; k++) {
          const kx = 555 + k * 38;
          const ky = yOffset + 28;
          ctx.fillStyle = '#333';
          ctx.strokeStyle = '#777';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.roundRect(kx - 13, ky - 13, 26, 26, 5);
          ctx.fill();
          ctx.stroke();
          ctx.font = 'bold 14px Arial';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#fff';
          ctx.fillText(codeLetters[k], kx, ky + 5);
        }

        // Description
        ctx.font = '12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#aaa';
        ctx.fillText(rumble.desc, 543, yOffset + 60);

        // Effect color dot
        ctx.fillStyle = winChar.accent;
        ctx.shadowColor = winChar.accent;
        ctx.shadowBlur = 6;
        ctx.beginPath();
        ctx.arc(535, yOffset + 56, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        yOffset += 90;
      }
    } else {
      ctx.font = '13px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#666';
      ctx.fillText('No rumble available', 700, 150);
    }
  } else {
  ctx.font = 'bold 18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedPlayer.accent;
  const hasSpecialAbility = selectedPlayer.isBojdo || selectedPlayer.isRubberman || selectedPlayer.isTorrena || selectedPlayer.isSnazz || selectedPlayer.isHaystack || selectedPlayer.isCodemax || selectedPlayer.isCorvida || selectedPlayer.isGolgar || selectedPlayer.isTelatrine || selectedPlayer.isDuplaire || selectedPlayer.isBozollok || selectedPlayer.isGourmand || selectedPlayer.isBatsch || selectedPlayer.isPaletap || selectedPlayer.isMatador || selectedPlayer.isKillawatt || selectedPlayer.isBacktrack || selectedPlayer.isExor || selectedPlayer.isBuck;
  ctx.fillText(`${selectedPlayer.name} ${hasSpecialAbility ? 'ABILITIES' : 'COMBOS'}`, 700, 100);

  const combos = characterCombos[selectedPlayer.name];
  if (combos) {
    for (let c = 0; c < combos.length; c++) {
      const combo = combos[c];
      const baseY = 135 + c * 130;

      // Combo name
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = selectedPlayer.accent;
      ctx.fillText(combo.name, 540, baseY);

      // Key sequence with styled key caps
      const keyMap = { jab: 'Z', lowKick: 'C', uppercut: 'X', highKick: 'V' };
      for (let k = 0; k < combo.sequence.length; k++) {
        const kx = 555 + k * 55;
        const ky = baseY + 25;
        // Key cap
        ctx.fillStyle = '#333';
        ctx.strokeStyle = '#777';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(kx - 14, ky - 14, 28, 28, 5);
        ctx.fill();
        ctx.stroke();
        ctx.font = 'bold 15px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText(keyMap[combo.sequence[k]], kx, ky + 5);

        // Arrow between keys
        if (k < combo.sequence.length - 1) {
          ctx.font = '14px Arial';
          ctx.fillStyle = '#666';
          ctx.fillText('>', kx + 24, ky + 4);
        }
      }

      // Description
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(combo.desc, 543, baseY + 60);

      // Effect color dot
      ctx.fillStyle = combo.effectColor;
      ctx.shadowColor = combo.effectColor;
      ctx.shadowBlur = 6;
      ctx.beginPath();
      ctx.arc(535, baseY + 56, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Special abilities for characters without combos
  if (selectedPlayer.isBojdo) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SIZE SHIFTING', 540, 135);

    const abilities = [
      ['K', 'Hold to grow bigger'],
      ['L', 'Hold to shrink smaller'],
    ];
    const details = [
      'Bigger = more power, range & defense',
      'Smaller = faster movement speed',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      // Key cap
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isRubberman) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('RUBBER STRETCH', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Passive ability', 543, ay + 5);

    const tips = [
      'Attacks stretch to reach the opponent',
      'Range extends up to half the screen',
      'Damage decreases with distance',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isTorrena) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('WATER PHASE', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('H', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Toggle Water Phase', 580, ay + 5);

    const tips = [
      'Become pure water - pass through opponent',
      'Immune to all damage while active',
      'Cannot attack while in Water Phase',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isSnazz) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('JAZZ DANCE', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('J', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Start dancing (2s)', 580, ay + 5);

    const tips = [
      'Complete the dance to heal 25 HP',
      'Getting hit during dance = 2x damage',
      'Cannot move or attack while dancing',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isHaystack) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('HAY EXPLOSION', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('F', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Explode into projectiles', 580, ay + 5);

    const tips = [
      'Arrows fly in all directions',
      'Sword flies randomly for extra damage',
      'Takes 1 second to reform',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isCodemax) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('CODE PORT', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('N', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Swap positions', 580, ay + 5);

    const tips = [
      'Teleport and switch places with foe',
      '3 second cooldown between swaps',
      'Glitch effect on both fighters',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isCorvida) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('BLUE JAY FORM', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('\u2191\u2191', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Double-press jump', 580, ay + 5);

    const tips = [
      'Transform into a blue jay mid-air',
      'Fly freely, land to revert to normal',
      'Beak attacks are much weaker',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isGolgar) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SOUL SWAP', 540, 135);

    const ay = 160;
    // Key cap
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('G', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Switch entities', 580, ay + 5);

    const tips = [
      'Two bodies share one soul',
      'Dormant entity becomes a statue',
      'Switch to the other wherever it was left',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isTelatrine) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('WARP WALK', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Passive ability', 543, ay + 5);

    const tips = [
      'Walk past the edge of the stage',
      'Reappear on the opposite side',
      'Works like a warp tunnel',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isDuplaire) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('CLONE ARMY', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press K to create a clone', 543, ay + 5);

    const tips = [
      'Clones take 3 seconds to activate',
      'Up to 6 clones can be created',
      'Damage and health are split among all bodies',
      'Health bar shows sections for each clone',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBozollok) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SKIN SHED', 540, 135);

    const ay = 160;
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Press H to molt', 543, ay + 5);

    const tips = [
      'Leap high out of your skin',
      'Hover briefly at the apex',
      'Descend with claw attack on nearby foes',
      'Leaves a decomposing husk behind',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isGourmand) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('ENERGY ABSORB', 540, 135);

    const abilities = [
      ['L', 'Open mouth to absorb damage'],
      ['P', 'Shoot stored energy ball'],
    ];
    const details = [
      'Incoming hits charge energy instead',
      'Damage equals energy stored (up to 80)',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isBatsch) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TORTOISE FORM', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('\u2193\u2193', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Double-tap crouch', 580, ay + 5);

    const tips = [
      'Retreat into a protective shell',
      'Takes 60% less damage while transformed',
      'Movement speed reduced to half',
      'Jump to exit tortoise form',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isPaletap) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('GROUND SLAM', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('K', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Slam the ground', 580, ay + 5);

    const tips = [
      'Sends a shockwave along the ground',
      'Hits grounded opponents, misses crouchers',
      'Cannot move during the slam',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isMatador) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('ESTOQUE DASH', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('O', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Dash through and slash', 580, ay + 5);

    const tips = [
      'Dash through the opponent at high speed',
      'Slashes with estoque as you pass',
      '1.5 second cooldown between dashes',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isKillawatt) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('VOLT ZAP', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('K', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Zap foe, stun & damage', 580, ay + 5);

    const tips = [
      'Electrocute opponent when in range',
      'Stuns them briefly, unable to move or attack',
      'They vibrate as electricity crackles through',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBacktrack) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TIME REWIND', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('J', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Rewind time 8 seconds', 580, ay + 5);

    const tips = [
      'Reverts health & positions of both fighters',
      'Affects you and your opponent equally',
      '10 second cooldown between rewinds',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isExor) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('SOUL DRAIN', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('N', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Steal HP, slow opponent', 580, ay + 5);

    const tips = [
      'Drains life force from opponent at close range',
      'Heals Exor while damaging the foe',
      'Opponent is slowed while being drained',
      'Breaks if they escape too far',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isBuck) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('FIREWORK SPRAY', 540, 135);

    const ay = 160;
    ctx.fillStyle = '#333';
    ctx.strokeStyle = '#777';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(541, ay - 14, 28, 28, 5);
    ctx.fill();
    ctx.stroke();
    ctx.font = 'bold 15px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('L', 555, ay + 5);
    ctx.font = '13px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Spray exploding fireworks', 580, ay + 5);

    const tips = [
      'Rapidly fires red, white & blue fireworks',
      'Aim drifts between upward and forward',
      'Fireworks explode on contact',
      'Lasts 6 seconds, 8 second cooldown',
    ];
    for (let t = 0; t < tips.length; t++) {
      ctx.fillStyle = '#888';
      ctx.fillText(tips[t], 543, ay + 28 + t * 18);
    }
  }

  if (selectedPlayer.isVortice) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('TORNADO', 540, 135);

    const abilities = [
      ['H', 'Hold to pull opponent in'],
      ['J', 'Press to blast opponent away'],
    ];
    const details = [
      'Summons a vortex that drags foes closer',
      'Reverses the tornado to launch foes far',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }
  }

  if (selectedPlayer.isXhaust) {
    ctx.font = 'bold 16px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selectedPlayer.accent;
    ctx.fillText('OIL IGNITE', 540, 135);

    const abilities = [
      ['L', 'Hold to leak oil trail'],
      ['K', 'Press to ignite all oil'],
    ];
    const details = [
      'Drains tank to leave oil on the ground',
      'Burns foes standing on the oil',
    ];
    for (let a = 0; a < abilities.length; a++) {
      const ay = 160 + a * 70;
      ctx.fillStyle = '#333';
      ctx.strokeStyle = '#777';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(541, ay - 14, 28, 28, 5);
      ctx.fill();
      ctx.stroke();
      ctx.font = 'bold 15px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#fff';
      ctx.fillText(abilities[a][0], 555, ay + 5);
      ctx.font = '13px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#aaa';
      ctx.fillText(abilities[a][1], 580, ay + 5);
      ctx.fillStyle = '#888';
      ctx.fillText(details[a], 543, ay + 25);
    }

    ctx.fillStyle = '#888';
    ctx.fillText('Tank fills by landing hits on opponent', 543, 320);
  }
  } // end else (fight state combos/abilities)

  // Divider
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(480, 90);
  ctx.lineTo(480, 430);
  ctx.stroke();

  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';
  ctx.fillText('Press SPACE to resume', 480, 510);
}

