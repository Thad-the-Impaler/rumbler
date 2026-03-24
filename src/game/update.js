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

      if (rumbleType === 'DUPLAIRE') {
        // Duplaire "Can't Get Enough of Me": ~480 frames
        // 0-80: Clones drop from ceiling onto opponent
        // 80-160: Clones leap in from offscreen, pile grows
        // 160-280: Camera zooms out, space background fades in
        // 280-400: Earth view, cyan dots cover it
        // 400-450: Earth fully covered, silhouette Duplaires on perimeter
        // 450-480: Hold + end
        const dropEnd = 80;
        const pileEnd = 160;
        const zoomEnd = 280;
        const earthCoverEnd = 400;
        const finalPause = 450;
        const endFrame = 480;

        winFighter.vx = 0;
        winFighter.state = 'idle';

        // Initialization
        if (rumbleTimer === 1) {
          // Generate stars for space background
          for (let i = 0; i < 40; i++) {
            rumbleDuplaireStars.push({
              x: Math.random() * 960,
              y: Math.random() * 540,
              size: 0.5 + Math.random() * 2,
              alpha: 0.3 + Math.random() * 0.7
            });
          }
        }

        // Phase 0: Clones drop from ceiling (frames 1-80)
        if (rumbleTimer <= dropEnd) {
          rumbleDuplairePhase = 0;
          // Spawn a clone every 5 frames (12 clones total from frame 10-70)
          if (rumbleTimer >= 10 && rumbleTimer <= 70 && rumbleTimer % 5 === 0) {
            rumbleDuplaireClones.push({
              x: loseFighter.x + (Math.random() - 0.5) * 160,
              y: -60 - Math.random() * 40,
              vx: (Math.random() - 0.5) * 2,
              vy: 0,
              facing: Math.random() > 0.5 ? 1 : -1,
              landed: false
            });
          }
          // Opponent stays visible — hidden by clones visually, fades with zoom
        }

        // Phase 1: Clones leap in from offscreen (frames 80-160)
        if (rumbleTimer > dropEnd && rumbleTimer <= pileEnd) {
          rumbleDuplairePhase = 1;
          if (rumbleTimer % 4 === 0) {
            const fromLeft = rumbleDuplairePileClones.length % 2 === 0;
            const startX = fromLeft ? -40 : 1000;
            const dir = fromLeft ? 1 : -1;
            rumbleDuplairePileClones.push({
              x: startX,
              y: loseFighter.groundY,
              vx: dir * (5 + Math.random() * 3),
              vy: -(8 + Math.random() * 4),
              facing: dir,
              landed: false
            });
          }
        }

        // Fade out both fighters as camera zooms out (sync with draw crossfade)
        if (rumbleDuplaireZoom > 0.35) {
          const fadeAlpha = Math.max(0, 1 - (rumbleDuplaireZoom - 0.35) / 0.2);
          winFighter._rumbleAlpha = fadeAlpha;
          loseFighter._rumbleAlpha = fadeAlpha;
          if (fadeAlpha === 0) rumbleLoserHidden = true;
        }

        // Phase 2: Camera zoom out (frames 160-280)
        if (rumbleTimer > pileEnd && rumbleTimer <= zoomEnd) {
          rumbleDuplairePhase = 2;
          rumbleDuplaireZoom = (rumbleTimer - pileEnd) / (zoomEnd - pileEnd) * 0.5;
          // Occasional clone still leaping in
          if (rumbleTimer % 10 === 0) {
            const fromLeft = Math.random() > 0.5;
            rumbleDuplairePileClones.push({
              x: fromLeft ? -40 : 1000,
              y: loseFighter.groundY,
              vx: (fromLeft ? 1 : -1) * (5 + Math.random() * 3),
              vy: -(8 + Math.random() * 4),
              facing: fromLeft ? 1 : -1,
              landed: false
            });
          }
          // Start spawning Earth dots at frame 200
          if (rumbleTimer >= 200 && rumbleTimer % 3 === 0) {
            for (let i = 0; i < 2; i++) {
              rumbleDuplaireEarthDots.push({
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 0.95,
                size: 1 + Math.random() * 1.5
              });
            }
          }
          if (rumbleTimer === pileEnd + 1) {
            shakeTimer = 6;
            shakeIntensity = 5;
          }
        }

        // Phase 3: Earth view, dots cover it (frames 280-400)
        if (rumbleTimer > zoomEnd && rumbleTimer <= earthCoverEnd) {
          rumbleDuplairePhase = 3;
          rumbleDuplaireZoom = 0.5 + (rumbleTimer - zoomEnd) / (earthCoverEnd - zoomEnd) * 0.5;
          // Spawn Earth dots rapidly
          if (rumbleTimer % 2 === 0) {
            for (let i = 0; i < 4; i++) {
              rumbleDuplaireEarthDots.push({
                angle: Math.random() * Math.PI * 2,
                dist: Math.random() * 0.95,
                size: 1 + Math.random() * 2
              });
            }
          }
          if (rumbleTimer === 300) {
            shakeTimer = 5;
            shakeIntensity = 4;
          }
        }

        // Phase 4: Earth fully covered (frames 400-450)
        if (rumbleTimer > earthCoverEnd && rumbleTimer <= finalPause) {
          rumbleDuplairePhase = 4;
          rumbleDuplaireZoom = 1;
          // Slow dot additions to fill gaps
          if (rumbleTimer % 4 === 0) {
            rumbleDuplaireEarthDots.push({
              angle: Math.random() * Math.PI * 2,
              dist: Math.random() * 0.95,
              size: 1 + Math.random() * 1.5
            });
          }
        }

        // Phase 5: End (frames 450-480)
        if (rumbleTimer > finalPause) {
          rumbleDuplairePhase = 5;
          rumbleDuplaireZoom = 1;
        }

        // Update falling clones (Phase 0)
        const totalLanded = rumbleDuplaireClones.filter(c => c.landed).length;
        for (const c of rumbleDuplaireClones) {
          if (c.landed) continue;
          c.vy += 0.6;
          c.x += c.vx;
          c.y += c.vy;
          // Stack on pile — each landed clone sits higher
          const landY = loseFighter.groundY - totalLanded * 8;
          if (c.y >= landY) {
            c.y = landY;
            c.vy = 0;
            c.vx = 0;
            c.landed = true;
            shakeTimer = 3;
            shakeIntensity = 2 + totalLanded * 0.3;
          }
        }

        // Update leaping pile clones (Phase 1+)
        const pileTop = loseFighter.groundY - (totalLanded + rumbleDuplairePileClones.filter(c => c.landed).length) * 6;
        for (const c of rumbleDuplairePileClones) {
          if (c.landed) continue;
          c.x += c.vx;
          c.y += c.vy;
          c.vy += 0.5;
          // Land on pile when reaching the pile area
          const targetY = pileTop + Math.random() * 20;
          if (c.y >= targetY && Math.abs(c.x - loseFighter.x) < 100) {
            c.y = targetY;
            c.vy = 0;
            c.vx = 0;
            c.landed = true;
            shakeTimer = 2;
            shakeIntensity = 1.5;
          }
          // Remove if off-screen after passing through
          if (c.y > 600) {
            c.landed = true;
            c.y = pileTop;
            c.x = loseFighter.x + (Math.random() - 0.5) * 80;
          }
        }

        if (rumbleTimer >= endFrame) {
          winFighter._rumbleAlpha = undefined;
          loseFighter._rumbleAlpha = undefined;
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

