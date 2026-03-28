function drawPortraitIcon(charName, x, y, size) {
  const img = portraitImages[charName];
  if (img) {
    ctx.save();
    ctx.drawImage(img, x - size, y - size, size * 2, size * 2);
    ctx.restore();
  } else {
    // fallback to procedural icon if portrait not loaded yet
    drawFighterIcon(charName, x, y, size, '#fff');
  }
}

function drawFighterIcon(charName, x, y, size, color) {
  ctx.save();
  ctx.translate(x, y);
  const s = size / 16; // normalize to base size 16
  ctx.fillStyle = color;
  ctx.strokeStyle = color;

  switch (charName) {
    case 'BLAZE': {
      // Flame
      ctx.beginPath();
      ctx.moveTo(0, -14 * s);
      ctx.quadraticCurveTo(8 * s, -6 * s, 7 * s, 4 * s);
      ctx.quadraticCurveTo(4 * s, 10 * s, 0, 12 * s);
      ctx.quadraticCurveTo(-4 * s, 10 * s, -7 * s, 4 * s);
      ctx.quadraticCurveTo(-8 * s, -6 * s, 0, -14 * s);
      ctx.fill();
      break;
    }
    case 'ARTIK': {
      if (iconImages['ARTIK']) {
        ctx.drawImage(iconImages['ARTIK'], -size, -size, size * 2, size * 2);
      } else {
        // Fallback while image loads
        ctx.lineWidth = 1.5 * s;
        for (let i = 0; i < 6; i++) {
          const a = (i / 6) * Math.PI * 2;
          ctx.beginPath(); ctx.moveTo(0, 0);
          ctx.lineTo(Math.cos(a) * 10 * s, Math.sin(a) * 10 * s);
          ctx.stroke();
        }
      }
      break;
    }
    case 'VENOM': {
      // Fang/tooth
      ctx.beginPath();
      ctx.moveTo(-6 * s, -12 * s);
      ctx.lineTo(0, 12 * s);
      ctx.lineTo(6 * s, -12 * s);
      ctx.quadraticCurveTo(0, -6 * s, -6 * s, -12 * s);
      ctx.fill();
      break;
    }
    case 'SURGE': {
      // Lightning bolt
      ctx.beginPath();
      ctx.moveTo(2 * s, -13 * s);
      ctx.lineTo(-4 * s, 0);
      ctx.lineTo(1 * s, 0);
      ctx.lineTo(-3 * s, 13 * s);
      ctx.lineTo(7 * s, -2 * s);
      ctx.lineTo(2 * s, -2 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'TITAN': {
      // Shield
      ctx.beginPath();
      ctx.moveTo(0, -12 * s);
      ctx.lineTo(10 * s, -8 * s);
      ctx.lineTo(10 * s, 2 * s);
      ctx.quadraticCurveTo(10 * s, 10 * s, 0, 14 * s);
      ctx.quadraticCurveTo(-10 * s, 10 * s, -10 * s, 2 * s);
      ctx.lineTo(-10 * s, -8 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'SHADE': {
      // Half circle / mask
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0, Math.PI * 2);
      ctx.fill();
      // Cut out an eye slit
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.ellipse(0, -1 * s, 7 * s, 2.5 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'BOJDO':
    case 'BOJDOBOJDO': {
      // Up/down arrows (size shift)
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.lineTo(6 * s, -5 * s);
      ctx.lineTo(-6 * s, -5 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(0, 13 * s);
      ctx.lineTo(6 * s, 5 * s);
      ctx.lineTo(-6 * s, 5 * s);
      ctx.closePath();
      ctx.fill();
      // Center bar
      ctx.fillRect(-2 * s, -5 * s, 4 * s, 10 * s);
      break;
    }
    case 'RUBBERMAN': {
      // Stretched spring/coil
      ctx.lineWidth = 2.5 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-8 * s, -10 * s);
      ctx.lineTo(8 * s, -5 * s);
      ctx.lineTo(-8 * s, 0);
      ctx.lineTo(8 * s, 5 * s);
      ctx.lineTo(-8 * s, 10 * s);
      ctx.stroke();
      break;
    }
    case 'TORRENA': {
      // Water droplet
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.quadraticCurveTo(10 * s, 2 * s, 0, 13 * s);
      ctx.quadraticCurveTo(-10 * s, 2 * s, 0, -13 * s);
      ctx.fill();
      break;
    }
    case 'CODEMAX': {
      // Angle brackets < / >
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(-2 * s, -10 * s);
      ctx.lineTo(-9 * s, 0);
      ctx.lineTo(-2 * s, 10 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2 * s, -10 * s);
      ctx.lineTo(9 * s, 0);
      ctx.lineTo(2 * s, 10 * s);
      ctx.stroke();
      break;
    }
    case 'HAYSTACK': {
      // Scarecrow cross
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      // Vertical
      ctx.beginPath();
      ctx.moveTo(0, -12 * s);
      ctx.lineTo(0, 12 * s);
      ctx.stroke();
      // Horizontal arms
      ctx.beginPath();
      ctx.moveTo(-10 * s, -4 * s);
      ctx.lineTo(10 * s, -4 * s);
      ctx.stroke();
      // Head circle
      ctx.beginPath();
      ctx.arc(0, -12 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'SNAZZ MCJAZZ': {
      // Music note
      ctx.beginPath();
      ctx.arc(-4 * s, 8 * s, 5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-4 * s + 4.5 * s, -12 * s, 2.5 * s, 20 * s);
      // Flag
      ctx.beginPath();
      ctx.moveTo(-4 * s + 7 * s, -12 * s);
      ctx.lineTo(-4 * s + 7 * s + 8 * s, -8 * s);
      ctx.lineTo(-4 * s + 7 * s, -4 * s);
      ctx.fill();
      break;
    }
    case 'DUPLAIRE': {
      // Two overlapping circles
      ctx.globalAlpha = 0.8;
      ctx.beginPath();
      ctx.arc(-4 * s, 0, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4 * s, 0, 9 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      break;
    }
    case 'TELATRINE': {
      // Portal ring
      ctx.lineWidth = 3 * s;
      ctx.beginPath();
      ctx.ellipse(0, 0, 10 * s, 12 * s, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Center dot
      ctx.beginPath();
      ctx.arc(0, 0, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'GOLGAR': {
      // Yin-yang style dual shape
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, -Math.PI / 2, Math.PI / 2);
      ctx.arc(0, 5.5 * s, 5.5 * s, Math.PI / 2, -Math.PI / 2, true);
      ctx.arc(0, -5.5 * s, 5.5 * s, Math.PI / 2, -Math.PI / 2);
      ctx.fill();
      break;
    }
    case 'CORVIDA': {
      // Bird/wing silhouette
      ctx.beginPath();
      ctx.moveTo(0, 4 * s);
      ctx.quadraticCurveTo(-14 * s, -8 * s, -10 * s, -12 * s);
      ctx.quadraticCurveTo(-4 * s, -6 * s, 0, -4 * s);
      ctx.quadraticCurveTo(4 * s, -6 * s, 10 * s, -12 * s);
      ctx.quadraticCurveTo(14 * s, -8 * s, 0, 4 * s);
      ctx.fill();
      // Tail
      ctx.beginPath();
      ctx.moveTo(-3 * s, 4 * s);
      ctx.lineTo(0, 12 * s);
      ctx.lineTo(3 * s, 4 * s);
      ctx.fill();
      break;
    }
    case 'BOZOLLOK': {
      // Beetle/bug shape
      ctx.beginPath();
      ctx.ellipse(0, 2 * s, 8 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Line down the center (wing split)
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.lineWidth = 1.5 * s;
      ctx.beginPath();
      ctx.moveTo(0, -7 * s);
      ctx.lineTo(0, 12 * s);
      ctx.stroke();
      ctx.restore();
      // Antennae
      ctx.lineWidth = 1.5 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-2 * s, -7 * s);
      ctx.lineTo(-6 * s, -13 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(2 * s, -7 * s);
      ctx.lineTo(6 * s, -13 * s);
      ctx.stroke();
      break;
    }
    case 'GOURMAND': {
      // Open jaw/mouth
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0.3, Math.PI - 0.3);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.arc(0, 2 * s, 11 * s, Math.PI + 0.3, -0.3);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'BATSCH': {
      // Turtle shell (hexagon)
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        const px = Math.cos(a) * 11 * s;
        const py = Math.sin(a) * 11 * s;
        if (i === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'PALETAP': {
      // Footprint / stomp mark
      ctx.beginPath();
      ctx.ellipse(0, 3 * s, 8 * s, 10 * s, 0, 0, Math.PI * 2);
      ctx.fill();
      // Toes
      for (let i = -1; i <= 1; i++) {
        ctx.beginPath();
        ctx.arc(i * 5 * s, -10 * s, 3 * s, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
    case 'MATADOR': {
      // Bull horns
      ctx.lineWidth = 3 * s;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(-10 * s, -10 * s);
      ctx.quadraticCurveTo(-6 * s, 2 * s, 0, 4 * s);
      ctx.quadraticCurveTo(6 * s, 2 * s, 10 * s, -10 * s);
      ctx.stroke();
      // Nose ring
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(0, 8 * s, 4 * s, 0, Math.PI);
      ctx.stroke();
      break;
    }
    case 'KILLA WATT': {
      // Double lightning bolt (like ⚡⚡)
      ctx.beginPath();
      ctx.moveTo(-4 * s, -12 * s);
      ctx.lineTo(-7 * s, 0);
      ctx.lineTo(-3 * s, 0);
      ctx.lineTo(-6 * s, 12 * s);
      ctx.lineTo(0, -1 * s);
      ctx.lineTo(-4 * s, -1 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(4 * s, -12 * s);
      ctx.lineTo(1 * s, 0);
      ctx.lineTo(5 * s, 0);
      ctx.lineTo(2 * s, 12 * s);
      ctx.lineTo(8 * s, -1 * s);
      ctx.lineTo(4 * s, -1 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'BACKTRACK': {
      // Rewind arrows (◄◄)
      ctx.beginPath();
      ctx.moveTo(2 * s, -10 * s);
      ctx.lineTo(-8 * s, 0);
      ctx.lineTo(2 * s, 10 * s);
      ctx.closePath();
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(10 * s, -10 * s);
      ctx.lineTo(0, 0);
      ctx.lineTo(10 * s, 10 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'EXOR': {
      // Skull outline
      ctx.beginPath();
      ctx.arc(0, -2 * s, 10 * s, Math.PI, 0);
      ctx.quadraticCurveTo(10 * s, 8 * s, 5 * s, 12 * s);
      ctx.lineTo(-5 * s, 12 * s);
      ctx.quadraticCurveTo(-10 * s, 8 * s, -10 * s, -2 * s);
      ctx.fill();
      // Eye holes
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.beginPath();
      ctx.arc(-4 * s, -2 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(4 * s, -2 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
      break;
    }
    case 'BUCK': {
      // Star (5-pointed)
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
        const ox = Math.cos(a) * 12 * s;
        const oy = Math.sin(a) * 12 * s;
        if (i === 0) ctx.moveTo(ox, oy);
        else ctx.lineTo(ox, oy);
        const ia = ((i + 0.5) / 5) * Math.PI * 2 - Math.PI / 2;
        ctx.lineTo(Math.cos(ia) * 5 * s, Math.sin(ia) * 5 * s);
      }
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'X-HAUST': {
      // Exhaust pipe with smoke puff
      // Pipe body
      ctx.fillRect(-3 * s, -2 * s, 10 * s, 6 * s);
      // Pipe opening
      ctx.fillRect(7 * s, -4 * s, 3 * s, 10 * s);
      // Smoke puffs
      ctx.beginPath();
      ctx.arc(-6 * s, -4 * s, 4 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-9 * s, -8 * s, 3 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(-5 * s, -10 * s, 2.5 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'VORTICE': {
      // Tornado/cyclone spiral
      ctx.lineWidth = 2.5 * s;
      ctx.strokeStyle = color;
      ctx.beginPath();
      // Funnel shape - wider at top, narrow at bottom
      ctx.moveTo(-10 * s, -10 * s);
      ctx.quadraticCurveTo(-8 * s, -4 * s, -3 * s, 2 * s);
      ctx.quadraticCurveTo(-1 * s, 8 * s, 0, 12 * s);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(10 * s, -10 * s);
      ctx.quadraticCurveTo(8 * s, -4 * s, 3 * s, 2 * s);
      ctx.quadraticCurveTo(1 * s, 8 * s, 0, 12 * s);
      ctx.stroke();
      // Horizontal swirl lines
      ctx.beginPath();
      ctx.moveTo(-10 * s, -8 * s);
      ctx.lineTo(10 * s, -8 * s);
      ctx.moveTo(-7 * s, -3 * s);
      ctx.lineTo(7 * s, -3 * s);
      ctx.moveTo(-4 * s, 2 * s);
      ctx.lineTo(4 * s, 2 * s);
      ctx.stroke();
      break;
    }
    case 'BAG': {
      // Punching bag silhouette
      ctx.beginPath();
      ctx.moveTo(-6 * s, -13 * s);
      ctx.lineTo(6 * s, -13 * s);
      ctx.lineTo(6 * s, -10 * s);
      ctx.quadraticCurveTo(9 * s, -5 * s, 9 * s, 3 * s);
      ctx.quadraticCurveTo(9 * s, 12 * s, 0, 13 * s);
      ctx.quadraticCurveTo(-9 * s, 12 * s, -9 * s, 3 * s);
      ctx.quadraticCurveTo(-9 * s, -5 * s, -6 * s, -10 * s);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case 'MANNEQUIN': {
      // Wooden dummy T-shape
      ctx.beginPath();
      ctx.arc(0, -9 * s, 5 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillRect(-2 * s, -4 * s, 4 * s, 14 * s);
      // Arms
      ctx.fillRect(-10 * s, -2 * s, 20 * s, 3 * s);
      break;
    }
    case 'DRONE': {
      // Crosshair / target
      ctx.lineWidth = 2 * s;
      ctx.beginPath();
      ctx.arc(0, 0, 9 * s, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, -13 * s);
      ctx.lineTo(0, -6 * s);
      ctx.moveTo(0, 6 * s);
      ctx.lineTo(0, 13 * s);
      ctx.moveTo(-13 * s, 0);
      ctx.lineTo(-6 * s, 0);
      ctx.moveTo(6 * s, 0);
      ctx.lineTo(13 * s, 0);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(0, 0, 2 * s, 0, Math.PI * 2);
      ctx.fill();
      break;
    }
    case 'PRINTER': {
      // Printer icon
      ctx.fillRect(-8 * s, -10 * s, 16 * s, 12 * s);
      ctx.fillRect(-6 * s, -14 * s, 12 * s, 5 * s);
      ctx.fillRect(-9 * s, -1 * s, 18 * s, 5 * s);
      // Paper
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.fillRect(-4 * s, -18 * s, 8 * s, 6 * s);
      ctx.restore();
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.strokeRect(-4 * s, -18 * s, 8 * s, 6 * s);
      break;
    }
    default: {
      // Fallback: circle with first letter
      ctx.beginPath();
      ctx.arc(0, 0, 11 * s, 0, Math.PI * 2);
      ctx.fill();
      ctx.save();
      ctx.globalCompositeOperation = 'destination-out';
      ctx.font = `bold ${14 * s}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(charName.charAt(0), 0, 1 * s);
      ctx.restore();
      break;
    }
  }
  ctx.restore();
}

function drawHUD() {
  const barWidth = 350;
  const barHeight = 24;
  const barY = 25;

  // Player health bar (left)
  ctx.fillStyle = '#333';
  ctx.fillRect(30, barY, barWidth, barHeight);
  const pHealthWidth = (player.health / player.maxHealth) * barWidth;
  const pHealthColor = player.health > 50 ? '#2ecc71' : player.health > 25 ? '#f39c12' : '#e74c3c';
  ctx.fillStyle = pHealthColor;
  ctx.fillRect(30, barY, pHealthWidth, barHeight);
  // Duplaire clone sections on player health bar
  if (player.char.isDuplaire && player.duplaireClones.length > 0) {
    const activeClones = player.duplaireClones.filter(c => c.active || c.activationTimer > 0);
    const totalBodies = 1 + activeClones.length;
    const sectionWidth = barWidth / totalBodies;
    // Redraw with per-section fills
    ctx.fillStyle = '#333';
    ctx.fillRect(30, barY, barWidth, barHeight);
    // Original's section
    const origSectionMax = player.maxHealth / totalBodies;
    const origFill = Math.min(1, player.duplaireOrigHealth / origSectionMax);
    const origColor = player.duplaireOrigHealth > origSectionMax * 0.5 ? '#2ecc71' : player.duplaireOrigHealth > origSectionMax * 0.25 ? '#f39c12' : '#e74c3c';
    ctx.fillStyle = origColor;
    ctx.fillRect(30, barY, sectionWidth * origFill, barHeight);
    // Clone sections
    for (let s = 0; s < activeClones.length; s++) {
      const clone = activeClones[s];
      const sx = 30 + sectionWidth * (s + 1);
      const cloneFill = Math.min(1, clone.cloneHealth / (clone.cloneMaxHealth || origSectionMax));
      const cloneColor = cloneFill > 0.5 ? '#2ecc71' : cloneFill > 0.25 ? '#f39c12' : '#e74c3c';
      ctx.fillStyle = cloneColor;
      ctx.fillRect(sx, barY, sectionWidth * cloneFill, barHeight);
    }
    // Dividers
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let s = 1; s < totalBodies; s++) {
      const sx = 30 + (barWidth * s / totalBodies);
      ctx.beginPath();
      ctx.moveTo(sx, barY);
      ctx.lineTo(sx, barY + barHeight);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(30, barY, barWidth, barHeight);

  // CPU health bar (right, fills from right) — skip for bonus fights
  if (testYourMightActive) {
    // Show nothing for CPU side — the TYM HUD replaces it
  } else {
  ctx.fillStyle = '#333';
  ctx.fillRect(580, barY, barWidth, barHeight);
  const cHealthWidth = (cpu.health / cpu.maxHealth) * barWidth;
  ctx.fillStyle = cpu.health > 50 ? '#2ecc71' : cpu.health > 25 ? '#f39c12' : '#e74c3c';
  ctx.fillRect(580 + barWidth - cHealthWidth, barY, cHealthWidth, barHeight);
  // Duplaire clone sections on CPU health bar
  if (cpu.char.isDuplaire && cpu.duplaireClones.length > 0) {
    const activeClones = cpu.duplaireClones.filter(c => c.active || c.activationTimer > 0);
    const totalBodies = 1 + activeClones.length;
    const sectionWidth = barWidth / totalBodies;
    // Redraw with per-section fills (right-aligned bar)
    ctx.fillStyle = '#333';
    ctx.fillRect(580, barY, barWidth, barHeight);
    // Original's section (rightmost)
    const origSectionMax = cpu.maxHealth / totalBodies;
    const origFill = Math.min(1, cpu.duplaireOrigHealth / origSectionMax);
    const origColor = cpu.duplaireOrigHealth > origSectionMax * 0.5 ? '#2ecc71' : cpu.duplaireOrigHealth > origSectionMax * 0.25 ? '#f39c12' : '#e74c3c';
    ctx.fillStyle = origColor;
    ctx.fillRect(580 + barWidth - sectionWidth, barY, sectionWidth * origFill, barHeight);
    // Clone sections (fill from right)
    for (let s = 0; s < activeClones.length; s++) {
      const clone = activeClones[s];
      const sx = 580 + barWidth - sectionWidth * (s + 2);
      const cloneFill = Math.min(1, clone.cloneHealth / (clone.cloneMaxHealth || origSectionMax));
      const cloneColor = cloneFill > 0.5 ? '#2ecc71' : cloneFill > 0.25 ? '#f39c12' : '#e74c3c';
      ctx.fillStyle = cloneColor;
      ctx.fillRect(sx, barY, sectionWidth * cloneFill, barHeight);
    }
    // Dividers
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 1;
    for (let s = 1; s < totalBodies; s++) {
      const sx = 580 + (barWidth * s / totalBodies);
      ctx.beginPath();
      ctx.moveTo(sx, barY);
      ctx.lineTo(sx, barY + barHeight);
      ctx.stroke();
    }
  }
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeRect(580, barY, barWidth, barHeight);
  } // end if !testYourMightActive

  // Names with icons
  drawPortraitIcon(selectedPlayer.name, 16, barY + 5, 16);
  ctx.font = 'bold 16px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 30, barY - 5);
  if (!testYourMightActive) {
    drawPortraitIcon(selectedCPU.name, 944, barY + 5, 16);
    ctx.textAlign = 'right';
    ctx.fillStyle = selectedCPU.accent;
    ctx.fillText(selectedCPU.name + (gameMode === 'practice' ? '' : ' (CPU)'), 930, barY - 5);
  }

  // Health numbers
  ctx.font = '12px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.fillText(gameMode === 'practice' ? '\u221E' : Math.ceil(player.health), 35, barY + 17);
  if (!testYourMightActive) {
    ctx.textAlign = 'right';
    ctx.fillText(gameMode === 'practice' ? '\u221E' : Math.ceil(cpu.health), 925, barY + 17);

    // VS text
    ctx.font = 'bold 18px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    ctx.fillText('VS', 480, barY + 18);
  }

  // Practice mode label
  if (gameMode === 'practice') {
    ctx.font = 'bold 14px Arial';
    ctx.fillStyle = '#ff6b35';
    ctx.fillText('PRACTICE MODE | ESC to quit', 480, 520);
  }

  // Assist cooldown bars
  const assistBarW = 100;
  const assistBarH = 8;
  // Player assist
  ctx.fillStyle = '#222';
  ctx.fillRect(30, barY + barHeight + 6, assistBarW, assistBarH);
  const pAssistReady = player.assistCooldown <= 0;
  const pAssistFill = pAssistReady ? 1 : 1 - (player.assistCooldown / selectedAssist.cooldownTime);
  ctx.fillStyle = pAssistReady ? selectedAssist.color : '#555';
  ctx.fillRect(30, barY + barHeight + 6, assistBarW * pAssistFill, assistBarH);
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 1;
  ctx.strokeRect(30, barY + barHeight + 6, assistBarW, assistBarH);
  ctx.font = '10px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#aaa';
  ctx.fillText(selectedAssist.name + (pAssistReady ? ' READY' : ''), 30, barY + barHeight + 26);

  // CPU assist
  const cpuAssist = assists[cpuAssistIndex];
  ctx.fillStyle = '#222';
  ctx.fillRect(830, barY + barHeight + 6, assistBarW, assistBarH);
  const cAssistReady = cpu.assistCooldown <= 0;
  const cAssistFill = cAssistReady ? 1 : 1 - (cpu.assistCooldown / cpuAssist.cooldownTime);
  ctx.fillStyle = cAssistReady ? cpuAssist.color : '#555';
  ctx.fillRect(830, barY + barHeight + 6, assistBarW * cAssistFill, assistBarH);
  ctx.strokeStyle = '#888';
  ctx.strokeRect(830, barY + barHeight + 6, assistBarW, assistBarH);
  ctx.textAlign = 'right';
  ctx.fillStyle = '#aaa';
  ctx.fillText(cpuAssist.name + (cAssistReady ? ' READY' : ''), 930, barY + barHeight + 26);

  // X-haust oil tank indicator
  if (selectedPlayer.isXhaust) {
    const tankX = 135;
    const tankY = barY + barHeight + 6;
    const tankW = 60;
    const tankH = assistBarH;
    const tankPct = player.xhaustOilTank / player.xhaustMaxOil;
    ctx.fillStyle = '#222';
    ctx.fillRect(tankX, tankY, tankW, tankH);
    ctx.fillStyle = tankPct > 0.5 ? '#ff8833' : tankPct > 0.2 ? '#cc6622' : '#883311';
    ctx.fillRect(tankX, tankY, tankW * tankPct, tankH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tankX, tankY, tankW, tankH);
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('OIL', tankX, tankY + 20);
  }
  if (selectedCPU.isXhaust) {
    const tankX = 825;
    const tankY = barY + barHeight + 6;
    const tankW = -60;
    const tankH = assistBarH;
    const tankPct = cpu.xhaustOilTank / cpu.xhaustMaxOil;
    ctx.fillStyle = '#222';
    ctx.fillRect(tankX + tankW, tankY, -tankW, tankH);
    ctx.fillStyle = tankPct > 0.5 ? '#ff8833' : tankPct > 0.2 ? '#cc6622' : '#883311';
    ctx.fillRect(tankX + tankW, tankY, -tankW * tankPct, tankH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(tankX + tankW, tankY, -tankW, tankH);
    ctx.font = '10px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = '#aaa';
    ctx.fillText('OIL', tankX, tankY + 20);
  }

  // Bojdo scale indicator
  if (selectedPlayer.isBojdo) {
    const scaleBarX = 30;
    const scaleBarY = barY + barHeight + 38;
    const scaleBarW = 140;
    const scaleBarH = 10;
    const isBBHud = player.char.name === 'BOJDOBOJDO' || player.char.isBojdo3;
    const sMin = isBBHud ? 0.2 : 0.5;
    const sMax = isBBHud ? 3.5 : 2.0;
    const scalePct = (player.bojdoScale - sMin) / (sMax - sMin);
    ctx.fillStyle = '#222';
    ctx.fillRect(scaleBarX, scaleBarY, scaleBarW, scaleBarH);
    const scaleColor = player.bojdoScale > 1.0 ? '#ff4444' : player.bojdoScale < 1.0 ? '#44aaff' : '#ffcc00';
    ctx.fillStyle = scaleColor;
    ctx.fillRect(scaleBarX, scaleBarY, scaleBarW * scalePct, scaleBarH);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.strokeRect(scaleBarX, scaleBarY, scaleBarW, scaleBarH);
    // Midpoint marker
    ctx.fillStyle = '#fff';
    ctx.fillRect(scaleBarX + scaleBarW * ((1.0 - sMin) / (sMax - sMin)), scaleBarY - 2, 2, scaleBarH + 4);
    ctx.font = '10px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = '#aaa';
    ctx.fillText('SIZE [K+/L-]', scaleBarX, scaleBarY + 22);
  }

  // Test Your Might bonus HUD
  if (testYourMightActive) {
    const secondsLeft = Math.ceil(testYourMightTimer / 60);
    const timePct = testYourMightTimer / testYourMightMaxTime;

    // "TEST YOUR MIGHT" banner
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffcc00';
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 10;
    ctx.fillText('TEST YOUR MIGHT', 480, 80);
    ctx.shadowBlur = 0;

    // Timer bar
    const timerBarW = 200;
    const timerBarX = 480 - timerBarW / 2;
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(timerBarX, 90, timerBarW, 10);
    const timerColor = timePct > 0.3 ? '#ffcc00' : (timePct > 0.1 ? '#ff6600' : '#ff0000');
    ctx.fillStyle = timerColor;
    ctx.fillRect(timerBarX, 90, timerBarW * timePct, 10);

    // Timer text
    ctx.font = 'bold 18px Arial';
    ctx.fillStyle = secondsLeft <= 5 ? '#ff4444' : '#fff';
    ctx.fillText(secondsLeft + 's', 480, 120);

    // Damage score
    ctx.font = 'bold 24px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'right';
    ctx.fillText('DAMAGE: ' + Math.floor(testYourMightDamage), 930, 80);
  }
}

function drawFinishHimScreen() {
  if (rumbleActive) {
    drawRumbleAnimation();
    return;
  }

  const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
  const isFemale = femaleCharacters.has(loserChar.name);
  const text = isFemale ? 'FINISH HER' : 'FINISH HIM';

  const alpha = Math.min(1, finishHimTimer / 30); // fade in
  const pulse = Math.sin(finishHimTimer * 0.08) * 0.05 + 1.0;

  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.translate(480, 45);
  ctx.scale(pulse, pulse);

  // Red glow text
  ctx.font = 'bold 36px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = '#ff0000';
  ctx.shadowBlur = 20;
  ctx.fillStyle = '#ff2222';
  ctx.fillText(text, 0, 0);
  ctx.shadowBlur = 0;

  ctx.restore();

  // Countdown bar below text (infinite in rumble practice)
  if (gameMode === 'rumblePractice') {
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgba(255,100,100,0.6)';
    ctx.fillText('∞', 480, 73);
  } else {
    const remaining = 1 - finishHimTimer / FINISH_HIM_DURATION;
    const barW = 200;
    const barX = 480 - barW / 2;
    ctx.fillStyle = 'rgba(255,0,0,0.2)';
    ctx.fillRect(barX, 68, barW, 3);
    ctx.fillStyle = '#ff2222';
    ctx.fillRect(barX, 68, barW * remaining, 3);
  }
}

