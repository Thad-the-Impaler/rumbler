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



function drawPaletapRumble(loseFighter, winFighter) {
  const loserChar = winner === 'player' ? selectedCPU : selectedPlayer;

  // Phase 2: Opponent vibrates — jitter their position
  if (rumblePaletapPhase === 2 && !rumbleLoserHidden) {
    const vib = rumblePaletapVibrate;
    loseFighter.x += (Math.random() - 0.5) * vib;
  }

  // Phase 3-4: Draw disassembled body parts
  if (rumblePaletapPhase >= 3 && rumblePaletapParts.length > 0) {
    ctx.save();
    for (const part of rumblePaletapParts) {
      ctx.save();
      ctx.translate(part.x, part.y);
      ctx.rotate(part.rot);

      ctx.fillStyle = part.color;
      ctx.strokeStyle = loserChar.outline;
      ctx.lineWidth = 1.5;

      switch (part.type) {
        case 'head':
          ctx.beginPath();
          ctx.arc(0, 0, part.size, 0, Math.PI * 2);
          ctx.fill();
          ctx.stroke();
          // Eyes (X marks)
          ctx.strokeStyle = loserChar.outline;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(-5, -3); ctx.lineTo(-1, 1);
          ctx.moveTo(-1, -3); ctx.lineTo(-5, 1);
          ctx.stroke();
          ctx.beginPath();
          ctx.moveTo(5, -3); ctx.lineTo(1, 1);
          ctx.moveTo(1, -3); ctx.lineTo(5, 1);
          ctx.stroke();
          break;
        case 'torso':
          ctx.beginPath();
          ctx.roundRect(-part.size, -part.size * 1.2, part.size * 2, part.size * 2.4, 4);
          ctx.fill();
          ctx.stroke();
          // Chest accent
          ctx.fillStyle = loserChar.accent;
          ctx.beginPath();
          ctx.roundRect(-part.size * 0.6, -part.size * 0.6, part.size * 1.2, part.size * 1.5, 2);
          ctx.fill();
          break;
        case 'armL':
        case 'armR':
          ctx.beginPath();
          ctx.roundRect(-3, -part.size, 6, part.size * 2, 3);
          ctx.fill();
          ctx.stroke();
          break;
        case 'legL':
        case 'legR':
          ctx.beginPath();
          ctx.roundRect(-4, -part.size, 8, part.size * 2, 3);
          ctx.fill();
          ctx.stroke();
          break;
      }
      ctx.restore();
    }
    ctx.restore();
  }

}


