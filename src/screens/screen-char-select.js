function drawLockedCharPreview(char, x, y, size) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  // Card background - darker than normal
  ctx.fillStyle = '#0a0a15';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = '#222';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Black silhouette - generic fighter shape
  const sc = s / 100;
  ctx.save();
  ctx.scale(sc, sc);
  ctx.fillStyle = '#111';
  // Head
  ctx.beginPath(); ctx.arc(0, -100 + 22, 14, 0, Math.PI * 2); ctx.fill();
  // Body
  ctx.fillRect(-12, -100 + 30, 24, 30);
  // Arms
  ctx.fillRect(-22, -100 + 32, 12, 6);
  ctx.fillRect(10, -100 + 32, 12, 6);
  // Legs
  ctx.fillRect(-10, -100 + 58, 8, 20);
  ctx.fillRect(2, -100 + 58, 8, 20);
  ctx.restore();

  // ??? name
  ctx.font = `bold ${Math.max(10, s * 0.18)}px Arial`;
  ctx.fillStyle = '#444';
  ctx.textAlign = 'center';
  ctx.fillText('???', 0, s * 0.12);

  // Hint text
  const hint = secretCharHints.get(char) || '...';
  ctx.font = `${Math.max(7, s * 0.11)}px Arial`;
  ctx.fillStyle = '#333';
  ctx.fillText(hint, 0, s * 0.26);

  ctx.restore();
}

