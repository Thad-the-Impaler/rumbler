// All boss characters available for practice
const practiceBossList = [
  { char: borgusChar, name: 'BORGUS' },
  { char: ericthoChar, name: 'ERICTHO' },
  { char: quellicChar, name: 'QUELLIC' },
  { char: bojdo3Char, name: 'BOJDOBOJDOBOJDO' },
  { char: scalenaChar, name: 'SCALENA' },
  { char: birdeaterChar, name: 'BIRDEATER' },
  { char: sixIronChar, name: 'SIX IRON-NINE IRON' },
  { char: hangmanChar, name: 'HANGMAN' },
  { char: twinsChar, name: 'TWINS' },
  { char: tubeWardenChar, name: 'TUBE WARDEN' },
  { char: orcusChar, name: 'ORCUS' },
  { char: headChar, name: 'HEAD' },
  { char: relapmiChar, name: 'RELAPMI' },
  { char: theCountChar, name: 'THE COUNT' },
  { char: darkBojdoChar, name: 'DARK BOJDO' },
  { char: sixDriverChar, name: 'SIX DRIVER-NINE IRON' },
  { char: printerBossChar, name: 'PRINTER' },
  { char: maneaterChar, name: 'MANEATER' }
];

function drawBossSelectScreen() {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 540);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#2a0a1e');
  grad.addColorStop(1, '#0a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 540);

  // Title
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff4444';
  ctx.fillText('SELECT BOSS', 480, 55);

  // Player icon
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);

  // Grid layout: 7 per row, 2 rows
  const perRow = 8;
  const cardW = 105;
  const cardH = 115;
  const startX = 480 - (perRow * cardW) / 2 + cardW / 2;
  const startY = 100;
  const rowGap = 140;

  for (let i = 0; i < practiceBossList.length; i++) {
    const boss = practiceBossList[i];
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const x = startX + col * cardW;
    const y = startY + row * rowGap;
    const selected = i === bossSelectCursor;
    const pulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;
    const unlocked = defeatedBosses[boss.name] || false;

    // Card background
    ctx.fillStyle = selected ? 'rgba(255,40,40,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    ctx.roundRect(x - cardW / 2 + 5, y, cardW - 10, cardH, 8);
    ctx.fill();
    ctx.strokeStyle = selected
      ? `rgba(255,${100 + pulse * 155},0,${0.6 + pulse * 0.4})`
      : unlocked ? '#444' : '#222';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x - cardW / 2 + 5, y, cardW - 10, cardH, 8);
    ctx.stroke();

    if (unlocked) {
      // Draw boss portrait
      drawPortraitIcon(boss.name, x, y + 40, 28);

      // Boss name
      ctx.font = 'bold 10px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#aaa';
      // Truncate long names
      const displayName = boss.name.length > 14 ? boss.name.substring(0, 12) + '..' : boss.name;
      ctx.fillText(displayName, x, y + cardH - 8);
    } else {
      // Locked — show lock icon
      ctx.fillStyle = '#333';
      ctx.font = 'bold 32px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('?', x, y + 50);
      ctx.font = '10px Arial';
      ctx.fillStyle = '#555';
      ctx.fillText('LOCKED', x, y + cardH - 8);
    }

    // Selection indicator
    if (selected) {
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - cardW / 2 + 3, y - 2, cardW - 6, cardH + 4, 10);
      ctx.stroke();
    }
  }

  // Description of selected boss
  const selectedBoss = practiceBossList[bossSelectCursor];
  const isUnlocked = defeatedBosses[selectedBoss.name] || false;
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  if (isUnlocked) {
    const descColor = selectedBoss.name === 'ERICTHO' ? '#ffffff'
      : selectedBoss.name === 'RELAPMI' ? '#00ff44'
      : (selectedBoss.char.accent || '#aaa');
    ctx.fillStyle = descColor;
    ctx.fillText(selectedBoss.char.desc || selectedBoss.name, 480, 410);
  } else {
    ctx.fillStyle = '#666';
    ctx.fillText('Defeat this boss in Campaign Mode to unlock', 480, 410);
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('Arrow keys to browse | ENTER to select | ESC to go back', 480, 470);

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
