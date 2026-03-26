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

function drawBozollokSkeleton(x, groundY, collapseT) {
  const bone = '#e8dcc8';
  const joint = '#ccc0a8';
  const t = Math.min(1, collapseT);
  ctx.save();
  ctx.translate(x, groundY);

  // Skull
  const skullY = -70 + t * 55;
  const skullRot = t * 1.2;
  ctx.save();
  ctx.translate(0, skullY);
  ctx.rotate(skullRot);
  ctx.fillStyle = bone;
  ctx.strokeStyle = joint;
  ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.arc(0, 0, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
  // Eye sockets
  ctx.fillStyle = '#333';
  ctx.beginPath(); ctx.arc(-3, -1, 2, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(3, -1, 2, 0, Math.PI * 2); ctx.fill();
  // Jaw
  ctx.strokeStyle = bone; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(0, 3, 5, 0.2, Math.PI - 0.2); ctx.stroke();
  ctx.restore();

  // Spine
  const spineTopY = -60 + t * 48;
  const spineBotY = -25 + t * 22;
  ctx.strokeStyle = bone; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(0, spineTopY); ctx.lineTo(0, spineBotY); ctx.stroke();

  // Ribcage (3 pairs)
  for (let i = 0; i < 3; i++) {
    const ribY = -55 + i * 10 + t * (45 + i * 3);
    const ribSpread = 12 + i * 2 + t * (i * 4);
    const ribDrop = t * i * 3;
    ctx.strokeStyle = bone; ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-1, ribY + ribDrop);
    ctx.quadraticCurveTo(-ribSpread, ribY - 3 + ribDrop, -ribSpread + 2, ribY + 2 + ribDrop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1, ribY + ribDrop);
    ctx.quadraticCurveTo(ribSpread, ribY - 3 + ribDrop, ribSpread - 2, ribY + 2 + ribDrop);
    ctx.stroke();
  }

  // Pelvis
  const pelvisY = -22 + t * 20;
  ctx.strokeStyle = bone; ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(-8, pelvisY); ctx.lineTo(0, pelvisY - 3); ctx.lineTo(8, pelvisY);
  ctx.stroke();

  // Arms
  const shoulderY = -58 + t * 48;
  // Left arm
  const lElbowX = -14 - t * 4;
  const lElbowY = shoulderY + 12 + t * 8;
  const lHandX = -10 - t * 8;
  const lHandY = lElbowY + 12 + t * 6;
  ctx.strokeStyle = bone; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-4, shoulderY); ctx.lineTo(lElbowX, lElbowY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(lElbowX, lElbowY); ctx.lineTo(lHandX, lHandY); ctx.stroke();
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(lElbowX, lElbowY, 2, 0, Math.PI * 2); ctx.fill();
  // Right arm
  const rElbowX = 14 + t * 4;
  const rElbowY = shoulderY + 12 + t * 8;
  const rHandX = 10 + t * 8;
  const rHandY = rElbowY + 12 + t * 6;
  ctx.beginPath(); ctx.moveTo(4, shoulderY); ctx.lineTo(rElbowX, rElbowY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(rElbowX, rElbowY); ctx.lineTo(rHandX, rHandY); ctx.stroke();
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(rElbowX, rElbowY, 2, 0, Math.PI * 2); ctx.fill();

  // Legs
  // Left leg
  const lKneeX = -6 - t * 5;
  const lKneeY = pelvisY + 14 + t * 4;
  const lFootX = -8 - t * 3;
  const lFootY = Math.min(0, lKneeY + 14 + t * 2);
  ctx.strokeStyle = bone; ctx.lineWidth = 2;
  ctx.beginPath(); ctx.moveTo(-6, pelvisY); ctx.lineTo(lKneeX, lKneeY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(lKneeX, lKneeY); ctx.lineTo(lFootX, lFootY); ctx.stroke();
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(lKneeX, lKneeY, 2, 0, Math.PI * 2); ctx.fill();
  // Right leg
  const rKneeX = 6 + t * 5;
  const rKneeY = pelvisY + 14 + t * 4;
  const rFootX = 8 + t * 3;
  const rFootY = Math.min(0, rKneeY + 14 + t * 2);
  ctx.beginPath(); ctx.moveTo(6, pelvisY); ctx.lineTo(rKneeX, rKneeY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(rKneeX, rKneeY); ctx.lineTo(rFootX, rFootY); ctx.stroke();
  ctx.fillStyle = joint;
  ctx.beginPath(); ctx.arc(rKneeX, rKneeY, 2, 0, Math.PI * 2); ctx.fill();

  ctx.restore();
}

function drawBozollokRumble(loseFighter, winFighter) {
  ctx.save();

  // Dense swarm cloud over opponent during engulf phase
  if (rumbleBozollokPhase === 1) {
    const cloudDensity = Math.min(0.85, (rumbleTimer - 40) / 80);
    const cx = loseFighter.x;
    const cy = loseFighter.y - 40;
    const cloudR = 45;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, cloudR);
    grad.addColorStop(0, `rgba(30, 15, 5, ${cloudDensity})`);
    grad.addColorStop(0.6, `rgba(30, 15, 5, ${cloudDensity * 0.7})`);
    grad.addColorStop(1, `rgba(30, 15, 5, 0)`);
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, cloudR, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw swarm insects
  for (const bug of rumbleBozollokSwarm) {
    if (bug.alpha !== undefined && bug.alpha <= 0) continue;
    ctx.save();
    ctx.translate(bug.x, bug.y);
    ctx.rotate(bug.angle);
    if (bug.alpha !== undefined) ctx.globalAlpha = bug.alpha;

    // Body
    ctx.fillStyle = '#2a1a0a';
    ctx.beginPath();
    ctx.ellipse(0, 0, bug.size, bug.size * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wings (flutter)
    const wingFlap = Math.sin(Date.now() * 0.02 + bug.x * 0.1) * 0.5;
    ctx.strokeStyle = '#c8a030';
    ctx.lineWidth = 0.8;
    ctx.globalAlpha = (bug.alpha !== undefined ? bug.alpha : 1) * 0.7;
    ctx.beginPath();
    ctx.moveTo(-1, -1);
    ctx.lineTo(-bug.size - 1, -bug.size * (1 + wingFlap));
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(1, -1);
    ctx.lineTo(bug.size + 1, -bug.size * (1 + wingFlap));
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Draw skeleton (Phase 2+)
  if (rumbleBozollokSkeleton) {
    drawBozollokSkeleton(rumbleBozollokSkeleton.x, rumbleBozollokSkeleton.groundY, rumbleBozollokSkeleton.collapseT);
  }

  // Dust puff during collapse
  if (rumbleBozollokSkeleton && rumbleBozollokSkeleton.collapseT > 0.5 && rumbleBozollokSkeleton.collapseT < 1.2) {
    const dustT = (rumbleBozollokSkeleton.collapseT - 0.5) / 0.7;
    ctx.globalAlpha = Math.max(0, 0.4 * (1 - dustT));
    ctx.fillStyle = '#8a7a5a';
    for (let i = 0; i < 5; i++) {
      const dx = (i - 2) * 12 + Math.sin(i * 3.7) * 8 * dustT;
      const dy = -3 - Math.abs(Math.sin(i * 2.1)) * 10 * dustT;
      ctx.beginPath();
      ctx.arc(rumbleBozollokSkeleton.x + dx, rumbleBozollokSkeleton.groundY + dy, 3 + dustT * 4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}

function drawGourmandRumble(loseFighter, winFighter) {
  ctx.save();
  const panX = rumbleGourmandPanX;
  const panY = rumbleGourmandPanY;
  const plateX = rumbleGourmandPlateX || panX;

  // --- Giant Frying Pan ---
  if (rumbleGourmandPhase >= 0 && rumbleGourmandPhase <= 3) {
    const panAlpha = rumbleGourmandPhase === 3 ? Math.max(0, 1 - ((rumbleTimer - 220) / 50) * 2) : 1;
    ctx.globalAlpha = panAlpha;

    // Pan handle
    ctx.fillStyle = '#4a3520';
    ctx.save();
    ctx.translate(panX + 100, panY - 10);
    ctx.rotate(-0.15);
    ctx.fillRect(0, -6, 80, 12);
    ctx.restore();

    // Pan body (large oval)
    ctx.fillStyle = '#3a3a3a';
    ctx.strokeStyle = '#555';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(panX, panY - 8, 100, 22, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Pan surface (hot)
    const grad = ctx.createRadialGradient(panX, panY - 8, 0, panX, panY - 8, 90);
    grad.addColorStop(0, 'rgba(200, 80, 20, 0.35)');
    grad.addColorStop(0.7, 'rgba(100, 40, 10, 0.2)');
    grad.addColorStop(1, 'rgba(50, 50, 50, 0)');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.ellipse(panX, panY - 8, 90, 18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Sizzle particles
    if (rumbleGourmandPhase === 2) {
      ctx.fillStyle = '#fff';
      for (let i = 0; i < 6; i++) {
        const sx = panX + Math.sin(Date.now() * 0.01 + i * 1.5) * 60;
        const sy = panY - 15 - Math.abs(Math.sin(Date.now() * 0.015 + i * 2.3)) * 15;
        ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.02 + i) * 0.2;
        ctx.beginPath();
        ctx.arc(sx, sy, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    ctx.globalAlpha = 1;
  }

  // --- Toppings falling / in pan ---
  for (const top of rumbleGourmandToppings) {
    ctx.save();
    ctx.translate(top.x, top.y);
    if (top.type === 'tomato') {
      ctx.fillStyle = '#e74c3c';
      ctx.beginPath(); ctx.arc(0, 0, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#c0392b';
      ctx.beginPath(); ctx.arc(1, -1, 2, 0, Math.PI * 2); ctx.fill();
    } else if (top.type === 'onion') {
      ctx.fillStyle = '#f1c40f';
      ctx.beginPath();
      ctx.ellipse(0, 0, 6, 3, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#d4ac0d'; ctx.lineWidth = 0.5;
      ctx.beginPath(); ctx.ellipse(0, 0, 4, 2, 0, 0, Math.PI * 2); ctx.stroke();
    } else if (top.type === 'pepper') {
      ctx.fillStyle = '#27ae60';
      ctx.fillRect(-3, -2, 6, 4);
      ctx.fillStyle = '#229954';
      ctx.fillRect(-2, -1, 4, 2);
    } else if (top.type === 'mushroom') {
      ctx.fillStyle = '#d4a574';
      ctx.beginPath(); ctx.arc(0, -2, 5, Math.PI, 0); ctx.fill();
      ctx.fillStyle = '#b8956a';
      ctx.fillRect(-2, -2, 4, 5);
    } else if (top.type === 'herb') {
      ctx.fillStyle = '#2ecc71';
      ctx.beginPath();
      ctx.moveTo(0, -4);
      ctx.bezierCurveTo(-4, -1, -3, 3, 0, 4);
      ctx.bezierCurveTo(3, 3, 4, -1, 0, -4);
      ctx.fill();
    }
    ctx.restore();
  }

  // --- Sauce drizzles ---
  for (const sauce of rumbleGourmandSauces) {
    ctx.save();
    ctx.strokeStyle = sauce.color;
    ctx.lineWidth = 2.5;
    ctx.globalAlpha = 0.7;
    ctx.beginPath();
    const len = sauce.drizzleT * 30;
    ctx.moveTo(sauce.x - len / 2, sauce.y - 5);
    ctx.bezierCurveTo(
      sauce.x - len / 4, sauce.y + 3,
      sauce.x + len / 4, sauce.y - 3,
      sauce.x + len / 2, sauce.y + 2
    );
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // --- Giant Plate (stays solid until swallow phase takes over) ---
  if (rumbleGourmandPhase >= 3 && rumbleGourmandPhase <= 5) {
    ctx.globalAlpha = 1;
    // Plate (large white oval)
    ctx.fillStyle = '#f5f5f0';
    ctx.strokeStyle = '#ccc';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(plateX, panY - 2, 110, 18, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    // Plate rim
    ctx.strokeStyle = '#ddd';
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.ellipse(plateX, panY - 2, 95, 14, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Ornate leaf on top
    if (rumbleGourmandLeafPlaced) {
      ctx.save();
      ctx.translate(plateX, panY - 14);
      // Tiny ornate leaf
      ctx.fillStyle = '#2ecc71';
      ctx.strokeStyle = '#1a9c54';
      ctx.lineWidth = 0.8;
      ctx.beginPath();
      ctx.moveTo(0, -5);
      ctx.bezierCurveTo(-5, -3, -5, 3, 0, 5);
      ctx.bezierCurveTo(5, 3, 5, -3, 0, -5);
      ctx.fill();
      ctx.stroke();
      // Leaf vein
      ctx.strokeStyle = '#1a9c54';
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(0, -4); ctx.lineTo(0, 4);
      ctx.stroke();
      ctx.restore();
    }
    ctx.globalAlpha = 1;
  }

  // --- Redraw opponent on top of pan AND plate (hidden from normal draw pass) ---
  const showLoser = rumbleGourmandPhase <= 5;
  if (showLoser) {
    loseFighter.draw(ctx);
  }

  // --- Tongue + swallow shared geometry ---
  // Mouth position: face is at roughly y - 52, mouth opens facing forward
  const mouthX = winFighter.x + winFighter.facing * 14;
  const mouthY = winFighter.y - 52;

  // --- Phase 5: Tongue extends to plate, scoops everything ---
  if (rumbleGourmandPhase === 5) {
    const t = rumbleGourmandTongueT;
    const tipX = mouthX + (plateX - mouthX) * t;
    const tipY = mouthY + (panY - 2 - mouthY) * t;

    ctx.save();
    // Tongue body — thick flat strip from mouth to tip
    ctx.fillStyle = '#d4596e';
    ctx.strokeStyle = '#b8405a';
    ctx.lineWidth = 1.5;
    const hw = 6; // half-width of tongue
    ctx.beginPath();
    ctx.moveTo(mouthX, mouthY - hw);
    ctx.lineTo(tipX, tipY - hw);
    ctx.arc(tipX, tipY, hw, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(mouthX, mouthY + hw);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  // --- Phase 6: Tongue retracts, carrying plate + opponent + toppings into mouth ---
  if (rumbleGourmandPhase === 6) {
    const t = rumbleGourmandSwallowT;
    // Everything slides from plate position toward the mouth and shrinks
    const carryX = plateX + (mouthX - plateX) * t;
    const carryY = (panY - 2) + (mouthY - (panY - 2)) * t;
    const scale = Math.max(0.05, 1 - t * 0.95);

    ctx.save();
    // Tongue retracting
    ctx.fillStyle = '#d4596e';
    ctx.strokeStyle = '#b8405a';
    ctx.lineWidth = 1.5;
    const hw = 6;
    ctx.beginPath();
    ctx.moveTo(mouthX, mouthY - hw);
    ctx.lineTo(carryX, carryY - hw * scale);
    ctx.arc(carryX, carryY, hw * scale, -Math.PI / 2, Math.PI / 2);
    ctx.lineTo(mouthX, mouthY + hw);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Plate shrinking toward mouth
    if (scale > 0.08) {
      ctx.fillStyle = '#f5f5f0';
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 2 * scale;
      ctx.beginPath();
      ctx.ellipse(carryX, carryY, 110 * scale, 18 * scale, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Opponent shrinking with plate
      ctx.save();
      ctx.translate(carryX, carryY);
      ctx.scale(scale, scale);
      ctx.translate(-loseFighter.x, -loseFighter.y);
      loseFighter.draw(ctx);
      ctx.restore();

      // Leaf on top
      if (rumbleGourmandLeafPlaced) {
        ctx.fillStyle = '#2ecc71';
        ctx.beginPath();
        ctx.moveTo(carryX, carryY - 5 * scale);
        ctx.bezierCurveTo(carryX - 4 * scale, carryY - 3 * scale, carryX - 4 * scale, carryY + 3 * scale, carryX, carryY + 5 * scale);
        ctx.bezierCurveTo(carryX + 4 * scale, carryY + 3 * scale, carryX + 4 * scale, carryY - 3 * scale, carryX, carryY - 5 * scale);
        ctx.fill();
      }
    }
    ctx.restore();
  }

  // --- Satisfied Gourmand in hold phase (no extra drawing needed) ---

  ctx.restore();
}

function drawBatschRumble(loseFighter, winFighter) {
  ctx.save();

  // --- Motion blur trail ---
  for (const t of rumbleBatschTrail) {
    if (t.alpha < 0.05) continue;
    ctx.globalAlpha = t.alpha * 0.4;
    ctx.fillStyle = '#5a7a3a';
    ctx.beginPath();
    ctx.ellipse(t.x, t.y - 8, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // --- Spinning shell (phases 1-2, and slowing in 3) ---
  if (rumbleBatschPhase >= 1 && rumbleBatschPhase <= 3 && rumbleBatschSpinSpeed > 0) {
    ctx.save();
    ctx.translate(rumbleBatschShellX, rumbleBatschShellY - 8);
    ctx.rotate(rumbleBatschSpinAngle);

    // Shell dome
    ctx.fillStyle = '#5a7a3a';
    ctx.strokeStyle = '#3a5a1a';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.ellipse(0, 0, 22, 14, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Shell segments
    ctx.strokeStyle = '#3a5a1a';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(-8, -12); ctx.lineTo(-8, 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(8, -12); ctx.lineTo(8, 12); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(-20, -2); ctx.lineTo(20, -2); ctx.stroke();

    // Speed lines when moving fast
    if (rumbleBatschPhase === 2) {
      const speed = Math.sqrt(rumbleBatschShellVx * rumbleBatschShellVx + rumbleBatschShellVy * rumbleBatschShellVy);
      if (speed > 8) {
        ctx.strokeStyle = 'rgba(255, 255, 200, 0.4)';
        ctx.lineWidth = 1;
        for (let i = 0; i < 4; i++) {
          const angle = (i / 4) * Math.PI * 2;
          const r = 24 + Math.random() * 8;
          ctx.beginPath();
          ctx.moveTo(Math.cos(angle) * 22, Math.sin(angle) * 14);
          ctx.lineTo(Math.cos(angle) * r, Math.sin(angle) * (r * 0.6));
          ctx.stroke();
        }
      }
    }

    ctx.restore();
  }

  // --- Impact sparks ---
  for (const s of rumbleBatschSparks) {
    ctx.save();
    const sparkAlpha = s.life / 20;
    ctx.globalAlpha = sparkAlpha;
    // Yellow-orange sparks
    const r = 255;
    const g = Math.floor(150 + Math.random() * 105);
    ctx.fillStyle = `rgb(${r}, ${g}, 0)`;
    ctx.beginPath();
    ctx.arc(s.x, s.y, 1.5 + Math.random(), 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // --- "Look up" indicator during pop-out / hold phase ---
  if (rumbleBatschPhase === 3 || rumbleBatschPhase === 4) {
    const t = rumbleBatschPhase === 3 ? Math.min(1, (rumbleTimer - 420) / 30) : 1;
    if (t > 0.5) {
      ctx.globalAlpha = 0.4;
      ctx.fillStyle = '#c4a55a';
      for (let i = 0; i < 3; i++) {
        const dotY = winFighter.y - 65 - i * 8 - Math.sin(Date.now() * 0.003 + i) * 3;
        ctx.beginPath();
        ctx.arc(winFighter.x, dotY, 2 - i * 0.4, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }
  }

  ctx.restore();
}

