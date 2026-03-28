function drawLevelSelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT STAGE', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  if (gameMode === 'campaign') {
    ctx.fillText('CAMPAIGN', 480, 80);
  } else {
    ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}${cpuDifficulty ? '  |  ' + cpuDifficulty.name : ''}`, 480, 80);
  }
  // Player & CPU icons
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  if (gameMode !== 'campaign') {
    drawPortraitIcon(selectedCPU.name, 930, 30, 22);
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = selectedCPU.accent;
    ctx.fillText(selectedCPU.name, 912, 34);
  }

  const lvls = getLevels();
  const totalItems = lvls.length + 1; // +1 for RANDOM
  const perRow = Math.min(totalItems, 5);
  const rows = Math.ceil(totalItems / perRow);
  const cardW = 150;
  const cardH = 90;
  const gap = 15;
  const totalW = perRow * cardW + (perRow - 1) * gap;
  const startX = (960 - totalW) / 2 + cardW / 2;
  const startY = 160;

  // Show locked secret levels as silhouettes
  const lockedSecrets = secretLevels.filter(sl => !sl.unlocked());
  const showLocked = lockedSecrets.length > 0;

  for (let i = 0; i < totalItems; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    // Center last row if it has fewer items
    const itemsInRow = Math.min(perRow, totalItems - row * perRow);
    const rowTotalW = itemsInRow * cardW + (itemsInRow - 1) * gap;
    const rowStartX = (960 - rowTotalW) / 2 + cardW / 2;
    const x = rowStartX + col * (cardW + gap);
    const y = startY + row * (cardH + gap + 20);
    const selected = i === levelSelectCursor;
    const isRandom = i >= lvls.length;

    ctx.save();
    ctx.translate(x, y);

    if (isRandom) {
      // Draw RANDOM card
      if (selected) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
      }
      ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
      ctx.strokeStyle = selected ? '#ffd700' : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-cardW/2, -cardH/2, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      const pulse = selected ? Math.sin(Date.now() * 0.005) * 3 : 0;
      ctx.font = `bold ${28 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('?', 0, 8);
      ctx.font = 'bold 11px Arial';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText('RANDOM', 0, 30);
    } else {
      // Draw level card
      const lvl = lvls[i];
      if (selected) {
        ctx.shadowColor = lvl.accent;
        ctx.shadowBlur = 15;
      }

      // Card background with level color tint
      const cardGrad = ctx.createLinearGradient(0, -cardH/2, 0, cardH/2);
      cardGrad.addColorStop(0, selected ? lvl.color : '#1a1a2a');
      cardGrad.addColorStop(1, selected ? '#1a1a2a' : '#0f0f1f');
      ctx.fillStyle = cardGrad;
      ctx.strokeStyle = selected ? lvl.accent : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-cardW/2, -cardH/2, cardW, cardH, 8);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Mini preview icon based on level type
      drawLevelIcon(lvl.name, 0, -10, selected);

      // Level name
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText(lvl.name, 0, 35);
    }

    ctx.restore();
  }

  // Draw locked secret level indicators below
  if (showLocked) {
    const lockY = startY + rows * (cardH + gap + 20) + 10;
    ctx.font = '12px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#444';
    ctx.fillText(`${lockedSecrets.length} secret stage${lockedSecrets.length > 1 ? 's' : ''} locked`, 480, lockY);
    // Show hints
    for (let i = 0; i < lockedSecrets.length; i++) {
      const hint = secretLevelHints[lockedSecrets[i].name];
      if (hint) {
        ctx.fillStyle = '#333';
        ctx.fillText(`"${hint}"`, 480, lockY + 16 + i * 14);
      }
    }
  }

  // Selected level info
  if (levelSelectCursor < lvls.length) {
    const current = lvls[levelSelectCursor];
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, 470);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, 492);
  } else {
    ctx.font = 'bold 22px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, 470);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('A random stage will be chosen', 480, 492);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.textAlign = 'center';
  ctx.fillText('ARROWS to browse | ENTER to select | ESC to go back', 480, 530);

  // Unlock flash effects
  if (snowyCityUnlockFlash > 0) {
    snowyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = snowyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ADD8E6';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, snowyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (foggyCityUnlockFlash > 0) {
    foggyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = foggyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFB347';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, foggyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (rainyCityUnlockFlash > 0) {
    rainyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = rainyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#708090';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, rainyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (glowingCityUnlockFlash > 0) {
    glowingCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = glowingCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, glowingCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (sunnyCityUnlockFlash > 0) {
    sunnyCityUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = sunnyCityUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#FFD700';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, sunnyCityUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('STAGE UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Master passkey flash
  if (masterUnlockFlash > 0) {
    masterUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = masterUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, masterUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('MASTER PASSKEY ACTIVATED', 480, 270);
    ctx.restore();
  }

  // Lottery animation for random level
  if (lotteryActive && lotteryType === 'level') {
    const lvlsForLottery = getLevels();
    const idx = lotteryCurrent % lvlsForLottery.length;
    const lvl = lvlsForLottery[idx];
    ctx.save();
    ctx.fillStyle = 'rgba(0,0,0,0.7)';
    ctx.fillRect(0, 0, 960, 540);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = lvl.accent;
    ctx.fillText(lvl.name, 480, 280);
    ctx.restore();
  }
}

function drawLevelIcon(name, x, y, selected) {
  ctx.save();
  ctx.translate(x, y);
  const alpha = selected ? 1 : 0.5;
  ctx.globalAlpha = alpha;

  switch (name) {
    case 'CLASSIC':
      // Arena lights icon
      ctx.fillStyle = '#4a4a7a';
      ctx.fillRect(-15, -5, 30, 15);
      ctx.fillStyle = 'rgba(255,255,200,0.5)';
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.lineTo(-10, -2);
      ctx.lineTo(10, -2);
      ctx.fill();
      break;
    case 'THE TEMPLE':
      // Pillar icon
      ctx.fillStyle = '#8B7355';
      ctx.fillRect(-12, -15, 6, 25);
      ctx.fillRect(6, -10, 6, 20);
      ctx.fillStyle = '#3a7a2a';
      ctx.fillRect(-5, -8, 10, 3);
      break;
    case 'THE PEAK':
      // Mountain icon
      ctx.fillStyle = '#7a8a9a';
      ctx.beginPath();
      ctx.moveTo(-15, 10);
      ctx.lineTo(0, -15);
      ctx.lineTo(15, 10);
      ctx.fill();
      ctx.fillStyle = '#e8f0f8';
      ctx.beginPath();
      ctx.moveTo(-4, -8);
      ctx.lineTo(0, -15);
      ctx.lineTo(4, -8);
      ctx.fill();
      break;
    case 'THE DEN':
      // Flame icon
      ctx.fillStyle = '#ff4500';
      ctx.beginPath();
      ctx.moveTo(0, -15);
      ctx.quadraticCurveTo(10, -5, 8, 5);
      ctx.quadraticCurveTo(0, 12, -8, 5);
      ctx.quadraticCurveTo(-10, -5, 0, -15);
      ctx.fill();
      ctx.fillStyle = '#ffaa00';
      ctx.beginPath();
      ctx.moveTo(0, -8);
      ctx.quadraticCurveTo(5, -2, 4, 4);
      ctx.quadraticCurveTo(0, 8, -4, 4);
      ctx.quadraticCurveTo(-5, -2, 0, -8);
      ctx.fill();
      break;
    case 'THE VOID':
      // Star/space icon
      ctx.fillStyle = '#6644aa';
      ctx.beginPath();
      ctx.arc(0, 0, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#aaaaff';
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.arc(-10 + i * 5, -10 + Math.sin(i * 2) * 5, 1, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    case 'SNOWY CITY':
      // NYC icon - buildings + snow
      ctx.fillStyle = '#4169E1';
      ctx.fillRect(-8, -10, 5, 20);
      ctx.fillRect(-1, -15, 4, 25);
      ctx.fillRect(5, -5, 6, 15);
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-5, -12, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(8, -8, 2, 0, Math.PI * 2); ctx.fill();
      break;
    case 'FOGGY CITY':
      // SF icon - bridge
      ctx.strokeStyle = '#C85A17';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-15, 10);
      ctx.lineTo(-10, -10);
      ctx.moveTo(10, -10);
      ctx.lineTo(15, 10);
      ctx.moveTo(-15, 5);
      ctx.lineTo(15, 5);
      ctx.stroke();
      break;
    case 'RAINY CITY':
      // Seattle icon - space needle
      ctx.fillStyle = '#708090';
      ctx.fillRect(-2, -5, 4, 15);
      ctx.beginPath();
      ctx.ellipse(0, -5, 12, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(150,170,200,0.6)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(-8 + i * 8, -15);
        ctx.lineTo(-9 + i * 8, -5);
        ctx.stroke();
      }
      break;
    case 'GLOWING CITY':
      // Vegas icon - pyramid + light
      ctx.fillStyle = '#FFD700';
      ctx.beginPath();
      ctx.moveTo(-10, 10);
      ctx.lineTo(0, -10);
      ctx.lineTo(10, 10);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,200,0.4)';
      ctx.fillRect(-1, -15, 2, 8);
      break;
    case 'SUNNY CITY':
      // LA icon - palm + sun
      ctx.fillStyle = '#FF8C00';
      ctx.beginPath();
      ctx.arc(8, -8, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#8B6914';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-5, 10);
      ctx.quadraticCurveTo(-3, 0, -4, -8);
      ctx.stroke();
      ctx.fillStyle = '#2a7a2a';
      ctx.beginPath();
      ctx.ellipse(-6, -10, 8, 3, -0.3, 0, Math.PI * 2);
      ctx.fill();
      break;
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

