const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 960;
canvas.height = 540;

// Preloaded icon images
const iconImages = {};
const artikIconImg = new Image();
artikIconImg.onload = function() { iconImages['ARTIK'] = artikIconImg; };
artikIconImg.src = 'data:image/png;base64,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';
iconImages['ARTIK'] = artikIconImg;

// Preload portrait icons for versus screen (base64 embedded)
// [Extracted to data/assets.js]

// [Extracted to state/game-state.js]
// [Extracted to state/rumble-state.js]
// [Extracted to state/unlock-state.js]

class Fighter {
  constructor(charData, x, facing, isPlayer, assistData) {
    this.char = charData;
    this.x = x;
    this.y = 380;
    this.groundY = 380;
    this.facing = facing; // 1 = right, -1 = left
    this.isPlayer = isPlayer;
    this.vx = 0;
    this.vy = 0;
    this.health = 150;
    this.maxHealth = 150;
    this.practiceRegenDelay = 0; // frames until regen starts
    this.width = 50;
    this.height = 90;

    // State
    this.state = 'idle'; // idle, walk, attack, hitstun, blockstun, launched, crouching
    this.stateTimer = 0;
    this.currentAttack = null;
    this.attackFrame = 0;
    this.blocking = false;
    this.crouching = false;
    this.grounded = true;
    this.comboCount = 0;
    this.comboTimer = 0;

    // Animation
    this.animFrame = 0;
    this.animTimer = 0;
    this.flashTimer = 0;
    this.hitEffect = null;

    // Assist
    this.assist = assistData;
    this.assistCooldown = 0;
    this.assistActive = null;

    // Combo system
    this.inputBuffer = [];        // simple list of attack type strings
    this.lastInputFrame = 0;     // frame of last input
    this.comboWindowFrames = 180; // frames before buffer resets from inactivity
    this.queuedAttacks = [];     // queued attacks to execute in order
    this.pendingCombo = null;
    this.comboFlash = 0;
    this.comboNameDisplay = null;
    this.comboNameTimer = 0;

    // Status effects
    this.dotEffect = null;       // { ticksRemaining, tickDamage, tickInterval, tickTimer, color }
    this.frozenTimer = 0;
    this.slowTimer = 0;
    this.armorActive = false;
    this.armorTimer = 0;
    this.phaseTimer = 0;
    this.chainHits = null;       // { remaining, damage, timer, interval }
    this.teleportGhost = null;   // { x, y, timer }

    // Rubberman stretch tracking
    this.rubberStretch = 0;
    this.rubberArmReach = 0;
    this.rubberLegReach = 0;

    // Torrena water phase
    this.waterPhase = false;

    // Codemax swap
    this.swapCooldown = 0;
    this.glitchTimer = 0; // visual glitch effect after swap

    // Haystack explosion
    this.exploding = false;
    this.reformTimer = 0;
    this.reformMaxFrames = 60; // 1 second at 60fps
    this.haystackProjectiles = []; // { x, y, vx, vy, type: 'arrow'|'sword', hit: false, timer }
    this.hayParticles = []; // visual hay bits during explosion

    // Snazz McJazz dance
    this.dancing = false;
    this.danceTimer = 0;
    this.danceMaxFrames = 120; // 2 seconds at 60fps

    // Golgar twin entities
    this.golgarEntity = 1; // which entity is active (1 or 2)
    this.golgarOtherX = x + facing * 40; // dormant entity position
    this.golgarOtherY = 380;
    this.golgarOtherFacing = facing;

    // Duplaire clones
    this.duplaireClones = [];
    this.duplaireMaxClones = 6;
    this.duplaireOrigHealth = this.maxHealth; // original body's section health
    this._isCloneDraw = false;
    this._cloneAlpha = 1;

    // Buck firework spray
    this.buckFiring = false;
    this.buckFireTimer = 0;
    this.buckFireCooldown = 0;
    this.buckFireworks = []; // active firework projectiles
    this.buckExplosions = []; // explosion particles

    // Exor soul drain
    this.exorDraining = false;
    this.exorDrainTimer = 0;
    this.exorDrainCooldown = 0;
    this.exorDrainTarget = null;
    this.exorSoulParticles = []; // visual wisps flowing from target to Exor

    // Backtrack rewind
    this.btHistory = new Array(480); // ring buffer of { x, y, health } snapshots
    this.btHistoryIdx = 0; // current write position
    this.btHistoryLen = 0; // how many entries are filled
    this.btRewindCooldown = 0;
    this.btRewindEffect = 0; // visual effect timer
    this.btMaxHistory = 480; // 8 seconds at 60fps

    // Killa Watt zap
    this.kwZapCooldown = 0;
    this.kwZapEffect = null; // { target, timer, bolts }
    this.kwStunTimer = 0; // vibration when stunned by zap

    // Matador dash-slash
    this.matadorDashing = false;
    this.matadorDashTimer = 0;
    this.matadorDashFrames = 0;
    this.matadorDashCooldown = 0;
    this.matadorDashHit = false;
    this.matadorDashStartX = 0;
    this.matadorDashEndX = 0;
    this.matadorRoses = []; // decorative rose particles

    // Paletap shockwave
    this.paletapShockwave = null; // { x, y, vx, timer, maxTimer }
    this.paletapShockCooldown = 0;
    this.paletapSlamming = false;
    this.paletapSlamFrame = 0;

    // Batsch tortoise form
    this.isTortoise = false;
    this.lastCrouchPress = 0; // frame of last crouch press for double-tap detection
    this.batschCrouchPending = false;

    // Gourmand consume
    this.mouthOpen = false;
    this.gourmandEnergy = 0; // absorbed damage stored
    this.gourmandMaxEnergy = 80; // max before full
    this.gourmandFull = false; // can't move when full
    this.gourmandProjectile = null; // { x, y, vx, vy, damage, timer }

    // Bozollok molt
    this.molting = false; // currently in molt leap
    this.moltHover = 0; // hover frames remaining
    this.moltDescending = false; // descending with claw attack
    this.moltCooldown = 0;
    this.moltHusk = null; // { x, y, timer } decomposing husk

    // Corvida blue jay form
    this.isJay = false;
    this.lastJumpPress = 0; // frame of last jump key down for double-tap detection
    this.corvidaJayPending = false;
    this.jayScale = 0.7; // smaller in jay form

    // Bojdo scale system
    this.bojdoScale = 1.0; // 1.0 = normal, grows/shrinks with K/L
    this.bojShrinkTimer = 0; // Boj assist shrink effect
    this.cyanoJayTimer = 0; // Cyano assist jay form effect
    this.studTortoiseTimer = 0; // Stud assist tortoise form effect
    this.stickerSlowTimer = 0; // Sticker assist slow effect

    // X-haust oil & ignite
    this.xhaustOilTank = 0; // current oil amount (fills from combos)
    this.xhaustMaxOil = 100; // tank capacity
    this.xhaustLeaking = false; // currently dripping oil
    this.xhaustOilPuddles = []; // { x, y, width } placed on ground
    this.xhaustFlames = []; // { x, y, timer, width } active fire bursts

    // Vortice tornado
    this.vorticeTornado = false; // is pull tornado active (H held)
    this.vorticePushing = false; // is push tornado active (J pressed)
    this.vorticePushTimer = 0; // how long push lasts
    this.vorticeTornadoParticles = []; // visual wind particles
    this.vorticePushCooldown = 0; // J push cooldown

    // CPU AI
    this.aiTimer = 0;
    this.aiAction = null;
    this.aiReactTime = 20 + Math.random() * 20;
    this.aiComboQueue = [];
  }

  get left() { return this.x - this.width / 2; }
  get right() { return this.x + this.width / 2; }
  get top() { return this.y - this.height; }
  get centerY() { return this.y - this.height / 2; }

  startAttack(type) {
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
  }

