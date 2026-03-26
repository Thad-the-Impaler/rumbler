Fighter.prototype.startAttack = function(type) {
  // Torrena cannot attack while in water phase
  if (this.waterPhase) return;

  // Clear stale buffer if too much time has passed since last input
  if (frameCount - this.lastInputFrame > this.comboWindowFrames) {
    this.inputBuffer = [];
  }

  // Always record the input
  this.inputBuffer.push(type);
  this.lastInputFrame = frameCount;
  // Keep only last 6 inputs to prevent unbounded growth
  if (this.inputBuffer.length > 6) this.inputBuffer.shift();

  // If currently busy, queue the attack (limit to 1 so mashing doesn't keep punching after release)
  if (this.state === 'attack' || this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') {
    if (this.queuedAttacks.length < 1) {
      this.queuedAttacks.push(type);
    }
    return;
  }
  this.executeAttack(type);
};


Fighter.prototype.executeAttack = function(type) {
  // Check for combo match using the input buffer
  this.pendingCombo = null;
  const combos = characterCombos[this.char.name];
  if (combos && this.inputBuffer.length >= 3) {
    const last3 = this.inputBuffer.slice(-3);
    for (const combo of combos) {
      if (last3[0] === combo.sequence[0] && last3[1] === combo.sequence[1] && last3[2] === combo.sequence[2]) {
        this.pendingCombo = combo;
        this.inputBuffer = [];
        this.comboFlash = 20;
        this.comboNameDisplay = combo.name;
        this.comboNameTimer = 60;
        break;
      }
    }
  }

  this.state = 'attack';
  if (this.pendingCombo) {
    const base = attacks[type];
    this.currentAttack = {
      ...base,
      damage: base.damage * this.pendingCombo.damageMult,
      range: base.range + (this.pendingCombo.rangeBonus || 0),
      launch: this.pendingCombo.launch || base.launch,
      isCombo: true
    };
    // Combo-specific or generic combo sound
    const comboSound = comboSfxMap[this.pendingCombo.name];
    playSfx(comboSound || sfx_comboAttack);
  } else {
    this.currentAttack = attacks[type];
    // Character-specific and attack-type sound effects
    const isShade = this.char.name === 'SHADE';
    if (this.char.isRubberman) {
      playSfx(sfx_rubberStretch);
    } else if (isShade && (type === 'jab' || type === 'uppercut')) {
      playSfx(sfx_shadePunch);
    } else if (isShade && (type === 'lowKick' || type === 'highKick')) {
      playSfx(sfx_shadeKick);
    } else if (type === 'jab') {
      playSfx(sfx_jab);
    } else if (type === 'uppercut') {
      playSfx(sfx_uppercut);
    } else if (type === 'lowKick' || type === 'highKick') {
      playSfx(sfx_kick);
    }
  }
  this.attackFrame = 0;
  this.stateTimer = this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery;
};


Fighter.prototype.callAssist = function(opponent) {
  if (this.assistCooldown > 0 || !this.assist) return;
  this.assistCooldown = this.assist.cooldownTime;
  // Play assist sound effect
  if (this.assist.isSerpent) {
    playSfx(sfx_serpent);
  } else if (this.assist.isSticker) {
    playSfx(sfx_sticker);
  } else {
    playSfx(sfx_assistShoot);
  }
  if (this.assist.isWeedthorn) {
    this.assistActive = {
      x: opponent.x, y: opponent.groundY, vx: 0, timer: 45, hit: false,
      isWeedthorn: true, eruptPhase: 0
    };
  } else if (this.assist.isAphid) {
    this.assistActive = {
      x: opponent.x + (Math.random() - 0.5) * 60, y: 0, vx: 0, vy: 6, timer: 120, hit: false,
      isAphid: true, targetX: opponent.x
    };
  } else if (this.assist.isWarper) {
    this.assistActive = {
      x: this.x - this.facing * 30, y: this.centerY, vx: -this.facing * 10, timer: 90, hit: false,
      isWarper: true, warped: false
    };
  } else if (this.assist.isFloat) {
    this.assistActive = {
      x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 5, vy: -8, timer: 90, hit: false,
      isFloat: true
    };
  } else if (this.assist.isSerpent) {
    this.assistActive = {
      x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 3, vy: 0, timer: 600,
      isSerpent: true, speed: 3.5, biteCooldown: 0
    };
  } else {
    this.assistActive = {
      x: this.x + this.facing * 30, y: this.centerY, vx: this.facing * 8, timer: 60, hit: false
    };
  }
};


