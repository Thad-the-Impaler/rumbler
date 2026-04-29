Fighter.prototype.drawWeedthorn = function(a) {
  const phase = a.eruptPhase;
  const fadeIn = Math.min(1, phase / 8);
  const fadeOut = a.timer < 10 ? a.timer / 10 : 1;
  const alpha = fadeIn * fadeOut;
  const thornHeight = Math.min(80, phase * 8);

  ctx.save();
  ctx.translate(a.x, a.y);
  ctx.globalAlpha = alpha;

  // Ground crack
  ctx.strokeStyle = '#2d8a4e';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(-15, 0);
  ctx.lineTo(15, 0);
  ctx.stroke();

  // Main thorn spike
  ctx.fillStyle = '#2d8a4e';
  ctx.beginPath();
  ctx.moveTo(-8, 0);
  ctx.lineTo(0, -thornHeight);
  ctx.lineTo(8, 0);
  ctx.closePath();
  ctx.fill();

  // Thorn tip highlight
  ctx.fillStyle = '#5ee87a';
  ctx.beginPath();
  ctx.moveTo(-4, -thornHeight * 0.3);
  ctx.lineTo(0, -thornHeight);
  ctx.lineTo(4, -thornHeight * 0.3);
  ctx.closePath();
  ctx.fill();

  // Side thorns
  if (thornHeight > 30) {
    ctx.fillStyle = '#2d8a4e';
    // Left barb
    ctx.beginPath();
    ctx.moveTo(-3, -thornHeight * 0.4);
    ctx.lineTo(-18, -thornHeight * 0.55);
    ctx.lineTo(-2, -thornHeight * 0.5);
    ctx.closePath();
    ctx.fill();
    // Right barb
    ctx.beginPath();
    ctx.moveTo(3, -thornHeight * 0.6);
    ctx.lineTo(18, -thornHeight * 0.75);
    ctx.lineTo(2, -thornHeight * 0.7);
    ctx.closePath();
    ctx.fill();
  }

  // Ground debris particles
  if (phase < 20) {
    ctx.fillStyle = '#5a3a1a';
    for (let i = 0; i < 4; i++) {
      const dx = (i - 1.5) * 12 + Math.sin(phase * 0.5 + i) * 5;
      const dy = -Math.abs(Math.sin(phase * 0.3 + i * 1.5)) * 20;
      ctx.fillRect(dx - 2, dy - 2, 4, 4);
    }
  }

  ctx.restore();
};


