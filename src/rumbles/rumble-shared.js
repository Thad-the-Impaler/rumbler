function drawAshPile(x, groundY) {
  const y = groundY; // feet level
  ctx.save();
  // Main ash mound
  ctx.fillStyle = '#2a2a2a';
  ctx.beginPath();
  ctx.ellipse(x, y, 25, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Darker center
  ctx.fillStyle = '#1a1a1a';
  ctx.beginPath();
  ctx.ellipse(x, y + 1, 15, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Faint ember glow
  ctx.fillStyle = 'rgba(255,80,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(x, y, 12, 4, 0, 0, Math.PI * 2);
  ctx.fill();

  // A couple of small ember particles
  for (let i = 0; i < 3; i++) {
    const ex = x - 10 + Math.sin(Date.now() * 0.002 + i * 2) * 15;
    const ey = y - 5 - Math.abs(Math.sin(Date.now() * 0.003 + i * 3)) * 12;
    const ea = 0.3 + Math.sin(Date.now() * 0.005 + i) * 0.2;
    ctx.globalAlpha = ea;
    ctx.fillStyle = '#ff4400';
    ctx.beginPath();
    ctx.arc(ex, ey, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawMeltingFighter(fighter) {
  // Wicked Witch style: the fighter sinks into the ground,
  // clipped from below as they "melt" into a puddle
  const melt = rumbleVenomMeltPct; // 0 to 1
  if (melt >= 1) return; // fully melted, nothing to draw
  const groundY = fighter.groundY;
  const bodyHeight = 80;
  // The fighter sinks: their position moves down, and we clip at ground level
  const sinkAmount = melt * bodyHeight;

  // Phase 1: Draw the fighter sinking into the ground, clipped at ground level
  ctx.save();
  // Clip at ground level — anything below ground is hidden (they're sinking into goo)
  ctx.beginPath();
  ctx.rect(0, 0, 960, groundY + 2);
  ctx.clip();
  // Shift the fighter downward to simulate sinking
  ctx.translate(0, sinkAmount);
  fighter.draw(ctx);
  ctx.restore();

  // Phase 2: Green toxic overlay on the visible portion
  ctx.save();
  const visibleTop = fighter.y - 60 + sinkAmount;
  const visibleBot = groundY;
  const visH = Math.max(0, visibleBot - visibleTop);
  if (visH > 0) {
    ctx.globalAlpha = 0.15 + melt * 0.4;
    ctx.fillStyle = '#33aa00';
    ctx.fillRect(fighter.x - 30, visibleTop, 60, visH);
  }
  ctx.restore();

  // Phase 3: Wavy melting goo at the top of the remaining body
  if (melt > 0.05 && visH > 2) {
    ctx.save();
    ctx.globalAlpha = 0.5 + melt * 0.4;
    ctx.fillStyle = '#44cc00';
    const edgeY = visibleTop;
    for (let i = 0; i < 8; i++) {
      const wx = fighter.x - 25 + i * 7;
      const waveOff = Math.sin(Date.now() * 0.005 + i * 1.3) * 3;
      const dripH = Math.max(1, 3 + melt * 8 + Math.sin(Date.now() * 0.003 + i * 2.1) * 4);
      ctx.beginPath();
      ctx.arc(wx, edgeY + waveOff, dripH * 0.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Phase 4: Falling drips
  ctx.save();
  for (const d of rumbleVenomDrips) {
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

function drawSinkingFighter(fighter) {
  // Fighter sinking into sinkhole — clip at ground level, shift down
  const sinkAmount = rumbleSinkProgress * 90;
  if (rumbleSinkProgress >= 1) return;

  ctx.save();
  // Clip at ground level
  ctx.beginPath();
  ctx.rect(0, 0, 960, fighter.groundY + 2);
  ctx.clip();
  // Shift fighter down
  ctx.translate(0, sinkAmount);
  fighter.draw(ctx);
  ctx.restore();
}

