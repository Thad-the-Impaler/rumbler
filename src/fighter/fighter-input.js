Fighter.prototype.handlePlayerInput = function(keys, opponent) {
  if (this.state === 'hitstun' || this.state === 'blockstun' || this.state === 'launched') return;
  if (this.dancing) return;
  if (this.exploding) return;

  const isBBojdo = this.char.name === 'BOJDOBOJDO' || this.char.isBojdo3;
  const bojdoMaxScale = isBBojdo ? 3.5 : 2.0;
  const bojdoSpeedMult = this.char.isBojdo ? Math.max(isBBojdo ? 0 : 0.25, (bojdoMaxScale - this.bojdoScale) / (bojdoMaxScale - 1.0)) : 1;
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
      playSfx(sfx_jayForm);
    }
    // Batsch: transform to tortoise if double-crouch was triggered
    if (this.char.isBatsch && this.batschCrouchPending) {
      this.batschCrouchPending = false;
      if (!this.isTortoise) this.isTortoise = true;
    }
  }

  // Golgar entity swap: press D to switch to dormant entity
  if (this.char.isGolgar && (keys['g'] || keys['G']) && this.state !== 'attack') {
    playSfx(sfx_soulSwap);
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
    playSfx(sfx_waterPhase);
    keys['h'] = false; keys['H'] = false;
  }

  // Haystack explosion: press F to explode
  if (this.char.isHaystack && (keys['f'] || keys['F']) && !this.exploding && this.state !== 'attack') {
    this.exploding = true;
    playSfx(sfx_hayExplosion);
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
    playSfx(sfx_jazzDance);
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
    const isBB = this.char.name === 'BOJDOBOJDO' || this.char.isBojdo3;
    const maxScale = isBB ? 3.5 : 2.0;
    const minScale = isBB ? 0.2 : 0.5;
    const wasShifting = this.bojdoShifting;
    if (keys['k'] || keys['K']) {
      this.bojdoScale = Math.min(this.bojdoScale + 0.02, maxScale);
      this.bojdoShifting = true;
    } else if (keys['l'] || keys['L']) {
      this.bojdoScale = Math.max(this.bojdoScale - 0.02, minScale);
      this.bojdoShifting = true;
    } else {
      this.bojdoShifting = false;
    }
    if (this.bojdoShifting && !wasShifting) playSfx(sfx_sizeShifting);
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
    playSfx(sfx_codePort);
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
};