function drawCharacterPreview(char, x, y, size, selected, label) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  // Selection highlight
  if (selected) {
    ctx.shadowColor = char.accent;
    ctx.shadowBlur = 20;
    ctx.strokeStyle = char.accent;
    ctx.lineWidth = 3;
    ctx.strokeRect(-s/2 - 8, -s - 20, s + 16, s + 40);
    ctx.shadowBlur = 0;
  }

  // Card background
  ctx.fillStyle = selected ? '#2a2a4a' : '#1a1a2a';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = selected ? char.accent : '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Mini character (scaled to card size)
  const sc = s / 100;
  const bob = selected ? Math.sin(Date.now() * 0.005) * 3 * sc : 0;

  ctx.save();
  ctx.scale(sc, sc);
  // Golgar: draw dormant entity on the left, shift active entity to the right
  if (char.isGolgar) {
    ctx.save();
    ctx.translate(-16, 0);
    const stoneColor = '#777788';
    const stoneAccent = '#999aaa';
    // Body
    ctx.fillStyle = stoneColor;
    ctx.fillRect(-12, -100 + 30 + bob / sc, 24, 30);
    // Head
    ctx.fillStyle = stoneAccent;
    ctx.beginPath(); ctx.arc(0, -100 + 22 + bob / sc, 14, 0, Math.PI * 2); ctx.fill();
    // Closed eyes
    ctx.strokeStyle = '#555566';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-6, -100 + 20 + bob / sc); ctx.lineTo(-1, -100 + 20 + bob / sc); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, -100 + 20 + bob / sc); ctx.lineTo(7, -100 + 20 + bob / sc); ctx.stroke();
    // Legs
    ctx.strokeStyle = stoneColor;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-6, -100 + 60 + bob / sc); ctx.lineTo(-10, -100 + 75 + bob / sc); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, -100 + 60 + bob / sc); ctx.lineTo(10, -100 + 75 + bob / sc); ctx.stroke();
    ctx.restore();
    ctx.translate(16, 0);
  }
  // Body
  ctx.fillStyle = char.color;
  if (char.isPaletap) {
    // Taller body for Paletap
    ctx.fillRect(-13, -100 + 10 + bob / sc, 26, 50);
  } else {
    ctx.fillRect(-12, -100 + 30 + bob / sc, 24, 30);
  }
  // Head
  ctx.fillStyle = char.accent;
  if (char.isPaletap) {
    ctx.save();
    ctx.translate(0, -100 + 6 + bob / sc);
    ctx.rotate(0.3);
    ctx.beginPath();
    ctx.arc(0, 0, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(0, -100 + 22 + bob / sc, 14, 0, Math.PI * 2);
    ctx.fill();
  }
  // Aether silver crown on character select
  if (char.isAether) {
    const headCY = -100 + 22 + bob / sc;
    const baseY = headCY - 12;
    const topY = headCY - 22;
    ctx.fillStyle = '#c8c8d0';
    ctx.strokeStyle = '#5a5a64';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.roundRect(-13, baseY - 4, 26, 6, 1.5);
    ctx.fill(); ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-13, baseY - 4);
    ctx.lineTo(-9, topY + 2);
    ctx.lineTo(-6, baseY - 4);
    ctx.lineTo(-2, topY - 2);
    ctx.lineTo(2, baseY - 4);
    ctx.lineTo(6, topY + 2);
    ctx.lineTo(9, baseY - 4);
    ctx.lineTo(13, topY + 2);
    ctx.lineTo(13, baseY - 4);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.fillStyle = '#ffd54a';
    ctx.beginPath();
    ctx.arc(0, baseY - 1, 1.4, 0, Math.PI * 2);
    ctx.fill();
  }
  // Snazz McJazz fedora on character select
  if (char.isSnazz) {
    const headCY = -100 + 22 + bob / sc;
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, headCY - 10, 18, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-8, headCY - 10);
    ctx.lineTo(-6, headCY - 22);
    ctx.lineTo(6, headCY - 22);
    ctx.lineTo(8, headCY - 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cccccc';
    ctx.stroke();
    ctx.fillStyle = '#222222';
    ctx.fillRect(-7, headCY - 14, 14, 2);
  }
  // Bozollok antennae and mandibles on card
  if (char.isBozollok) {
    const headCY = -100 + 22 + bob / sc;
    ctx.strokeStyle = '#c8a030';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(3, headCY - 10); ctx.quadraticCurveTo(12, headCY - 22, 16, headCY - 19); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-1, headCY - 10); ctx.quadraticCurveTo(-8, headCY - 24, -4, headCY - 22); ctx.stroke();
    ctx.fillStyle = '#c8a030';
    ctx.beginPath(); ctx.arc(16, headCY - 19, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-4, headCY - 22, 1.5, 0, Math.PI * 2); ctx.fill();
    // Mandibles
    ctx.strokeStyle = '#8a6a10';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(5, headCY + 4); ctx.lineTo(11, headCY + 9); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, headCY + 6); ctx.lineTo(9, headCY + 12); ctx.stroke();
  }
  // Gourmand fork and spoon on card
  if (char.isGourmand) {
    const hCY = -100 + 22 + bob / sc;
    // Fork (right side)
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(18, hCY + 20); ctx.lineTo(22, hCY + 4); ctx.stroke();
    for (let p = -1; p <= 1; p++) {
      ctx.beginPath(); ctx.moveTo(22 + p * 1.5, hCY + 4); ctx.lineTo(23 + p * 1.5, hCY - 2); ctx.stroke();
    }
    // Spoon (left side)
    ctx.beginPath(); ctx.moveTo(-16, hCY + 20); ctx.lineTo(-20, hCY + 4); ctx.stroke();
    ctx.fillStyle = '#ccc';
    ctx.beginPath(); ctx.ellipse(-20, hCY + 1, 3, 2.5, 0, 0, Math.PI * 2); ctx.fill();
  }
  // Eyes
  const cardEyeY = char.isPaletap ? -100 + 4 + bob / sc : -100 + 20 + bob / sc;
  ctx.fillStyle = char.isKavak ? '#ff2222' : char.isAether ? '#ffffff' : char.outline;
  if (char.isPaletap) {
    ctx.save();
    ctx.translate(0, cardEyeY);
    ctx.rotate(0.3);
    ctx.beginPath(); ctx.arc(-4, 0, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, 0, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  } else {
    ctx.beginPath();
    ctx.arc(-4, cardEyeY, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(5, cardEyeY, 2.5, 0, Math.PI * 2);
    ctx.fill();
  }
  // Legs
  ctx.strokeStyle = char.color;
  ctx.lineWidth = char.isPaletap ? 5 : 4;
  if (char.isPaletap) {
    // Longer legs with knees
    ctx.beginPath();
    ctx.moveTo(-6, -100 + 60 + bob / sc);
    ctx.lineTo(-8, -100 + 68 + bob / sc);
    ctx.lineTo(-10, -100 + 80 + bob / sc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -100 + 60 + bob / sc);
    ctx.lineTo(8, -100 + 68 + bob / sc);
    ctx.lineTo(10, -100 + 80 + bob / sc);
    ctx.stroke();
  } else {
    ctx.beginPath();
    ctx.moveTo(-6, -100 + 60 + bob / sc);
    ctx.lineTo(-10, -100 + 75 + bob / sc);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -100 + 60 + bob / sc);
    ctx.lineTo(10, -100 + 75 + bob / sc);
    ctx.stroke();
  }
  ctx.restore();

  // Name
  ctx.font = `bold ${Math.round(13 * sc)}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = selected ? '#fff' : '#888';
  ctx.fillText(char.name, 0, 15 * sc);

  // Label
  if (label) {
    ctx.font = `${Math.round(10 * sc)}px Arial`;
    ctx.fillStyle = char.accent;
    ctx.fillText(label, 0, -s - 22 * sc);
  }

  ctx.restore();
}

function drawRandomCard(x, y, size, selected, label) {
  const s = size;
  ctx.save();
  ctx.translate(x, y);

  if (selected) {
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 20;
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 3;
    ctx.strokeRect(-s/2 - 8, -s - 20, s + 16, s + 40);
    ctx.shadowBlur = 0;
  }

  ctx.fillStyle = selected ? '#2a2a3a' : '#1a1a2a';
  ctx.fillRect(-s/2 - 5, -s - 15, s + 10, s + 35);
  ctx.strokeStyle = selected ? '#ffd700' : '#333';
  ctx.lineWidth = 1;
  ctx.strokeRect(-s/2 - 5, -s - 15, s + 10, s + 35);

  // Question mark with animation (scaled to card size)
  const sc = s / 100;
  const pulse = selected ? Math.sin(Date.now() * 0.005) * 4 * sc : 0;
  ctx.font = `bold ${Math.round(50 * sc) + pulse}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = selected ? '#ffd700' : '#666';
  ctx.fillText('?', 0, -s + 55 * sc);

  ctx.font = `bold ${Math.round(13 * sc)}px Arial`;
  ctx.fillStyle = selected ? '#fff' : '#888';
  ctx.fillText('RANDOM', 0, 15 * sc);

  if (label) {
    ctx.font = `${Math.round(10 * sc)}px Arial`;
    ctx.fillStyle = '#ffd700';
    ctx.fillText(label, 0, -s - 22 * sc);
  }

  ctx.restore();
}

