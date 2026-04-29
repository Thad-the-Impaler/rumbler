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

function drawDryadSinkingFighter(fighter) {
  // Like drawSinkingFighter but tied to rumbleDryadSinkProgress
  const sinkAmount = rumbleDryadSinkProgress * 100;
  if (rumbleDryadSinkProgress >= 1) return;
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, 0, 960, fighter.groundY + 2);
  ctx.clip();
  ctx.translate(0, sinkAmount);
  fighter.draw(ctx);
  ctx.restore();
}

function drawDryadRumble(loseFighter) {
  const groundY = loseFighter.groundY;
  const cx = loseFighter.x;

  ctx.save();

  // 1) Ground cracks radiating outward (drawn flat on the ground plane)
  if (rumbleDryadCracks && rumbleDryadCracks.length > 0 && rumbleDryadPhase >= 0) {
    const crackAlpha = rumbleDryadPhase < 4
      ? 1
      : Math.max(0, 1 - (rumbleTimer - 280) / 80);
    ctx.globalAlpha = crackAlpha;
    ctx.strokeStyle = '#1a0a00';
    ctx.lineWidth = 2;
    for (const c of rumbleDryadCracks) {
      const dirX = Math.cos(c.angle);
      const dirZ = Math.sin(c.angle);
      ctx.beginPath();
      ctx.moveTo(cx, groundY + 1);
      let px = cx, py = groundY + 1;
      const segs = 4;
      for (let s = 1; s <= segs; s++) {
        const t = s / segs;
        const jit = Math.sin(c.jitterSeed + s * 1.7) * 4;
        px = cx + dirX * c.length * t + jit;
        py = groundY + 1 + dirZ * c.length * t * 0.35;
        ctx.lineTo(px, py);
      }
      ctx.stroke();
    }
    // Soil mound around the spot
    if (rumbleDryadPhase >= 1) {
      ctx.fillStyle = `rgba(60, 40, 25, ${0.6 * crackAlpha})`;
      ctx.beginPath();
      ctx.ellipse(cx, groundY + 2, 38, 6, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // 2) Vines — a cluster of sinuous tendrils erupting from the ground around the opponent
  if (rumbleDryadVines && rumbleDryadVines.length > 0) {
    for (const v of rumbleDryadVines) {
      if (v.length < 1) continue;
      // Base anchor: spread vines across a small width centered on opponent
      const baseSpread = 22;
      const baseX = cx + Math.cos(v.baseAngle) * baseSpread;
      const baseY = groundY + 1;
      // Build a curving path upward (and inward toward opponent's torso)
      const segCount = 8;
      const tipTargetX = cx + Math.cos(v.baseAngle) * 6; // converge toward center
      const tipTargetY = baseY - v.length;
      // Wrap around opponent in later phases by tightening tip toward chest
      const wrapTighten = rumbleDryadPhase >= 2 ? Math.min(1, (rumbleTimer - 90) / 90) : 0;
      const tightenedTipX = tipTargetX * (1 - wrapTighten) + cx * wrapTighten;
      // Draw vine as a stroked path with sway
      ctx.strokeStyle = '#2d6020';
      ctx.lineWidth = v.thickness;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(baseX, baseY);
      for (let s = 1; s <= segCount; s++) {
        const t = s / segCount;
        const sway = Math.sin(v.swayPhase + t * Math.PI * 2) * v.sway * (1 - t * 0.6) * (1 - wrapTighten * 0.7) * 12;
        const px = baseX + (tightenedTipX - baseX) * t + sway;
        const py = baseY + (tipTargetY - baseY) * t;
        ctx.lineTo(px, py);
      }
      ctx.stroke();
      // Lighter vine highlight
      ctx.strokeStyle = '#5fa340';
      ctx.lineWidth = Math.max(1, v.thickness - 2);
      ctx.beginPath();
      ctx.moveTo(baseX, baseY - 1);
      for (let s = 1; s <= segCount; s++) {
        const t = s / segCount;
        const sway = Math.sin(v.swayPhase + t * Math.PI * 2) * v.sway * (1 - t * 0.6) * (1 - wrapTighten * 0.7) * 12;
        const px = baseX + (tightenedTipX - baseX) * t + sway - 0.5;
        const py = baseY + (tipTargetY - baseY) * t - 0.6;
        ctx.lineTo(px, py);
      }
      ctx.stroke();
      // Leaves and thorns sprouting along vine length
      const leafCount = 3;
      for (let lf = 0; lf < leafCount; lf++) {
        const lt = 0.25 + lf * 0.25;
        const sway = Math.sin(v.swayPhase + lt * Math.PI * 2) * v.sway * (1 - lt * 0.6) * (1 - wrapTighten * 0.7) * 12;
        const lx = baseX + (tightenedTipX - baseX) * lt + sway;
        const ly = baseY + (tipTargetY - baseY) * lt;
        const seedHash = Math.sin(v.leafSeed + lf * 7.3);
        const leafSide = seedHash > 0 ? 1 : -1;
        const leafColor = (Math.sin(v.leafSeed + lf * 3.1) > 0) ? '#8fc965' : '#5fa340';
        ctx.fillStyle = leafColor;
        ctx.beginPath();
        ctx.ellipse(lx + leafSide * 5, ly, 5, 2.5, leafSide * 0.6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#2a4a1a';
        ctx.lineWidth = 0.6;
        ctx.stroke();
      }
      // Thorny ridges on the vine
      ctx.strokeStyle = '#1a3a10';
      ctx.lineWidth = 0.8;
      for (let s = 1; s <= 4; s++) {
        const t = (s / 5) * 0.85 + 0.05;
        const sway = Math.sin(v.swayPhase + t * Math.PI * 2) * v.sway * (1 - t * 0.6) * (1 - wrapTighten * 0.7) * 12;
        const px = baseX + (tightenedTipX - baseX) * t + sway;
        const py = baseY + (tipTargetY - baseY) * t;
        ctx.beginPath();
        ctx.moveTo(px - 2, py);
        ctx.lineTo(px - 4, py - 3);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(px + 2, py);
        ctx.lineTo(px + 4, py - 3);
        ctx.stroke();
      }
    }
  }

  // 3) Drifting leaves
  if (rumbleDryadLeaves && rumbleDryadLeaves.length > 0) {
    for (const lf of rumbleDryadLeaves) {
      const a = Math.min(1, lf.timer / 30);
      ctx.globalAlpha = a;
      ctx.save();
      ctx.translate(lf.x, lf.y);
      ctx.rotate(lf.rot);
      ctx.fillStyle = lf.color;
      ctx.beginPath();
      ctx.ellipse(0, 0, lf.size, lf.size * 0.55, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#2a4a1a';
      ctx.lineWidth = 0.6;
      ctx.stroke();
      ctx.restore();
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

