function drawCorvidaRumble(loseFighter, winFighter) {
  ctx.save();
  const groundY = loseFighter.groundY;
  const nestX = rumbleCorvidaNestX;
  const S = 2.5; // scale factor for nest/eggs/chicks — giant!

  // Draw nest (giant brown twigs bowl shape)
  if (rumbleCorvidaPhase >= 1) {
    const nestAlpha = rumbleCorvidaPhase === 1 ? Math.min(1, (rumbleTimer - 40) / 20) : 1;
    ctx.globalAlpha = nestAlpha;
    ctx.fillStyle = '#6b4a2a';
    ctx.beginPath();
    ctx.ellipse(nestX, groundY - 2, 110, 28, 0, 0, Math.PI * 2);
    ctx.fill();
    // Nest rim
    ctx.strokeStyle = '#553a1a';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.ellipse(nestX, groundY - 8, 115, 32, 0, 0, Math.PI, true);
    ctx.stroke();
    // Twigs
    ctx.strokeStyle = '#7a5a3a';
    ctx.lineWidth = 2.5;
    for (let i = 0; i < 12; i++) {
      const tx = nestX - 100 + i * 18 + Math.sin(i * 2.3) * 8;
      const ty = groundY - 6;
      ctx.beginPath();
      ctx.moveTo(tx, ty);
      ctx.lineTo(tx + 14 + Math.sin(i) * 6, ty - 5);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Draw eggs / hatchlings (giant)
  for (let i = 0; i < rumbleCorvidaEggs.length; i++) {
    const egg = rumbleCorvidaEggs[i];
    if (rumbleCorvidaPhase < 2) continue;
    if (!egg.landed && !egg.falling) continue; // not dropped yet

    const drawY = egg.landed ? egg.y : egg.fallY;

    ctx.save();
    ctx.translate(egg.x, drawY);

    if (!egg.hatched) {
      // Giant egg
      ctx.fillStyle = '#aaccee';
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(0, -14 * S, 10 * S, 16 * S, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      // Speckles
      ctx.fillStyle = '#88aacc';
      ctx.beginPath(); ctx.arc(-5 * S, -18 * S, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4 * S, -10 * S, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(-2 * S, -8 * S, 2, 0, Math.PI * 2); ctx.fill();
    } else {
      // Giant hatchling
      // Shell halves
      ctx.fillStyle = '#aaccee';
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(-8 * S, -4, 8 * S, 12 * S, -0.2, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(8 * S, -4, 8 * S, 12 * S, 0.2, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      // Crack line
      ctx.strokeStyle = '#7799bb';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-12 * S, -8);
      ctx.lineTo(-6 * S, -12); ctx.lineTo(-1 * S, -6); ctx.lineTo(3 * S, -12); ctx.lineTo(8 * S, -6); ctx.lineTo(12 * S, -10);
      ctx.stroke();

      // Chick head — giant
      const chickBob = Math.sin(Date.now() * 0.005 + i * 2) * 3;
      const mouthOpen = rumbleCorvidaPhase >= 5 ? 14 + Math.sin(Date.now() * 0.008 + i) * 4 : 0;
      const headY = -20 * S + chickBob;
      // Head
      ctx.fillStyle = '#5aa0e0';
      ctx.beginPath();
      ctx.arc(0, headY, 10 * S, 0, Math.PI * 2);
      ctx.fill();
      // Eye (skip if satisfied — happy closed eye drawn below)
      const isFedChick = rumbleCorvidaPhase >= 7 && i === rumbleCorvidaGulpChick;
      if (!isFedChick) {
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.arc(4 * S, headY - 2, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Beak
      ctx.fillStyle = '#dd9933';
      const beakY = headY - 8 * S;
      if (mouthOpen > 0) {
        // Upper beak (open wide)
        ctx.beginPath();
        ctx.moveTo(-5 * S, beakY);
        ctx.lineTo(0, beakY - mouthOpen);
        ctx.lineTo(5 * S, beakY);
        ctx.closePath();
        ctx.fill();
        // Lower beak
        ctx.beginPath();
        ctx.moveTo(-5 * S, beakY);
        ctx.lineTo(0, beakY + 5);
        ctx.lineTo(5 * S, beakY);
        ctx.closePath();
        ctx.fill();
        // Pink mouth
        ctx.fillStyle = '#ee6666';
        ctx.beginPath();
        ctx.moveTo(-4 * S, beakY);
        ctx.lineTo(0, beakY - mouthOpen * 0.6);
        ctx.lineTo(4 * S, beakY);
        ctx.closePath();
        ctx.fill();
      } else {
        ctx.beginPath();
        ctx.moveTo(-4 * S, beakY);
        ctx.lineTo(5 * S, beakY - 2);
        ctx.lineTo(-2 * S, beakY + 4);
        ctx.closePath();
        ctx.fill();
      }

      // Satisfied chick after gulp
      if (rumbleCorvidaPhase >= 7 && i === rumbleCorvidaGulpChick) {
        // Bulging belly
        ctx.fillStyle = '#5aa0e0';
        ctx.beginPath();
        ctx.ellipse(0, -8, 14 * S, 12 * S, 0, 0, Math.PI * 2);
        ctx.fill();
        // Happy closed eyes
        ctx.strokeStyle = '#111';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(4 * S, headY - 2, 4, 0, Math.PI);
        ctx.stroke();
      }
    }

    ctx.restore();
  }

  // Draw giant blue jay (Corvida) — phases 1-7
  if (rumbleCorvidaPhase >= 1 && rumbleCorvidaPhase <= 7) {
    const jx = winFighter.x;
    const jy = winFighter.y;
    const f = winFighter.facing;
    const scale = 3; // 3x size
    const wingFlap = Math.sin(Date.now() * 0.012) * 0.5;

    ctx.save();
    ctx.translate(jx, jy);
    ctx.scale(scale, scale);

    // Body
    ctx.fillStyle = '#4a90d9';
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(0, -8, 14, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // White chest
    ctx.fillStyle = '#ddeeff';
    ctx.beginPath();
    ctx.ellipse(0, -5, 8, 6, 0, 0, Math.PI);
    ctx.fill();
    // Head
    ctx.fillStyle = '#4a90d9';
    ctx.beginPath();
    ctx.arc(f * 10, -14, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a1a2e';
    ctx.stroke();
    // Crest
    ctx.fillStyle = '#2a5fa8';
    ctx.beginPath();
    ctx.moveTo(f * 10, -22);
    ctx.lineTo(f * 6, -26);
    ctx.lineTo(f * 14, -20);
    ctx.closePath();
    ctx.fill();
    // Eye
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(f * 13, -15, 2, 0, Math.PI * 2);
    ctx.fill();
    // Beak
    ctx.fillStyle = '#333';
    ctx.beginPath();
    ctx.moveTo(f * 18, -14);
    ctx.lineTo(f * 25, -13);
    ctx.lineTo(f * 18, -11);
    ctx.closePath();
    ctx.fill();
    // Necklace
    ctx.strokeStyle = '#111';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(f * 10, -10, 8, 0.3, Math.PI - 0.3);
    ctx.stroke();
    // Wings
    ctx.save();
    ctx.rotate(-wingFlap * f);
    ctx.fillStyle = '#3a7bc8';
    ctx.beginPath();
    ctx.moveTo(-f * 8, -11);
    ctx.lineTo(-f * 24, -23);
    ctx.lineTo(-f * 16, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.rotate(wingFlap * f);
    ctx.fillStyle = '#3a7bc8';
    ctx.beginPath();
    ctx.moveTo(f * 8, -11);
    ctx.lineTo(f * 24, -23);
    ctx.lineTo(f * 16, -6);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    // Tail
    ctx.fillStyle = '#2a5fa8';
    ctx.beginPath();
    ctx.moveTo(-f * 10, -6);
    ctx.lineTo(-f * 22, -2);
    ctx.lineTo(-f * 20, -8);
    ctx.closePath();
    ctx.fill();
    // Feet/talons (carrying opponent in phases 4-6)
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(-3, 0);
    ctx.lineTo(-5, 6);
    ctx.moveTo(-5, 6);
    ctx.lineTo(-8, 8);
    ctx.moveTo(-5, 6);
    ctx.lineTo(-2, 8);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(3, 0);
    ctx.lineTo(5, 6);
    ctx.moveTo(5, 6);
    ctx.lineTo(2, 8);
    ctx.moveTo(5, 6);
    ctx.lineTo(8, 8);
    ctx.stroke();

    ctx.restore();
  }

  ctx.restore();
}

function drawGolgarRumble(loseFighter, winFighter) {
  if (!rumbleGolgarEntity2) return;
  ctx.save();
  const e2 = rumbleGolgarEntity2;
  const df = e2.facing;
  const stoneColor = '#777788';
  const stoneDark = '#555566';
  const stoneLight = '#999aaa';

  // Draw entity 2 (the dormant one, now active)
  ctx.save();
  ctx.translate(e2.x, e2.y);

  // Shadow
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 30, 6, 0, 0, Math.PI * 2);
  ctx.fill();
  // Legs
  ctx.strokeStyle = stoneDark; ctx.lineWidth = 6; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
  ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
  ctx.beginPath(); ctx.moveTo(-df * 6, -8); ctx.lineTo(-df * 10, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(df * 6, -8); ctx.lineTo(df * 10, 0); ctx.stroke();
  // Feet
  ctx.fillStyle = stoneDark;
  ctx.beginPath(); ctx.arc(-df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(df * 10, 0, 5, 0, Math.PI * 2); ctx.fill();
  // Body
  ctx.fillStyle = stoneColor; ctx.strokeStyle = stoneDark; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.roundRect(-16, -48, 32, 40, 6); ctx.fill(); ctx.stroke();
  // Chest
  ctx.fillStyle = stoneLight;
  ctx.beginPath(); ctx.roundRect(-10, -40, 20, 20, 3); ctx.fill();

  // Arms — context dependent
  const armY = -36;
  if (rumbleGolgarPhase >= 1 && rumbleGolgarPhase <= 3) {
    // Arms reaching toward opponent (grab/windup/swing)
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 35, armY - 5); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 35, armY - 5); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(df * 35, armY - 5, 5, 0, Math.PI * 2); ctx.fill();
    // Back arm at rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  } else if (rumbleGolgarPhase === 5 || rumbleGolgarPhase === 6) {
    // High-five — front arm raised up
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY - 20); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY - 20); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(df * 28, armY - 20, 5, 0, Math.PI * 2); ctx.fill();
    // Back arm rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  } else {
    // Normal arms at rest
    ctx.strokeStyle = stoneDark; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    ctx.strokeStyle = stoneColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-df * 14, armY); ctx.lineTo(-df * 28, armY + 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(df * 14, armY); ctx.lineTo(df * 28, armY + 15); ctx.stroke();
    ctx.fillStyle = stoneLight;
    ctx.beginPath(); ctx.arc(-df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(df * 28, armY + 15, 4, 0, Math.PI * 2); ctx.fill();
  }

  // Head
  ctx.fillStyle = stoneLight; ctx.strokeStyle = stoneDark; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.arc(0, -64, 16, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // Eyes (awake — not dormant)
  ctx.fillStyle = '#8b7ec8';
  ctx.beginPath(); ctx.arc(-5, -66, 3, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(5, -66, 3, 0, Math.PI * 2); ctx.fill();
  // Eye highlights
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(-4, -67, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(6, -67, 1.5, 0, Math.PI * 2); ctx.fill();

  ctx.restore();

  // Draw entity 1's raised front arm for high-five (normal arm is hidden via _hideFrontArm)
  if ((rumbleGolgarPhase === 5 || rumbleGolgarPhase === 6) && winFighter._hideFrontArm) {
    ctx.save();
    ctx.translate(winFighter.x, winFighter.y);
    const wf = winFighter.facing;
    const wColor = winFighter.char ? winFighter.char.color : '#5a5a6e';
    const wOutline = winFighter.char ? winFighter.char.outline : '#2e2e3e';
    const wAccent = winFighter.char ? winFighter.char.accent : '#8b7ec8';
    const wArmY = -44;
    // Raised front arm
    ctx.strokeStyle = wOutline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(wf * 14, wArmY); ctx.lineTo(wf * 28, wArmY - 20); ctx.stroke();
    ctx.strokeStyle = wColor; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(wf * 14, wArmY); ctx.lineTo(wf * 28, wArmY - 20); ctx.stroke();
    // Fist
    ctx.fillStyle = wAccent;
    ctx.beginPath(); ctx.arc(wf * 28, wArmY - 20, 5, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
  }

  // High-five impact effect
  if (rumbleGolgarPhase === 6) {
    const midX = (winFighter.x + e2.x) / 2;
    const midY = winFighter.y - 56;
    // Impact star
    const hfT = (rumbleTimer - 251);
    if (hfT >= 0 && hfT < 20) {
      ctx.globalAlpha = 1 - hfT / 20;
      ctx.fillStyle = '#ffff44';
      ctx.beginPath();
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        const r = i % 2 === 0 ? 8 + hfT * 0.5 : 3;
        if (i === 0) ctx.moveTo(midX + Math.cos(a) * r, midY + Math.sin(a) * r);
        else ctx.lineTo(midX + Math.cos(a) * r, midY + Math.sin(a) * r);
      }
      ctx.closePath();
      ctx.fill();
      ctx.globalAlpha = 1;
    }
  }

  // Launch trail (star burst when launched)
  if (rumbleGolgarPhase === 4 && !rumbleLoserHidden) {
    ctx.globalAlpha = 0.4;
    ctx.strokeStyle = '#8b7ec8';
    ctx.lineWidth = 2;
    for (let i = 0; i < 3; i++) {
      const trailX = loseFighter.x - f * (i + 1) * 15;
      const trailY = loseFighter.y + (i + 1) * 12;
      ctx.beginPath();
      ctx.arc(trailX, trailY, 4 - i, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawTelatrineRumble(loseFighter, winFighter) {
  ctx.save();
  if (rumbleTelatrinePhase === 5 && rumbleTelatrineShrug > 0) {
    const f = winFighter.facing;
    const shrugT = Math.min(1, rumbleTelatrineShrug / 20);
    const color = winFighter.char ? winFighter.char.color : '#2e1a4a';
    const outline = winFighter.char ? winFighter.char.outline : '#1a0a2e';
    const accent = winFighter.char ? winFighter.char.accent : '#b366ff';
    ctx.save();
    ctx.translate(winFighter.x, winFighter.y);
    const armY = -44;
    const frontArmEndX = f * (20 + shrugT * 8);
    const frontArmEndY = armY - shrugT * 20;
    ctx.strokeStyle = outline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(f * 14, armY); ctx.lineTo(frontArmEndX, frontArmEndY); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(f * 14, armY); ctx.lineTo(frontArmEndX, frontArmEndY); ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(frontArmEndX, frontArmEndY, 4, 0, Math.PI * 2); ctx.fill();
    const backArmEndX = -f * (20 + shrugT * 8);
    const backArmEndY = armY - shrugT * 20;
    ctx.strokeStyle = outline; ctx.lineWidth = 6;
    ctx.beginPath(); ctx.moveTo(-f * 14, armY); ctx.lineTo(backArmEndX, backArmEndY); ctx.stroke();
    ctx.strokeStyle = color; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(-f * 14, armY); ctx.lineTo(backArmEndX, backArmEndY); ctx.stroke();
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.arc(backArmEndX, backArmEndY, 4, 0, Math.PI * 2); ctx.fill();
    if (shrugT >= 1) {
      const bobble = Math.sin(Date.now() * 0.005) * 2;
      ctx.font = 'bold 24px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#b366ff';
      ctx.fillText('?', 0, -85 + bobble);
    }
    ctx.restore();
  }
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawMiniDuplaire(x, y, scale, facing) {
  const s = scale;
  const f = facing;
  const color = '#3a5c6e';
  const accent = '#66b8cc';
  const outline = '#1e3a4a';
  ctx.save();
  ctx.translate(x, y);

  // Shadow
  if (s > 0.3) {
    ctx.fillStyle = 'rgba(0,0,0,0.15)';
    ctx.beginPath();
    ctx.ellipse(0, 2 * s, 18 * s, 4 * s, 0, 0, Math.PI * 2);
    ctx.fill();
  }

  // Legs
  ctx.strokeStyle = outline; ctx.lineWidth = Math.max(1, 4 * s); ctx.lineCap = 'round';
  ctx.beginPath(); ctx.moveTo(-6 * s, -8 * s); ctx.lineTo(-8 * s, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6 * s, -8 * s); ctx.lineTo(8 * s, 0); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, 3 * s);
  ctx.beginPath(); ctx.moveTo(-6 * s, -8 * s); ctx.lineTo(-8 * s, 0); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(6 * s, -8 * s); ctx.lineTo(8 * s, 0); ctx.stroke();

  // Feet
  ctx.fillStyle = outline;
  ctx.beginPath(); ctx.arc(-8 * s, 0, 3 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(8 * s, 0, 3 * s, 0, Math.PI * 2); ctx.fill();

  // Body
  ctx.fillStyle = color; ctx.strokeStyle = outline; ctx.lineWidth = Math.max(1, 1.5 * s);
  ctx.beginPath(); ctx.roundRect(-12 * s, -42 * s, 24 * s, 34 * s, 4 * s); ctx.fill(); ctx.stroke();

  // Chest accent
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.roundRect(-8 * s, -36 * s, 16 * s, 16 * s, 2 * s); ctx.fill();

  // Arms
  ctx.strokeStyle = outline; ctx.lineWidth = Math.max(1, 4 * s);
  ctx.beginPath(); ctx.moveTo(f * 12 * s, -36 * s); ctx.lineTo(f * 24 * s, -22 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-f * 12 * s, -36 * s); ctx.lineTo(-f * 22 * s, -20 * s); ctx.stroke();
  ctx.strokeStyle = color; ctx.lineWidth = Math.max(1, 3 * s);
  ctx.beginPath(); ctx.moveTo(f * 12 * s, -36 * s); ctx.lineTo(f * 24 * s, -22 * s); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-f * 12 * s, -36 * s); ctx.lineTo(-f * 22 * s, -20 * s); ctx.stroke();

  // Hands
  ctx.fillStyle = accent;
  ctx.beginPath(); ctx.arc(f * 24 * s, -22 * s, 3 * s, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(-f * 22 * s, -20 * s, 3 * s, 0, Math.PI * 2); ctx.fill();

  // Head
  ctx.fillStyle = accent; ctx.strokeStyle = outline; ctx.lineWidth = Math.max(1, 1.5 * s);
  ctx.beginPath(); ctx.arc(0, -54 * s, 12 * s, 0, Math.PI * 2); ctx.fill(); ctx.stroke();

  // Eyes
  if (s > 0.25) {
    ctx.fillStyle = '#111';
    ctx.beginPath(); ctx.arc(f * 4 * s, -56 * s, 2 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-f * 4 * s, -56 * s, 2 * s, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(f * 4.5 * s, -57 * s, 1 * s, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(-f * 3.5 * s, -57 * s, 1 * s, 0, Math.PI * 2); ctx.fill();
  }

  ctx.restore();
}

function drawTinyDuplaire(x, y, angle) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle + Math.PI / 2);
  ctx.fillStyle = '#66b8cc';
  ctx.fillRect(-1, -4, 2, 3);
  ctx.beginPath(); ctx.arc(0, -5.5, 1.5, 0, Math.PI * 2); ctx.fill();
  ctx.restore();
}

function drawDuplaireRumble(loseFighter, winFighter) {
  ctx.save();

  const fadeStart = 0.35;
  const fadeMid = 0.55;

  // --- FIGHT STAGE VIEW (fades out during zoom) ---
  if (rumbleDuplaireZoom < fadeMid) {
    const stageAlpha = rumbleDuplaireZoom < fadeStart ? 1 : Math.max(0, 1 - (rumbleDuplaireZoom - fadeStart) / (fadeMid - fadeStart));
    if (stageAlpha > 0) {
      ctx.save();
      if (rumbleDuplaireZoom > 0) {
        const pileX = loseFighter.x;
        const pileY = loseFighter.groundY - 40;
        const sc = 1 - rumbleDuplaireZoom * 0.8;
        ctx.translate(pileX * (1 - sc), pileY * (1 - sc));
        ctx.scale(sc, sc);
      }
      ctx.globalAlpha = stageAlpha;

      // Draw landed clones (bottom first)
      for (const c of rumbleDuplaireClones) {
        if (c.landed) drawMiniDuplaire(c.x, c.y, 1, c.facing);
      }
      for (const c of rumbleDuplaireClones) {
        if (!c.landed) drawMiniDuplaire(c.x, c.y, 1, c.facing);
      }
      for (const c of rumbleDuplairePileClones) {
        if (c.landed) drawMiniDuplaire(c.x, c.y, 1, c.facing);
      }
      for (const c of rumbleDuplairePileClones) {
        if (!c.landed) drawMiniDuplaire(c.x, c.y, 1, c.facing);
      }

      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // --- SPACE + EARTH VIEW (fades in during zoom) ---
  if (rumbleDuplaireZoom > fadeStart) {
    const spaceAlpha = rumbleDuplaireZoom < fadeMid ? (rumbleDuplaireZoom - fadeStart) / (fadeMid - fadeStart) : 1;
    ctx.save();
    ctx.globalAlpha = spaceAlpha;

    // Space background
    ctx.fillStyle = '#050510';
    ctx.fillRect(0, 0, 960, 540);

    // Stars
    for (const star of rumbleDuplaireStars) {
      ctx.globalAlpha = spaceAlpha * star.alpha * (0.7 + 0.3 * Math.sin(Date.now() * 0.001 + star.x));
      ctx.fillStyle = '#ffffff';
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = spaceAlpha;

    // Earth
    const earthProgress = Math.max(0, Math.min(1, (rumbleDuplaireZoom - 0.4) / 0.6));
    const earthR = 20 + earthProgress * 160;
    const earthX = 480;
    const earthY = 270;

    // Earth base (blue ocean)
    const earthGrad = ctx.createRadialGradient(earthX - earthR * 0.15, earthY - earthR * 0.15, earthR * 0.1, earthX, earthY, earthR);
    earthGrad.addColorStop(0, '#3366cc');
    earthGrad.addColorStop(0.6, '#2244aa');
    earthGrad.addColorStop(1, '#112255');
    ctx.fillStyle = earthGrad;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.fill();

    // Continent blobs (clip to Earth circle)
    ctx.save();
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR, 0, Math.PI * 2);
    ctx.clip();
    ctx.fillStyle = '#2a7a3a';
    ctx.beginPath(); ctx.ellipse(earthX - earthR * 0.35, earthY - earthR * 0.25, earthR * 0.25, earthR * 0.18, -0.3, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(earthX - earthR * 0.15, earthY + earthR * 0.3, earthR * 0.12, earthR * 0.22, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(earthX + earthR * 0.15, earthY - earthR * 0.1, earthR * 0.12, earthR * 0.35, 0.1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.ellipse(earthX + earthR * 0.4, earthY - earthR * 0.2, earthR * 0.22, earthR * 0.15, 0.2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#2a6a3a';
    ctx.beginPath(); ctx.ellipse(earthX + earthR * 0.5, earthY + earthR * 0.35, earthR * 0.1, earthR * 0.07, 0.3, 0, Math.PI * 2); ctx.fill();
    ctx.restore();

    // Atmosphere glow
    ctx.strokeStyle = 'rgba(100, 180, 255, 0.25)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(earthX, earthY, earthR + 3, 0, Math.PI * 2);
    ctx.stroke();

    // Cyan Duplaire dots covering the Earth
    for (const dot of rumbleDuplaireEarthDots) {
      const dx = earthX + Math.cos(dot.angle) * dot.dist * earthR;
      const dy = earthY + Math.sin(dot.angle) * dot.dist * earthR;
      const distFromCenter = Math.sqrt((dx - earthX) ** 2 + (dy - earthY) ** 2);
      if (distFromCenter <= earthR) {
        ctx.globalAlpha = spaceAlpha * (0.6 + 0.4 * Math.sin(Date.now() * 0.003 + dot.angle * 10));
        ctx.fillStyle = '#66b8cc';
        ctx.beginPath();
        ctx.arc(dx, dy, dot.size * (0.5 + earthProgress * 0.5), 0, Math.PI * 2);
        ctx.fill();
      }
    }
    ctx.globalAlpha = spaceAlpha;

    // Tiny Duplaire silhouettes on Earth perimeter (Phase 4+)
    if (rumbleDuplairePhase >= 4 && earthR > 60) {
      const numFigures = Math.min(36, Math.floor(earthR / 5));
      for (let i = 0; i < numFigures; i++) {
        const a = (i / numFigures) * Math.PI * 2;
        const figX = earthX + Math.cos(a) * (earthR - 1);
        const figY = earthY + Math.sin(a) * (earthR - 1);
        drawTinyDuplaire(figX, figY, a);
      }
    }

    // Pulsing cyan glow during final phases
    if (rumbleDuplairePhase >= 4) {
      const glowAlpha = 0.08 + 0.04 * Math.sin(Date.now() * 0.002);
      ctx.globalAlpha = spaceAlpha * glowAlpha;
      ctx.fillStyle = '#66b8cc';
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthR + 8, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  ctx.restore();
}