Fighter.prototype.drawAssistProjectile = function(a) {
  if (a.isWeedthorn) {
    this.drawWeedthorn(a);
  } else if (a.isAphid) {
    ctx.translate(a.x, a.y);
    ctx.fillStyle = '#555';
    ctx.beginPath();
    ctx.ellipse(0, 0, 6, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    const wingFlap = Math.sin(Date.now() * 0.05) * 0.5;
    ctx.fillStyle = 'rgba(200,200,200,0.6)';
    ctx.beginPath();
    ctx.ellipse(-5, -3, 5, 3, wingFlap, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(5, -3, 5, 3, -wingFlap, 0, Math.PI * 2);
    ctx.fill();
  } else if (a.isSerpent) {
    ctx.translate(a.x, a.y);
    ctx.strokeStyle = '#336633';
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    for (let s = 1; s <= 5; s++) {
      const sx = -a.vx * s * 2.5 + Math.sin(Date.now() * 0.01 + s) * 4;
      const sy = -a.vy * s * 2.5 + Math.cos(Date.now() * 0.01 + s) * 4;
      ctx.lineTo(sx, sy);
    }
    ctx.stroke();
    ctx.fillStyle = '#44aa44';
    ctx.beginPath();
    ctx.arc(0, 0, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ff0';
    ctx.beginPath();
    ctx.arc(a.vx > 0 ? 3 : -3, -2, 1.5, 0, Math.PI * 2);
    ctx.fill();
  } else {
    ctx.translate(a.x, a.y);
    const aColor = this.assist.color;
    const pulse = Math.sin(Date.now() * 0.02) * 3;
    ctx.shadowColor = aColor;
    ctx.shadowBlur = 15;
    ctx.fillStyle = aColor;
    ctx.beginPath();
    ctx.arc(0, 0, 12 + pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = this.assist.accent;
    ctx.beginPath();
    ctx.arc(0, 0, 6 + pulse * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
  }
};

  // Check if a point hits this fighter or any of its Duplaire clones

Fighter.prototype.drawDryadWall = function(ctx, w) {
  const groundY = this.groundY;
  const growFrac = w.growT / w.maxGrowT;
  const currentH = w.maxH * growFrac;
  if (currentH < 0.5) return;
  const hpFrac = Math.max(0, w.health / w.maxHealth);
  const wallLeft = w.x - w.w / 2;
  const topY = groundY - currentH;

  ctx.save();

  // Damage shake
  if (w.flashTimer > 0) {
    const sh = (w.flashTimer / 8) * 2;
    ctx.translate((Math.random() - 0.5) * sh, (Math.random() - 0.5) * sh);
  }

  // Soil mound at base when sprouting (only during early growth)
  if (growFrac < 0.5) {
    const moundAlpha = 1 - growFrac * 2;
    ctx.fillStyle = `rgba(60, 40, 25, ${moundAlpha})`;
    ctx.beginPath();
    ctx.ellipse(w.x, groundY, w.w / 2 + 4, 5, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Bark trunk (back layer)
  const barkColor = '#5a3a1a';
  const barkLight = '#7a5028';
  ctx.fillStyle = barkColor;
  ctx.fillRect(wallLeft + 6, topY, w.w - 12, currentH);
  // Vertical bark grain
  ctx.strokeStyle = barkLight;
  ctx.lineWidth = 2;
  for (let i = 0; i < 4; i++) {
    const gx = wallLeft + 10 + i * (w.w - 20) / 3;
    ctx.beginPath();
    ctx.moveTo(gx, topY + 4);
    ctx.lineTo(gx, groundY - 4);
    ctx.stroke();
  }
  // Bark outline
  ctx.strokeStyle = '#2a1a08';
  ctx.lineWidth = 1.5;
  ctx.strokeRect(wallLeft + 6, topY, w.w - 12, currentH);

  // Vines spilling down the front (deterministic from wall x for stable look)
  const seed = Math.floor(w.x);
  const rnd = (n) => {
    const x = Math.sin(seed + n * 13.37) * 10000;
    return x - Math.floor(x);
  };
  const vineCount = 5;
  ctx.strokeStyle = '#2d6020';
  ctx.lineWidth = 2;
  for (let v = 0; v < vineCount; v++) {
    const vx = wallLeft + 4 + (v + 0.5) * (w.w - 8) / vineCount;
    const vLen = currentH * (0.6 + rnd(v) * 0.35);
    ctx.beginPath();
    ctx.moveTo(vx, topY);
    const sway = 4 + rnd(v + 5) * 4;
    const phase = rnd(v + 10) * Math.PI * 2;
    const segs = 6;
    for (let s = 1; s <= segs; s++) {
      const t = s / segs;
      const px = vx + Math.sin(phase + t * Math.PI * 2) * sway * t;
      const py = topY + vLen * t;
      ctx.lineTo(px, py);
    }
    ctx.stroke();
  }

  // Leaves clustered along the wall
  const leafCount = Math.floor(10 * growFrac);
  for (let l = 0; l < leafCount; l++) {
    const lt = rnd(l + 20);
    const ly = topY + lt * currentH;
    const lx = wallLeft + 4 + rnd(l + 30) * (w.w - 8);
    const lr = 5 + rnd(l + 40) * 3;
    const leafTone = rnd(l + 50) > 0.5 ? '#8fc965' : '#5fa340';
    ctx.fillStyle = leafTone;
    ctx.beginPath();
    ctx.ellipse(lx, ly, lr, lr * 0.6, rnd(l + 60) * Math.PI, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#2a4a1a';
    ctx.lineWidth = 0.8;
    ctx.stroke();
  }

  // Flowers (only after substantial growth and when healthy)
  if (growFrac > 0.7 && hpFrac > 0.4) {
    const flowerCount = 3;
    for (let f = 0; f < flowerCount; f++) {
      const fx = wallLeft + 8 + rnd(f + 70) * (w.w - 16);
      const fy = topY + 6 + rnd(f + 80) * (currentH - 12);
      const fcolors = ['#ff6fa3', '#ffd55a', '#ffffff', '#c878ff'];
      const fc = fcolors[Math.floor(rnd(f + 90) * fcolors.length) % fcolors.length];
      // Petals
      ctx.fillStyle = fc;
      for (let p = 0; p < 5; p++) {
        const a = (p / 5) * Math.PI * 2;
        ctx.beginPath();
        ctx.ellipse(fx + Math.cos(a) * 2.5, fy + Math.sin(a) * 2.5, 2.2, 1.4, a, 0, Math.PI * 2);
        ctx.fill();
      }
      // Center
      ctx.fillStyle = '#ffd54a';
      ctx.beginPath();
      ctx.arc(fx, fy, 1.6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Damage cracks / missing chunks based on hpFrac
  if (hpFrac < 0.99) {
    const dmgFrac = 1 - hpFrac;
    // Crack lines (more cracks as damage increases)
    ctx.strokeStyle = '#1a0a00';
    ctx.lineWidth = 1.5;
    const crackCount = Math.floor(dmgFrac * 6);
    for (let c = 0; c < crackCount; c++) {
      const cx = wallLeft + 4 + rnd(c + 100) * (w.w - 8);
      const cyTop = topY + rnd(c + 110) * currentH;
      ctx.beginPath();
      ctx.moveTo(cx, cyTop);
      let pcx = cx, pcy = cyTop;
      for (let s = 0; s < 4; s++) {
        pcx += (rnd(c + 120 + s) - 0.5) * 8;
        pcy += 5 + rnd(c + 130 + s) * 4;
        ctx.lineTo(pcx, pcy);
      }
      ctx.stroke();
    }
    // Missing chunks (dark holes) when heavily damaged
    if (dmgFrac > 0.4) {
      const chunkCount = Math.floor((dmgFrac - 0.4) * 8);
      for (let ch = 0; ch < chunkCount; ch++) {
        const chx = wallLeft + 6 + rnd(ch + 200) * (w.w - 12);
        const chy = topY + 8 + rnd(ch + 210) * (currentH - 16);
        const chr = 3 + rnd(ch + 220) * 4;
        ctx.fillStyle = '#0a0500';
        ctx.beginPath();
        ctx.arc(chx, chy, chr, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    // Falling petals/leaves when damaged (subtle)
    if (dmgFrac > 0.3) {
      const fallCount = Math.floor(dmgFrac * 3);
      const tFall = (Date.now() * 0.002) % 1;
      for (let p = 0; p < fallCount; p++) {
        const px = wallLeft + 4 + rnd(p + 300) * (w.w - 8);
        const py = topY + ((rnd(p + 310) + tFall) % 1) * currentH;
        ctx.fillStyle = `rgba(143, 201, 101, 0.6)`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  // Damage flash (white pulse on hit)
  if (w.flashTimer > 0) {
    ctx.globalAlpha = (w.flashTimer / 8) * 0.5;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(wallLeft + 6, topY, w.w - 12, currentH);
    ctx.globalAlpha = 1;
  }

  ctx.restore();
};

Fighter.prototype.drawHaystackProjectiles = function(ctx) {
  // Hay particles
  for (const hp of this.hayParticles) {
    ctx.save();
    ctx.globalAlpha = hp.timer / 50;
    ctx.fillStyle = '#e8d491';
    ctx.translate(hp.x, hp.y);
    ctx.rotate(hp.vx * 0.3);
    ctx.fillRect(-4, -1, 8, 2);
    ctx.restore();
  }
  // Arrow and sword projectiles
  for (const p of this.haystackProjectiles) {
    ctx.save();
    ctx.translate(p.x, p.y);
    const angle = Math.atan2(p.vy, p.vx);
    ctx.rotate(angle);
    if (p.type === 'sword') {
      // Sword blade
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(14, 0);
      ctx.stroke();
      // Handle
      ctx.strokeStyle = '#553300';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(-14, 0);
      ctx.lineTo(-18, 0);
      ctx.stroke();
      // Guard
      ctx.strokeStyle = '#aa8800';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-14, -4);
      ctx.lineTo(-14, 4);
      ctx.stroke();
    } else {
      // Arrow shaft
      ctx.strokeStyle = '#886644';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(10, 0);
      ctx.stroke();
      // Arrowhead
      ctx.fillStyle = '#aaaaaa';
      ctx.beginPath();
      ctx.moveTo(10, 0);
      ctx.lineTo(7, -3);
      ctx.lineTo(7, 3);
      ctx.closePath();
      ctx.fill();
      // Fletching
      ctx.fillStyle = '#cc4444';
      ctx.beginPath();
      ctx.moveTo(-10, 0);
      ctx.lineTo(-8, -3);
      ctx.lineTo(-6, 0);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();
  }
};