function drawLotteryOverlay() {
  if (!lotteryActive) return;
  const isChar = lotteryType === 'char' || lotteryType === 'cpu';
  const isLevel = lotteryType === 'level';
  const isBoss = lotteryType === 'boss';
  const pool = isBoss ? practiceBossList.filter(b => defeatedBosses[b.name]) : (isLevel ? getLevels() : (isChar ? characters : assists));
  const rawPick = pool[lotteryCurrent];
  let pick;
  if (isBoss) {
    const darkAccentBosses = { 'ERICTHO': '#ffffff', 'RELAPMI': '#00ff44', 'ORCUS': '#00ff44', 'DARK BOJDO': '#ffcc00', 'GROOVE MCSMOOTH': '#bb77dd', 'DARK DUPLAIRE': '#00ffdd' };
    const bossAccent = darkAccentBosses[rawPick.name] || rawPick.char.accent;
    pick = { name: rawPick.name, accent: bossAccent, desc: rawPick.char.desc };
  } else {
    pick = rawPick;
  }
  const landed = lotteryTimer >= lotteryDuration;
  const progress = Math.min(1, lotteryTimer / lotteryDuration);

  // Darkened backdrop
  ctx.save();
  ctx.fillStyle = 'rgba(0,0,0,0.7)';
  ctx.fillRect(0, 0, 960, 540);

  // Cycling name display
  const bounceY = landed ? 0 : Math.sin(lotteryTimer * 0.5) * 5;
  const scaleUp = landed ? 1.15 : 1;

  ctx.translate(480, 250 + bounceY);
  ctx.scale(scaleUp, scaleUp);

  // Glow behind name when landed
  if (landed) {
    const flashAlpha = 0.4 + Math.sin((lotteryTimer - lotteryDuration) * 0.15) * 0.2;
    ctx.shadowColor = pick.accent || '#ffd700';
    ctx.shadowBlur = 40;
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = pick.accent || '#ffd700';
    ctx.beginPath();
    ctx.arc(0, -10, 80, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Name text
  ctx.font = 'bold 42px Arial';
  ctx.textAlign = 'center';
  ctx.strokeStyle = '#000';
  ctx.lineWidth = 4;
  ctx.strokeText(pick.name, 0, 0);
  ctx.fillStyle = pick.accent || '#ffd700';
  ctx.fillText(pick.name, 0, 0);

  // Description
  ctx.font = '18px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText(pick.desc || '', 0, 30);

  // Rapid-cycling indicator lines (visual flair while spinning)
  if (!landed) {
    const count = Math.ceil((1 - progress) * 6);
    for (let i = 0; i < count; i++) {
      const lx = (Math.random() - 0.5) * 300;
      const ly = 50 + Math.random() * 20;
      ctx.globalAlpha = 0.2 + Math.random() * 0.3;
      ctx.fillStyle = '#fff';
      ctx.fillRect(lx, ly, 30 + Math.random() * 40, 2);
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawCharSelectScreen() {
  // Background
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  // Build display list: unlocked chars + locked silhouettes (when toggled) + RANDOM
  const lockedChars = showLockedChars ? secretCharOrder.filter(c => !characters.includes(c)) : [];
  const displaySlots = characters.length + lockedChars.length + 1; // +1 for RANDOM

  // Character cards (including RANDOM) - adaptive full-width grid layout
  const charSlots = characters.length + 1; // selectable slots (for cursor)
  const canvasW = 960;
  const canvasH = 540;
  const margin = 20; // side margins
  const usableWidth = canvasW - margin * 2;
  const titleSpace = 65; // space for title at top
  const infoH = 140; // info panel height at bottom
  const bottomPad = 30;
  const availableGridH = canvasH - titleSpace - infoH - bottomPad;

  // Find best perRow: try fitting in fewest rows while keeping cards reasonable
  let perRow, rows, cardSize, gap;
  const cardVisualExtra = 45; // space below card for name label
  const minGap = 10;
  const maxCardSize = 110;

  // Try increasing perRow until everything fits well
  for (let tryPerRow = Math.ceil(displaySlots / 4); tryPerRow <= displaySlots; tryPerRow++) {
    const tryRows = Math.ceil(displaySlots / tryPerRow);
    // Card size from width: usableWidth = tryPerRow * cardSize + (tryPerRow - 1) * gap
    // We want gap = fraction of cardSize. Start by computing max card size for this perRow.
    // gap = cardSize * 0.3 (target ratio), so: usableWidth = tryPerRow * cs + (tryPerRow-1) * cs * 0.3
    const cs = Math.min(maxCardSize, usableWidth / (tryPerRow + (tryPerRow - 1) * 0.3));
    const g = cs * 0.3;
    if (g < minGap) continue;
    // Check vertical fit: each row = cardSize + cardVisualExtra + gap (equal gap vertically)
    const rowH = cs + cardVisualExtra + g;
    const totalGridH = tryRows * rowH;
    if (totalGridH <= availableGridH || tryRows <= 1) {
      perRow = tryPerRow;
      rows = tryRows;
      cardSize = Math.round(cs);
      gap = Math.round(g);
      break;
    }
  }

  // Fallback if nothing fit perfectly — use scrolling with reasonable size
  if (!perRow) {
    perRow = Math.ceil(displaySlots / 3);
    rows = Math.ceil(displaySlots / perRow);
    cardSize = Math.round(Math.min(maxCardSize, usableWidth / (perRow + (perRow - 1) * 0.3)));
    gap = Math.round(cardSize * 0.3);
  }

  const spacing = cardSize + gap;
  const rowHeight = cardSize + cardVisualExtra + gap;
  charSelectPerRow = perRow; // expose to navigation

  const manyChars = characters.length > 12;
  const topSpace = titleSpace;
  const gridStartY = topSpace + cardSize + 40;
  const lastRowY = gridStartY + (rows - 1) * rowHeight;
  const infoBaseY = lastRowY + 20 + 22;
  const compact = rows > 2;
  const totalContentH = infoBaseY + infoH + 30;
  charSelectMaxScroll = Math.max(0, totalContentH - 540);
  charSelectScroll = Math.max(0, Math.min(charSelectScroll, charSelectMaxScroll));

  // Auto-scroll only when cursor changes
  const activeCursor = selectingCPU ? cpuSelectCursor : charSelectCursor;
  if (activeCursor !== charSelectLastCursor) {
    charSelectLastCursor = activeCursor;
    const selectedRow = Math.floor(activeCursor / perRow);
    const selectedCardTop = gridStartY + selectedRow * rowHeight - cardSize - 20;
    const selectedCardBot = gridStartY + selectedRow * rowHeight + 30;
    if (selectedCardTop < charSelectScroll) {
      charSelectScroll = Math.max(0, selectedCardTop);
    }
    if (selectedCardBot > charSelectScroll + 540) {
      charSelectScroll = Math.min(charSelectMaxScroll, selectedCardBot - 540);
    }
  }

  ctx.save();
  ctx.translate(0, -charSelectScroll);

  // Title
  ctx.font = `bold ${manyChars ? 28 : 36}px Arial`;
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT YOUR FIGHTER', 480, manyChars ? 35 : 50);

  if (gameMode === 'practice') {
    ctx.font = `${manyChars ? 14 : 18}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Practice Mode - Select your fighter', 480, manyChars ? 52 : 80);
  } else if (selectingCPU) {
    ctx.font = `${manyChars ? 14 : 18}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Now select CPU opponent', 480, manyChars ? 52 : 80);
  }

  // Build display order: unlocked chars, then locked chars, then RANDOM
  const displayList = [];
  for (let i = 0; i < characters.length; i++) displayList.push({ type: 'char', char: characters[i], selectIdx: i });
  for (let i = 0; i < lockedChars.length; i++) displayList.push({ type: 'locked', char: lockedChars[i] });
  displayList.push({ type: 'random', selectIdx: characters.length });

  // Character cards
  for (let i = 0; i < displayList.length; i++) {
    const row = Math.floor(i / perRow);
    const col = i % perRow;
    const slotsInRow = row < rows - 1 ? perRow : displayList.length - row * perRow;
    const rowStartX = 480 - ((slotsInRow - 1) * spacing) / 2;
    const x = rowStartX + col * spacing;
    const y = gridStartY + row * rowHeight;
    const item = displayList[i];

    if (item.type === 'locked') {
      drawLockedCharPreview(item.char, x, y, cardSize);
    } else {
      let label = null;
      let isSelected = false;
      const si = item.selectIdx;
      if (!selectingCPU) {
        isSelected = si === charSelectCursor;
      } else {
        isSelected = si === cpuSelectCursor;
        if (si === charSelectCursor) label = 'P1';
      }
      if (item.type === 'char') {
        drawCharacterPreview(item.char, x, y, cardSize, isSelected, label);
      } else {
        drawRandomCard(x, y, cardSize, isSelected, label);
      }
    }
  }

  // Selected character info
  const cursorIdx = selectingCPU ? cpuSelectCursor : charSelectCursor;
  const isRandom = cursorIdx >= characters.length;
  if (isRandom) {
    ctx.font = `bold ${compact ? 18 : 24}px Arial`;
    ctx.fillStyle = '#ffd700';
    ctx.textAlign = 'center';
    ctx.fillText('RANDOM', 480, infoBaseY);
    ctx.font = `${compact ? 12 : 16}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText('Pick a random fighter', 480, infoBaseY + (compact ? 18 : 25));
  } else {
    const current = characters[cursorIdx];
    ctx.font = `bold ${compact ? 18 : 24}px Arial`;
    ctx.fillStyle = current.accent;
    ctx.textAlign = 'center';
    ctx.fillText(current.name, 480, infoBaseY);
    ctx.font = `${compact ? 12 : 16}px Arial`;
    ctx.fillStyle = '#aaa';
    ctx.fillText(current.desc, 480, infoBaseY + (compact ? 16 : 25));

    // Stats (left side)
    const statNames = ['Speed', 'Power', 'Defense'];
    const statValues = [current.stats.speed / 6, current.stats.power / 1.3, current.stats.defense / 1.4];
    const statGap = compact ? 16 : 22;
    const statStart = infoBaseY + (compact ? 30 : 45);
    for (let i = 0; i < 3; i++) {
      const sx = 250;
      const sy = statStart + i * statGap;
      ctx.font = '12px Arial';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#888';
      ctx.fillText(statNames[i], sx, sy + 10);
      ctx.fillStyle = '#333';
      ctx.fillRect(sx + 8, sy, 140, 12);
      ctx.fillStyle = current.accent;
      ctx.fillRect(sx + 8, sy, 140 * statValues[i], 12);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.strokeRect(sx + 8, sy, 140, 12);
    }

    // Combos / abilities / rumbles preview (right side)
    const abilStart = compact ? statStart : infoBaseY + 55;
    const abilLine1 = abilStart + (compact ? 12 : 17);
    const abilLine2 = abilLine1 + (compact ? 14 : 18);

    // In Rumble Practice: show rumble info instead of combos/abilities
    const rumbleEntry = gameMode === 'rumblePractice' ? characterRumbles[current.name] : null;
    if (rumbleEntry) {
      const rumbleList = Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry];
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#888';
      ctx.fillText('RUMBLES:', 530, abilStart);
      for (let r = 0; r < rumbleList.length; r++) {
        const rumble = rumbleList[r];
        const ry = abilLine1 + r * (compact ? 42 : 52);
        // Rumble name
        ctx.fillStyle = current.accent;
        ctx.beginPath();
        ctx.arc(537, ry - 3, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = 'bold 13px Arial';
        ctx.fillStyle = '#ccc';
        ctx.fillText(rumble.name.replace(/\*/g, ''), 547, ry);
        // Code keycaps
        const codeLetters = rumble.code.toUpperCase().split('');
        for (let k = 0; k < codeLetters.length; k++) {
          ctx.fillStyle = '#444';
          ctx.fillRect(547 + k * 20, ry + 6, 17, 17);
          ctx.strokeStyle = '#777';
          ctx.lineWidth = 1;
          ctx.strokeRect(547 + k * 20, ry + 6, 17, 17);
          ctx.font = 'bold 11px Arial';
          ctx.textAlign = 'center';
          ctx.fillStyle = '#ddd';
          ctx.fillText(codeLetters[k], 547 + k * 20 + 8.5, ry + 19);
          ctx.textAlign = 'left';
        }
        // Description
        ctx.font = '12px Arial';
        ctx.fillStyle = '#888';
        ctx.fillText(rumble.desc, 547, ry + 35);
      }
    } else {
    const combos = characterCombos[current.name];
    if (combos) {
      ctx.font = 'bold 12px Arial';
      ctx.textAlign = 'left';
      ctx.fillStyle = '#888';
      ctx.fillText('COMBOS:', 530, abilStart);
      const keyMap = { jab: 'Z', lowKick: 'C', uppercut: 'X', highKick: 'V' };
      for (let c = 0; c < combos.length; c++) {
        const cy = abilLine1 + c * (compact ? 16 : 22);
        ctx.fillStyle = combos[c].effectColor;
        ctx.beginPath();
        ctx.arc(537, cy - 3, 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.font = '11px Arial';
        ctx.fillStyle = '#ccc';
        ctx.fillText(combos[c].name, 545, cy);
        ctx.fillStyle = '#888';
        const seq = combos[c].sequence.map(s => keyMap[s]).join(' > ');
        ctx.fillText(seq, 660, cy);
      }
    } else {
      // Special ability preview for secret characters
      const abilityMap = {
        isBojdo: ['SIZE SHIFTING', 'K / L', 'Grow or shrink to change stats'],
        isRubberman: ['RUBBER STRETCH', '', 'Attacks reach across the screen'],
        isTorrena: ['WATER PHASE', 'H', 'Phase through foes, immune to damage'],
        isSnazz: ['JAZZ DANCE', 'J', 'Dance 2s to heal, 2x damage if hit'],
        isHaystack: ['HAY EXPLOSION', 'F', 'Explode into arrows & sword, 1s reform'],
        isCodemax: ['CODE PORT', 'N', 'Swap positions with opponent'],
        isCorvida: ['BLUE JAY FORM', '\u2191 \u2191', 'Double-jump to fly, land to revert'],
        isGolgar: ['SOUL SWAP', 'G', 'Switch to dormant entity'],
        isTelatrine: ['WARP WALK', '', 'Walk through walls to the other side'],
        isDuplaire: ['CLONE ARMY', 'K', 'Create clones that share damage & health'],
        isBozollok: ['SKIN SHED', 'H', 'Molt leap, hover, then claw descent'],
        isGourmand: ['DEVOUR', 'L / P', 'Absorb attacks, spit energy ball'],
        isBatsch: ['TORTOISE FORM', '\u2193 \u2193', 'Shell reduces damage 60%, jump to revert'],
        isPaletap: ['GROUND SLAM', 'K', 'Shockwave across the ground, jump to dodge'],
        isMatador: ['ESTOQUE DASH', 'O', 'Dash through foe and slash with blade'],
        isKillawatt: ['VOLT ZAP', 'K', 'Zap foe in range, stun & damage'],
        isBacktrack: ['TIME REWIND', 'J', 'Rewind 8s, restore health & positions'],
        isExor: ['SOUL DRAIN', 'N', 'Steal HP at close range, slows foe'],
        isBuck: ['FIREWORK SPRAY', 'L', 'Spray red, white & blue fireworks'],
        isVortice: ['TORNADO', 'H / J', 'Pull foes in or blast them away'],
        isXhaust: ['OIL IGNITE', 'L / K', 'Leak oil trail, then ignite it'],
        isDryad: ['PLANT WALL', 'P', 'Drop a seed; grows into a 30HP plant wall'],
        isKavak: ['PUNCH FLURRY', 'K', 'Storm of fast punches up and down at short range'],
        isAether: ['CHARGED LASER', 'L', 'Hold to charge a yellow orb, release to fire'],
      };
      for (const [flag, info] of Object.entries(abilityMap)) {
        if (!current[flag]) continue;
        ctx.font = 'bold 12px Arial';
        ctx.textAlign = 'left';
        ctx.fillStyle = '#888';
        ctx.fillText('ABILITIES:', 530, abilStart);
        ctx.font = '11px Arial';
        ctx.fillStyle = current.accent;
        ctx.beginPath(); ctx.arc(537, abilLine1 - 3, 3, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#ccc';
        ctx.fillText(info[0], 545, abilLine1);
        if (info[1]) { ctx.fillStyle = '#888'; ctx.fillText(info[1], 660, abilLine1); }
        ctx.fillStyle = '#666';
        ctx.fillText(info[2], 545, abilLine2);
        break;
      }
    }
    } // end else (not rumble practice)
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select' + (selectingCPU ? ' | ESC to go back' : '') + (charSelectMaxScroll > 0 ? ' | Scroll to see more' : ''), 480, infoBaseY + infoH + 10);

  ctx.restore();

  // Scroll indicator (drawn at screen coordinates)
  if (charSelectMaxScroll > 0) {
    const trackH = 400;
    const trackY = 70;
    const thumbH = Math.max(30, trackH * (540 / totalContentH));
    const thumbY = trackY + (charSelectScroll / charSelectMaxScroll) * (trackH - thumbH);
    ctx.fillStyle = 'rgba(255,255,255,0.1)';
    ctx.fillRect(948, trackY, 6, trackH);
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.roundRect(948, thumbY, 6, thumbH, 3);
    ctx.fill();
  }

  // Bojdo unlock flash
  if (bojdoUnlockFlash > 0) {
    bojdoUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = bojdoUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffcc00';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, bojdoUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText(bojdobojdoUnlocked ? 'BOJDOBOJDO AWAKENED' : 'CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Rubberman unlock flash
  if (rubbermanUnlockFlash > 0) {
    rubbermanUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = rubbermanUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff4400';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, rubbermanUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Torrena unlock flash
  if (torrenaUnlockFlash > 0) {
    torrenaUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = torrenaUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#44ddff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, torrenaUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Snazz McJazz unlock flash
  if (snazzUnlockFlash > 0) {
    snazzUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = snazzUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff00ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, snazzUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Haystack unlock flash
  if (haystackUnlockFlash > 0) {
    haystackUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = haystackUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c4a35a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, haystackUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Codemax unlock flash
  if (codemaxUnlockFlash > 0) {
    codemaxUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = codemaxUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, codemaxUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Telatrine unlock flash
  if (telatrineUnlockFlash > 0) {
    telatrineUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = telatrineUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#b366ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, telatrineUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Golgar unlock flash
  if (golgarUnlockFlash > 0) {
    golgarUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = golgarUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#8b7ec8';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, golgarUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Corvida unlock flash
  if (corvidaUnlockFlash > 0) {
    corvidaUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = corvidaUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#4a90d9';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, corvidaUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Duplaire unlock flash
  if (duplaireUnlockFlash > 0) {
    duplaireUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = duplaireUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#8bcc66';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, duplaireUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Bozollok unlock flash
  if (bozollokUnlockFlash > 0) {
    bozollokUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = bozollokUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c8a030';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, bozollokUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  // Gourmand unlock flash
  if (gourmandUnlockFlash > 0) {
    gourmandUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = gourmandUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#e8a852';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, gourmandUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (batschUnlockFlash > 0) {
    batschUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = batschUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#c4a55a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, batschUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (paletapUnlockFlash > 0) {
    paletapUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = paletapUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, paletapUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (matadorUnlockFlash > 0) {
    matadorUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = matadorUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, matadorUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (killawattUnlockFlash > 0) {
    killawattUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = killawattUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, killawattUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (backtrackUnlockFlash > 0) {
    backtrackUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = backtrackUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#b44dff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, backtrackUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (exorUnlockFlash > 0) {
    exorUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = exorUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#39ff14';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, exorUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }

  if (buckUnlockFlash > 0) {
    buckUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = buckUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#cc0000';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, buckUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (vorticeUnlockFlash > 0) {
    vorticeUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = vorticeUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#4a6a5a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, vorticeUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
    ctx.restore();
  }
  if (xhaustUnlockFlash > 0) {
    xhaustUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = xhaustUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#5a5a5a';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, xhaustUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#fff';
    ctx.fillText('CHALLENGER UNLOCKED', 480, 270);
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

  // Lottery animation overlay
  if (lotteryActive && (lotteryType === 'char' || lotteryType === 'cpu')) {
    drawLotteryOverlay();
  }
}

