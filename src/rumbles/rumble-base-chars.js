function drawBlazeRumble(loseFighter) {
  const lx = loseFighter.x;
  const groundY = loseFighter.groundY; // feet level
  const pillarWidth = 70;
  const pillarMaxHeight = 300;

  // Phase calculations
  const riseEnd = 30;
  const blazeEnd = 120;
  const fadeEnd = 150;

  if (rumbleTimer < fadeEnd) {
    // Calculate pillar height
    let pillarHeight, pillarAlpha;
    if (rumbleTimer < riseEnd) {
      // Rising phase
      const t = rumbleTimer / riseEnd;
      pillarHeight = pillarMaxHeight * t * t; // ease-in
      pillarAlpha = 0.7 + 0.3 * t;
    } else if (rumbleTimer < blazeEnd) {
      // Full blaze
      pillarHeight = pillarMaxHeight;
      pillarAlpha = 1.0;
    } else {
      // Fading
      const t = (rumbleTimer - blazeEnd) / (fadeEnd - blazeEnd);
      pillarHeight = pillarMaxHeight * (1 - t * t);
      pillarAlpha = 1.0 - t;
    }

    ctx.save();
    ctx.globalAlpha = pillarAlpha;

    // Fire pillar gradient
    const grad = ctx.createLinearGradient(lx, groundY, lx, groundY - pillarHeight);
    grad.addColorStop(0, '#ff4400');
    grad.addColorStop(0.3, '#ff6600');
    grad.addColorStop(0.6, '#ffaa00');
    grad.addColorStop(1, '#ffee44');

    // Main pillar body
    ctx.fillStyle = grad;
    ctx.fillRect(lx - pillarWidth / 2, groundY - pillarHeight, pillarWidth, pillarHeight);

    // Inner bright core
    const coreGrad = ctx.createLinearGradient(lx, groundY, lx, groundY - pillarHeight);
    coreGrad.addColorStop(0, 'rgba(255,255,200,0.8)');
    coreGrad.addColorStop(0.5, 'rgba(255,200,100,0.5)');
    coreGrad.addColorStop(1, 'rgba(255,255,100,0.2)');
    ctx.fillStyle = coreGrad;
    ctx.fillRect(lx - pillarWidth / 4, groundY - pillarHeight, pillarWidth / 2, pillarHeight);

    // Flickering edge flames
    const flicker = Math.sin(rumbleTimer * 0.5) * 8;
    const flicker2 = Math.cos(rumbleTimer * 0.7) * 6;
    for (let i = 0; i < 12; i++) {
      const fy = groundY - (i / 12) * pillarHeight;
      const fx = lx + (i % 2 === 0 ? -1 : 1) * (pillarWidth / 2 + Math.sin(rumbleTimer * 0.3 + i) * 12 + flicker);
      const fSize = 6 + Math.sin(rumbleTimer * 0.4 + i * 2) * 4;
      ctx.beginPath();
      ctx.arc(fx + flicker2 * 0.3, fy, fSize, 0, Math.PI * 2);
      ctx.fillStyle = i % 3 === 0 ? '#ffee44' : i % 3 === 1 ? '#ff6600' : '#ff2200';
      ctx.fill();
    }

    // Glow around pillar
    ctx.shadowColor = '#ff4400';
    ctx.shadowBlur = 40;
    ctx.fillStyle = 'rgba(255,68,0,0.15)';
    ctx.fillRect(lx - pillarWidth, groundY - pillarHeight, pillarWidth * 2, pillarHeight);
    ctx.shadowBlur = 0;

    ctx.restore();
  }

  // Draw ashes
  if (rumbleAshes) {
    drawAshPile(rumbleAshes.x, rumbleAshes.y);
  }
}

