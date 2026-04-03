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

  // Printer: just stands there
  if (this.char.isPrinter) return;

  // Matador: locked into dash
  if (this.matadorDashing) return;

  // Quellic boss: toggle fire phase
  if (this.char.isQuellic) {
    if (!this.quellicFirePhase && this.quellicFireCooldown <= 0 && this.state !== 'hitstun' && this.state !== 'launched') {
      // Activate fire phase when close to opponent or taking pressure
      const qDist = Math.abs(this.x - opponent.x);
      if ((qDist < 150 && Math.random() < 0.03) || (this.state === 'blockstun' && Math.random() < 0.1)) {
        this.quellicFirePhase = true;
        this.quellicFireTimer = this.quellicFireMaxDuration;
      }
    }
    // While in fire phase, rush toward opponent aggressively
    if (this.quellicFirePhase) {
      this.facing = opponent.x > this.x ? 1 : -1;
      this.vx = this.facing * this.char.stats.speed * 1.3;
      this.state = 'walk';
      this.blocking = false;
      return;
    }
    // Otherwise fall through to normal AI
  }

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

  // Twins boss: Helios (aggressive melee) and Selene (evasive archer)
  if (this.char.isTwins) {
    // Helios: aggressive — shoots arrows less often, prefers close range
    if (this.twinsArrowCooldown > 0) this.twinsArrowCooldown--;
    const hDist = Math.abs(this.x - opponent.x);
    // Helios only shoots at long range as a gap closer
    if (this.twinsArrowCooldown <= 0 && hDist > 200 && this.state !== 'attack' && Math.random() < 0.03) {
      this.twinsArrows.push({
        x: this.x + this.facing * 20,
        y: this.centerY - 5,
        vx: this.facing * 12,
        vy: 0,
        hit: false, timer: 60
      });
      this.twinsArrowCooldown = 150 + Math.floor(Math.random() * 60);
    }
    // Helios jumps toward player when far away
    if (hDist > 180 && this.grounded && Math.random() < 0.02) {
      this.vy = -11;
      this.grounded = false;
    }

    // Selene AI: evasive — stays at range, shoots more often, jumps away when close
    const tw = this.twin;
    if (tw.arrowCooldown > 0) tw.arrowCooldown--;
    tw.aiTimer--;
    tw.facing = opponent.x > tw.x ? 1 : -1;

    const sDist = Math.abs(tw.x - opponent.x);

    // Selene movement decisions
    if (tw.aiTimer <= 0) {
      tw.aiTimer = 20 + Math.floor(Math.random() * 30);
      if (sDist < 120) {
        tw.aiAction = 'flee'; // run away fast
      } else if (sDist > 350) {
        tw.aiAction = 'approach'; // don't let player get too far
      } else if (sDist > 200) {
        tw.aiAction = Math.random() < 0.6 ? 'strafe' : 'idle'; // comfortable range, strafe and shoot
      } else {
        tw.aiAction = Math.random() < 0.7 ? 'retreat' : 'strafe';
      }
    }

    const tSpeed = this.char.stats.speed;
    if (tw.aiAction === 'flee') {
      tw.vx = -tw.facing * tSpeed * 1.2; // run away fast
      // Jump away if player is very close
      if (sDist < 80 && tw.grounded && Math.random() < 0.15) {
        tw.vy = -10;
        tw.grounded = false;
      }
    } else if (tw.aiAction === 'approach') {
      tw.vx = tw.facing * tSpeed * 0.6;
    } else if (tw.aiAction === 'retreat') {
      tw.vx = -tw.facing * tSpeed * 0.7;
    } else if (tw.aiAction === 'strafe') {
      // Strafe perpendicular — try to get to the opposite side from Helios
      const heliosDir = this.x > opponent.x ? 1 : -1;
      tw.vx = -heliosDir * tSpeed * 0.6; // go to the other side
    } else {
      tw.vx *= 0.8;
    }

    // Selene jumps randomly while strafing for unpredictability
    if (tw.grounded && tw.aiAction === 'strafe' && Math.random() < 0.01) {
      tw.vy = -9;
      tw.grounded = false;
    }

    // Selene arrows: shoots more often than Helios
    if (tw.arrowCooldown <= 0 && sDist > 60 && Math.random() < 0.06) {
      // Slight vertical aim toward player
      const dy = (opponent.y - 25) - (tw.y - 25);
      const dx = opponent.x - tw.x;
      const angle = Math.atan2(dy, dx);
      tw.arrows.push({
        x: tw.x + tw.facing * 20,
        y: tw.y - 25,
        vx: Math.cos(angle) * 10,
        vy: Math.sin(angle) * 10,
        hit: false, timer: 60
      });
      tw.arrowCooldown = 60 + Math.floor(Math.random() * 40);
    }

    // Fall through to normal AI for Helios movement/attacks (he's aggressive)
  }

  // Hangman boss: disassemble and fly pieces across screen
  if (this.char.isHangman) {
    if (this.hangmanDisCooldown > 0) this.hangmanDisCooldown--;

    // Don't act while disassembled
    if (this.hangmanDisassembled) return;

    // Initiate disassembly — teleport to other side of opponent
    const hDist = Math.abs(this.x - opponent.x);
    if (this.hangmanDisCooldown <= 0 && this.state !== 'attack' && Math.random() < 0.03) {
      this.hangmanDisassembled = true;
      this.hangmanHidden = true;
      // Pick target: opposite side of opponent from current position
      if (this.x < opponent.x) {
        this.hangmanTargetX = Math.min(880, opponent.x + 80 + Math.random() * 80);
      } else {
        this.hangmanTargetX = Math.max(80, opponent.x - 80 - Math.random() * 80);
      }
      // Set up piece order: head, torso, arm, arm, leg, leg
      this.hangmanPieces = [];
      this.hangmanPieceIndex = 0;
      this.hangmanLaunchTimer = 0;
      this.hangmanDisCooldown = 240; // 4 second cooldown after reassembly
      return;
    }
    // Fall through to normal AI
  }

  // The Count boss: dark fireworks sweep, ground fireworks, jump explosion
  if (this.char.isTheCount) {
    if (this.countFireCooldown > 0) this.countFireCooldown--;
    if (this.countGroundCooldown > 0) this.countGroundCooldown--;

    if (this.countFiring) return; // firing sweep in progress

    const cDist = Math.abs(this.x - opponent.x);

    // Firework sweep (one pass up and down) at medium range
    if (cDist > 100 && this.countFireCooldown <= 0 && Math.random() < 0.03) {
      this.countFiring = true;
      this.countFireTimer = 90; // 1.5 second sweep (one pass up-down)
      this.countFireCooldown = 200;
      return;
    }

    // Ground firework burst toward opponent
    if (cDist > 80 && this.countGroundCooldown <= 0 && Math.random() < 0.04) {
      const darkColors = ['#8B0000', '#CC5500', '#B8860B', '#006400', '#00008B', '#4B0082'];
      for (let i = 0; i < 3; i++) {
        const spd = 5 + Math.random() * 3;
        this.countFireworks.push({
          x: this.x + (Math.random() - 0.5) * 40,
          y: this.groundY,
          vx: this.facing * (2 + Math.random() * 3),
          vy: -spd - Math.random() * 4,
          color: darkColors[Math.floor(Math.random() * darkColors.length)],
          timer: 25 + Math.floor(Math.random() * 15),
          trail: [],
          fromGround: true
        });
      }
      this.countGroundCooldown = 100;
    }

    // Jump explosion — when in air and close to opponent
    if (!this.grounded && !this.countJumpExplosionUsed && cDist < 150) {
      this.countJumpExplosionUsed = true;
      const darkColors = ['#8B0000', '#CC5500', '#B8860B', '#006400', '#00008B', '#4B0082'];
      for (let e = 0; e < 20; e++) {
        const ea = (e / 20) * Math.PI * 2;
        const es = 3 + Math.random() * 5;
        this.countExplosions.push({
          x: this.x, y: this.y - 25,
          vx: Math.cos(ea) * es, vy: Math.sin(ea) * es,
          color: darkColors[Math.floor(Math.random() * darkColors.length)],
          timer: 20 + Math.floor(Math.random() * 10)
        });
      }
      // Damage nearby opponent
      if (cDist < 80) {
        const diffMult = (!this.isPlayer && cpuDifficulty) ? cpuDifficulty.damageMult : 1;
        opponent.takeDamage(12 * this.char.stats.power * diffMult,
          { hitstun: 16, blockstun: 10, launch: false, knockbackForce: 5 },
          this.facing, false, { x: this.x, y: this.y - 25 });
      }
      shakeTimer = 6;
      shakeIntensity = 7;
    }
    if (this.grounded) this.countJumpExplosionUsed = false;
    // Fall through to normal AI
  }

  // Relapmi boss: ground spears, body shank, spike ring
  if (this.char.isRelapmi) {
    if (this.relapmiSpearCooldown > 0) this.relapmiSpearCooldown--;
    if (this.relapmiShankCooldown > 0) this.relapmiShankCooldown--;
    if (this.relapmiSpikeRingCooldown > 0) this.relapmiSpikeRingCooldown--;

    const rDist = Math.abs(this.x - opponent.x);

    // Shank — close range, spear grows from body toward opponent
    if (rDist < 130 && this.relapmiShankCooldown <= 0 && !this.relapmiShank && Math.random() < 0.06) {
      const dx = opponent.x - this.x;
      const dy = (opponent.y - 25) - this.centerY;
      this.relapmiShank = {
        angle: Math.atan2(dy, dx),
        timer: 25,
        maxLen: 100,
        length: 0,
        hit: false
      };
      this.relapmiShankCooldown = 80;
    }

    // Ground spears — summon 2-4 spears rising near opponent at medium+ range
    if (rDist > 100 && this.relapmiSpearCooldown <= 0 && this.relapmiSpears.length < 5 && Math.random() < 0.035) {
      const count = 2 + Math.floor(Math.random() * 3);
      for (let i = 0; i < count; i++) {
        this.relapmiSpears.push({
          x: opponent.x + (Math.random() - 0.5) * 150,
          y: this.groundY,
          timer: 50,
          emergeT: 0,
          hit: false
        });
      }
      this.relapmiSpearCooldown = 150;
    }

    // Spike ring — fire outward ring at any range, less frequent
    if (this.relapmiSpikeRingCooldown <= 0 && !this.relapmiSpikeRing && Math.random() < 0.015) {
      const numSpikes = 12;
      const spikes = [];
      for (let i = 0; i < numSpikes; i++) {
        spikes.push({
          angle: (i / numSpikes) * Math.PI * 2,
          dist: 10,
          speed: 4
        });
      }
      this.relapmiSpikeRing = { spikes, timer: 60, hit: [] };
      this.relapmiSpikeRingCooldown = 240;
    }
    // Fall through to normal AI
  }

  // Six Iron-Nine Iron boss: club swing, golf ball, lasso
  if (this.char.isSixIron) {
    if (this.sixIronClubCooldown > 0) this.sixIronClubCooldown--;
    if (this.sixIronGolfCooldown > 0) this.sixIronGolfCooldown--;
    if (this.sixIronLassoCooldown > 0) this.sixIronLassoCooldown--;

    if (this.sixIronClubSwinging || this.sixIronLassoPulling) return;

    const siDist = Math.abs(this.x - opponent.x);

    // Club swing at close range
    if (siDist < 90 && this.sixIronClubCooldown <= 0 && this.state !== 'attack' && Math.random() < 0.07) {
      this.sixIronClubSwinging = true;
      this.sixIronClubTimer = 30;
      this.sixIronClubCooldown = 70;
      return;
    }

    // Shoot golf ball at medium-long range
    if (siDist > 150 && this.sixIronGolfCooldown <= 0 && this.sixIronGolfBalls.length < 3 && Math.random() < 0.04) {
      this.sixIronGolfBalls.push({
        x: this.x + this.facing * 25,
        y: this.centerY - 5,
        vx: this.facing * 11,
        vy: -3 - Math.random() * 2,
        timer: 90,
        hit: false
      });
      this.sixIronGolfCooldown = 80;
      return;
    }

    // Lasso at medium range to pull player closer
    if (siDist > 120 && siDist < 350 && this.sixIronLassoCooldown <= 0 && !this.sixIronLasso && Math.random() < 0.03) {
      this.sixIronLasso = {
        x: this.x + this.facing * 20,
        y: this.centerY - 10,
        vx: this.facing * 10,
        timer: 45,
        hit: false
      };
      this.sixIronLassoCooldown = 240;
      return;
    }
    // Fall through to normal AI
  }

  // Birdeater boss: leg crush + tail strike + jump over player
  if (this.char.isBirdeater) {
    if (this.birdeaterTailCooldown > 0) this.birdeaterTailCooldown--;
    if (this.birdeaterLegCrushCooldown > 0) this.birdeaterLegCrushCooldown--;
    if (this.birdeaterJumpCooldown > 0) this.birdeaterJumpCooldown--;

    // During tail strike or jump, skip other AI
    if (this.birdeaterTailStriking || this.birdeaterJumping) return;

    const beDist = Math.abs(this.x - opponent.x);

    // Jump over player when they're very close and in front
    if (beDist < 80 && this.birdeaterJumpCooldown <= 0 && this.grounded && Math.random() < 0.03) {
      this.birdeaterJumping = true;
      this.birdeaterJumpVy = -14;
      this.grounded = false;
      this.birdeaterJumpCooldown = 180;
      // Jump toward opponent's side to land behind them
      this.vx = this.facing * 6;
      return;
    }

    // Tail strike at medium range
    if (beDist < 160 && beDist > 30 && this.birdeaterTailCooldown <= 0 && Math.random() < 0.05) {
      this.birdeaterTailStriking = true;
      this.birdeaterTailTimer = 35;
      this.birdeaterTailCooldown = 100;
      return;
    }

    // Walk toward player for leg crush (passive damage at close range is in update)
    // Fall through to normal AI for movement, jabs, kicks, blocking
  }

  // Head boss: spit + charge roll
  if (this.char.isHead) {
    if (this.headSpitCooldown > 0) this.headSpitCooldown--;
    if (this.headRollCooldown > 0) this.headRollCooldown--;

    // Don't do anything else while charging or rolling
    if (this.headCharging || this.headRolling) return;

    const hDist = Math.abs(this.x - opponent.x);

    // Spit at medium-long range
    if (this.headSpitCooldown <= 0 && hDist > 80 && Math.random() < 0.05) {
      const angle = Math.atan2((opponent.centerY) - (this.y - 35), opponent.x - this.x);
      this.headSpitProjectiles.push({
        x: this.x + this.facing * 30,
        y: this.y - 35,
        vx: Math.cos(angle) * 8,
        vy: Math.sin(angle) * 8,
        hit: false,
        timer: 60
      });
      this.headSpitCooldown = 60 + Math.floor(Math.random() * 40);
    }

    // Charge roll at any range, less frequent
    if (this.headRollCooldown <= 0 && Math.random() < 0.015) {
      this.headCharging = true;
      this.headChargeTimer = 40; // charge for ~0.67 seconds
      return;
    }

    // Basic movement: roll toward player
    if (hDist > 60) {
      this.vx = this.facing * this.char.stats.speed;
    } else if (hDist < 40) {
      this.vx = -this.facing * this.char.stats.speed * 0.5;
    }
    // Occasional jump
    if (this.grounded && Math.random() < 0.01) {
      this.vy = -11;
      this.grounded = false;
    }
    return; // skip normal AI entirely
  }

  // Orcus boss: soul drain, lightning, spirits
  if (this.char.isOrcus) {
    if (this.orcusLightningCooldown > 0) this.orcusLightningCooldown--;
    if (this.orcusSpiritCooldown > 0) this.orcusSpiritCooldown--;
    if (this.exorDrainCooldown > 0) this.exorDrainCooldown--;

    const oDist = Math.abs(this.x - opponent.x);

    // Soul drain at close range (same as Exor)
    if (!this.exorDraining && this.exorDrainCooldown <= 0 && oDist < 120 && this.state !== 'attack' && Math.random() < 0.04) {
      this.exorDraining = true;
      this.exorDrainTimer = 90;
      this.exorDrainTarget = opponent;
      opponent.slowTimer = Math.max(opponent.slowTimer, 90);
    }

    // Green lightning at medium range
    if (this.orcusLightningCooldown <= 0 && oDist > 80 && this.state !== 'attack' && Math.random() < 0.03) {
      // Strike at player's current position
      const strikeX = opponent.x + (Math.random() - 0.5) * 40;
      // Generate bolt path
      const bolts = [];
      for (let b = 0; b < 2; b++) {
        const bolt = [];
        const segs = 8;
        for (let s = 0; s <= segs; s++) {
          bolt.push({
            x: strikeX + (s > 0 && s < segs ? (Math.random() - 0.5) * 30 : 0),
            y: s * (opponent.groundY / segs) + (s > 0 && s < segs ? (Math.random() - 0.5) * 15 : 0)
          });
        }
        bolts.push(bolt);
      }
      this.orcusLightning.push({ x: strikeX, timer: 20, bolts: bolts });
      this.orcusLightningCooldown = 120 + Math.floor(Math.random() * 60);
      shakeTimer = 4;
      shakeIntensity = 5;
    }

    // Send spirits at long range
    if (this.orcusSpiritCooldown <= 0 && this.orcusSpirits.length < 3 && oDist > 100 && Math.random() < 0.025) {
      this.orcusSpirits.push({
        x: this.x + this.facing * 20,
        y: this.centerY - 10,
        vx: this.facing * 3,
        vy: -1 + Math.random() * 2,
        hp: 8,
        stolenHP: 0,
        phase: 'attack', // 'attack' -> 'return'
        hitCooldown: 0
      });
      this.orcusSpiritCooldown = 150 + Math.floor(Math.random() * 60);
    }

    // Fall through to normal AI
  }

  // Tube Warden boss: tube launcher + gas spray
  if (this.char.isTubeWarden) {
    if (this.twTubeCooldown > 0) this.twTubeCooldown--;
    if (this.twGasCooldown > 0) this.twGasCooldown--;

    const twDist = Math.abs(this.x - opponent.x);

    // Shoot tube at medium-long range
    if (this.twTubeCooldown <= 0 && twDist > 120 && this.state !== 'attack' && Math.random() < 0.05) {
      const angle = Math.atan2((opponent.y - 30) - this.centerY, opponent.x - this.x);
      // Heavy arcing shot — add upward velocity
      this.twTubes.push({
        x: this.x + this.facing * 30,
        y: this.centerY - 10,
        vx: Math.cos(angle) * 10 + this.facing * 2,
        vy: Math.sin(angle) * 6 - 4, // arc upward
        stuck: false,
        stuckTimer: 0,
        exploded: false
      });
      this.twTubeCooldown = 90 + Math.floor(Math.random() * 60);
    }

    // Spray gas at close-medium range
    if (this.twGasCooldown <= 0 && twDist < 200 && this.state !== 'attack' && Math.random() < 0.03) {
      this.twGasClouds.push({
        x: this.x + this.facing * (60 + Math.random() * 40),
        y: this.groundY,
        timer: 240, // 4 seconds
        radius: 35 + Math.random() * 15
      });
      this.twGasCooldown = 180 + Math.floor(Math.random() * 60);
    }
    // Fall through to normal AI for movement/attacks
  }

  // Scalena boss: neck bite + snake summon
  if (this.char.isScalena) {
    if (this.scalenaBiteCooldown > 0) this.scalenaBiteCooldown--;
    if (this.scalenaSnakeCooldown > 0) this.scalenaSnakeCooldown--;

    // Bite attack — extend neck when close
    if (this.scalenaBiting) {
      // Bite animation handled in update; skip other actions
      return;
    }

    const sDist = Math.abs(this.x - opponent.x);

    // Neck bite at medium range
    if (sDist < 200 && sDist > 40 && this.scalenaBiteCooldown <= 0 && this.state !== 'attack' && Math.random() < 0.06) {
      this.scalenaBiting = true;
      this.scalenaBiteTimer = 40; // extend, hold, retract
      this.scalenaBiteCooldown = 120;
      return;
    }

    // Summon snakes at long range
    if (sDist > 150 && this.scalenaSnakeCooldown <= 0 && this.scalenaSnakes.length < 4 && Math.random() < 0.04) {
      // Summon 2-3 snakes from ground near opponent
      const count = 2 + Math.floor(Math.random() * 2);
      for (let i = 0; i < count; i++) {
        this.scalenaSnakes.push({
          x: opponent.x + (Math.random() - 0.5) * 120,
          y: this.groundY,
          vx: 0, vy: 0,
          timer: 480, // 8 seconds
          biteCooldown: 30, // short initial delay
          emergeTimer: 20 // rise from ground
        });
      }
      this.scalenaSnakeCooldown = 300; // 5 second cooldown
    }
    // Fall through to normal AI for movement, jabs, kicks, blocking
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
    const isBojdo3 = this.char.isBojdo3;
    const isUpgraded = this.char.name === 'BOJDOBOJDO' || isBojdo3;
    const maxScale = isBojdo3 ? 5.0 : (isUpgraded ? 3.5 : 2.0);
    const minScale = isBojdo3 ? 1.0 : (isUpgraded ? 0.2 : 0.5);
    const shiftSpeed = isBojdo3 ? 0.05 : 0.03;
    if (dist > 200 || this.aiAction === 'retreat') {
      // Shrink for speed when far away or retreating (Bojdo3: only return to default, never shrink)
      const targetScale = Math.max(minScale, isBojdo3 ? 1.0 : 0.6);
      if (this.bojdoScale > targetScale) this.bojdoScale = Math.max(targetScale, this.bojdoScale - shiftSpeed);
    } else if (dist < 120 && (this.aiAction === 'attack' || this.aiAction === 'approach' || this.state === 'attack')) {
      // Grow for power and range when attacking up close
      const targetScale = Math.min(maxScale, isBojdo3 ? 4.0 : (isUpgraded ? 2.5 : 1.8));
      if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + shiftSpeed + 0.01);
    } else if (this.aiAction === 'block') {
      // Grow big when blocking for more defense
      const targetScale = Math.min(maxScale, isBojdo3 ? 4.5 : (isUpgraded ? 3.0 : 2.0));
      if (this.bojdoScale < targetScale) this.bojdoScale = Math.min(targetScale, this.bojdoScale + shiftSpeed);
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

  // Bojdo AI speed multiplier: smaller = faster (matches player physics)
  const bojdoAiSpeedMult = this.char.isBojdo ? Math.max(0.3, (3.0 - this.bojdoScale) / 2.0) : 1;

  switch (this.aiAction) {
    case 'approach':
      this.vx = this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.4 : 0.8) * bojdoAiSpeedMult;
      this.state = 'walk';
      if (dist < 80) this.aiAction = 'attack';
      break;
    case 'retreat':
      this.vx = -this.facing * this.char.stats.speed * (this.slowTimer > 0 ? 0.3 : 0.6) * bojdoAiSpeedMult;
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


