function drawBojdoRumble(loseFighter, winFighter) {
  ctx.save();
  const growStart = 110;
  const growEnd = 180;

  // Dust cloud when growing back
  if (rumbleTimer > growStart && rumbleTimer <= growEnd + 20) {
    const growT = Math.min(1, (rumbleTimer - growStart) / (growEnd - growStart));
    // Ground dust billowing outward
    ctx.globalAlpha = 0.4 * (1 - Math.max(0, (rumbleTimer - growEnd) / 20));
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI + Math.sin(rumbleTimer * 0.1 + i) * 0.3;
      const dist = growT * 40 + Math.sin(rumbleTimer * 0.15 + i * 1.5) * 10;
      const dx = winFighter.x + Math.cos(angle) * dist;
      const dy = winFighter.y + 5 - Math.abs(Math.sin(angle)) * 10;
      const dSize = 5 + growT * 8;
      ctx.fillStyle = '#8B7355';
      ctx.beginPath();
      ctx.arc(dx, dy, dSize, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Screen shake lines during growth (impact feel)
  if (rumbleTimer === growEnd) {
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 3;
    ctx.globalAlpha = 0.6;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const r1 = 30;
      const r2 = 60 + Math.random() * 30;
      ctx.beginPath();
      ctx.moveTo(winFighter.x + Math.cos(angle) * r1, winFighter.y - 30 + Math.sin(angle) * r1);
      ctx.lineTo(winFighter.x + Math.cos(angle) * r2, winFighter.y - 30 + Math.sin(angle) * r2);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawBojdoStompRumble(loseFighter, winFighter) {
  ctx.save();
  const stompFrame = 100;

  // Ground crack / impact effect on stomp
  if (rumbleTimer >= stompFrame && rumbleTimer < stompFrame + 30) {
    const impactAge = rumbleTimer - stompFrame;
    const impactAlpha = Math.max(0, 1 - impactAge / 30);
    ctx.globalAlpha = impactAlpha;

    // Radial crack lines from stomp point
    const cx = loseFighter.x;
    const cy = loseFighter.groundY;
    ctx.strokeStyle = '#8B7355';
    ctx.lineWidth = 3;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI - Math.PI / 2 + (Math.random() - 0.5) * 0.3;
      const len = 20 + impactAge * 3 + Math.random() * 20;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * 10, cy + Math.sin(angle) * 5);
      ctx.lineTo(cx + Math.cos(angle) * len, cy + Math.sin(angle) * len * 0.3);
      ctx.stroke();
    }

    // Dust clouds billowing outward
    ctx.globalAlpha = impactAlpha * 0.6;
    for (let i = 0; i < 8; i++) {
      const dustAngle = (i / 8) * Math.PI;
      const dustDist = impactAge * 4 + i * 5;
      const dustX = cx + Math.cos(dustAngle - Math.PI / 2) * dustDist;
      const dustY = cy - Math.abs(Math.sin(dustAngle)) * impactAge * 1.5;
      const dustSize = 8 + impactAge * 0.5;
      ctx.fillStyle = '#a08060';
      ctx.beginPath();
      ctx.arc(dustX, dustY, dustSize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Screen darkening flash on impact
    if (impactAge < 5) {
      ctx.globalAlpha = (5 - impactAge) / 5 * 0.3;
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, 960, 540);
    }
  }

  // Flattened opponent (pancake) on the ground after stomp
  if (rumbleLoserHidden && rumbleTimer >= stompFrame) {
    const lx = loseFighter.x;
    const ly = loseFighter.groundY;
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    ctx.globalAlpha = 0.8;
    // Flat oval (squished body)
    ctx.fillStyle = loserChar.color;
    ctx.strokeStyle = loserChar.outline || '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(lx, ly - 2, 25, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Tiny eyes on the flat shape
    ctx.fillStyle = loserChar.outline || '#333';
    ctx.beginPath();
    ctx.arc(lx - 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx + 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawRubbermanRumble(loseFighter, winFighter) {
  ctx.save();

  // Draw Rubberman's stretched arm connecting to the opponent (matches normal arm style)
  if (rumbleActive && rumbleType === 'RUBBERMAN' && !rumbleLoserHidden && rumbleTimer > 5) {
    // Use opponent-relative direction for arm start so it doesn't jump when facing flips
    const armDir = loseFighter.x >= winFighter.x ? 1 : -1;
    const armStartX = winFighter.x + armDir * 14;
    const armStartY = winFighter.y - 35;
    // During grab phase, arm extends progressively toward opponent
    const grabT = rumbleTimer <= 30 ? Math.min(1, rumbleTimer / 30) : 1;
    const armEndX = armStartX + (loseFighter.x - armStartX) * grabT;
    const armEndY = armStartY + ((loseFighter.y - 20) - armStartY) * grabT;

    const outline = winFighter.char ? winFighter.char.outline : '#333';
    const color = winFighter.char ? winFighter.char.color : '#888';
    const accent = winFighter.char ? winFighter.char.accent : '#ccc';

    // Straight arm — outline then color, matching fighter arm style
    ctx.lineCap = 'round';
    ctx.strokeStyle = outline;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(armEndX, armEndY);
    ctx.stroke();
    ctx.strokeStyle = color;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(armStartX, armStartY);
    ctx.lineTo(armEndX, armEndY);
    ctx.stroke();

    // Fist at the end
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(armEndX, armEndY, 5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Ground impact dust at slam points
  if (rumbleTetherSlams > 0) {
    // Small dust puffs at each slam
    const slamAge = (rumbleTimer - 30) % 35; // rough per-slam timing
    if (slamAge < 15) {
      ctx.globalAlpha = Math.max(0, 1 - slamAge / 15);
      for (let i = 0; i < 4; i++) {
        const dustX = loseFighter.x + (Math.random() - 0.5) * 40;
        const dustY = loseFighter.groundY - Math.random() * slamAge * 1.5;
        ctx.fillStyle = '#a08060';
        ctx.beginPath();
        ctx.arc(dustX, dustY, 3 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  // Cracked ground at final smash point
  if (rumbleTetherCracked) {
    const crackX = rumbleTetherGrabX; // stored from final smash position
    const crackY = loseFighter.groundY;

    // Crater depression — wider for face-down body
    ctx.fillStyle = '#5a4830';
    ctx.beginPath();
    ctx.ellipse(crackX, crackY, 45, 12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Crack lines radiating outward
    ctx.strokeStyle = '#4a3820';
    ctx.lineWidth = 2;
    for (let i = 0; i < 10; i++) {
      const angle = (i / 10) * Math.PI * 2 + 0.2;
      const len = 25 + Math.sin(i * 2.7) * 18;
      ctx.beginPath();
      ctx.moveTo(crackX + Math.cos(angle) * 10, crackY + Math.sin(angle) * 4);
      ctx.lineTo(crackX + Math.cos(angle) * len, crackY + Math.sin(angle) * len * 0.25);
      ctx.stroke();
    }

    // Rubble chunks around crater
    ctx.fillStyle = '#7a6850';
    for (let i = 0; i < 6; i++) {
      const rx = crackX - 30 + i * 12 + Math.sin(i * 3) * 5;
      const ry = crackY - 3 - Math.sin(i * 2.1) * 3;
      ctx.beginPath();
      ctx.arc(rx, ry, 2 + Math.sin(i) * 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Opponent face-down flat in the crater
    if (rumbleLoserHidden) {
      const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
      const bodyColor = loserChar.color;
      const bodyOutline = loserChar.outline || '#333';
      const bodyAccent = loserChar.accent || '#aaa';
      const f = winFighter.facing; // they face away from Rubberman

      // Flattened body — horizontal oval (torso)
      ctx.fillStyle = bodyColor;
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(crackX, crackY - 4, 22, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Head — face-down circle at the far end
      ctx.fillStyle = bodyAccent;
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(crackX + f * 22, crackY - 5, 9, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Arms splayed out
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(crackX + f * 8, crackY - 5);
      ctx.lineTo(crackX + f * 8 + 18, crackY - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 5, crackY - 5);
      ctx.lineTo(crackX - f * 5 - 16, crackY - 12);
      ctx.stroke();
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(crackX + f * 8, crackY - 5);
      ctx.lineTo(crackX + f * 8 + 18, crackY - 14);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 5, crackY - 5);
      ctx.lineTo(crackX - f * 5 - 16, crackY - 12);
      ctx.stroke();

      // Legs trailing behind
      ctx.strokeStyle = bodyOutline;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 3);
      ctx.lineTo(crackX - f * 35, crackY - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 1);
      ctx.lineTo(crackX - f * 33, crackY + 2);
      ctx.stroke();
      ctx.strokeStyle = bodyColor;
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 3);
      ctx.lineTo(crackX - f * 35, crackY - 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(crackX - f * 15, crackY - 1);
      ctx.lineTo(crackX - f * 33, crackY + 2);
      ctx.stroke();

      // Feet
      ctx.fillStyle = bodyOutline;
      ctx.beginPath();
      ctx.arc(crackX - f * 35, crackY - 2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(crackX - f * 33, crackY + 2, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.restore();
}

function drawTorrenaRumble(loseFighter, winFighter) {
  ctx.save();

  // Draw evaporation steam particles
  for (const p of rumbleTorrenaEvapParticles) {
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = `rgba(100,200,255,${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Draw cloud (phases 2+)
  if (rumbleTorrenaPhase >= 2) {
    const cx = rumbleTorrenaCloudX;
    const cy = rumbleTorrenaCloudY;

    // Cloud alpha — fade in during formation, fade out during settle
    let cloudAlpha = 1;
    if (rumbleTorrenaPhase === 2) {
      const formT = Math.min(1, (rumbleTimer - 70) / 20);
      cloudAlpha = formT;
    } else if (rumbleTorrenaPhase >= 6) {
      const fadeT = Math.min(1, (rumbleTimer - 320) / 60);
      cloudAlpha = 1 - fadeT;
    }

    // Cloud darkens during hail formation
    const isDark = rumbleTorrenaPhase >= 4;
    const cloudColor = isDark ? '#556' : '#aaccdd';
    const cloudDark = isDark ? '#334' : '#88aabb';

    ctx.globalAlpha = cloudAlpha;

    // Main cloud body — overlapping ellipses
    ctx.fillStyle = cloudColor;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 55, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx - 30, cy + 5, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 30, cy + 5, 30, 20, 0, 0, Math.PI * 2);
    ctx.fill();
    // Top puffs
    ctx.beginPath();
    ctx.ellipse(cx - 15, cy - 12, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx + 15, cy - 12, 25, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(cx, cy - 18, 20, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker underside
    ctx.fillStyle = cloudDark;
    ctx.globalAlpha = cloudAlpha * 0.5;
    ctx.beginPath();
    ctx.ellipse(cx, cy + 10, 50, 15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Torrena's eyes on the cloud (matching normal fighter eye style)
    ctx.globalAlpha = cloudAlpha;
    const eyeY = cy - 2;
    // Dark filled circles
    ctx.fillStyle = isDark ? '#112' : '#0d4f6b';
    ctx.beginPath();
    ctx.arc(cx - 8, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 8, eyeY, 3, 0, Math.PI * 2);
    ctx.fill();
    // White highlights
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(cx - 7, eyeY - 1, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(cx + 9, eyeY - 1, 1.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
  }

  // Draw raindrops
  for (const r of rumbleRaindrops) {
    if (r.alpha <= 0) continue;
    ctx.globalAlpha = r.alpha;
    if (r.isIce) {
      // Ice shard — light blue angular
      ctx.fillStyle = '#aaddff';
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.vx * 0.5);
      ctx.fillRect(-r.size / 2, -r.size / 2, r.size, r.size * 0.6);
      ctx.restore();
    } else {
      // Rain streak
      ctx.strokeStyle = '#66bbee';
      ctx.lineWidth = r.size;
      ctx.beginPath();
      ctx.moveTo(r.x, r.y);
      ctx.lineTo(r.x - r.vx * 2, r.y - r.vy * 2);
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;

  // Draw hailstone (before or after cracking)
  if (rumbleHailstone && rumbleHailstone.size > 0) {
    const hx = rumbleHailstone.x;
    const hy = rumbleHailstone.y;
    const hs = rumbleHailstone.size;

    if (!rumbleHailCracked) {
      // Intact hailstone falling

      // Shadow on ground
      if (rumbleTorrenaPhase >= 5) {
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.ellipse(hx, loseFighter.groundY, hs * 0.8, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Main hailstone — icy sphere
      const hailGrad = ctx.createRadialGradient(hx - hs * 0.2, hy - hs * 0.3, 0, hx, hy, hs);
      hailGrad.addColorStop(0, '#ffffff');
      hailGrad.addColorStop(0.3, '#cceeff');
      hailGrad.addColorStop(0.7, '#88bbdd');
      hailGrad.addColorStop(1, '#5588aa');
      ctx.fillStyle = hailGrad;
      ctx.beginPath();
      ctx.arc(hx, hy, hs, 0, Math.PI * 2);
      ctx.fill();

      // Internal crack lines
      ctx.strokeStyle = 'rgba(200,230,255,0.6)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 4; i++) {
        const a = (i / 4) * Math.PI * 2 + 0.3;
        ctx.beginPath();
        ctx.moveTo(hx, hy);
        ctx.lineTo(hx + Math.cos(a) * hs * 0.7, hy + Math.sin(a) * hs * 0.7);
        ctx.stroke();
      }

      // Shine highlight
      ctx.fillStyle = 'rgba(255,255,255,0.5)';
      ctx.beginPath();
      ctx.arc(hx - hs * 0.25, hy - hs * 0.25, hs * 0.2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Cracked hailstone sitting on ground — broken into chunks
      const groundY = loseFighter.groundY;
      // Two large halves sitting on the ground
      ctx.fillStyle = '#88bbdd';
      ctx.strokeStyle = '#5588aa';
      ctx.lineWidth = 1.5;
      // Left half
      ctx.beginPath();
      ctx.ellipse(hx - hs * 0.4, groundY - hs * 0.3, hs * 0.5, hs * 0.4, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Right half
      ctx.beginPath();
      ctx.ellipse(hx + hs * 0.4, groundY - hs * 0.25, hs * 0.45, hs * 0.35, 0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Smaller chunks
      ctx.fillStyle = '#aaddff';
      for (let i = 0; i < 4; i++) {
        const cx = hx + (i - 1.5) * hs * 0.3;
        const cy = groundY - 2 - Math.abs(i - 1.5) * 3;
        ctx.beginPath();
        ctx.arc(cx, cy, hs * 0.15 + i * 0.5, 0, Math.PI * 2);
        ctx.fill();
      }
      // Ice shine on halves
      ctx.fillStyle = 'rgba(255,255,255,0.4)';
      ctx.beginPath();
      ctx.arc(hx - hs * 0.5, groundY - hs * 0.45, hs * 0.12, 0, Math.PI * 2);
      ctx.fill();
      // Crack line through center
      ctx.strokeStyle = '#cceeff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(hx - 2, groundY - hs * 0.6);
      ctx.lineTo(hx + 1, groundY);
      ctx.stroke();
    }
  }

  // Draw flying hail shards
  for (const s of rumbleHailShards) {
    if (s.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.fillStyle = '#aaddff';
    ctx.strokeStyle = '#5588aa';
    ctx.lineWidth = 1;
    // Angular ice shard shape
    ctx.beginPath();
    ctx.moveTo(0, -s.size);
    ctx.lineTo(s.size * 0.6, 0);
    ctx.lineTo(0, s.size * 0.4);
    ctx.lineTo(-s.size * 0.6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // Ground cracks after impact
  if (rumbleHailCracked) {
    const crackX = loseFighter.x;
    const crackY = loseFighter.groundY;
    // Use fixed seed-like values so cracks don't jitter every frame
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    const crackAngles = [0.3, 1.1, 1.9, 2.7, 3.5, 4.3, 5.1, 5.9];
    const crackLens = [25, 35, 20, 40, 30, 22, 38, 28];
    for (let i = 0; i < crackAngles.length; i++) {
      const a = crackAngles[i];
      const len = crackLens[i];
      ctx.beginPath();
      ctx.moveTo(crackX, crackY);
      // Jagged crack with one midpoint
      const mx = crackX + Math.cos(a) * len * 0.5 + Math.sin(a * 3) * 5;
      const my = crackY + Math.sin(a) * len * 0.2 + Math.cos(a * 2) * 3;
      ctx.lineTo(mx, my);
      ctx.lineTo(crackX + Math.cos(a) * len, crackY + Math.sin(a) * len * 0.3);
      ctx.stroke();
    }
  }

  // Flattened opponent (pancake) under the hailstone
  if (rumbleHailCracked && rumbleLoserHidden) {
    const lx = loseFighter.x;
    const ly = loseFighter.groundY;
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    ctx.globalAlpha = 0.8;
    // Flat oval (squished body)
    ctx.fillStyle = loserChar.color;
    ctx.strokeStyle = loserChar.outline || '#333';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(lx, ly - 2, 25, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Tiny eyes on the flat shape
    ctx.fillStyle = loserChar.outline || '#333';
    ctx.beginPath();
    ctx.arc(lx - 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(lx + 6, ly - 3, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

