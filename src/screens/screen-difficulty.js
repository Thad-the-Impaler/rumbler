function drawDifficultySelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT DIFFICULTY', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}`, 480, 80);
  // Player & CPU icons
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  drawPortraitIcon(selectedCPU.name, 930, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name, 912, 34);

  // Difficulty cards
  const startX = 480 - ((difficulties.length - 1) * 200) / 2;
  for (let i = 0; i < difficulties.length; i++) {
    const x = startX + i * 200;
    const y = 230;
    const selected = i === difficultyCursor;
    const diff = difficulties[i];

    ctx.save();
    ctx.translate(x, y);

    if (selected) {
      ctx.shadowColor = diff.color;
      ctx.shadowBlur = 20;
    }

    ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
    ctx.strokeStyle = selected ? diff.accent : '#333';
    ctx.lineWidth = selected ? 3 : 1;
    ctx.beginPath();
    ctx.roundRect(-80, -70, 160, 150, 10);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;

    // Difficulty icon (skulls / stars)
    const pulse = selected ? Math.sin(Date.now() * 0.005) * 3 : 0;
    const icons = i + 1; // 1-4 icons
    const iconSpacing = 22;
    const iconStartX = -((icons - 1) * iconSpacing) / 2;
    for (let j = 0; j < icons; j++) {
      ctx.fillStyle = selected ? diff.color : '#555';
      ctx.font = `${18 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillText('\u2605', iconStartX + j * iconSpacing, -15);
    }

    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? '#fff' : '#888';
    ctx.fillText(diff.name, 0, 30);

    // Thin colored bar
    ctx.fillStyle = selected ? diff.color : '#444';
    ctx.fillRect(-40, 40, 80, 3);

    ctx.restore();
  }

  // Selected difficulty info
  const current = difficulties[difficultyCursor];
  ctx.font = 'bold 24px Arial';
  ctx.fillStyle = current.accent;
  ctx.textAlign = 'center';
  ctx.fillText(current.name, 480, 370);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText(current.desc, 480, 400);

  // Stat preview
  const barLabels = ['Reaction', 'Aggression', 'Blocking', 'Damage'];
  const barValues = [
    1 - (current.reactMin / 40),
    current.attackChance,
    current.blockChance / 0.5,
    current.damageMult / 1.5
  ];
  for (let i = 0; i < 4; i++) {
    const sx = 360;
    const sy = 425 + i * 22;
    ctx.font = '12px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#888';
    ctx.fillText(barLabels[i], sx, sy + 10);
    ctx.fillStyle = '#333';
    ctx.fillRect(sx + 10, sy, 200, 12);
    ctx.fillStyle = current.color;
    ctx.fillRect(sx + 10, sy, 200 * Math.min(barValues[i], 1), 12);
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 1;
    ctx.strokeRect(sx + 10, sy, 200, 12);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select | ESC to go back', 480, 530);

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
}

