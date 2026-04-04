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
  { char: maneaterChar, name: 'MANEATER' },
  { char: grooveMcSmoothChar, name: 'GROOVE MCSMOOTH' },
  { char: darkDuplaireChar, name: 'DARK DUPLAIRE' },
  { char: canisChar, name: 'CANIS' }
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

  // Grid layout
  const total = practiceBossList.length;
  const perRow = Math.min(10, Math.ceil(total / 2)); // split roughly evenly into 2 rows
  const cardW = Math.min(95, Math.floor(900 / perRow));
  const cardH = 100;
  const rowGap = cardH + 18;
  const startY = 80;

  for (let i = 0; i < total; i++) {
    const boss = practiceBossList[i];
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    // Center each row
    const itemsInRow = Math.min(perRow, total - row * perRow);
    const rowTotalW = itemsInRow * cardW;
    const rowStartX = (960 - rowTotalW) / 2 + cardW / 2;
    const x = rowStartX + col * cardW;
    const y = startY + row * rowGap;
    const selected = i === bossSelectCursor;
    const pulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;
    const unlocked = defeatedBosses[boss.name] || false;

    // Card background
    const pad = 4;
    ctx.fillStyle = selected ? 'rgba(255,40,40,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    ctx.roundRect(x - cardW / 2 + pad, y, cardW - pad * 2, cardH, 6);
    ctx.fill();
    ctx.strokeStyle = selected
      ? `rgba(255,${100 + pulse * 155},0,${0.6 + pulse * 0.4})`
      : unlocked ? '#444' : '#222';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(x - cardW / 2 + pad, y, cardW - pad * 2, cardH, 6);
    ctx.stroke();

    if (unlocked) {
      // Draw boss portrait
      drawPortraitIcon(boss.name, x, y + 35, 24);

      // Boss name
      ctx.font = 'bold 9px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#aaa';
      // Truncate long names
      const displayName = boss.name.length > 12 ? boss.name.substring(0, 10) + '..' : boss.name;
      ctx.fillText(displayName, x, y + cardH - 6);
    } else {
      // Locked — show lock icon
      ctx.fillStyle = '#333';
      ctx.font = 'bold 28px Arial';
      ctx.textAlign = 'center';
      ctx.fillText('?', x, y + 45);
      ctx.font = '9px Arial';
      ctx.fillStyle = '#555';
      ctx.fillText('LOCKED', x, y + cardH - 6);
    }

    // Selection indicator
    if (selected) {
      ctx.strokeStyle = '#ff6b35';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(x - cardW / 2 + pad - 2, y - 2, cardW - pad * 2 + 4, cardH + 4, 8);
      ctx.stroke();
    }
  }

  // Description of selected boss
  const numRows = Math.ceil(total / perRow);
  const descY = startY + numRows * rowGap + 20;
  const selectedBoss = practiceBossList[bossSelectCursor];
  const isUnlocked = defeatedBosses[selectedBoss.name] || false;
  ctx.font = '16px Arial';
  ctx.textAlign = 'center';
  if (isUnlocked) {
    // Use visible colors for bosses with dark accents
    const darkAccentBosses = { 'ERICTHO': '#ffffff', 'RELAPMI': '#00ff44', 'ORCUS': '#00ff44', 'DARK BOJDO': '#ffcc00', 'GROOVE MCSMOOTH': '#bb77dd', 'DARK DUPLAIRE': '#00ffdd' };
    const descColor = darkAccentBosses[selectedBoss.name] || selectedBoss.char.accent || '#aaa';
    ctx.fillStyle = descColor;
    ctx.fillText(selectedBoss.char.desc || selectedBoss.name, 480, descY);
  } else {
    ctx.fillStyle = '#666';
    ctx.fillText('Defeat this boss in Campaign Mode to unlock', 480, descY);
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('Arrow keys to browse | ENTER to select | ESC to go back', 480, descY + 40);

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