  executeAttack(type) {
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
    } else {
      this.currentAttack = attacks[type];
    }
    this.attackFrame = 0;
    this.stateTimer = this.currentAttack.startup + this.currentAttack.active + this.currentAttack.recovery;
  }

  callAssist(opponent) {
    if (this.assistCooldown > 0 || !this.assist) return;
    this.assistCooldown = this.assist.cooldownTime;
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
  }

  drawWeedthorn(a) {
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
  }

  drawAssistProjectile(a) {
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
  }

  // Check if a point hits this fighter or any of its Duplaire clones
  isHitAt(px, py, radiusX, radiusY) {
    if (Math.abs(px - this.x) < radiusX && Math.abs(py - this.centerY) < radiusY) return true;
    if (this.char.isDuplaire) {
      for (const clone of this.duplaireClones) {
        if (clone.active && Math.abs(px - clone.x) < radiusX && Math.abs(py - (clone.y - 25)) < radiusY) return true;
      }
    }
    return false;
  }

  takeDamage(dmg, attackData, attackerFacing, bypassBlock, hitPos) {
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
  }

  update(opponent, keys) {
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

    // Apply velocity with friction
    this.x += this.vx;
    this.vx *= 0.85;

    // Boundaries
    if (this.char.isTelatrine) {
      if (this.x < 20) { this.x = 940; this.teleportGhost = { x: 20, y: this.y, timer: 12 }; }
      else if (this.x > 940) { this.x = 20; this.teleportGhost = { x: 940, y: this.y, timer: 12 }; }
    } else {
      if (this.x < 40) this.x = 40;
      if (this.x > 920) this.x = 920;
    }

    // Face opponent
    if (this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'blockstun') {
      this.facing = opponent.x > this.x ? 1 : -1;
    }

    // State timer
    if (this.stateTimer > 0) {
      this.stateTimer--;
      if (this.stateTimer === 0 && (this.state === 'attack' || this.state === 'hitstun' || this.state === 'blockstun')) {
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
      // Record snapshot every frame using ring buffer (O(1) instead of shift)
      this.btHistory[this.btHistoryIdx] = {
        x: this.x, y: this.y, health: this.health,
        opp: opponent ? { x: opponent.x, y: opponent.y, health: opponent.health } : null
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
        // Clones stay stationary (no horizontal movement), but mirror jumps
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
  }

  handlePlayerInput(keys, opponent) {
    if (this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') return;
    if (this.dancing) return;
    if (this.exploding) return;

    const bojdoMaxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
    const bojdoSpeedMult = this.char.isBojdo ? Math.max(bojdobojdoUnlocked ? 0 : 0.25, (bojdoMaxScale - this.bojdoScale) / (bojdoMaxScale - 1.0)) : 1; // smaller = faster, bigger = slower
    const tortoiseSpeedMult = this.isTortoise ? 0.5 : 1;
    const bojShrinkSpeedMult = (this.bojShrinkTimer > 0 && !this.char.isBojdo) ? 1.5 : 1; // faster when shrunk
    const stickerMult = this.stickerSlowTimer > 0 ? 0.3 : 1;
    const speed = this.char.stats.speed * (this.slowTimer > 0 ? 0.5 : 1) * bojdoSpeedMult * tortoiseSpeedMult * bojShrinkSpeedMult * stickerMult;
    this.blocking = false;
    this.crouching = false;

    // Paletap: can't move while slamming
    if (this.paletapSlamming) {
      this.vx = 0;
      this.state = 'idle';
      return;
    }

    // Matador: locked into dash movement
    if (this.matadorDashing) {
      return;
    }

    if (this.state !== 'attack') {
      // Movement
      const left = keys['ArrowLeft'] || keys['a'] || keys['A'];
      const right = keys['ArrowRight'] || keys['d'] || keys['D'];
      const down = keys['ArrowDown'] || keys['s'] || keys['S'];
      const up = keys['ArrowUp'] || keys['w'] || keys['W'];

      if (this.gourmandFull) {
        this.vx = 0;
        this.state = 'idle';
      } else if (left) {
        this.vx = -speed;
        this.state = 'walk';
        if (this.facing === 1) this.blocking = true;
      } else if (right) {
        this.vx = speed;
        this.state = 'walk';
        if (this.facing === -1) this.blocking = true;
      } else {
        this.state = 'idle';
      }

      if (this.isJay) {
        // Corvida jay form: up/down control vertical flight
        if (up) this.vy = -speed * 0.7;
        else if (down) this.vy = speed * 0.7;
      } else {
        if (down) {
          this.crouching = true;
          this.blocking = true;
        }


        if (up && this.grounded) {
          this.vy = -11;
          this.grounded = false;
          // Batsch: revert from tortoise on jump
          if (this.isTortoise) this.isTortoise = false;
        }
      }
      // Corvida: transform to jay if double-jump was triggered
      if (this.char.isCorvida && this.corvidaJayPending) {
        this.corvidaJayPending = false;
        this.isJay = true;
      }
      // Batsch: transform to tortoise if double-crouch was triggered
      if (this.char.isBatsch && this.batschCrouchPending) {
        this.batschCrouchPending = false;
        if (!this.isTortoise) this.isTortoise = true;
      }
    }

    // Golgar entity swap: press D to switch to dormant entity
    if (this.char.isGolgar && (keys['g'] || keys['G']) && this.state !== 'attack') {
      const oldX = this.x;
      const oldY = this.y;
      const oldFacing = this.facing;
      this.x = this.golgarOtherX;
      this.y = this.golgarOtherY;
      this.facing = this.golgarOtherFacing;
      this.golgarOtherX = oldX;
      this.golgarOtherY = oldY;
      this.golgarOtherFacing = oldFacing;
      this.golgarEntity = this.golgarEntity === 1 ? 2 : 1;
      this.grounded = this.y >= this.groundY;
      this.state = 'idle';
      this.stateTimer = 0;
      keys['g'] = false; keys['G'] = false;
    }

    // Duplaire: press K to create a clone
    if (this.char.isDuplaire && (keys['k'] || keys['K'])) {
      const activeCount = this.duplaireClones.filter(c => c.active || c.activationTimer > 0).length;
      if (activeCount < this.duplaireMaxClones) {
        const newTotal = 1 + activeCount + 1;
        const sectionHealth = this.maxHealth / newTotal;
        this.duplaireClones.push({
          x: this.x, y: this.y, facing: this.facing,
          grounded: this.grounded, vy: 0, vx: 0,
          activationTimer: 180, // 3 seconds at 60fps
          active: false,
          animTimer: 0, animFrame: 0,
          state: 'idle', attackFrame: 0, currentAttack: null, stateTimer: 0,
          cloneHealth: sectionHealth, cloneMaxHealth: sectionHealth
        });
        // Redistribute original's health to match new section size
        this.duplaireOrigHealth = Math.min(this.duplaireOrigHealth, sectionHealth);
        // Redistribute existing clone health caps
        for (const c of this.duplaireClones) {
          c.cloneMaxHealth = sectionHealth;
          if (c.cloneHealth > sectionHealth) c.cloneHealth = sectionHealth;
        }
      }
      keys['k'] = false; keys['K'] = false;
    }

    // Bozollok: press H to molt (shed skin and leap)
    if (this.char.isBozollok && (keys['h'] || keys['H']) && this.grounded && !this.molting && this.moltCooldown <= 0 && this.state !== 'attack') {
      this.moltHusk = { x: this.x, y: this.y, timer: 90 }; // husk decomposes over 1.5s
      this.molting = true;
      this.vy = -9; // moderate jump, face visible while hovering
      this.grounded = false;
      this.moltHover = 90; // hover for 1.5s at apex
      this.moltDescending = false;
      this.moltCooldown = 240; // 4 second cooldown
      keys['h'] = false; keys['H'] = false;
    }

    // Buck: press L to start firework spray
    if (this.char.isBuck && (keys['l'] || keys['L']) && !this.buckFiring && this.buckFireCooldown <= 0 && this.state !== 'attack') {
      this.buckFiring = true;
      this.buckFireTimer = 360; // 6 seconds at 60fps
      keys['l'] = false; keys['L'] = false;
    }

    // Gourmand: press L to open mouth, press P to shoot energy ball
    if (this.char.isGourmand && (keys['l'] || keys['L']) && !this.gourmandFull && this.state !== 'attack') {
      this.mouthOpen = true;
      keys['l'] = false; keys['L'] = false;
    }
    if (this.char.isGourmand && (keys['p'] || keys['P']) && this.gourmandEnergy > 0 && !this.gourmandProjectile) {
      this.gourmandProjectile = {
        x: this.x + this.facing * 30,
        y: this.centerY,
        vx: this.facing * 8,
        vy: 0,
        damage: this.gourmandEnergy,
        timer: 120,
        hit: false
      };
      this.gourmandEnergy = 0;
      this.gourmandFull = false;
      this.mouthOpen = false;
      keys['p'] = false; keys['P'] = false;
    }

    // Torrena water phase toggle
    if (this.char.isTorrena && (keys['h'] || keys['H'])) {
      this.waterPhase = !this.waterPhase;
      keys['h'] = false; keys['H'] = false;
    }

    // Haystack explosion: press F to explode
    if (this.char.isHaystack && (keys['f'] || keys['F']) && !this.exploding && this.state !== 'attack') {
      this.exploding = true;
      this.reformTimer = this.reformMaxFrames;
      // Spawn arrow projectiles in all directions
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        this.haystackProjectiles.push({
          x: this.x, y: this.centerY,
          vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7,
          type: 'arrow', hit: false, timer: 45
        });
      }
      // Spawn sword in a random direction
      const sAngle = Math.random() * Math.PI * 2;
      this.haystackProjectiles.push({
        x: this.x, y: this.centerY,
        vx: Math.cos(sAngle) * 6, vy: Math.sin(sAngle) * 6,
        type: 'sword', hit: false, timer: 50
      });
      // Spawn hay particles
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        this.hayParticles.push({
          x: this.x, y: this.centerY - Math.random() * 30,
          vx: Math.cos(a) * (3 + Math.random() * 4),
          vy: Math.sin(a) * (3 + Math.random() * 4) - 2,
          timer: 30 + Math.random() * 20
        });
      }
      keys['f'] = false; keys['F'] = false;
    }

    // Backtrack: press J to rewind time 8 seconds
    if (this.char.isBacktrack && (keys['j'] || keys['J']) && this.btRewindCooldown <= 0 && this.btHistoryLen > 0) {
      // Get the oldest entry in the ring buffer
      const oldestIdx = this.btHistoryLen < this.btMaxHistory ? 0 : this.btHistoryIdx;
      const snap = this.btHistory[oldestIdx];
      const oppSnap = snap.opp;
      // Restore self
      this.x = snap.x;
      this.y = snap.y;
      this.health = snap.health;
      this.state = 'idle';
      this.stateTimer = 0;
      this.vx = 0;
      this.vy = 0;
      // Restore opponent
      if (opponent && oppSnap) {
        opponent.x = oppSnap.x;
        opponent.y = oppSnap.y;
        opponent.health = oppSnap.health;
        opponent.state = 'idle';
        opponent.stateTimer = 0;
        opponent.vx = 0;
        opponent.vy = 0;
      }
      this.btHistoryLen = 0;
      this.btHistoryIdx = 0;
      this.btRewindCooldown = 600; // 10 second cooldown
      this.btRewindEffect = 40;
      keys['j'] = false; keys['J'] = false;
    }

    // Snazz McJazz dance: press J to start dancing (can't if already dancing or attacking)
    if (this.char.isSnazz && (keys['j'] || keys['J']) && !this.dancing && this.state !== 'attack') {
      this.dancing = true;
      this.danceTimer = this.danceMaxFrames;
      this.state = 'idle';
      keys['j'] = false; keys['J'] = false;
    }

    // Paletap shockwave: press K to slam and create ground shockwave
    if (this.char.isPaletap && (keys['k'] || keys['K']) && this.grounded && !this.paletapSlamming && this.paletapShockCooldown <= 0 && this.state !== 'attack') {
      this.paletapSlamming = true;
      this.paletapSlamFrame = 0;
      keys['k'] = false; keys['K'] = false;
    }

    // Killa Watt: press K to zap opponent when in range
    if (this.char.isKillawatt && (keys['k'] || keys['K']) && this.kwZapCooldown <= 0 && !this.kwZapEffect && this.state !== 'attack') {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 180) {
        const zapDamage = 10;
        const stunDuration = 45;
        opponent.health -= zapDamage / opponent.char.stats.defense;
        if (opponent.health <= 0) opponent.health = 0;
        opponent.state = 'hitstun';
        opponent.stateTimer = stunDuration;
        opponent.vx = 0;
        opponent.kwStunTimer = stunDuration;
        this.kwZapEffect = { target: opponent, timer: stunDuration, bolts: [] };
        this.kwZapCooldown = 90;
        // Generate lightning bolt paths
        for (let b = 0; b < 3; b++) {
          const bolt = [];
          const sx = this.x + this.facing * 15;
          const sy = this.centerY - 10;
          const tx = opponent.x;
          const ty = opponent.centerY - 10;
          const segs = 6;
          for (let s = 0; s <= segs; s++) {
            const t = s / segs;
            bolt.push({
              x: sx + (tx - sx) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 30 : 0),
              y: sy + (ty - sy) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 20 : 0)
            });
          }
          this.kwZapEffect.bolts.push(bolt);
        }
      }
      keys['k'] = false; keys['K'] = false;
    }

    // Matador: press O to dash through opponent and slash
    if (this.char.isMatador && (keys['o'] || keys['O']) && !this.matadorDashing && this.matadorDashCooldown <= 0 && this.state !== 'attack') {
      this.matadorDashing = true;
      this.matadorDashStartX = this.x;
      this.matadorDashEndX = Math.max(40, Math.min(920, opponent.x + this.facing * 80));
      this.matadorDashFrames = 12;
      this.matadorDashTimer = 0;
      this.matadorDashHit = false;
      this.vx = 0;
      keys['o'] = false; keys['O'] = false;
    }

    // X-haust: hold L to leak oil, press K to ignite
    if (this.char.isXhaust) {
      this.xhaustLeaking = (keys['l'] || keys['L']) && this.xhaustOilTank > 0 && this.state !== 'attack';
      if ((keys['k'] || keys['K']) && this.xhaustOilPuddles.length > 0 && this.state !== 'attack') {
        // Ignite all oil puddles
        for (const puddle of this.xhaustOilPuddles) {
          this.xhaustFlames.push({
            x: puddle.x, y: puddle.y,
            width: puddle.width,
            timer: 90 // 1.5 seconds of fire
          });
        }
        this.xhaustOilPuddles = [];
        keys['k'] = false; keys['K'] = false;
      }
    }

    // Vortice: hold H to summon pull tornado, press J to activate push tornado
    if (this.char.isVortice) {
      this.vorticeTornado = (keys['h'] || keys['H']) && this.state !== 'attack' && !this.vorticePushing;
      if ((keys['j'] || keys['J']) && this.vorticePushCooldown <= 0 && !this.vorticePushing && this.state !== 'attack') {
        this.vorticePushing = true;
        this.vorticePushTimer = 90; // 1.5 seconds of push tornado
        this.vorticePushCooldown = 180; // 3 second cooldown
        keys['j'] = false; keys['J'] = false;
      }
    }

    // Attacks - always check, even during attack state (startAttack handles queuing)
    // Block attacks and assists during finishHim phase (keys are used for rumble combo)
    if (!this.waterPhase && gameState !== 'finishHim') {
      if (keys['z'] || keys['Z']) { this.startAttack('jab'); keys['z'] = false; keys['Z'] = false; }
      if (keys['c'] || keys['C']) { this.startAttack('lowKick'); keys['c'] = false; keys['C'] = false; }
      if (keys['x'] || keys['X']) { this.startAttack('uppercut'); keys['x'] = false; keys['X'] = false; }
      if (keys['v'] || keys['V']) { this.startAttack('highKick'); keys['v'] = false; keys['V'] = false; }
      if (keys['b'] || keys['B']) { this.callAssist(opponent); keys['b'] = false; keys['B'] = false; }
    }
    // Bojdo size shifting: hold K to grow, hold L to shrink
    if (this.char.isBojdo) {
      const maxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
      const minScale = bojdobojdoUnlocked ? 0.2 : 0.5;
      if (keys['k'] || keys['K']) {
        this.bojdoScale = Math.min(this.bojdoScale + 0.02, maxScale);
      } else if (keys['l'] || keys['L']) {
        this.bojdoScale = Math.max(this.bojdoScale - 0.02, minScale);
      }
    }

    // Exor soul drain: press N at close range to drain HP
    if (this.char.isExor && (keys['n'] || keys['N']) && !this.exorDraining && this.exorDrainCooldown <= 0 && this.state !== 'attack') {
      const dist = Math.abs(this.x - opponent.x);
      if (dist < 120) {
        this.exorDraining = true;
        this.exorDrainTimer = 90; // 1.5 seconds of draining
        this.exorDrainTarget = opponent;
        opponent.slowTimer = Math.max(opponent.slowTimer, 90); // slow them while draining
      }
      keys['n'] = false; keys['N'] = false;
    }

    // Codemax swap: press N to switch positions with opponent
    if (this.char.isCodemax && (keys['n'] || keys['N']) && this.swapCooldown <= 0 && this.state !== 'attack') {
      const myX = this.x, myY = this.y;
      const oppX = opponent.x, oppY = opponent.y;
      this.teleportGhost = { x: myX, y: myY, timer: 15 };
      opponent.teleportGhost = { x: oppX, y: oppY, timer: 15 };
      // Swap both X and Y positions
      this.x = oppX; this.y = oppY;
      opponent.x = myX; opponent.y = myY;
      // Codemax inherits opponent's air state
      this.grounded = opponent.grounded;
      if (!this.grounded) this.vy = 0; // fall naturally
      // Opponent lands at Codemax's old position
      opponent.grounded = myY >= opponent.groundY;
      if (opponent.grounded) {
        opponent.y = opponent.groundY;
        opponent.vy = 0;
        // Corvida reverts from jay form when landing on the ground
        if (opponent.isJay) {
          opponent.isJay = false;
        }
      }
      this.facing = opponent.x > this.x ? 1 : -1;
      opponent.facing = this.x > opponent.x ? 1 : -1;
      this.swapCooldown = 180; // 3 second cooldown
      this.glitchTimer = 20;
      opponent.glitchTimer = 20;
      keys['n'] = false; keys['N'] = false;
    } else if ((keys['m'] || keys['M']) && gameMode === 'practice') {
      opponent.x = 710;
      opponent.y = opponent.groundY;
      opponent.vx = 0;
      opponent.vy = 0;
      keys['m'] = false;
      keys['M'] = false;
    }
  }

  handleAI(opponent) {
    // Practice mode targets
    if (gameMode === 'practice') {
      if (this.char.isMannequin) {
        // Mannequin punches every 2 seconds (120 frames)
        if (!this.mannequinPunchTimer) this.mannequinPunchTimer = 0;
        this.mannequinPunchTimer++;
        this.facing = opponent.x > this.x ? 1 : -1;
        if (this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'launched') {
          if (this.mannequinPunchTimer >= 120) {
            this.mannequinPunchTimer = 0;
            this.startAttack('jab');
          } else {
            this.state = 'idle';
          }
        }
        this.blocking = false;
        return;
      }
      if (this.char.isDrone) {
        // Drone moves like a CPU but never attacks
        this.facing = opponent.x > this.x ? 1 : -1;
        if (this.state === 'hitstun' || this.state === 'launched' || this.state === 'blockstun') return;
        const dist = Math.abs(this.x - opponent.x);
        if (dist > 200) {
          this.vx = this.facing * this.char.stats.speed;
          this.state = 'walk';
        } else if (dist < 80) {
          this.vx = -this.facing * this.char.stats.speed;
          this.state = 'walk';
        } else {
          // Wander randomly
          if (Math.random() < 0.02) {
            this.vx = (Math.random() - 0.5) * this.char.stats.speed * 2;
            this.state = 'walk';
          } else if (Math.random() < 0.03) {
            this.vx = 0;
            this.state = 'idle';
          }
          // Occasionally jump
          if (Math.random() < 0.01 && this.grounded) {
            this.vy = -11;
            this.grounded = false;
          }
        }
        this.blocking = false;
        return;
      }
      // Bag just stands there
      this.state = 'idle';
      this.blocking = false;
      return;
    }

    if (this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') {
      this.blocking = true;
      this.aiComboQueue = [];
      return;
    }

    // Matador: locked into dash
    if (this.matadorDashing) return;

    // Continue combo queue
    if (this.aiComboQueue.length > 0 && this.state !== 'attack') {
      this.startAttack(this.aiComboQueue.shift());
      return;
    }

    this.aiTimer++;
    const dist = Math.abs(this.x - opponent.x);

    // React periodically
    const diff = cpuDifficulty || difficulties[1];
    if (this.aiTimer >= this.aiReactTime) {
      this.aiTimer = 0;
      this.aiReactTime = diff.reactMin + Math.random() * diff.reactRange;

      if (dist > 120) {
        this.aiAction = 'approach';
      } else if (dist < 50) {
        this.aiAction = Math.random() > 0.5 ? 'retreat' : 'attack';
      } else {
        const r = Math.random();
        if (r < diff.attackChance) this.aiAction = 'attack';
        else if (r < diff.attackChance + diff.blockChance) this.aiAction = 'block';
        else if (r < diff.attackChance + diff.blockChance + 0.15) this.aiAction = 'approach';
        else if (r < diff.attackChance + diff.blockChance + 0.15 + diff.assistChance) this.aiAction = 'assist';
        else this.aiAction = 'retreat';
      }
    }

    this.blocking = false;
    this.crouching = false;

    // Bojdo AI size shifting: shrink when far away for speed, grow when close for power
    if (this.char.isBojdo) {
      const maxScale = bojdobojdoUnlocked ? 3.5 : 2.0;
      const minScale = bojdobojdoUnlocked ? 0.2 : 0.5;
      if (dist > 120 || this.aiAction === 'approach' || this.aiAction === 'retreat') {
        // Shrink for speed when moving around
        const targetScale = Math.max(minScale, 0.6);
        if (this.bojdoScale > targetScale) this.bojdoScale = Math.max(targetScale, this.bojdoScale - 0.03);
      } else if (dist < 80 && (this.aiAction === 'attack' || this.state === 'attack')) {
        // Grow for power and range when attacking up close
        const targetScale = Math.min(maxScale, bojdobojdoUnlocked ? 2.5 : 1.8);
        if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + 0.04);
      } else if (this.aiAction === 'block') {
        // Grow big when blocking for more defense
        const targetScale = Math.min(maxScale, bojdobojdoUnlocked ? 3.0 : 2.0);
        if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + 0.03);
      }
    }

    // Torrena AI water phase: phase through when retreating or blocking, turn off to attack
    if (this.char.isTorrena) {
      if (this.aiAction === 'attack' && dist < 80) {
        this.waterPhase = false;
      } else if (this.aiAction === 'retreat' || this.aiAction === 'block' || (this.state === 'hitstun' && !this.waterPhase)) {
        this.waterPhase = true;
      }
    }

    // Snazz AI: dance when far away and health is low
    if (this.char.isSnazz && !this.dancing && dist > 200 && this.health < this.maxHealth * 0.6 && Math.random() < 0.02) {
      this.dancing = true;
      this.danceTimer = this.danceMaxFrames;
    }
    if (this.dancing) return;

    // Haystack AI: explode when opponent is close
    if (this.char.isHaystack && !this.exploding && dist < 100 && Math.random() < 0.04) {
      this.exploding = true;
      this.reformTimer = this.reformMaxFrames;
      for (let i = 0; i < 6; i++) {
        const angle = (i / 6) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
        this.haystackProjectiles.push({
          x: this.x, y: this.centerY,
          vx: Math.cos(angle) * 7, vy: Math.sin(angle) * 7,
          type: 'arrow', hit: false, timer: 45
        });
      }
      const sAngle = Math.atan2(opponent.centerY - this.centerY, opponent.x - this.x) + (Math.random() - 0.5) * 0.5;
      this.haystackProjectiles.push({
        x: this.x, y: this.centerY,
        vx: Math.cos(sAngle) * 6, vy: Math.sin(sAngle) * 6,
        type: 'sword', hit: false, timer: 50
      });
      for (let i = 0; i < 12; i++) {
        const a = Math.random() * Math.PI * 2;
        this.hayParticles.push({
          x: this.x, y: this.centerY - Math.random() * 30,
          vx: Math.cos(a) * (3 + Math.random() * 4),
          vy: Math.sin(a) * (3 + Math.random() * 4) - 2,
          timer: 30 + Math.random() * 20
        });
      }
    }
    if (this.exploding) return;

    // Golgar AI: swap entities strategically
    if (this.char.isGolgar && this.state !== 'attack') {
      const otherDist = Math.abs(this.golgarOtherX - opponent.x);
      // Swap if the other entity is closer to the opponent, or to surprise from behind
      if ((otherDist < dist - 60 && Math.random() < 0.03) || (dist > 200 && otherDist < 100 && Math.random() < 0.05)) {
        const oldX = this.x;
        const oldY = this.y;
        const oldFacing = this.facing;
        this.x = this.golgarOtherX;
        this.y = this.golgarOtherY;
        this.facing = this.golgarOtherFacing;
        this.golgarOtherX = oldX;
        this.golgarOtherY = oldY;
        this.golgarOtherFacing = oldFacing;
        this.golgarEntity = this.golgarEntity === 1 ? 2 : 1;
        this.grounded = this.y >= this.groundY;
        this.state = 'idle';
        this.stateTimer = 0;
      }
    }

    // Corvida AI: transform to jay when far away, swoop to attack, land to revert
    if (this.char.isCorvida && this.grounded && !this.isJay && dist > 150 && Math.random() < 0.03) {
      this.isJay = true;
      this.vy = -11;
      this.grounded = false;
    }
    if (this.isJay && !this.grounded) {
      // Fly toward opponent horizontally
      if (dist > 50) {
        this.vx = this.facing * this.char.stats.speed * 0.7;
      }
      // Swoop down to attack when close, then land to revert
      if (dist < 90) {
        // Dive toward opponent to get in attack range
        this.vy = this.char.stats.speed * 0.6;
        if (Math.random() < 0.12) {
          const atkTypes = ['jab', 'lowKick', 'uppercut', 'highKick'];
          this.startAttack(atkTypes[Math.floor(Math.random() * atkTypes.length)]);
        }
      } else {
        // Cruise at moderate height while approaching
        const cruiseY = this.groundY - 80;
        if (this.y > cruiseY) this.vy = -this.char.stats.speed * 0.4;
        else if (this.y < cruiseY - 30) this.vy = this.char.stats.speed * 0.3;
      }
      // Randomly decide to land and fight normally
      if (Math.random() < 0.008) {
        this.vy = this.char.stats.speed;
      }
      return;
    }

    // Codemax AI: swap positions when opponent is cornered or to gain advantage
    if (this.char.isCodemax && this.swapCooldown <= 0 && this.state !== 'attack') {
      const oppCornered = opponent.x < 80 || opponent.x > 880;
      const selfCornered = this.x < 80 || this.x > 880;
      if ((selfCornered || (dist < 100 && Math.random() < 0.03) || (oppCornered && Math.random() < 0.01)) && dist > 50) {
        const myX = this.x, myY = this.y;
        const oppX = opponent.x, oppY = opponent.y;
        this.teleportGhost = { x: myX, y: myY, timer: 15 };
        opponent.teleportGhost = { x: oppX, y: oppY, timer: 15 };
        this.x = oppX; this.y = oppY;
        opponent.x = myX; opponent.y = myY;
        this.grounded = opponent.grounded;
        if (!this.grounded) this.vy = 0;
        opponent.grounded = myY >= opponent.groundY;
        if (opponent.grounded) {
          opponent.y = opponent.groundY;
          opponent.vy = 0;
          if (opponent.isJay) opponent.isJay = false;
        }
        this.facing = opponent.x > this.x ? 1 : -1;
        opponent.facing = this.x > opponent.x ? 1 : -1;
        this.swapCooldown = 180;
        this.glitchTimer = 20;
        opponent.glitchTimer = 20;
      }
    }

    // Duplaire AI: create clones periodically
    if (this.char.isDuplaire && this.state !== 'attack') {
      const activeCount = this.duplaireClones.filter(c => c.active || c.activationTimer > 0).length;
      if (activeCount < 3 && Math.random() < 0.015) {
        const newTotal = 1 + activeCount + 1;
        const sectionHealth = this.maxHealth / newTotal;
        this.duplaireClones.push({
          x: this.x, y: this.y, facing: this.facing,
          grounded: this.grounded, vy: 0, vx: 0,
          activationTimer: 180, active: false,
          animTimer: 0, animFrame: 0,
          state: 'idle', attackFrame: 0, currentAttack: null, stateTimer: 0,
          cloneHealth: sectionHealth, cloneMaxHealth: sectionHealth
        });
        this.duplaireOrigHealth = Math.min(this.duplaireOrigHealth, sectionHealth);
        for (const c of this.duplaireClones) {
          c.cloneMaxHealth = sectionHealth;
          if (c.cloneHealth > sectionHealth) c.cloneHealth = sectionHealth;
        }
      }
    }

    // Bozollok AI: molt leap when medium distance or to escape pressure
    if (this.char.isBozollok && this.grounded && !this.molting && this.moltCooldown <= 0 && this.state !== 'attack') {
      if ((dist < 100 && Math.random() < 0.04) || (dist > 150 && dist < 300 && Math.random() < 0.02)) {
        this.moltHusk = { x: this.x, y: this.y, timer: 90 };
        this.molting = true;
        this.vy = -9;
        this.grounded = false;
        this.moltHover = 90;
        this.moltDescending = false;
        this.moltCooldown = 240;
      }
    }

    // Gourmand AI: open mouth to absorb, shoot energy ball when full or close range
    if (this.char.isGourmand && this.state !== 'attack') {
      // Open mouth when opponent is attacking nearby
      if (!this.mouthOpen && !this.gourmandFull && this.gourmandEnergy < this.gourmandMaxEnergy) {
        if (opponent.state === 'attack' && dist < 100 && Math.random() < 0.15) {
          this.mouthOpen = true;
        }
      }
      // Close mouth after a short time if not hit
      if (this.mouthOpen && Math.random() < 0.05) {
        this.mouthOpen = false;
      }
      // Shoot energy ball when has energy and opponent is at range
      if (this.gourmandEnergy > 20 && !this.gourmandProjectile && dist > 80) {
        if (this.gourmandFull || (this.gourmandEnergy > 40 && Math.random() < 0.04) || Math.random() < 0.02) {
          this.gourmandProjectile = {
            x: this.x + this.facing * 30, y: this.y - 30,
            vx: this.facing * 8, vy: 0,
            damage: this.gourmandEnergy, timer: 120, hit: false
          };
          this.gourmandEnergy = 0;
          this.gourmandFull = false;
          this.mouthOpen = false;
        }
      }
    }

    // Batsch AI: toggle tortoise form based on health and distance
    if (this.char.isBatsch) {
      if (!this.isTortoise && (this.health < this.maxHealth * 0.4 || (dist < 80 && Math.random() < 0.03))) {
        this.isTortoise = true;
      } else if (this.isTortoise && this.health > this.maxHealth * 0.7 && dist > 150 && Math.random() < 0.02) {
        this.isTortoise = false;
      }
    }

    // Matador AI: dash-slash at medium range
    if (this.char.isMatador && !this.matadorDashing && this.matadorDashCooldown <= 0 && this.state !== 'attack') {
      if (dist > 80 && dist < 300 && Math.random() < 0.04) {
        this.matadorDashing = true;
        this.matadorDashStartX = this.x;
        this.matadorDashEndX = Math.max(40, Math.min(920, opponent.x + this.facing * 80));
        this.matadorDashFrames = 12;
        this.matadorDashTimer = 0;
        this.matadorDashHit = false;
        this.vx = 0;
      }
    }

    // Paletap AI: slam shockwave at medium range
    if (this.char.isPaletap && this.grounded && !this.paletapSlamming && this.paletapShockCooldown <= 0 && this.state !== 'attack') {
      if (dist > 100 && dist < 400 && Math.random() < 0.04) {
        this.paletapSlamming = true;
        this.paletapSlamFrame = 0;
      }
    }

    // Killa Watt AI: zap when in range
    if (this.char.isKillawatt && this.kwZapCooldown <= 0 && !this.kwZapEffect && this.state !== 'attack') {
      if (dist < 180 && Math.random() < 0.05) {
        const zapDamage = 10;
        const stunDuration = 45;
        opponent.health -= zapDamage / opponent.char.stats.defense;
        if (opponent.health <= 0) opponent.health = 0;
        opponent.state = 'hitstun';
        opponent.stateTimer = stunDuration;
        opponent.vx = 0;
        opponent.kwStunTimer = stunDuration;
        this.kwZapEffect = { target: opponent, timer: stunDuration, bolts: [] };
        this.kwZapCooldown = 90;
        for (let b = 0; b < 3; b++) {
          const bolt = [];
          const sx = this.x + this.facing * 15;
          const sy = this.centerY - 10;
          const tx = opponent.x;
          const ty = opponent.centerY - 10;
          const segs = 6;
          for (let s = 0; s <= segs; s++) {
            const t = s / segs;
            bolt.push({
              x: sx + (tx - sx) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 30 : 0),
              y: sy + (ty - sy) * t + (s > 0 && s < segs ? (Math.random() - 0.5) * 20 : 0)
            });
          }
          this.kwZapEffect.bolts.push(bolt);
        }
      }
    }

    // Exor AI: drain when close to opponent
    if (this.char.isExor && !this.exorDraining && this.exorDrainCooldown <= 0 && this.state !== 'attack') {
      if (dist < 120 && Math.random() < 0.04) {
        this.exorDraining = true;
        this.exorDrainTimer = 90;
        this.exorDrainTarget = opponent;
        opponent.slowTimer = Math.max(opponent.slowTimer, 90);
      }
    }

    // Buck AI: fire fireworks when opponent is in range
    if (this.char.isBuck && !this.buckFiring && this.buckFireCooldown <= 0 && this.state !== 'attack') {
      if (dist < 300 && Math.random() < 0.02) {
        this.buckFiring = true;
        this.buckFireTimer = 360;
      }
    }

    // Backtrack AI: rewind when health is low and history has enough data
    if (this.char.isBacktrack && this.btRewindCooldown <= 0 && this.btHistoryLen > 240) {
      // Get the oldest entry in the ring buffer
      const oldestIdx = this.btHistoryLen < this.btMaxHistory ? 0 : this.btHistoryIdx;
      const oldSnap = this.btHistory[oldestIdx];
      if (this.health < this.maxHealth * 0.4 && oldSnap.health > this.health + 20 && Math.random() < 0.03) {
        const snap = this.btHistory[oldestIdx];
        const oppSnap = snap.opp;
        this.x = snap.x;
        this.y = snap.y;
        this.health = snap.health;
        this.state = 'idle';
        this.stateTimer = 0;
        this.vx = 0;
        this.vy = 0;
        if (opponent && oppSnap) {
          opponent.x = oppSnap.x;
          opponent.y = oppSnap.y;
          opponent.health = oppSnap.health;
          opponent.state = 'idle';
          opponent.stateTimer = 0;
          opponent.vx = 0;
          opponent.vy = 0;
        }
        this.btHistoryLen = 0;
        this.btHistoryIdx = 0;
        this.btRewindCooldown = 600;
        this.btRewindEffect = 40;
      }
    }

    if (this.state === 'attack') return;

    switch (this.aiAction) {
      case 'approach':
        this.vx = this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.4 : 0.8);
        this.state = 'walk';
        if (dist < 80) this.aiAction = 'attack';
        break;
      case 'retreat':
        this.vx = -this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.3 : 0.6);
        this.state = 'walk';
        break;
      case 'attack':
        if (dist < 80) {
          // Check if AI should execute a combo sequence
          if (this.aiComboQueue.length > 0) {
            this.startAttack(this.aiComboQueue.shift());
            break;
          }

          // On Hard/Brutal, chance to start a combo
          const combos = characterCombos[this.char.name];
          const comboChance = diff === difficulties[2] ? 0.08 : diff === difficulties[3] ? 0.18 : 0;
          if (combos && Math.random() < comboChance) {
            const combo = combos[Math.floor(Math.random() * combos.length)];
            this.startAttack(combo.sequence[0]);
            this.aiComboQueue = combo.sequence.slice(1);
            break;
          }

          const r = Math.random();
          if (!diff.uppercut) {
            if (r < 0.45) this.startAttack('jab');
            else if (r < 0.75) this.startAttack('lowKick');
            else this.startAttack('highKick');
          } else {
            if (r < 0.35) this.startAttack('jab');
            else if (r < 0.55) this.startAttack('lowKick');
            else if (r < 0.75) this.startAttack('highKick');
            else this.startAttack('uppercut');
          }
        } else {
          this.aiAction = 'approach';
        }
        break;
      case 'block':
        this.blocking = true;
        this.crouching = Math.random() > 0.5;
        break;
      case 'assist':
        this.callAssist(opponent);
        this.aiAction = 'approach';
        break;
      default:
        this.state = 'idle';
    }
  }

  drawBag(ctx) {
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
  }

  drawMannequin(ctx) {
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
  }

  draw(ctx) {
    // Draw as punching bag or mannequin in practice mode (drone draws as normal fighter)
    if (gameMode === 'practice' && !this.isPlayer && !this.char.isDrone) {
      if (this.char.isMannequin) {
        this.drawMannequin(ctx);
        return;
      }
      this.drawBag(ctx);
      return;
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
    const color = flash ? '#fff' : frozen ? '#88ccff' : inWater ? '#44bbee' : this.char.color;
    const accent = flash ? '#fff' : frozen ? '#bbddff' : inWater ? '#88eeff' : this.char.accent;
    const outline = flash ? '#ccc' : frozen ? '#4488aa' : inWater ? '#2299bb' : this.char.outline;

    ctx.save();
    // Duplaire clone alpha
    if (this._isCloneDraw) {
      ctx.globalAlpha = this._cloneAlpha;
    }
    if (this.phaseTimer > 0) ctx.globalAlpha = 0.4;
    if (this.waterPhase) ctx.globalAlpha = 0.35;
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
    ctx.translate(this.x + kwVibX, this.y + kwVibY);
    if (this._rumbleRotation) ctx.rotate(this._rumbleRotation);
    if (this.char.isBojdo) ctx.scale(this.bojdoScale, this.bojdoScale);
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
    ctx.fillStyle = outline;
    ctx.beginPath();
    ctx.arc(f * 5, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(f * 12, eyeBaseY - 2, 3, 0, Math.PI * 2);
    ctx.fill();

    // Eye highlights (skip for Paletap)
    if (!isPaletap) {
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.arc(f * 6, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(f * 13, eyeBaseY - 3, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }

    if (isPaletap) ctx.restore(); // end tilted head transform
    if (isPaletap) ctx.restore(); // end forward lean

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
  }

  drawHaystackProjectiles(ctx) {
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
  }
}

// --- INPUT ---
const keys = {};
window.addEventListener('wheel', e => {
  if (gameState === 'charSelect') {
    charSelectScroll = Math.max(0, Math.min(charSelectMaxScroll, charSelectScroll + e.deltaY * 0.5));
    e.preventDefault();
  }
}, { passive: false });

window.addEventListener('keydown', e => {
  keys[e.key] = true;
  handleKeyPress(e.key);
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight',' ','Tab'].includes(e.key)) e.preventDefault();
});
window.addEventListener('keyup', e => { keys[e.key] = false; });
// Start title music on any user interaction (click or key)
window.addEventListener('click', () => {
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) playTitleMusic();
});

function handleKeyPress(key) {
  // Keep title music playing during menu screens
  const menuState = gameState === 'title' || gameState === 'charSelect' || gameState === 'practiceTargetSelect' || gameState === 'assistSelect' || gameState === 'difficultySelect' || gameState === 'levelSelect';
  if (menuState && titleMusic.paused) {
    playTitleMusic();
  }
  switch (gameState) {
    case 'title': {
      const titleOptionCount = rumblePracticeUnlocked ? 3 : 2;
      if (key === 'ArrowUp' || key === 'w' || key === 'W') titleCursor = (titleCursor - 1 + titleOptionCount) % titleOptionCount;
      if (key === 'ArrowDown' || key === 's' || key === 'S') titleCursor = (titleCursor + 1) % titleOptionCount;
      if (key === 'Enter' || key === ' ') {
        if (titleCursor === 0) {
          gameMode = 'cpu';
        } else if (titleCursor === 1) {
          gameMode = 'practice';
        } else {
          gameMode = 'rumblePractice';
        }
        gameState = 'charSelect';
        charSelectCursor = 0;
        cpuSelectCursor = 1;
        charSelectScroll = 0;
        selectingCPU = false;
      }
      break;
    }

    case 'charSelect': {
      // Toggle locked character display
      if (key === 'Tab') {
        showLockedChars = !showLockedChars;
        charSelectScroll = 0;
      }
      // Secret code: type b0jd0 to unlock Bojdo, type again for Bojdobojdo
      if (!bojdoUnlocked || !bojdobojdoUnlocked) {
        bojdoCodeBuffer += key;
        if (bojdoCodeBuffer.length > 10) bojdoCodeBuffer = bojdoCodeBuffer.slice(-10);
        if (bojdoCodeBuffer.includes('b0jd0')) {
          bojdoCodeBuffer = '';
          if (!bojdoUnlocked) {
            bojdoUnlocked = true;
            insertCharOrdered(bojdoChar);
            bojdoUnlockFlash = 60;
            charSelectCursor = characters.length - 1;
          } else if (!bojdobojdoUnlocked) {
            bojdobojdoUnlocked = true;
            bojdoChar.name = 'BOJDOBOJDO';
            bojdoChar.desc = 'ULTIMATE SIZE SHIFTER';
            bojdoChar.accent = '#ff4400';
            bojdoUnlockFlash = 60;
            // Jump to Bojdobojdo
            charSelectCursor = characters.indexOf(bojdoChar);
          }
        }
      }
      // Secret code: type rubbr to unlock Rubberman
      if (!rubbermanUnlocked) {
        rubbermanCodeBuffer += key.toLowerCase();
        if (rubbermanCodeBuffer.length > 10) rubbermanCodeBuffer = rubbermanCodeBuffer.slice(-10);
        if (rubbermanCodeBuffer.includes('rubbr')) {
          rubbermanCodeBuffer = '';
          rubbermanUnlocked = true;
          insertCharOrdered(rubbermanChar);
          rubbermanUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fl00d to unlock Torrena
      if (!torrenaUnlocked) {
        torrenaCodeBuffer += key.toLowerCase();
        if (torrenaCodeBuffer.length > 10) torrenaCodeBuffer = torrenaCodeBuffer.slice(-10);
        if (torrenaCodeBuffer.includes('fl00d')) {
          torrenaCodeBuffer = '';
          torrenaUnlocked = true;
          insertCharOrdered(torrenaChar);
          torrenaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 5na22 to unlock Snazz McJazz
      if (!snazzUnlocked) {
        snazzCodeBuffer += key.toLowerCase();
        if (snazzCodeBuffer.length > 10) snazzCodeBuffer = snazzCodeBuffer.slice(-10);
        if (snazzCodeBuffer.includes('5na22')) {
          snazzCodeBuffer = '';
          snazzUnlocked = true;
          insertCharOrdered(snazzChar);
          snazzUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type dumm1 to unlock Haystack
      if (!haystackUnlocked) {
        haystackCodeBuffer += key.toLowerCase();
        if (haystackCodeBuffer.length > 10) haystackCodeBuffer = haystackCodeBuffer.slice(-10);
        if (haystackCodeBuffer.includes('dumm1')) {
          haystackCodeBuffer = '';
          haystackUnlocked = true;
          insertCharOrdered(haystackChar);
          haystackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 404er to unlock Codemax
      if (!codemaxUnlocked) {
        codemaxCodeBuffer += key.toLowerCase();
        if (codemaxCodeBuffer.length > 10) codemaxCodeBuffer = codemaxCodeBuffer.slice(-10);
        if (codemaxCodeBuffer.includes('404er')) {
          codemaxCodeBuffer = '';
          codemaxUnlocked = true;
          insertCharOrdered(codemaxChar);
          codemaxUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type v0id1 to unlock Telatrine
      if (!telatrineUnlocked) {
        telatrineCodeBuffer += key.toLowerCase();
        if (telatrineCodeBuffer.length > 10) telatrineCodeBuffer = telatrineCodeBuffer.slice(-10);
        if (telatrineCodeBuffer.includes('v0id1')) {
          telatrineCodeBuffer = '';
          telatrineUnlocked = true;
          insertCharOrdered(telatrineChar);
          telatrineUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type g0yl3 to unlock Golgar
      if (!golgarUnlocked) {
        golgarCodeBuffer += key.toLowerCase();
        if (golgarCodeBuffer.length > 10) golgarCodeBuffer = golgarCodeBuffer.slice(-10);
        if (golgarCodeBuffer.includes('g0yl3')) {
          golgarCodeBuffer = '';
          golgarUnlocked = true;
          insertCharOrdered(golgarChar);
          golgarUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type f3thr to unlock Corvida
      if (!corvidaUnlocked) {
        corvidaCodeBuffer += key.toLowerCase();
        if (corvidaCodeBuffer.length > 10) corvidaCodeBuffer = corvidaCodeBuffer.slice(-10);
        if (corvidaCodeBuffer.includes('f3thr')) {
          corvidaCodeBuffer = '';
          corvidaUnlocked = true;
          insertCharOrdered(corvidaChar);
          corvidaUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type mult1 to unlock Duplaire
      if (!duplaireUnlocked) {
        duplaireCodeBuffer += key.toLowerCase();
        if (duplaireCodeBuffer.length > 10) duplaireCodeBuffer = duplaireCodeBuffer.slice(-10);
        if (duplaireCodeBuffer.includes('mult1')) {
          duplaireCodeBuffer = '';
          duplaireUnlocked = true;
          insertCharOrdered(duplaireChar);
          duplaireUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type m0ltr to unlock Bozollok
      if (!bozollokUnlocked) {
        bozollokCodeBuffer += key.toLowerCase();
        if (bozollokCodeBuffer.length > 10) bozollokCodeBuffer = bozollokCodeBuffer.slice(-10);
        if (bozollokCodeBuffer.includes('m0ltr')) {
          bozollokCodeBuffer = '';
          bozollokUnlocked = true;
          insertCharOrdered(bozollokChar);
          bozollokUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type fea5t to unlock Gourmand
      if (!gourmandUnlocked) {
        gourmandCodeBuffer += key.toLowerCase();
        if (gourmandCodeBuffer.length > 10) gourmandCodeBuffer = gourmandCodeBuffer.slice(-10);
        if (gourmandCodeBuffer.includes('fea5t')) {
          gourmandCodeBuffer = '';
          gourmandUnlocked = true;
          insertCharOrdered(gourmandChar);
          gourmandUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type sh3ll to unlock Batsch
      if (!batschUnlocked) {
        batschCodeBuffer += key.toLowerCase();
        if (batschCodeBuffer.length > 10) batschCodeBuffer = batschCodeBuffer.slice(-10);
        if (batschCodeBuffer.includes('sh3ll')) {
          batschCodeBuffer = '';
          batschUnlocked = true;
          insertCharOrdered(batschChar);
          batschUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type r8ttl to unlock Paletap
      if (!paletapUnlocked) {
        paletapCodeBuffer += key.toLowerCase();
        if (paletapCodeBuffer.length > 10) paletapCodeBuffer = paletapCodeBuffer.slice(-10);
        if (paletapCodeBuffer.includes('r8ttl')) {
          paletapCodeBuffer = '';
          paletapUnlocked = true;
          insertCharOrdered(paletapChar);
          paletapUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      if (!matadorUnlocked) {
        matadorCodeBuffer += key.toUpperCase();
        if (matadorCodeBuffer.length > 10) matadorCodeBuffer = matadorCodeBuffer.slice(-10);
        if (matadorCodeBuffer.includes('8LFTR')) {
          matadorCodeBuffer = '';
          matadorUnlocked = true;
          insertCharOrdered(matadorChar);
          matadorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type V0LTG to unlock Killa Watt
      if (!killawattUnlocked) {
        killawattCodeBuffer += key.toUpperCase();
        if (killawattCodeBuffer.length > 10) killawattCodeBuffer = killawattCodeBuffer.slice(-10);
        if (killawattCodeBuffer.includes('V0LTG')) {
          killawattCodeBuffer = '';
          killawattUnlocked = true;
          insertCharOrdered(killawattChar);
          killawattUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type R3WND to unlock Backtrack
      if (!backtrackUnlocked) {
        backtrackCodeBuffer += key.toUpperCase();
        if (backtrackCodeBuffer.length > 10) backtrackCodeBuffer = backtrackCodeBuffer.slice(-10);
        if (backtrackCodeBuffer.includes('R3WND')) {
          backtrackCodeBuffer = '';
          backtrackUnlocked = true;
          insertCharOrdered(backtrackChar);
          backtrackUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 2R3AP to unlock Exor
      if (!exorUnlocked) {
        exorCodeBuffer += key.toUpperCase();
        if (exorCodeBuffer.length > 10) exorCodeBuffer = exorCodeBuffer.slice(-10);
        if (exorCodeBuffer.includes('2R3AP')) {
          exorCodeBuffer = '';
          exorUnlocked = true;
          insertCharOrdered(exorChar);
          exorUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type 07/04 to unlock Buck
      if (!buckUnlocked) {
        buckCodeBuffer += key;
        if (buckCodeBuffer.length > 10) buckCodeBuffer = buckCodeBuffer.slice(-10);
        if (buckCodeBuffer.includes('07/04')) {
          buckCodeBuffer = '';
          buckUnlocked = true;
          insertCharOrdered(buckChar);
          buckUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type WH1RL to unlock Vortice
      if (!vorticeUnlocked) {
        vorticeCodeBuffer += key.toUpperCase();
        if (vorticeCodeBuffer.length > 10) vorticeCodeBuffer = vorticeCodeBuffer.slice(-10);
        if (vorticeCodeBuffer.includes('WH1RL')) {
          vorticeCodeBuffer = '';
          vorticeUnlocked = true;
          insertCharOrdered(vorticeChar);
          vorticeUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Secret code: type D1ESL to unlock X-haust
      if (!xhaustUnlocked) {
        xhaustCodeBuffer += key.toUpperCase();
        if (xhaustCodeBuffer.length > 10) xhaustCodeBuffer = xhaustCodeBuffer.slice(-10);
        if (xhaustCodeBuffer.includes('D1ESL')) {
          xhaustCodeBuffer = '';
          xhaustUnlocked = true;
          insertCharOrdered(xhaustChar);
          xhaustUnlockFlash = 60;
          charSelectCursor = characters.length - 1;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
          charSelectCursor = characters.length - 1;
          charSelectScroll = 0;
        }
      }
      const charSlots = characters.length + 1; // +1 for RANDOM
      const csPerRow = charSelectPerRow;
      if (!selectingCPU) {
        if (key === 'ArrowLeft' || key === 'a') charSelectCursor = (charSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') charSelectCursor = (charSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = charSelectCursor - csPerRow;
          charSelectCursor = newIdx >= 0 ? newIdx : Math.min(charSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = charSelectCursor + csPerRow;
          charSelectCursor = newIdx < charSlots ? newIdx : charSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (charSelectCursor >= characters.length) {
            // Random - start lottery
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'char';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedPlayer = characters[lotteryFinal];
              charSelectCursor = lotteryFinal;
              if (gameMode === 'rumblePractice') {
                selectedCPU = drone;
                selectedAssist = assists[0];
                cpuAssistIndex = 0;
                gameState = 'levelSelect';
              } else if (gameMode === 'practice') {
                gameState = 'practiceTargetSelect';
                practiceTargetCursor = 0;
              } else {
                selectingCPU = true;
                cpuSelectCursor = (charSelectCursor + 1) % charSlots;
              }
            };
          } else {
            selectedPlayer = characters[charSelectCursor];
            if (gameMode === 'rumblePractice') {
              selectedCPU = drone;
              selectedAssist = assists[0];
              cpuAssistIndex = 0;
              gameState = 'levelSelect';
            } else if (gameMode === 'practice') {
              gameState = 'practiceTargetSelect';
              practiceTargetCursor = 0;
            } else {
              selectingCPU = true;
              cpuSelectCursor = (charSelectCursor + 1) % charSlots;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          gameState = 'title';
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuSelectCursor = (cpuSelectCursor - 1 + charSlots) % charSlots;
        if (key === 'ArrowRight' || key === 'd') cpuSelectCursor = (cpuSelectCursor + 1) % charSlots;
        if (key === 'ArrowUp' || key === 'w') {
          const newIdx = cpuSelectCursor - csPerRow;
          cpuSelectCursor = newIdx >= 0 ? newIdx : Math.min(cpuSelectCursor + (Math.ceil(charSlots / csPerRow) - 1) * csPerRow, charSlots - 1);
        }
        if (key === 'ArrowDown' || key === 's') {
          const newIdx = cpuSelectCursor + csPerRow;
          cpuSelectCursor = newIdx < charSlots ? newIdx : cpuSelectCursor % csPerRow;
        }
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuSelectCursor >= characters.length) {
            lotteryFinal = Math.floor(Math.random() * characters.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpu';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedCPU = characters[lotteryFinal];
              gameState = 'assistSelect';
              assistCursor = 0;
              selectingCPUAssist = false;
            };
          } else {
            selectedCPU = characters[cpuSelectCursor];
            gameState = 'assistSelect';
            assistCursor = 0;
            selectingCPUAssist = false;
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPU = false;
        }
      }
      break;
    }

    case 'practiceTargetSelect': {
      const numTargets = 3;
      if (key === 'ArrowLeft' || key === 'a' || key === 'ArrowUp' || key === 'w') practiceTargetCursor = (practiceTargetCursor - 1 + numTargets) % numTargets;
      if (key === 'ArrowRight' || key === 'd' || key === 'ArrowDown' || key === 's') practiceTargetCursor = (practiceTargetCursor + 1) % numTargets;
      if (key === 'Enter' || key === ' ') {
        selectedCPU = [punchingBag, mannequin, drone][practiceTargetCursor];
        gameState = 'assistSelect';
        assistCursor = 0;
        selectingCPUAssist = false;
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'charSelect';
        charSelectScroll = 0;
      }
      break;
    }

    case 'assistSelect': {
      const assistSlots = assists.length + 1; // +1 for RANDOM
      if (!selectingCPUAssist) {
        if (key === 'ArrowLeft' || key === 'a') assistCursor = (assistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') assistCursor = (assistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (assistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'assist';
            lotteryActive = true;
            lotteryCallback = () => {
              selectedAssist = assists[lotteryFinal];
              if (gameMode === 'practice') {
                cpuAssistIndex = Math.floor(Math.random() * assists.length);
                levelSelectCursor = 0;
                gameState = 'levelSelect';
              } else {
                selectingCPUAssist = true;
                cpuAssistCursor = 0;
              }
            };
          } else {
            selectedAssist = assists[assistCursor];
            if (gameMode === 'practice') {
              cpuAssistIndex = Math.floor(Math.random() * assists.length);
              levelSelectCursor = 0;
              gameState = 'levelSelect';
            } else {
              selectingCPUAssist = true;
              cpuAssistCursor = 0;
            }
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          if (gameMode === 'practice') {
            gameState = 'practiceTargetSelect';
            practiceTargetCursor = 0;
          } else {
            gameState = 'charSelect';
            charSelectScroll = 0;
            selectingCPU = true;
          }
        }
      } else {
        if (key === 'ArrowLeft' || key === 'a') cpuAssistCursor = (cpuAssistCursor - 1 + assistSlots) % assistSlots;
        if (key === 'ArrowRight' || key === 'd') cpuAssistCursor = (cpuAssistCursor + 1) % assistSlots;
        if ((key === 'Enter' || key === ' ') && !lotteryActive) {
          if (cpuAssistCursor >= assists.length) {
            lotteryFinal = Math.floor(Math.random() * assists.length);
            lotteryCurrent = 0;
            lotteryTimer = 0;
            lotteryDuration = 90;
            lotteryType = 'cpuAssist';
            lotteryActive = true;
            lotteryCallback = () => {
              cpuAssistIndex = lotteryFinal;
              gameState = 'difficultySelect';
            };
          } else {
            cpuAssistIndex = cpuAssistCursor;
            gameState = 'difficultySelect';
          }
        }
        if (key === 'Escape' || key === 'Backspace') {
          selectingCPUAssist = false;
        }
      }

      // Weedthorn unlock code: RTH
      if (!weedthornUnlocked && key.length === 1) {
        weedthornCodeBuffer += key.toUpperCase();
        if (weedthornCodeBuffer.length > 3) weedthornCodeBuffer = weedthornCodeBuffer.slice(-3);
        if (weedthornCodeBuffer === 'RTH') {
          weedthornUnlocked = true;
          insertAssistOrdered(weedthornAssist);
          weedthornUnlockFlash = 60;
        }
      }
      // Boj unlock code: B0J
      if (!bojAssistUnlocked && key.length === 1) {
        bojAssistCodeBuffer += key.toUpperCase();
        if (bojAssistCodeBuffer.length > 3) bojAssistCodeBuffer = bojAssistCodeBuffer.slice(-3);
        if (bojAssistCodeBuffer === 'B0J') {
          bojAssistUnlocked = true;
          insertAssistOrdered(bojAssist);
          bojAssistUnlockFlash = 60;
        }
      }
      // The Jazz unlock code: WKA
      if (!jazzAssistUnlocked && key.length === 1) {
        jazzAssistCodeBuffer += key.toUpperCase();
        if (jazzAssistCodeBuffer.length > 3) jazzAssistCodeBuffer = jazzAssistCodeBuffer.slice(-3);
        if (jazzAssistCodeBuffer === 'WKA') {
          jazzAssistUnlocked = true;
          insertAssistOrdered(jazzAssist);
          jazzAssistUnlockFlash = 60;
        }
      }
      // Cyano unlock code: JAY
      if (!cyanoAssistUnlocked && key.length === 1) {
        cyanoAssistCodeBuffer += key.toUpperCase();
        if (cyanoAssistCodeBuffer.length > 3) cyanoAssistCodeBuffer = cyanoAssistCodeBuffer.slice(-3);
        if (cyanoAssistCodeBuffer === 'JAY') {
          cyanoAssistUnlocked = true;
          insertAssistOrdered(cyanoAssist);
          cyanoAssistUnlockFlash = 60;
        }
      }
      // Warper unlock code: PAC
      if (!warperAssistUnlocked && key.length === 1) {
        warperAssistCodeBuffer += key.toUpperCase();
        if (warperAssistCodeBuffer.length > 3) warperAssistCodeBuffer = warperAssistCodeBuffer.slice(-3);
        if (warperAssistCodeBuffer === 'PAC') {
          warperAssistUnlocked = true;
          insertAssistOrdered(warperAssist);
          warperAssistUnlockFlash = 60;
        }
      }
      // Aphid unlock code: FLY
      if (!aphidAssistUnlocked && key.length === 1) {
        aphidAssistCodeBuffer += key.toUpperCase();
        if (aphidAssistCodeBuffer.length > 3) aphidAssistCodeBuffer = aphidAssistCodeBuffer.slice(-3);
        if (aphidAssistCodeBuffer === 'FLY') {
          aphidAssistUnlocked = true;
          insertAssistOrdered(aphidAssist);
          aphidAssistUnlockFlash = 60;
        }
      }
      // Stud unlock code: TOR
      if (!studAssistUnlocked && key.length === 1) {
        studAssistCodeBuffer += key.toUpperCase();
        if (studAssistCodeBuffer.length > 3) studAssistCodeBuffer = studAssistCodeBuffer.slice(-3);
        if (studAssistCodeBuffer === 'TOR') {
          studAssistUnlocked = true;
          insertAssistOrdered(studAssist);
          studAssistUnlockFlash = 60;
        }
      }
      // Float unlock code: SFT
      if (!floatAssistUnlocked && key.length === 1) {
        floatAssistCodeBuffer += key.toUpperCase();
        if (floatAssistCodeBuffer.length > 3) floatAssistCodeBuffer = floatAssistCodeBuffer.slice(-3);
        if (floatAssistCodeBuffer === 'SFT') {
          floatAssistUnlocked = true;
          insertAssistOrdered(floatAssist);
          floatAssistUnlockFlash = 60;
        }
      }
      // Sticker unlock code: GLU
      if (!stickerAssistUnlocked && key.length === 1) {
        stickerAssistCodeBuffer += key.toUpperCase();
        if (stickerAssistCodeBuffer.length > 3) stickerAssistCodeBuffer = stickerAssistCodeBuffer.slice(-3);
        if (stickerAssistCodeBuffer === 'GLU') {
          stickerAssistUnlocked = true;
          insertAssistOrdered(stickerAssist);
          stickerAssistUnlockFlash = 60;
        }
      }
      // Serpent unlock code: SNK
      if (!serpentAssistUnlocked && key.length === 1) {
        serpentAssistCodeBuffer += key.toUpperCase();
        if (serpentAssistCodeBuffer.length > 3) serpentAssistCodeBuffer = serpentAssistCodeBuffer.slice(-3);
        if (serpentAssistCodeBuffer === 'SNK') {
          serpentAssistUnlocked = true;
          insertAssistOrdered(serpentAssist);
          serpentAssistUnlockFlash = 60;
        }
      }
      // Master passkey: type imp11 to unlock all secrets
      if (isMasterPasskeyNeeded()) {
        masterCodeBuffer += key.toLowerCase();
        if (masterCodeBuffer.length > 20) masterCodeBuffer = masterCodeBuffer.slice(-20);
        if (masterCodeBuffer.includes('imp11')) {
          masterCodeBuffer = '';
          activateMasterPasskey();
        }
      }
      break;
    }

    case 'difficultySelect':
      if (key === 'ArrowLeft' || key === 'a') difficultyCursor = (difficultyCursor - 1 + difficulties.length) % difficulties.length;
      if (key === 'ArrowRight' || key === 'd') difficultyCursor = (difficultyCursor + 1) % difficulties.length;
      if (key === 'Enter' || key === ' ') {
        cpuDifficulty = difficulties[difficultyCursor];
        levelSelectCursor = 0;
        gameState = 'levelSelect';
      }
      if (key === 'Escape' || key === 'Backspace') {
        gameState = 'assistSelect';
      }
      break;

    case 'levelSelect': {
      const lvls = getLevels();
      const totalItems = lvls.length + 1; // +1 for RANDOM
      const perRow = Math.min(totalItems, 5);

      if (key === 'ArrowLeft' || key === 'a') levelSelectCursor = (levelSelectCursor - 1 + totalItems) % totalItems;
      if (key === 'ArrowRight' || key === 'd') levelSelectCursor = (levelSelectCursor + 1) % totalItems;
      if (key === 'ArrowUp' || key === 'w') {
        levelSelectCursor -= perRow;
        if (levelSelectCursor < 0) levelSelectCursor += totalItems;
      }
      if (key === 'ArrowDown' || key === 's') {
        levelSelectCursor += perRow;
        if (levelSelectCursor >= totalItems) levelSelectCursor -= totalItems;
      }

      if ((key === 'Enter' || key === ' ') && !lotteryActive) {
        if (levelSelectCursor >= lvls.length) {
          // Random
          lotteryFinal = Math.floor(Math.random() * lvls.length);
          lotteryCurrent = 0;
          lotteryTimer = 0;
          lotteryDuration = 90;
          lotteryType = 'level';
          lotteryActive = true;
          lotteryCallback = () => {
            levelSelectCursor = lotteryFinal;
            selectedLevel = lvls[lotteryFinal];
            startVersusScreen();
          };
        } else {
          selectedLevel = lvls[levelSelectCursor];
          startVersusScreen();
        }
      }
      if (key === 'Escape' || key === 'Backspace') {
        if (gameMode === 'rumblePractice') {
          gameState = 'charSelect';
          selectingCPU = false;
          charSelectScroll = 0;
        } else if (gameMode === 'practice') {
          gameState = 'assistSelect';
        } else {
          gameState = 'difficultySelect';
        }
      }

      // Secret level unlock codes
      if (!snowyCityUnlocked && key.length === 1) {
        snowyCityCodeBuffer += key.toUpperCase();
        if (snowyCityCodeBuffer.length > 10) snowyCityCodeBuffer = snowyCityCodeBuffer.slice(-10);
        if (snowyCityCodeBuffer.includes('NY')) {
          snowyCityUnlocked = true;
          snowyCityUnlockFlash = 60;
        }
      }
      if (!foggyCityUnlocked && key.length === 1) {
        foggyCityCodeBuffer += key.toUpperCase();
        if (foggyCityCodeBuffer.length > 10) foggyCityCodeBuffer = foggyCityCodeBuffer.slice(-10);
        if (foggyCityCodeBuffer.includes('SF')) {
          foggyCityUnlocked = true;
          foggyCityUnlockFlash = 60;
        }
      }
      if (!rainyCityUnlocked && key.length === 1) {
        rainyCityCodeBuffer += key.toUpperCase();
        if (rainyCityCodeBuffer.length > 10) rainyCityCodeBuffer = rainyCityCodeBuffer.slice(-10);
        if (rainyCityCodeBuffer.includes('SE')) {
          rainyCityUnlocked = true;
          rainyCityUnlockFlash = 60;
        }
      }
      if (!glowingCityUnlocked && key.length === 1) {
        glowingCityCodeBuffer += key.toUpperCase();
        if (glowingCityCodeBuffer.length > 10) glowingCityCodeBuffer = glowingCityCodeBuffer.slice(-10);
        if (glowingCityCodeBuffer.includes('LV')) {
          glowingCityUnlocked = true;
          glowingCityUnlockFlash = 60;
        }
      }
      if (!sunnyCityUnlocked && key.length === 1) {
        sunnyCityCodeBuffer += key.toUpperCase();
        if (sunnyCityCodeBuffer.length > 10) sunnyCityCodeBuffer = sunnyCityCodeBuffer.slice(-10);
        if (sunnyCityCodeBuffer.includes('LA')) {
          sunnyCityUnlocked = true;
          sunnyCityUnlockFlash = 60;
        }
      }
      break;
    }

    case 'versus':
      if (key === 'Escape') {
        gameState = 'levelSelect';
      }
      break;

    case 'fight':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        stopFightMusic();
        playTitleMusic();
      }
      // Corvida: detect double-tap jump for jay transform
      if ((key === 'ArrowUp' || key === 'w' || key === 'W') && player && player.char.isCorvida && !player.isJay) {
        if (frameCount - player.lastJumpPress < 20) {
          player.corvidaJayPending = true;
          player.lastJumpPress = 0;
        } else {
          player.lastJumpPress = frameCount;
        }
      }
      // Batsch: detect double-tap crouch for tortoise transform
      if ((key === 'ArrowDown' || key === 's' || key === 'S') && player && player.char.isBatsch && !player.isTortoise) {
        if (frameCount - player.lastCrouchPress < 20) {
          player.batschCrouchPending = true;
          player.lastCrouchPress = 0;
        } else {
          player.lastCrouchPress = frameCount;
        }
      }
      break;

    case 'finishHim':
      if (key === ' ') paused = !paused;
      if (key === 'Escape') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      // Rumble code input (only when not paused and no rumble active)
      if (!paused && !rumbleActive && winner === 'player') {
        if (key.length === 1) {
          rumbleCodeBuffer += key.toLowerCase();
          if (rumbleCodeBuffer.length > 10) rumbleCodeBuffer = rumbleCodeBuffer.slice(-10);
          const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
          const rumbleEntry = characterRumbles[winChar.name];
          if (rumbleEntry) {
            const rumbleList = Array.isArray(rumbleEntry) ? rumbleEntry : [rumbleEntry];
            for (const rumble of rumbleList) {
              if (rumbleCodeBuffer.includes(rumble.code)) {
                rumbleActive = true;
                rumbleTimer = 0;
                rumbleType = winChar.name;
                rumbleSubType = rumble.code;
                rumblePracticeUnlocked = true;
                rumbleCodeBuffer = '';
                player.assistActive = null;
                cpu.assistActive = null;
                break;
              }
            }
          }
        }
      }
      break;

    case 'victory':
      if (key === 'Enter' || key === ' ') {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
          break;
        }
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      if ((key === 'Escape' || key === 'Backspace') && gameMode === 'rumblePractice') {
        gameState = 'title';
        paused = false;
        playTitleMusic();
        resetRumbleState();
      }
      break;
  }
}

let player, cpu;

// --- VERSUS SCREEN STATE ---
let versusTimer = 0;
const VERSUS_DURATION = 150; // frames (~2.5 sec at 60fps)

function startVersusScreen() {
  versusTimer = 0;
  gameState = 'versus';
  stopTitleMusic();
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  if (level === 'CLASSIC') playFightMusic();
}

function startRumblePractice() {
  // Create fighters like a normal fight
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  paused = false;
  shakeTimer = 0;
  resetRumbleState();
  // Set player as winner, cpu health to 0
  winner = 'player';
  cpu.health = 0;
  // Clear hit effects on both fighters
  for (const f of [player, cpu]) {
    f.hitEffect = null;
    f.assistActive = null;
    f.queuedAttacks = [];
    f.inputBuffer = [];
    f.aiComboQueue = [];
  }
  // Go straight to finishHim
  finishHimTimer = 0;
  gameState = 'finishHim';
}

function startFight() {
  player = new Fighter(selectedPlayer, 250, 1, true, selectedAssist);
  cpu = new Fighter(selectedCPU, 710, -1, false, assists[cpuAssistIndex]);
  gameState = 'fight';
  paused = false;
  winner = null;
  shakeTimer = 0;
  rumbleActive = false; rumbleTimer = 0; rumbleType = null;
  rumbleCodeBuffer = ''; rumbleAshes = null; rumbleLoserHidden = false; rumbleIceShards = [];
        rumbleAcidBlob = null; rumbleGoo = null; rumbleAcidSplashes = []; rumbleVenomMeltPct = 0; rumbleVenomDrips = [];
        rumbleLightBurst = null; rumbleLightParticles = []; rumbleZapActive = false;
        rumbleSinkhole = null; rumbleSinkProgress = 0; rumbleDirtParticles = [];
        rumbleShadePoof = false; rumbleSmokeParticles = []; rumbleShadeComboHit = 0; rumbleShadeBrush = false;
        rumbleBojdoPhase = 0; rumbleBojdoLaunchVy = 0;
        rumbleTetherAngle = 0; rumbleTetherSlams = 0; rumbleTetherCracked = false; rumbleTetherGrabX = 0;
        rumbleTorrenaPhase = 0; rumbleTorrenaCloudX = 0; rumbleTorrenaCloudY = 0; rumbleRaindrops = []; rumbleHailstone = null; rumbleHailCracked = false; rumbleHailShards = []; rumbleTorrenaEvapParticles = [];
        rumbleSnazzDiscoBall = null; rumbleSnazzConfetti = []; rumbleSnazzPunchLanded = false;
        rumbleHaystackRavens = []; rumbleHaystackScythe = false; rumbleHaystackStrike = false; rumbleHaystackDust = []; rumbleHaystackDiveStart = null;
        rumbleCodemaxLaser = false; rumbleCodemaxPixelLevel = 0; rumbleCodemaxGlitch = 0; rumbleCodemaxLaserParticles = [];
        rumbleCorvidaPhase = 0; rumbleCorvidaNestX = 0; rumbleCorvidaEggs = []; rumbleCorvidaGulpChick = -1;
        rumbleGolgarEntity2 = null; rumbleGolgarPhase = 0; rumbleGolgarLaunchVy = 0; rumbleGolgarOpX = 0;
        if (player) { player.rubberArmReach = 0; player._hideFrontArm = false; player._hideBackArm = false; player._rumbleRotation = 0; }
        if (cpu) { cpu.rubberArmReach = 0; cpu._hideFrontArm = false; cpu._hideBackArm = false; cpu._rumbleRotation = 0; }
        if (player) { player._brushArmT = undefined; player._rumbleAlpha = undefined; }
        if (cpu) { cpu._brushArmT = undefined; cpu._rumbleAlpha = undefined; }
}

// --- DRAWING FUNCTIONS ---
// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to backgrounds/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

// --- MAIN LOOP ---
function update() {
  // Lottery animation update
  if (lotteryActive) {
    lotteryTimer++;
    const progress = lotteryTimer / lotteryDuration;
    // Speed decreases as progress increases: fast at start, slow near end
    const interval = Math.max(2, Math.floor(2 + progress * progress * 20));
    const isChar = lotteryType === 'char' || lotteryType === 'cpu';
    const isLevel = lotteryType === 'level';
    const pool = isLevel ? getLevels() : (isChar ? characters : assists);
    if (lotteryTimer % interval === 0) {
      // Cycle to a random different index
      let next;
      do { next = Math.floor(Math.random() * pool.length); } while (next === lotteryCurrent && pool.length > 1);
      lotteryCurrent = next;
    }
    if (lotteryTimer >= lotteryDuration) {
      lotteryCurrent = lotteryFinal;
    }
    if (lotteryTimer >= lotteryDuration + 30) {
      lotteryActive = false;
      if (lotteryCallback) lotteryCallback();
      lotteryCallback = null;
    }
  }

  if (gameState === 'fight' && !paused && !winner) {
    frameCount++;
    // Screen shake
    if (shakeTimer > 0) shakeTimer--;

    player.update(cpu, keys);
    cpu.update(player, {});

    // Push apart if overlapping (skip if water phase or Matador dashing)
    const matadorDashing = player.matadorDashing || cpu.matadorDashing;
    if (!player.waterPhase && !cpu.waterPhase && !matadorDashing) {
      // Allow jumping over: skip push-apart only when one fighter is high enough above the other
      // Paletap: so tall that opponents must crouch under his legs instead of jumping over
      const paletapInvolved = player.char.isPaletap || cpu.char.isPaletap;
      const crouchingUnder = paletapInvolved && (
        (cpu.char.isPaletap && player.crouching && player.grounded) ||
        (player.char.isPaletap && cpu.crouching && cpu.grounded)
      );
      const jumpingOver = (!player.grounded && player.y < cpu.y - 50) || (!cpu.grounded && cpu.y < player.y - 50);
      if (!jumpingOver && !crouchingUnder) {
        const overlap = 40 - Math.abs(player.x - cpu.x);
        if (overlap > 0) {
          const push = overlap / 2 + 0.5;
          if (player.x < cpu.x) {
            player.x -= push;
            cpu.x += push;
          } else {
            player.x += push;
            cpu.x -= push;
          }
        }
      }
    }


    // Check victory (not in practice mode)
    if (gameMode !== 'practice') {
      if (player.health <= 0 || cpu.health <= 0) {
        winner = player.health <= 0 ? 'cpu' : 'player';
        finishHimTimer = 0;
        gameState = 'finishHim';
        stopFightMusic();
        // Clear hit effects, projectiles, and particles on both fighters
        for (const f of [player, cpu]) {
          f.hitEffect = null;
          f.assistActive = null;
          f.queuedAttacks = [];
          f.inputBuffer = [];
          f.aiComboQueue = [];
          f.haystackProjectiles = [];
          f.hayParticles = [];
          f.buckFireworks = [];
          f.buckExplosions = [];
          f.exorSoulParticles = [];
          f.matadorRoses = [];
          f.xhaustFlames = [];
          f.vorticeTornadoParticles = [];
          f.state = f === (winner === 'player' ? cpu : player) ? 'idle' : f.state;
          if (f.assistFighter) f.assistFighter = null;
        }
        // Set loser to idle
        const loseFighter = winner === 'player' ? cpu : player;
        loseFighter.state = 'idle';
      }
    }
  }

  // Finish Him phase: winner can still move, loser is passive
  if (gameState === 'finishHim' && !paused) {
    const winFighter = winner === 'player' ? player : cpu;
    const loseFighter = winner === 'player' ? cpu : player;

    if (rumbleActive) {
      // Rumble animation is playing — timer stops, fighters freeze
      rumbleTimer++;
      if (shakeTimer > 0) shakeTimer--;

      if (rumbleType === 'BLAZE') {
        // Blaze Scorched Earth: 210 frames total
        // 0-30: pillar rises, 30-120: full blaze, 120-150: fade, 150-170: ashes settle, 170-210: pause on ashes
        if (rumbleTimer >= 10 && rumbleTimer <= 120) {
          shakeTimer = 2;
          shakeIntensity = rumbleTimer < 30 ? 3 : 5;
        }
        if (rumbleTimer >= 30) {
          rumbleLoserHidden = true;
        }
        if (rumbleTimer >= 150 && !rumbleAshes) {
          rumbleAshes = { x: loseFighter.x, y: loseFighter.groundY };
        }
        if (rumbleTimer >= 210) {
          gameState = 'victory';
        }
        // Winner idles during Blaze rumble
        winFighter.vx = 0;
        winFighter.state = 'idle';
      }

      if (rumbleType === 'ARTIK') {
        // Artik Oppsicle: 270 frames total
        // 0-40: freeze solid (ice overlay intensifies)
        // 40-140: Artik walks toward opponent
        // 140-155: Artik winds up punch
        // 155-165: Punch connects, shatter, screen shake
        // 165-270: shards fly and settle
        const freezeEnd = 40;
        const walkEnd = 140;
        const windupEnd = 155;
        const punchFrame = 158;
        const shatterEnd = 165;
        const endFrame = 270;

        if (rumbleTimer <= freezeEnd) {
          // Freeze phase — loser gets frozen visual
          loseFighter.frozenTimer = 999;
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          const dir = loseFighter.x > winFighter.x ? 1 : -1;
          const dist = Math.abs(winFighter.x - loseFighter.x);
          winFighter.facing = dir;
          if (dist > 50) {
            winFighter.vx = dir * 2.5;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — face opponent, idle
          winFighter.vx = 0;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= shatterEnd) {
          // Punch!
          winFighter.vx = 0;
          winFighter.state = 'attack';
          if (rumbleTimer === punchFrame && rumbleIceShards.length === 0) {
            // Shatter — spawn ice shards from loser's body
            rumbleLoserHidden = true;
            loseFighter.frozenTimer = 0;
            shakeTimer = 15;
            shakeIntensity = 8;
            const sx = loseFighter.x;
            const sy = loseFighter.y - 30; // center of body
            for (let i = 0; i < 24; i++) {
              const angle = (Math.random() * Math.PI * 2);
              const speed = 2 + Math.random() * 6;
              rumbleIceShards.push({
                x: sx + (Math.random() - 0.5) * 30,
                y: sy + (Math.random() - 0.5) * 60,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 3,
                size: 3 + Math.random() * 8,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.3,
                alpha: 1,
                color: ['#aaeeff', '#ccf0ff', '#88ccee', '#ffffff', '#66bbdd'][Math.floor(Math.random() * 5)]
              });
            }
          }
        } else {
          // Shards flying and fading
          winFighter.vx = 0;
          winFighter.state = 'idle';
        }

        // Update ice shards
        for (const s of rumbleIceShards) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.15; // gravity
          s.rot += s.rotSpeed;
          s.vx *= 0.98;
          // Fade out in last phase
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.012);
          }
          // Bounce off ground
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.4;
            s.vx *= 0.7;
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'VENOM') {
        // Venom You've Been Pardoned: 270 frames total
        // 0-30: Venom faces opponent, winds up spit
        // 30-31: Launch acid blob projectile
        // 31-??: Blob flies toward opponent (variable, depends on distance)
        // impact: splash, opponent starts melting
        // impact+120: fully melted Wicked Witch style
        // last 90 frames: goo puddle bubbles
        const spitFrame = 30;
        const endFrame = 330;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < spitFrame) {
          // Wind up
          winFighter.state = 'idle';
        } else if (rumbleTimer === spitFrame) {
          // Spit blob
          winFighter.state = 'attack';
          rumbleAcidBlob = {
            x: winFighter.x + dir * 25,
            y: winFighter.y - 35,
            vx: dir * 7,
            vy: -2
          };
        } else if (rumbleAcidBlob) {
          // Blob in flight
          winFighter.state = 'idle';
          rumbleAcidBlob.x += rumbleAcidBlob.vx;
          rumbleAcidBlob.y += rumbleAcidBlob.vy;
          rumbleAcidBlob.vy += 0.12; // gravity arc

          // Check if blob reached opponent
          if (Math.abs(rumbleAcidBlob.x - loseFighter.x) < 25 && Math.abs(rumbleAcidBlob.y - loseFighter.y + 20) < 50) {
            // Impact — spawn splashes
            for (let i = 0; i < 16; i++) {
              const angle = Math.random() * Math.PI * 2;
              const speed = 1 + Math.random() * 4;
              rumbleAcidSplashes.push({
                x: loseFighter.x + (Math.random() - 0.5) * 20,
                y: loseFighter.y - 20 + (Math.random() - 0.5) * 30,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#44cc00', '#33aa00', '#66dd22', '#88ee44', '#22aa00'][Math.floor(Math.random() * 5)]
              });
            }
            rumbleAcidBlob = null;
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else {
          // Post-impact: Wicked Witch melting phase
          winFighter.state = 'idle';
          if (!rumbleLoserHidden) {
            if (!rumbleGoo) {
              rumbleGoo = { x: loseFighter.x, y: loseFighter.groundY, meltTimer: 0 };
            }
            rumbleGoo.meltTimer++;
            rumbleVenomMeltPct = Math.min(1, rumbleGoo.meltTimer / 120); // slower melt over 120 frames

            // Spawn drips from the body as it melts
            if (rumbleGoo.meltTimer % 3 === 0 && rumbleVenomMeltPct < 0.95) {
              const bodyTop = loseFighter.y - 60 * (1 - rumbleVenomMeltPct);
              const bodyBot = loseFighter.groundY;
              const dripY = bodyTop + Math.random() * (bodyBot - bodyTop) * 0.6;
              const side = Math.random() > 0.5 ? 1 : -1;
              rumbleVenomDrips.push({
                x: loseFighter.x + side * (8 + Math.random() * 14),
                y: dripY,
                vx: side * (0.2 + Math.random() * 0.5),
                vy: 0.5 + Math.random() * 1.5,
                size: 2 + Math.random() * 3,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#44cc00', '#33aa00', '#66dd22', '#228800'][Math.floor(Math.random() * 4)]
              });
            }

            if (rumbleGoo.meltTimer >= 120) {
              rumbleLoserHidden = true;
            }
          }
        }

        // Update drips and remove dead ones
        for (let i = rumbleVenomDrips.length - 1; i >= 0; i--) {
          const d = rumbleVenomDrips[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.15;
          if (d.y >= loseFighter.groundY) {
            d.y = loseFighter.groundY;
            d.vy = 0;
            d.vx = 0;
            d.alpha = Math.max(0, d.alpha - 0.02);
          }
          if (d.alpha <= 0) rumbleVenomDrips.splice(i, 1);
        }

        // Update acid splashes
        for (const s of rumbleAcidSplashes) {
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.1;
          s.vx *= 0.97;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy = 0;
            s.vx *= 0.5;
          }
          if (rumbleTimer > 200) {
            s.alpha = Math.max(0, s.alpha - 0.015);
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SURGE') {
        // Surge Mr. Electric Boom: 300 frames total
        // 0-30: Surge raises hands, faces opponent
        // 30-120: Electricity beam connects, opponent overcharges (glows brighter)
        // 120-130: Screen goes white, opponent explodes
        // 130-300: Beautiful light particles expand and fade
        const zapStart = 30;
        const zapEnd = 120;
        const explodeFrame = 125;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < zapStart) {
          winFighter.state = 'idle';
        } else if (rumbleTimer < zapEnd) {
          // Zapping phase
          winFighter.state = 'attack';
          rumbleZapActive = true;
          // Loser glows and shakes increasingly
          loseFighter.flashTimer = 2;
        } else if (rumbleTimer === explodeFrame) {
          // Explosion!
          rumbleZapActive = false;
          rumbleLoserHidden = true;
          rumbleLightBurst = { x: loseFighter.x, y: loseFighter.y - 30, timer: 0 };
          shakeTimer = 25;
          shakeIntensity = 12;
          // Spawn beautiful light particles
          for (let i = 0; i < 40; i++) {
            const angle = (i / 40) * Math.PI * 2 + Math.random() * 0.3;
            const speed = 1.5 + Math.random() * 5;
            const hue = Math.floor(Math.random() * 360);
            rumbleLightParticles.push({
              x: loseFighter.x,
              y: loseFighter.y - 30,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1,
              size: 3 + Math.random() * 7,
              alpha: 1,
              hue: hue,
              glow: 10 + Math.random() * 20,
              decay: 0.003 + Math.random() * 0.004
            });
          }
        } else {
          winFighter.state = 'idle';
          rumbleZapActive = false;
        }

        // Update light burst
        if (rumbleLightBurst) {
          rumbleLightBurst.timer++;
        }

        // Update light particles
        for (const p of rumbleLightParticles) {
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.03; // very light gravity
          p.vx *= 0.995;
          p.alpha = Math.max(0, p.alpha - p.decay);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TITAN') {
        // Titan "And what are you sinking about?": 300 frames total
        // 0-40: Titan stomps / raises fist, ground starts rumbling
        // 40-60: Sinkhole opens under opponent, dirt flies out
        // 60-180: Opponent sinks into the hole, struggling
        // 180-240: Hole closes over them
        // 240-300: Ground settles, dust clears
        const stompFrame = 30;
        const holeStart = 40;
        const sinkStart = 60;
        const sinkEnd = 180;
        const closeStart = 180;
        const closeEnd = 240;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer < stompFrame) {
          winFighter.state = 'idle';
        } else if (rumbleTimer === stompFrame) {
          // Stomp!
          winFighter.state = 'attack';
          shakeTimer = 20;
          shakeIntensity = 8;
        } else if (rumbleTimer >= holeStart && rumbleTimer < sinkStart) {
          // Sinkhole opening
          winFighter.state = 'idle';
          if (!rumbleSinkhole) {
            rumbleSinkhole = {
              x: loseFighter.x,
              y: loseFighter.groundY,
              radius: 0,
              maxRadius: 55
            };
          }
          const openPct = (rumbleTimer - holeStart) / (sinkStart - holeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * openPct;

          // Spawn dirt particles as it opens
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              const angle = -Math.PI * Math.random();
              const speed = 2 + Math.random() * 4;
              rumbleDirtParticles.push({
                x: loseFighter.x + (Math.random() - 0.5) * 40,
                y: loseFighter.groundY - Math.random() * 5,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 2,
                size: 2 + Math.random() * 4,
                alpha: 1,
                color: ['#8B7355', '#6B5B3A', '#A0926B', '#554433'][Math.floor(Math.random() * 4)]
              });
            }
          }
          shakeTimer = 2;
          shakeIntensity = 3;
        } else if (rumbleTimer >= sinkStart && rumbleTimer <= sinkEnd) {
          // Opponent sinking
          winFighter.state = 'idle';
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius;
          rumbleSinkProgress = Math.min(1, (rumbleTimer - sinkStart) / (sinkEnd - sinkStart));

          // Continuous small rumble
          if (rumbleTimer % 10 === 0) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Occasional dirt bursts
          if (rumbleTimer % 8 === 0) {
            const angle = -Math.PI * Math.random();
            const speed = 1 + Math.random() * 3;
            rumbleDirtParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 50,
              y: loseFighter.groundY - Math.random() * 3,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 1.5,
              size: 2 + Math.random() * 3,
              alpha: 0.8,
              color: ['#8B7355', '#6B5B3A', '#A0926B'][Math.floor(Math.random() * 3)]
            });
          }

          // Hide loser once fully sunk
          if (rumbleSinkProgress >= 1) {
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer >= closeStart && rumbleTimer < closeEnd) {
          // Hole closing
          winFighter.state = 'idle';
          const closePct = (rumbleTimer - closeStart) / (closeEnd - closeStart);
          rumbleSinkhole.radius = rumbleSinkhole.maxRadius * (1 - closePct);

          if (rumbleTimer === closeStart) {
            shakeTimer = 10;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer >= closeEnd) {
          // Ground settled
          winFighter.state = 'idle';
          rumbleSinkhole.radius = 0;
        }

        // Update dirt particles
        for (let i = rumbleDirtParticles.length - 1; i >= 0; i--) {
          const d = rumbleDirtParticles[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy += 0.2; // gravity
          d.vx *= 0.98;
          if (d.y > loseFighter.groundY + 5) {
            d.alpha = Math.max(0, d.alpha - 0.05);
          }
          if (d.alpha <= 0) rumbleDirtParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SHADE') {
        // Shade "Wanted the smoke, got the smoke": 360 frames total
        // 0-30: Shade walks toward opponent
        // 30-160: Rapid martial arts combo (punches and kicks)
        // 160-170: Wind-up for final jab
        // 170-175: Final hard jab — opponent poofs into smoke
        // 175-280: Smoke dissipates, Shade brushes shoulder
        // 280-360: Pause on the cool pose
        const walkEnd = 30;
        const comboStart = 30;
        const comboEnd = 160;
        const windupEnd = 170;
        const poofFrame = 175;
        const brushStart = 290;
        const endFrame = 420;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        // Combo hit schedule: frame offsets from comboStart
        // Alternating punches and kicks with increasing speed
        const comboHits = [0, 15, 28, 39, 48, 56, 63, 69, 74, 79, 84, 89, 94, 99, 104, 109, 114, 118, 122, 126];

        if (rumbleTimer < walkEnd) {
          // Walk toward opponent — stop at 85px so punches/kicks are visible
          const dist = Math.abs(winFighter.x - loseFighter.x);
          if (dist > 85) {
            winFighter.vx = dir * 3;
            winFighter.x += winFighter.vx;
            winFighter.state = 'walk';
          } else {
            winFighter.vx = 0;
            winFighter.state = 'idle';
          }
        } else if (rumbleTimer >= comboStart && rumbleTimer < comboEnd) {
          // Martial arts combo
          winFighter.vx = 0;
          const comboFrame = rumbleTimer - comboStart;

          // Check if this frame is a hit frame
          const hitIndex = comboHits.indexOf(comboFrame);
          if (hitIndex !== -1) {
            rumbleShadeComboHit = hitIndex + 1;
            winFighter.state = 'attack';
            // Cycle through attack types so the animation shows different moves
            const moveOrder = [attacks.jab, attacks.lowKick, attacks.uppercut, attacks.highKick];
            winFighter.currentAttack = moveOrder[hitIndex % moveOrder.length];
            winFighter.attackFrame = 0;
            // Small screen shake on each hit
            shakeTimer = 3;
            shakeIntensity = 2 + Math.floor(hitIndex / 5);
            // Flash the loser
            loseFighter.flashTimer = 4;
          } else {
            // Between hits — advance the attack animation frame
            if (winFighter.state === 'attack' && winFighter.currentAttack) {
              winFighter.attackFrame++;
              const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
              if (winFighter.attackFrame >= total) {
                winFighter.state = 'idle';
                winFighter.currentAttack = null;
                winFighter.attackFrame = 0;
              }
            }
          }
        } else if (rumbleTimer >= comboEnd && rumbleTimer < windupEnd) {
          // Wind-up for final jab
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer === poofFrame) {
          // Final hard jab — opponent turns to smoke!
          winFighter.state = 'attack';
          winFighter.currentAttack = attacks.jab;
          winFighter.attackFrame = 0;
          shakeTimer = 15;
          shakeIntensity = 10;
          rumbleShadePoof = true;
          rumbleLoserHidden = true;

          // Spawn smoke particles at opponent's position
          for (let i = 0; i < 35; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = 0.5 + Math.random() * 2.5;
            rumbleSmokeParticles.push({
              x: loseFighter.x + (Math.random() - 0.5) * 30,
              y: loseFighter.y - 30 + (Math.random() - 0.5) * 40,
              vx: Math.cos(angle) * speed,
              vy: Math.sin(angle) * speed - 0.8,
              size: 8 + Math.random() * 18,
              alpha: 0.7 + Math.random() * 0.3,
              growRate: 0.3 + Math.random() * 0.5,
              shade: Math.floor(40 + Math.random() * 60)
            });
          }
        } else if (rumbleTimer > poofFrame && rumbleTimer < brushStart) {
          // Post-poof: let final jab animation finish, then idle
          winFighter.vx = 0;
          if (winFighter.state === 'attack' && winFighter.currentAttack) {
            winFighter.attackFrame++;
            const total = winFighter.currentAttack.startup + winFighter.currentAttack.active + winFighter.currentAttack.recovery;
            if (winFighter.attackFrame >= total) {
              winFighter.state = 'idle';
              winFighter.currentAttack = null;
              winFighter.attackFrame = 0;
            }
          }
        } else if (rumbleTimer >= brushStart) {
          // Brush dust off shoulder — idle pose with arm override
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.currentAttack = null;
          rumbleShadeBrush = true;
          // Set brush arm progress (0 to 1 over 80 frames)
          const brushProgress = Math.min(1, (rumbleTimer - brushStart) / 80);
          winFighter._brushArmT = brushProgress;
        }

        // Update smoke particles
        for (let i = rumbleSmokeParticles.length - 1; i >= 0; i--) {
          const p = rumbleSmokeParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy -= 0.02; // smoke rises
          p.vx *= 0.98;
          p.size += p.growRate; // smoke expands
          p.growRate *= 0.97; // expansion slows
          p.alpha = Math.max(0, p.alpha - 0.01);
          if (p.alpha <= 0) rumbleSmokeParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if ((rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleSubType === 'pellet') {
        // Bojdo "Death from below": 300 frames total
        // 0-40: Bojdo shrinks to tiny size
        // 40-90: Tiny Bojdo scurries under the opponent
        // 90-110: Pause underneath
        // 110-180: Grows back to normal, launching opponent upward
        // 180-240: Opponent flies offscreen
        // 240-300: Bojdo stands triumphant
        const shrinkEnd = 40;
        const scurryEnd = 90;
        const pauseEnd = 110;
        const growEnd = 180;
        const endFrame = 300;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= shrinkEnd) {
          // Shrink phase: Bojdo gets tiny
          winFighter.vx = 0;
          winFighter.state = 'idle';
          const t = rumbleTimer / shrinkEnd;
          winFighter.bojdoScale = Math.max(0.15, 1 - t * 0.85);
        } else if (rumbleTimer <= scurryEnd) {
          // Scurry phase: tiny Bojdo runs toward opponent
          winFighter.state = 'walk';
          winFighter.bojdoScale = 0.15;
          const targetX = loseFighter.x;
          const dist = targetX - winFighter.x;
          if (Math.abs(dist) > 5) {
            const speed = 4;
            winFighter.x += dist > 0 ? speed : -speed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = targetX;
          }
          winFighter.vx = 0;
        } else if (rumbleTimer <= pauseEnd) {
          // Pause underneath: centered under opponent
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 0.15;
        } else if (rumbleTimer <= growEnd) {
          // Grow phase: expand back to full size, pushing opponent up
          winFighter.vx = 0;
          winFighter.x = loseFighter.x;
          winFighter.state = 'idle';
          const growT = (rumbleTimer - pauseEnd) / (growEnd - pauseEnd);
          const easeGrow = growT * growT; // accelerating growth
          winFighter.bojdoScale = 0.15 + easeGrow * 0.85;

          // Push the loser upward as Bojdo grows
          if (growT < 0.8) {
            loseFighter.y = loseFighter.groundY - growT * 80;
            loseFighter.grounded = false;
          }
          // At full size, launch!
          if (rumbleTimer === growEnd) {
            rumbleBojdoLaunchVy = -18;
            shakeTimer = 15;
            shakeIntensity = 10;
          }
        } else {
          // Post-launch: opponent flies offscreen, Bojdo stands proud
          winFighter.vx = 0;
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1.0;

          // Launch the loser upward — no gravity, they fly offscreen
          if (!rumbleLoserHidden) {
            loseFighter.y += rumbleBojdoLaunchVy;
            loseFighter.vy = rumbleBojdoLaunchVy; // override so gravity code doesn't pull them back
            loseFighter.grounded = false;
            if (loseFighter.y < -150) {
              rumbleLoserHidden = true;
            }
          }
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv') {
        // Bojdobojdo "Death from above": 340 frames total
        // 0-var: Walk to opponent
        // var-var+60: Grows to gargantuan size (only bottom half visible)
        // +60-+90: Raises one leg (stomp windup)
        // +90-+100: Stomps down on opponent
        // +100-+200: Foot on ground, opponent flattened
        // +200-+260: Lifts foot, shrinks back to normal
        // +260-+300: Stands triumphant
        const walkSpeed = 3;
        const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
        const walkFrames = Math.max(10, Math.ceil(distToOpponent / walkSpeed));
        const walkEnd = walkFrames;
        const growEnd2 = walkEnd + 60;
        const raiseEnd = growEnd2 + 30;
        const stompFrame = raiseEnd + 10;
        const holdEnd = stompFrame + 100;
        const shrinkEnd2 = holdEnd + 60;
        const endFrame2 = shrinkEnd2 + 40;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= walkEnd) {
          // Walk toward opponent
          winFighter.state = 'walk';
          const dist = loseFighter.x - winFighter.x;
          if (Math.abs(dist) > 5) {
            winFighter.x += dist > 0 ? walkSpeed : -walkSpeed;
            winFighter.facing = dist > 0 ? 1 : -1;
          } else {
            winFighter.x = loseFighter.x;
          }
        } else if (rumbleTimer <= growEnd2) {
          // Grow to gargantuan
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          const t = (rumbleTimer - walkEnd) / (growEnd2 - walkEnd);
          const easeT = t * t;
          winFighter.bojdoScale = 1 + easeT * 7; // grow to 8x
          if (rumbleTimer > 10) {
            shakeTimer = 2;
            shakeIntensity = 2 + t * 4;
          }
        } else if (rumbleTimer <= raiseEnd) {
          // Foot raised — we track via rumbleBojdoPhase
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 1; // signal to draw: leg raised
        } else if (rumbleTimer <= stompFrame) {
          // Stomp down!
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2; // signal to draw: stomp
          if (rumbleTimer === stompFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleLoserHidden = true;
          }
        } else if (rumbleTimer <= holdEnd) {
          // Hold foot down
          winFighter.state = 'idle';
          winFighter.x = loseFighter.x;
          winFighter.bojdoScale = 8;
          rumbleBojdoPhase = 2;
        } else if (rumbleTimer <= shrinkEnd2) {
          // Shrink back to normal
          winFighter.state = 'idle';
          rumbleBojdoPhase = 0;
          const t = (rumbleTimer - holdEnd) / (shrinkEnd2 - holdEnd);
          winFighter.bojdoScale = 8 - t * 7; // back to 1
        } else {
          // Stand triumphant
          winFighter.state = 'idle';
          winFighter.bojdoScale = 1;
          rumbleBojdoPhase = 0;
        }

        if (rumbleTimer >= endFrame2) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'RUBBERMAN') {
        // Rubberman "Tetherball": 360 frames total
        // 0-30: Rubberman reaches out and grabs opponent
        // 30-240: Swings opponent back and forth, slamming into ground
        // 240-260: Winds up for final overhead smash
        // 260-270: Final smash into ground
        // 270-360: Opponent stuck in cracked ground, Rubberman retracts arm
        const grabEnd = 30;
        const swingEnd = 150;
        const windupEnd = 170;
        const smashFrame = 180;
        const endFrame = 280;
        const numSwings = 6;

        winFighter.vx = 0;

        // On first frame, store the fixed grab distance and direction
        if (rumbleTimer === 1) {
          rumbleTetherGrabX = Math.abs(loseFighter.x - winFighter.x);
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        }
        const dir = winFighter.facing;
        const pivotX = winFighter.x;
        const groundY = loseFighter.groundY;
        const armLen = Math.max(80, rumbleTetherGrabX);

        // Hide the fighter's normal front arm — the custom stretchy arm replaces it
        winFighter._hideFrontArm = true;

        if (rumbleTimer <= grabEnd) {
          // Reach out and grab
          winFighter.state = 'attack';
        } else if (rumbleTimer <= swingEnd) {
          // Swinging phase
          winFighter.state = 'walk'; // walk anim makes him look active/braced
          const swingTime = rumbleTimer - grabEnd;
          const swingDuration = swingEnd - grabEnd;

          const progress = swingTime / swingDuration;
          const swingAngle = progress * numSwings * Math.PI;
          rumbleTetherAngle = swingAngle;

          // Opponent on semicircular arc, grounded at extremes
          loseFighter.x = pivotX + Math.cos(swingAngle) * armLen;
          loseFighter.y = groundY - Math.abs(Math.sin(swingAngle)) * armLen;
          loseFighter.grounded = false;

          // Rotate opponent to follow the arc — body trails behind the swing direction
          // The tangent angle of the arc gives the direction of travel
          const sinA = Math.sin(swingAngle);
          const cosA = Math.cos(swingAngle);
          // Rotation: head points outward along the arc
          loseFighter._rumbleRotation = -swingAngle + Math.PI / 2;

          // Detect ground slams
          const prevSwingAngle = ((swingTime - 1) / swingDuration) * numSwings * Math.PI;
          if (Math.floor(swingAngle / Math.PI) !== Math.floor(prevSwingAngle / Math.PI) && swingTime > 3) {
            rumbleTetherSlams++;
            shakeTimer = 8;
            shakeIntensity = 5 + rumbleTetherSlams * 2;
            loseFighter.y = groundY;
          }

          // Rubberman leans into the swing
          winFighter.facing = cosA > 0 ? 1 : -1;
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — smoothly arc opponent from last swing position to overhead
          winFighter.state = 'idle';
          winFighter.facing = dir;
          const windupDur = windupEnd - swingEnd;
          const t = (rumbleTimer - swingEnd) / windupDur;
          const ease = t * t; // ease in

          // Starting position: where swing ended (last swing angle)
          const finalSwingAngle = numSwings * Math.PI;
          const startX = pivotX + Math.cos(finalSwingAngle) * armLen;
          const startY = groundY - Math.abs(Math.sin(finalSwingAngle)) * armLen;
          // End position: directly overhead
          const endX = pivotX;
          const endY = groundY - armLen;

          // Arc upward via an intermediate high point
          loseFighter.x = startX + (endX - startX) * ease;
          // Use a smooth arc — go up first then settle overhead
          loseFighter.y = startY + (endY - startY) * ease - Math.sin(t * Math.PI) * 30;
          loseFighter.grounded = false;

          // Smoothly rotate from last swing rotation to upside down (PI)
          const lastSwingRot = -finalSwingAngle + Math.PI / 2;
          // Normalize to closest equivalent of PI
          const targetRot = Math.PI;
          loseFighter._rumbleRotation = lastSwingRot + (targetRot - lastSwingRot) * ease;
        } else if (rumbleTimer <= smashFrame) {
          // Final smash — arc from overhead down to the ground at a distance
          winFighter.state = 'attack';
          winFighter.facing = dir;
          const smashDist = Math.min(armLen * 0.8, 200); // land further out
          const smashDur = smashFrame - windupEnd;
          const t = (rumbleTimer - windupEnd) / smashDur;

          // Start: overhead (pivotX, groundY - armLen)
          const startX = pivotX;
          const startY = groundY - armLen;
          // End: on the ground further out
          const endX = pivotX + dir * smashDist;
          const endY = groundY;

          // Smooth arc down: x moves linearly, y uses cubic ease for impact feel
          loseFighter.x = startX + (endX - startX) * t;
          loseFighter.y = startY + (endY - startY) * t * t * t;
          loseFighter.grounded = false;

          // Rotate from upside down (PI) to face-down (PI/2)
          loseFighter._rumbleRotation = Math.PI * (1 - t * 0.5);

          if (rumbleTimer === smashFrame) {
            shakeTimer = 25;
            shakeIntensity = 15;
            rumbleTetherCracked = true;
            rumbleTetherGrabX = loseFighter.x; // store final smash X for draw
            loseFighter.y = groundY;
          }
        } else {
          // Retract, opponent face-down in cracked ground
          winFighter.state = 'idle';
          winFighter.facing = dir;
          winFighter._hideFrontArm = false;
          const smashX = rumbleTetherGrabX; // stored from smash impact
          loseFighter.x = smashX;
          loseFighter.y = groundY;
          loseFighter.grounded = true;
          loseFighter._rumbleRotation = 0;
          if (!rumbleLoserHidden) {
            rumbleLoserHidden = true;
          }
        }

        if (rumbleTimer >= endFrame) {
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'GOLGAR') {
        // Golgar "You Must Be Double Dead!": ~340 frames
        // 0-40: Second entity walks to other side of opponent
        // 40-70: Both entities grab opponent's arms
        // 70-120: Wind up — pull opponent back together
        // 120-140: Swing forward and release — launch!
        // 140-200: Opponent flies diagonally into the sky
        // 200-280: Both entities face each other and high-five
        // 280-340: Settle
        const walkEnd = 40;
        const grabEnd = 70;
        const windupEnd = 120;
        const launchFrame = 135;
        const flyEnd = 200;
        const highFiveStart = 220;
        const highFiveHit = 250;
        const endFrame = 340;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (!rumbleGolgarEntity2) {
          // Initialize on first frame
          rumbleGolgarEntity2 = {
            x: winFighter.golgarOtherX,
            y: winFighter.golgarOtherY || winFighter.y,
            facing: -dir
          };
          rumbleGolgarPhase = 0;
          rumbleGolgarLaunchVy = 0;
          rumbleGolgarOpX = loseFighter.x; // store opponent position once
        }

        const e2 = rumbleGolgarEntity2;
        // Target positions: one on each side of opponent (fixed from start)
        const entity1TargetX = rumbleGolgarOpX - dir * 45;
        const entity2TargetX = rumbleGolgarOpX + dir * 45;

        if (rumbleTimer <= walkEnd) {
          // Both entities walk toward opponent from each side
          rumbleGolgarPhase = 0;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.08;
          e2.x += (entity2TargetX - e2.x) * 0.08;
          e2.y = winFighter.groundY;
          e2.facing = -dir;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= grabEnd) {
          // Grab opponent's arms — both face inward
          rumbleGolgarPhase = 1;
          winFighter.x += (entity1TargetX - winFighter.x) * 0.15;
          e2.x += (entity2TargetX - e2.x) * 0.15;
          winFighter.facing = dir;
          e2.facing = -dir;
          winFighter.state = 'idle';
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= windupEnd) {
          // Wind up — both step back together (away from launch direction), pulling opponent
          rumbleGolgarPhase = 2;
          const t = (rumbleTimer - grabEnd) / (windupEnd - grabEnd);
          const pullBack = Math.sin(t * Math.PI * 0.5) * 50; // pull back away from launch dir
          winFighter.x = entity1TargetX - dir * pullBack;
          e2.x = entity2TargetX - dir * pullBack;
          // Opponent follows between them
          loseFighter.x = (winFighter.x + e2.x) / 2;
          loseFighter.y = winFighter.groundY;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= launchFrame) {
          // Swing forward and release — both lunge forward together
          rumbleGolgarPhase = 3;
          const t = (rumbleTimer - windupEnd) / (launchFrame - windupEnd);
          const ease = t * t;
          const swingForward = ease * 100;
          winFighter.x = (entity1TargetX - dir * 50) + dir * swingForward;
          e2.x = (entity2TargetX - dir * 50) + dir * swingForward;
          loseFighter.x = (winFighter.x + e2.x) / 2;
          // At launch frame, release opponent
          if (rumbleTimer === launchFrame) {
            rumbleGolgarLaunchVy = -18;
            shakeTimer = 10;
            shakeIntensity = 8;
          }
        } else if (rumbleTimer <= flyEnd) {
          // Opponent flies diagonally into the sky — slingshot angle
          rumbleGolgarPhase = 4;
          winFighter.state = 'idle';
          loseFighter.x += dir * 10; // strong horizontal — slingshot
          loseFighter.y += rumbleGolgarLaunchVy;
          rumbleGolgarLaunchVy -= 0.15; // gentler upward accel so angle stays diagonal
          loseFighter.grounded = false;
          loseFighter._rumbleRotation = (loseFighter._rumbleRotation || 0) + 0.2 * dir;
          if (loseFighter.y < -100) {
            rumbleLoserHidden = true;
          }
          // Entities return to center
          const midX = (entity1TargetX + entity2TargetX) / 2;
          winFighter.x += (midX - 30 - winFighter.x) * 0.05;
          e2.x += (midX + 30 - e2.x) * 0.05;
        } else if (rumbleTimer <= highFiveHit) {
          // Walk toward each other for high-five
          rumbleGolgarPhase = 5;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true; // hide normal arm, we draw raised arm
          const midX = rumbleGolgarOpX;
          winFighter.x += (midX - 35 - winFighter.x) * 0.12;
          e2.x += (midX + 35 - e2.x) * 0.12;
          winFighter.facing = 1;
          e2.facing = -1;
          rumbleLoserHidden = true;
        } else if (rumbleTimer <= highFiveHit + 30) {
          // High-five hold
          rumbleGolgarPhase = 6;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = true;
          const midX = rumbleGolgarOpX;
          winFighter.x = midX - 35;
          e2.x = midX + 35;
          winFighter.facing = 1;
          e2.facing = -1;
          if (rumbleTimer === highFiveHit + 1) {
            shakeTimer = 3;
            shakeIntensity = 2;
          }
        } else {
          // Settle
          rumbleGolgarPhase = 7;
          winFighter.state = 'idle';
          winFighter._hideFrontArm = false;
        }

        if (rumbleTimer >= endFrame) {
          loseFighter._rumbleRotation = 0;
          winFighter._hideFrontArm = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TELATRINE') {
        const pickupStart = 40;
        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const walkSpeed = 2.5;

        if (rumbleTelatrinePhase === 0) {
          winFighter.facing = dir;
          const dist = Math.abs(loseFighter.x - winFighter.x);
          if (dist > 40) {
            winFighter.x += dir * walkSpeed;
          } else if (rumbleTimer >= pickupStart) {
            rumbleTelatrinePhase = 1;
          }
        } else if (rumbleTelatrinePhase === 1) {
          winFighter.facing = dir;
          const liftT = Math.min(1, (rumbleTimer - pickupStart) / 20);
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 50 - liftT * 30;
          loseFighter.grounded = false;
          loseFighter._rumbleScale = 0.8;
          if (liftT >= 1) {
            rumbleTelatrinePhase = 2;
            winFighter.facing = winFighter.x < 480 ? -1 : 1;
          }
        } else if (rumbleTelatrinePhase === 2) {
          winFighter.x += winFighter.facing * walkSpeed;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y - 80;
          if (winFighter.x < -30 || winFighter.x > 990) {
            rumbleTelatrinePhase = 3;
            rumbleLoserHidden = true;
            winFighter._rumbleAlpha = 0;
            loseFighter._rumbleAlpha = 0;
            loseFighter._rumbleScale = undefined;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 3) {
          winFighter._rumbleAlpha = 0;
          rumbleTelatrineShrug++;
          if (rumbleTelatrineShrug >= 50) {
            rumbleTelatrinePhase = 4;
            if (winFighter.facing === 1) {
              winFighter.x = -20;
            } else {
              winFighter.x = 980;
            }
            winFighter._rumbleAlpha = 1;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 4) {
          winFighter._rumbleAlpha = 1;
          winFighter.x += winFighter.facing * walkSpeed;
          const targetX = 480 + winFighter.facing * 100;
          if ((winFighter.facing === 1 && winFighter.x >= targetX) ||
              (winFighter.facing === -1 && winFighter.x <= targetX)) {
            rumbleTelatrinePhase = 5;
            winFighter.vx = 0;
            rumbleTelatrineShrug = 0;
          }
        } else if (rumbleTelatrinePhase === 5) {
          winFighter.state = 'idle';
          winFighter.vx = 0;
          winFighter._hideFrontArm = true;
          winFighter._hideBackArm = true;
          rumbleTelatrineShrug++;
        }

        if (rumbleTelatrinePhase <= 2 || rumbleTelatrinePhase === 4) {
          winFighter.animTimer++;
          if (winFighter.animTimer > 6) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
        }

        if (rumbleTelatrinePhase === 5 && rumbleTelatrineShrug >= 80) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CORVIDA') {
        // Corvida "Early Bird": ~480 frames
        // 0-40: Corvida transforms to giant blue jay
        // 40-80: Flies to center, drops nest on ground
        // 80-140: Lays 3 eggs into the nest
        // 140-190: Swoops to grab opponent
        // 190-240: Lifts opponent, hovers above nest
        // 240-290: Eggs hatch, chicks open mouths
        // 290-320: Drops opponent into a chick's mouth
        // 320-380: Gulp, chick satisfied
        // 380-480: Corvida lands, transforms back
        const transformEnd = 40;
        const nestDropEnd = 80;
        const layEnd = 140;
        const swoopEnd = 190;
        const hoverEnd = 240;
        const hatchEnd = 290;
        const dropFrame = 305;
        const gulpEnd = 380;
        const endFrame = 480;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        const centerX = 480;
        const groundY = loseFighter.groundY;

        if (rumbleTimer === 1) {
          rumbleCorvidaNestX = centerX;
          // Giant eggs — positions relative to nest center, with falling state
          rumbleCorvidaEggs = [
            { x: centerX - 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX, y: groundY - 18, fallY: -100, falling: false, landed: false, hatched: false },
            { x: centerX + 40, y: groundY - 15, fallY: -100, falling: false, landed: false, hatched: false }
          ];
          rumbleCorvidaGulpChick = -1;
          rumbleCorvidaPhase = 0;
        }

        // Egg fall frames (staggered during lay phase)
        const eggDropFrames = [85, 105, 125];
        // Update falling eggs
        for (let i = 0; i < rumbleCorvidaEggs.length; i++) {
          const egg = rumbleCorvidaEggs[i];
          if (rumbleTimer === eggDropFrames[i]) {
            egg.falling = true;
            egg.fallY = winFighter.y + 30; // start from jay's position
            egg.fallVy = 0;
          }
          if (egg.falling && !egg.landed) {
            egg.fallVy += 0.8;
            egg.fallY += egg.fallVy;
            if (egg.fallY >= egg.y) {
              egg.fallY = egg.y;
              egg.landed = true;
              egg.falling = false;
              shakeTimer = 4;
              shakeIntensity = 3;
            }
          }
        }

        if (rumbleTimer <= transformEnd) {
          // Transform — grow into giant jay, hide normal fighter
          rumbleCorvidaPhase = 0;
          winFighter._rumbleAlpha = Math.max(0, 1 - rumbleTimer / 20);
          winFighter.vx = 0;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= nestDropEnd) {
          // Fly as giant jay to center, drop nest
          rumbleCorvidaPhase = 1;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - transformEnd) / (nestDropEnd - transformEnd);
          winFighter.x = winFighter.x + (centerX - winFighter.x) * 0.08;
          winFighter.y = groundY - 80 - t * 60;
        } else if (rumbleTimer <= layEnd) {
          // Hover above nest and lay eggs (they fall from jay)
          rumbleCorvidaPhase = 2;
          winFighter._rumbleAlpha = 0;
          winFighter.x += (centerX - winFighter.x) * 0.1;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 5;
        } else if (rumbleTimer <= swoopEnd) {
          // Swoop to grab opponent
          rumbleCorvidaPhase = 3;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - layEnd) / (swoopEnd - layEnd);
          const ease = t * t;
          winFighter.x += (loseFighter.x - winFighter.x) * 0.1;
          winFighter.y = (groundY - 200) + ((loseFighter.y - 40) - (groundY - 200)) * ease;
          winFighter.facing = loseFighter.x > winFighter.x ? 1 : -1;
        } else if (rumbleTimer <= hoverEnd) {
          // Lift opponent in talons, hover above nest
          rumbleCorvidaPhase = 4;
          winFighter._rumbleAlpha = 0;
          // Opponent is visible, dangling below the jay
          loseFighter._rumbleScale = 0.7; // slightly smaller in talons
          loseFighter.grounded = false;
          // Fly back above nest
          winFighter.x += (centerX - winFighter.x) * 0.08;
          winFighter.y += ((groundY - 200) - winFighter.y) * 0.08;
          // Opponent follows below the jay (in talons)
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
        } else if (rumbleTimer <= hatchEnd) {
          // Eggs hatch, opponent still held
          rumbleCorvidaPhase = 5;
          winFighter._rumbleAlpha = 0;
          loseFighter._rumbleScale = 0.7;
          winFighter.x += (centerX - winFighter.x) * 0.05;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.08) * 3;
          loseFighter.x = winFighter.x;
          loseFighter.y = winFighter.y + 70;
          // Hatch eggs progressively
          const hatchProgress = (rumbleTimer - hoverEnd) / (hatchEnd - hoverEnd);
          if (hatchProgress > 0.2 && !rumbleCorvidaEggs[0].hatched) { rumbleCorvidaEggs[0].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.5 && !rumbleCorvidaEggs[1].hatched) { rumbleCorvidaEggs[1].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (hatchProgress > 0.8 && !rumbleCorvidaEggs[2].hatched) { rumbleCorvidaEggs[2].hatched = true; shakeTimer = 3; shakeIntensity = 2; }
          if (rumbleCorvidaGulpChick < 0) {
            rumbleCorvidaGulpChick = 1; // center chick
          }
        } else if (rumbleTimer <= dropFrame) {
          // Drop the opponent into the chick's mouth
          rumbleCorvidaPhase = 6;
          winFighter._rumbleAlpha = 0;
          const t = (rumbleTimer - hatchEnd) / (dropFrame - hatchEnd);
          const targetChick = rumbleCorvidaEggs[rumbleCorvidaGulpChick];
          // Opponent falls from jay toward the chick's open mouth
          const chickMouthY = targetChick.y - 50; // above the chick head
          loseFighter.x += (targetChick.x - loseFighter.x) * 0.15;
          loseFighter.y += (chickMouthY - loseFighter.y) * 0.12;
          loseFighter._rumbleScale = Math.max(0.3, 0.7 - t * 0.4);
        } else if (rumbleTimer <= gulpEnd) {
          // Gulp — opponent disappears
          rumbleCorvidaPhase = 7;
          winFighter._rumbleAlpha = 0;
          rumbleLoserHidden = true;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          winFighter.y = groundY - 200 + Math.sin(rumbleTimer * 0.06) * 5;
        } else {
          // Land and transform back — land beside the nest, not on it
          rumbleCorvidaPhase = 8;
          const t = (rumbleTimer - gulpEnd) / (endFrame - gulpEnd);
          winFighter._rumbleAlpha = Math.min(1, t * 2);
          // Move to side of nest
          const landX = centerX + 150;
          winFighter.x += (landX - winFighter.x) * 0.08;
          winFighter.y += (groundY - winFighter.y) * 0.06;
          if (t > 0.5) {
            winFighter.x = landX;
            winFighter.y = groundY;
            winFighter.grounded = true;
          }
          winFighter.facing = -1; // face the nest
          winFighter.state = 'idle';
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
          loseFighter._rumbleScale = undefined;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'CODEMAX') {
        // Codemax "Your New Overlord": ~360 frames
        // 0-30: Codemax raises hand, charges laser
        // 30-60: Green pixelated laser fires at opponent
        // 60-100: Opponent pixelates (level 1 — large pixels)
        // 100-140: Pixelate level 2 — larger pixels
        // 140-180: Pixelate level 3 — very large pixels
        // 180-220: Pixelate level 4 — barely recognizable
        // 220-300: Glitch and blink out
        // 300-360: Settle
        const chargeEnd = 30;
        const laserEnd = 60;
        const pixel1End = 100;
        const pixel2End = 140;
        const pixel3End = 180;
        const pixel4End = 220;
        const glitchEnd = 300;
        const endFrame = 360;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        if (rumbleTimer <= chargeEnd) {
          // Charge up — arm raised
          winFighter.state = 'attack';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 0;
        } else if (rumbleTimer <= laserEnd) {
          // Fire laser
          winFighter.state = 'attack';
          rumbleCodemaxLaser = true;
          // Spawn laser particles along the beam
          if (rumbleTimer % 2 === 0) {
            const sx = winFighter.x + dir * 25;
            const sy = winFighter.y - 35;
            const ex = loseFighter.x;
            const ey = loseFighter.y - 30;
            for (let i = 0; i < 5; i++) {
              const t = Math.random();
              rumbleCodemaxLaserParticles.push({
                x: sx + (ex - sx) * t + (Math.random() - 0.5) * 8,
                y: sy + (ey - sy) * t + (Math.random() - 0.5) * 8,
                size: 3 + Math.random() * 5,
                alpha: 0.8,
                life: 15 + Math.random() * 10
              });
            }
          }
          if (rumbleTimer === laserEnd) {
            loseFighter.flashTimer = 10;
            shakeTimer = 8;
            shakeIntensity = 4;
          }
        } else if (rumbleTimer <= pixel1End) {
          winFighter.state = 'idle';
          rumbleCodemaxLaser = false;
          rumbleCodemaxPixelLevel = 1;
          loseFighter._rumbleAlpha = 0; // hide real fighter, show pixel version
        } else if (rumbleTimer <= pixel2End) {
          rumbleCodemaxPixelLevel = 2;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel1End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel3End) {
          rumbleCodemaxPixelLevel = 3;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel2End + 1) {
            shakeTimer = 4; shakeIntensity = 3;
          }
        } else if (rumbleTimer <= pixel4End) {
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          if (rumbleTimer === pixel3End + 1) {
            shakeTimer = 6; shakeIntensity = 5;
          }
        } else if (rumbleTimer <= glitchEnd) {
          // Glitch out phase
          rumbleCodemaxPixelLevel = 4;
          loseFighter._rumbleAlpha = 0;
          rumbleCodemaxGlitch = rumbleTimer - pixel4End;
          // Opponent fully gone after enough glitching
          if (rumbleCodemaxGlitch > 40) {
            rumbleLoserHidden = true;
            rumbleCodemaxPixelLevel = 0;
          }
        } else {
          // Settle
          winFighter.state = 'idle';
          rumbleLoserHidden = true;
          rumbleCodemaxPixelLevel = 0;
          rumbleCodemaxGlitch = 0;
        }

        // Update laser particles
        for (let i = rumbleCodemaxLaserParticles.length - 1; i >= 0; i--) {
          const p = rumbleCodemaxLaserParticles[i];
          p.life--;
          p.alpha = Math.max(0, p.life / 15);
          if (p.life <= 0) rumbleCodemaxLaserParticles.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          gameState = 'victory';
        }
      }

      if (rumbleType === 'HAYSTACK') {
        // Haystack "Don't Fear the Reaper": ~380 frames
        // 0-40: Arms out, ravens fly in from edges
        // 40-80: Ravens grab and lift Haystack into the air
        // 80-120: Reaches into chest, pulls out scythe
        // 120-160: Hover in place, scythe gleams
        // 160-200: Ravens dive bomb toward opponent
        // 200-210: Scythe strike
        // 210-300: Opponent dissolves into dust
        // 300-380: Dust dissipates, Haystack lands
        const ravensArriveEnd = 40;
        const liftEnd = 80;
        const scytheEnd = 120;
        const hoverEnd = 160;
        const diveEnd = 200;
        const strikeFrame = 205;
        const dissolveEnd = 300;
        const endFrame = 380;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;
        winFighter.vx = 0;

        // Spawn ravens at start
        if (rumbleTimer === 1) {
          rumbleHaystackRavens = [];
          for (let i = 0; i < 4; i++) {
            rumbleHaystackRavens.push({
              x: i < 2 ? -50 - i * 40 : 1010 + (i - 2) * 40,
              y: 50 + i * 30,
              wingPhase: Math.random() * Math.PI * 2,
              offsetX: (i - 1.5) * 20,
              offsetY: (i % 2) * 15 - 7
            });
          }
        }

        if (rumbleTimer <= ravensArriveEnd) {
          // Arms out, ravens fly toward Haystack
          winFighter.state = 'idle';
          const t = rumbleTimer / ravensArriveEnd;
          for (const r of rumbleHaystackRavens) {
            const targetX = winFighter.x + r.offsetX;
            const targetY = winFighter.y - 40 + r.offsetY;
            r.x += (targetX - r.x) * 0.08;
            r.y += (targetY - r.y) * 0.08;
          }
        } else if (rumbleTimer <= liftEnd) {
          // Ravens lift Haystack into the air
          const t = (rumbleTimer - ravensArriveEnd) / (liftEnd - ravensArriveEnd);
          const liftY = winFighter.groundY - 120 * t;
          winFighter.y = liftY;
          winFighter.grounded = false;
          winFighter.state = 'idle';
          // Ravens stay around Haystack
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.15;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.15;
          }
        } else if (rumbleTimer <= scytheEnd) {
          // Reaches into chest and pulls out scythe
          winFighter.state = 'attack';
          if (rumbleTimer === liftEnd + 20) {
            rumbleHaystackScythe = true;
          }
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= hoverEnd) {
          // Hover menacingly
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY - 120 + Math.sin(rumbleTimer * 0.08) * 5;
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.1;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.1;
          }
        } else if (rumbleTimer <= diveEnd) {
          // Dive bomb toward opponent — store start position once
          if (!rumbleHaystackDiveStart) {
            rumbleHaystackDiveStart = { x: winFighter.x, y: winFighter.groundY - 120 };
          }
          const t = (rumbleTimer - hoverEnd) / (diveEnd - hoverEnd);
          const ease = t * t; // accelerating
          const targetX = loseFighter.x - dir * 40;
          const targetY = loseFighter.y - 30;
          winFighter.x = rumbleHaystackDiveStart.x + (targetX - rumbleHaystackDiveStart.x) * ease;
          winFighter.y = rumbleHaystackDiveStart.y + (targetY - rumbleHaystackDiveStart.y) * ease;
          winFighter.state = 'attack';
          // Ravens follow
          for (const r of rumbleHaystackRavens) {
            r.x += (winFighter.x + r.offsetX - r.x) * 0.2;
            r.y += (winFighter.y - 20 + r.offsetY - r.y) * 0.2;
          }
        } else if (rumbleTimer <= strikeFrame) {
          // Strike!
          winFighter.state = 'attack';
          if (rumbleTimer === strikeFrame && !rumbleHaystackStrike) {
            rumbleHaystackStrike = true;
            shakeTimer = 20;
            shakeIntensity = 12;
            loseFighter.flashTimer = 10;
            // Spawn dust particles from opponent
            for (let i = 0; i < 30; i++) {
              rumbleHaystackDust.push({
                x: loseFighter.x + (Math.random() - 0.5) * 30,
                y: loseFighter.y - 30 + (Math.random() - 0.5) * 50,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 3 - 1,
                size: 3 + Math.random() * 8,
                alpha: 0.8 + Math.random() * 0.2,
                color: ['#aa9966', '#887755', '#ccbb88', '#665533'][Math.floor(Math.random() * 4)]
              });
            }
          }
        } else if (rumbleTimer <= dissolveEnd) {
          // Opponent dissolves, Haystack lands
          winFighter.state = 'idle';
          rumbleLoserHidden = true;

          // Haystack descends back to ground
          const landT = Math.min(1, (rumbleTimer - strikeFrame) / 40);
          winFighter.y = (loseFighter.y - 30) + (winFighter.groundY - (loseFighter.y - 30)) * landT;
          if (landT >= 1) {
            winFighter.y = winFighter.groundY;
            winFighter.grounded = true;
          }

          // Ravens scatter
          for (const r of rumbleHaystackRavens) {
            r.x += r.offsetX > 0 ? 3 : -3;
            r.y -= 1.5;
          }
        } else {
          winFighter.state = 'idle';
          winFighter.y = winFighter.groundY;
          winFighter.grounded = true;
        }

        // Update dust particles
        for (let i = rumbleHaystackDust.length - 1; i >= 0; i--) {
          const d = rumbleHaystackDust[i];
          d.x += d.vx;
          d.y += d.vy;
          d.vy -= 0.02; // rise slightly
          d.vx *= 0.98;
          d.size *= 0.995;
          d.alpha -= 0.006;
          if (d.alpha <= 0) rumbleHaystackDust.splice(i, 1);
        }

        // Update raven wing animation
        for (const r of rumbleHaystackRavens) {
          r.wingPhase += 0.15;
        }

        if (rumbleTimer >= endFrame) {
          rumbleHaystackScythe = false;
          gameState = 'victory';
        }
      }

      if (rumbleType === 'SNAZZ MCJAZZ') {
        // Snazz McJazz "Annie, are you okay?": ~400 frames
        // 0-30: Disco ball descends from ceiling
        // 30-300: Snazz dances toward opponent, confetti falls
        // 300-310: Snazz stops, winds up punch
        // 310-315: Punch connects
        // 315-400: Opponent falls, disco ball rises, confetti settles
        const discoDownEnd = 30;
        const danceEnd = 300;
        const windupEnd = 310;
        const punchFrame = 313;
        const endFrame = 400;

        const dir = loseFighter.x > winFighter.x ? 1 : -1;
        winFighter.facing = dir;

        if (rumbleTimer <= discoDownEnd) {
          // Disco ball descends
          winFighter.state = 'idle';
          winFighter.vx = 0;
          if (!rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall = { y: -30, targetY: 60 };
          }
          const t = rumbleTimer / discoDownEnd;
          rumbleSnazzDiscoBall.y = -30 + (rumbleSnazzDiscoBall.targetY + 30) * t * t;
        } else if (rumbleTimer <= danceEnd) {
          // Dance phase — Snazz dances toward opponent
          winFighter.dancing = true;
          winFighter.danceTimer = 999; // keep dancing

          // Move toward opponent slowly
          const distToOpponent = Math.abs(loseFighter.x - winFighter.x);
          if (distToOpponent > 50) {
            winFighter.x += dir * 1.2;
          }

          // Spawn confetti
          if (rumbleTimer % 4 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleSnazzConfetti.push({
                x: 100 + Math.random() * 760,
                y: -10 - Math.random() * 30,
                vx: (Math.random() - 0.5) * 2,
                vy: 1 + Math.random() * 2,
                size: 3 + Math.random() * 4,
                rot: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.2,
                color: ['#ff00ff', '#00ffff', '#ff4400', '#44ff00', '#ffff00', '#ff66aa', '#6644ff'][Math.floor(Math.random() * 7)],
                alpha: 1
              });
            }
          }
        } else if (rumbleTimer <= windupEnd) {
          // Stop dancing, face opponent, wind up
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          winFighter.vx = 0;
          winFighter.state = 'idle';
          // Step right up to opponent
          const targetX = loseFighter.x - dir * 45;
          const t = (rumbleTimer - danceEnd) / (windupEnd - danceEnd);
          winFighter.x += (targetX - winFighter.x) * 0.3;
        } else if (rumbleTimer <= punchFrame) {
          // Punch!
          winFighter.state = 'attack';
          winFighter.currentAttack = 'jab';
        } else if (rumbleTimer === punchFrame + 1) {
          // Punch connects
          rumbleSnazzPunchLanded = true;
          loseFighter.flashTimer = 8;
          shakeTimer = 15;
          shakeIntensity = 10;
          loseFighter.state = 'hitstun';
          winFighter.state = 'idle';
        } else {
          // Aftermath — opponent falls, disco ball rises
          winFighter.state = 'idle';
          winFighter.vx = 0;

          // Opponent falls to ground
          if (!loseFighter.grounded || loseFighter.y < loseFighter.groundY) {
            loseFighter.vy = (loseFighter.vy || 0) + 0.5;
            loseFighter.y += loseFighter.vy;
            if (loseFighter.y >= loseFighter.groundY) {
              loseFighter.y = loseFighter.groundY;
              loseFighter.grounded = true;
            }
          }

          // Opponent lies flat (knocked out)
          loseFighter._rumbleRotation = dir * Math.PI / 2;

          // Disco ball rises back up
          if (rumbleSnazzDiscoBall) {
            rumbleSnazzDiscoBall.y -= 1.5;
          }
        }

        // Update confetti
        for (let i = rumbleSnazzConfetti.length - 1; i >= 0; i--) {
          const c = rumbleSnazzConfetti[i];
          c.x += c.vx;
          c.y += c.vy;
          c.vx += (Math.random() - 0.5) * 0.1; // flutter
          c.vy += 0.02;
          c.rot += c.rotSpeed;
          if (c.y > 550) {
            c.alpha -= 0.05;
          }
          if (rumbleTimer > danceEnd) {
            c.alpha -= 0.008;
          }
          if (c.alpha <= 0) rumbleSnazzConfetti.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter.dancing = false;
          winFighter.danceTimer = 0;
          // Keep loseFighter._rumbleRotation so they stay knocked down on victory screen
          gameState = 'victory';
        }
      }

      if (rumbleType === 'TORRENA') {
        // Torrena "Cloudy, with a chance of demise": ~420 frames
        // 0-30: Enter water phase (go translucent)
        // 30-70: Evaporate — rise up as steam particles, fighter fades out
        // 70-90: Cloud forms above opponent
        // 90-280: Heavy rain pummels opponent
        // 280-300: Hailstone forms and drops
        // 300-330: Impact + crush
        // 330-420: Settle, transition to victory
        const waterEnd = 30;
        const evapEnd = 70;
        const cloudFormEnd = 90;
        const rainEnd = 280;
        const hailFormEnd = 295;
        const hailImpact = 340;
        const endFrame = 440;

        const cloudTargetX = loseFighter.x;
        const cloudTargetY = 60;

        winFighter.vx = 0;

        if (rumbleTimer <= waterEnd) {
          // Phase 0: Enter water phase
          rumbleTorrenaPhase = 0;
          winFighter.waterPhase = true;
          winFighter.state = 'idle';
        } else if (rumbleTimer <= evapEnd) {
          // Phase 1: Evaporate — spawn steam particles rising from fighter position
          rumbleTorrenaPhase = 1;
          winFighter.waterPhase = true;
          const evapT = (rumbleTimer - waterEnd) / (evapEnd - waterEnd);
          // Fade out the winner (we'll use a custom alpha via a flag)
          winFighter._rumbleAlpha = Math.max(0, 1 - evapT * 1.5);
          // Spawn steam particles
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 3; i++) {
              rumbleTorrenaEvapParticles.push({
                x: winFighter.x + (Math.random() - 0.5) * 30,
                y: winFighter.y - 30 + (Math.random() - 0.5) * 40,
                vx: (Math.random() - 0.5) * 1.5,
                vy: -1.5 - Math.random() * 2,
                size: 3 + Math.random() * 5,
                alpha: 0.6 + Math.random() * 0.3,
                color: `rgba(100,200,255,`
              });
            }
          }
          if (evapT >= 0.8) {
            // Start hiding winner
            rumbleLoserHidden = false; // make sure loser still visible
          }
        } else if (rumbleTimer <= cloudFormEnd) {
          // Phase 2: Cloud forms above opponent, winner is invisible
          rumbleTorrenaPhase = 2;
          winFighter._rumbleAlpha = 0;
          const formT = (rumbleTimer - evapEnd) / (cloudFormEnd - evapEnd);
          rumbleTorrenaCloudX = cloudTargetX;
          rumbleTorrenaCloudY = cloudTargetY + (1 - formT) * 40;
        } else if (rumbleTimer <= rainEnd) {
          // Phase 3: Heavy rain pummels opponent
          rumbleTorrenaPhase = 3;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX + Math.sin(rumbleTimer * 0.05) * 15;
          rumbleTorrenaCloudY = cloudTargetY;

          // Spawn raindrops from cloud
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 4; i++) {
              rumbleRaindrops.push({
                x: rumbleTorrenaCloudX + (Math.random() - 0.5) * 80,
                y: rumbleTorrenaCloudY + 25 + Math.random() * 10,
                vx: (Math.random() - 0.5) * 0.5,
                vy: 6 + Math.random() * 4,
                size: 1 + Math.random() * 2,
                alpha: 0.7 + Math.random() * 0.3
              });
            }
          }

          // Rain hits opponent — flash and shake periodically
          if (rumbleTimer % 15 === 0) {
            loseFighter.flashTimer = 3;
            shakeTimer = 3;
            shakeIntensity = 2;
          }

          // Push opponent down slightly (staggering under rain)
          loseFighter.state = 'hitstun';
        } else if (rumbleTimer <= hailFormEnd) {
          // Phase 4: Hailstone forms — rain stops, ominous pause
          rumbleTorrenaPhase = 4;
          winFighter._rumbleAlpha = 0;
          rumbleTorrenaCloudX = cloudTargetX;
          // Cloud darkens (handled in draw)
          loseFighter.state = 'idle';
          if (rumbleTimer === rainEnd + 1) {
            // Create hailstone above cloud
            rumbleHailstone = {
              x: cloudTargetX,
              y: cloudTargetY - 20,
              vy: 0,
              size: 0
            };
          }
          if (rumbleHailstone) {
            // Hailstone grows
            const growT = (rumbleTimer - rainEnd) / (hailFormEnd - rainEnd);
            rumbleHailstone.size = 25 * growT;
          }
        } else if (rumbleTimer <= hailImpact) {
          // Phase 5: Hailstone drops
          rumbleTorrenaPhase = 5;
          winFighter._rumbleAlpha = 0;
          if (rumbleHailstone) {
            rumbleHailstone.vy += 1.8;
            rumbleHailstone.y += rumbleHailstone.vy;
            // Check if hailstone reached opponent
            if (rumbleHailstone.y >= loseFighter.y - 30 && !rumbleHailCracked) {
              rumbleHailstone.y = loseFighter.groundY - rumbleHailstone.size;
              rumbleLoserHidden = true;
              rumbleHailCracked = true;
              shakeTimer = 30;
              shakeIntensity = 15;
              // Spawn hailstone shards flying outward
              for (let i = 0; i < 25; i++) {
                const angle = -Math.PI * Math.random(); // mostly upward
                const speed = 3 + Math.random() * 6;
                rumbleHailShards.push({
                  x: loseFighter.x + (Math.random() - 0.5) * 30,
                  y: loseFighter.groundY - 10,
                  vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
                  vy: -2 - Math.random() * 5,
                  size: 2 + Math.random() * 6,
                  alpha: 1,
                  rot: Math.random() * Math.PI * 2,
                  rotSpeed: (Math.random() - 0.5) * 0.3
                });
              }
            }
          }
        } else {
          // Phase 6: Settle — cloud fades, winner reappears
          rumbleTorrenaPhase = 6;
          const settleT = (rumbleTimer - hailImpact) / (endFrame - hailImpact);
          winFighter._rumbleAlpha = Math.min(1, settleT * 1.5);
          winFighter.waterPhase = settleT < 0.5;
          // Move winner back to ground near opponent
          if (rumbleTimer === hailImpact + 1) {
            winFighter.x = loseFighter.x + (winFighter.x > loseFighter.x ? 60 : -60);
          }
          winFighter.state = 'idle';
        }

        // Update evaporation particles
        for (let i = rumbleTorrenaEvapParticles.length - 1; i >= 0; i--) {
          const p = rumbleTorrenaEvapParticles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy *= 0.98;
          p.alpha -= 0.01;
          if (p.alpha <= 0) rumbleTorrenaEvapParticles.splice(i, 1);
        }

        // Update raindrops
        for (let i = rumbleRaindrops.length - 1; i >= 0; i--) {
          const r = rumbleRaindrops[i];
          r.x += r.vx;
          r.y += r.vy;
          r.vy += 0.1;
          if (r.y > loseFighter.groundY + 5) {
            r.alpha -= 0.15;
          }
          if (r.alpha <= 0 || r.y > 550) rumbleRaindrops.splice(i, 1);
        }

        // Update hail shards
        for (let i = rumbleHailShards.length - 1; i >= 0; i--) {
          const s = rumbleHailShards[i];
          s.x += s.vx;
          s.y += s.vy;
          s.vy += 0.25;
          s.rot += s.rotSpeed;
          if (s.y > loseFighter.groundY) {
            s.y = loseFighter.groundY;
            s.vy *= -0.3;
            s.vx *= 0.7;
            if (Math.abs(s.vy) < 0.5) {
              s.vy = 0;
              s.alpha -= 0.015;
            }
          }
          if (s.alpha <= 0) rumbleHailShards.splice(i, 1);
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          winFighter.waterPhase = false;
          gameState = 'victory';
        }
      }

      // Animate winner
      winFighter.animTimer++;
      if (winFighter.animTimer > 8) { winFighter.animTimer = 0; winFighter.animFrame = (winFighter.animFrame + 1) % 4; }
    } else {
      // Normal finishHim phase — winner moves, timer counts down
      finishHimTimer++;
      frameCount++;
      if (shakeTimer > 0) shakeTimer--;
      // Winner keeps acting
      if (winner === 'player') {
        winFighter.update(loseFighter, keys);
      } else {
        winFighter.update(loseFighter, {});
      }
      if (finishHimTimer >= FINISH_HIM_DURATION && gameMode !== 'rumblePractice') {
        gameState = 'victory';
      }
    }

    // Loser stays passive: idle, no movement, still animates
    loseFighter.vx = 0;
    loseFighter.state = 'idle';
    loseFighter.blocking = false;
    if (loseFighter.flashTimer > 0) loseFighter.flashTimer--;
    if (loseFighter.hitEffect) {
      loseFighter.hitEffect.timer--;
      if (loseFighter.hitEffect.timer <= 0) loseFighter.hitEffect = null;
    }
    loseFighter.animTimer++;
    if (loseFighter.animTimer > 8) { loseFighter.animTimer = 0; loseFighter.animFrame = (loseFighter.animFrame + 1) % 4; }
    // Apply gravity so loser lands if airborne (skip during Bojdo launch)
    const bojdoLaunching = (rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleActive && (rumbleSubType === 'pellet' ? rumbleTimer > 110 : rumbleSubType === 'massiv');
    const rubberSwinging = rumbleType === 'RUBBERMAN' && rumbleActive;
    const golgarLaunching = rumbleType === 'GOLGAR' && rumbleActive;
    const telatrineCarrying = rumbleType === 'TELATRINE' && rumbleActive;
    if (!loseFighter.grounded && !bojdoLaunching && !rubberSwinging && !golgarLaunching && !telatrineCarrying) {
      loseFighter.vy += 0.6;
      loseFighter.y += loseFighter.vy;
      if (loseFighter.y >= loseFighter.groundY) {
        loseFighter.y = loseFighter.groundY;
        loseFighter.vy = 0;
        loseFighter.grounded = true;
      }
    }
  }
}

// [Extracted to screens/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to rumbles/]

// [Extracted to screens/]

// [Extracted to screens/]

// [Extracted to screens/]

function draw() {
  ctx.clearRect(0, 0, 960, 540);

  switch (gameState) {
    case 'title':
      drawTitleScreen();
      break;

    case 'charSelect':
      drawCharSelectScreen();
      break;

    case 'practiceTargetSelect':
      drawPracticeTargetScreen();
      break;

    case 'assistSelect':
      drawAssistSelectScreen();
      break;

    case 'difficultySelect':
      drawDifficultySelectScreen();
      break;

    case 'levelSelect':
      drawLevelSelectScreen();
      break;

    case 'versus':
      versusTimer++;
      if (versusTimer >= VERSUS_DURATION) {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
        } else {
          startFight();
        }
      } else {
        drawVersusScreen();
      }
      break;

    case 'fight':
      ctx.save();
      if (shakeTimer > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
      }
      drawBackground();
      player.draw(ctx);
      cpu.draw(ctx);
      drawHUD();
      // Backtrack rewind screen flash
      const btEffect = player.btRewindEffect || cpu.btRewindEffect || 0;
      if (btEffect > 0) {
        ctx.save();
        ctx.globalAlpha = btEffect / 40 * 0.5;
        ctx.fillStyle = '#b44dff';
        ctx.fillRect(0, 0, 960, 540);
        // Rewind text
        ctx.globalAlpha = Math.min(1, btEffect / 20);
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('⏪ REWIND ⏪', 480, 270);
        ctx.restore();
      }
      ctx.restore();
      if (paused) drawPauseOverlay();
      break;

    case 'finishHim':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        // Draw winner — clip if gargantuan (Death from Above)
        if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && winnerF.bojdoScale > 2) {
          ctx.save();
          // Only show the bottom portion of the giant — clip top of screen
          ctx.beginPath();
          ctx.rect(0, 0, 960, 540);
          ctx.clip();
          winnerF.draw(ctx);
          ctx.restore();
        } else {
          winnerF.draw(ctx);
        }
        // Draw loser with special rumble effects if applicable
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else if (rumbleType === 'TITAN' && rumbleSinkProgress > 0) {
            drawSinkingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      ctx.restore();
      drawFinishHimScreen();
      if (paused) drawPauseOverlay();
      break;

    case 'victory':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        winnerF.draw(ctx);
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && rumbleLoserHidden) drawBojdoStompRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleType === 'RUBBERMAN' && rumbleTetherCracked) drawRubbermanRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      drawHUD();
      ctx.restore();
      drawVictoryScreen();
      break;
  }
}

function gameLoop() {
  try {
    update();
    draw();
  } catch (e) {
    console.error('Game loop error:', e);
    // Reset canvas state to prevent save/restore stack corruption
    ctx.restore();
    ctx.save();
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  requestAnimationFrame(gameLoop);
}

// Handle resize
function resize() {
  const ratio = 960 / 540;
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (w / h > ratio) {
    w = h * ratio;
  } else {
    h = w / ratio;
  }
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.marginTop = ((window.innerHeight - h) / 2) + 'px';
}
window.addEventListener('resize', resize);
resize();

gameLoop();
