Fighter.prototype.update = function(opponent, keys) {
  // Practice mode health regen
  if (gameMode === 'practice') {
    if (this.practiceRegenDelay > 0) {
      this.practiceRegenDelay--;
    } else if (this.health < this.maxHealth) {
      this.health = Math.min(this.maxHealth, this.health + 2);
      if (this.char.isDuplaire) {
        const totalBodies = 1 + this.duplaireClones.filter(c => c.active).length;
        const sectionMax = this.maxHealth / totalBodies;
        this.duplaireOrigHealth = Math.min(sectionMax, this.duplaireOrigHealth + 2);
        for (const c of this.duplaireClones) {
          if (c.active) c.cloneHealth = Math.min(c.cloneMaxHealth, c.cloneHealth + 2);
        }
      }
    }
    if (this.health <= 0) this.health = 1; // never die in practice
  }

  // Timers
  if (this.flashTimer > 0) this.flashTimer--;
  if (this.assistCooldown > 0) this.assistCooldown--;
  if (this.comboTimer > 0) { this.comboTimer--; if (this.comboTimer === 0) this.comboCount = 0; }
  if (this.comboFlash > 0) this.comboFlash--;
  if (this.comboNameTimer > 0) this.comboNameTimer--;

  // Status effect timers
  if (this.frozenTimer > 0) {
    this.frozenTimer--;
    // Frozen: can't do anything
    return;
  }
  if (this.slowTimer > 0) this.slowTimer--;
  if (this.armorTimer > 0) { this.armorTimer--; if (this.armorTimer <= 0) this.armorActive = false; }
  if (this.phaseTimer > 0) this.phaseTimer--;
  if (this.bojShrinkTimer > 0) this.bojShrinkTimer--;
  if (this.cyanoJayTimer > 0) {
    this.cyanoJayTimer--;
    if (this.cyanoJayTimer <= 0) this.isJay = false;
  }
  if (this.studTortoiseTimer > 0) {
    this.studTortoiseTimer--;
    if (this.studTortoiseTimer <= 0) this.isTortoise = false;
  }
  if (this.stickerSlowTimer > 0) this.stickerSlowTimer--;

  // Teleport ghost fade
  if (this.teleportGhost) {
    this.teleportGhost.timer--;
    if (this.teleportGhost.timer <= 0) this.teleportGhost = null;
  }

  // DOT processing
  if (this.dotEffect) {
    this.dotEffect.tickTimer++;
    if (this.dotEffect.tickTimer >= this.dotEffect.tickInterval) {
      this.dotEffect.tickTimer = 0;
      const dotDmg = this.dotEffect.tickDamage;
      if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
        const activeClones = this.duplaireClones.filter(c => c.active);
        const totalBodies = 1 + activeClones.length;
        const share = dotDmg / totalBodies;
        this.duplaireOrigHealth -= share;
        for (const c of activeClones) c.cloneHealth -= share;
        for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
          if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
        }
        this.health = this.duplaireOrigHealth;
        for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
      } else {
        this.health -= dotDmg;
        if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
      }
      this.flashTimer = 4;
      this.dotEffect.ticksRemaining--;
      if (this.health <= 0) this.health = 0;
      if (gameMode === 'practice') this.practiceRegenDelay = 60;
      if (this.dotEffect.ticksRemaining <= 0) this.dotEffect = null;
    }
  }

  // Chain hits processing
  if (this.chainHits) {
    this.chainHits.timer++;
    if (this.chainHits.timer >= this.chainHits.interval) {
      this.chainHits.timer = 0;
      const chainDmg = this.chainHits.damage;
      if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
        const activeClones = this.duplaireClones.filter(c => c.active);
        const totalBodies = 1 + activeClones.length;
        const share = chainDmg / totalBodies;
        this.duplaireOrigHealth -= share;
        for (const c of activeClones) c.cloneHealth -= share;
        for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
          if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
        }
        this.health = this.duplaireOrigHealth;
        for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
      } else {
        this.health -= chainDmg;
        if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
      }
      this.flashTimer = 3;
      this.chainHits.remaining--;
      if (this.health <= 0) this.health = 0;
      if (gameMode === 'practice') this.practiceRegenDelay = 60;
      if (this.chainHits.remaining <= 0) this.chainHits = null;
    }
  }

  // Hit effect
  if (this.hitEffect) {
    this.hitEffect.timer--;
    if (this.hitEffect.timer <= 0) this.hitEffect = null;
  }

  // Assist projectile
  if (this.assistActive) {
    const a = this.assistActive;
    a.timer--;
    if (a.isWeedthorn) {
      a.eruptPhase++;
      if (!a.hit && a.eruptPhase > 5 && a.eruptPhase < 30 && Math.abs(a.x - opponent.x) < 45 && opponent.y > a.y - 90) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 20, blockstun: 10, launch: true }, this.facing, false, { x: a.x, y: a.y });
        a.hit = true;
      }
      if (a.timer <= 0) this.assistActive = null;
    } else if (a.isAphid) {
      // Fly down toward opponent
      const dx = opponent.x - a.x;
      a.vx = dx * 0.05;
      a.x += a.vx;
      a.y += a.vy;
      if (!a.hit && opponent.isHitAt(a.x, a.y, 35, 40)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 18, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
        a.hit = true;
      }
      if (a.timer <= 0 || a.y > 500) this.assistActive = null;
    } else if (a.isWarper) {
      a.x += a.vx;
      if (!a.warped && (a.x < 0 || a.x > 960)) {
        // Warp to opposite side and keep moving same direction (Pac-Man style)
        a.x = a.x < 0 ? 960 : 0;
        a.warped = true;
      }
      if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
        a.hit = true;
      }
      if (a.timer <= 0 || (a.warped && (a.x < 0 || a.x > 960))) this.assistActive = null;
    } else if (a.isFloat) {
      a.x += a.vx;
      a.vy += 0.25; // gravity
      a.y += a.vy;
      if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
        a.hit = true;
      }
      if (a.timer <= 0 || a.y > 500 || a.x < 0 || a.x > 960) this.assistActive = null;
    } else if (a.isSerpent) {
      // Homing: steer toward opponent
      const dx = opponent.x - a.x;
      const dy = opponent.centerY - a.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      a.vx += (dx / dist) * 0.3;
      a.vy += (dy / dist) * 0.3;
      const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
      if (spd > a.speed) { a.vx *= a.speed / spd; a.vy *= a.speed / spd; }
      a.x += a.vx;
      a.y += a.vy;
      if (a.biteCooldown > 0) a.biteCooldown--;
      if (a.biteCooldown <= 0 && opponent.isHitAt(a.x, a.y, 30, 30)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 20, blockstun: 10, launch: false }, this.facing, false, { x: a.x, y: a.y });
        a.biteCooldown = 60; // 1 second between bites
      }
      if (a.timer <= 0) this.assistActive = null;
    } else {
      // Standard projectile (also handles Boj, Jazz, Cyano, Stud, Sticker)
      a.x += a.vx;
      if (!a.hit && opponent.isHitAt(a.x, a.y, 40, 60)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = this.assist.damage * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 16, blockstun: 8, launch: false }, this.facing, false, { x: a.x, y: a.y });
        a.hit = true;
        // On-hit effects
        if (this.assist.isBoj) {
          opponent.bojShrinkTimer = 360;
        } else if (this.assist.isJazz) {
          this.health = Math.min(this.maxHealth, this.health + 20);
        } else if (this.assist.isCyano) {
          opponent.cyanoJayTimer = 480;
          opponent.isJay = true;
        } else if (this.assist.isStud) {
          opponent.studTortoiseTimer = 480;
          opponent.isTortoise = true;
        } else if (this.assist.isSticker) {
          opponent.stickerSlowTimer = 480;
        }
      }
      if (a.timer <= 0 || a.x < 0 || a.x > 960) this.assistActive = null;
    }
  }

  // Animation
  this.animTimer++;
  if (this.animTimer > 8) { this.animTimer = 0; this.animFrame = (this.animFrame + 1) % 4; }

  // Gravity
  if (!this.grounded) {
    if (this.isJay) {
      // Corvida jay form: no gravity, free flight
      this.vy *= 0.85; // dampen vertical velocity
      this.y += this.vy;
      // Clamp to stage bounds (don't fly off screen, but can touch ground to revert)
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.vy = 0;
        this.grounded = true;
        this.isJay = false;
      }
      if (this.y < 40) { this.y = 40; this.vy = 0; }
    } else if (this.molting) {
      // Bozollok molt: reduced gravity during ascent, no gravity during hover
      if (this.moltHover > 0 && this.vy >= -2) {
        // Hovering at apex - just dampen
        this.vy *= 0.7;
      } else if (this.moltHover > 0) {
        // Still ascending - light gravity only
        this.vy += 0.2;
      } else {
        // Descending - normal gravity
        this.vy += 0.5;
      }
      this.y += this.vy;
      // Ceiling clamp
      if (this.y < 60) { this.y = 60; this.vy = 0; }
    } else {
      this.vy += 0.5;
      this.y += this.vy;
      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.vy = 0;
        this.grounded = true;
        if (this.state === 'launched') {
          this.state = 'idle';
          this.stateTimer = 0;
        }
      }
    }
  }

  // Apply velocity with friction (skip while Erictho is in portal)
  if (!this.ericthoHidden) {
    this.x += this.vx;
    this.vx *= 0.85;
  }

  // Boundaries
  if (this.char.isTelatrine) {
    if (this.x < 20) { this.x = 940; this.teleportGhost = { x: 20, y: this.y, timer: 12 }; playSfx(sfx_warpWalk); }
    else if (this.x > 940) { this.x = 20; this.teleportGhost = { x: 940, y: this.y, timer: 12 }; playSfx(sfx_warpWalk); }
  } else if (!this.ericthoHidden) {
    if (this.x < 40) this.x = 40;
    if (this.x > 920) this.x = 920;
  }

  // Face opponent (skip while Erictho is in portal)
  if (this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'blockstun' && !this.ericthoHidden) {
    // Dark Duplaire / Twins: face closest entity
    if (opponent.char.isDarkDuplaire && this.isPlayer) {
      let closestX = opponent.x;
      let closestDist = Math.abs(this.x - opponent.x);
      for (const c of opponent.duplaireClones) {
        if (c.active) {
          const d = Math.abs(this.x - c.x);
          if (d < closestDist) { closestDist = d; closestX = c.x; }
        }
      }
      this.facing = closestX > this.x ? 1 : -1;
    } else {
      this.facing = opponent.x > this.x ? 1 : -1;
    }
  }

  // State timer
  if (this.stateTimer > 0) {
    this.stateTimer--;
    if (this.stateTimer === 0 && (this.state === 'attack' || this.state === 'hitstun' || this.state === 'blockstun')) {
      // Re-face opponent when recovering from stun
      if ((this.state === 'hitstun' || this.state === 'blockstun') && opponent) {
        this.facing = opponent.x > this.x ? 1 : -1;
      }
      this.state = 'idle';
      this.currentAttack = null;
      // Execute next queued attack if one was buffered
      if (this.queuedAttacks.length > 0) {
        const queued = this.queuedAttacks.shift();
        this.executeAttack(queued);
      }
    }
  }

  // Gourmand: full state prevents movement, projectile update
  if (this.gourmandFull) {
    this.vx = 0;
    this.state = 'idle';
  }
  if (this.gourmandProjectile) {
    const gp = this.gourmandProjectile;
    gp.x += gp.vx;
    gp.y += gp.vy;
    gp.timer--;
    // Hit detection
    if (!gp.hit && opponent.isHitAt(gp.x, gp.y, 40, 50)) {
      gp.hit = true;
      const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
      opponent.takeDamage(gp.damage * diffMult, { hitstun: 20, blockstun: 12, launch: gp.damage > 40, knockbackForce: 6 }, gp.vx > 0 ? 1 : -1, false, { x: gp.x, y: gp.y });
    }
    if (gp.timer <= 0 || gp.x < -20 || gp.x > 980 || gp.hit) {
      this.gourmandProjectile = null;
    }
  }

  // Borgus laser projectile update
  if (this.borgusLaser) {
    const bl = this.borgusLaser;
    bl.x += bl.vx;
    bl.timer--;
    if (!bl.hit && opponent.isHitAt(bl.x, bl.y, 30, 40)) {
      bl.hit = true;
      const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
      opponent.takeDamage(8 * this.char.stats.power * diffMult, { hitstun: 12, blockstun: 8, launch: false, knockbackForce: 3 }, bl.vx > 0 ? 1 : -1, false, { x: bl.x, y: bl.y });
    }
    if (bl.timer <= 0 || bl.x < -30 || bl.x > 990 || bl.hit) {
      this.borgusLaser = null;
    }
  }

  // The Count update: firework sweep, ground fireworks, explosions
  if (this.char.isTheCount) {
    const darkColors = ['#8B0000', '#CC5500', '#B8860B', '#006400', '#00008B', '#4B0082'];

    // Firing sweep: one pass up and down
    if (this.countFiring) {
      this.countFireTimer--;
      const progress = 1 - (this.countFireTimer / 90);
      // Single sweep: 0→PI (up then down)
      const aimAngle = Math.sin(progress * Math.PI) * (Math.PI / 2);
      if (this.countFireTimer % 4 === 0) {
        const spd = 7 + Math.random() * 3;
        const spread = (Math.random() - 0.5) * 0.25;
        const angle = aimAngle + spread;
        this.countFireworks.push({
          x: this.x + this.facing * 15,
          y: this.centerY - 15,
          vx: this.facing * Math.cos(angle) * spd,
          vy: -Math.sin(angle) * spd,
          color: darkColors[Math.floor(Math.random() * darkColors.length)],
          timer: 28 + Math.floor(Math.random() * 12),
          trail: []
        });
      }
      if (this.countFireTimer <= 0) this.countFiring = false;
    }

    // Update firework projectiles
    for (let i = this.countFireworks.length - 1; i >= 0; i--) {
      const fw = this.countFireworks[i];
      fw.trail.push({ x: fw.x, y: fw.y, timer: 8 });
      fw.x += fw.vx;
      fw.vy += 0.15;
      fw.y += fw.vy;
      fw.timer--;
      for (let t = fw.trail.length - 1; t >= 0; t--) {
        fw.trail[t].timer--;
        if (fw.trail[t].timer <= 0) fw.trail.splice(t, 1);
      }
      // Hit check
      if (opponent && opponent.isHitAt(fw.x, fw.y, 22, 32)) {
        // Explode on hit
        for (let e = 0; e < 10; e++) {
          const ea = Math.random() * Math.PI * 2;
          const es = 2 + Math.random() * 3;
          this.countExplosions.push({
            x: fw.x, y: fw.y,
            vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
            color: darkColors[Math.floor(Math.random() * darkColors.length)],
            timer: 12 + Math.floor(Math.random() * 8)
          });
        }
        // Final Count: add text explosions
        if (this.char.isTheCountFinal) {
          const highPhrases = ['BRAVO!', 'BRAVA!', 'BRAVISSIMO!', 'GOOD SHOW!'];
          const lowPhrases = ['THE HORROR!', 'THE PAIN!', 'THE AGONY!', 'SWEET SORROW!'];
          const phrases = this.health > 50 ? highPhrases : lowPhrases;
          this.countExplosions.push({
            x: fw.x, y: fw.y - 10, vx: 0, vy: -1.5,
            color: darkColors[Math.floor(Math.random() * darkColors.length)],
            timer: 30,
            text: phrases[Math.floor(Math.random() * phrases.length)]
          });
        }
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(3 * this.char.stats.power * diffMult,
          { hitstun: 5, blockstun: 3, launch: false }, this.facing, false, { x: fw.x, y: fw.y });
        this.countFireworks.splice(i, 1);
        continue;
      }
      // Expire
      if (fw.timer <= 0 || fw.x < 0 || fw.x > 960 || fw.y > 540) {
        for (let e = 0; e < 6; e++) {
          const ea = Math.random() * Math.PI * 2;
          const es = 1 + Math.random() * 2;
          this.countExplosions.push({
            x: fw.x, y: fw.y,
            vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
            color: darkColors[Math.floor(Math.random() * darkColors.length)],
            timer: 10 + Math.floor(Math.random() * 8)
          });
        }
        // Final Count: text on air explosions too
        if (this.char.isTheCountFinal) {
          const highPhrases = ['BRAVO!', 'BRAVA!', 'BRAVISSIMO!', 'GOOD SHOW!'];
          const lowPhrases = ['THE HORROR!', 'THE PAIN!', 'THE AGONY!', 'SWEET SORROW!'];
          const phrases = this.health > 50 ? highPhrases : lowPhrases;
          this.countExplosions.push({
            x: fw.x, y: fw.y - 10, vx: 0, vy: -1.5,
            color: darkColors[Math.floor(Math.random() * darkColors.length)],
            timer: 30,
            text: phrases[Math.floor(Math.random() * phrases.length)]
          });
        }
        this.countFireworks.splice(i, 1);
      }
    }

    // Update explosion particles
    for (let i = this.countExplosions.length - 1; i >= 0; i--) {
      const e = this.countExplosions[i];
      e.x += e.vx;
      e.y += e.vy;
      e.vy += 0.1;
      e.timer--;
      if (e.timer <= 0) this.countExplosions.splice(i, 1);
    }
  }

  // Relapmi update: ground spears, body shank, spike ring
  if (this.char.isRelapmi) {
    // Ground spears: rise, hold, retract
    for (let i = this.relapmiSpears.length - 1; i >= 0; i--) {
      const spear = this.relapmiSpears[i];
      spear.timer--;
      if (spear.timer > 35) {
        // Emerging (0 to 1 over 15 frames)
        spear.emergeT = Math.min(1, spear.emergeT + 1 / 12);
      } else if (spear.timer > 10) {
        spear.emergeT = 1; // fully up
      } else {
        // Retracting
        spear.emergeT = spear.timer / 10;
      }
      // Damage when fully emerged
      if (spear.emergeT > 0.7 && !spear.hit) {
        const spearTipY = spear.y - 80 * spear.emergeT;
        if (opponent.isHitAt(spear.x, spearTipY, 20, 40)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(10 * this.char.stats.power * diffMult,
            { hitstun: 18, blockstun: 10, launch: true, knockbackForce: 2 },
            this.facing, false, { x: spear.x, y: spearTipY });
          spear.hit = true;
        }
      }
      if (spear.timer <= 0) this.relapmiSpears.splice(i, 1);
    }

    // Body shank: spear extends from body in a direction
    if (this.relapmiShank) {
      const shank = this.relapmiShank;
      shank.timer--;
      if (shank.timer > 15) {
        // Extending
        shank.length = Math.min(shank.maxLen, shank.length + shank.maxLen / 8);
      } else if (shank.timer > 5) {
        // Holding
        shank.length = shank.maxLen;
      } else {
        // Retracting
        shank.length = shank.maxLen * (shank.timer / 5);
      }
      // Hit check at tip
      if (!shank.hit && shank.length > 40) {
        const tipX = this.x + Math.cos(shank.angle) * shank.length;
        const tipY = this.centerY + Math.sin(shank.angle) * shank.length;
        if (opponent.isHitAt(tipX, tipY, 30, 30)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(14 * this.char.stats.power * diffMult,
            { hitstun: 20, blockstun: 12, launch: false, knockbackForce: 5 },
            this.facing, false, { x: tipX, y: tipY });
          shank.hit = true;
        }
      }
      if (shank.timer <= 0) this.relapmiShank = null;
    }

    // Spike ring: expand outward with spiral
    if (this.relapmiSpikeRing) {
      const ring = this.relapmiSpikeRing;
      ring.timer--;
      for (let i = 0; i < ring.spikes.length; i++) {
        const spike = ring.spikes[i];
        spike.dist += spike.speed;
        spike.angle += 0.03; // spiral rotation
        const sx = this.x + Math.cos(spike.angle) * spike.dist;
        const sy = this.centerY + Math.sin(spike.angle) * spike.dist;
        // Hit check
        if (!ring.hit[i] && opponent.isHitAt(sx, sy, 18, 18)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(7 * this.char.stats.power * diffMult,
            { hitstun: 12, blockstun: 8, launch: false, knockbackForce: 3 },
            sx < opponent.x ? -1 : 1, false, { x: sx, y: sy });
          ring.hit[i] = true;
        }
      }
      if (ring.timer <= 0) this.relapmiSpikeRing = null;
    }
  }

  // Six Iron-Nine Iron update: club swing, golf balls, lasso
  if (this.char.isSixIron) {
    // Club swing animation
    if (this.sixIronClubSwinging) {
      this.sixIronClubTimer--;
      // Hit check at peak of swing (frame 12-15)
      if (this.sixIronClubTimer === 15) {
        const hitX = this.x + this.facing * 70;
        const hitY = this.centerY;
        const isDriver = this.char.isSixDriver;
        if (opponent.isHitAt(hitX, hitY, 45, 50)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const kb = isDriver ? 14 : 7;
          const dmg = isDriver ? 20 : 15;
          opponent.takeDamage(dmg * this.char.stats.power * diffMult,
            { hitstun: isDriver ? 28 : 22, blockstun: isDriver ? 18 : 14, launch: isDriver, knockbackForce: kb },
            this.facing, false, { x: hitX, y: hitY });
          shakeTimer = isDriver ? 8 : 4;
          shakeIntensity = isDriver ? 10 : 5;
        }
      }
      if (this.sixIronClubTimer <= 0) this.sixIronClubSwinging = false;
    }

    // Golf ball projectiles
    for (let i = this.sixIronGolfBalls.length - 1; i >= 0; i--) {
      const ball = this.sixIronGolfBalls[i];
      ball.x += ball.vx;
      ball.vy += 0.15; // gravity arc
      ball.y += ball.vy;
      ball.timer--;
      // Bounce off ground
      if (ball.y > this.groundY) {
        ball.y = this.groundY;
        ball.vy = -Math.abs(ball.vy) * 0.5;
        if (Math.abs(ball.vy) < 1) ball.timer = 0; // stop bouncing
      }
      if (!ball.hit && opponent.isHitAt(ball.x, ball.y, 20, 30)) {
        ball.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(8 * this.char.stats.power * diffMult,
          { hitstun: 14, blockstun: 8, launch: false, knockbackForce: 3 },
          ball.vx > 0 ? 1 : -1, false, { x: ball.x, y: ball.y });
      }
      if (ball.timer <= 0 || ball.hit || ball.x < -20 || ball.x > 980) {
        this.sixIronGolfBalls.splice(i, 1);
      }
    }

    // Lasso
    if (this.sixIronLasso) {
      const lasso = this.sixIronLasso;
      if (!lasso.hit) {
        lasso.x += lasso.vx;
        lasso.timer--;
        // Check if lasso reaches opponent
        if (opponent.isHitAt(lasso.x, lasso.y, 30, 40)) {
          lasso.hit = true;
          this.sixIronLassoPulling = true;
          this.sixIronLassoPullTimer = 30;
        }
        if (lasso.timer <= 0) this.sixIronLasso = null;
      }
    }

    // Pulling opponent closer with lasso
    if (this.sixIronLassoPulling) {
      this.sixIronLassoPullTimer--;
      const pullDir = this.x > opponent.x ? 1 : -1;
      opponent.x += pullDir * 6;
      opponent.vx = pullDir * 3;
      // Keep opponent from going past Six Iron
      if (Math.abs(opponent.x - this.x) < 50) {
        this.sixIronLassoPulling = false;
        this.sixIronLasso = null;
      }
      if (this.sixIronLassoPullTimer <= 0) {
        this.sixIronLassoPulling = false;
        this.sixIronLasso = null;
      }
    }

    // Six Driver: ground holes
    if (this.char.isSixDriver) {
      for (let i = this.sixDriverGroundHoles.length - 1; i >= 0; i--) {
        const hole = this.sixDriverGroundHoles[i];
        hole.timer--;
        if (hole.timer <= 0 && !hole.fired) {
          hole.fired = true;
          // Pop a golf ball straight up from the hole
          this.sixIronGolfBalls.push({
            x: hole.x,
            y: this.groundY,
            vx: (Math.random() - 0.5) * 3,
            vy: -10 - Math.random() * 4,
            timer: 90,
            hit: false
          });
        }
        if (hole.fired) {
          hole.timer--;
          if (hole.timer < -30) {
            this.sixDriverGroundHoles.splice(i, 1);
          }
        }
      }
    }
  }

  // Birdeater update: leg crush, tail strike, jump
  if (this.char.isBirdeater) {
    // Walk animation phase
    this.birdeaterLegPhase += 0.04;

    // Jump physics
    if (this.birdeaterJumping) {
      const isManeater = this.char.isManeater;

      // Maneater hover: pause at apex and hover with wings
      if (isManeater && this.maneaterHovering && this.maneaterHoverTimer > 0) {
        if (this.birdeaterJumpVy >= -2) {
          // At apex — hover
          this.birdeaterJumpVy *= 0.7; // dampen vertical
          this.maneaterHoverTimer--;
          // Drift toward player horizontally during hover
          const hoverDir = opponent.x > this.x ? 1 : -1;
          this.vx = hoverDir * 2;
          // Hover complete — fall
          if (this.maneaterHoverTimer <= 0) {
            this.maneaterHovering = false;
          }
        } else {
          // Still ascending — light gravity
          this.birdeaterJumpVy += 0.2;
        }
      } else {
        // Normal gravity (or Maneater done hovering)
        this.birdeaterJumpVy += 0.5;
        if (isManeater && this.maneaterHovering) this.maneaterHovering = false;
      }

      this.y += this.birdeaterJumpVy;
      this.x += this.vx;
      // Ceiling clamp
      if (this.y < 60) { this.y = 60; this.birdeaterJumpVy = 0; }

      if (this.y >= this.groundY) {
        this.y = this.groundY;
        this.grounded = true;
        this.birdeaterJumping = false;
        this.birdeaterJumpVy = 0;
        this.maneaterHovering = false;
        this.maneaterHoverTimer = 0;
        this.vx = 0;
        // Landing crush damage (Maneater: heavier)
        const crushRange = isManeater ? 80 : 60;
        if (Math.abs(this.x - opponent.x) < crushRange) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const crushDmg = isManeater ? 25 : 18;
          opponent.takeDamage(crushDmg * this.char.stats.power * diffMult,
            { hitstun: 25, blockstun: 15, launch: true, knockbackForce: isManeater ? 7 : 5 },
            this.facing, false, { x: this.x, y: this.groundY });
          shakeTimer = isManeater ? 12 : 8;
          shakeIntensity = isManeater ? 14 : 10;
        }
      }
    }

    // Tail strike animation
    if (this.birdeaterTailStriking) {
      this.birdeaterTailTimer--;
      // Hit check at the peak of the strike (frame 15-20)
      if (this.birdeaterTailTimer === 18) {
        const tailX = this.x - this.facing * 60; // tail strikes behind/above
        const tailY = this.centerY - 50;
        // Check wide area in front since tail swings over
        const isME = this.char.isManeater;
        const hitX = this.x + this.facing * (isME ? 110 : 80);
        const hitY = this.centerY - 30;
        if (opponent.isHitAt(hitX, hitY, isME ? 60 : 50, 50)) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          const tailDmg = isME ? 24 : 16;
          opponent.takeDamage(tailDmg * this.char.stats.power * diffMult,
            { hitstun: isME ? 26 : 22, blockstun: isME ? 16 : 12, launch: isME, knockbackForce: isME ? 8 : 6 },
            this.facing, false, { x: hitX, y: hitY });
          shakeTimer = isME ? 8 : 5;
          shakeIntensity = isME ? 9 : 6;
        }
      }
      if (this.birdeaterTailTimer <= 0) {
        this.birdeaterTailStriking = false;
      }
    }

    // Passive leg crush damage — when opponent is directly underneath
    if (this.grounded && !this.birdeaterJumping && this.birdeaterLegCrushCooldown <= 0) {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 45 && opponent.grounded) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(6 * this.char.stats.power * diffMult,
          { hitstun: 10, blockstun: 6, launch: false, knockbackForce: 2 },
          this.facing, false, { x: this.x, y: opponent.y });
        this.birdeaterLegCrushCooldown = 30; // 0.5s between crushes
      }
    }
  }

  // Twins update: Selene movement, arrows for both, facing override
  if (this.char.isTwins) {
    const tw = this.twin;

    // Move Selene
    tw.x += tw.vx;
    tw.vx *= 0.85;
    if (tw.x < 40) tw.x = 40;
    if (tw.x > 920) tw.x = 920;

    // Selene gravity + jumping
    if (!tw.grounded) {
      tw.vy += 0.5;
      tw.y += tw.vy;
      if (tw.y >= this.groundY) {
        tw.y = this.groundY;
        tw.vy = 0;
        tw.grounded = true;
      }
    }

    // Animation
    if (Math.abs(tw.vx) > 0.5 || !tw.grounded) {
      tw.animTimer++;
      if (tw.animTimer > 8) { tw.animTimer = 0; tw.animFrame = (tw.animFrame + 1) % 4; }
    } else {
      tw.animFrame = 0; tw.animTimer = 0;
    }

    if (tw.flashTimer > 0) tw.flashTimer--;

    // Update Helios arrows
    for (let i = this.twinsArrows.length - 1; i >= 0; i--) {
      const arr = this.twinsArrows[i];
      arr.x += arr.vx;
      arr.timer--;
      if (!arr.hit && opponent.isHitAt(arr.x, arr.y, 20, 25)) {
        arr.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(8 * this.char.stats.power * diffMult,
          { hitstun: 14, blockstun: 8, launch: false, knockbackForce: 2 },
          arr.vx > 0 ? 1 : -1, false, { x: arr.x, y: arr.y });
      }
      if (arr.timer <= 0 || arr.hit || arr.x < -20 || arr.x > 980) {
        this.twinsArrows.splice(i, 1);
      }
    }

    // Update Selene arrows
    for (let i = tw.arrows.length - 1; i >= 0; i--) {
      const arr = tw.arrows[i];
      arr.x += arr.vx;
      arr.timer--;
      if (!arr.hit && opponent.isHitAt(arr.x, arr.y, 20, 25)) {
        arr.hit = true;
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(8 * this.char.stats.power * diffMult,
          { hitstun: 14, blockstun: 8, launch: false, knockbackForce: 2 },
          arr.vx > 0 ? 1 : -1, false, { x: arr.x, y: arr.y });
      }
      if (arr.timer <= 0 || arr.hit || arr.x < -20 || arr.x > 980) {
        tw.arrows.splice(i, 1);
      }
    }

    // Player faces the closer twin
    if (opponent.isPlayer && opponent.state !== 'attack' && opponent.state !== 'hitstun' && opponent.state !== 'blockstun') {
      const distH = Math.abs(opponent.x - this.x);
      const distS = Math.abs(opponent.x - tw.x);
      const closerX = distH <= distS ? this.x : tw.x;
      opponent.facing = closerX > opponent.x ? 1 : -1;
    }

    // Selene can also take/deal melee damage — check overlap with player
    if (tw.state !== 'hitstun') {
      // Push apart
      const tOverlap = 40 - Math.abs(opponent.x - tw.x);
      if (tOverlap > 0 && Math.abs(opponent.y - tw.y) < 50) {
        const push = tOverlap / 2 + 0.5;
        if (opponent.x < tw.x) { tw.x += push; } else { tw.x -= push; }
      }
    }
  }

  // Hangman disassembly update
  if (this.char.isHangman && this.hangmanDisassembled) {
    const gY = this.groundY;
    // Target positions for each piece (relative to targetX, at groundY)
    const targetPositions = {
      'head':     { x: this.hangmanTargetX,      y: gY - 55 },
      'torso':    { x: this.hangmanTargetX,      y: gY - 30 },
      'leftArm':  { x: this.hangmanTargetX - 18, y: gY - 35 },
      'rightArm': { x: this.hangmanTargetX + 18, y: gY - 35 },
      'leftLeg':  { x: this.hangmanTargetX - 8,  y: gY - 10 },
      'rightLeg': { x: this.hangmanTargetX + 8,  y: gY - 10 }
    };
    const pieceTypes = ['head', 'torso', 'leftArm', 'rightArm', 'leftLeg', 'rightLeg'];
    this.hangmanLaunchTimer--;

    // Launch pieces one at a time
    if (this.hangmanPieceIndex < pieceTypes.length && this.hangmanLaunchTimer <= 0) {
      const type = pieceTypes[this.hangmanPieceIndex];
      const target = targetPositions[type];
      const startX = this.x;
      const startY = this.y - 50 + this.hangmanPieceIndex * 3;
      // Calculate velocity to arrive at target in ~25 frames with an arc
      const flightFrames = 25;
      const vx = (target.x - startX) / flightFrames;
      const vy = (target.y - startY) / flightFrames - 3; // arc upward bias
      this.hangmanPieces.push({
        type: type,
        x: startX, y: startY,
        vx: vx, vy: vy,
        targetX: target.x, targetY: target.y,
        flightTimer: flightFrames,
        landed: false,
        hitCooldown: 0
      });
      this.hangmanPieceIndex++;
      this.hangmanLaunchTimer = 12;
    }

    // Update flying pieces
    let allLanded = true;
    for (const piece of this.hangmanPieces) {
      if (piece.landed) continue;
      allLanded = false;
      piece.x += piece.vx;
      piece.y += piece.vy;
      piece.vy += 0.25; // gentle gravity for arc
      piece.flightTimer--;
      if (piece.hitCooldown > 0) piece.hitCooldown--;

      // Land when flight timer expires or close enough to target
      const distToTarget = Math.sqrt((piece.x - piece.targetX) ** 2 + (piece.y - piece.targetY) ** 2);
      if (piece.flightTimer <= 0 || distToTarget < 10) {
        piece.x = piece.targetX;
        piece.y = piece.targetY;
        piece.vx = 0; piece.vy = 0;
        piece.landed = true;
        continue;
      }

      // Damage player on contact while flying
      if (piece.hitCooldown <= 0 && opponent.isHitAt(piece.x, piece.y, 25, 25)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = (piece.type === 'head' ? 12 : 6) * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg,
          { hitstun: piece.type === 'head' ? 20 : 12, blockstun: 8, launch: false, knockbackForce: 3 },
          piece.vx > 0 ? 1 : -1, false, { x: piece.x, y: piece.y });
        piece.hitCooldown = 30;
      }
    }

    // All pieces launched and landed — reassemble
    if (this.hangmanPieceIndex >= pieceTypes.length && allLanded) {
      this.hangmanDisassembled = false;
      this.hangmanHidden = false;
      this.x = this.hangmanTargetX;
      this.y = this.groundY;
      this.grounded = true;
      this.hangmanPieces = [];
      this.facing = opponent.x > this.x ? 1 : -1;
    }
  }

  // Dark Bojdo: proximity shrink effect on opponent + HUD distortion
  if (this.char.isDarkBojdo) {
    // Proximity shrink: closer = smaller player, farther = bigger
    const dist = Math.abs(this.x - opponent.x);
    const maxDist = 400;
    const proxT = Math.min(1, dist / maxDist); // 0 = touching, 1 = far away
    // Player scale: 0.4 when touching, 1.3 when far
    const targetPlayerScale = 0.4 + proxT * 0.9;
    // Smoothly interpolate
    if (!opponent._darkBojdoScale) opponent._darkBojdoScale = 1.0;
    opponent._darkBojdoScale += (targetPlayerScale - opponent._darkBojdoScale) * 0.05;

    // HUD distortion: randomly shift HUD scale every few seconds
    if (this.darkBojdoHudTimer > 0) {
      this.darkBojdoHudTimer--;
      this.darkBojdoHudScale += (this.darkBojdoHudTarget - this.darkBojdoHudScale) * 0.05;
    } else {
      // Pick a new random distortion every 2-4 seconds
      this.darkBojdoHudTimer = 120 + Math.floor(Math.random() * 120);
      this.darkBojdoHudTarget = 0.6 + Math.random() * 0.8; // 0.6 to 1.4
    }
    this.darkBojdoHudScale += (this.darkBojdoHudTarget - this.darkBojdoHudScale) * 0.03;
  }

  // Head boss: charge roll, spit projectiles, rotation
  if (this.char.isHead) {
    const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;

    // Rotate based on movement
    if (Math.abs(this.vx) > 0.5) {
      this.headRotation += this.vx * 0.04;
    }

    // Charge-up
    if (this.headCharging) {
      this.headChargeTimer--;
      this.vx *= 0.9; // slow down while charging
      if (this.headChargeTimer <= 0) {
        this.headCharging = false;
        this.headRolling = true;
        this.headRollSpeed = this.facing * 16;
        this.headRollCooldown = 900; // 15 seconds
      }
    }

    // Fast roll
    if (this.headRolling) {
      this.vx = this.headRollSpeed;
      this.headRotation += this.headRollSpeed * 0.08;

      // Damage on contact
      if (Math.abs(this.x - opponent.x) < 50 && Math.abs(this.y - opponent.y) < 50) {
        opponent.takeDamage(18 * this.char.stats.power * diffMult,
          { hitstun: 20, blockstun: 14, launch: true, knockbackForce: 8 },
          this.headRollSpeed > 0 ? 1 : -1, false, { x: this.x, y: this.centerY });
      }

      // Hit wall — stop rolling
      if (this.x <= 40 || this.x >= 920) {
        this.headRolling = false;
        this.headRollSpeed = 0;
        this.vx = 0;
        shakeTimer = 8;
        shakeIntensity = 8;
      }
    }

    // Spit projectiles
    for (let i = this.headSpitProjectiles.length - 1; i >= 0; i--) {
      const sp = this.headSpitProjectiles[i];
      sp.x += sp.vx;
      sp.y += sp.vy;
      sp.vy += 0.15; // slight gravity
      sp.timer--;

      if (!sp.hit && opponent.isHitAt(sp.x, sp.y, 20, 20)) {
        sp.hit = true;
        opponent.takeDamage(7 * this.char.stats.power * diffMult,
          { hitstun: 12, blockstun: 8, launch: false, knockbackForce: 2 },
          sp.vx > 0 ? 1 : -1, false, { x: sp.x, y: sp.y });
      }

      if (sp.timer <= 0 || sp.hit || sp.x < -30 || sp.x > 990 || sp.y > this.groundY + 20) {
        this.headSpitProjectiles.splice(i, 1);
      }
    }
  }

  // Orcus: lightning, spirits, soul drain (drain reuses Exor's existing code path)
  if (this.char.isOrcus) {
    const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;

    // Soul drain update (same as Exor — fields are initialized in core)
    if (this.exorDrainCooldown > 0) this.exorDrainCooldown--;
    if (this.exorDraining && this.exorDrainTarget) {
      this.exorDrainTimer--;
      const target = this.exorDrainTarget;
      const dist = Math.abs(this.x - target.x);
      if (dist > 200) {
        this.exorDraining = false;
        this.exorDrainTarget = null;
        this.exorDrainCooldown = 180;
      } else {
        const drainRate = 0.5;
        target.health -= drainRate;
        if (target.health <= 0) target.health = 0;
        this.health = Math.min(this.maxHealth, this.health + drainRate);
        target.slowTimer = Math.max(target.slowTimer, 10);
        if (Math.random() < 0.3) {
          this.exorSoulParticles.push({
            x: target.x + (Math.random() - 0.5) * 30,
            y: target.centerY - 10 + (Math.random() - 0.5) * 30,
            tx: this.x, ty: this.centerY - 10,
            t: 0, speed: 0.03 + Math.random() * 0.02, life: 1
          });
        }
      }
      if (this.exorDrainTimer <= 0) {
        this.exorDraining = false;
        this.exorDrainTarget = null;
        this.exorDrainCooldown = 240;
      }
    }
    // Update soul particles
    for (let i = this.exorSoulParticles.length - 1; i >= 0; i--) {
      const p = this.exorSoulParticles[i];
      p.tx = this.x; p.ty = this.centerY - 10;
      p.t += p.speed;
      if (p.t >= 1) { this.exorSoulParticles.splice(i, 1); continue; }
      p.life = 1 - p.t;
    }

    // Lightning update
    for (let i = this.orcusLightning.length - 1; i >= 0; i--) {
      const lt = this.orcusLightning[i];
      lt.timer--;
      // Damage on first few frames
      if (lt.timer > 15) {
        if (Math.abs(lt.x - opponent.x) < 35 && opponent.y >= opponent.groundY - 10) {
          opponent.takeDamage(6 * this.char.stats.power * diffMult,
            { hitstun: 14, blockstun: 8, launch: false, knockbackForce: 2 },
            lt.x < opponent.x ? 1 : -1, false, { x: lt.x, y: opponent.groundY - 30 });
          lt.timer = Math.min(lt.timer, 15); // stop damage after first hit
        }
      }
      if (lt.timer <= 0) this.orcusLightning.splice(i, 1);
    }

    // Spirits update
    for (let i = this.orcusSpirits.length - 1; i >= 0; i--) {
      const sp = this.orcusSpirits[i];
      if (sp.hitCooldown > 0) sp.hitCooldown--;

      if (sp.phase === 'attack') {
        // Home toward player
        const dx = opponent.x - sp.x;
        const dy = (opponent.centerY - 10) - sp.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        sp.vx += (dx / dist) * 0.4;
        sp.vy += (dy / dist) * 0.4;
        const spd = Math.sqrt(sp.vx * sp.vx + sp.vy * sp.vy);
        if (spd > 5) { sp.vx *= 5 / spd; sp.vy *= 5 / spd; }
        sp.x += sp.vx;
        sp.y += sp.vy;

        // Hit player — steal 10 HP
        if (sp.hitCooldown <= 0 && Math.abs(sp.x - opponent.x) < 30 && Math.abs(sp.y - opponent.centerY) < 30) {
          const stealAmt = Math.min(10, opponent.health);
          opponent.health -= stealAmt;
          if (opponent.health <= 0) opponent.health = 0;
          opponent.flashTimer = 8;
          sp.stolenHP += stealAmt;
          sp.phase = 'return'; // head back to Orcus
          sp.vx = 0; sp.vy = 0;
        }
      } else {
        // Return to Orcus
        const dx = this.x - sp.x;
        const dy = (this.centerY - 10) - sp.y;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        sp.vx += (dx / dist) * 0.5;
        sp.vy += (dy / dist) * 0.5;
        const spd = Math.sqrt(sp.vx * sp.vx + sp.vy * sp.vy);
        if (spd > 6) { sp.vx *= 6 / spd; sp.vy *= 6 / spd; }
        sp.x += sp.vx;
        sp.y += sp.vy;

        // Deliver HP to Orcus
        if (dist < 30) {
          this.health = Math.min(this.maxHealth, this.health + sp.stolenHP);
          this.orcusSpirits.splice(i, 1);
          continue;
        }
      }

      // Spirits can be killed by player attacks (checked via isHitAt)
      // We check if player's attack hit position is near this spirit
      if (player && player.state === 'attack' && player.currentAttack) {
        const atk = player.currentAttack;
        const prog = player.attackFrame / (atk.startup + atk.active + atk.recovery);
        if (player.attackFrame >= atk.startup && player.attackFrame < atk.startup + atk.active) {
          const hitX = player.x + player.facing * atk.range;
          if (Math.abs(hitX - sp.x) < 40 && Math.abs(player.centerY - sp.y) < 40) {
            sp.hp -= 10; // one hit kills
            if (sp.hp <= 0) {
              // Spirit dies — player regains stolen HP
              if (sp.stolenHP > 0) {
                player.health = Math.min(player.maxHealth, player.health + sp.stolenHP);
                player.flashTimer = 4;
              }
              this.orcusSpirits.splice(i, 1);
              continue;
            }
          }
        }
      }
    }
  }

  // Tube Warden: tube projectiles and gas clouds
  if (this.char.isTubeWarden) {
    const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;

    // Update tubes
    for (let i = this.twTubes.length - 1; i >= 0; i--) {
      const tube = this.twTubes[i];
      if (!tube.stuck) {
        // In flight — apply gravity
        tube.vy += 0.35;
        tube.x += tube.vx;
        tube.y += tube.vy;

        // Hit player while flying
        if (opponent.isHitAt(tube.x, tube.y, 25, 30)) {
          opponent.takeDamage(12 * this.char.stats.power * diffMult,
            { hitstun: 16, blockstun: 10, launch: false, knockbackForce: 4 },
            tube.vx > 0 ? 1 : -1, false, { x: tube.x, y: tube.y });
          tube.stuck = true;
          tube.stuckTimer = 60;
          tube.y = Math.min(tube.y, this.groundY);
        }

        // Stick into ground
        if (tube.y >= this.groundY) {
          tube.y = this.groundY;
          tube.stuck = true;
          tube.stuckTimer = 60; // 1 second fuse before exploding
        }

        // Off screen
        if (tube.x < -50 || tube.x > 1010) {
          this.twTubes.splice(i, 1);
          continue;
        }
      } else {
        // Stuck — count down to explosion
        tube.stuckTimer--;
        if (tube.stuckTimer <= 0 && !tube.exploded) {
          tube.exploded = true;
          // Create gas cloud at explosion point
          this.twGasClouds.push({
            x: tube.x,
            y: this.groundY,
            timer: 180, // 3 seconds of lingering gas
            radius: 40
          });
          shakeTimer = 4;
          shakeIntensity = 4;
          // Explosion damage to nearby player
          if (Math.abs(tube.x - opponent.x) < 60 && Math.abs(this.groundY - opponent.y) < 60) {
            opponent.takeDamage(8 * this.char.stats.power * diffMult,
              { hitstun: 12, blockstun: 8, launch: false, knockbackForce: 2 },
              tube.x < opponent.x ? 1 : -1, false, { x: tube.x, y: this.groundY });
          }
          this.twTubes.splice(i, 1);
          continue;
        }
      }
    }

    // Update gas clouds — damage player standing in them
    for (let i = this.twGasClouds.length - 1; i >= 0; i--) {
      const gas = this.twGasClouds[i];
      gas.timer--;
      if (gas.timer <= 0) {
        this.twGasClouds.splice(i, 1);
        continue;
      }
      // Damage player every 30 frames if standing in gas
      if (gas.timer % 30 === 0) {
        const gDist = Math.abs(gas.x - opponent.x);
        if (gDist < gas.radius && opponent.y >= gas.y - 50) {
          opponent.takeDamage(3 * this.char.stats.power * diffMult,
            { hitstun: 8, blockstun: 4, launch: false, knockbackForce: 1 },
            gas.x < opponent.x ? 1 : -1, false, { x: gas.x, y: gas.y - 20 });
        }
      }
    }
  }

  // Scalena bite + snake update
  if (this.char.isScalena) {
    // Bite animation: extend neck forward, check hit at head, retract
    if (this.scalenaBiting) {
      this.scalenaBiteTimer--;
      const totalFrames = 40;
      const t = 1 - this.scalenaBiteTimer / totalFrames;
      if (t < 0.3) {
        // Extending: 0 to 1 over first 30%
        this.scalenaNeckExtend = t / 0.3;
      } else if (t < 0.5) {
        // Holding at full extension
        this.scalenaNeckExtend = 1;
        // Check hit at the head position
        if (this.scalenaBiteTimer === Math.floor(totalFrames * 0.5)) {
          const headX = this.x + this.facing * (30 + 120 * this.scalenaNeckExtend);
          const headY = this.centerY - 5;
          if (opponent.isHitAt(headX, headY, 40, 40)) {
            const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
            opponent.takeDamage(14 * this.char.stats.power * diffMult,
              { hitstun: 20, blockstun: 12, launch: false, knockbackForce: 4 },
              this.facing, false, { x: headX, y: headY });
          }
        }
      } else {
        // Retracting: 1 to 0 over last 50%
        this.scalenaNeckExtend = Math.max(0, 1 - (t - 0.5) / 0.5);
      }
      if (this.scalenaBiteTimer <= 0) {
        this.scalenaBiting = false;
        this.scalenaNeckExtend = 0;
      }
    }

    // Snake update: homing toward opponent, biting
    for (let i = this.scalenaSnakes.length - 1; i >= 0; i--) {
      const snake = this.scalenaSnakes[i];
      snake.timer--;
      if (snake.emergeTimer > 0) {
        snake.emergeTimer--;
        continue; // still rising from ground
      }
      if (snake.biteCooldown > 0) snake.biteCooldown--;
      // Homing toward opponent
      const dx = opponent.x - snake.x;
      const dy = (opponent.y - 25) - snake.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      snake.vx += (dx / dist) * 0.25;
      snake.vy += (dy / dist) * 0.25;
      const spd = Math.sqrt(snake.vx * snake.vx + snake.vy * snake.vy);
      if (spd > 3) { snake.vx *= 3 / spd; snake.vy *= 3 / spd; }
      snake.x += snake.vx;
      snake.y += snake.vy;
      // Bite
      if (snake.biteCooldown <= 0 && opponent.isHitAt(snake.x, snake.y, 25, 25)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(5 * this.char.stats.power * diffMult,
          { hitstun: 14, blockstun: 8, launch: false, knockbackForce: 1 },
          snake.x < opponent.x ? 1 : -1, false, { x: snake.x, y: snake.y });
        snake.biteCooldown = 70;
      }
      if (snake.timer <= 0) {
        this.scalenaSnakes.splice(i, 1);
      }
    }
  }

  // Quellic fire phase update (runs every frame)
  if (this.char.isQuellic) {
    if (this.quellicFireCooldown > 0) this.quellicFireCooldown--;
    if (this.quellicContactCooldown > 0) this.quellicContactCooldown--;

    if (this.quellicFirePhase) {
      this.quellicFireTimer--;
      if (this.quellicFireTimer <= 0) {
        // Fire phase expired
        this.quellicFirePhase = false;
        this.quellicFireCooldown = this.quellicFireCooldownMax;
      } else {
        // Contact damage: hurt opponent when overlapping
        const dist = Math.abs(this.x - opponent.x);
        if (dist < 45 && this.quellicContactCooldown <= 0) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(6 * this.char.stats.power * diffMult,
            { hitstun: 8, blockstun: 4, launch: false, knockbackForce: 2 },
            this.facing, true, { x: this.x, y: this.centerY }); // bypassBlock = true
          this.quellicContactCooldown = 20; // damage every 20 frames max
        }
      }
    }
  }

  // Erictho portal state machine (runs every frame)
  if (this.char.isErictho) {
    if (this.ericthoPortalCooldown > 0) this.ericthoPortalCooldown--;

    if (this.ericthoPortal) {
      const p = this.ericthoPortal;

      if (p.phase === 'enter') {
        p.timer++;
        if (p.timer >= p.maxTimer) {
          // Drop in — become hidden
          this.ericthoHidden = true;
          this.ericthoHiddenTimer = 0;
          this.ericthoExitChosen = false;
          this.x = -200; // move offscreen
          this.vx = 0;
          this.state = 'idle';
          this.ericthoPortal = { x: p.x, y: this.groundY, timer: 0, phase: 'fade', maxTimer: 15 };
        }
      } else if (p.phase === 'exit') {
        p.timer++;
        if (p.timer >= p.maxTimer) {
          // Pop out
          this.x = p.x;
          this.y = this.groundY;
          this.grounded = true;
          this.ericthoHidden = false;
          this.ericthoHiddenTimer = 0;
          this.facing = opponent.x > this.x ? 1 : -1;
          this.ericthoPortalCooldown = 180 + Math.floor(Math.random() * 120);
          this.ericthoPortal = { x: p.x, y: this.groundY, timer: 0, phase: 'fade', maxTimer: 15 };
        }
      } else if (p.phase === 'fade') {
        p.timer++;
        if (p.timer >= p.maxTimer) {
          this.ericthoPortal = null;
        }
      }
    }

    // While hidden, count up and open exit portal
    if (this.ericthoHidden) {
      this.ericthoHiddenTimer++;
      if (this.ericthoHiddenTimer > 45 && !this.ericthoExitChosen) {
        this.ericthoExitChosen = true;
        // Choose exit location
        let exitX;
        if (Math.random() < 0.6) {
          exitX = opponent.x + (opponent.facing * -80);
        } else {
          exitX = 100 + Math.random() * 760;
        }
        exitX = Math.max(60, Math.min(900, exitX));
        this.ericthoPortal = { x: exitX, y: this.groundY, timer: 0, phase: 'exit', maxTimer: 20 };
      }
    }
  }

  // Matador dash-slash update
  if (this.matadorDashCooldown > 0) this.matadorDashCooldown--;
  if (this.matadorDashing) {
    this.matadorDashTimer++;
    // Lerp position from start to end
    const t = Math.min(1, this.matadorDashTimer / this.matadorDashFrames);
    this.x = this.matadorDashStartX + (this.matadorDashEndX - this.matadorDashStartX) * t;
    this.vx = 0;
    this.state = 'idle';
    // Slash opponent when crossing their position
    if (!this.matadorDashHit) {
      const crossedX = this.facing === 1
        ? (this.matadorDashStartX <= opponent.x && this.x >= opponent.x - 30)
        : (this.matadorDashStartX >= opponent.x && this.x <= opponent.x + 30);
      if (crossedX && Math.abs(this.centerY - opponent.centerY) < 70) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = 18 * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { hitstun: 18, blockstun: 10, launch: false, knockbackForce: 0 }, this.facing, false, { x: opponent.x, y: this.centerY });
        this.matadorDashHit = true;
      }
    }
    // End dash when lerp completes
    if (t >= 1) {
      this.matadorDashing = false;
      this.matadorDashCooldown = 90;
      this.vx = 0;
      this.facing = opponent.x > this.x ? 1 : -1;
      // Force opponent to face correct direction after dash-through
      opponent.facing = this.x > opponent.x ? 1 : -1;
    }
  }
  // Buck firework spray update
  if (this.char.isBuck) {
    if (this.buckFireCooldown > 0) this.buckFireCooldown--;
    if (this.buckFiring) {
      this.buckFireTimer--;
      // Aim drifts between straight up (PI/2) and straight forward (0)
      // Use a sine wave so it sweeps smoothly
      const progress = 1 - (this.buckFireTimer / 360);
      const aimAngle = (Math.sin(progress * Math.PI * 4) * 0.5 + 0.5) * (Math.PI / 2); // 0 to PI/2
      // Spawn fireworks rapidly (every 3 frames)
      if (this.buckFireTimer % 3 === 0) {
        const colors = ['#ff0000', '#ffffff', '#0044cc'];
        const spd = 8 + Math.random() * 3;
        const spread = (Math.random() - 0.5) * 0.3;
        const angle = aimAngle + spread;
        this.buckFireworks.push({
          x: this.x + this.facing * 15,
          y: this.centerY - 15,
          vx: this.facing * Math.cos(angle) * spd,
          vy: -Math.sin(angle) * spd,
          color: colors[Math.floor(Math.random() * 3)],
          timer: 30 + Math.floor(Math.random() * 15),
          trail: []
        });
      }
      if (this.buckFireTimer <= 0) {
        this.buckFiring = false;
        this.buckFireCooldown = 480; // 8 second cooldown
      }
    }
    // Update firework projectiles
    for (let i = this.buckFireworks.length - 1; i >= 0; i--) {
      const fw = this.buckFireworks[i];
      fw.trail.push({ x: fw.x, y: fw.y, timer: 8 });
      fw.x += fw.vx;
      fw.vy += 0.15; // gravity
      fw.y += fw.vy;
      fw.timer--;
      // Remove old trail points
      for (let t = fw.trail.length - 1; t >= 0; t--) {
        fw.trail[t].timer--;
        if (fw.trail[t].timer <= 0) fw.trail.splice(t, 1);
      }
      // Check hit on opponent
      if (opponent) {
        const dx = fw.x - opponent.x;
        const dy = fw.y - (opponent.y - 30);
        if (Math.abs(dx) < 25 && Math.abs(dy) < 35) {
          // Explode on hit
          this.buckFireTimer = Math.max(this.buckFireTimer, 1); // keep firing
          const colors = ['#ff0000', '#ffffff', '#0044cc', '#ff4444', '#ffaa00'];
          const phrases = ['LIBERTY!', 'FREEDOM!', "'MERICA!", 'USA! USA!', 'JUSTICE!', 'GLORY!', 'BOOM!', 'YEEHAW!'];
          for (let e = 0; e < 12; e++) {
            const ea = Math.random() * Math.PI * 2;
            const es = 2 + Math.random() * 4;
            this.buckExplosions.push({
              x: fw.x, y: fw.y,
              vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
              color: colors[Math.floor(Math.random() * colors.length)],
              timer: 15 + Math.floor(Math.random() * 10)
            });
          }
          // Add text explosion
          this.buckExplosions.push({
            x: fw.x, y: fw.y, vx: 0, vy: -1.5,
            color: colors[Math.floor(Math.random() * colors.length)],
            timer: 30,
            text: phrases[Math.floor(Math.random() * phrases.length)]
          });
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(2 * diffMult, { hitstun: 4, blockstun: 2, height: 'mid', launch: false, name: 'Firework' }, this.facing, false, { x: fw.x, y: fw.y });
          this.buckFireworks.splice(i, 1);
          continue;
        }
      }
      // Explode when timer runs out or goes off screen
      if (fw.timer <= 0 || fw.x < 0 || fw.x > 960 || fw.y > 540) {
        // Air explosion
        const colors = ['#ff0000', '#ffffff', '#0044cc', '#ff4444', '#ffaa00'];
        const phrases = ['LIBERTY!', 'FREEDOM!', "'MERICA!", 'USA! USA!', 'JUSTICE!', 'GLORY!', 'BOOM!', 'YEEHAW!'];
        for (let e = 0; e < 8; e++) {
          const ea = Math.random() * Math.PI * 2;
          const es = 1 + Math.random() * 3;
          this.buckExplosions.push({
            x: fw.x, y: fw.y,
            vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
            color: colors[Math.floor(Math.random() * colors.length)],
            timer: 12 + Math.floor(Math.random() * 8)
          });
        }
        // Add text explosion
        this.buckExplosions.push({
          x: fw.x, y: fw.y, vx: 0, vy: -1,
          color: colors[Math.floor(Math.random() * colors.length)],
          timer: 25,
          text: phrases[Math.floor(Math.random() * phrases.length)]
        });
        this.buckFireworks.splice(i, 1);
      }
    }
    // Update explosion particles
    for (let i = this.buckExplosions.length - 1; i >= 0; i--) {
      const e = this.buckExplosions[i];
      e.x += e.vx;
      e.y += e.vy;
      e.vy += 0.1;
      e.vx *= 0.97;
      e.timer--;
      if (e.timer <= 0) this.buckExplosions.splice(i, 1);
    }
  }

  // Vortice tornado update
  if (this.char.isVortice) {
    if (this.vorticePushCooldown > 0) this.vorticePushCooldown--;
    // Push tornado timer
    if (this.vorticePushing) {
      this.vorticePushTimer--;
      if (this.vorticePushTimer <= 0) this.vorticePushing = false;
    }
    const tornadoActive = this.vorticeTornado || this.vorticePushing;
    if (tornadoActive && opponent) {
      const dx = this.x - opponent.x;
      const dist = Math.abs(dx);
      if (this.vorticePushing) {
        // Push opponent away — stronger the farther they get (inverse of pull)
        if (dist < 250) {
          const pushStrength = 1.5 * (dist / 250);
          opponent.vx += (dx > 0 ? -pushStrength : pushStrength);
        }
      } else {
        // Pull opponent closer (not Duplaire clones)
        if (dist > 30 && dist < 250) {
          const pullStrength = 1.5 * (1 - dist / 250);
          opponent.vx += (dx > 0 ? pullStrength : -pullStrength);
        }
      }
      // Spawn wind particles spiraling around player
      if (frameCount % 2 === 0) {
        const angle = Math.random() * Math.PI * 2;
        const startR = this.vorticePushing ? 10 + Math.random() * 20 : 40 + Math.random() * 60;
        this.vorticeTornadoParticles.push({
          x: this.x + Math.cos(angle) * startR,
          y: this.y - 20 - Math.random() * 70,
          angle: angle,
          r: startR,
          speed: 0.08 + Math.random() * 0.04,
          timer: 30 + Math.floor(Math.random() * 20),
          size: 2 + Math.random() * 3,
          pushing: this.vorticePushing
        });
      }
    }
    // Update tornado particles
    for (let i = this.vorticeTornadoParticles.length - 1; i >= 0; i--) {
      const p = this.vorticeTornadoParticles[i];
      p.angle += p.speed;
      if (p.pushing) {
        p.r += 1.2; // spiral outward
      } else {
        p.r -= 0.5; // spiral inward
      }
      p.y -= 0.5; // drift upward
      p.x = this.x + Math.cos(p.angle) * p.r;
      p.timer--;
      if (p.pushing) {
        if (p.timer <= 0 || p.r > 150) this.vorticeTornadoParticles.splice(i, 1);
      } else {
        if (p.timer <= 0 || p.r <= 5) this.vorticeTornadoParticles.splice(i, 1);
      }
    }
  }

  // X-haust oil & fire update
  if (this.char.isXhaust) {
    // Leak oil trail while L held and moving
    if (this.xhaustLeaking && this.xhaustOilTank > 0) {
      // Drop oil every 4 frames
      if (frameCount % 4 === 0) {
        const drainAmount = 2;
        this.xhaustOilTank = Math.max(0, this.xhaustOilTank - drainAmount);
        // Check if there's already a puddle nearby to extend
        let merged = false;
        for (const p of this.xhaustOilPuddles) {
          if (Math.abs(p.x - this.x) < p.width / 2 + 15) {
            // Extend existing puddle
            const left = Math.min(p.x - p.width / 2, this.x - 10);
            const right = Math.max(p.x + p.width / 2, this.x + 10);
            p.x = (left + right) / 2;
            p.width = right - left;
            merged = true;
            break;
          }
        }
        if (!merged) {
          this.xhaustOilPuddles.push({ x: this.x, y: this.groundY, width: 20 });
        }
      }
    }
    // Update flames & damage opponent
    for (let i = this.xhaustFlames.length - 1; i >= 0; i--) {
      const f = this.xhaustFlames[i];
      f.timer--;
      if (f.timer <= 0) { this.xhaustFlames.splice(i, 1); continue; }
      // Damage opponent if standing on fire
      if (opponent && f.timer % 10 === 0) {
        const oppDist = Math.abs(opponent.x - f.x);
        if (oppDist < f.width / 2 + 15 && opponent.grounded) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(5 * diffMult, { hitstun: 8, blockstun: 4, height: 'low', launch: false, name: 'Oil Fire' }, this.facing, false, { x: opponent.x, y: opponent.y });
        }
      }
    }
  }

  // Exor soul drain update
  if (this.char.isExor) {
    if (this.exorDrainCooldown > 0) this.exorDrainCooldown--;
    if (this.exorDraining && this.exorDrainTarget) {
      this.exorDrainTimer--;
      const target = this.exorDrainTarget;
      const dist = Math.abs(this.x - target.x);
      // Break drain if target gets too far
      if (dist > 200) {
        this.exorDraining = false;
        this.exorDrainTarget = null;
        this.exorDrainCooldown = 180;
      } else {
        // Drain HP: steal from target, give to self
        const drainRate = 0.4;
        target.health -= drainRate;
        if (target.health <= 0) target.health = 0;
        this.health = Math.min(this.maxHealth, this.health + drainRate);
        // Keep target slowed while draining
        target.slowTimer = Math.max(target.slowTimer, 10);
        // Spawn soul particles
        if (Math.random() < 0.3) {
          this.exorSoulParticles.push({
            x: target.x + (Math.random() - 0.5) * 30,
            y: target.centerY - 10 + (Math.random() - 0.5) * 30,
            tx: this.x,
            ty: this.centerY - 10,
            t: 0,
            speed: 0.03 + Math.random() * 0.02,
            life: 1
          });
        }
      }
      if (this.exorDrainTimer <= 0) {
        this.exorDraining = false;
        this.exorDrainTarget = null;
        this.exorDrainCooldown = 240; // 4 second cooldown
      }
    }
    // Update soul particles
    for (let i = this.exorSoulParticles.length - 1; i >= 0; i--) {
      const p = this.exorSoulParticles[i];
      p.t += p.speed;
      if (p.t >= 1) {
        this.exorSoulParticles.splice(i, 1);
      }
    }
  }

  // Backtrack: record history and update cooldown
  if (this.char.isBacktrack) {
    if (this.btRewindCooldown > 0) this.btRewindCooldown--;
    if (this.btRewindEffect > 0) this.btRewindEffect--;
    // Record comprehensive snapshot every frame using ring buffer
    const snapFighter = (f) => ({
      x: f.x, y: f.y, health: f.health, vx: f.vx, vy: f.vy,
      state: f.state, stateTimer: f.stateTimer, grounded: f.grounded,
      facing: f.facing, crouching: f.crouching, blocking: f.blocking,
      // Transformations
      isJay: f.isJay, isTortoise: f.isTortoise, isWolf: f.isWolf || false,
      bojdoScale: f.bojdoScale,
      // Assist
      assistActive: f.assistActive ? { ...f.assistActive } : null,
      assistCooldown: f.assistCooldown,
      // Effects on fighter
      slowTimer: f.slowTimer || 0,
      freezeTimer: f.freezeTimer || 0,
      bojShrinkTimer: f.bojShrinkTimer || 0,
      cyanoJayTimer: f.cyanoJayTimer || 0,
      studTortoiseTimer: f.studTortoiseTimer || 0,
      stickerSlowTimer: f.stickerSlowTimer || 0,
      // Abilities
      waterPhase: f.waterPhase || false,
      quellicFirePhase: f.quellicFirePhase || false,
      quellicFireTimer: f.quellicFireTimer || 0,
      quellicFireCooldown: f.quellicFireCooldown || 0,
      dancing: f.dancing || false,
      danceTimer: f.danceTimer || 0,
      exploding: f.exploding || false,
      reformTimer: f.reformTimer || 0,
      buckFiring: f.buckFiring || false,
      buckFireTimer: f.buckFireTimer || 0,
      molting: f.molting || false,
      moltHover: f.moltHover || 0,
      moltDescending: f.moltDescending || false,
      wolfFormTimer: f.wolfFormTimer || 0,
      wolfPouncing: f.wolfPouncing || false,
      // Gourmand
      gourmandEnergy: f.gourmandEnergy || 0,
      gourmandFull: f.gourmandFull || false,
      mouthOpen: f.mouthOpen || false,
      // X-Haust
      xhaustOilTank: f.xhaustOilTank || 0,
      xhaustLeaking: f.xhaustLeaking || false,
      xhaustOilPuddles: f.xhaustOilPuddles ? f.xhaustOilPuddles.map(p => ({ ...p })) : [],
      xhaustFlames: f.xhaustFlames ? f.xhaustFlames.map(fl => ({ ...fl })) : [],
      // Duplaire clones
      duplaireClones: f.duplaireClones ? f.duplaireClones.map(c => ({ ...c })) : [],
      duplaireOrigHealth: f.duplaireOrigHealth || 0,
      // Misc
      flashTimer: f.flashTimer || 0,
      phaseTimer: f.phaseTimer || 0,
      armorActive: f.armorActive || false,
      comboCount: f.comboCount || 0
    });
    this.btHistory[this.btHistoryIdx] = {
      self: snapFighter(this),
      opp: opponent ? snapFighter(opponent) : null
    };
    this.btHistoryIdx = (this.btHistoryIdx + 1) % this.btMaxHistory;
    if (this.btHistoryLen < this.btMaxHistory) this.btHistoryLen++;
  }

  // Killa Watt zap update
  if (this.char.isKillawatt) {
    if (this.kwZapCooldown > 0) this.kwZapCooldown--;
    if (this.kwZapEffect) {
      this.kwZapEffect.timer--;
      // Regenerate bolt paths for crackling effect
      if (this.kwZapEffect.timer % 3 === 0) {
        for (let b = 0; b < this.kwZapEffect.bolts.length; b++) {
          const bolt = this.kwZapEffect.bolts[b];
          const sx = bolt[0].x;
          const sy = bolt[0].y;
          const tx = bolt[bolt.length - 1].x;
          const ty = bolt[bolt.length - 1].y;
          for (let s = 1; s < bolt.length - 1; s++) {
            const t = s / (bolt.length - 1);
            bolt[s].x = sx + (tx - sx) * t + (Math.random() - 0.5) * 30;
            bolt[s].y = sy + (ty - sy) * t + (Math.random() - 0.5) * 20;
          }
        }
      }
      if (this.kwZapEffect.timer <= 0) this.kwZapEffect = null;
    }
  }
  // Stun vibration from Killa Watt zap
  if (this.kwStunTimer > 0) this.kwStunTimer--;

  // Matador roses: spawn when walking
  if (this.char.isMatador && this.state === 'walk' && Math.random() < 0.08) {
    const side = Math.random() < 0.5 ? -1 : 1; // from left or right
    this.matadorRoses.push({
      x: side < 0 ? this.x - 80 - Math.random() * 60 : this.x + 80 + Math.random() * 60,
      y: this.y - 100 - Math.random() * 80,
      vx: side * -(3 + Math.random() * 4),
      vy: 2 + Math.random() * 3,
      rot: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.2,
      timer: 60 + Math.floor(Math.random() * 30),
      landed: false,
      groundY: this.groundY + Math.random() * 5
    });
  }
  // Update rose particles
  for (let i = this.matadorRoses.length - 1; i >= 0; i--) {
    const r = this.matadorRoses[i];
    if (!r.landed) {
      r.x += r.vx;
      r.y += r.vy;
      r.vy += 0.15;
      r.rot += r.rotSpeed;
      if (r.y >= r.groundY) {
        r.y = r.groundY;
        r.landed = true;
        r.vx = 0;
        r.vy = 0;
      }
    }
    r.timer--;
    if (r.timer <= 0) this.matadorRoses.splice(i, 1);
  }

  // Paletap shockwave and slam update
  if (this.paletapShockCooldown > 0) this.paletapShockCooldown--;
  if (this.paletapSlamming) {
    this.paletapSlamFrame++;
    if (this.paletapSlamFrame >= 20) {
      // Slam complete — create shockwave
      this.paletapSlamming = false;
      this.paletapSlamFrame = 0;
      this.paletapShockwave = {
        x: this.x + this.facing * 30, y: this.groundY,
        vx: this.facing * 6, timer: 0, maxTimer: 90, hit: false
      };
      this.paletapShockCooldown = 120;
    }
  }
  if (this.paletapShockwave) {
    const sw = this.paletapShockwave;
    sw.x += sw.vx;
    sw.timer++;
    // Shockwave height: peaks at ~90px (player height) and decays
    const progress = sw.timer / sw.maxTimer;
    const swHeight = 90 * Math.max(0, 1 - progress * 0.5);
    // Hit detection: opponent must be grounded or low enough
    if (!sw.hit && opponent.isHitAt(sw.x, sw.y, 35, 70) && opponent.grounded && !opponent.crouching) {
      // Opponent is standing on ground, gets hit
      sw.hit = true;
      const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
      opponent.takeDamage(20 * this.char.stats.power * diffMult, { hitstun: 15, blockstun: 10, launch: false, knockbackForce: 5 }, sw.vx > 0 ? 1 : -1, false, { x: sw.x, y: sw.y });
    }
    // Also hit airborne opponents if they're low enough (not jumping high enough)
    if (!sw.hit && opponent.isHitAt(sw.x, sw.y, 35, 70) && !opponent.grounded && opponent.y > this.groundY - swHeight) {
      sw.hit = true;
      const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
      opponent.takeDamage(20 * this.char.stats.power * diffMult, { hitstun: 15, blockstun: 10, launch: false, knockbackForce: 5 }, sw.vx > 0 ? 1 : -1, false, { x: sw.x, y: sw.y });
    }
    if (sw.timer >= sw.maxTimer || sw.x < -20 || sw.x > 980) {
      this.paletapShockwave = null;
    }
  }

  // Bozollok molt cooldown and husk decomposition
  if (this.moltCooldown > 0) this.moltCooldown--;
  if (this.moltHusk) {
    this.moltHusk.timer--;
    if (this.moltHusk.timer <= 0) this.moltHusk = null;
  }
  // Bozollok molt hover and descent
  if (this.molting) {
    if (this.moltHover > 0) {
      this.moltHover--;
      if (this.moltHover <= 0) {
        this.moltDescending = true;
        this.vy = 6; // start descending fast
      }
    } else if (this.moltDescending) {
      // Attack opponents near landing point during descent
      if (opponent.isHitAt(this.x, this.y, 60, 45)) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const dmg = 30 * this.char.stats.power * diffMult;
        opponent.takeDamage(dmg, { damage: 30, knockback: 10, hitstun: 20, type: 'mid', startup: 0, active: 1, recovery: 0, range: 50 }, this.facing, false, { x: this.x, y: this.y });
        this.moltDescending = false; // only hit once per descent
      }
    }
    if (this.y >= this.groundY) {
      this.y = this.groundY;
      this.vy = 0;
      this.grounded = true;
      this.molting = false;
      this.moltDescending = false;
      this.moltHover = 0;
      // Force both fighters to face correct direction after landing
      this.facing = opponent.x > this.x ? 1 : -1;
      opponent.facing = this.x > opponent.x ? 1 : -1;
    }
  }

  // Codemax swap cooldown and glitch effect
  if (this.swapCooldown > 0) this.swapCooldown--;
  if (this.glitchTimer > 0) this.glitchTimer--;

  // Haystack explosion update
  if (this.exploding) {
    this.reformTimer--;
    if (this.reformTimer <= 0) {
      this.exploding = false;
    }
  }
  // Haystack projectile update
  for (let i = this.haystackProjectiles.length - 1; i >= 0; i--) {
    const p = this.haystackProjectiles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.15; // gravity
    p.timer--;
    if (!p.hit && opponent.isHitAt(p.x, p.y, 30, 40)) {
      const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
      const dmg = (p.type === 'sword' ? 18 : 8) * this.char.stats.power * diffMult;
      opponent.takeDamage(dmg, { hitstun: p.type === 'sword' ? 20 : 10, blockstun: 6, launch: false }, this.facing, false, { x: p.x, y: p.y });
      p.hit = true;
    }
    if (p.timer <= 0 || p.x < 0 || p.x > 960 || p.y > 500) {
      this.haystackProjectiles.splice(i, 1);
    }
  }
  // Hay particles update
  for (let i = this.hayParticles.length - 1; i >= 0; i--) {
    const hp = this.hayParticles[i];
    hp.x += hp.vx;
    hp.y += hp.vy;
    hp.vy += 0.1;
    hp.vx *= 0.98;
    hp.timer--;
    if (hp.timer <= 0) this.hayParticles.splice(i, 1);
  }

  // Duplaire clone update
  if (this.char.isDuplaire) {
    // Remove dead clones (cloneHealth <= 0)
    for (let ci = this.duplaireClones.length - 1; ci >= 0; ci--) {
      if (this.duplaireClones[ci].active && this.duplaireClones[ci].cloneHealth <= 0) {
        this.duplaireClones.splice(ci, 1);
      }
    }
    // Recalculate total health
    this.health = this.duplaireOrigHealth;
    for (const c of this.duplaireClones) {
      if (c.active) this.health += c.cloneHealth;
    }
    for (let ci = this.duplaireClones.length - 1; ci >= 0; ci--) {
      const clone = this.duplaireClones[ci];
      // Activation countdown
      if (!clone.active) {
        clone.activationTimer--;
        if (clone.activationTimer <= 0) clone.active = true;
        continue;
      }
      // Dark Duplaire: independent clone AI
      if (this.char.isDarkDuplaire && clone.aiTimer !== undefined) {
        // Gravity
        if (!clone.grounded) {
          clone.vy += 0.5;
          clone.y += clone.vy;
          if (clone.y >= this.groundY) {
            clone.y = this.groundY;
            clone.vy = 0;
            clone.grounded = true;
          }
        }
        // Face player
        clone.facing = opponent.x > clone.x ? 1 : -1;
        if (clone.flashTimer > 0) clone.flashTimer--;
        if (clone.attackCooldown > 0) clone.attackCooldown--;

        // Independent AI decisions
        clone.aiTimer--;
        if (clone.aiTimer <= 0) {
          clone.aiTimer = 20 + Math.floor(Math.random() * 25);
          const cDist = Math.abs(clone.x - opponent.x);
          if (cDist > 200) clone.aiAction = 'approach';
          else if (cDist < 60) clone.aiAction = Math.random() < 0.4 ? 'attack' : 'retreat';
          else clone.aiAction = Math.random() < 0.5 ? 'approach' : (Math.random() < 0.5 ? 'attack' : 'strafe');
        }

        // Movement
        const cSpeed = this.char.stats.speed;
        if (clone.state !== 'attack') {
          if (clone.aiAction === 'approach') {
            clone.vx = clone.facing * cSpeed;
          } else if (clone.aiAction === 'retreat') {
            clone.vx = -clone.facing * cSpeed;
          } else if (clone.aiAction === 'strafe') {
            clone.vx = (Math.random() < 0.5 ? 1 : -1) * cSpeed * 0.6;
          } else {
            clone.vx *= 0.8;
          }
        } else {
          clone.vx *= 0.8;
        }
        clone.x += clone.vx;
        clone.vx *= 0.85;
        if (clone.x < 40) clone.x = 40;
        if (clone.x > 920) clone.x = 920;

        // Jump occasionally
        if (clone.grounded && Math.random() < 0.008) {
          clone.vy = -10;
          clone.grounded = false;
        }

        // Independent attacks
        if (clone.aiAction === 'attack' && clone.attackCooldown <= 0 && clone.state !== 'attack') {
          const cDist = Math.abs(clone.x - opponent.x);
          if (cDist < 80) {
            const atkTypes = ['jab', 'lowKick', 'uppercut', 'highKick'];
            const atkType = atkTypes[Math.floor(Math.random() * atkTypes.length)];
            clone.state = 'attack';
            clone.currentAttack = attacks[atkType];
            clone.attackFrame = 0;
            clone.stateTimer = clone.currentAttack.startup + clone.currentAttack.active + clone.currentAttack.recovery;
            clone.attackCooldown = 30 + Math.floor(Math.random() * 20);
          }
        }

        // Walk animation
        if (Math.abs(clone.vx) > 0.5) {
          clone.animTimer++;
          if (clone.animTimer > 8) { clone.animTimer = 0; clone.animFrame = (clone.animFrame + 1) % 4; }
        } else {
          clone.animFrame = 0; clone.animTimer = 0;
        }

      } else {
        // Normal Duplaire: clones stay stationary, mirror jumps
        // Gravity
        if (!clone.grounded) {
          clone.vy += 0.5;
          clone.y += clone.vy;
          if (clone.y >= this.groundY) {
            clone.y = this.groundY;
            clone.vy = 0;
            clone.grounded = true;
          }
        }
        // Jump when main jumps
        if (!this.grounded && clone.grounded && this.vy < -5) {
          clone.vy = this.vy;
          clone.grounded = false;
        }
        if (clone.x < 40) clone.x = 40;
        if (clone.x > 920) clone.x = 920;
        // Mirror facing, crouching, blocking
        clone.facing = this.facing;
        clone.crouching = this.crouching;
        clone.blocking = this.blocking;
        clone.animTimer++;
        if (clone.animTimer > 8) { clone.animTimer = 0; clone.animFrame = (clone.animFrame + 1) % 4; }
        // Mirror attacks
        if (this.state === 'attack' && this.currentAttack && clone.state !== 'attack') {
          clone.state = 'attack';
          clone.currentAttack = this.currentAttack;
          clone.attackFrame = 0;
          clone.stateTimer = this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery;
        }
      }
      if (clone.state === 'attack' && clone.currentAttack) {
        clone.attackFrame++;
        clone.stateTimer--;
        const catk = clone.currentAttack;
        if (clone.attackFrame >= catk.startup && clone.attackFrame < catk.startup + catk.active) {
          const hitX = clone.x + clone.facing * catk.range;
          if (opponent.isHitAt(hitX, clone.y - 25, 50, 70)) {
            const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
            const cloneDmg = catk.damage * this.char.stats.power * diffMult / (1 + this.duplaireClones.filter(c => c.active).length);
            opponent.takeDamage(cloneDmg, catk, clone.facing, false, { x: clone.x + clone.facing * catk.range, y: clone.y - 25 });
          }
        }
        if (clone.stateTimer <= 0) {
          clone.state = 'idle';
          clone.currentAttack = null;
        }
      }
    }
  }

  // Canis wolf form update
  if (this.char.isCanis && this.isWolf) {
    // Pounce physics
    if (this.wolfPouncing) {
      // Check pounce hit on landing near opponent
      if (this.grounded) {
        this.wolfPouncing = false;
        if (Math.abs(this.x - opponent.x) < 50) {
          const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
          opponent.takeDamage(20 * this.char.stats.power * diffMult,
            { hitstun: 20, blockstun: 14, launch: false, knockbackForce: 6 },
            this.facing, false, { x: this.x, y: this.y });
          shakeTimer = 5;
          shakeIntensity = 6;
        }
        this.vx *= 0.3;
      }
    }
  }

  // Groove McSmooth: passive heal +3 HP/sec while walking
  if (this.char.isGrooveMcSmooth && Math.abs(this.vx) > 0.5 && this.health < this.maxHealth) {
    this.health = Math.min(this.maxHealth, this.health + 3 / 60); // 3 HP per second at 60fps
  }

  // Snazz McJazz dance timer
  if (this.dancing) {
    this.danceTimer--;
    if (this.danceTimer <= 0) {
      // Dance completed successfully - heal 25 HP
      this.dancing = false;
      this.health = Math.min(this.maxHealth, this.health + 25);
      this.comboFlash = 20;
      this.comboNameDisplay = 'GROOVE HEAL!';
      this.comboNameTimer = 60;
    }
  }

  // Update Rubberman stretch: store actual pixel distance the limb needs to reach
  if (this.char.isRubberman && this.state === 'attack' && this.currentAttack) {
    const dist = Math.abs(this.x - opponent.x);
    this.rubberStretch = Math.min(480, dist);
  } else {
    this.rubberStretch = 0;
  }

  // Attack hit detection
  if (this.state === 'attack' && this.currentAttack) {
    this.attackFrame++;
    const atk = this.currentAttack;
    if (this.attackFrame >= atk.startup && this.attackFrame < atk.startup + atk.active) {
      // Handle teleport effects before hit check
      let bypassBlock = false;
      if (atk.isCombo && this.pendingCombo) {
        if (this.pendingCombo.effect === 'shadow_step' && this.attackFrame === atk.startup) {
          // Teleport behind opponent
          this.teleportGhost = { x: this.x, y: this.y, timer: 12 };
          this.x = opponent.x + opponent.facing * 80;
          this.facing = opponent.x > this.x ? 1 : -1;
          bypassBlock = true;
        }
        if (this.pendingCombo.effect === 'teleport_strike' && this.attackFrame === atk.startup) {
          this.teleportGhost = { x: this.x, y: this.y, timer: 12 };
          this.x += this.facing * (this.pendingCombo.teleportDist || 60);
        }
      }

      const bojdoRange = this.char.isBojdo ? this.bojdoScale : 1;
      // Rubberman: range extends to reach opponent, up to half screen (480px)
      const rubbermanRange = this.char.isRubberman ? Math.max(1, Math.min(480, Math.abs(this.x - opponent.x)) / atk.range) : 1;
      const hitX = this.x + this.facing * atk.range * bojdoRange * rubbermanRange;
      // Check hit against main body or any Duplaire clone
      const hitRadius = 50 * (this.char.isBojdo ? this.bojdoScale : 1);
      let hitBody = (Math.abs(hitX - opponent.x) < hitRadius && Math.abs(this.centerY - opponent.centerY) < 70);
      let hitClonePos = null;
      if (!hitBody && opponent.char.isDuplaire) {
        for (const clone of opponent.duplaireClones) {
          if (clone.active && Math.abs(hitX - clone.x) < hitRadius && Math.abs(this.centerY - (clone.y - 25)) < 70) {
            hitBody = true;
            hitClonePos = { x: hitX, y: this.centerY };
            break;
          }
        }
      }
      // Twins: check if hit lands on Selene (the twin)
      if (!hitBody && opponent.char.isTwins && opponent.twin) {
        const tw = opponent.twin;
        if (Math.abs(hitX - tw.x) < hitRadius && Math.abs(this.centerY - (tw.y - 25)) < 70) {
          hitBody = true;
          hitClonePos = { x: hitX, y: this.centerY };
          tw.flashTimer = 8;
        }
      }
      if (hitBody) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        const bojdoPowerMult = this.char.isBojdo ? this.bojdoScale : 1;
        const bojShrinkPowMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 0.3 : 1;
        // Rubberman: damage falls off with distance (full at melee range, 25% at max stretch)
        const rubberDmgMult = this.char.isRubberman ? Math.max(0.25, 1 - (Math.abs(this.x - opponent.x) / 480) * 0.75) : 1;
        const jayDmgMult = this.isJay ? 0.3 : 1;
        const duplaireCount = this.char.isDuplaire ? 1 + this.duplaireClones.filter(c => c.active).length : 1;
        const dmg = atk.damage * this.char.stats.power * diffMult * bojdoPowerMult * bojShrinkPowMult * rubberDmgMult * jayDmgMult / duplaireCount;
        const didHit = opponent.takeDamage(dmg, atk, this.facing, bypassBlock, hitClonePos || { x: hitX, y: this.centerY });
        if (didHit) {
          this.comboCount++;
          this.comboTimer = 60;

          // X-haust: fill oil tank on hit
          if (this.char.isXhaust) {
            this.xhaustOilTank = Math.min(this.xhaustMaxOil, this.xhaustOilTank + 8);
          }

          // Apply combo special effects
          if (atk.isCombo && this.pendingCombo) {
            const combo = this.pendingCombo;
            switch (combo.effect) {
              case 'burn':
              case 'poison':
                opponent.dotEffect = {
                  ticksRemaining: combo.effectTicks,
                  tickDamage: combo.effectDamage,
                  tickInterval: Math.floor(combo.effectDuration / combo.effectTicks),
                  tickTimer: 0,
                  color: combo.effectColor
                };
                break;
              case 'freeze':
                opponent.frozenTimer = combo.effectDuration;
                opponent.state = 'hitstun';
                opponent.stateTimer = combo.effectDuration;
                break;
              case 'slow':
                opponent.slowTimer = combo.effectDuration;
                break;
              case 'armor':
                this.armorActive = true;
                this.armorTimer = combo.effectDuration;
                break;
              case 'earthquake':
                shakeTimer = combo.shakeDuration;
                shakeIntensity = combo.shakeIntensity;
                break;
              case 'chain':
                opponent.chainHits = {
                  remaining: combo.chainHits,
                  damage: combo.chainDamage,
                  timer: 0,
                  interval: 6
                };
                break;
              case 'phase':
                this.phaseTimer = combo.effectDuration;
                break;
              case 'knockback':
                opponent.vx = this.facing * (combo.knockbackForce || 8);
                break;
            }
            this.pendingCombo = null;
          }
        }
        // Prevent multi-hit
        this.attackFrame = atk.startup + atk.active;
      }
    }
  }

  // Input handling
  if (this.isPlayer) {
    this.handlePlayerInput(keys, opponent);
  } else {
    this.handleAI(opponent);
  }
};


