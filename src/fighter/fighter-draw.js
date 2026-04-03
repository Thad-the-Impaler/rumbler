Fighter.prototype.draw = function(ctx) {
  // Draw as punching bag or mannequin in practice mode (drone draws as normal fighter)
  if (gameMode === 'practice' && !this.isPlayer && !this.char.isDrone) {
    if (this.char.isMannequin) {
      this.drawMannequin(ctx);
      return;
    }
    this.drawBag(ctx);
    return;
  }

  // Draw as printer in campaign bonus (or printer boss with body)
  if (this.char.isPrinter && !this.char.isPrinterBoss) {
    // Growth animation: scale up during phase 4
    if (printerBossPhase === 4) {
      const growT = 1 - printerBossTimer / 60;
      const bodyScale = growT * 1.3;
      // Draw a growing body beneath the printer
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.globalAlpha = growT;
      ctx.fillStyle = '#999';
      ctx.strokeStyle = '#666';
      ctx.lineWidth = 2;
      // Body growing
      ctx.beginPath();
      ctx.roundRect(-16 * bodyScale, -10 - 40 * bodyScale, 32 * bodyScale, 40 * bodyScale, 6);
      ctx.fill(); ctx.stroke();
      // Legs growing
      ctx.strokeStyle = '#999';
      ctx.lineWidth = 6 * bodyScale;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-6 * bodyScale, -10); ctx.lineTo(-10 * bodyScale, 0); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6 * bodyScale, -10); ctx.lineTo(10 * bodyScale, 0); ctx.stroke();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
    this.drawPrinter(ctx);
    return;
  }
  // Printer Boss (with body) — draw as normal fighter but with printer head
  if (this.char.isPrinterBoss) {
    // Let the normal fighter draw handle the body — we'll override the head
    // Set a flag so the head draw section uses the printer instead
    this._drawPrinterHead = true;
  }

  // Draw as giant head
  if (this.char.isHead) {
    this.drawHead(ctx);
    return;
  }

  // Hangman: draw flying pieces when disassembled, hide body
  if (this.char.isHangman && this.hangmanDisassembled) {
    this.drawHangmanPieces(ctx);
    return; // don't draw normal body
  }

  // Buck: draw fireworks and explosions (world space)
  if (this.char.isBuck) {
    ctx.save();
    // Firework projectiles with trails
    for (const fw of this.buckFireworks) {
      // Trail
      for (const t of fw.trail) {
        ctx.globalAlpha = t.timer / 8 * 0.5;
        ctx.fillStyle = fw.color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Firework head
      ctx.globalAlpha = 1;
      ctx.fillStyle = fw.color;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
      ctx.fill();
      // Bright core
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    // Explosion particles
    for (const e of this.buckExplosions) {
      if (e.text) {
        ctx.globalAlpha = Math.min(1, e.timer / 15);
        const scale = 1 + (1 - e.timer / 30) * 0.5;
        ctx.save();
        ctx.translate(e.x, e.y);
        ctx.scale(scale, scale);
        ctx.font = 'bold 14px Arial';
        ctx.textAlign = 'center';
        ctx.strokeStyle = '#000';
        ctx.lineWidth = 3;
        ctx.strokeText(e.text, 0, 0);
        ctx.fillStyle = e.color;
        ctx.fillText(e.text, 0, 0);
        ctx.restore();
      } else {
        ctx.globalAlpha = e.timer / 20;
        ctx.fillStyle = e.color;
        ctx.beginPath();
        ctx.arc(e.x, e.y, 3 + (1 - e.timer / 20) * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // X-haust: draw oil puddles and flames
  if (this.char.isXhaust) {
    ctx.save();
    // Oil puddles
    for (const p of this.xhaustOilPuddles) {
      ctx.fillStyle = 'rgba(30, 20, 10, 0.7)';
      ctx.beginPath();
      ctx.ellipse(p.x, p.y, p.width / 2, 4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Sheen
      ctx.fillStyle = 'rgba(80, 60, 40, 0.4)';
      ctx.beginPath();
      ctx.ellipse(p.x - p.width * 0.15, p.y - 1, p.width * 0.2, 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    // Flames
    for (const f of this.xhaustFlames) {
      const intensity = f.timer / 90;
      const hw = f.width / 2 + 10;
      // Fire glow on ground
      ctx.fillStyle = `rgba(255, 100, 0, ${intensity * 0.3})`;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y, hw + 5, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      // Flame tongues
      const t = Date.now() * 0.01;
      for (let fi = 0; fi < 8; fi++) {
        const fx = f.x - hw + (fi / 7) * hw * 2;
        const fh = (15 + Math.sin(t + fi * 2.3) * 8) * intensity;
        const fw = 6 + Math.sin(t * 1.3 + fi) * 2;
        ctx.fillStyle = fi % 2 === 0 ? `rgba(255, 140, 0, ${intensity * 0.8})` : `rgba(255, 60, 0, ${intensity * 0.9})`;
        ctx.beginPath();
        ctx.moveTo(fx - fw, f.y);
        ctx.quadraticCurveTo(fx - fw * 0.3, f.y - fh * 0.6, fx, f.y - fh);
        ctx.quadraticCurveTo(fx + fw * 0.3, f.y - fh * 0.6, fx + fw, f.y);
        ctx.closePath();
        ctx.fill();
      }
      // Bright core
      ctx.fillStyle = `rgba(255, 220, 100, ${intensity * 0.5})`;
      ctx.beginPath();
      ctx.ellipse(f.x, f.y - 2, hw * 0.6, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Vortice: draw tornado particles
  if (this.char.isVortice && this.vorticeTornadoParticles.length > 0) {
    ctx.save();
    for (const p of this.vorticeTornadoParticles) {
      ctx.globalAlpha = (p.timer / 50) * 0.6;
      ctx.fillStyle = p.pushing
        ? (p.timer % 4 < 2 ? '#ee8866' : '#ffbb99')
        : (p.timer % 4 < 2 ? '#88eebb' : '#bbffdd');
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    }
    // Draw tornado funnel outline when active
    if (this.vorticeTornado || this.vorticePushing) {
      const isPush = this.vorticePushing;
      ctx.globalAlpha = 0.15;
      ctx.fillStyle = isPush ? '#ee8866' : '#88eebb';
      ctx.beginPath();
      if (isPush) {
        // Inverted funnel — narrow at center, wide at edges
        ctx.moveTo(this.x - 10, this.y - 85);
        ctx.lineTo(this.x + 10, this.y - 85);
        ctx.lineTo(this.x + 60, this.y - 5);
        ctx.lineTo(this.x - 60, this.y - 5);
      } else {
        // Normal funnel — wide at top, narrow at bottom
        ctx.moveTo(this.x - 15, this.y - 85);
        ctx.lineTo(this.x + 15, this.y - 85);
        ctx.lineTo(this.x + 50, this.y - 5);
        ctx.lineTo(this.x - 50, this.y - 5);
      }
      ctx.closePath();
      ctx.fill();
      // Swirling lines
      ctx.globalAlpha = 0.3;
      ctx.strokeStyle = isPush ? '#ee8866' : '#88eebb';
      ctx.lineWidth = 1.5;
      const t = Date.now() * 0.005;
      for (let row = 0; row < 4; row++) {
        const rowY = this.y - 15 - row * 18;
        const rowW = isPush ? 50 - row * 10 : 15 + (3 - row) * 12;
        ctx.beginPath();
        ctx.arc(this.x + Math.sin(t + row * 1.5) * 5, rowY, rowW, 0, Math.PI, isPush ? false : true);
        ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Exor: draw soul particles (world space wisps flowing from target to self)
  if (this.char.isExor && this.exorSoulParticles.length > 0) {
    ctx.save();
    for (const p of this.exorSoulParticles) {
      const t = p.t;
      // Bezier interpolation with a curve
      const midX = (p.x + p.tx) / 2 + (Math.random() - 0.5) * 10;
      const midY = (p.y + p.ty) / 2 - 30;
      const cx = (1 - t) * (1 - t) * p.x + 2 * (1 - t) * t * midX + t * t * p.tx;
      const cy = (1 - t) * (1 - t) * p.y + 2 * (1 - t) * t * midY + t * t * p.ty;
      ctx.globalAlpha = (1 - t) * 0.8;
      ctx.fillStyle = '#39ff14';
      ctx.beginPath();
      ctx.arc(cx, cy, 3 + (1 - t) * 2, 0, Math.PI * 2);
      ctx.fill();
      // Inner glow
      ctx.fillStyle = '#aaffaa';
      ctx.globalAlpha = (1 - t) * 0.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Killa Watt: draw lightning bolts to target
  if (this.char.isKillawatt && this.kwZapEffect) {
    ctx.save();
    for (const bolt of this.kwZapEffect.bolts) {
      ctx.beginPath();
      ctx.moveTo(bolt[0].x, bolt[0].y);
      for (let i = 1; i < bolt.length; i++) {
        ctx.lineTo(bolt[i].x, bolt[i].y);
      }
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.9;
      ctx.stroke();
      ctx.strokeStyle = '#00e5ff';
      ctx.lineWidth = 1.5;
      ctx.stroke();
    }
    ctx.restore();
  }

  // Matador: draw rose particles (world space)
  if (this.char.isMatador && this.matadorRoses.length > 0) {
    for (const r of this.matadorRoses) {
      ctx.save();
      ctx.translate(r.x, r.y);
      ctx.rotate(r.rot);
      const alpha = r.landed ? Math.min(1, r.timer / 20) : 1;
      ctx.globalAlpha = alpha;
      // Stem
      ctx.strokeStyle = '#2a6a2a';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, 10);
      ctx.stroke();
      // Petals
      ctx.fillStyle = '#cc0033';
      ctx.beginPath();
      ctx.arc(-2, -2, 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ff1144';
      ctx.beginPath();
      ctx.arc(1, -3, 3.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#aa0022';
      ctx.beginPath();
      ctx.arc(0, 0, 3, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Bozollok: draw decomposing husk
  if (this.char.isBozollok && this.moltHusk) {
    ctx.save();
    ctx.translate(this.moltHusk.x, this.moltHusk.y);
    const huskAlpha = this.moltHusk.timer / 90;
    ctx.globalAlpha = huskAlpha * 0.6;
    const h = this.height;
    // Crumbling shell shape
    ctx.fillStyle = '#5a4a2a';
    ctx.beginPath();
    ctx.moveTo(-14, 0);
    ctx.lineTo(-12, -h + 15);
    ctx.quadraticCurveTo(0, -h + 5, 12, -h + 15);
    ctx.lineTo(14, 0);
    ctx.closePath();
    ctx.fill();
    // Crack lines
    ctx.strokeStyle = '#3a2a0a';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-2, -h + 15);
    ctx.lineTo(-5, -h * 0.5);
    ctx.lineTo(3, -h * 0.3);
    ctx.lineTo(-1, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(6, -h + 18);
    ctx.lineTo(8, -h * 0.6);
    ctx.lineTo(4, -h * 0.2);
    ctx.stroke();
    // Decomposition particles
    if (this.moltHusk.timer < 60) {
      const particleCount = Math.floor((60 - this.moltHusk.timer) / 10);
      for (let p = 0; p < particleCount; p++) {
        const px = (Math.sin(this.moltHusk.timer * 0.1 + p * 3) * 15);
        const py = -h * 0.5 + Math.cos(this.moltHusk.timer * 0.08 + p * 2) * 20 - (60 - this.moltHusk.timer) * 0.3;
        ctx.globalAlpha = huskAlpha * 0.4;
        ctx.fillStyle = '#8a7a4a';
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // Golgar: draw dormant entity as stone statue
  if (this.char.isGolgar && !(rumbleActive && rumbleType === 'GOLGAR')) {
    ctx.save();
    ctx.translate(this.golgarOtherX, this.golgarOtherY);
    ctx.globalAlpha = 0.6;
    const df = this.golgarOtherFacing;
    const stoneColor = '#777788';
    const stoneDark = '#555566';
    const stoneLight = '#999aaa';
    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.2)';
    ctx.beginPath();
    ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    // Legs
    ctx.strokeStyle = stoneDark;
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
    ctx.strokeStyle = stoneColor;
    ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
    // Feet
    ctx.fillStyle = stoneDark;
    ctx.beginPath(); ctx.arc(-df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
    // Body
    ctx.fillStyle = stoneColor;
    ctx.strokeStyle = stoneDark;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.roundRect(-16, -48, 32, 40, 6); ctx.fill(); ctx.stroke();
    // Chest
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.roundRect(-10, -40, 20, 20, 3); ctx.fill();
    // Arms (at rest)
    const armY = -36;
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    // Fists
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
    // Head
    ctx.fillStyle = stoneLight;
    ctx.strokeStyle = stoneDark;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(0, -64, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    // Closed eyes (dormant)
    ctx.strokeStyle = stoneDark;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(-7, -65); ctx.lineTo(-1, -65); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(2, -65); ctx.lineTo(8, -65); ctx.stroke();
    ctx.restore();
  }

  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const frozen = this.frozenTimer > 0;
  const inWater = this.waterPhase;
  const inFire = this.quellicFirePhase;
  const color = flash ? '#fff' : frozen ? '#88ccff' : inWater ? '#44bbee' : inFire ? '#ff6600' : this.char.color;
  const accent = flash ? '#fff' : frozen ? '#bbddff' : inWater ? '#88eeff' : inFire ? '#ffaa00' : this.char.accent;
  const outline = flash ? '#ccc' : frozen ? '#4488aa' : inWater ? '#2299bb' : inFire ? '#cc3300' : this.char.outline;

  ctx.save();
  // Duplaire clone alpha
  if (this._isCloneDraw) {
    ctx.globalAlpha = this._cloneAlpha;
  }
  if (this.phaseTimer > 0) ctx.globalAlpha = 0.4;
  if (this.waterPhase) ctx.globalAlpha = 0.35;
  if (inFire) ctx.globalAlpha = 0.55 + Math.sin(Date.now() * 0.02) * 0.15;
  // Rumble alpha override (used by Torrena evaporation/reappear)
  if (this._rumbleAlpha !== undefined) {
    ctx.globalAlpha = Math.min(ctx.globalAlpha, this._rumbleAlpha);
    if (this._rumbleAlpha <= 0) { ctx.restore(); return; }
  }
  // Rumble scale override (used by Corvida drop)
  if (this._rumbleScale !== undefined && this._rumbleScale !== 1) {
    ctx.translate(this.x, this.y);
    ctx.scale(this._rumbleScale, this._rumbleScale);
    ctx.translate(-this.x, -this.y);
  }
  // Codemax: holographic flicker
  if (this.char.isCodemax) {
    ctx.globalAlpha = 0.75 + Math.sin(Date.now() * 0.02) * 0.1;
  }
  // Haystack: hide body while exploding, show reforming shimmer
  if (this.char.isHaystack && this.exploding) {
    // Draw reform shimmer at character position
    ctx.save();
    ctx.translate(this.x, this.y);
    if (this.reformTimer < 30) {
      ctx.globalAlpha = (30 - this.reformTimer) / 30 * 0.5;
      ctx.fillStyle = '#c4a35a';
      ctx.beginPath();
      ctx.ellipse(0, -25, 16, 25, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
    // Draw projectiles and hay particles (outside body)
    this.drawHaystackProjectiles(ctx);
    ctx.restore();
    return;
  }
  const kwVibX = this.kwStunTimer > 0 ? (Math.random() - 0.5) * 6 : 0;
  const kwVibY = this.kwStunTimer > 0 ? (Math.random() - 0.5) * 4 : 0;
  // Birdeater: draw legs BEFORE body translate (in world space at ground level)
  if (this.char.isBirdeater) {
    this.drawBirdeaterLegs(ctx);
  }
  const birdeaterOffset = this.char.isManeater ? -95 : (this.char.isBirdeater ? -75 : 0);
  ctx.translate(this.x + kwVibX, this.y + kwVibY + birdeaterOffset);
  if (this._rumbleRotation) ctx.rotate(this._rumbleRotation);
  if (this.char.isBojdo) ctx.scale(this.bojdoScale, this.bojdoScale);
  if (this.char.isBorgus) ctx.scale(1.3, 1.3);
  if (this.char.isPrinterBoss) ctx.scale(1.3, 1.3);
  if (this.char.isTubeWarden) ctx.scale(1.2, 1.2);
  if (this.char.isManeater) ctx.scale(1.5, 1.5);
  // Dark Bojdo proximity shrink effect on player
  if (this._darkBojdoScale && this._darkBojdoScale !== 1.0) ctx.scale(this._darkBojdoScale, this._darkBojdoScale);
  if (this.isJay) ctx.scale(this.jayScale, this.jayScale);
  if (this.bojShrinkTimer > 0 && !this.char.isBojdo) ctx.scale(0.3, 0.3);

  const f = this.facing;
  const crouch = this.crouching ? 15 : 0;
  const bob = Math.sin(this.animTimer * 0.3 + this.animFrame) * 2;

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
  ctx.fill();

  // Codemax: holographic base glow
  if (this.char.isCodemax) {
    ctx.save();
    ctx.globalAlpha = 0.2 + Math.sin(Date.now() * 0.005) * 0.1;
    ctx.fillStyle = '#00ff88';
    ctx.beginPath();
    ctx.ellipse(0, 1, 25, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Snazz McJazz: neon dance floor glow under feet
  if (this.char.isSnazz) {
    const t = Date.now() * 0.003;
    const neonColors = ['#ff00ff', '#00ffff', '#ff4400', '#44ff00', '#ffff00'];
    const ci = Math.floor(t * 2) % neonColors.length;
    const glowAlpha = this.dancing ? 0.5 + Math.sin(t * 4) * 0.2 : 0.15 + Math.sin(t) * 0.05;
    ctx.save();
    ctx.globalAlpha = glowAlpha;
    // Dance floor tiles (third panel only shows while dancing)
    for (let dx = -1; dx <= 1; dx++) {
      if (dx === -1 && !this.dancing) continue;
      const tileColor = neonColors[(ci + dx + neonColors.length) % neonColors.length];
      ctx.fillStyle = tileColor;
      ctx.fillRect(-20 + dx * 20, -2, 18, 6);
    }
    // Upward glow onto character (wider when dancing to cover all 3 tiles)
    const glowLeft = this.dancing ? -40 : -20;
    const glowWidth = this.dancing ? 60 : 40;
    const grad = ctx.createLinearGradient(0, 0, 0, -70);
    grad.addColorStop(0, neonColors[ci]);
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.globalAlpha = this.dancing ? 0.3 : 0.1;
    ctx.fillRect(glowLeft, -70, glowWidth, 70);
    ctx.restore();
  }

  // Corvida: draw blue jay form instead of normal body
  if (this.isJay) {
    const isCyanoJay = this.cyanoJayTimer > 0;
    const jayMain = isCyanoJay ? this.char.accent : '#4a90d9';
    const jayDark = isCyanoJay ? this.char.outline : '#2a5fa8';
    const jayWing = isCyanoJay ? this.char.color : '#3a7bc8';
    const wingFlap = Math.sin(Date.now() * 0.015) * 0.6;
    ctx.save();
    ctx.translate(0, -25);
    // Body (oval)
    ctx.fillStyle = jayMain;
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // White chest
    ctx.fillStyle = '#ddeeff';
    ctx.beginPath();
    ctx.ellipse(0, 3, 8, 6, 0, 0, Math.PI);
    ctx.fill();
    // Head
    ctx.fillStyle = jayMain;
    ctx.beginPath();
    ctx.arc(f * 10, -6, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a1a2e';
    ctx.stroke();
    // Blue crest
    ctx.fillStyle = jayDark;
    ctx.beginPath();
    ctx.moveTo(f * 10, -14);
    ctx.lineTo(f * 6, -18);
    ctx.lineTo(f * 14, -12);
    ctx.closePath();
    ctx.fill();
    // Eye
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(f * 13, -7, 2, 0, Math.PI * 2);
    ctx.fill();
    // Beak
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(f * 18, -6);
    ctx.lineTo(f * 25, -5);
    ctx.lineTo(f * 18, -3);
    ctx.closePath();
    ctx.fill();
    // Black necklace
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(f * 10, -2, 8, 0.3, Math.PI - 0.3);
    ctx.stroke();
    // Wings (back wing drawn first, then front wing)
    // Back wing (opposite side from facing)
    ctx.save();
    ctx.rotate(-wingFlap * f);
    ctx.fillStyle = jayWing;
    ctx.beginPath();
    ctx.moveTo(-f * 8, -3);
    ctx.lineTo(-f * 24, -15);
    ctx.lineTo(-f * 16, 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(-f * 14, -5);
    ctx.lineTo(-f * 22, -12);
    ctx.lineTo(-f * 16, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Front wing (same side as facing)
    ctx.save();
    ctx.rotate(wingFlap * f);
    ctx.fillStyle = jayWing;
    ctx.beginPath();
    ctx.moveTo(-f * 8, -3);
    ctx.lineTo(-f * 24, -15);
    ctx.lineTo(-f * 16, 2);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(-f * 14, -5);
    ctx.lineTo(-f * 22, -12);
    ctx.lineTo(-f * 16, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Tail feathers
    ctx.fillStyle = jayDark;
    ctx.beginPath();
    ctx.moveTo(-f * 14, 0);
    ctx.lineTo(-f * 28, 5);
    ctx.lineTo(-f * 26, -2);
    ctx.lineTo(-f * 22, 7);
    ctx.lineTo(-f * 14, 4);
    ctx.closePath();
    ctx.fill();
    // White tail tips
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.moveTo(-f * 26, 4);
    ctx.lineTo(-f * 28, 5);
    ctx.lineTo(-f * 26, -1);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    // Skip normal body rendering
    ctx.restore();

    // Hit effect (duplicated for jay form)
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

    // Teleport ghost
    if (this.teleportGhost && this.teleportGhost.timer > 0) {
      ctx.save();
      ctx.globalAlpha = this.teleportGhost.timer / 15 * 0.5;
      ctx.translate(this.teleportGhost.x, this.teleportGhost.y);
      ctx.fillStyle = this.char.accent;
      ctx.beginPath();
      ctx.ellipse(0, -25, 14, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Draw assist projectile
    if (this.assistActive) {
      ctx.save();
      this.drawAssistProjectile(this.assistActive);
      ctx.restore();
    }
    return;
  }

  // Batsch: draw tortoise form instead of normal body
  if (this.isTortoise) {
    const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
    const isStudTortoise = this.studTortoiseTimer > 0;
    const shellColor = flash ? '#fff' : (isStudTortoise ? this.char.accent : '#5a7a3a');
    const shellDark = flash ? '#ccc' : (isStudTortoise ? this.char.outline : '#3a5a1a');
    const skinColor = flash ? '#eee' : (isStudTortoise ? this.char.color : '#7a9a5a');

    ctx.save();
    ctx.translate(0, -8);

    // Shell (dome)
    ctx.fillStyle = shellColor;
    ctx.strokeStyle = shellDark;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 14, 0, Math.PI, 0);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Shell bottom
    ctx.fillStyle = shellDark;
    ctx.fillRect(-22, -2, 44, 5);

    // Shell pattern (hexagonal segments)
    ctx.strokeStyle = shellDark;
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-8, -12); ctx.lineTo(-8, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, -12); ctx.lineTo(8, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-15, -6); ctx.lineTo(15, -6); ctx.stroke();

    // Head poking out front
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.ellipse(f * 22, 0, 7, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = shellDark;
    ctx.lineWidth = 1;
    ctx.stroke();
    // Eyes
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(f * 25, -3, 1.5, 0, Math.PI * 2); ctx.fill();
    // Mouth (biting when attacking)
    if (this.state === 'attack') {
      ctx.strokeStyle = '#111';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(f * 28, 1);
      ctx.lineTo(f * 32, -1);
      ctx.lineTo(f * 28, 3);
      ctx.stroke();
    }

    // Legs (small, poking out underneath)
    ctx.fillStyle = skinColor;
    ctx.fillRect(-14, 2, 6, 5);  // back left
    ctx.fillRect(8, 2, 6, 5);    // back right
    // Tail (small, poking out back)
    ctx.fillStyle = skinColor;
    ctx.beginPath();
    ctx.moveTo(-f * 20, 0);
    ctx.lineTo(-f * 28, 2);
    ctx.lineTo(-f * 20, 3);
    ctx.closePath();
    ctx.fill();

    ctx.restore();

    // Skip normal body rendering
    ctx.restore();

    // Hit effect (duplicated for tortoise form)
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

    // Teleport ghost
    if (this.teleportGhost && this.teleportGhost.timer > 0) {
      ctx.save();
      ctx.globalAlpha = this.teleportGhost.timer / 15 * 0.5;
      ctx.translate(this.teleportGhost.x, this.teleportGhost.y - 8);
      ctx.fillStyle = this.char.accent;
      ctx.beginPath();
      ctx.ellipse(0, 0, 22, 14, 0, Math.PI, 0);
      ctx.fill();
      ctx.restore();
    }

    // Draw assist projectile
    if (this.assistActive) {
      ctx.save();
      this.drawAssistProjectile(this.assistActive);
      ctx.restore();
    }
    return;
  }

  // Paletap: taller body scaling
  const isPaletap = this.char.isPaletap;
  const isBuck = this.char.isBuck;
  const ptScale = isPaletap ? 1.7 : 1; // height multiplier
  const ptLegLen = isPaletap ? 2.0 : 1;
  const ptArmLen = isPaletap ? 1.8 : 1;

  // Body offset for states
  let bodyOffsetX = 0;
  let bodyOffsetY = bob + crouch;
  let armAngle = 0;
  let legSpread = 0;

  // Paletap: offset up to account for taller body
  if (isPaletap) bodyOffsetY -= 55;

  if (this.state === 'walk') {
    legSpread = Math.sin(this.animTimer * 0.5) * 12;
    // Paletap limping walk — staggery, uneven gait
    if (isPaletap) {
      const limpPhase = Math.sin(this.animTimer * 0.25);
      const limpPhase2 = Math.sin(this.animTimer * 0.4 + 1.2);
      // Asymmetric bob: drops hard on one step, lighter on the other
      bodyOffsetY += (limpPhase > 0 ? limpPhase * 10 : Math.abs(limpPhase) * 3);
      // Jerky lateral sway
      bodyOffsetX += limpPhase * 6 + limpPhase2 * 3;
    }
  }

  // Paletap slam animation: bend forward and drum fists on the ground
  let paletapSlamBend = 0;
  if (isPaletap && this.paletapSlamming) {
    // Phases: 0-6 bend forward, 7-10 first hit, 11-14 lift, 15-18 second hit, 19-20 hold
    const fr = this.paletapSlamFrame;
    const bendDown = Math.min(1, fr / 6); // body bends forward over first 6 frames
    paletapSlamBend = bendDown;
    // Body leans forward and drops
    bodyOffsetY += bendDown * 30;
    bodyOffsetX += f * bendDown * 12;
    // Legs bend to support the lean
    legSpread = bendDown * 15;
  }

  // Snazz McJazz dance animation
  if (this.dancing) {
    const dt = Date.now() * 0.008;
    bodyOffsetX = Math.sin(dt * 3) * 12;
    bodyOffsetY += Math.sin(dt * 6) * 4;
    legSpread = Math.sin(dt * 3) * 18;
    armAngle = Math.sin(dt * 4) * 1.5;
  }

  if (this.state === 'attack' && this.currentAttack) {
    const progress = this.attackFrame / (this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery);
    const sinP = Math.sin(progress * Math.PI);
    if (this.currentAttack === attacks.jab) {
      armAngle = sinP * 1.2;
      bodyOffsetX = f * sinP * 10;
    } else if (this.currentAttack === attacks.uppercut) {
      armAngle = -sinP * 2.0;
      bodyOffsetY -= sinP * 15;
    } else if (this.currentAttack === attacks.highKick) {
      legSpread = sinP * 30;
      bodyOffsetX = f * sinP * 5;
    } else if (this.currentAttack === attacks.lowKick) {
      legSpread = sinP * 25;
      bodyOffsetY += sinP * 5;
    } else if (this.currentAttack === attacks.borgusSlam) {
      // Borgus fist slam: arm raises high during startup, slams down during active
      const atk = this.currentAttack;
      const frame = this.attackFrame;
      if (frame < atk.startup) {
        // Windup: raise arm and lean back
        const t = frame / atk.startup;
        armAngle = -t * 2.5;
        bodyOffsetY -= t * 20;
        bodyOffsetX = -f * t * 8;
      } else if (frame < atk.startup + atk.active) {
        // Slam down: arm swings forward and down
        const t = (frame - atk.startup) / atk.active;
        armAngle = -2.5 + t * 4.0;
        bodyOffsetY = -20 + t * 25;
        bodyOffsetX = f * t * 15;
      } else {
        // Recovery: return to normal
        const t = (frame - atk.startup - atk.active) / atk.recovery;
        armAngle = 1.5 * (1 - t);
        bodyOffsetY = 5 * (1 - t);
        bodyOffsetX = f * 15 * (1 - t);
      }
    }
    // Rubberman: override limb extension to reach the opponent
    if (this.char.isRubberman && this.rubberStretch > 0) {
      const reach = sinP * this.rubberStretch;
      if (this.currentAttack === attacks.jab || this.currentAttack === attacks.uppercut) {
        this.rubberArmReach = reach;
      } else {
        this.rubberLegReach = reach;
      }
    }
  } else {
    this.rubberArmReach = 0;
    this.rubberLegReach = 0;
  }

  if (this.state === 'hitstun' || this.state === 'blockstun') {
    bodyOffsetX = -f * 5;
  }

  ctx.translate(bodyOffsetX, bodyOffsetY);

  // Legs
  // Rubberman: front leg stretches to reach opponent during kicks, back leg stays normal
  const legLen = 8 * ptLegLen;
  const backLegX = -f * 10 - legSpread * 0.3 * (-f);
  const frontLegBaseX = f * 10 + legSpread * 0.3 * f;
  const frontLegX = this.rubberLegReach > 0 ? f * this.rubberLegReach : frontLegBaseX;
  // Paletap: legs extend down to the ground from the elevated body
  const legTopY = -legLen;
  let legBotY = isPaletap ? 55 : 0;
  // Paletap limping: one leg shorter
  const limpOffset = isPaletap && this.state === 'walk' ? Math.sin(this.animTimer * 0.3) * 4 : 0;
  // Bojdo stomp: raise front leg during Death from Above
  let stompFrontLegRaise = 0;
  if (this.char.isBojdo && rumbleBojdoPhase === 1) {
    stompFrontLegRaise = -legLen * 1.2; // raise foot high
  }
  ctx.strokeStyle = outline;
  ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
  ctx.lineCap = 'round';
  // Back leg
  ctx.beginPath();
  ctx.moveTo(-f * 6, legTopY);
  if (isPaletap) {
    const kneeX = -f * 8 + (backLegX + f * 6) * 0.5;
    const kneeY = (legTopY + legBotY) * 0.5 + 3;
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(backLegX, legBotY + limpOffset);
  } else {
    ctx.lineTo(backLegX, legBotY);
  }
  ctx.stroke();
  // Front leg
  const frontFootY = legBotY + stompFrontLegRaise;
  ctx.beginPath();
  ctx.moveTo(f * 6, legTopY);
  if (isPaletap) {
    const kneeX = f * 8 + (frontLegX - f * 6) * 0.5;
    const kneeY = (legTopY + frontFootY) * 0.5 + 3;
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(frontLegX, frontFootY - limpOffset);
  } else {
    if (stompFrontLegRaise !== 0) {
      // Bent knee for raised leg
      const kneeX = f * 12;
      const kneeY = (legTopY + frontFootY) * 0.5;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(frontLegX + f * 4, frontFootY);
    } else {
      ctx.lineTo(frontLegX, frontFootY);
    }
  }
  ctx.stroke();

  // Leg colors
  ctx.strokeStyle = color;
  ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
  ctx.beginPath();
  ctx.moveTo(-f * 6, legTopY);
  if (isPaletap) {
    const kneeX = -f * 8 + (backLegX + f * 6) * 0.5;
    const kneeY = (legTopY + legBotY) * 0.5 + 3;
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(backLegX, legBotY + limpOffset);
  } else {
    ctx.lineTo(backLegX, legBotY);
  }
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(f * 6, legTopY);
  if (isPaletap) {
    const kneeX = f * 8 + (frontLegX - f * 6) * 0.5;
    const kneeY = (legTopY + frontFootY) * 0.5 + 3;
    ctx.lineTo(kneeX, kneeY);
    ctx.lineTo(frontLegX, frontFootY - limpOffset);
  } else {
    if (stompFrontLegRaise !== 0) {
      const kneeX = f * 12;
      const kneeY = (legTopY + frontFootY) * 0.5;
      ctx.lineTo(kneeX, kneeY);
      ctx.lineTo(frontLegX + f * 4, frontFootY);
    } else {
      ctx.lineTo(frontLegX, frontFootY);
    }
  }
  ctx.stroke();

  // Feet
  ctx.fillStyle = outline;
  ctx.beginPath();
  ctx.arc(backLegX, legBotY + (isPaletap ? limpOffset : 0), isPaletap ? 6 : 5, 0, Math.PI * 2);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(stompFrontLegRaise !== 0 ? frontLegX + f * 4 : frontLegX, frontFootY - (isPaletap ? limpOffset : 0), isPaletap ? 6 : 5, 0, Math.PI * 2);
  ctx.fill();

  // Paletap: lean upper body forward
  if (isPaletap) {
    ctx.save();
    ctx.translate(0, -legLen);
    ctx.rotate(f * 0.15);
    ctx.translate(0, legLen);
  }

  // The Count: maroon cape (drawn BEFORE body so it renders behind)
  if (this.char.isTheCount) {
    ctx.save();
    const capeBodyH = (40 - crouch) * ptScale;
    const capeShoulderY = -legLen - capeBodyH + 5;
    const capeWave = Math.sin(Date.now() * 0.004) * 4;
    const capeWave2 = Math.sin(Date.now() * 0.003 + 1) * 3;
    // Cape flows behind (opposite of facing direction)
    const bx = -f;
    ctx.fillStyle = '#5A0A0A';
    ctx.beginPath();
    // Anchored at both shoulders
    ctx.moveTo(-12, capeShoulderY);
    ctx.lineTo(12, capeShoulderY);
    // Right side flows back and down
    ctx.quadraticCurveTo(bx * 20 + 10 + capeWave, capeShoulderY + 20, bx * 28 + 8 + capeWave, capeShoulderY + 45);
    // Bottom edge — wide
    ctx.quadraticCurveTo(bx * 25 + capeWave2, capeShoulderY + 68, bx * 15 + capeWave2 * 0.5, capeShoulderY + 72);
    ctx.lineTo(bx * 15 - 8 + capeWave2 * 0.3, capeShoulderY + 72);
    // Left side back up
    ctx.quadraticCurveTo(bx * 20 - 10 + capeWave, capeShoulderY + 45, bx * 15 - 12 + capeWave, capeShoulderY + 20);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#3A0505';
    ctx.lineWidth = 1;
    ctx.stroke();
    // Inner lining
    ctx.fillStyle = '#8B1A1A';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.moveTo(-8, capeShoulderY + 5);
    ctx.lineTo(8, capeShoulderY + 5);
    ctx.quadraticCurveTo(bx * 16 + 6 + capeWave * 0.5, capeShoulderY + 30, bx * 20 + 4 + capeWave * 0.5, capeShoulderY + 50);
    ctx.lineTo(bx * 20 - 4 + capeWave2 * 0.3, capeShoulderY + 50);
    ctx.quadraticCurveTo(bx * 16 - 6 + capeWave * 0.5, capeShoulderY + 30, -8, capeShoulderY + 5);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Body
  ctx.fillStyle = color;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  const bodyH = (40 - crouch) * ptScale;
  const bodyW = isPaletap ? 18 : 16;
  const gourmandBulge = this.char.isGourmand ? (this.gourmandEnergy / this.gourmandMaxEnergy) * 12 : 0;
  ctx.beginPath();
  ctx.roundRect(-bodyW - gourmandBulge, -legLen - bodyH, bodyW * 2 + gourmandBulge * 2, bodyH, 6);
  ctx.fill();
  ctx.stroke();

  // Chest detail
  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.roundRect(-10 - gourmandBulge * 0.6, -legLen - bodyH + 8, 20 + gourmandBulge * 1.2, bodyH - 20, 3);
  ctx.fill();

  // Arms
  const armY = -legLen - bodyH + 12;
  const backArmLen = 15 * ptArmLen;
  const frontArmBase = 28 * ptArmLen;

  let armEndX = 0, armEndY = armY;

  // Paletap slam: drumming motion — bend forward, alternate fists hitting the ground
  if (isPaletap && paletapSlamBend > 0) {
    const groundY = legBotY;
    const fr = this.paletapSlamFrame;
    // Arm positions in front of him, like drumsticks
    // Each arm cycles: raised -> swing down -> hit ground -> lift back up
    // Arm 1 (front arm): hits at frame 8, lifts by 12
    // Arm 2 (back arm): hits at frame 14, lifts by 18
    const drawArm = (side, hitFrame) => {
      const shoulderX = side * 16;
      const shoulderYPos = armY;
      // Target: in front, on the ground
      const targetX = f * 35 + side * 5;
      const targetY = groundY;
      // Arm swing: raised -> down -> bounce back up slightly
      let swing;
      if (fr < hitFrame - 4) {
        // Raised position: arm is up, cocked back ready to strike
        swing = 0;
      } else if (fr < hitFrame) {
        // Swinging down (4 frames)
        swing = (fr - (hitFrame - 4)) / 4;
      } else if (fr < hitFrame + 3) {
        // On ground (impact)
        swing = 1;
      } else {
        // Slight bounce back
        swing = Math.max(0.6, 1 - (fr - hitFrame - 3) * 0.1);
      }
      // Fist position: interpolate from raised to ground
      const raisedX = f * 20 + side * 10;
      const raisedY = shoulderYPos - 15;
      const fistX = raisedX + (targetX - raisedX) * swing;
      const fistY = raisedY + (targetY - raisedY) * swing;
      // Elbow: arcs up when raised, comes down with the strike
      const elbowX = (shoulderX + fistX) * 0.5 + side * 5;
      const elbowY = Math.min(shoulderYPos, fistY) - 15 * (1 - swing * 0.5);
      // Draw upper arm (shoulder to elbow)
      ctx.strokeStyle = outline;
      ctx.lineWidth = 7;
      ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(shoulderX, shoulderYPos); ctx.lineTo(elbowX, elbowY); ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(shoulderX, shoulderYPos); ctx.lineTo(elbowX, elbowY); ctx.stroke();
      // Draw forearm (elbow to fist)
      ctx.strokeStyle = outline;
      ctx.lineWidth = 7;
      ctx.beginPath(); ctx.moveTo(elbowX, elbowY); ctx.lineTo(fistX, fistY); ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(elbowX, elbowY); ctx.lineTo(fistX, fistY); ctx.stroke();
      // Fist
      ctx.fillStyle = accent;
      ctx.beginPath(); ctx.arc(fistX, fistY, 6, 0, Math.PI * 2); ctx.fill();
    };
    // Draw back arm first (behind), then front arm (in front)
    drawArm(-f, 14); // back arm hits second
    drawArm(f, 8);   // front arm hits first
  } else {
    // Back arm
    let backArmEndX = -f * (28 * ptArmLen);
    let backArmEndY = armY + backArmLen + Math.sin(bob * 0.5) * 3;

    // Brush override: back arm crosses over to far shoulder
    if (this._brushArmT !== undefined && this._brushArmT >= 0) {
      const bt = this._brushArmT;
      // Far shoulder position (front shoulder, on the f side)
      const farShX = f * 8;
      const farShY = armY + 2;
      // Rest position
      const defX = backArmEndX;
      const defY = backArmEndY;
      // Sweep end (past the far shoulder outward)
      const sweepEndX = f * 28;
      const sweepEndY = armY + 2;

      if (bt < 0.25) {
        // Raise to far shoulder
        const t = bt / 0.25;
        const ease = t * t;
        backArmEndX = defX + (farShX - defX) * ease;
        backArmEndY = defY + (farShY - defY) * ease;
      } else if (bt < 0.55) {
        // Sweep across shoulder
        const t = (bt - 0.25) / 0.3;
        backArmEndX = farShX + (sweepEndX - farShX) * t;
        backArmEndY = farShY - Math.sin(t * Math.PI) * 3;
      } else {
        // Lower back to rest
        const t = Math.min(1, (bt - 0.55) / 0.45);
        backArmEndX = sweepEndX + (defX - sweepEndX) * t;
        backArmEndY = sweepEndY + (defY - sweepEndY) * t;
      }
    }

    if (!this._hideBackArm) {
      ctx.strokeStyle = outline;
      ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
      ctx.beginPath();
      ctx.moveTo(-f * 14, armY);
      ctx.lineTo(backArmEndX, backArmEndY);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
      ctx.beginPath();
      ctx.moveTo(-f * 14, armY);
      ctx.lineTo(backArmEndX, backArmEndY);
      ctx.stroke();
    }

    // Front arm (attacking arm) — hidden during Tetherball rumble (custom arm draws instead)
    if (!this._hideFrontArm) {
      const punchExtend = armAngle * 30;
      armEndX = this.rubberArmReach > 0 ? f * this.rubberArmReach : f * (frontArmBase + punchExtend);
      armEndY = this.rubberArmReach > 0 ? armY - armAngle * 5 : armY - armAngle * (isPaletap ? 25 : 10);
      ctx.strokeStyle = outline;
      ctx.lineWidth = isPaletap ? 7 : isBuck ? 9 : 6;
      ctx.beginPath();
      ctx.moveTo(f * 14, armY);
      ctx.lineTo(armEndX, armEndY);
      ctx.stroke();
      ctx.strokeStyle = color;
      ctx.lineWidth = isPaletap ? 5 : isBuck ? 7 : 4;
      ctx.beginPath();
      ctx.moveTo(f * 14, armY);
      ctx.lineTo(armEndX, armEndY);
      ctx.stroke();
    }

    // Fists
    ctx.fillStyle = accent;
    if (!this._hideFrontArm) {
      ctx.beginPath();
      ctx.arc(armEndX, armEndY, isPaletap ? 6 : isBuck ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();
    }
    if (!this._hideBackArm) {
      ctx.fillStyle = accent;
      ctx.beginPath();
      ctx.arc(backArmEndX, backArmEndY, isPaletap ? 5 : isBuck ? 6 : 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Head
  const headY = -legLen - bodyH - 16;
  const headSize = isPaletap ? 18 : 16;

  if (this._drawPrinterHead || this.char.isPrinterBoss) {
    // Printer Boss: printer as head
    this._drawPrinterHead = false;
    ctx.save();
    ctx.translate(0, headY - 5);
    const dmgLevel = this._printerDamageLevel || 0;
    const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
    const pColor = flash ? '#fff' : '#dddddd';
    const pDark = flash ? '#eee' : '#aaaaaa';
    const pOut = flash ? '#ccc' : '#777777';
    // Main body
    ctx.fillStyle = pColor;
    ctx.strokeStyle = pOut;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-22, -18, 44, 32, 3);
    ctx.fill(); ctx.stroke();
    // Paper tray top
    ctx.fillStyle = pDark;
    ctx.beginPath();
    ctx.roundRect(-18, -24, 36, 8, 2);
    ctx.fill(); ctx.stroke();
    // Output slot
    ctx.fillStyle = '#555';
    ctx.fillRect(-17, 12, 34, 3);
    // Buttons
    ctx.fillStyle = '#44aa44';
    ctx.beginPath(); ctx.arc(12, -5, 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#aa4444';
    ctx.beginPath(); ctx.arc(17, -5, 2, 0, Math.PI * 2); ctx.fill();
    // LCD
    ctx.fillStyle = '#113311';
    ctx.fillRect(5, -14, 14, 5);
    ctx.fillStyle = '#44ff44';
    ctx.font = '4px monospace';
    ctx.textAlign = 'left';
    ctx.fillText(dmgLevel >= 4 ? 'ERROR' : dmgLevel >= 2 ? 'HELP' : 'FIGHT', 6, -10);
    // Damage cracks
    if (dmgLevel >= 1) {
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(-10, -10); ctx.lineTo(-5, 5); ctx.stroke();
    }
    if (dmgLevel >= 2) {
      ctx.beginPath(); ctx.moveTo(8, -15); ctx.lineTo(15, 0); ctx.stroke();
    }
    if (dmgLevel >= 3) {
      ctx.beginPath(); ctx.moveTo(-15, 5); ctx.lineTo(0, 10); ctx.stroke();
      ctx.fillStyle = '#333';
      ctx.fillRect(-20, 8, 6, 4);
    }
    if (dmgLevel >= 4) {
      // Smoke
      ctx.fillStyle = '#666';
      ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.01) * 0.2;
      ctx.beginPath(); ctx.arc(-5, -28, 6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(3, -32, 5, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  } else if (this.char.isTubeWarden) {
    // Tube Warden: glass vial head instead of normal head
    ctx.save();
    ctx.translate(0, headY);
    // Bottom metal cap
    ctx.fillStyle = '#666666';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-14, 6, 28, 8, 3);
    ctx.fill(); ctx.stroke();
    // Glass tube body (head-sized)
    ctx.fillStyle = 'rgba(0, 204, 187, 0.25)';
    ctx.strokeStyle = 'rgba(200, 255, 250, 0.5)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(-12, -18, 24, 24, 6);
    ctx.fill(); ctx.stroke();
    // Turquoise liquid/glow inside
    ctx.fillStyle = '#00ccbb';
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.005) * 0.15;
    ctx.beginPath();
    ctx.roundRect(-8, -14, 16, 18, 4);
    ctx.fill();
    ctx.globalAlpha = 1;
    // Top metal cap
    ctx.fillStyle = '#666666';
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-14, -24, 28, 8, 3);
    ctx.fill(); ctx.stroke();
    // Highlight streak on glass
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-6, -14);
    ctx.lineTo(-6, 4);
    ctx.stroke();
    ctx.restore();
  } else {
    if (isPaletap) {
      ctx.save();
      ctx.translate(0, headY);
      ctx.rotate(f * 0.35); // tilted head
    }
    ctx.fillStyle = accent;
    ctx.strokeStyle = outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(isPaletap ? 0 : 0, isPaletap ? 0 : headY, headSize, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes
    const eyeBaseY = isPaletap ? 0 : headY;
    ctx.fillStyle = this.char.isErictho ? '#9944dd' : this.char.isRelapmi ? '#ff2222' : this.char.isDarkBojdo ? '#ffcc00' : outline;
    ctx.beginPath();
    ctx.arc(f * 5, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(f * 12, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights (skip for Paletap and Erictho)
    if (!isPaletap && !this.char.isErictho) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(f * 6, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(f * 13, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  if (isPaletap) ctx.restore(); // end tilted head transform
  if (isPaletap) ctx.restore(); // end forward lean

  // Relapmi: pharaoh headpiece
  if (this.char.isRelapmi) {
    const hatY = headY - 12;
    // Nemes cloth (sides draping down from behind head, not covering face)
    ctx.fillStyle = '#1a1a55';
    ctx.beginPath();
    ctx.moveTo(-16, hatY + 14);
    ctx.lineTo(-18, hatY + 35);
    ctx.lineTo(-10, hatY + 35);
    ctx.lineTo(-10, hatY + 14);
    ctx.closePath();
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(16, hatY + 14);
    ctx.lineTo(18, hatY + 35);
    ctx.lineTo(10, hatY + 35);
    ctx.lineTo(10, hatY + 14);
    ctx.closePath();
    ctx.fill();
    // Stripes on cloth
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1;
    for (let s = 0; s < 3; s++) {
      const sy = hatY + 18 + s * 5;
      ctx.beginPath();
      ctx.moveTo(-17, sy); ctx.lineTo(-10, sy); ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(17, sy); ctx.lineTo(10, sy); ctx.stroke();
    }
    // Main crown (sits on top of head)
    ctx.fillStyle = '#1a1a55';
    ctx.beginPath();
    ctx.moveTo(-16, hatY + 10);
    ctx.lineTo(-14, hatY - 8);
    ctx.quadraticCurveTo(0, hatY - 12, 14, hatY - 8);
    ctx.lineTo(16, hatY + 10);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#111111';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Gold band at base of crown
    ctx.strokeStyle = '#D4A04A';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-15, hatY + 8);
    ctx.lineTo(15, hatY + 8);
    ctx.stroke();
    // Uraeus (cobra at front)
    ctx.fillStyle = '#33ff66';
    ctx.beginPath();
    ctx.moveTo(f * 2, hatY - 8);
    ctx.lineTo(f * 2 - 3, hatY - 16);
    ctx.lineTo(f * 2 + 3, hatY - 16);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#ff3333';
    ctx.beginPath();
    ctx.arc(f * 2, hatY - 16, 1.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // Six Iron-Nine Iron: ten-gallon cowboy hat + golf club in hand
  if (this.char.isSixIron) {
    const hatY = headY - 10;
    // Hat brim (wide, brown)
    ctx.fillStyle = '#6B4226';
    ctx.beginPath();
    ctx.ellipse(0, hatY + 6, 24, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#4A2A10';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Hat crown (shorter cowboy style)
    ctx.fillStyle = '#7B5230';
    ctx.beginPath();
    ctx.moveTo(-12, hatY + 3);
    ctx.lineTo(-10, hatY - 10);
    ctx.quadraticCurveTo(0, hatY - 14, 10, hatY - 10);
    ctx.lineTo(12, hatY + 3);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#4A2A10';
    ctx.stroke();
    // Hat band
    ctx.strokeStyle = '#D4A04A';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-11, hatY + 1);
    ctx.lineTo(11, hatY + 1);
    ctx.stroke();

    // Golf club in front hand
    const clubSwing = this.sixIronClubSwinging ? (1 - this.sixIronClubTimer / 30) : 0;
    const clubAngle = clubSwing < 0.4 ? -0.8 - clubSwing * 2 : // wind up
                      clubSwing < 0.6 ? 0.6 : // strike
                      -0.3 * (1 - (clubSwing - 0.6) / 0.4); // return
    ctx.save();
    ctx.translate(armEndX || (f * 28), armEndY || (-legLen - bodyH * 0.2));
    ctx.rotate(clubAngle * f);
    // Shaft
    ctx.strokeStyle = '#aaa';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(f * 30, -20);
    ctx.stroke();
    // Club head
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.roundRect(f * 27, -28, f * 12, 10, 3);
    ctx.fill();
    ctx.restore();
  }

  // Gourmand: fork in front hand, spoon in back hand, open mouth
  if (this.char.isGourmand) {
    // Fork (front hand)
    const forkX = armEndX;
    const forkY = armEndY;
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(forkX, forkY);
    ctx.lineTo(forkX + f * 12, forkY - 16);
    ctx.stroke();
    // Fork prongs
    for (let p = -1; p <= 1; p++) {
      ctx.beginPath();
      ctx.moveTo(forkX + f * 12 + p * 2, forkY - 16);
      ctx.lineTo(forkX + f * 14 + p * 2, forkY - 22);
      ctx.stroke();
    }
    // Spoon (back hand)
    const spoonX = -f * 28;
    const spoonY = armY + 15 + Math.sin(bob * 0.5) * 3;
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(spoonX, spoonY);
    ctx.lineTo(spoonX - f * 10, spoonY - 14);
    ctx.stroke();
    ctx.fillStyle = '#ccc';
    ctx.beginPath();
    ctx.ellipse(spoonX - f * 10, spoonY - 18, 4, 3, 0, 0, Math.PI * 2);
    ctx.fill();

    // Open mouth
    if (this.mouthOpen) {
      ctx.fillStyle = '#2a0a0a';
      ctx.beginPath();
      ctx.moveTo(f * 4, headY + 6);
      ctx.lineTo(f * 18, headY + 4);
      ctx.lineTo(f * 18, headY + 22);
      ctx.lineTo(f * 4, headY + 16);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#e8a852';
      ctx.lineWidth = 2;
      ctx.stroke();
      // Teeth
      ctx.fillStyle = '#fff';
      for (let t = 0; t < 3; t++) {
        ctx.fillRect(f * (6 + t * 4), headY + 5, 2, 3);
        ctx.fillRect(f * (6 + t * 4), headY + 17, 2, -3);
      }
    }

    // Full indicator (bloated glow)
    if (this.gourmandFull) {
      ctx.save();
      ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.01) * 0.15;
      ctx.fillStyle = '#ff6600';
      ctx.beginPath();
      ctx.ellipse(0, -8 - bodyH / 2, 22 + gourmandBulge, bodyH / 2 + 5, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Matador: estoque in back hand (non-punching hand)
  if (this.char.isMatador) {
    const backHandX = -f * 28;
    const backHandY = armY + 15 + Math.sin(bob * 0.5) * 3;
    // Blade
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(backHandX, backHandY);
    ctx.lineTo(backHandX - f * 30, backHandY - 22);
    ctx.stroke();
    // Blade highlight
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 0.5;
    ctx.beginPath();
    ctx.moveTo(backHandX - f * 2, backHandY - 2);
    ctx.lineTo(backHandX - f * 28, backHandY - 21);
    ctx.stroke();
    // Guard (crosspiece)
    ctx.strokeStyle = '#ffd700';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(backHandX - f * 3, backHandY + 3);
    ctx.lineTo(backHandX + f * 3, backHandY - 5);
    ctx.stroke();
    // Handle
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(backHandX, backHandY);
    ctx.lineTo(backHandX + f * 6, backHandY + 5);
    ctx.stroke();
    // Dash afterimage effect
    if (this.matadorDashing) {
      ctx.save();
      ctx.globalAlpha = 0.3;
      ctx.fillStyle = this.char.accent;
      ctx.beginPath();
      ctx.ellipse(0, -bodyH / 2 - legLen, 20, bodyH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Exor: ghostly wisp aura
  if (this.char.isExor) {
    ctx.save();
    const t = Date.now() * 0.004;
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = '#39ff14';
    ctx.lineWidth = 1;
    // Floating soul wisps around body
    for (let i = 0; i < 4; i++) {
      const angle = t + i * 1.57;
      const r = 22 + Math.sin(t * 0.7 + i) * 5;
      const wx = Math.cos(angle) * r;
      const wy = -bodyH / 2 - legLen + Math.sin(angle * 0.8 + i) * (bodyH * 0.4);
      ctx.beginPath();
      ctx.arc(wx, wy, 3 + Math.sin(t + i) * 1.5, 0, Math.PI * 2);
      ctx.stroke();
    }
    // Draining tether effect
    if (this.exorDraining && this.exorDrainTarget) {
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#2ecc71';
      ctx.lineWidth = 2;
      const target = this.exorDrainTarget;
      // Draw in local coords, need to un-translate
      const dx = (target.x - this.x) * f;
      const dy = (target.centerY - 10) - (this.centerY - 10);
      ctx.beginPath();
      ctx.moveTo(0, -bodyH / 2 - legLen);
      ctx.quadraticCurveTo(dx * 0.5, -bodyH / 2 - legLen + dy * 0.5 - 20, dx, dy - bodyH / 2 - legLen);
      ctx.stroke();
      // Glow on self
      ctx.globalAlpha = 0.2 + Math.sin(Date.now() * 0.01) * 0.1;
      ctx.fillStyle = '#39ff14';
      ctx.beginPath();
      ctx.ellipse(0, -bodyH / 2 - legLen, 18, bodyH / 2, 0, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }

  // Backtrack: clock/rewind symbol on chest
  if (this.char.isBacktrack) {
    ctx.save();
    ctx.strokeStyle = '#b44dff';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    const clockY = -bodyH / 2 - legLen;
    // Clock circle
    ctx.beginPath();
    ctx.arc(0, clockY, 6, 0, Math.PI * 2);
    ctx.stroke();
    // Clock hands
    const t = Date.now() * 0.003;
    ctx.beginPath();
    ctx.moveTo(0, clockY);
    ctx.lineTo(Math.cos(-t) * 4, clockY + Math.sin(-t) * 4);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(0, clockY);
    ctx.lineTo(Math.cos(-t * 0.3) * 3, clockY + Math.sin(-t * 0.3) * 3);
    ctx.stroke();
    ctx.restore();

    // Rewind visual effect
    if (this.btRewindEffect > 0) {
      ctx.save();
      ctx.globalAlpha = this.btRewindEffect / 40 * 0.4;
      ctx.strokeStyle = '#b44dff';
      ctx.lineWidth = 2;
      // Concentric rings expanding outward
      for (let r = 0; r < 3; r++) {
        const radius = (40 - this.btRewindEffect + r * 15) * 2;
        ctx.beginPath();
        ctx.arc(0, -bodyH / 2 - legLen, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // Killa Watt: electric sparks around body
  if (this.char.isKillawatt) {
    ctx.save();
    ctx.strokeStyle = '#00e5ff';
    ctx.lineWidth = 1.5;
    const t = Date.now() * 0.01;
    for (let i = 0; i < 3; i++) {
      const angle = t + i * 2.1;
      const sx = Math.cos(angle) * 18;
      const sy = -bodyH / 2 - legLen + Math.sin(angle * 1.3) * (bodyH / 2);
      const ex = sx + (Math.random() - 0.5) * 12;
      const ey = sy + (Math.random() - 0.5) * 10;
      ctx.globalAlpha = 0.5 + Math.random() * 0.5;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo((sx + ex) / 2 + (Math.random() - 0.5) * 6, (sy + ey) / 2);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Snazz McJazz: white fedora
  if (this.char.isSnazz) {
    ctx.fillStyle = '#ffffff';
    ctx.strokeStyle = '#cccccc';
    ctx.lineWidth = 1;
    // Hat brim
    ctx.beginPath();
    ctx.ellipse(0, headY - 12, 22, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Hat crown
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.moveTo(-10, headY - 12);
    ctx.lineTo(-8, headY - 28);
    ctx.lineTo(8, headY - 28);
    ctx.lineTo(10, headY - 12);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = '#cccccc';
    ctx.stroke();
    // Hat band
    ctx.fillStyle = '#222222';
    ctx.fillRect(-9, headY - 17, 18, 3);
  }

  // Haystack: sword through body and arrows in head
  if (this.char.isHaystack) {
    // Sword through body (diagonal)
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-12, -8 - bodyH + 5);
    ctx.lineTo(14, -8 - bodyH + 30);
    ctx.stroke();
    // Sword handle
    ctx.strokeStyle = '#553300';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(-14, -8 - bodyH + 2);
    ctx.lineTo(-12, -8 - bodyH + 5);
    ctx.stroke();
    // Sword guard
    ctx.strokeStyle = '#aa8800';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-16, -8 - bodyH + 7);
    ctx.lineTo(-8, -8 - bodyH + 3);
    ctx.stroke();
    // Arrows sticking out of head (sides)
    ctx.strokeStyle = '#886644';
    ctx.lineWidth = 2;
    // Arrow left
    ctx.beginPath();
    ctx.moveTo(-22, headY - 3);
    ctx.lineTo(-6, headY + 1);
    ctx.stroke();
    // Arrow fletching left
    ctx.fillStyle = '#cc4444';
    ctx.beginPath();
    ctx.moveTo(-22, headY - 3);
    ctx.lineTo(-20, headY - 7);
    ctx.lineTo(-18, headY - 3);
    ctx.closePath();
    ctx.fill();
    // Arrow right
    ctx.strokeStyle = '#886644';
    ctx.beginPath();
    ctx.moveTo(22, headY + 2);
    ctx.lineTo(6, headY - 1);
    ctx.stroke();
    // Arrow fletching right
    ctx.fillStyle = '#cc4444';
    ctx.beginPath();
    ctx.moveTo(22, headY + 2);
    ctx.lineTo(20, headY + 6);
    ctx.lineTo(18, headY + 2);
    ctx.closePath();
    ctx.fill();
    // Burlap stitch marks on body
    ctx.strokeStyle = '#5a4020';
    ctx.lineWidth = 1;
    for (let sy = 0; sy < 3; sy++) {
      const stitchY = -8 - bodyH + 10 + sy * 10;
      ctx.beginPath();
      ctx.moveTo(-6, stitchY);
      ctx.lineTo(0, stitchY + 4);
      ctx.lineTo(6, stitchY);
      ctx.stroke();
    }
  }

  // Mouth - frown when taking damage
  if (this.state === 'hitstun' || this.state === 'launched') {
    ctx.strokeStyle = outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(f * 8, headY + 10, 4, Math.PI, Math.PI * 2);
    ctx.stroke();
  }

  // Blocking indicator
  if (this.blocking && this.state !== 'attack') {
    ctx.strokeStyle = '#0ff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.01) * 0.3;
    ctx.beginPath();
    ctx.arc(0, headY + 20, 30, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
  }

  // Bozollok: insect features (antennae, mandibles, abdomen segments)
  if (this.char.isBozollok) {
    const f = this.facing;
    // Antennae
    ctx.strokeStyle = '#c8a030';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(f * 4, headY - 10);
    ctx.quadraticCurveTo(f * 15, headY - 28, f * 20, headY - 25);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-f * 2, headY - 10);
    ctx.quadraticCurveTo(-f * 10, headY - 30, -f * 5, headY - 28);
    ctx.stroke();
    // Antenna tips
    ctx.fillStyle = '#c8a030';
    ctx.beginPath(); ctx.arc(f * 20, headY - 25, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-f * 5, headY - 28, 2, 0, Math.PI * 2); ctx.fill();
    // Mandibles
    ctx.strokeStyle = '#8a6a10';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(f * 6, headY + 4);
    ctx.lineTo(f * 14, headY + 10);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(f * 4, headY + 6);
    ctx.lineTo(f * 12, headY + 14);
    ctx.stroke();
    // Abdomen segment lines
    ctx.strokeStyle = 'rgba(200,160,48,0.3)';
    ctx.lineWidth = 1;
    for (let s = 0; s < 3; s++) {
      const sy = -this.height * 0.35 + s * 10;
      ctx.beginPath();
      ctx.moveTo(-10, sy);
      ctx.lineTo(10, sy);
      ctx.stroke();
    }
    // Fluttering wings while hovering
    if (this.molting && this.moltHover > 0) {
      const wingFlutter = Math.sin(Date.now() * 0.03) * 0.6;
      const wingSpread = 0.8 + Math.sin(Date.now() * 0.025) * 0.2;
      ctx.save();
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.15;
      // Left wing
      ctx.fillStyle = 'rgba(200,160,48,0.4)';
      ctx.strokeStyle = '#c8a030';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(-f * 8, -this.height * 0.55);
      ctx.quadraticCurveTo(-f * (30 * wingSpread), -this.height * 0.7 + wingFlutter * 10, -f * (35 * wingSpread), -this.height * 0.45 + wingFlutter * 5);
      ctx.quadraticCurveTo(-f * (25 * wingSpread), -this.height * 0.35, -f * 8, -this.height * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Right wing
      ctx.beginPath();
      ctx.moveTo(f * 8, -this.height * 0.55);
      ctx.quadraticCurveTo(f * (30 * wingSpread), -this.height * 0.7 - wingFlutter * 10, f * (35 * wingSpread), -this.height * 0.45 - wingFlutter * 5);
      ctx.quadraticCurveTo(f * (25 * wingSpread), -this.height * 0.35, f * 8, -this.height * 0.4);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    // Descent claw slash effect
    if (this.moltDescending) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#c8a030';
      ctx.lineWidth = 3;
      for (let c = 0; c < 3; c++) {
        const cx = f * (8 + c * 8);
        ctx.beginPath();
        ctx.moveTo(cx, -5);
        ctx.lineTo(cx + f * 5, 15);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // Codemax scanlines and glitch displacement
  if (this.char.isCodemax) {
    ctx.globalCompositeOperation = 'screen';
    ctx.globalAlpha = 0.08;
    for (let sy = -this.height; sy < 10; sy += 4) {
      ctx.fillStyle = '#00ff88';
      ctx.fillRect(-20, sy, 40, 1);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1;
    if (this.glitchTimer > 0) {
      ctx.save();
      const glitchOff = (Math.random() - 0.5) * 12;
      ctx.translate(glitchOff, 0);
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#00ff88';
      ctx.fillRect(-15, -this.height * 0.3, 30, this.height * 0.2);
      ctx.restore();
    }
  }

  ctx.restore();

  // If this is a clone draw, stop here (no hit effects, assists, combos, etc.)
  if (this._isCloneDraw) return;

  // Duplaire clone drawing - reuse full draw method recursively
  if (this.char.isDuplaire && this.duplaireClones.length > 0 && !this._isCloneDraw) {
    for (const clone of this.duplaireClones) {
      // Save main fighter state
      const savedX = this.x, savedY = this.y, savedFacing = this.facing;
      const savedState = this.state, savedAttackFrame = this.attackFrame;
      const savedCurrentAttack = this.currentAttack, savedStateTimer = this.stateTimer;
      const savedGrounded = this.grounded, savedAnimTimer = this.animTimer, savedAnimFrame = this.animFrame;
      const savedCrouching = this.crouching, savedBlocking = this.blocking;

      // Apply clone state
      this.x = clone.x;
      this.y = clone.y;
      this.facing = clone.facing;
      this.grounded = clone.grounded;
      this.animTimer = clone.animTimer;
      this.animFrame = clone.animFrame;
      this.crouching = clone.crouching || false;
      this.blocking = clone.blocking || false;
      if (clone.active) {
        this.state = clone.state;
        this.attackFrame = clone.attackFrame;
        this.currentAttack = clone.currentAttack;
        this.stateTimer = clone.stateTimer;
      } else {
        this.state = 'idle';
        this.currentAttack = null;
      }

      this._isCloneDraw = true;
      this._cloneAlpha = clone.active ? 1.0 : 0.3 + 0.15 * Math.sin(clone.activationTimer * 0.05);
      this.draw(ctx);
      this._isCloneDraw = false;

      // Restore main fighter state
      this.x = savedX; this.y = savedY; this.facing = savedFacing;
      this.state = savedState; this.attackFrame = savedAttackFrame;
      this.currentAttack = savedCurrentAttack; this.stateTimer = savedStateTimer;
      this.grounded = savedGrounded; this.animTimer = savedAnimTimer; this.animFrame = savedAnimFrame;
      this.crouching = savedCrouching; this.blocking = savedBlocking;
    }
  }

  // Hit effect
  if (this.hitEffect) {
    const he = this.hitEffect;
    const size = he.type === 'big' ? 25 : 15;
    const alpha = he.timer / 10;
    ctx.save();
    ctx.translate(he.x, he.y);
    ctx.globalAlpha = alpha;
    // Star burst
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

  // Gourmand energy ball projectile
  if (this.gourmandProjectile) {
    const gp = this.gourmandProjectile;
    const gpSize = 8 + (gp.damage / 80) * 12;
    ctx.save();
    ctx.translate(gp.x, gp.y);
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 15;
    // Outer glow
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ff8800';
    ctx.beginPath();
    ctx.arc(0, 0, gpSize + 4, 0, Math.PI * 2);
    ctx.fill();
    // Main ball
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#ffaa22';
    ctx.beginPath();
    ctx.arc(0, 0, gpSize, 0, Math.PI * 2);
    ctx.fill();
    // Inner core
    ctx.fillStyle = '#ffe080';
    ctx.beginPath();
    ctx.arc(0, 0, gpSize * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Quellic fire phase particles
  if (this.quellicFirePhase) {
    ctx.save();
    ctx.resetTransform();
    const scaleX = canvas.width / 960;
    const scaleY = canvas.height / 540;
    ctx.scale(scaleX, scaleY);
    const time = Date.now() * 0.01;
    for (let i = 0; i < 10; i++) {
      const angle = time + (i / 10) * Math.PI * 2;
      const r = 20 + Math.sin(time * 0.5 + i * 1.3) * 10;
      const px = this.x + Math.cos(angle) * r;
      const py = (this.y - 45) + Math.sin(angle * 0.7 + i) * 25 - Math.abs(Math.sin(time + i)) * 15;
      const flicker = 0.3 + Math.sin(time * 2 + i * 0.8) * 0.3;
      ctx.globalAlpha = flicker;
      ctx.fillStyle = i % 3 === 0 ? '#ffcc00' : i % 3 === 1 ? '#ff6600' : '#ff2200';
      ctx.beginPath();
      ctx.arc(px, py, 3 + Math.sin(time + i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Erictho: hide fighter when inside portal
  if (this.char.isErictho && this.ericthoHidden) {
    // Don't draw the fighter body — just draw the portal if active
    if (this.ericthoPortal) {
      this.drawEricthoPortal(ctx);
    }
    // Draw assist projectile even while hidden
    if (this.assistActive) {
      ctx.save();
      this.drawAssistProjectile(this.assistActive);
      ctx.restore();
    }
    ctx.restore();
    return;
  }

  // Erictho portal (when visible)
  if (this.char.isErictho && this.ericthoPortal) {
    this.drawEricthoPortal(ctx);
  }

  // Borgus slam ground impact
  if (this.char.isBorgus && this.state === 'attack' && this.currentAttack === attacks.borgusSlam) {
    const atk = this.currentAttack;
    const frame = this.attackFrame;
    if (frame >= atk.startup && frame < atk.startup + atk.active + 10) {
      const impactT = (frame - atk.startup) / (atk.active + 10);
      const impactX = this.x + this.facing * 40;
      const impactY = this.groundY;
      ctx.save();
      // Shockwave ring
      ctx.globalAlpha = (1 - impactT) * 0.6;
      ctx.strokeStyle = '#ff8800';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(impactX, impactY, 20 + impactT * 50, 6 + impactT * 12, 0, 0, Math.PI * 2);
      ctx.stroke();
      // Dust particles
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI - Math.PI / 2;
        const r = impactT * 40;
        ctx.globalAlpha = (1 - impactT) * 0.4;
        ctx.fillStyle = '#aa7744';
        ctx.beginPath();
        ctx.arc(impactX + Math.cos(angle) * r, impactY - Math.abs(Math.sin(angle)) * r * 0.5, 3 + (1 - impactT) * 3, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // Borgus laser beam
  if (this.borgusLaser) {
    const bl = this.borgusLaser;
    ctx.save();
    // Beam trail
    ctx.globalAlpha = 0.3;
    ctx.strokeStyle = '#ff4400';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(bl.x - bl.vx * 3, bl.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.stroke();
    // Main beam
    ctx.globalAlpha = 0.8;
    ctx.strokeStyle = '#ff8800';
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(bl.x - bl.vx * 2, bl.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.stroke();
    // Core
    ctx.strokeStyle = '#ffcc44';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(bl.x - bl.vx * 1.5, bl.y);
    ctx.lineTo(bl.x, bl.y);
    ctx.stroke();
    // Head glow
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 12;
    ctx.fillStyle = '#ffdd66';
    ctx.beginPath();
    ctx.arc(bl.x, bl.y, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }
  // Borgus laser charging indicator
  if (this.borgusLaserCharging > 0) {
    const chT = 1 - this.borgusLaserCharging / 20;
    ctx.save();
    ctx.globalAlpha = chT * 0.6;
    ctx.fillStyle = '#ff6600';
    ctx.beginPath();
    ctx.arc(this.x + this.facing * 35, this.centerY, 4 + chT * 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // The Count: dark fireworks + explosions
  if (this.char.isTheCount) {
    ctx.save();
    // Firework projectiles with trails
    for (const fw of this.countFireworks) {
      for (const t of fw.trail) {
        ctx.globalAlpha = t.timer / 8 * 0.5;
        ctx.fillStyle = fw.color;
        ctx.beginPath();
        ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.fillStyle = fw.color;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 4, 0, Math.PI * 2);
      ctx.fill();
      // Bright core
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = 0.5;
      ctx.beginPath();
      ctx.arc(fw.x, fw.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    // Explosion particles
    for (const e of this.countExplosions) {
      ctx.globalAlpha = Math.min(1, e.timer / 12);
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 3 + (1 - e.timer / 20) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Relapmi: ground spears, body shank, spike ring
  if (this.char.isRelapmi) {
    ctx.save();
    // Ground spears
    for (const spear of this.relapmiSpears) {
      const spearH = 80 * spear.emergeT;
      if (spearH < 2) continue;
      ctx.fillStyle = '#111111';
      ctx.strokeStyle = '#33ff66';
      ctx.lineWidth = 1;
      // Spear shaft (tapers to sharp point)
      ctx.beginPath();
      ctx.moveTo(spear.x - 4, spear.y);
      ctx.lineTo(spear.x + 4, spear.y);
      ctx.lineTo(spear.x + 2, spear.y - spearH + 8);
      ctx.lineTo(spear.x, spear.y - spearH); // sharp tip
      ctx.lineTo(spear.x - 2, spear.y - spearH + 8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Ground disturbance at base
      ctx.fillStyle = 'rgba(51,255,102,0.2)';
      ctx.beginPath();
      ctx.ellipse(spear.x, spear.y, 12, 4, 0, 0, Math.PI * 2);
      ctx.fill();
    }

    // Body shank
    if (this.relapmiShank && this.relapmiShank.length > 0) {
      const shank = this.relapmiShank;
      const tipX = this.x + Math.cos(shank.angle) * shank.length;
      const tipY = this.centerY + Math.sin(shank.angle) * shank.length;
      // Shaft
      ctx.strokeStyle = '#111111';
      ctx.lineWidth = 6;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(this.x, this.centerY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      // Neon outline
      ctx.strokeStyle = '#33ff66';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.centerY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      // Sharp tip
      const dir = shank.angle;
      ctx.fillStyle = '#33ff66';
      ctx.beginPath();
      ctx.moveTo(tipX + Math.cos(dir) * 12, tipY + Math.sin(dir) * 12);
      ctx.lineTo(tipX + Math.cos(dir + 0.6) * 6, tipY + Math.sin(dir + 0.6) * 6);
      ctx.lineTo(tipX + Math.cos(dir - 0.6) * 6, tipY + Math.sin(dir - 0.6) * 6);
      ctx.closePath();
      ctx.fill();
    }

    // Spike ring
    if (this.relapmiSpikeRing) {
      const ring = this.relapmiSpikeRing;
      for (let i = 0; i < ring.spikes.length; i++) {
        const spike = ring.spikes[i];
        const sx = this.x + Math.cos(spike.angle) * spike.dist;
        const sy = this.centerY + Math.sin(spike.angle) * spike.dist;
        const alpha = ring.hit[i] ? 0.3 : 0.9;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.translate(sx, sy);
        ctx.rotate(spike.angle);
        // Diamond/spike shape
        ctx.fillStyle = '#111111';
        ctx.strokeStyle = '#33ff66';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(8, 0);
        ctx.lineTo(0, -4);
        ctx.lineTo(-5, 0);
        ctx.lineTo(0, 4);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.restore();
      }
    }
    ctx.restore();
  }

  // Six Iron-Nine Iron: golf balls + lasso
  if (this.char.isSixIron) {
    // Golf balls
    for (const ball of this.sixIronGolfBalls) {
      ctx.save();
      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = '#cccccc';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Dimple pattern
      ctx.fillStyle = '#ddd';
      ctx.beginPath();
      ctx.arc(ball.x - 1, ball.y - 1, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(ball.x + 2, ball.y + 1, 1, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    // Lasso
    if (this.sixIronLasso) {
      const lasso = this.sixIronLasso;
      ctx.save();
      ctx.strokeStyle = '#C4A35A';
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      // Rope from hand to lasso
      ctx.beginPath();
      ctx.moveTo(this.x + this.facing * 20, this.centerY - 10);
      // Wavy rope
      const midX = (this.x + lasso.x) / 2;
      const sag = 15 + Math.sin(Date.now() * 0.01) * 3;
      ctx.quadraticCurveTo(midX, this.centerY + sag, lasso.x, lasso.y);
      ctx.stroke();
      // Lasso loop at end
      ctx.strokeStyle = '#D4A04A';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(lasso.x, lasso.y, 15, 10, 0, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }

    // Club swing impact effect
    if (this.sixIronClubSwinging && this.sixIronClubTimer >= 12 && this.sixIronClubTimer <= 15) {
      ctx.save();
      ctx.globalAlpha = 0.6;
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 2;
      const impactX = this.x + this.facing * 65;
      const impactY = this.centerY;
      for (let i = 0; i < 5; i++) {
        const a = (i / 5) * Math.PI * 2;
        const r = 20;
        ctx.beginPath();
        ctx.moveTo(impactX + Math.cos(a) * 5, impactY + Math.sin(a) * 5);
        ctx.lineTo(impactX + Math.cos(a) * r, impactY + Math.sin(a) * r);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Six Driver: ground holes
    if (this.char.isSixDriver && this.sixDriverGroundHoles) {
      for (const hole of this.sixDriverGroundHoles) {
        ctx.save();
        ctx.translate(hole.x, this.groundY);
        // Dark hole
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.ellipse(0, 0, 12, 5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4a3520';
        ctx.lineWidth = 2;
        ctx.stroke();
        // Warning glow before firing
        if (!hole.fired && hole.timer < 15) {
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = (1 - hole.timer / 15) * 0.6;
          ctx.beginPath();
          ctx.ellipse(0, -2, 8, 3, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        // Smoke puff after firing
        if (hole.fired && hole.timer > -15) {
          ctx.fillStyle = '#aaa';
          ctx.globalAlpha = Math.max(0, (15 + hole.timer) / 30) * 0.4;
          ctx.beginPath();
          ctx.arc(0, -8, 6, 0, Math.PI * 2);
          ctx.fill();
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }
    }
  }

  // Twins: draw Selene using real fighter draw, bows on both, arrows
  if (this.char.isTwins && this.twin) {
    const tw = this.twin;

    // Create a proxy object with Selene's state so we can call the real draw()
    const seleneProxy = {
      char: { name: 'SELENE', color: this.char.twinColor, accent: this.char.twinAccent, outline: this.char.twinOutline },
      x: tw.x, y: tw.y, facing: tw.facing, grounded: tw.grounded,
      state: Math.abs(tw.vx) > 0.5 ? 'walk' : 'idle',
      vx: tw.vx, vy: tw.vy || 0,
      animTimer: tw.animTimer, animFrame: tw.animFrame,
      flashTimer: tw.flashTimer || 0,
      health: this.health, maxHealth: this.maxHealth,
      width: 30, height: 50, groundY: this.groundY,
      stateTimer: 0, attackFrame: 0, currentAttack: null,
      crouching: false, blocking: false, isPlayer: false,
      hitEffect: tw.hitEffect || null,
      teleportGhost: null, glitchTimer: 0,
      pendingCombo: null, comboFlash: 0,
      rubberArmReach: 0, rubberLegReach: 0, rubberStretch: 0,
      bojdoScale: 1, dancing: false, danceTimer: 0,
      armorActive: false, phaseTimer: 0, waterPhase: false,
      isJay: false, isTortoise: false, exploding: false,
      duplaireClones: [], buckFireworks: [], buckExplosions: [],
      haystackProjectiles: [], hayParticles: [],
      borgusLaser: null, borgusLaserCharging: 0,
      paletapSlamming: false, paletapSlamFrame: 0, paletapShockwave: null,
      matadorDashing: false, kwZapEffect: null,
      xhaustOilPuddles: [], xhaustFlames: [], xhaustLeaking: false,
      assistActive: null, assist: null,
      _hideFrontArm: false, _hideBackArm: false, _brushArmT: undefined, _rumbleAlpha: undefined, _rumbleRotation: 0,
      scalenaNeckExtend: 0, scalenaSnakes: [],
      mouthOpen: false, gourmandEnergy: 0, gourmandMaxEnergy: 100, gourmandProjectile: null,
      exorDraining: false, exorDrainTarget: null,
      buckFiring: false,
      get left() { return this.x - 15; },
      get right() { return this.x + 15; },
      get top() { return this.y - 50; },
      get centerY() { return this.y - 25; }
    };
    Fighter.prototype.draw.call(seleneProxy, ctx);

    // Bow on Selene (drawn on top)
    ctx.save();
    ctx.translate(tw.x, tw.y);
    const tf = tw.facing;
    const bowX = tf * 28;
    const bowY = -36;
    ctx.strokeStyle = '#5a3a1a';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(bowX, bowY, 18, -1.2, 1.2);
    ctx.stroke();
    ctx.strokeStyle = this.char.twinAccent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(bowX + Math.cos(-1.2) * 18, bowY + Math.sin(-1.2) * 18);
    ctx.lineTo(bowX + Math.cos(1.2) * 18, bowY + Math.sin(1.2) * 18);
    ctx.stroke();
    ctx.restore();

    // Selene arrows
    for (const arr of tw.arrows) {
      ctx.save();
      ctx.translate(arr.x, arr.y);
      ctx.fillStyle = this.char.twinAccent;
      ctx.strokeStyle = this.char.twinOutline;
      ctx.lineWidth = 2;
      const dir = arr.vx > 0 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(dir * 12, 0);
      ctx.lineTo(-dir * 8, -2);
      ctx.lineTo(-dir * 8, 2);
      ctx.closePath();
      ctx.fill();
      // Shaft
      ctx.strokeStyle = '#8B6B3D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dir * 10, 0);
      ctx.lineTo(-dir * 8, 0);
      ctx.stroke();
      ctx.restore();
    }

    // Bow on Helios (main body) — draw in world space
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.scale(this.facing, 1);
    ctx.strokeStyle = this.char.outline;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(20, -35, 18, -1.2, 1.2);
    ctx.stroke();
    ctx.strokeStyle = this.char.accent;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(20 + Math.cos(-1.2) * 18, -35 + Math.sin(-1.2) * 18);
    ctx.lineTo(20 + Math.cos(1.2) * 18, -35 + Math.sin(1.2) * 18);
    ctx.stroke();
    ctx.restore();

    // Helios arrows
    for (const arr of this.twinsArrows) {
      ctx.save();
      ctx.translate(arr.x, arr.y);
      ctx.fillStyle = this.char.accent;
      ctx.strokeStyle = this.char.outline;
      ctx.lineWidth = 2;
      const dir = arr.vx > 0 ? 1 : -1;
      ctx.beginPath();
      ctx.moveTo(dir * 12, 0);
      ctx.lineTo(-dir * 8, -2);
      ctx.lineTo(-dir * 8, 2);
      ctx.closePath();
      ctx.fill();
      ctx.strokeStyle = '#8B6B3D';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(dir * 10, 0);
      ctx.lineTo(-dir * 8, 0);
      ctx.stroke();
      ctx.restore();
    }
  }

  // Maneater: wings during hover
  if (this.char.isManeater && this.maneaterHovering && this.maneaterHoverTimer > 0) {
    ctx.save();
    const wingFlap = Math.sin(Date.now() * 0.015) * 0.4;
    const wingY = bodyOffsetY - 40;
    // Left wing
    ctx.save();
    ctx.translate(-18, wingY);
    ctx.rotate(-0.6 + wingFlap);
    ctx.fillStyle = 'rgba(100, 70, 40, 0.6)';
    ctx.strokeStyle = this.char.outline;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-35, -20, -55, -5);
    ctx.quadraticCurveTo(-40, 8, -20, 12);
    ctx.quadraticCurveTo(-8, 8, 0, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    // Wing veins
    ctx.strokeStyle = 'rgba(60, 40, 20, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(-5, 2); ctx.lineTo(-35, -8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-5, 4); ctx.lineTo(-30, 6); ctx.stroke();
    ctx.restore();
    // Right wing
    ctx.save();
    ctx.translate(18, wingY);
    ctx.rotate(0.6 - wingFlap);
    ctx.fillStyle = 'rgba(100, 70, 40, 0.6)';
    ctx.strokeStyle = this.char.outline;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(35, -20, 55, -5);
    ctx.quadraticCurveTo(40, 8, 20, 12);
    ctx.quadraticCurveTo(8, 8, 0, 0);
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.strokeStyle = 'rgba(60, 40, 20, 0.5)';
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(5, 2); ctx.lineTo(35, -8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(5, 4); ctx.lineTo(30, 6); ctx.stroke();
    ctx.restore();
    ctx.restore();
  }

  // Orcus: crown, skull face, lightning, spirits, soul drain
  if (this.char.isOrcus) {
    // Crown on top of head
    const crownY = this.y + bodyOffsetY - 8 - 40 - 32;
    const crownX = this.x + bodyOffsetX;
    ctx.save();
    ctx.translate(crownX, crownY);
    ctx.fillStyle = '#ccaa00';
    ctx.strokeStyle = '#886600';
    ctx.lineWidth = 1.5;
    // Crown base
    ctx.beginPath();
    ctx.moveTo(-14, 4);
    ctx.lineTo(-14, -4);
    ctx.lineTo(-8, 0);
    ctx.lineTo(-4, -10);
    ctx.lineTo(0, -2);
    ctx.lineTo(4, -10);
    ctx.lineTo(8, 0);
    ctx.lineTo(14, -4);
    ctx.lineTo(14, 4);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    // Jewels
    ctx.fillStyle = '#00ff44';
    ctx.beginPath(); ctx.arc(0, -1, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ff2222';
    ctx.beginPath(); ctx.arc(-7, 0, 2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(7, 0, 2, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Skull face design (drawn over the normal face)
    const skullY = this.y + bodyOffsetY - 8 - 40 - 16;
    const skullX = this.x + bodyOffsetX;
    ctx.save();
    ctx.translate(skullX, skullY);
    // Dark eye sockets (larger than normal eyes)
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(f * 5, -2, 5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(f * 12, -2, 5, 0, Math.PI * 2); ctx.fill();
    // Green glow in sockets
    ctx.fillStyle = '#00ff44';
    ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.006) * 0.3;
    ctx.beginPath(); ctx.arc(f * 5, -2, 3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(f * 12, -2, 3, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;
    // Nose hole
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(f * 8, 4, 1.5, 0, Math.PI * 2); ctx.fill();
    // Teeth/jaw line
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(f * 2, 8);
    for (let t = 0; t < 5; t++) {
      const tx = f * (2 + t * 2.5);
      ctx.lineTo(tx, t % 2 === 0 ? 8 : 11);
    }
    ctx.stroke();
    ctx.restore();

    // Soul drain beam (same visual as Exor)
    if (this.exorDraining && this.exorDrainTarget) {
      ctx.save();
      const target = this.exorDrainTarget;
      ctx.strokeStyle = '#00ff44';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.01) * 0.2;
      ctx.beginPath();
      ctx.moveTo(this.x, this.centerY - 10);
      ctx.lineTo(target.x, target.centerY - 10);
      ctx.stroke();
      ctx.globalAlpha = 1;
      // Soul particles
      for (const p of this.exorSoulParticles) {
        const px = p.x + (p.tx - p.x) * p.t;
        const py = p.y + (p.ty - p.y) * p.t;
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = '#00ff44';
        ctx.beginPath(); ctx.arc(px, py, 3, 0, Math.PI * 2); ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Green lightning
    for (const lt of this.orcusLightning) {
      ctx.save();
      const ltAlpha = Math.min(1, lt.timer / 10);
      ctx.globalAlpha = ltAlpha;
      for (const bolt of lt.bolts) {
        ctx.strokeStyle = '#00ff44';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(bolt[0].x, bolt[0].y);
        for (let s = 1; s < bolt.length; s++) {
          ctx.lineTo(bolt[s].x, bolt[s].y);
        }
        ctx.stroke();
        // Glow
        ctx.strokeStyle = '#88ffaa';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(bolt[0].x, bolt[0].y);
        for (let s = 1; s < bolt.length; s++) {
          ctx.lineTo(bolt[s].x + (Math.random() - 0.5) * 4, bolt[s].y + (Math.random() - 0.5) * 4);
        }
        ctx.stroke();
      }
      // Ground flash
      ctx.fillStyle = '#00ff44';
      ctx.globalAlpha = ltAlpha * 0.5;
      ctx.beginPath();
      ctx.ellipse(lt.x, this.groundY, 20, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }

    // Spirits
    for (const sp of this.orcusSpirits) {
      ctx.save();
      ctx.translate(sp.x, sp.y);
      const spGlow = 0.5 + Math.sin(Date.now() * 0.008 + sp.x) * 0.3;
      // Ghostly body
      ctx.globalAlpha = 0.7;
      ctx.fillStyle = sp.phase === 'return' ? '#44ff88' : '#88ffaa';
      ctx.beginPath();
      ctx.arc(0, 0, 10, 0, Math.PI * 2);
      ctx.fill();
      // Inner glow
      ctx.fillStyle = '#ffffff';
      ctx.globalAlpha = spGlow * 0.5;
      ctx.beginPath();
      ctx.arc(0, -2, 5, 0, Math.PI * 2);
      ctx.fill();
      // Eyes
      ctx.globalAlpha = 0.9;
      ctx.fillStyle = '#00ff44';
      const sf = sp.vx > 0 ? 1 : -1;
      ctx.beginPath(); ctx.arc(sf * 3, -2, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(sf * 7, -2, 2, 0, Math.PI * 2); ctx.fill();
      // Wispy tail
      ctx.strokeStyle = sp.phase === 'return' ? '#44ff88' : '#88ffaa';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.moveTo(0, 5);
      ctx.quadraticCurveTo(-sp.vx * 3, 10 + Math.sin(Date.now() * 0.01) * 3, -sp.vx * 5, 15);
      ctx.stroke();
      // Show stolen HP glow when returning
      if (sp.phase === 'return' && sp.stolenHP > 0) {
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#ff4444';
        ctx.font = 'bold 10px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('+' + Math.floor(sp.stolenHP), 0, -16);
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // Tube Warden: arm cannons, projectiles, gas clouds
  if (this.char.isTubeWarden) {
    // Arm cannons (cylindrical barrels at the fists)
    const cannonY = this.y + bodyOffsetY - 8 - 30;
    ctx.save();
    ctx.fillStyle = '#555';
    ctx.strokeStyle = '#333';
    ctx.lineWidth = 1.5;
    const cannonX = this.x + bodyOffsetX + f * 28;
    ctx.beginPath();
    ctx.roundRect(cannonX - 5, cannonY - 3, f * 16, 8, 2);
    ctx.fill();
    ctx.stroke();
    // Barrel glow
    ctx.fillStyle = '#00ccbb';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.arc(cannonX + f * 14, cannonY + 1, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();

    // Flying tubes
    for (const tube of this.twTubes) {
      ctx.save();
      ctx.translate(tube.x, tube.y);
      if (!tube.stuck) {
        // Rotate to match trajectory
        ctx.rotate(Math.atan2(tube.vy, tube.vx));
      } else {
        // Stuck in ground — angled slightly
        ctx.rotate(-0.3);
      }
      // Metal caps
      ctx.fillStyle = '#777';
      ctx.fillRect(-3, -12, 6, 4);
      ctx.fillRect(-3, 8, 6, 4);
      // Glass tube body
      ctx.fillStyle = 'rgba(0, 204, 187, 0.4)';
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.roundRect(-3, -8, 6, 16, 2);
      ctx.fill();
      ctx.stroke();
      // Inner glow
      ctx.fillStyle = '#00ccbb';
      ctx.globalAlpha = 0.7;
      ctx.fillRect(-1, -6, 2, 12);
      ctx.globalAlpha = 1;
      // Fuse warning when about to explode
      if (tube.stuck && tube.stuckTimer < 20) {
        ctx.globalAlpha = (tube.stuckTimer % 4 < 2) ? 0.8 : 0.2;
        ctx.fillStyle = '#ff4400';
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
      ctx.restore();
    }

    // Gas clouds
    for (const gas of this.twGasClouds) {
      ctx.save();
      const gAlpha = Math.min(1, gas.timer / 60) * 0.4;
      ctx.globalAlpha = gAlpha;
      // Multiple overlapping circles for cloud effect
      const drift = Math.sin(Date.now() * 0.002 + gas.x) * 5;
      ctx.fillStyle = '#00ccbb';
      ctx.beginPath(); ctx.arc(gas.x + drift, gas.y - 15, gas.radius * 0.8, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(gas.x - drift * 0.5 - 10, gas.y - 20, gas.radius * 0.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(gas.x + drift * 0.3 + 8, gas.y - 10, gas.radius * 0.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(gas.x - 5, gas.y - 25, gas.radius * 0.4, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // Scalena extended neck + head
  if (this.char.isScalena && this.scalenaNeckExtend > 0) {
    ctx.save();
    const neckLen = 120 * this.scalenaNeckExtend;
    const bodyX = this.x;
    const bodyY = this.centerY - 5;
    const headX = bodyX + this.facing * (30 + neckLen);
    const headY = bodyY;
    // Neck (wavy body segment)
    ctx.strokeStyle = this.char.color;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(bodyX + this.facing * 15, bodyY);
    const midX = bodyX + this.facing * (15 + neckLen * 0.5);
    const wave = Math.sin(Date.now() * 0.008) * 6 * this.scalenaNeckExtend;
    ctx.quadraticCurveTo(midX, bodyY + wave, headX, headY);
    ctx.stroke();
    // Neck underside lighter color
    ctx.strokeStyle = this.char.accent;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(bodyX + this.facing * 15, bodyY + 3);
    ctx.quadraticCurveTo(midX, bodyY + wave + 3, headX, headY + 3);
    ctx.stroke();
    // Head (diamond/snake head shape)
    ctx.fillStyle = this.char.color;
    ctx.beginPath();
    ctx.moveTo(headX + this.facing * 14, headY);
    ctx.lineTo(headX, headY - 9);
    ctx.lineTo(headX - this.facing * 8, headY);
    ctx.lineTo(headX, headY + 9);
    ctx.closePath();
    ctx.fill();
    ctx.strokeStyle = this.char.outline;
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Eyes
    ctx.fillStyle = '#ffcc00';
    ctx.beginPath();
    ctx.arc(headX + this.facing * 4, headY - 4, 2.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(headX + this.facing * 4, headY - 4, 1, 0, Math.PI * 2);
    ctx.fill();
    // Bite flash
    if (this.scalenaBiting && this.scalenaNeckExtend > 0.9) {
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(headX + this.facing * 10, headY, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
    }
    ctx.restore();
  }

  // Scalena summoned snakes
  if (this.char.isScalena && this.scalenaSnakes.length > 0) {
    ctx.save();
    for (const snake of this.scalenaSnakes) {
      if (snake.emergeTimer > 0) {
        // Rising from ground: draw partial snake emerging
        const emergeT = 1 - snake.emergeTimer / 20;
        ctx.globalAlpha = emergeT;
        ctx.fillStyle = '#44aa44';
        ctx.beginPath();
        ctx.arc(snake.x, snake.y - emergeT * 8, 4, 0, Math.PI * 2);
        ctx.fill();
        // Ground disturb particles
        ctx.fillStyle = '#8B7355';
        for (let p = 0; p < 3; p++) {
          const px = snake.x + (Math.random() - 0.5) * 16;
          ctx.fillRect(px, snake.y - 2, 3, 3);
        }
        ctx.globalAlpha = 1;
      } else {
        // Full snake — similar to Serpent assist draw
        ctx.save();
        ctx.translate(snake.x, snake.y);
        ctx.strokeStyle = '#336633';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, 0);
        for (let s = 1; s <= 4; s++) {
          const sx = -snake.vx * s * 2 + Math.sin(Date.now() * 0.01 + s + snake.x) * 3;
          const sy = -snake.vy * s * 2 + Math.cos(Date.now() * 0.01 + s + snake.x) * 3;
          ctx.lineTo(sx, sy);
        }
        ctx.stroke();
        // Head
        ctx.fillStyle = '#44aa44';
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        // Eye
        ctx.fillStyle = '#ff0';
        ctx.beginPath();
        ctx.arc(snake.vx > 0 ? 2 : -2, -1.5, 1, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
    }
    ctx.restore();
  }

  // Paletap shockwave
  if (this.paletapShockwave) {
    const sw = this.paletapShockwave;
    const progress = sw.timer / sw.maxTimer;
    const swHeight = 90 * Math.max(0, 1 - progress * 0.5);
    const swAlpha = Math.max(0, 1 - progress);
    ctx.save();
    ctx.translate(sw.x, sw.y);
    ctx.globalAlpha = swAlpha * 0.7;
    // Ground crack
    ctx.strokeStyle = this.char.accent;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-20, 0);
    ctx.lineTo(20, 0);
    ctx.stroke();
    // Shockwave wave shape
    ctx.fillStyle = this.char.accent;
    ctx.globalAlpha = swAlpha * 0.4;
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.quadraticCurveTo(-15, -swHeight * 0.6, 0, -swHeight);
    ctx.quadraticCurveTo(15, -swHeight * 0.6, 25, 0);
    ctx.closePath();
    ctx.fill();
    // Shockwave outline
    ctx.globalAlpha = swAlpha * 0.8;
    ctx.strokeStyle = this.char.accent;
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-25, 0);
    ctx.quadraticCurveTo(-15, -swHeight * 0.6, 0, -swHeight);
    ctx.quadraticCurveTo(15, -swHeight * 0.6, 25, 0);
    ctx.stroke();
    // Debris particles
    for (let i = 0; i < 3; i++) {
      const px = (Math.sin(sw.timer * 0.5 + i * 2) * 15);
      const py = -(Math.abs(Math.sin(sw.timer * 0.3 + i)) * swHeight * 0.5);
      ctx.fillStyle = '#888';
      ctx.globalAlpha = swAlpha * 0.6;
      ctx.fillRect(px - 2, py - 2, 4, 4);
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Assist projectile
  if (this.assistActive) {
    ctx.save();
    this.drawAssistProjectile(this.assistActive);
    ctx.restore();
  }

  // Combo counter
  if (this.comboCount > 1 && this.comboTimer > 0) {
    ctx.save();
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ff0';
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    const comboX = this.x;
    const comboY = this.top - 30;
    ctx.strokeText(`${this.comboCount} HIT COMBO!`, comboX, comboY);
    ctx.fillText(`${this.comboCount} HIT COMBO!`, comboX, comboY);
    ctx.restore();
  }

  // Combo name display
  if (this.comboNameDisplay && this.comboNameTimer > 0) {
    ctx.save();
    ctx.font = 'bold 22px Arial';
    ctx.textAlign = 'center';
    ctx.globalAlpha = Math.min(1, this.comboNameTimer / 15);
    const ny = this.top - 55 - (60 - this.comboNameTimer) * 0.5;
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 4;
    ctx.strokeText(this.comboNameDisplay, this.x, ny);
    ctx.fillStyle = this.char.accent;
    ctx.fillText(this.comboNameDisplay, this.x, ny);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Combo flash glow
  if (this.comboFlash > 0) {
    ctx.save();
    ctx.globalAlpha = this.comboFlash / 20 * 0.6;
    ctx.fillStyle = this.char.accent;
    ctx.shadowColor = this.char.accent;
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(this.x, this.centerY, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // DOT effect particles (burn/poison)
  if (this.dotEffect) {
    ctx.save();
    for (let i = 0; i < 5; i++) {
      const px = this.x + (Math.sin(Date.now() * 0.01 + i * 2) * 20);
      const py = this.centerY + (Math.cos(Date.now() * 0.013 + i * 1.5) * 25);
      ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.02 + i) * 0.2;
      ctx.fillStyle = this.dotEffect.color;
      ctx.shadowColor = this.dotEffect.color;
      ctx.shadowBlur = 8;
      ctx.beginPath();
      ctx.arc(px, py, 3 + Math.sin(Date.now() * 0.015 + i) * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Frozen effect
  if (this.frozenTimer > 0) {
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#aaeeff';
    ctx.fillRect(this.x - 25, this.top, 50, this.height);
    // Ice crystals
    ctx.globalAlpha = 0.7;
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    for (let i = 0; i < 4; i++) {
      const cx = this.x - 15 + i * 10;
      const cy = this.top + 10 + i * 20;
      ctx.beginPath();
      ctx.moveTo(cx, cy - 6);
      ctx.lineTo(cx + 5, cy);
      ctx.lineTo(cx, cy + 6);
      ctx.lineTo(cx - 5, cy);
      ctx.closePath();
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Killa Watt electric stun effect (vibration + sparks)
  if (this.kwStunTimer > 0) {
    ctx.save();
    // Vibration offset
    const vx = (Math.random() - 0.5) * 6;
    const vy = (Math.random() - 0.5) * 4;
    // Electric glow overlay
    ctx.globalAlpha = 0.3 + Math.random() * 0.2;
    ctx.fillStyle = '#00e5ff';
    ctx.fillRect(this.x - 25 + vx, this.top + vy, 50, this.height);
    // Sparks around body
    ctx.globalAlpha = 0.9;
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 2;
    for (let i = 0; i < 5; i++) {
      const sx = this.x + (Math.random() - 0.5) * 40;
      const sy = this.top + Math.random() * this.height;
      const ex = sx + (Math.random() - 0.5) * 16;
      const ey = sy + (Math.random() - 0.5) * 16;
      ctx.beginPath();
      ctx.moveTo(sx, sy);
      ctx.lineTo((sx + ex) / 2 + (Math.random() - 0.5) * 8, (sy + ey) / 2);
      ctx.lineTo(ex, ey);
      ctx.stroke();
    }
    ctx.restore();
  }

  // Slow effect (blue tint afterimages)
  if (this.slowTimer > 0) {
    ctx.save();
    ctx.globalAlpha = 0.15;
    ctx.fillStyle = '#4488ff';
    ctx.beginPath();
    ctx.arc(this.x - this.facing * 8, this.centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Armor effect (golden shield outline)
  if (this.armorActive) {
    ctx.save();
    ctx.globalAlpha = 0.4 + Math.sin(Date.now() * 0.008) * 0.2;
    ctx.strokeStyle = '#ffd700';
    ctx.shadowColor = '#ffd700';
    ctx.shadowBlur = 12;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(this.x - 30, this.top - 5, 60, this.height + 10, 10);
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Phase effect (already handled by globalAlpha in main draw, add shimmer)
  if (this.phaseTimer > 0) {
    ctx.save();
    ctx.globalAlpha = 0.2;
    ctx.fillStyle = '#aa88cc';
    ctx.beginPath();
    ctx.arc(this.x + Math.sin(Date.now() * 0.01) * 15, this.centerY, 25, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Torrena water phase effect
  if (this.waterPhase) {
    ctx.save();
    ctx.globalAlpha = 0.15 + Math.sin(Date.now() * 0.008) * 0.05;
    ctx.fillStyle = '#44ddff';
    ctx.beginPath();
    ctx.arc(this.x + Math.sin(Date.now() * 0.006) * 10, this.centerY, 30, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.x - Math.sin(Date.now() * 0.009) * 8, this.centerY - 15, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Chain hits lightning
  if (this.chainHits) {
    ctx.save();
    ctx.strokeStyle = '#ffff00';
    ctx.shadowColor = '#ffff00';
    ctx.shadowBlur = 10;
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.6 + Math.random() * 0.4;
    for (let i = 0; i < 2; i++) {
      ctx.beginPath();
      ctx.moveTo(this.x + (Math.random() - 0.5) * 30, this.top + Math.random() * 20);
      ctx.lineTo(this.x + (Math.random() - 0.5) * 20, this.centerY);
      ctx.lineTo(this.x + (Math.random() - 0.5) * 30, this.y - 10);
      ctx.stroke();
    }
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Teleport ghost
  if (this.teleportGhost) {
    ctx.save();
    ctx.globalAlpha = this.teleportGhost.timer / 12 * 0.4;
    ctx.fillStyle = this.char.color;
    ctx.beginPath();
    ctx.arc(this.teleportGhost.x, this.teleportGhost.y - 45, 16, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(this.teleportGhost.x - 16, this.teleportGhost.y - 48, 32, 40);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Haystack projectiles (drawn even when not exploding, for lingering projectiles)
  if (this.char.isHaystack) {
    this.drawHaystackProjectiles(ctx);
  }
};

Fighter.prototype.drawEricthoPortal = function(ctx) {
  const p = this.ericthoPortal;
  if (!p) return;
  ctx.save();
  // Reset to world coordinates
  ctx.resetTransform();
  const scaleX = canvas.width / 960;
  const scaleY = canvas.height / 540;
  ctx.scale(scaleX, scaleY);

  let alpha = 1;
  let portalScale = 1;
  if (p.phase === 'enter') {
    portalScale = p.timer / p.maxTimer;
    alpha = portalScale;
  } else if (p.phase === 'exit') {
    portalScale = p.timer / p.maxTimer;
    alpha = portalScale;
  } else if (p.phase === 'fade') {
    alpha = 1 - p.timer / p.maxTimer;
    portalScale = 1;
  }

  ctx.globalAlpha = alpha;
  ctx.translate(p.x, p.y);

  // Portal: dark purple oval on ground with swirling energy
  const w = 40 * portalScale;
  const h = 10 * portalScale;

  // Shadow/depth
  ctx.fillStyle = '#0a0015';
  ctx.beginPath();
  ctx.ellipse(0, 0, w, h, 0, 0, Math.PI * 2);
  ctx.fill();

  // Inner glow
  ctx.fillStyle = '#6622aa';
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.8, h * 0.8, 0, 0, Math.PI * 2);
  ctx.fill();

  // Bright core
  ctx.fillStyle = '#bb66ff';
  ctx.beginPath();
  ctx.ellipse(0, 0, w * 0.5, h * 0.5, 0, 0, Math.PI * 2);
  ctx.fill();

  // Swirling particles
  const time = Date.now() * 0.005;
  for (let i = 0; i < 6; i++) {
    const angle = time + (i / 6) * Math.PI * 2;
    const r = w * 0.6;
    const px = Math.cos(angle) * r;
    const py = Math.sin(angle) * h * 0.6;
    ctx.fillStyle = i % 2 === 0 ? '#dd88ff' : '#7733bb';
    ctx.beginPath();
    ctx.arc(px, py, 2 + Math.sin(time + i) * 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Rising wisps when entering/exiting
  if (p.phase === 'enter' || p.phase === 'exit') {
    for (let i = 0; i < 4; i++) {
      const wispT = (p.timer / p.maxTimer + i * 0.25) % 1;
      ctx.globalAlpha = alpha * (1 - wispT) * 0.6;
      ctx.fillStyle = '#bb66ff';
      ctx.beginPath();
      ctx.arc((Math.sin(i * 2.5 + time) * w * 0.4), -wispT * 50, 3 - wispT * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
};


