function drawAssistSelectScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText(selectingCPUAssist ? 'SELECT CPU ASSIST' : 'SELECT YOUR ASSIST', 480, 50);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#888';
  if (gameMode === 'practice') {
    ctx.fillText(`${selectedPlayer.name} - Practice Mode`, 480, 80);
  } else if (gameMode === 'campaign') {
    ctx.fillText('CAMPAIGN', 480, 80);
  } else if (selectingCPUAssist) {
    const pAssistName = selectedAssist.name;
    ctx.fillText(`${selectedPlayer.name} (${pAssistName}) vs ${selectedCPU.name}`, 480, 80);
  } else {
    ctx.fillText(`${selectedPlayer.name} vs ${selectedCPU.name}`, 480, 80);
  }
  // Player & CPU icons in corners
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);
  if (selectedCPU) {
    drawPortraitIcon(selectedCPU.name, 930, 30, 22);
    ctx.font = '11px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = selectedCPU.accent;
    ctx.fillText(selectedCPU.name, 912, 34);
  }

  const activeCursor = selectingCPUAssist ? cpuAssistCursor : assistCursor;

  // Assist cards (including RANDOM) with scrolling
  const assistSlots = assists.length + 1;
  const cardSpacing = 180;
  const maxVisible = 5;
  // Center the view on the active cursor
  const scrollOffset = activeCursor - Math.floor(maxVisible / 2);
  const clampedScroll = Math.max(0, Math.min(scrollOffset, assistSlots - maxVisible));
  const visibleStart = assistSlots <= maxVisible ? 0 : clampedScroll;
  const visibleEnd = assistSlots <= maxVisible ? assistSlots : Math.min(visibleStart + maxVisible, assistSlots);
  const visibleCount = visibleEnd - visibleStart;
  const startX = 480 - ((visibleCount - 1) * cardSpacing) / 2;

  // Draw scroll arrows
  if (visibleStart > 0) {
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888';
    ctx.fillText('\u25C0', startX - 110, 225);
  }
  if (visibleEnd < assistSlots) {
    const lastX = startX + (visibleCount - 1) * cardSpacing;
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#888';
    ctx.fillText('\u25B6', lastX + 110, 225);
  }

  for (let vi = 0; vi < visibleCount; vi++) {
    const i = visibleStart + vi;
    const x = startX + vi * cardSpacing;
    const y = 220;
    const selected = i === activeCursor;
    // Show P1 label on player's chosen assist when selecting CPU assist
    let label = null;
    if (selectingCPUAssist && i < assists.length && assists[i] === selectedAssist) label = 'P1';
    if (selectingCPUAssist && i === assists.length) {
      // check if player picked random (selectedAssist won't match the RANDOM slot)
    }

    ctx.save();
    ctx.translate(x, y);

    if (i < assists.length) {
      if (selected) {
        ctx.shadowColor = assists[i].color;
        ctx.shadowBlur = 20;
      }

      ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
      ctx.strokeStyle = selected ? assists[i].accent : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-70, -60, 140, 140, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Orb
      const pulse = selected ? Math.sin(Date.now() * 0.005) * 5 : 0;
      ctx.fillStyle = assists[i].color;
      ctx.beginPath();
      ctx.arc(0, -15, 25 + pulse, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = assists[i].accent;
      ctx.beginPath();
      ctx.arc(0, -15, 12 + pulse * 0.5, 0, Math.PI * 2);
      ctx.fill();

      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText(assists[i].name, 0, 55);

      ctx.font = '11px Arial';
      ctx.fillStyle = selected ? assists[i].accent : '#666';
      ctx.fillText(assists[i].type, 0, 72);

      if (label) {
        ctx.font = 'bold 10px Arial';
        ctx.fillStyle = assists[i].accent;
        ctx.fillText(label, 0, -68);
      }
    } else {
      // RANDOM card
      if (selected) {
        ctx.shadowColor = '#ffd700';
        ctx.shadowBlur = 20;
      }

      ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
      ctx.strokeStyle = selected ? '#ffd700' : '#333';
      ctx.lineWidth = selected ? 3 : 1;
      ctx.beginPath();
      ctx.roundRect(-70, -60, 140, 140, 10);
      ctx.fill();
      ctx.stroke();
      ctx.shadowBlur = 0;

      // Question mark
      const pulse = selected ? Math.sin(Date.now() * 0.005) * 5 : 0;
      ctx.font = `bold ${40 + pulse}px Arial`;
      ctx.textAlign = 'center';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('?', 0, -2);

      ctx.font = 'bold 16px Arial';
      ctx.fillStyle = selected ? '#fff' : '#888';
      ctx.fillText('RANDOM', 0, 55);

      ctx.font = '11px Arial';
      ctx.fillStyle = selected ? '#ffd700' : '#666';
      ctx.fillText('Surprise!', 0, 72);
    }

    ctx.restore();
  }

  // Selected assist info
  const isRandomAssist = activeCursor >= assists.length;
  if (isRandomAssist) {
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, 340);
    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText('Pick a random assist', 480, 365);
  } else {
    const current = assists[activeCursor];
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, 340);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, 365);

    ctx.font = '14px Arial';
    ctx.fillStyle = '#888';
    ctx.fillText(`Damage: ${current.damage} | Cooldown: ${(current.cooldownTime / 60).toFixed(1)}s`, 480, 390);
  }

  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select' + (selectingCPUAssist ? ' | ESC to go back' : ''), 480, 520);

  // Lottery animation overlay
  if (lotteryActive && (lotteryType === 'assist' || lotteryType === 'cpuAssist')) {
    drawLotteryOverlay();
  }

  // Assist unlock flashes
  const assistFlashes = [
    { timer: () => bojAssistUnlockFlash, dec: () => bojAssistUnlockFlash--, bg: '#22aa22', fg: '#66ff66' },
    { timer: () => weedthornUnlockFlash, dec: () => weedthornUnlockFlash--, bg: '#2d8a4e', fg: '#5ee87a' },
    { timer: () => jazzAssistUnlockFlash, dec: () => jazzAssistUnlockFlash--, bg: '#e6a800', fg: '#ffe066' },
    { timer: () => cyanoAssistUnlockFlash, dec: () => cyanoAssistUnlockFlash--, bg: '#4488cc', fg: '#88ccff' },
    { timer: () => warperAssistUnlockFlash, dec: () => warperAssistUnlockFlash--, bg: '#9933cc', fg: '#cc88ff' },
    { timer: () => aphidAssistUnlockFlash, dec: () => aphidAssistUnlockFlash--, bg: '#555555', fg: '#aaaaaa' },
    { timer: () => studAssistUnlockFlash, dec: () => studAssistUnlockFlash--, bg: '#6b5a3a', fg: '#c4a55a' },
    { timer: () => floatAssistUnlockFlash, dec: () => floatAssistUnlockFlash--, bg: '#ff99cc', fg: '#ffccee' },
    { timer: () => stickerAssistUnlockFlash, dec: () => stickerAssistUnlockFlash--, bg: '#cc8800', fg: '#ffbb33' },
    { timer: () => serpentAssistUnlockFlash, dec: () => serpentAssistUnlockFlash--, bg: '#336633', fg: '#66cc66' },
  ];
  for (const af of assistFlashes) {
    const t = af.timer();
    if (t > 0) {
      af.dec();
      ctx.save();
      ctx.globalAlpha = t / 60 * 0.6;
      ctx.fillStyle = af.bg;
      ctx.fillRect(0, 0, 960, 540);
      ctx.globalAlpha = Math.min(1, t / 30);
      ctx.font = 'bold 48px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = af.fg;
      ctx.fillText('ASSIST UNLOCKED', 480, 270);
      ctx.restore();
    }
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
}