function drawArtikRumble(loseFighter) {
  // Draw ice shards
  ctx.save();
  for (const s of rumbleIceShards) {
    if (s.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = s.alpha;
    ctx.translate(s.x, s.y);
    ctx.rotate(s.rot);
    ctx.fillStyle = s.color;
    // Draw angular shard shape
    ctx.beginPath();
    ctx.moveTo(0, -s.size);
    ctx.lineTo(s.size * 0.5, -s.size * 0.2);
    ctx.lineTo(s.size * 0.3, s.size * 0.6);
    ctx.lineTo(-s.size * 0.4, s.size * 0.4);
    ctx.lineTo(-s.size * 0.6, -s.size * 0.3);
    ctx.closePath();
    ctx.fill();
    // Shiny highlight
    ctx.strokeStyle = 'rgba(255,255,255,0.6)';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-s.size * 0.1, -s.size * 0.7);
    ctx.lineTo(s.size * 0.2, -s.size * 0.1);
    ctx.stroke();
    ctx.restore();
  }
  ctx.restore();
}

function drawVenomRumble(loseFighter) {
  ctx.save();

  // Draw acid blob in flight
  if (rumbleAcidBlob) {
    const bx = rumbleAcidBlob.x;
    const by = rumbleAcidBlob.y;
    ctx.shadowColor = '#44cc00';
    ctx.shadowBlur = 15;
    ctx.fillStyle = '#44cc00';
    ctx.beginPath();
    ctx.ellipse(bx, by, 14, 11, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#88ee44';
    ctx.beginPath();
    ctx.ellipse(bx - 2, by - 2, 7, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    for (let i = 1; i <= 3; i++) {
      ctx.globalAlpha = 0.6 - i * 0.15;
      ctx.fillStyle = '#33aa00';
      ctx.beginPath();
      ctx.arc(bx - rumbleAcidBlob.vx * i * 3, by - rumbleAcidBlob.vy * i * 2 + i * 3, 4 - i, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Draw acid splashes
  for (const s of rumbleAcidSplashes) {
    if (s.alpha <= 0) continue;
    ctx.globalAlpha = s.alpha;
    ctx.fillStyle = s.color;
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Draw goo puddle (grows as fighter melts, persists after)
  if (rumbleGoo) {
    const puddleGrowth = Math.min(1, rumbleGoo.meltTimer / 80);
    const puddleSize = 25 + puddleGrowth * 25; // grows from 25 to 50
    const puddleHeight = 6 + puddleGrowth * 6;
    ctx.globalAlpha = Math.min(1, rumbleGoo.meltTimer / 20);

    // Main goo puddle
    ctx.fillStyle = '#33aa00';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x, rumbleGoo.y, puddleSize, puddleHeight, 0, 0, Math.PI * 2);
    ctx.fill();

    // Darker center
    ctx.fillStyle = '#228800';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x, rumbleGoo.y + 1, puddleSize * 0.6, puddleHeight * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bright toxic highlight
    ctx.fillStyle = 'rgba(136,238,68,0.4)';
    ctx.beginPath();
    ctx.ellipse(rumbleGoo.x - 5, rumbleGoo.y - 1, puddleSize * 0.3, puddleHeight * 0.3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Bubbling effect after fully melted
    if (rumbleLoserHidden) {
      const t = Date.now() * 0.003;
      for (let i = 0; i < 5; i++) {
        const bubX = rumbleGoo.x - 20 + Math.sin(t + i * 2.1) * 30;
        const bubY = rumbleGoo.y - 2 - Math.abs(Math.sin(t * 1.5 + i * 1.3)) * 8;
        const bSize = 2 + Math.sin(t + i) * 1.5;
        ctx.globalAlpha = 0.5 + Math.sin(t * 2 + i) * 0.3;
        ctx.strokeStyle = '#88ee44';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(bubX, bubY, bSize, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawSurgeRumble(loseFighter, winFighter) {
  ctx.save();

  // Electricity beam from Surge to opponent
  if (rumbleZapActive) {
    const sx = winFighter.x + winFighter.facing * 20;
    const sy = winFighter.y - 35;
    const ex = loseFighter.x;
    const ey = loseFighter.y - 30;
    const dx = ex - sx;
    const dy = ey - sy;

    // Draw multiple jagged lightning bolts
    for (let b = 0; b < 3; b++) {
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      const segments = 8 + Math.floor(Math.random() * 4);
      for (let i = 1; i <= segments; i++) {
        const t = i / segments;
        const jx = (Math.random() - 0.5) * 30;
        const jy = (Math.random() - 0.5) * 30;
        if (i === segments) {
          ctx.lineTo(ex, ey);
        } else {
          ctx.lineTo(sx + dx * t + jx, sy + dy * t + jy);
        }
      }
      ctx.strokeStyle = b === 0 ? '#ffffff' : b === 1 ? '#88ccff' : '#4488ff';
      ctx.lineWidth = b === 0 ? 3 : b === 1 ? 2 : 1;
      ctx.shadowColor = '#4488ff';
      ctx.shadowBlur = 15;
      ctx.stroke();
    }
    ctx.shadowBlur = 0;

    // Overcharge glow on opponent — intensifies over time
    const zapProgress = Math.min(1, (rumbleTimer - 30) / 90);
    const glowSize = 30 + zapProgress * 40;
    const glowAlpha = 0.2 + zapProgress * 0.4;

    // Pulsing electric aura around loser
    ctx.globalAlpha = glowAlpha * (0.7 + Math.sin(rumbleTimer * 0.5) * 0.3);
    const auraGrad = ctx.createRadialGradient(ex, ey, 0, ex, ey, glowSize);
    auraGrad.addColorStop(0, 'rgba(150,200,255,0.8)');
    auraGrad.addColorStop(0.5, 'rgba(80,140,255,0.3)');
    auraGrad.addColorStop(1, 'rgba(40,80,255,0)');
    ctx.fillStyle = auraGrad;
    ctx.fillRect(ex - glowSize, ey - glowSize, glowSize * 2, glowSize * 2);

    // Small sparks around loser
    ctx.globalAlpha = 0.8;
    for (let i = 0; i < 4; i++) {
      const sparkAngle = Math.random() * Math.PI * 2;
      const sparkR = 15 + Math.random() * 25;
      const sparkX = ex + Math.cos(sparkAngle) * sparkR;
      const sparkY = ey + Math.sin(sparkAngle) * sparkR;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(sparkX, sparkY, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // White flash on explosion
  if (rumbleLightBurst && rumbleLightBurst.timer < 20) {
    const flashAlpha = Math.max(0, 1 - rumbleLightBurst.timer / 20);
    ctx.globalAlpha = flashAlpha;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = 1;
  }

  // Light particles — the beautiful burst
  for (const p of rumbleLightParticles) {
    if (p.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha;

    // Glowing particle with hue
    const color = `hsl(${p.hue}, 80%, 70%)`;
    const glowColor = `hsl(${p.hue}, 90%, 85%)`;
    ctx.shadowColor = glowColor;
    ctx.shadowBlur = p.glow * p.alpha;
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.alpha, 0, Math.PI * 2);
    ctx.fill();

    // Bright white core
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(255,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size * p.alpha * 0.4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  ctx.restore();
}

function drawTitanRumble(loseFighter) {
  ctx.save();
  const groundY = loseFighter.groundY;

  // Draw sinkhole
  if (rumbleSinkhole && rumbleSinkhole.radius > 1) {
    const hx = rumbleSinkhole.x;
    const hy = rumbleSinkhole.y;
    const r = rumbleSinkhole.radius;

    // Dark hole (ellipse for perspective)
    ctx.fillStyle = '#1a1008';
    ctx.beginPath();
    ctx.ellipse(hx, hy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Inner darkness gradient
    const holeGrad = ctx.createRadialGradient(hx, hy, 0, hx, hy, r);
    holeGrad.addColorStop(0, 'rgba(0,0,0,0.9)');
    holeGrad.addColorStop(0.6, 'rgba(20,15,5,0.7)');
    holeGrad.addColorStop(1, 'rgba(80,60,30,0.0)');
    ctx.fillStyle = holeGrad;
    ctx.beginPath();
    ctx.ellipse(hx, hy, r, r * 0.35, 0, 0, Math.PI * 2);
    ctx.fill();

    // Cracked earth rim
    ctx.strokeStyle = '#6B5B3A';
    ctx.lineWidth = 2;
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const innerR = r * 0.85;
      const outerR = r + 4 + Math.sin(i * 3.7) * 6;
      const ix = hx + Math.cos(angle) * innerR;
      const iy = hy + Math.sin(angle) * innerR * 0.35;
      const ox = hx + Math.cos(angle) * outerR;
      const oy = hy + Math.sin(angle) * outerR * 0.35;
      ctx.beginPath();
      ctx.moveTo(ix, iy);
      ctx.lineTo(ox, oy);
      ctx.stroke();
    }

    // Jagged crack lines radiating outward
    ctx.strokeStyle = '#554433';
    ctx.lineWidth = 1.5;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + 0.3;
      const startR = r + 2;
      const endR = r + 10 + Math.sin(i * 5.1) * 12;
      ctx.beginPath();
      ctx.moveTo(
        hx + Math.cos(angle) * startR,
        hy + Math.sin(angle) * startR * 0.35
      );
      // Stable jagged path using deterministic offsets
      const midAngle = angle + Math.sin(i * 7.3) * 0.15;
      const midR = (startR + endR) / 2;
      ctx.lineTo(
        hx + Math.cos(midAngle) * midR + Math.sin(i * 4.7) * 5,
        hy + Math.sin(midAngle) * midR * 0.35
      );
      ctx.lineTo(
        hx + Math.cos(angle) * endR,
        hy + Math.sin(angle) * endR * 0.35
      );
      ctx.stroke();
    }

    // Dust/haze around the hole
    if (rumbleSinkProgress < 1) {
      ctx.globalAlpha = 0.2 + (1 - rumbleSinkProgress) * 0.2;
      const dustGrad = ctx.createRadialGradient(hx, hy - 10, 0, hx, hy - 10, r * 1.5);
      dustGrad.addColorStop(0, 'rgba(160,140,100,0.3)');
      dustGrad.addColorStop(1, 'rgba(160,140,100,0)');
      ctx.fillStyle = dustGrad;
      ctx.fillRect(hx - r * 2, hy - r, r * 4, r * 1.5);
      ctx.globalAlpha = 1;
    }
  }

  // Draw dirt particles
  for (const d of rumbleDirtParticles) {
    if (d.alpha <= 0) continue;
    ctx.globalAlpha = d.alpha;
    ctx.fillStyle = d.color;
    ctx.beginPath();
    // Slightly irregular dirt chunks
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  ctx.restore();
}

function drawShadeRumble(loseFighter, winFighter) {
  ctx.save();

  // Impact flashes on combo hits
  if (loseFighter.flashTimer > 0 && !rumbleShadePoof) {
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ffffff';
    const impactX = loseFighter.x + (Math.random() - 0.5) * 20;
    const impactY = loseFighter.y - 30 + (Math.random() - 0.5) * 20;
    ctx.beginPath();
    ctx.arc(impactX, impactY, 8 + Math.random() * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  // Smoke puff particles
  for (const p of rumbleSmokeParticles) {
    if (p.alpha <= 0) continue;
    ctx.save();
    ctx.globalAlpha = p.alpha;
    const gray = `rgb(${p.shade},${p.shade},${p.shade})`;
    ctx.fillStyle = gray;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
    // Lighter inner highlight
    ctx.fillStyle = `rgba(${p.shade + 40},${p.shade + 40},${p.shade + 40},0.3)`;
    ctx.beginPath();
    ctx.arc(p.x - p.size * 0.2, p.y - p.size * 0.2, p.size * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Dust particles during shoulder brush
  if (rumbleShadeBrush) {
    const brushTimer = rumbleTimer - 290;
    if (brushTimer > 20 && brushTimer < 50) {
      const f = winFighter.facing;
      const shoulderX = winFighter.x + f * 8;
      const shoulderY = winFighter.y - 46;
      ctx.globalAlpha = Math.max(0, 1 - (brushTimer - 20) / 35);
      for (let i = 0; i < 4; i++) {
        const dustAge = (brushTimer - 20 + i * 3);
        const dx = shoulderX + f * dustAge * 0.6;
        const dy = shoulderY - dustAge * 0.2 - i * 2;
        const dSize = Math.max(0.5, 2 - dustAge * 0.02);
        ctx.fillStyle = '#aaa';
        ctx.beginPath();
        ctx.arc(dx, dy, dSize, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