Fighter.prototype.isHitAt = function(px, py, radiusX, radiusY) {
  if (this.ericthoHidden) return false;
  if (Math.abs(px - this.x) < radiusX && Math.abs(py - this.centerY) < radiusY) return true;
  if (this.char.isDuplaire) {
    for (const clone of this.duplaireClones) {
      if (clone.active && Math.abs(px - clone.x) < radiusX && Math.abs(py - (clone.y - 25)) < radiusY) return true;
    }
  }
  return false;
};


Fighter.prototype.takeDamage = function(dmg, attackData, attackerFacing, bypassBlock, hitPos) {
  // Erictho: immune while inside portal
  if (this.ericthoHidden) return false;
  // Torrena water phase: immune to all damage
  if (this.waterPhase) return false;

  // Clear queued attacks when hit
  this.queuedAttacks = [];

  // Check blocking (shadow step bypasses)
  const isBlocking = this.blocking && this.state !== 'attack' && !bypassBlock;
  if (isBlocking) {
    const blockDmg = Math.max(1, dmg * 0.15);
    if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0) {
      // Blocking hits the original, whole bar goes down
      const activeClones = this.duplaireClones.filter(c => c.active);
      const totalBodies = 1 + activeClones.length;
      const share = blockDmg / totalBodies;
      this.duplaireOrigHealth -= share;
      for (const clone of activeClones) clone.cloneHealth -= share;
      for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
        if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
      }
      this.health = this.duplaireOrigHealth;
      for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
    } else {
      this.health -= blockDmg;
      if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
    }
    if (gameMode === 'practice') this.practiceRegenDelay = 60;
    this.state = 'blockstun';
    this.stateTimer = attackData.blockstun;
    this.vx = attackerFacing * 2;
    return false;
  }

  // Gourmand: absorb attack energy when mouth is open
  if (this.char.isGourmand && this.mouthOpen && !this.gourmandFull) {
    this.gourmandEnergy = Math.min(this.gourmandMaxEnergy, this.gourmandEnergy + dmg);
    this.health -= dmg / this.char.stats.defense;
    this.flashTimer = 4;
    if (this.health <= 0) this.health = 0;
    if (gameMode === 'practice') this.practiceRegenDelay = 60;
    this.hitEffect = { x: this.x, y: this.centerY - 10, timer: 8, type: 'small' };
    this.mouthOpen = false;
    // Become full if maxed out
    if (this.gourmandEnergy >= this.gourmandMaxEnergy) {
      this.gourmandFull = true;
    }
    return true;
  }

  const bojdoDefMult = this.char.isBojdo ? this.bojdoScale : 1;
  const bojShrinkDefMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 0.3 : 1;
  const tortoiseMult = this.isTortoise ? 0.4 : 1; // 60% reduction in tortoise form
  let finalDmg = dmg * tortoiseMult / (this.char.stats.defense * bojdoDefMult * bojShrinkDefMult);

  // Snazz McJazz: 2x damage if interrupted during dance
  if (this.dancing) {
    finalDmg *= 2;
    this.dancing = false;
    this.danceTimer = 0;
  }

  // Armor: reduce damage, skip hitstun
  if (this.armorActive) {
    finalDmg *= 0.5;
    if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0 && hitPos) {
      const activeClones = this.duplaireClones.filter(c => c.active);
      let closestClone = null;
      let closestDist = Math.abs(hitPos.x - this.x);
      for (const clone of activeClones) {
        const d = Math.abs(hitPos.x - clone.x);
        if (d < closestDist) { closestDist = d; closestClone = clone; }
      }
      if (closestClone) {
        closestClone.cloneHealth -= finalDmg;
        if (closestClone.cloneHealth <= 0) {
          closestClone.cloneHealth = 0;
          this.duplaireClones.splice(this.duplaireClones.indexOf(closestClone), 1);
        }
      } else {
        const totalBodies = 1 + activeClones.length;
        const share = finalDmg / totalBodies;
        this.duplaireOrigHealth -= share;
        for (const clone of activeClones) clone.cloneHealth -= share;
        for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
          if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
        }
      }
      this.health = this.duplaireOrigHealth;
      for (const c of this.duplaireClones) { if (c.active) this.health += c.cloneHealth; }
    } else {
      this.health -= finalDmg;
      if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
    }
    this.flashTimer = 4;
    if (this.health <= 0) this.health = 0;
    if (gameMode === 'practice') this.practiceRegenDelay = 60;
    // No hitstun, just flash
    this.hitEffect = { x: this.x, y: this.centerY - 10, timer: 8, type: 'small' };
    return true;
  }

  // Phase: halve damage
  if (this.phaseTimer > 0) {
    finalDmg *= 0.5;
  }

  // Duplaire: route damage to correct body
  if (this.char.isDuplaire && this.duplaireClones.filter(c => c.active).length > 0 && hitPos) {
    const activeClones = this.duplaireClones.filter(c => c.active);
    let closestClone = null;
    let closestDist = Math.abs(hitPos.x - this.x);
    for (const clone of activeClones) {
      const d = Math.abs(hitPos.x - clone.x);
      if (d < closestDist) { closestDist = d; closestClone = clone; }
    }
    if (closestClone) {
      // Hit a clone: only that clone takes damage
      closestClone.cloneHealth -= finalDmg;
      if (closestClone.cloneHealth <= 0) {
        closestClone.cloneHealth = 0;
        this.duplaireClones.splice(this.duplaireClones.indexOf(closestClone), 1);
      }
    } else {
      // Hit the original: whole healthbar goes down (all bodies take equal share)
      const totalBodies = 1 + activeClones.length;
      const share = finalDmg / totalBodies;
      this.duplaireOrigHealth -= share;
      for (const clone of activeClones) {
        clone.cloneHealth -= share;
        if (clone.cloneHealth <= 0) clone.cloneHealth = 0;
      }
      // Remove dead clones
      for (let i = this.duplaireClones.length - 1; i >= 0; i--) {
        if (this.duplaireClones[i].cloneHealth <= 0) this.duplaireClones.splice(i, 1);
      }
    }
    // Recalculate total health
    this.health = this.duplaireOrigHealth;
    for (const clone of this.duplaireClones) {
      if (clone.active) this.health += clone.cloneHealth;
    }
  } else {
    this.health -= finalDmg;
    if (this.char.isDuplaire) this.duplaireOrigHealth = this.health;
  }

  this.flashTimer = 8;
  shakeTimer = 6;
  shakeIntensity = Math.min(finalDmg * 0.5, 8);

  if (attackData.launch) {
    this.state = 'launched';
    this.vy = -10;
    this.vx = attackerFacing * 4;
    this.grounded = false;
    this.stateTimer = 40;
  } else {
    this.state = 'hitstun';
    this.stateTimer = attackData.hitstun;
    this.vx = attackerFacing * (attackData.knockbackForce != null ? attackData.knockbackForce : 3);
  }

  // Hit effect
  this.hitEffect = {
    x: this.x - attackerFacing * 10,
    y: this.centerY - 10,
    timer: 10,
    type: attackData.launch ? 'big' : 'small'
  };

  if (this.health <= 0) this.health = 0;
  // Infinite health in practice mode for the bag
  if (gameMode === 'practice') this.practiceRegenDelay = 60;
  return true;
};


