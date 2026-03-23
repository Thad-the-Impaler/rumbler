Fighter.prototype.drawBag = function(ctx) {
  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const color = flash ? '#fff' : this.char.color;
  const accent = flash ? '#fff' : this.char.accent;
  const outline = flash ? '#ccc' : this.char.outline;

  ctx.save();
  ctx.translate(this.x, this.y);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 25, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Sway on hit
  const sway = (this.state === 'hitstun' || this.state === 'launched') ? Math.sin(this.stateTimer * 0.5) * 5 : 0;

  // Chain
  ctx.strokeStyle = '#888';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(sway * 0.3, -120);
  ctx.lineTo(sway * 0.1, -200);
  ctx.stroke();

  // Ceiling mount
  ctx.fillStyle = '#555';
  ctx.fillRect(-15, -205, 30, 10);

  // Bag body
  ctx.fillStyle = color;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-22 + sway, -110);
  ctx.quadraticCurveTo(-26 + sway, -60, -22 + sway * 0.8, -10);
  ctx.quadraticCurveTo(0 + sway * 0.6, 5, 22 + sway * 0.8, -10);
  ctx.quadraticCurveTo(26 + sway, -60, 22 + sway, -110);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  // Bag top cap
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.ellipse(sway, -110, 22, 8, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = outline;
  ctx.stroke();

  // Bag stripe
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(sway, -105);
  ctx.lineTo(sway * 0.7, -15);
  ctx.stroke();

  ctx.restore();

  // Hit effect
  if (this.hitEffect) {
    const he = this.hitEffect;
    const size = he.type === 'big' ? 25 : 15;
    const alpha = he.timer / 10;
    ctx.save();
    ctx.translate(he.x, he.y);
    ctx.globalAlpha = alpha;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
      const r = size * (1 - he.timer / 10) + 5;
      ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
};


Fighter.prototype.drawMannequin = function(ctx) {
  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const wood = flash ? '#fff' : '#c4a36e';
  const woodDark = flash ? '#ccc' : '#a08050';
  const joint = flash ? '#ddd' : '#8a7040';
  const f = this.facing;

  ctx.save();
  ctx.translate(this.x, this.y);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 22, 5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Legs (wooden pegs with joint gaps)
  ctx.fillStyle = wood;
  ctx.fillRect(-12, -30, 8, 28); // left leg
  ctx.fillRect(4, -30, 8, 28);   // right leg
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(-8, -30, 3, 0, Math.PI * 2); ctx.fill(); // left knee
  ctx.beginPath(); ctx.arc(8, -30, 3, 0, Math.PI * 2); ctx.fill();  // right knee

  // Torso (wooden block)
  ctx.fillStyle = wood;
  ctx.beginPath();
  ctx.roundRect(-14, -70, 28, 40, 4);
  ctx.fill();
  ctx.strokeStyle = woodDark;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Torso wood grain
  ctx.strokeStyle = woodDark;
  ctx.lineWidth = 0.5;
  ctx.globalAlpha = 0.4;
  ctx.beginPath(); ctx.moveTo(-8, -65); ctx.lineTo(-6, -35); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(2, -68); ctx.lineTo(4, -33); ctx.stroke();
  ctx.globalAlpha = 1;

  // Arms
  const attacking = this.state === 'attack';
  const punchExtend = attacking ? Math.min(1, this.attackFrame / 3) : 0;
  const shoulderY = -62;
  const armLen = 20;

  // Back arm (hangs at side)
  ctx.fillStyle = wood;
  const backShX = -f * 14;
  ctx.save();
  ctx.translate(backShX, shoulderY);
  ctx.rotate(-f * 0.2);
  ctx.fillRect(-3, 0, 6, armLen);
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();

  // Front arm (punches horizontally toward opponent)
  const frontShX = f * 14;
  ctx.fillStyle = wood;
  ctx.save();
  ctx.translate(frontShX, shoulderY);
  if (attacking) {
    // Upper arm rotates forward (toward horizontal)
    const upperAngle = f * (Math.PI / 2) * punchExtend;
    ctx.rotate(upperAngle);
    ctx.fillRect(-3, 0, 6, armLen);
    ctx.fillStyle = joint;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
    // Forearm continues straight
    ctx.translate(0, armLen);
    ctx.fillStyle = wood;
    ctx.fillRect(-3, 0, 6, 16);
    // Fist
    ctx.fillStyle = woodDark;
    ctx.beginPath(); ctx.arc(0, 18, 4, 0, Math.PI * 2); ctx.fill();
  } else {
    // Resting: arm hangs down
    ctx.rotate(f * 0.2);
    ctx.fillRect(-3, 0, 6, armLen);
    ctx.fillStyle = joint;
    ctx.beginPath(); ctx.arc(0, 0, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(0, armLen, 2.5, 0, Math.PI * 2); ctx.fill();
  }
  ctx.restore();

  // Head (wooden sphere with cross-joint)
  ctx.fillStyle = wood;
  ctx.beginPath();
  ctx.arc(0, -80, 12, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = woodDark;
  ctx.lineWidth = 1.5;
  ctx.stroke();

  // Face - simple painted eyes and mouth
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.arc(-4 * f, -82, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(4 * f, -82, 2, 0, Math.PI * 2); ctx.fill();
  // Painted smile
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.arc(0, -78, 5, 0.1, Math.PI - 0.1);
  ctx.stroke();

  // Neck joint
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(0, -68, 3, 0, Math.PI * 2); ctx.fill();

  // Stand base (wooden platform)
  ctx.fillStyle = woodDark;
  ctx.beginPath();
  ctx.roundRect(-20, -2, 40, 5, 2);
  ctx.fill();

  ctx.restore();

  // Hit effect
  if (this.hitEffect) {
    const he = this.hitEffect;
    const size = he.type === 'big' ? 25 : 15;
    const alpha = he.timer / 10;
    ctx.save();
    ctx.translate(he.x, he.y);
    ctx.globalAlpha = alpha;
    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2 + he.timer * 0.3;
      const r = size * (1 - he.timer / 10) + 5;
      ctx.strokeStyle = i % 2 === 0 ? '#fff' : '#ff0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(Math.cos(angle) * r * 0.3, Math.sin(angle) * r * 0.3);
      ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * r);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
};


