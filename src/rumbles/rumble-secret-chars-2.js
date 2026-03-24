function drawSnazzRumble(loseFighter, winFighter) {
  ctx.save();

  // Disco ball
  if (rumbleSnazzDiscoBall) {
    const bx = 480; // center of screen
    const by = rumbleSnazzDiscoBall.y;

    // String from ceiling
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bx, 0);
    ctx.lineTo(bx, by - 18);
    ctx.stroke();

    // Ball body — silver sphere
    const ballR = 18;
    const ballGrad = ctx.createRadialGradient(bx - 4, by - 5, 0, bx, by, ballR);
    ballGrad.addColorStop(0, '#ffffff');
    ballGrad.addColorStop(0.4, '#ccccdd');
    ballGrad.addColorStop(0.8, '#8888aa');
    ballGrad.addColorStop(1, '#555566');
    ctx.fillStyle = ballGrad;
    ctx.beginPath();
    ctx.arc(bx, by, ballR, 0, Math.PI * 2);
    ctx.fill();

    // Mirror tiles on the ball
    const t = Date.now() * 0.002;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2 + t;
      const row = (i % 3 - 1) * 6;
      const tx = bx + Math.cos(a) * (ballR - 4);
      const ty = by + row + Math.sin(a) * 3;
      const inBall = Math.sqrt((tx - bx) ** 2 + (ty - by) ** 2) < ballR - 2;
      if (inBall) {
        ctx.fillStyle = i % 2 === 0 ? 'rgba(255,255,255,0.7)' : 'rgba(200,200,230,0.5)';
        ctx.fillRect(tx - 2, ty - 2, 4, 4);
      }
    }

    // Light beams radiating from disco ball (during dance)
    if (rumbleTimer > 30 && rumbleTimer < 310) {
      ctx.globalAlpha = 0.08;
      const beamColors = ['#ff00ff', '#00ffff', '#ffff00', '#ff4400', '#44ff00'];
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2 + t * 1.5;
        const endX = bx + Math.cos(a) * 500;
        const endY = by + Math.sin(a) * 500;
        ctx.strokeStyle = beamColors[i % beamColors.length];
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bx, by);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  // Confetti
  for (const c of rumbleSnazzConfetti) {
    if (c.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = c.alpha;
    ctx.translate(c.x, c.y);
    ctx.rotate(c.rot);
    ctx.fillStyle = c.color;
    // Rectangular confetti piece
    ctx.fillRect(-c.size / 2, -c.size / 4, c.size, c.size / 2);
    ctx.restore();
  }

  // Knocked out opponent lying flat on the ground
  if (rumbleSnazzPunchLanded && rumbleTimer > 320) {
    // Impact stars around opponent's head
    const starsAlpha = Math.max(0, 1 - (rumbleTimer - 320) / 60);
    if (starsAlpha > 0) {
      ctx.globalAlpha = starsAlpha;
      ctx.fillStyle = '#ffff00';
      const starT = rumbleTimer * 0.06;
      for (let i = 0; i < 3; i++) {
        const sa = starT + (i / 3) * Math.PI * 2;
        const sr = 12;
        const sx = loseFighter.x + Math.cos(sa) * sr;
        const sy = loseFighter.y - 55 + Math.sin(sa) * sr * 0.5;
        // Small star shape
        ctx.beginPath();
        for (let j = 0; j < 5; j++) {
          const a2 = (j / 5) * Math.PI * 2 - Math.PI / 2;
          const r2 = j % 2 === 0 ? 4 : 2;
          if (j === 0) ctx.moveTo(sx + Math.cos(a2) * r2, sy + Math.sin(a2) * r2);
          else ctx.lineTo(sx + Math.cos(a2) * r2, sy + Math.sin(a2) * r2);
        }
        ctx.closePath();
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

function drawHaystackRumble(loseFighter, winFighter) {
  ctx.save();
  const f = winFighter.facing;

  // Draw ravens
  for (const r of rumbleHaystackRavens) {
    if (r.y < -50 || r.x < -100 || r.x > 1060) continue;
    ctx.save();
    ctx.translate(r.x, r.y);

    const wingFlap = Math.sin(r.wingPhase) * 0.6;

    // Body
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.ellipse(0, 0, 8, 5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.arc(f * 6, -3, 4, 0, Math.PI * 2);
    ctx.fill();

    // Beak
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.moveTo(f * 10, -3);
    ctx.lineTo(f * 15, -2);
    ctx.lineTo(f * 10, -1);
    ctx.closePath();
    ctx.fill();

    // Eye
    ctx.fillStyle = '#ff3300';
    ctx.beginPath();
    ctx.arc(f * 7, -4, 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Wings
    ctx.fillStyle = '#222';
    // Left wing
    ctx.save();
    ctx.rotate(-wingFlap);
    ctx.beginPath();
    ctx.moveTo(-3, -2);
    ctx.lineTo(-18, -10);
    ctx.lineTo(-10, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Right wing
    ctx.save();
    ctx.rotate(wingFlap);
    ctx.beginPath();
    ctx.moveTo(3, -2);
    ctx.lineTo(18, -10);
    ctx.lineTo(10, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();
  }

  // Scythe in Haystack's hand
  if (rumbleHaystackScythe && !rumbleHaystackStrike) {
    const sx = winFighter.x + f * 20;
    const sy = winFighter.y - 45;

    // Handle
    ctx.strokeStyle = '#553311';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(sx, sy + 30);
    ctx.lineTo(sx + f * 5, sy - 25);
    ctx.stroke();

    // Blade
    ctx.fillStyle = '#aabbcc';
    ctx.strokeStyle = '#667788';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(sx + f * 5, sy - 25);
    ctx.quadraticCurveTo(sx + f * 35, sy - 30, sx + f * 40, sy - 10);
    ctx.quadraticCurveTo(sx + f * 30, sy - 15, sx + f * 5, sy - 20);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Gleam
    if (rumbleTimer > 120 && rumbleTimer < 160) {
      const gleamT = ((rumbleTimer - 120) % 20) / 20;
      ctx.globalAlpha = 0.6 * (1 - Math.abs(gleamT - 0.5) * 2);
      ctx.fillStyle = '#ffffff';
      const gx = sx + f * (10 + gleamT * 30);
      const gy = sy - 25 + gleamT * 10;
      ctx.beginPath();
      ctx.arc(gx, gy, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Scythe slash effect during strike
  if (rumbleHaystackStrike && rumbleTimer <= 215) {
    const slashT = (rumbleTimer - 205) / 10;
    ctx.globalAlpha = Math.max(0, 1 - slashT);
    ctx.strokeStyle = '#ddeeff';
    ctx.lineWidth = 3;
    ctx.beginPath();
    const slashX = loseFighter.x;
    const slashY = loseFighter.y - 50;
    ctx.arc(slashX, slashY, 40, -Math.PI * 0.3, Math.PI * 0.8);
    ctx.stroke();
    // Inner bright slash
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(slashX, slashY, 35, -Math.PI * 0.2, Math.PI * 0.7);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Dust cloud from dissolved opponent
  for (const d of rumbleHaystackDust) {
    if (d.alpha <= 0) continue;
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = d.color;
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawCodemaxRumble(loseFighter, winFighter) {
  ctx.save();
  const f = winFighter.facing;

  // Charge-up glow on hand
  if (rumbleTimer <= 30) {
    const chargeT = rumbleTimer / 30;
    ctx.globalAlpha = chargeT * 0.6;
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 15 * chargeT;
    ctx.beginPath();
    ctx.arc(winFighter.x + f * 22, winFighter.y - 35, 6 + chargeT * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Pixelated laser beam
  if (rumbleCodemaxLaser) {
    const sx = winFighter.x + f * 25;
    const sy = winFighter.y - 35;
    const ex = loseFighter.x;
    const ey = loseFighter.y - 30;
    const dx = ex - sx;
    const dy = ey - sy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const steps = Math.floor(dist / 6);

    // Blocky pixelated beam — draw squares along the line
    for (let i = 0; i < steps; i++) {
      const t = i / steps;
      const bx = sx + dx * t;
      const by = sy + dy * t;
      const pixSize = 4 + Math.floor(Math.random() * 4);
      const brightness = Math.random() > 0.3 ? '#00ff88' : '#00cc66';
      ctx.fillStyle = brightness;
      ctx.fillRect(Math.floor(bx / pixSize) * pixSize, Math.floor(by / pixSize) * pixSize, pixSize, pixSize);
    }

    // Glow at impact point
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(ex, ey, 15, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // Laser trail particles (pixelated green squares)
  for (const p of rumbleCodemaxLaserParticles) {
    if (p.alpha <= 0) continue;
    ctx.globalAlpha = p.alpha;
    ctx.fillStyle = '#00ff88';
    ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size));
  }
  ctx.globalAlpha = 1;

  // Pixelated opponent replacement (fighter is hidden via _rumbleAlpha)
  if (rumbleCodemaxPixelLevel > 0 && !rumbleLoserHidden) {
    const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;
    const lx = loseFighter.x;
    const ly = loseFighter.y; // feet/ground position
    // Fighter body area: roughly 60 wide, 85 tall from feet up
    const bodyW = 60;
    const bodyH = 85;
    const left = lx - bodyW / 2;
    const top = ly - bodyH;

    // Pixel size based on level: 5, 10, 16, 24
    const pixSizes = [0, 5, 10, 16, 24];
    const pixSize = pixSizes[rumbleCodemaxPixelLevel];

    // Color palette from the character — weighted toward body colors
    const colors = [loserChar.color, loserChar.color, loserChar.accent, loserChar.outline, loserChar.color, loserChar.accent];

    // Build a fighter-shaped silhouette out of pixel blocks
    for (let py = top; py < top + bodyH; py += pixSize) {
      for (let px = left; px < left + bodyW; px += pixSize) {
        // Shape mask: narrower at head and feet, wider at torso
        const relY = (py - top) / bodyH; // 0=top, 1=bottom
        let halfWidth;
        if (relY < 0.22) {
          // Head region — narrow circle
          halfWidth = 10 + (relY / 0.22) * 5;
        } else if (relY < 0.7) {
          // Torso region — wider
          halfWidth = 18 + Math.sin((relY - 0.22) / 0.48 * Math.PI) * 8;
        } else {
          // Legs — narrower, split
          halfWidth = 16 - (relY - 0.7) / 0.3 * 4;
        }
        const distFromCenter = Math.abs((px + pixSize / 2) - lx);
        if (distFromCenter > halfWidth) continue;

        // Deterministic color based on grid position
        const hash = (Math.floor(px / pixSize) * 7 + Math.floor(py / pixSize) * 13 + rumbleCodemaxPixelLevel * 5) & 0xff;
        const colorIdx = hash % colors.length;
        ctx.fillStyle = colors[colorIdx];
        ctx.fillRect(px, py, pixSize - 1, pixSize - 1);
      }
    }
  }

  // Glitch effect — horizontal bars, blink, static
  if (rumbleCodemaxGlitch > 0) {
    const lx = loseFighter.x;
    const ly = loseFighter.y;
    const glitchT = rumbleCodemaxGlitch;

    if (!rumbleLoserHidden) {
      // Horizontal offset glitch bars over the pixelated body
      ctx.globalAlpha = 0.7;
      for (let i = 0; i < 6; i++) {
        const barY = ly - 85 + ((glitchT * 7 + i * 17) % 90);
        const barShift = Math.sin(glitchT * 0.3 + i * 1.7) * (8 + glitchT * 0.2);
        ctx.fillStyle = i % 3 === 0 ? '#00ff88' : i % 3 === 1 ? '#ff0044' : '#0088ff';
        ctx.fillRect(lx - 30 + barShift, barY, 60, 3);
      }

      // Blinking — black flashes
      if (glitchT > 15 && Math.floor(glitchT / 3) % 3 === 0) {
        ctx.globalAlpha = 0.5;
        ctx.fillStyle = '#000';
        ctx.fillRect(lx - 35, ly - 90, 70, 95);
      }

      // Static noise
      if (glitchT > 25) {
        ctx.globalAlpha = 0.5;
        for (let i = 0; i < 20; i++) {
          const nx = lx - 30 + Math.random() * 60;
          const ny = ly - 85 + Math.random() * 90;
          ctx.fillStyle = ['#00ff88', '#ffffff', '#ff0044', '#0088ff'][Math.floor(Math.random() * 4)];
          const ns = 2 + Math.random() * 5;
          ctx.fillRect(nx, ny, ns, ns);
        }
      }
    }

    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

