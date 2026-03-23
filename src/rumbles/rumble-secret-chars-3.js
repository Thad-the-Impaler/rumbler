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

