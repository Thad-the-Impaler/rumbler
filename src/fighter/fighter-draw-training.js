Fighter.prototype.drawBag = function(ctx) {
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
};


Fighter.prototype.drawMannequin = function(ctx) {
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
};



Fighter.prototype.drawPrinter = function(ctx) {
  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const bodyColor = flash ? '#fff' : '#dddddd';
  const darkColor = flash ? '#eee' : '#aaaaaa';
  const outline = flash ? '#ccc' : '#777777';

  ctx.save();
  ctx.translate(this.x, this.y);

  const sway = (this.state === 'hitstun' || this.state === 'launched') ? Math.sin(this.stateTimer * 0.5) * 4 : 0;

  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 35, 8, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.save();
  ctx.translate(sway, 0);

  // Main body
  ctx.fillStyle = bodyColor;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-35, -70, 70, 55, 4);
  ctx.fill();
  ctx.stroke();

  // Paper tray (top)
  ctx.fillStyle = darkColor;
  ctx.beginPath();
  ctx.roundRect(-30, -80, 60, 14, 3);
  ctx.fill();
  ctx.strokeStyle = outline;
  ctx.stroke();

  // Paper sticking out
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(-20, -92, 40, 16);
  ctx.strokeStyle = '#cccccc';
  ctx.lineWidth = 1;
  ctx.strokeRect(-20, -92, 40, 16);
  ctx.fillStyle = '#bbb';
  ctx.fillRect(-16, -89, 25, 2);
  ctx.fillRect(-16, -85, 18, 2);
  ctx.fillRect(-16, -81, 30, 2);

  // Output tray
  ctx.fillStyle = '#555';
  ctx.fillRect(-28, -18, 56, 5);

  // Base
  ctx.fillStyle = darkColor;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(-38, -15, 76, 15, 3);
  ctx.fill();
  ctx.stroke();

  // Buttons
  ctx.fillStyle = '#44aa44';
  ctx.beginPath();
  ctx.arc(20, -50, 4, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#aa4444';
  ctx.beginPath();
  ctx.arc(28, -50, 3, 0, Math.PI * 2);
  ctx.fill();

  // LCD
  ctx.fillStyle = '#113311';
  ctx.fillRect(8, -62, 24, 8);
  ctx.fillStyle = '#44ff44';
  ctx.font = '6px monospace';
  ctx.textAlign = 'left';
  const dmgLevel = testYourMightActive ? testYourMightDamage : 0;
  ctx.fillText(dmgLevel >= 300 ? 'ERROR' : dmgLevel >= 100 ? 'HELP!' : 'READY', 10, -56);

  // Damage overlays based on total damage dealt
  if (dmgLevel >= 50) {
    // Cracks
    ctx.strokeStyle = '#666';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(-15, -60);
    ctx.lineTo(-5, -48);
    ctx.lineTo(-12, -35);
    ctx.stroke();
  }
  if (dmgLevel >= 100) {
    // More cracks + dents
    ctx.strokeStyle = '#555';
    ctx.beginPath();
    ctx.moveTo(10, -68);
    ctx.lineTo(18, -55);
    ctx.lineTo(12, -40);
    ctx.lineTo(20, -30);
    ctx.stroke();
    // Dent
    ctx.fillStyle = '#999';
    ctx.beginPath();
    ctx.ellipse(-20, -50, 8, 5, 0.3, 0, Math.PI * 2);
    ctx.fill();
  }
  if (dmgLevel >= 200) {
    // Paper tray broken off (draw over it)
    ctx.fillStyle = darkColor;
    ctx.fillRect(-30, -80, 60, 14);
    // Smoke wisps
    const t = Date.now() * 0.003;
    ctx.globalAlpha = 0.4;
    ctx.fillStyle = '#888';
    for (let i = 0; i < 3; i++) {
      const sx = -10 + i * 12 + Math.sin(t + i * 2) * 5;
      const sy = -85 - Math.sin(t * 1.5 + i) * 8 - i * 6;
      ctx.beginPath();
      ctx.arc(sx, sy, 4 + i * 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }
  if (dmgLevel >= 300) {
    // LCD cracked (X over it)
    ctx.strokeStyle = '#ff0000';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(8, -62);
    ctx.lineTo(32, -54);
    ctx.moveTo(32, -62);
    ctx.lineTo(8, -54);
    ctx.stroke();
    // Buttons knocked off
    ctx.fillStyle = bodyColor;
    ctx.beginPath();
    ctx.arc(20, -50, 5, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(28, -50, 4, 0, Math.PI * 2);
    ctx.fill();
  }
  if (dmgLevel >= 400) {
    // Major structural damage — body splitting
    ctx.strokeStyle = '#444';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(-35, -45);
    ctx.lineTo(35, -45);
    ctx.stroke();
    // Sparks
    const sparkT = Date.now() * 0.01;
    ctx.fillStyle = '#ffff00';
    for (let i = 0; i < 4; i++) {
      const sx = -20 + Math.sin(sparkT + i * 1.7) * 25;
      const sy = -45 + Math.cos(sparkT * 1.3 + i) * 3;
      if (Math.sin(sparkT * 3 + i * 5) > 0) {
        ctx.beginPath();
        ctx.arc(sx, sy, 2, 0, Math.PI * 2);
        ctx.fill();
      }
    }
  }

  ctx.restore();

  // Hit effect
  if (this.hitEffect && this.hitEffect.timer > 0) {
    const t = this.hitEffect.timer / 10;
    ctx.globalAlpha = t;
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    const r = 15 + (1 - t) * 20;
    const cx = this.hitEffect.x - this.x;
    const cy = this.hitEffect.y - this.y;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + (1 - t) * 2;
      ctx.beginPath();
      ctx.moveTo(cx + Math.cos(angle) * r * 0.3, cy + Math.sin(angle) * r * 0.3);
      ctx.lineTo(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();
};

Fighter.prototype.drawBirdeaterLegs = function(ctx) {
  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const legColor = flash ? '#fff' : this.char.accent;
  const legDark = flash ? '#ddd' : this.char.outline;
  const facing = this.facing;
  const phase = this.birdeaterLegPhase;

  ctx.save();
  ctx.translate(this.x, this.y);

  // Wide shadow for legs
  ctx.fillStyle = 'rgba(0,0,0,0.35)';
  ctx.beginPath();
  ctx.ellipse(0, 2, 60, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  const bodyY = -75; // where body sits (matches birdeaterOffset)

  // 4 thick jointed crab legs — knees go UP, feet come DOWN sharp
  for (let side = -1; side <= 1; side += 2) {
    for (let pair = 0; pair < 2; pair++) {
      const hipX = side * (8 + pair * 14);
      const hipY = bodyY + 10;
      const walkOff = Math.sin(phase + pair * Math.PI + (side > 0 ? 0 : Math.PI * 0.5)) * 6;

      // Knee goes up and outward
      const kneeX = hipX + side * (35 + pair * 10);
      const kneeY = bodyY - 15 + walkOff;

      // Foot comes down to ground, sharp tip
      const footX = hipX + side * (50 + pair * 8);
      const footY = -2 + walkOff * 0.2;

      // Thick upper segment (hip to knee)
      ctx.strokeStyle = legColor;
      ctx.lineWidth = 10;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();
      // Dark outline on upper
      ctx.strokeStyle = legDark;
      ctx.lineWidth = 12;
      ctx.globalAlpha = 0.3;
      ctx.beginPath();
      ctx.moveTo(hipX, hipY);
      ctx.lineTo(kneeX, kneeY);
      ctx.stroke();
      ctx.globalAlpha = 1;

      // Thick lower segment (knee to foot) — tapers to sharp point
      ctx.fillStyle = legColor;
      ctx.beginPath();
      ctx.moveTo(kneeX - 5, kneeY);
      ctx.lineTo(kneeX + 5, kneeY);
      ctx.lineTo(footX + 1, footY);
      ctx.lineTo(footX - 1, footY);
      ctx.closePath();
      ctx.fill();
      // Outline
      ctx.strokeStyle = legDark;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Knee joint circle
      ctx.fillStyle = legDark;
      ctx.beginPath();
      ctx.arc(kneeX, kneeY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = legColor;
      ctx.beginPath();
      ctx.arc(kneeX, kneeY, 4, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Scorpion tail — thick, curling over the body from behind
  ctx.save();
  const tailBaseX = -facing * 10;
  const tailBaseY = bodyY + 5;

  // Tail animation
  let curlAngle = -1.3; // default: curled up and over
  let tailLength = 60;
  if (this.birdeaterTailStriking) {
    const t = 1 - this.birdeaterTailTimer / 35;
    if (t < 0.35) {
      curlAngle = -1.3 - t * 2; // wind up higher
      tailLength = 65;
    } else if (t < 0.55) {
      curlAngle = 0.4; // strike forward and down
      tailLength = 75;
    } else {
      curlAngle = -1.3 * Math.min(1, (t - 0.55) / 0.45); // return
    }
  }

  // Draw tail as thick segmented curve
  const segments = 6;
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const frac = i / segments;
    const angle = curlAngle * frac;
    const r = tailLength * frac;
    const px = tailBaseX + Math.cos(angle + Math.PI * 0.5) * r * -facing;
    const py = tailBaseY + Math.sin(angle + Math.PI * 0.5) * r;
    pts.push({ x: px, y: py });
  }

  // Thick tail body
  for (let i = 0; i < pts.length - 1; i++) {
    const thickness = 8 - i * 0.8; // tapers
    ctx.strokeStyle = legColor;
    ctx.lineWidth = thickness;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[i].x, pts[i].y);
    ctx.lineTo(pts[i + 1].x, pts[i + 1].y);
    ctx.stroke();
  }

  // Stinger — sharp triangle at tip
  const tip = pts[pts.length - 1];
  const prev = pts[pts.length - 2];
  const stingerDir = Math.atan2(tip.y - prev.y, tip.x - prev.x);
  const stingerLen = 14;
  ctx.fillStyle = '#cc0000';
  ctx.beginPath();
  ctx.moveTo(tip.x + Math.cos(stingerDir) * stingerLen, tip.y + Math.sin(stingerDir) * stingerLen);
  ctx.lineTo(tip.x + Math.cos(stingerDir + 0.5) * 5, tip.y + Math.sin(stingerDir + 0.5) * 5);
  ctx.lineTo(tip.x + Math.cos(stingerDir - 0.5) * 5, tip.y + Math.sin(stingerDir - 0.5) * 5);
  ctx.closePath();
  ctx.fill();
  // Dark edge on stinger
  ctx.strokeStyle = '#880000';
  ctx.lineWidth = 1.5;
  ctx.stroke();

  ctx.restore();
  ctx.restore();
};


Fighter.prototype.drawHangmanPieces = function(ctx) {
  const color = this.char.color;
  const accent = this.char.accent;
  const outline = this.char.outline;

  // Draw trails first (behind pieces)
  for (const piece of this.hangmanPieces) {
    if (piece.landed) continue;
    ctx.save();
    ctx.globalAlpha = 0.25;
    ctx.fillStyle = accent;
    ctx.beginPath();
    ctx.arc(piece.x - piece.vx * 0.5, piece.y - piece.vy * 0.5, piece.type === 'head' ? 10 : 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 0.1;
    ctx.beginPath();
    ctx.arc(piece.x - piece.vx, piece.y - piece.vy, piece.type === 'head' ? 7 : 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  for (const piece of this.hangmanPieces) {
    ctx.save();
    ctx.translate(piece.x, piece.y);

    // Spin while flying
    if (!piece.landed) {
      const spin = Date.now() * 0.012 + (piece.type === 'head' ? 0 : piece.type === 'torso' ? 1.5 : piece.type === 'leftArm' ? 3 : 4.5);
      ctx.rotate(Math.sin(spin) * 0.6);
    }

    const flash = piece.hitCooldown > 25;
    const c = flash ? '#fff' : color;
    const a = flash ? '#fff' : accent;
    const o = flash ? '#ccc' : outline;

    switch (piece.type) {
      case 'head':
        // Round head matching fighter style
        ctx.fillStyle = a;
        ctx.strokeStyle = o;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(0, 0, 16, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        // Eyes
        if (!piece.landed) {
          // Spiral dizzy eyes while flying
          ctx.strokeStyle = o;
          ctx.lineWidth = 2;
          const t = Date.now() * 0.015;
          for (let eye = -1; eye <= 1; eye += 2) {
            ctx.beginPath();
            for (let i = 0; i < 8; i++) {
              const a2 = t + i * 0.8;
              const r = 1 + i * 0.4;
              const px = eye * 5 + Math.cos(a2) * r;
              const py = -2 + Math.sin(a2) * r;
              i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
            }
            ctx.stroke();
          }
        } else {
          ctx.fillStyle = o;
          ctx.beginPath(); ctx.arc(-5, -2, 3, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(5, -2, 3, 0, Math.PI * 2); ctx.fill();
          ctx.fillStyle = '#fff';
          ctx.beginPath(); ctx.arc(-4, -3, 1.5, 0, Math.PI * 2); ctx.fill();
          ctx.beginPath(); ctx.arc(6, -3, 1.5, 0, Math.PI * 2); ctx.fill();
        }
        break;
      case 'torso':
        // Rectangular torso with chest accent
        ctx.fillStyle = c;
        ctx.strokeStyle = o;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.roundRect(-16, -20, 32, 40, 6);
        ctx.fill();
        ctx.stroke();
        // Chest detail
        ctx.fillStyle = a;
        ctx.beginPath();
        ctx.roundRect(-10, -12, 20, 20, 3);
        ctx.fill();
        break;
      case 'leftArm':
      case 'rightArm':
        // Arm segments (upper + lower with joint)
        ctx.strokeStyle = c;
        ctx.lineWidth = 7;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -12);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, 12);
        ctx.stroke();
        // Joint
        ctx.fillStyle = a;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        // Fist
        ctx.fillStyle = c;
        ctx.beginPath();
        ctx.arc(0, 14, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = o;
        ctx.lineWidth = 1;
        ctx.stroke();
        break;
      case 'leftLeg':
      case 'rightLeg':
        // Leg segments
        ctx.strokeStyle = c;
        ctx.lineWidth = 8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(0, -15);
        ctx.lineTo(0, 0);
        ctx.lineTo(0, 15);
        ctx.stroke();
        // Knee joint
        ctx.fillStyle = a;
        ctx.beginPath();
        ctx.arc(0, 0, 4, 0, Math.PI * 2);
        ctx.fill();
        // Foot
        ctx.fillStyle = c;
        ctx.strokeStyle = o;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(0, 17, 6, 4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        break;
    }
    ctx.restore();
  }
};


Fighter.prototype.drawHead = function(ctx) {
  const flash = this.flashTimer > 0 && this.flashTimer % 2 === 0;
  const color = flash ? '#fff' : this.char.accent;
  const outline = flash ? '#ccc' : this.char.outline;
  const f = this.facing;
  const radius = 40; // big head

  ctx.save();
  ctx.translate(this.x, this.y - radius);

  // Shadow on ground
  ctx.fillStyle = 'rgba(0,0,0,0.3)';
  ctx.beginPath();
  ctx.ellipse(0, radius, radius * 0.8, 10, 0, 0, Math.PI * 2);
  ctx.fill();

  // Rotation for rolling
  ctx.save();
  ctx.rotate(this.headRotation || 0);

  // Main head circle
  ctx.fillStyle = color;
  ctx.strokeStyle = outline;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  // Eyes (positioned relative to facing, but rotate with head)
  ctx.fillStyle = outline;
  ctx.beginPath(); ctx.arc(f * 8, -6, 8, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(f * 24, -6, 8, 0, Math.PI * 2); ctx.fill();
  // Eye whites/glint
  ctx.fillStyle = '#fff';
  ctx.beginPath(); ctx.arc(f * 9, -8, 3.5, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(f * 25, -8, 3.5, 0, Math.PI * 2); ctx.fill();

  // Mouth
  ctx.strokeStyle = outline;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(f * 16, 12, 8, 0.2, Math.PI - 0.2);
  ctx.stroke();

  ctx.restore(); // undo rotation

  // Charge-up effect
  if (this.headCharging) {
    const chargeT = 1 - (this.headChargeTimer || 0) / 40;
    ctx.globalAlpha = chargeT * 0.6;
    ctx.strokeStyle = '#ff4400';
    ctx.lineWidth = 3 + chargeT * 4;
    ctx.beginPath();
    ctx.arc(0, 0, radius + 5 + chargeT * 8, 0, Math.PI * 2);
    ctx.stroke();
    // Shake
    ctx.globalAlpha = 1;
  }

  // Rolling trail
  if (this.headRolling) {
    ctx.globalAlpha = 0.3;
    ctx.fillStyle = this.char.accent;
    for (let t = 1; t <= 3; t++) {
      ctx.beginPath();
      ctx.arc(-this.headRollSpeed * t * 2, 0, radius * (1 - t * 0.15), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  }

  ctx.restore();

  // Spit projectiles
  for (const sp of this.headSpitProjectiles) {
    ctx.save();
    ctx.translate(sp.x, sp.y);
    ctx.fillStyle = '#88cc44';
    ctx.globalAlpha = 0.8;
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fill();
    // Spit trail
    ctx.fillStyle = '#aaee66';
    ctx.globalAlpha = 0.4;
    ctx.beginPath();
    ctx.arc(-sp.vx * 0.5, -sp.vy * 0.5, 4, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(-sp.vx, -sp.vy, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.restore();
  }

  // Hit effect
  if (this.hitEffect && this.hitEffect.timer > 0) {
    const t = this.hitEffect.timer / 10;
    ctx.save();
    ctx.globalAlpha = t;
    ctx.strokeStyle = '#ffff00';
    ctx.lineWidth = 3;
    const r = 20 + (1 - t) * 25;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + (1 - t) * 2;
      ctx.beginPath();
      ctx.moveTo(this.hitEffect.x + Math.cos(angle) * r * 0.3, this.hitEffect.y + Math.sin(angle) * r * 0.3);
      ctx.lineTo(this.hitEffect.x + Math.cos(angle) * r, this.hitEffect.y + Math.sin(angle) * r);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
    ctx.restore();
  }
};
