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

