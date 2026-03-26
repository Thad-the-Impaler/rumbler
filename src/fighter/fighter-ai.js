Fighter.prototype.handleAI = function(opponent) {
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

  // Erictho boss: portal state blocks all AI while active
  if (this.char.isErictho) {
    // While hidden or portal animating, block normal AI
    if (this.ericthoHidden) return;
    if (this.ericthoPortal && (this.ericthoPortal.phase === 'enter' || this.ericthoPortal.phase === 'exit')) return;

    // Decide to enter portal (AI trigger only — state machine runs in update)
    if (this.ericthoPortalCooldown <= 0 && !this.ericthoPortal && this.state !== 'attack' && this.state !== 'hitstun' && this.state !== 'launched' && Math.random() < 0.02) {
      this.ericthoPortal = { x: this.x, y: this.groundY, timer: 0, phase: 'enter', maxTimer: 20 };
    }

    // Otherwise fall through to normal AI
  }

  // Borgus boss: special move cooldowns + laser charging (runs every frame)
  if (this.char.isBorgus) {
    if (this.borgusLaserCooldown > 0) this.borgusLaserCooldown--;
    if (this.borgusSlamCooldown > 0) this.borgusSlamCooldown--;

    // Laser charging animation — locks out all other actions
    if (this.borgusLaserCharging > 0) {
      this.borgusLaserCharging--;
      if (this.borgusLaserCharging === 0) {
        this.borgusLaser = {
          x: this.x + this.facing * 40,
          y: this.centerY,
          vx: this.facing * 14,
          timer: 60,
          hit: false
        };
        this.borgusLaserCooldown = 150;
      }
      return;
    }

    // Special moves — fire laser at long range, fist slam at close range
    const bDist = Math.abs(this.x - opponent.x);
    if (bDist > 200 && this.borgusLaserCooldown <= 0 && !this.borgusLaser && this.state !== 'attack') {
      this.borgusLaserCharging = 20;
      return;
    }
    if (bDist < 100 && this.borgusSlamCooldown <= 0 && this.state !== 'attack' && Math.random() < 0.08) {
      this.startAttack('borgusSlam');
      this.borgusSlamCooldown = 90;
      return;
    }
    // Otherwise fall through to normal AI for jabs, kicks, movement, blocking
  }

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
};