function drawMatadorRumble(loseFighter, winFighter) {
  const f = winFighter.facing;
  const groundY = loseFighter.groundY;

  // Red cape held by Matador (phases 0-1)
  if (rumbleMatadorPhase <= 1) {
    ctx.save();
    const capeX = winFighter.x + f * 20;
    const capeY = winFighter.y - 40;
    const wave = Math.sin(Date.now() * 0.006) * 5;
    // Cape fabric
    ctx.fillStyle = '#cc0000';
    ctx.beginPath();
    ctx.moveTo(capeX, capeY - 10);
    ctx.quadraticCurveTo(capeX + f * (25 + wave), capeY + 10, capeX + f * (20 + wave * 0.5), capeY + 45);
    ctx.lineTo(capeX + f * (5 + wave * 0.3), capeY + 48);
    ctx.quadraticCurveTo(capeX + f * 10, capeY + 20, capeX, capeY - 10);
    ctx.closePath();
    ctx.fill();
    // Cape edge
    ctx.strokeStyle = '#880000';
    ctx.lineWidth = 1.5;
    ctx.stroke();
    // Stick
    ctx.strokeStyle = '#8B6914';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(winFighter.x + f * 15, winFighter.y - 35);
    ctx.lineTo(capeX, capeY - 12);
    ctx.stroke();
    ctx.restore();
  }

  // Bull
  if (rumbleMatadorPhase >= 1 && rumbleMatadorPhase <= 3) {
    const bx = rumbleMatadorBullX;
    const by = groundY;
    const bullDir = f; // bull charges in same direction as matador faces
    const bobY = Math.sin(Date.now() * 0.02) * 3;

    ctx.save();
    ctx.translate(bx, by + bobY);
    ctx.scale(-bullDir, 1); // flip based on direction

    // Body (large, dark)
    ctx.fillStyle = '#2a1a0a';
    ctx.beginPath();
    ctx.ellipse(0, -30, 45, 25, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#1a0a00';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Head (lower, more forward)
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath();
    ctx.ellipse(40, -25, 18, 16, 0.2, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Horns
    ctx.strokeStyle = '#d4c4a0';
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(48, -35);
    ctx.quadraticCurveTo(60, -50, 55, -55);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(48, -18);
    ctx.quadraticCurveTo(60, -5, 55, -2);
    ctx.stroke();

    // Eye (angry red)
    ctx.fillStyle = '#ff2222';
    ctx.beginPath();
    ctx.arc(50, -27, 3, 0, Math.PI * 2);
    ctx.fill();

    // Nostrils (steam)
    ctx.fillStyle = '#1a0a00';
    ctx.beginPath();
    ctx.ellipse(56, -22, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(56, -18, 2, 1.5, 0, 0, Math.PI * 2);
    ctx.fill();

    // Legs (animated gallop)
    const gallop = Date.now() * 0.02;
    ctx.strokeStyle = '#2a1a0a';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    // Front legs
    ctx.beginPath();
    ctx.moveTo(25, -10);
    ctx.lineTo(25 + Math.sin(gallop) * 10, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(30, -10);
    ctx.lineTo(30 + Math.sin(gallop + Math.PI) * 10, 0);
    ctx.stroke();
    // Back legs
    ctx.beginPath();
    ctx.moveTo(-25, -10);
    ctx.lineTo(-25 + Math.sin(gallop + Math.PI * 0.5) * 10, 0);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(-30, -10);
    ctx.lineTo(-30 + Math.sin(gallop + Math.PI * 1.5) * 10, 0);
    ctx.stroke();

    // Tail
    ctx.strokeStyle = '#2a1a0a';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-42, -30);
    ctx.quadraticCurveTo(-55, -40 + Math.sin(Date.now() * 0.01) * 5, -50, -50);
    ctx.stroke();
    // Tail tuft
    ctx.fillStyle = '#1a0a00';
    ctx.beginPath();
    ctx.arc(-50, -50, 4, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Dust particles
  for (const d of rumbleMatadorDust) {
    ctx.save();
    ctx.globalAlpha = d.timer / 25;
    ctx.fillStyle = '#aa9977';
    ctx.beginPath();
    ctx.arc(d.x, d.y, 3 + (1 - d.timer / 25) * 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Screen shake dust on trample
  if (rumbleMatadorPhase === 2 && rumbleLoserHidden) {
    ctx.save();
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#aa9977';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, groundY, 30, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}


function drawKillaWattRumble(loseFighter, winFighter) {
  // Blue lightning bolts
  if (rumbleKillaWattBolts.length > 0) {
    ctx.save();
    const flicker = rumbleKillaWattPhase <= 1 ? (0.6 + Math.sin(Date.now() * 0.03) * 0.3) : 0.3;
    ctx.globalAlpha = flicker;

    for (const bolt of rumbleKillaWattBolts) {
      // Main bolt
      ctx.strokeStyle = '#4488ff';
      ctx.lineWidth = 4;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(bolt[0].x, bolt[0].y);
      for (let s = 1; s < bolt.length; s++) {
        ctx.lineTo(bolt[s].x, bolt[s].y);
      }
      ctx.stroke();
      // Bright core
      ctx.strokeStyle = '#aaccff';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(bolt[0].x, bolt[0].y);
      for (let s = 1; s < bolt.length; s++) {
        ctx.lineTo(bolt[s].x + (Math.random() - 0.5) * 3, bolt[s].y + (Math.random() - 0.5) * 3);
      }
      ctx.stroke();
      // White hot center
      ctx.strokeStyle = '#ffffff';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(bolt[0].x, bolt[0].y);
      for (let s = 1; s < bolt.length; s++) {
        ctx.lineTo(bolt[s].x + (Math.random() - 0.5) * 2, bolt[s].y + (Math.random() - 0.5) * 2);
      }
      ctx.stroke();
    }

    // Ground flash where bolts hit
    ctx.fillStyle = '#4488ff';
    ctx.globalAlpha = flicker * 0.5;
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.groundY, 25, 8, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Electric glow around opponent during electrocution
  if (rumbleKillaWattPhase === 1) {
    ctx.save();
    ctx.globalAlpha = 0.3 + Math.sin(Date.now() * 0.02) * 0.15;
    ctx.fillStyle = '#4488ff';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.y - 30, 30, 40, 0, 0, Math.PI * 2);
    ctx.fill();
    // Sparks
    for (let i = 0; i < 4; i++) {
      const sx = loseFighter.x + (Math.random() - 0.5) * 40;
      const sy = loseFighter.y - 20 + (Math.random() - 0.5) * 50;
      ctx.fillStyle = '#aaccff';
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Skeleton (reuse Bozollok's skeleton draw)
  if (rumbleKillaWattSkeleton) {
    drawBozollokSkeleton(rumbleKillaWattSkeleton.x, rumbleKillaWattSkeleton.groundY, rumbleKillaWattSkeleton.collapseT);
  }
}


function drawBacktrackRumble(loseFighter, winFighter) {
  const f = winFighter.facing;

  // Rewind visual overlay
  if (rumbleBacktrackPhase === 0 || (rumbleBacktrackPhase === 1 && winFighter.btRewindEffect > 0)) {
    ctx.save();
    ctx.globalAlpha = 0.15 + Math.sin(Date.now() * 0.01) * 0.08;
    ctx.fillStyle = '#b44dff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Phase 0: draw loser at full size (rewind just started)
  if (rumbleBacktrackPhase === 0) {
    loseFighter.draw(ctx);
  }

  // Phase 1: draw opponent at shrinking scale
  if (rumbleBacktrackPhase === 1) {
    ctx.save();
    ctx.translate(loseFighter.x, loseFighter.y);
    ctx.scale(rumbleBacktrackShrink, rumbleBacktrackShrink);
    ctx.translate(-loseFighter.x, -loseFighter.y);
    loseFighter.draw(ctx);
    ctx.restore();
  }

  // Phases 2-3: baby form — tiny body, big wide-eyed head (until punted at phase 4)
  if (rumbleBacktrackPhase === 2 || (rumbleBacktrackPhase === 3 && rumbleBacktrackBabyVy === 0)) {
    const bx = loseFighter.x;
    const by = loseFighter.y;
    const loserChar = (winner === 'player' ? selectedCPU : selectedPlayer);
    const babyColor = loserChar.color;
    const babyAccent = loserChar.accent;
    const babyOutline = loserChar.outline;

    ctx.save();
    ctx.translate(bx, by);

    // Tiny body
    ctx.fillStyle = babyColor;
    ctx.strokeStyle = babyOutline;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.roundRect(-6, -18, 12, 15, 3);
    ctx.fill(); ctx.stroke();

    // Tiny legs
    ctx.strokeStyle = babyColor;
    ctx.lineWidth = 3;
    ctx.lineCap = 'round';
    ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(-4, 0); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(3, -3); ctx.lineTo(4, 0); ctx.stroke();

    // Tiny arms
    ctx.beginPath(); ctx.moveTo(-6, -14); ctx.lineTo(-10, -8); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(6, -14); ctx.lineTo(10, -8); ctx.stroke();

    // Big baby head
    ctx.fillStyle = babyAccent;
    ctx.strokeStyle = babyOutline;
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.arc(0, -32, 14, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();

    // Wide baby eyes
    ctx.fillStyle = babyOutline;
    ctx.beginPath(); ctx.arc(-5, -34, 4, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(5, -34, 4, 0, Math.PI * 2); ctx.fill();
    // Big white pupils (wide-eyed look)
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(-4, -35, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, -35, 2.5, 0, Math.PI * 2); ctx.fill();
    // Tiny black pupils
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(-4, -35, 1, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(6, -35, 1, 0, Math.PI * 2); ctx.fill();

    // Little open mouth (surprised)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(0, -27, 2.5, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  // Flying baby (phase 4)
  if (rumbleBacktrackPhase >= 4 && rumbleBacktrackPhase <= 5) {
    const bx = rumbleBacktrackBabyX;
    const by = rumbleBacktrackBabyY;
    if (by > -50) { // still visible
      const loserChar = (winner === 'player' ? selectedCPU : selectedPlayer);
      const babyColor = loserChar.color;
      const babyAccent = loserChar.accent;
      const babyOutline = loserChar.outline;
      const spinAngle = Date.now() * 0.02;

      ctx.save();
      ctx.translate(bx, by);
      ctx.rotate(spinAngle);
      ctx.scale(0.4, 0.4); // tiny

      // Body
      ctx.fillStyle = babyColor;
      ctx.strokeStyle = babyOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(-6, -18, 12, 15, 3);
      ctx.fill(); ctx.stroke();

      // Legs flailing
      ctx.strokeStyle = babyColor;
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      const flail = Math.sin(Date.now() * 0.03);
      ctx.beginPath(); ctx.moveTo(-3, -3); ctx.lineTo(-4 + flail * 4, 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(3, -3); ctx.lineTo(4 - flail * 4, 4); ctx.stroke();

      // Arms flailing
      ctx.beginPath(); ctx.moveTo(-6, -14); ctx.lineTo(-12 + flail * 5, -6); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(6, -14); ctx.lineTo(12 - flail * 5, -6); ctx.stroke();

      // Big head
      ctx.fillStyle = babyAccent;
      ctx.strokeStyle = babyOutline;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, -32, 14, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();

      // Wide crying eyes
      ctx.fillStyle = babyOutline;
      ctx.beginPath(); ctx.arc(-5, -34, 4, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -34, 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-4, -35, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6, -35, 2.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(-4, -35, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(6, -35, 1, 0, Math.PI * 2); ctx.fill();

      // Open crying mouth
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(0, -26, 3, 4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  // Punt impact effect
  if (rumbleBacktrackPhase === 4 && rumbleTimer < 310) {
    ctx.save();
    ctx.globalAlpha = 0.6;
    ctx.font = 'bold 24px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('PUNT!', loseFighter.x, loseFighter.groundY - 20);
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}


function drawExorRumble(loseFighter, winFighter) {
  const f = winFighter.facing;
  const loserChar = (winner === 'player' ? selectedCPU : selectedPlayer);

  // Green energy around Exor's fists during punch
  if (rumbleExorPhase === 1) {
    ctx.save();
    const fistX = winFighter.x + f * 28;
    const fistY = winFighter.y - 45;
    ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.02) * 0.2;
    ctx.fillStyle = '#00ff44';
    ctx.beginPath();
    ctx.arc(fistX, fistY, 12 + Math.sin(Date.now() * 0.03) * 3, 0, Math.PI * 2);
    ctx.fill();
    // Energy sparks
    for (let i = 0; i < 5; i++) {
      const sx = fistX + (Math.random() - 0.5) * 20;
      const sy = fistY + (Math.random() - 0.5) * 20;
      ctx.fillStyle = '#88ffaa';
      ctx.beginPath();
      ctx.arc(sx, sy, 1 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Stone body (phases 2-4): opponent recolored to limestone, with crack lines
  if (rumbleExorPhase >= 2 && rumbleExorPhase <= 4 && !rumbleLoserHidden) {
    ctx.save();
    loseFighter.draw(ctx);
    // Crack lines on stone body
    ctx.strokeStyle = '#8a7a6a';
    ctx.lineWidth = 1.5;
    ctx.globalAlpha = 0.7;
    ctx.beginPath(); ctx.moveTo(loseFighter.x - 8, loseFighter.y - 50); ctx.lineTo(loseFighter.x + 5, loseFighter.y - 25); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(loseFighter.x + 10, loseFighter.y - 45); ctx.lineTo(loseFighter.x - 3, loseFighter.y - 15); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(loseFighter.x - 5, loseFighter.y - 35); ctx.lineTo(loseFighter.x + 8, loseFighter.y - 40); ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Crumbling dust (phase 4)
  if (rumbleExorPhase === 4) {
    ctx.save();
    const crT = rumbleExorCrumbleT;
    // Dust particles falling from where the body was
    for (let i = 0; i < 15; i++) {
      const dx = loseFighter.x + (Math.random() - 0.5) * 30;
      const dy = loseFighter.y - 50 + i * 4 + crT * 30;
      ctx.globalAlpha = Math.max(0, (1 - crT) * 0.6);
      ctx.fillStyle = i % 2 === 0 ? '#999' : '#777';
      ctx.beginPath();
      ctx.arc(dx + Math.sin(i + crT * 5) * 5, dy, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    // Dust cloud at base
    ctx.globalAlpha = Math.max(0, (1 - crT * 0.7) * 0.4);
    ctx.fillStyle = '#aaa';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.groundY, 25 + crT * 15, 6 + crT * 3, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Remaining dust pile (phase 5)
  if (rumbleExorPhase === 5) {
    ctx.save();
    ctx.globalAlpha = 0.5;
    ctx.fillStyle = '#888';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.groundY, 20, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Ghost/soul (phases 2-3)
  if (rumbleExorSoulAlpha > 0.01) {
    ctx.save();
    ctx.globalAlpha = rumbleExorSoulAlpha;
    const sx = rumbleExorSoulX;
    const sy = rumbleExorSoulY;
    const soulColor = loserChar.accent || '#aaa';

    // Ghostly body shape
    ctx.fillStyle = soulColor;
    // Head
    ctx.beginPath();
    ctx.arc(sx, sy - 16, 12, 0, Math.PI * 2);
    ctx.fill();
    // Body (tapers down, wispy)
    ctx.beginPath();
    ctx.moveTo(sx - 10, sy - 8);
    ctx.quadraticCurveTo(sx - 12, sy + 10, sx - 8, sy + 20);
    ctx.quadraticCurveTo(sx - 4, sy + 25, sx, sy + 22);
    ctx.quadraticCurveTo(sx + 4, sy + 25, sx + 8, sy + 20);
    ctx.quadraticCurveTo(sx + 12, sy + 10, sx + 10, sy - 8);
    ctx.closePath();
    ctx.fill();

    // Ghost eyes (wide, hollow)
    ctx.fillStyle = '#fff';
    ctx.beginPath(); ctx.arc(sx - 4, sy - 18, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + 4, sy - 18, 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000';
    ctx.beginPath(); ctx.arc(sx - 4, sy - 18, 1.5, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(sx + 4, sy - 18, 1.5, 0, Math.PI * 2); ctx.fill();

    // Open mouth (shocked expression)
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.ellipse(sx, sy - 10, 3, 4, 0, 0, Math.PI * 2);
    ctx.fill();

    // Wispy trail
    ctx.strokeStyle = soulColor;
    ctx.lineWidth = 3;
    ctx.globalAlpha = rumbleExorSoulAlpha * 0.4;
    ctx.beginPath();
    ctx.moveTo(sx, sy + 22);
    ctx.quadraticCurveTo(sx + Math.sin(Date.now() * 0.005) * 8, sy + 35, sx + Math.sin(Date.now() * 0.003) * 12, sy + 45);
    ctx.stroke();

    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Absorption glow on Exor (phase 3, late)
  if (rumbleExorPhase === 3) {
    const absT = Math.min(1, (rumbleTimer - 160) / 80);
    if (absT > 0.5) {
      ctx.save();
      ctx.globalAlpha = (absT - 0.5) * 0.6;
      ctx.fillStyle = '#00ff44';
      ctx.beginPath();
      ctx.arc(winFighter.x, winFighter.y - 30, 20 + absT * 10, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }
}


function drawBuckRumble(loseFighter, winFighter) {
  // Firework trails + heads
  for (const fw of rumbleBuckFireworks) {
    ctx.save();
    for (const t of fw.trail) {
      ctx.globalAlpha = t.t / 6 * 0.5;
      ctx.fillStyle = fw.color;
      ctx.beginPath();
      ctx.arc(t.x, t.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = fw.color;
    ctx.beginPath();
    ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.beginPath();
    ctx.arc(fw.x, fw.y, 1.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Explosion particles + text
  for (const e of rumbleBuckExplosions) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, e.timer / 15);
    if (e.text) {
      const scale = 1 + (1 - e.timer / 40) * 0.6;
      ctx.translate(e.x, e.y);
      ctx.scale(scale, scale);
      ctx.font = 'bold 16px Arial';
      ctx.textAlign = 'center';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeText(e.text, 0, 0);
      ctx.fillStyle = e.color;
      ctx.fillText(e.text, 0, 0);
    } else {
      ctx.fillStyle = e.color;
      ctx.beginPath();
      ctx.arc(e.x, e.y, 2 + (1 - e.timer / 25) * 3, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Bald eagles with American flag trails
  for (const eagle of rumbleBuckEagles) {
    if (eagle.x > 1020) continue;
    ctx.save();
    ctx.translate(eagle.x, eagle.y);

    // Eagle body
    ctx.fillStyle = '#3a2a1a';
    ctx.beginPath();
    ctx.ellipse(0, 0, 14, 7, 0, 0, Math.PI * 2);
    ctx.fill();
    // White head
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(10, -2, 6, 0, Math.PI * 2);
    ctx.fill();
    // Beak
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.moveTo(16, -2);
    ctx.lineTo(22, 0);
    ctx.lineTo(16, 2);
    ctx.closePath();
    ctx.fill();
    // Eye
    ctx.fillStyle = '#111';
    ctx.beginPath();
    ctx.arc(12, -3, 1.5, 0, Math.PI * 2);
    ctx.fill();
    // Wings (flapping)
    const wingFlap = Math.sin(Date.now() * 0.012 + eagle.x) * 0.5;
    ctx.fillStyle = '#4a3a2a';
    ctx.save();
    ctx.rotate(wingFlap);
    ctx.beginPath();
    ctx.moveTo(-5, -2);
    ctx.quadraticCurveTo(-10, -18, -20, -14);
    ctx.lineTo(-8, -2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
    ctx.save();
    ctx.rotate(-wingFlap);
    ctx.beginPath();
    ctx.moveTo(-5, 2);
    ctx.quadraticCurveTo(-10, 18, -20, 14);
    ctx.lineTo(-8, 2);
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.restore();

    // Flag trail — American flag using rectangles
    if (eagle.flagTrail.length > 5) {
      ctx.save();
      const flagLen = Math.min(eagle.flagTrail.length, 30);
      for (let fi = 0; fi < flagLen; fi++) {
        const fp = eagle.flagTrail[eagle.flagTrail.length - 1 - fi];
        const wave = Math.sin(Date.now() * 0.004 + fi * 0.3) * 3;
        const stripeH = 2;
        const flagW = 20;
        ctx.globalAlpha = 0.7 * (1 - fi / flagLen);
        // Red and white stripes
        for (let s = 0; s < 7; s++) {
          ctx.fillStyle = s % 2 === 0 ? '#cc0000' : '#ffffff';
          ctx.fillRect(fp.x - flagW / 2, fp.y + wave + s * stripeH - 7, flagW, stripeH);
        }
        // Blue canton
        ctx.fillStyle = '#000066';
        ctx.fillRect(fp.x - flagW / 2, fp.y + wave - 7, 8, 8);
        // Tiny stars
        ctx.fillStyle = '#fff';
        for (let si = 0; si < 4; si++) {
          ctx.fillRect(fp.x - flagW / 2 + 2 + (si % 2) * 4, fp.y + wave - 5 + Math.floor(si / 2) * 4, 1, 1);
        }
      }
      ctx.globalAlpha = 1;
      ctx.restore();
    }
  }

  // Flexing effect on Buck (phase 0) — pulsing glow
  if (rumbleBuckPhase === 0) {
    ctx.save();
    ctx.globalAlpha = 0.2 + Math.sin(Date.now() * 0.01) * 0.1;
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.arc(winFighter.x, winFighter.y - 30, 30 + Math.sin(Date.now() * 0.008) * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Bomber plane (phases 2-3)
  if (rumbleBuckPhase >= 2 && rumbleBuckBomberX < 1100) {
    ctx.save();
    ctx.translate(rumbleBuckBomberX, 35);
    // Fuselage
    ctx.fillStyle = '#556b2f';
    ctx.beginPath();
    ctx.ellipse(0, 0, 40, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    // Cockpit
    ctx.fillStyle = '#88aa55';
    ctx.beginPath();
    ctx.ellipse(30, -3, 10, 6, 0.2, 0, Math.PI * 2);
    ctx.fill();
    // Wings
    ctx.fillStyle = '#4a5a2a';
    ctx.fillRect(-25, -4, 50, 8);
    // Wing tips
    ctx.fillRect(-30, -2, 8, 4);
    ctx.fillRect(22, -2, 8, 4);
    // Tail
    ctx.fillStyle = '#556b2f';
    ctx.beginPath();
    ctx.moveTo(-38, -2);
    ctx.lineTo(-48, -12);
    ctx.lineTo(-42, -2);
    ctx.closePath();
    ctx.fill();
    // Star insignia
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 6px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('★', 0, 3);
    ctx.restore();
  }

  // Missile (falling)
  if (rumbleBuckMissileDropped && rumbleBuckMissileY < loseFighter.y && rumbleBuckPhase < 4) {
    ctx.save();
    ctx.translate(loseFighter.x, rumbleBuckMissileY);
    // Missile body
    ctx.fillStyle = '#444';
    ctx.beginPath();
    ctx.roundRect(-4, -12, 8, 24, 3);
    ctx.fill();
    // Nose cone
    ctx.fillStyle = '#cc0000';
    ctx.beginPath();
    ctx.moveTo(-3, -12);
    ctx.lineTo(0, -18);
    ctx.lineTo(3, -12);
    ctx.closePath();
    ctx.fill();
    // Fins
    ctx.fillStyle = '#555';
    ctx.fillRect(-7, 8, 4, 6);
    ctx.fillRect(3, 8, 4, 6);
    // Trail
    ctx.fillStyle = '#ffaa00';
    ctx.globalAlpha = 0.5;
    ctx.beginPath();
    ctx.moveTo(-3, 12);
    ctx.lineTo(0, 12 + 15 + Math.random() * 5);
    ctx.lineTo(3, 12);
    ctx.closePath();
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Impact crater glow (phase 3+)
  if (rumbleBuckPhase >= 3 && rumbleLoserHidden) {
    ctx.save();
    const glowT = rumbleBuckPhase === 3 ? 1 : Math.max(0, 1 - (rumbleTimer - 340) / 100);
    ctx.globalAlpha = glowT * 0.4;
    ctx.fillStyle = '#ff4400';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.groundY, 35, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffaa00';
    ctx.beginPath();
    ctx.ellipse(loseFighter.x, loseFighter.groundY, 20, 6, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}


function drawVorticeRumble(loseFighter, winFighter) {
  const centerX = winFighter.x;
  const centerY = winFighter.y - 50;

  // Tornado visual
  if (rumbleVorticeTornadoR > 5) {
    ctx.save();
    const t = Date.now() * 0.003;
    // Multiple swirling layers
    for (let layer = 0; layer < 4; layer++) {
      const layerR = rumbleVorticeTornadoR * (0.4 + layer * 0.2);
      const layerAlpha = 0.15 - layer * 0.02;
      ctx.globalAlpha = layerAlpha;
      ctx.strokeStyle = layer % 2 === 0 ? '#aaccff' : '#ddeeff';
      ctx.lineWidth = 3 - layer * 0.5;
      // Swirl rings at different heights
      for (let ring = 0; ring < 6; ring++) {
        const ringY = centerY + 80 - ring * 25;
        const ringR = layerR * (0.3 + ring * 0.14);
        const ringAngle = t * (2 + layer * 0.5) + ring * 0.8;
        ctx.beginPath();
        ctx.ellipse(centerX, ringY, ringR, ringR * 0.3, 0, ringAngle, ringAngle + Math.PI * 1.5);
        ctx.stroke();
      }
    }
    // Inner funnel (darker core)
    ctx.globalAlpha = 0.1;
    ctx.fillStyle = '#667799';
    ctx.beginPath();
    ctx.moveTo(centerX - rumbleVorticeTornadoR * 0.15, centerY - 40);
    ctx.lineTo(centerX - rumbleVorticeTornadoR * 0.5, centerY + 90);
    ctx.lineTo(centerX + rumbleVorticeTornadoR * 0.5, centerY + 90);
    ctx.lineTo(centerX + rumbleVorticeTornadoR * 0.15, centerY - 40);
    ctx.closePath();
    ctx.fill();
    // Wind particles
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = '#fff';
    for (let p = 0; p < 10; p++) {
      const pa = t * 3 + p * 0.63;
      const pr = rumbleVorticeTornadoR * (0.2 + (p % 5) * 0.15);
      const py = centerY + 80 - (p % 6) * 25;
      ctx.beginPath();
      ctx.arc(centerX + Math.cos(pa) * pr, py + Math.sin(pa) * 5, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Opponent being sucked in (phase 1)
  if (rumbleVorticePhase === 1) {
    // Opponent is still drawn normally by draw.js (not hidden yet)
  }

  // Opponent spinning in tornado (phase 2) — full size, using real draw
  if (rumbleVorticePhase === 2) {
    ctx.save();
    const orbX = centerX + Math.cos(rumbleVorticeAngle) * rumbleVorticeRadius;
    const orbY = centerY + Math.sin(rumbleVorticeAngle) * rumbleVorticeRadius * 0.4;
    // Position loser at orbit point and rotate them
    loseFighter.x = orbX;
    loseFighter.y = orbY + 30; // adjust so feet are at orbY
    ctx.translate(orbX, orbY);
    ctx.rotate(rumbleVorticeAngle * 2);
    ctx.translate(-orbX, -orbY);
    loseFighter.draw(ctx);
    ctx.restore();
  }

  // Opponent being flung (phase 3) — full size, tumbling
  if (rumbleVorticePhase === 3) {
    ctx.save();
    loseFighter.x = rumbleVorticeFlingX;
    loseFighter.y = rumbleVorticeFlingY;
    ctx.translate(rumbleVorticeFlingX, rumbleVorticeFlingY);
    ctx.rotate(rumbleTimer * 0.3);
    ctx.translate(-rumbleVorticeFlingX, -rumbleVorticeFlingY);
    loseFighter.draw(ctx);
    // Motion blur afterimages
    ctx.globalAlpha = 0.15;
    for (let t = 1; t <= 3; t++) {
      ctx.save();
      const trailX = rumbleVorticeFlingX - rumbleVorticeFlingVx * t * 3;
      const trailY = rumbleVorticeFlingY - rumbleVorticeFlingVy * t * 3;
      loseFighter.x = trailX;
      loseFighter.y = trailY;
      ctx.translate(trailX, trailY);
      ctx.rotate(rumbleTimer * 0.3 - t * 0.5);
      ctx.translate(-trailX, -trailY);
      loseFighter.draw(ctx);
      ctx.restore();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Screen crack (phases 4-5) — uses pre-generated crack data
  if (rumbleVorticePhase >= 4 && rumbleVorticeCracks.length > 0) {
    ctx.save();
    const cx = rumbleVorticeFlingX;
    const cy = rumbleVorticeFlingY;
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.globalAlpha = 0.9;
    for (const crack of rumbleVorticeCracks) {
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + crack.midX, cy + crack.midY);
      ctx.lineTo(cx + crack.endX, cy + crack.endY);
      ctx.stroke();
      if (crack.subX !== undefined) {
        ctx.beginPath();
        ctx.moveTo(cx + crack.midX, cy + crack.midY);
        ctx.lineTo(cx + crack.subX, cy + crack.subY);
        ctx.stroke();
      }
    }
    // Impact point
    ctx.fillStyle = '#000';
    ctx.beginPath();
    ctx.arc(cx, cy, 10, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(cx, cy, 15, 0, Math.PI * 2);
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Debris particles
  for (const d of rumbleVorticeDebris) {
    ctx.save();
    ctx.globalAlpha = d.timer / 40;
    ctx.fillStyle = '#ddd';
    ctx.beginPath();
    ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}


function drawXhaustRumble(loseFighter, winFighter) {
  // Oil drops (fountain + drips)
  for (const drop of rumbleXhaustOilDrops) {
    ctx.save();
    ctx.fillStyle = '#1a1a1a';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(drop.x, drop.y, drop.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Drenched effect — handled by recoloring the fighter's char properties

  // Oil trail on ground during walk
  if (rumbleXhaustPhase === 2) {
    ctx.save();
    ctx.fillStyle = '#111';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(winFighter.x, winFighter.y + 2, 15, 4, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Ignition sparks (phase 3)
  if (rumbleXhaustPhase === 3) {
    ctx.save();
    ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.02) * 0.3;
    ctx.fillStyle = '#ff6600';
    ctx.beginPath();
    ctx.arc(winFighter.x, winFighter.y - 30, 15 + Math.sin(Date.now() * 0.03) * 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Flames and smoke
  for (const fl of rumbleXhaustFlames) {
    ctx.save();
    ctx.globalAlpha = Math.min(1, fl.timer / 15);
    ctx.fillStyle = fl.color;
    ctx.beginPath();
    ctx.arc(fl.x, fl.y, fl.size, 0, Math.PI * 2);
    ctx.fill();
    // Bright core for fire particles
    if (fl.color !== '#333' && fl.size > 3) {
      ctx.fillStyle = '#ffee88';
      ctx.globalAlpha *= 0.5;
      ctx.beginPath();
      ctx.arc(fl.x, fl.y, fl.size * 0.4, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Explosion flash (phase 4, early frames)
  if (rumbleXhaustPhase === 4 && rumbleTimer < 210) {
    ctx.save();
    ctx.globalAlpha = Math.max(0, 0.5 - (rumbleTimer - 200) * 0.05);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Scorch mark on ground (phases 4-5)
  if (rumbleXhaustPhase >= 4) {
    ctx.save();
    const cx = (loseFighter.x + (winFighter.x > 0 ? winFighter.x : loseFighter.x)) / 2;
    // If winner is hidden (x=-200), use loser position
    const scorchX = winFighter.x < 0 ? loseFighter.x : cx;
    ctx.fillStyle = '#111';
    ctx.globalAlpha = 0.6;
    ctx.beginPath();
    ctx.ellipse(scorchX, loseFighter.groundY, 50, 12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#332200';
    ctx.globalAlpha = 0.3;
    ctx.beginPath();
    ctx.ellipse(scorchX, loseFighter.groundY, 35, 8, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }
}

function drawKavakRumble(loseFighter, winFighter) {
  const groundY = loseFighter.groundY;
  // Use the slam direction stored from when the rumble started, since Kavak turns around afterward.
  // While he's still grabbing/punching/slamming (phases 1-6), his facing matches the slam dir.
  // After (phase 7) he flips, so use the opposite of his current facing for the "slam side" reference.
  const phase = rumbleKavakPhase;
  const slamDir = phase >= 7 && rumbleTimer >= 224 ? -winFighter.facing : winFighter.facing;
  const winColor = winFighter.char ? winFighter.char.color : '#2a2a2e';
  const winOutline = winFighter.char ? winFighter.char.outline : '#0f0f12';
  const winAccent = winFighter.char ? winFighter.char.accent : '#5a4a3a';

  ctx.save();

  // Helper: stroke a quadratic-curve arm (outline + colored fill) for a natural bent look
  function drawBentArm(sx, sy, ex, ey, cx, cy, mainColor) {
    ctx.lineCap = 'round';
    ctx.strokeStyle = winOutline;
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
    ctx.strokeStyle = mainColor;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.quadraticCurveTo(cx, cy, ex, ey);
    ctx.stroke();
  }

  // Grab arm — bent, from Kavak's front shoulder to the opponent's throat (phases 1-5)
  if (rumbleActive && phase >= 1 && phase <= 5) {
    const dir = slamDir;
    const shoulderX = winFighter.x + dir * 6;
    const shoulderY = winFighter.y - 36;             // proper shoulder height
    const neckX = loseFighter.x - dir * 6;
    const neckY = phase === 5 ? loseFighter.y - 28 : loseFighter.y - 50;
    // Elbow ~60% along, slightly raised — gives a natural "grip held aloft" arc
    const elbowX = shoulderX + (neckX - shoulderX) * 0.55 + dir * 4;
    const elbowY = (shoulderY + neckY) * 0.5 - 14;
    drawBentArm(shoulderX, shoulderY, neckX, neckY, elbowX, elbowY, winColor);
    // Fist gripping the throat
    ctx.fillStyle = winAccent;
    ctx.strokeStyle = winOutline;
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(neckX, neckY, 6, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    // Knuckle ridges
    ctx.strokeStyle = winOutline;
    ctx.lineWidth = 0.8;
    for (let k = 0; k < 3; k++) {
      ctx.beginPath();
      ctx.moveTo(neckX - 3 + k * 2, neckY - 4);
      ctx.lineTo(neckX - 3 + k * 2, neckY - 1);
      ctx.stroke();
    }
  }

  // Back arm punching — phases 3 and 4 (two punches to the face)
  if (rumbleActive && (phase === 3 || phase === 4)) {
    const dir = slamDir;
    const t = rumbleKavakPunchT;
    let reach = 0;
    if (t < 0.5) reach = t / 0.5;
    else reach = 1 - (t - 0.5) / 0.5;
    // Back-shoulder origin at proper shoulder height
    const shoulderX = winFighter.x - dir * 6;
    const shoulderY = winFighter.y - 36;
    // Target: front of opponent's face (head bottom-front area)
    const faceX = loseFighter.x - dir * 14;
    const faceY = loseFighter.y - 56;
    // Arm bends forward over Kavak's body to swing toward opponent
    const bendForwardX = winFighter.x + dir * 18;
    const bendForwardY = winFighter.y - 48;
    // Interpolate the fist along a bent path: shoulder → bend → face
    const fistX = (1 - reach) * shoulderX + reach * faceX;
    const fistY = (1 - reach) * shoulderY + reach * faceY;
    // For visual: draw arm as quadratic from shoulder through bend to fist
    // Use a control point that's between bend and fist depending on reach
    const cpX = bendForwardX * (1 - reach * 0.5) + fistX * (reach * 0.5);
    const cpY = bendForwardY * (1 - reach * 0.5) + fistY * (reach * 0.5);
    ctx.lineCap = 'round';
    ctx.strokeStyle = winOutline;
    ctx.lineWidth = 7;
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.quadraticCurveTo(cpX, cpY, fistX, fistY);
    ctx.stroke();
    ctx.strokeStyle = winColor;
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.moveTo(shoulderX, shoulderY);
    ctx.quadraticCurveTo(cpX, cpY, fistX, fistY);
    ctx.stroke();
    // Fist
    ctx.fillStyle = winAccent;
    ctx.strokeStyle = winOutline;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(fistX, fistY, 6, 0, Math.PI * 2);
    ctx.fill(); ctx.stroke();
    // Impact starburst at peak reach
    if (reach > 0.85) {
      ctx.strokeStyle = '#ffd54a';
      ctx.lineWidth = 2;
      for (let s = 0; s < 6; s++) {
        const a = (s / 6) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(faceX, faceY);
        ctx.lineTo(faceX + Math.cos(a) * 12, faceY + Math.sin(a) * 12);
        ctx.stroke();
      }
    }
  }

  // Dust particles
  if (rumbleKavakDust && rumbleKavakDust.length > 0) {
    for (const d of rumbleKavakDust) {
      ctx.globalAlpha = d.alpha;
      ctx.fillStyle = d.color;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Stuck pose — use the actual fighter's draw method, flipped + half-buried + clipped
  if (rumbleKavakStuck) {
    const sx = rumbleKavakSlamX;
    const dir = slamDir;

    // Crater / cracks
    ctx.fillStyle = '#5a4830';
    ctx.beginPath();
    ctx.ellipse(sx, groundY, 40, 9, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#3a2810';
    ctx.beginPath();
    ctx.ellipse(sx, groundY, 24, 5, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#3a2810';
    ctx.lineWidth = 2;
    for (let i = 0; i < 9; i++) {
      const a = (i / 9) * Math.PI * 2 + 0.3;
      const len = 22 + Math.sin(i * 2.7) * 14;
      ctx.beginPath();
      ctx.moveTo(sx + Math.cos(a) * 14, groundY + Math.sin(a) * 4);
      ctx.lineTo(sx + Math.cos(a) * len, groundY + Math.sin(a) * len * 0.25);
      ctx.stroke();
    }

    // Draw the actual loser fighter upside-down, with everything below the ground line clipped away
    const loserF = loseFighter;
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, 960, groundY + 1);
    ctx.clip();
    const sX = loserF.x, sY = loserF.y, sRot = loserF._rumbleRotation, sFacing = loserF.facing;
    loserF.x = sx;
    loserF.y = groundY - 30;       // origin 30 px above ground; rotation flips body so feet stick up
    loserF._rumbleRotation = Math.PI - dir * 0.15;
    loserF.draw(ctx);
    loserF.x = sX; loserF.y = sY; loserF._rumbleRotation = sRot; loserF.facing = sFacing;
    ctx.restore();
  }

  ctx.restore();
}

function drawAetherRumble(loseFighter, winFighter) {
  const groundY = loseFighter.groundY;
  const dir = winFighter.facing;
  const phase = rumbleAetherPhase;

  ctx.save();

  // Smoke (drawn behind chains/laser so it forms an atmospheric backdrop)
  if (rumbleAetherSmoke && rumbleAetherSmoke.length > 0) {
    for (const sm of rumbleAetherSmoke) {
      ctx.globalAlpha = sm.alpha;
      ctx.fillStyle = '#3a3a3a';
      ctx.beginPath();
      ctx.arc(sm.x, sm.y, sm.size, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Golden chains — two chains arcing from the ground up to opponent's wrists
  if (rumbleAetherChainT > 0 && phase < 4) {
    const opX = loseFighter.x;
    const opY = loseFighter.y;
    const wristY = opY - 36;                  // wrist height (mid-body)
    const sides = [-1, 1];
    for (const s of sides) {
      const groundAnchorX = opX + s * 36;
      const wristX = opX + s * 18;
      const t = Math.min(1, rumbleAetherChainT * (s === -1 ? 1 : 0.95)); // slight stagger
      // Animated emergence: chain length scales with t
      const tipX = groundAnchorX + (wristX - groundAnchorX) * t;
      const tipY = groundY + (wristY - groundY) * t;

      // Draw chain as a series of links along the path
      const dx = tipX - groundAnchorX;
      const dy = tipY - groundY;
      const len = Math.sqrt(dx * dx + dy * dy);
      const linkSpacing = 6;
      const linkCount = Math.max(2, Math.floor(len / linkSpacing));
      const angle = Math.atan2(dy, dx);
      // Outer chain glow
      ctx.strokeStyle = '#ffaa22';
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(groundAnchorX, groundY);
      ctx.lineTo(tipX, tipY);
      ctx.stroke();
      // Chain links — alternating orientation
      for (let i = 0; i <= linkCount; i++) {
        const lt = i / linkCount;
        const lx = groundAnchorX + dx * lt;
        const ly = groundY + dy * lt;
        ctx.save();
        ctx.translate(lx, ly);
        ctx.rotate(angle + (i % 2 === 0 ? 0 : Math.PI / 2));
        ctx.fillStyle = '#ffd54a';
        ctx.strokeStyle = '#8a5a10';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.ellipse(0, 0, 4, 2.5, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Highlight
        ctx.fillStyle = '#fff8d8';
        ctx.beginPath();
        ctx.ellipse(-1, -0.6, 1.2, 0.6, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      // Manacle / cuff at the wrist end
      if (t >= 0.95) {
        ctx.fillStyle = '#ffd54a';
        ctx.strokeStyle = '#8a5a10';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.arc(tipX, tipY, 5, 0, Math.PI * 2);
        ctx.fill(); ctx.stroke();
        ctx.fillStyle = '#3a2810';
        ctx.beginPath();
        ctx.arc(tipX, tipY, 2, 0, Math.PI * 2);
        ctx.fill();
      }
      // Soil mound at base of chain
      if (rumbleAetherChainT > 0.1) {
        ctx.fillStyle = '#3a2810';
        ctx.globalAlpha = 0.7;
        ctx.beginPath();
        ctx.ellipse(groundAnchorX, groundY, 9, 3, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }
    }
  }

  // Charging orb in front of Aether (phases 1-2)
  if (rumbleAetherLaserT > 0 && phase >= 1 && phase < 3) {
    const f = winFighter.facing;
    const orbX = winFighter.x + f * 28;
    const orbY = winFighter.centerY + 4;
    const orbR = 8 + rumbleAetherLaserT * 18;
    const pulse = 1 + Math.sin(Date.now() * 0.018) * 0.1;
    ctx.save();
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#ffe066';
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbR * pulse * 1.7, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.9;
    ctx.fillStyle = '#ffd84a';
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbR * pulse, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#fffce8';
    ctx.beginPath();
    ctx.arc(orbX, orbY, orbR * 0.5, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  // Massive laser beam during phases 2-3
  if (rumbleAetherLaserT > 0.05 && (phase === 2 || phase === 3)) {
    const f = winFighter.facing;
    const startX = winFighter.x + f * 26;
    const beamY = winFighter.centerY + 4;
    const endX = f === 1 ? 960 : 0;
    const thickness = 16 + rumbleAetherLaserT * 28;
    const flicker = 0.85 + Math.sin(rumbleTimer * 0.6) * 0.15;
    ctx.save();
    // Outer glow
    ctx.globalAlpha = 0.35 * rumbleAetherLaserT * flicker;
    ctx.fillStyle = '#ffaa22';
    ctx.fillRect(Math.min(startX, endX), beamY - thickness, Math.abs(endX - startX), thickness * 2);
    // Main beam
    ctx.globalAlpha = 0.95 * rumbleAetherLaserT;
    ctx.fillStyle = '#ffd84a';
    ctx.fillRect(Math.min(startX, endX), beamY - thickness * 0.55, Math.abs(endX - startX), thickness * 1.1);
    // Bright center
    ctx.globalAlpha = rumbleAetherLaserT;
    ctx.fillStyle = '#fffce8';
    ctx.fillRect(Math.min(startX, endX), beamY - thickness * 0.2, Math.abs(endX - startX), thickness * 0.4);
    ctx.restore();
  }

  // Sparks flying off the opponent from laser hits
  if (rumbleAetherSparks && rumbleAetherSparks.length > 0) {
    for (const sp of rumbleAetherSparks) {
      ctx.globalAlpha = sp.alpha;
      ctx.fillStyle = '#ffe066';
      ctx.beginPath();
      ctx.arc(sp.x, sp.y, 1.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  // Falling fireballs
  if (rumbleAetherFireballs && rumbleAetherFireballs.length > 0) {
    for (const fb of rumbleAetherFireballs) {
      // Trail
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = '#ff6622';
      ctx.beginPath();
      ctx.ellipse(fb.x, fb.y - fb.size * 1.2, fb.size * 0.5, fb.size * 1.4, 0, 0, Math.PI * 2);
      ctx.fill();
      // Core fireball
      ctx.globalAlpha = 1;
      ctx.fillStyle = '#ff8833';
      ctx.beginPath();
      ctx.arc(fb.x, fb.y, fb.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffd54a';
      ctx.beginPath();
      ctx.arc(fb.x, fb.y, fb.size * 0.55, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#fffce8';
      ctx.beginPath();
      ctx.arc(fb.x - fb.size * 0.2, fb.y - fb.size * 0.2, fb.size * 0.25, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Fireball impact bursts
  if (rumbleAetherImpacts && rumbleAetherImpacts.length > 0) {
    for (const im of rumbleAetherImpacts) {
      const a = im.timer / 18;
      ctx.globalAlpha = a;
      // Outer ring
      ctx.fillStyle = '#ff6622';
      ctx.beginPath();
      ctx.arc(im.x, im.y, im.size * (1.5 - a), 0, Math.PI * 2);
      ctx.fill();
      // Inner glow
      ctx.fillStyle = '#ffd54a';
      ctx.beginPath();
      ctx.arc(im.x, im.y, im.size * (1 - a) * 0.8, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
}
