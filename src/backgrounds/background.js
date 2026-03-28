function drawBackground() {
  const level = selectedLevel ? selectedLevel.name : 'CLASSIC';
  const t = Date.now();

  switch (level) {
    case 'CLASSIC': {
      // Original arena
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(0.6, '#16213e');
      grad.addColorStop(1, '#0f3460');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);
      for (let i = 0; i < 5; i++) {
        const lx = 100 + i * 200;
        ctx.fillStyle = `rgba(255,255,200,${0.03 + Math.sin(t * 0.001 + i) * 0.015})`;
        ctx.beginPath();
        ctx.moveTo(lx, 0);
        ctx.lineTo(lx - 80, 400);
        ctx.lineTo(lx + 80, 400);
        ctx.fill();
      }
      ctx.fillStyle = '#2a2a4a';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#4a4a7a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      ctx.strokeStyle = 'rgba(74,74,122,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 20; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 50 + (t * 0.01 % 50), 387);
        ctx.lineTo(i * 50 + (t * 0.01 % 50) - 20, 540);
        ctx.stroke();
      }
      break;
    }

    case 'THE TEMPLE': {
      // Ancient shrine background - warm golden sky
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#2a1a0a');
      grad.addColorStop(0.3, '#4a3020');
      grad.addColorStop(0.6, '#3a2515');
      grad.addColorStop(1, '#1a1008');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant misty mountains
      ctx.fillStyle = 'rgba(60,40,20,0.5)';
      ctx.beginPath();
      ctx.moveTo(0, 280);
      for (let i = 0; i <= 960; i += 40) {
        ctx.lineTo(i, 250 + Math.sin(i * 0.008) * 30 + Math.sin(i * 0.02) * 15);
      }
      ctx.lineTo(960, 400);
      ctx.lineTo(0, 400);
      ctx.fill();

      // Temple pillars in background
      for (let i = 0; i < 6; i++) {
        const px = 80 + i * 170;
        const broken = i === 2 || i === 4;
        const pillarH = broken ? 80 + Math.sin(i * 2.5) * 20 : 160;
        ctx.fillStyle = '#8B7355';
        ctx.fillRect(px - 12, 385 - pillarH, 24, pillarH);
        // Pillar detail lines
        ctx.strokeStyle = 'rgba(139,115,85,0.6)';
        ctx.lineWidth = 1;
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.moveTo(px - 12 + j * 8 + 4, 385 - pillarH);
          ctx.lineTo(px - 12 + j * 8 + 4, 385);
          ctx.stroke();
        }
        // Pillar top (capital)
        if (!broken) {
          ctx.fillStyle = '#9B8365';
          ctx.fillRect(px - 18, 385 - pillarH - 8, 36, 8);
        }
        // Cracks on broken pillars
        if (broken) {
          ctx.strokeStyle = '#5a4030';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(px - 5, 385 - pillarH);
          ctx.lineTo(px + 3, 385 - pillarH + 15);
          ctx.lineTo(px - 2, 385 - pillarH + 25);
          ctx.stroke();
        }
      }

      // Overgrown vines hanging from pillars
      ctx.strokeStyle = '#2a5a1a';
      ctx.lineWidth = 2;
      for (let i = 0; i < 8; i++) {
        const vx = 60 + i * 120 + Math.sin(i * 3) * 30;
        const vy = 220 + Math.sin(i * 1.7) * 20;
        ctx.beginPath();
        ctx.moveTo(vx, vy);
        ctx.quadraticCurveTo(vx + 15, vy + 40 + Math.sin(t * 0.002 + i) * 5, vx + 5, vy + 60);
        ctx.stroke();
        // Small leaves
        ctx.fillStyle = '#3a7a2a';
        ctx.beginPath();
        ctx.ellipse(vx + 5, vy + 60, 4, 2, 0.3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Floating dust/pollen particles
      for (let i = 0; i < 15; i++) {
        const px = (i * 73 + t * 0.02) % 960;
        const py = 100 + Math.sin(t * 0.001 + i * 2) * 80 + i * 15;
        ctx.fillStyle = `rgba(212,165,116,${0.2 + Math.sin(t * 0.003 + i) * 0.15})`;
        ctx.beginPath();
        ctx.arc(px, py, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // Stone floor with moss
      ctx.fillStyle = '#5a4a35';
      ctx.fillRect(0, 385, 960, 155);
      // Stone tiles
      for (let i = 0; i < 12; i++) {
        const tx = i * 80;
        ctx.strokeStyle = 'rgba(90,74,53,0.8)';
        ctx.lineWidth = 1;
        ctx.strokeRect(tx, 385, 80, 155);
        // Moss patches
        if (i % 3 === 0) {
          ctx.fillStyle = 'rgba(40,80,30,0.4)';
          ctx.beginPath();
          ctx.ellipse(tx + 40, 390, 25, 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.strokeStyle = '#7a6a55';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE PEAK': {
      // Snowy mountain summit
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#4a6a8a');
      grad.addColorStop(0.3, '#6a8aaa');
      grad.addColorStop(0.6, '#8aaaca');
      grad.addColorStop(1, '#aaccee');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant mountain range
      ctx.fillStyle = '#7a8a9a';
      ctx.beginPath();
      ctx.moveTo(0, 300);
      ctx.lineTo(120, 180);
      ctx.lineTo(200, 250);
      ctx.lineTo(320, 140);
      ctx.lineTo(420, 220);
      ctx.lineTo(500, 160);
      ctx.lineTo(600, 230);
      ctx.lineTo(720, 120);
      ctx.lineTo(800, 200);
      ctx.lineTo(880, 150);
      ctx.lineTo(960, 220);
      ctx.lineTo(960, 400);
      ctx.lineTo(0, 400);
      ctx.fill();

      // Snow caps on mountains
      ctx.fillStyle = '#e8f0f8';
      ctx.beginPath();
      ctx.moveTo(300, 160);
      ctx.lineTo(320, 140);
      ctx.lineTo(340, 155);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(700, 140);
      ctx.lineTo(720, 120);
      ctx.lineTo(740, 135);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(480, 175);
      ctx.lineTo(500, 160);
      ctx.lineTo(520, 172);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(860, 165);
      ctx.lineTo(880, 150);
      ctx.lineTo(900, 163);
      ctx.fill();

      // Fog/cloud layer
      for (let i = 0; i < 6; i++) {
        const cx = (i * 180 + t * 0.008) % 1100 - 70;
        const cy = 260 + Math.sin(i * 1.5) * 20;
        ctx.fillStyle = 'rgba(200,215,230,0.3)';
        ctx.beginPath();
        ctx.ellipse(cx, cy, 80, 20, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // Snowfall
      for (let i = 0; i < 40; i++) {
        const sx = (i * 47 + t * 0.03 + Math.sin(i * 0.5) * 50) % 960;
        const sy = (i * 31 + t * 0.02) % 540;
        const size = 1 + (i % 3);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.2})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // Icy ground
      const floorGrad = ctx.createLinearGradient(0, 385, 0, 540);
      floorGrad.addColorStop(0, '#c8d8e8');
      floorGrad.addColorStop(1, '#a0b8d0');
      ctx.fillStyle = floorGrad;
      ctx.fillRect(0, 385, 960, 155);

      // Ice shine streaks
      ctx.strokeStyle = 'rgba(255,255,255,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 130 + 20, 390);
        ctx.lineTo(i * 130 + 80, 395);
        ctx.stroke();
      }
      ctx.strokeStyle = '#d0e0f0';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE DEN': {
      // Burning hellscape
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a0500');
      grad.addColorStop(0.3, '#3a0a00');
      grad.addColorStop(0.5, '#5a1500');
      grad.addColorStop(1, '#2a0800');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant volcano
      ctx.fillStyle = '#2a0800';
      ctx.beginPath();
      ctx.moveTo(650, 380);
      ctx.lineTo(750, 120);
      ctx.lineTo(770, 120);
      ctx.lineTo(870, 380);
      ctx.fill();
      // Volcano rim
      ctx.fillStyle = '#4a1500';
      ctx.beginPath();
      ctx.moveTo(730, 130);
      ctx.lineTo(750, 120);
      ctx.lineTo(770, 120);
      ctx.lineTo(790, 130);
      ctx.lineTo(760, 140);
      ctx.fill();
      // Lava glow from volcano
      ctx.fillStyle = `rgba(255,80,0,${0.15 + Math.sin(t * 0.003) * 0.1})`;
      ctx.beginPath();
      ctx.moveTo(745, 120);
      ctx.lineTo(760, 50 + Math.sin(t * 0.004) * 10);
      ctx.lineTo(775, 120);
      ctx.fill();

      // Lava rivers on ground
      for (let i = 0; i < 4; i++) {
        const lx = 100 + i * 250;
        const glow = 0.4 + Math.sin(t * 0.005 + i * 1.5) * 0.2;
        ctx.strokeStyle = `rgba(255,100,0,${glow})`;
        ctx.lineWidth = 4 + Math.sin(t * 0.003 + i) * 2;
        ctx.beginPath();
        ctx.moveTo(lx, 400);
        ctx.quadraticCurveTo(lx + 30, 440 + Math.sin(t * 0.002 + i) * 10, lx + 60, 500);
        ctx.stroke();
        // Lava glow around rivers
        ctx.strokeStyle = `rgba(255,60,0,${glow * 0.3})`;
        ctx.lineWidth = 12;
        ctx.beginPath();
        ctx.moveTo(lx, 400);
        ctx.quadraticCurveTo(lx + 30, 440 + Math.sin(t * 0.002 + i) * 10, lx + 60, 500);
        ctx.stroke();
      }

      // Fire particles rising
      for (let i = 0; i < 20; i++) {
        const fx = (i * 53 + t * 0.04) % 960;
        const fy = 380 - ((t * 0.05 + i * 37) % 300);
        const alpha = Math.max(0, 1 - ((380 - fy) / 300));
        ctx.fillStyle = `rgba(255,${80 + i * 8},0,${alpha * 0.6})`;
        ctx.beginPath();
        ctx.arc(fx, fy, 2 + Math.sin(t * 0.01 + i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // Rocky/charred ground
      ctx.fillStyle = '#1a0a00';
      ctx.fillRect(0, 385, 960, 155);
      // Lava cracks in ground
      ctx.strokeStyle = `rgba(255,80,0,${0.3 + Math.sin(t * 0.002) * 0.15})`;
      ctx.lineWidth = 2;
      for (let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 100 + 20, 390);
        ctx.lineTo(i * 100 + 50, 420 + Math.sin(i) * 15);
        ctx.lineTo(i * 100 + 30, 460);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a1500';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'THE VOID': {
      // Space / meteor surface
      ctx.fillStyle = '#050510';
      ctx.fillRect(0, 0, 960, 540);

      // Rushing stars (streaks moving past)
      for (let i = 0; i < 60; i++) {
        const sy = (i * 11.3) % 540;
        const sx = (i * 47 + t * (0.1 + (i % 5) * 0.05)) % 1100 - 70;
        const speed = 0.1 + (i % 5) * 0.05;
        const len = 5 + speed * 40;
        const brightness = 150 + (i % 3) * 50;
        ctx.strokeStyle = `rgba(${brightness},${brightness},${brightness + 50},${0.3 + (i % 3) * 0.2})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(sx - len, sy);
        ctx.stroke();
      }

      // Distant nebula glow
      const nebX = 700 + Math.sin(t * 0.0003) * 30;
      const nebY = 150;
      const nebGrad = ctx.createRadialGradient(nebX, nebY, 0, nebX, nebY, 120);
      nebGrad.addColorStop(0, 'rgba(100,50,180,0.15)');
      nebGrad.addColorStop(0.5, 'rgba(60,30,120,0.08)');
      nebGrad.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebGrad;
      ctx.fillRect(0, 0, 960, 540);

      // Distant planet
      ctx.fillStyle = '#1a2a4a';
      ctx.beginPath();
      ctx.arc(200, 120, 45, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#2a3a5a';
      ctx.beginPath();
      ctx.arc(200, 120, 45, -0.5, 1.5);
      ctx.fill();
      // Planet ring
      ctx.strokeStyle = 'rgba(100,120,160,0.4)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.ellipse(200, 120, 65, 12, 0.3, 0, Math.PI * 2);
      ctx.stroke();

      // Meteor surface (rocky, cratered)
      ctx.fillStyle = '#2a2a30';
      ctx.fillRect(0, 385, 960, 155);
      // Craters
      for (let i = 0; i < 6; i++) {
        const cx = 80 + i * 160;
        const cr = 15 + (i % 3) * 8;
        ctx.fillStyle = '#1a1a22';
        ctx.beginPath();
        ctx.ellipse(cx, 400 + (i % 2) * 30, cr, cr * 0.4, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#3a3a44';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(cx, 400 + (i % 2) * 30, cr, cr * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a3a44';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }


    case 'SNOWY CITY': {
      // NYC skyline in winter snow
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#1a2a3a');
      grad.addColorStop(0.5, '#2a3a4a');
      grad.addColorStop(1, '#3a4a5a');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Back layer: distant skyline fill ---
      ctx.fillStyle = '#1a2434';
      const backBldgs = [[0,280,35,105],[38,260,30,125],[72,275,28,110],[140,250,32,135],[175,270,26,115],[370,255,28,130],[520,265,24,120],[550,250,30,135],[760,275,26,110],[845,260,28,125],[920,270,40,115]];
      for (const [bx,by,bw,bh] of backBldgs) {
        ctx.fillRect(bx, by, bw, bh);
      }

      // --- Brooklyn Bridge (left, spans x=30 to x=200) ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(30, 330, 180, 8);
      // Left tower - gothic arches
      ctx.fillStyle = '#2a3444';
      ctx.fillRect(65, 245, 14, 93);
      ctx.fillRect(81, 245, 14, 93);
      ctx.fillRect(62, 240, 36, 8);
      // Right tower
      ctx.fillRect(150, 245, 14, 93);
      ctx.fillRect(166, 245, 14, 93);
      ctx.fillRect(147, 240, 36, 8);
      // Main cable
      ctx.strokeStyle = '#3a4a5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(30, 270);
      ctx.quadraticCurveTo(80, 248, 80, 248);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(80, 248);
      ctx.quadraticCurveTo(120, 310, 165, 248);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(165, 248);
      ctx.quadraticCurveTo(200, 280, 210, 290);
      ctx.stroke();
      // Suspender cables
      ctx.lineWidth = 1;
      for (let i = 0; i < 7; i++) {
        const cx = 90 + i * 12;
        const cableT = (cx - 80) / (165 - 80);
        const cableY = 248 + Math.sin(cableT * Math.PI) * 60;
        ctx.beginPath();
        ctx.moveTo(cx, cableY);
        ctx.lineTo(cx, 330);
        ctx.stroke();
      }

      // --- Empire State Building ---
      ctx.fillStyle = '#222838';
      ctx.fillRect(290, 155, 44, 230);
      ctx.fillRect(296, 140, 32, 15);
      ctx.fillRect(302, 125, 20, 15);
      ctx.fillRect(307, 105, 10, 20);
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(312, 105);
      ctx.lineTo(312, 65);
      ctx.stroke();
      for (let row = 0; row < 11; row++) {
        for (let col = 0; col < 5; col++) {
          const wx = 294 + col * 8;
          const wy = 165 + row * 20;
          const lit = Math.sin(row * 3.7 + col * 7.1 + t * 0.001) > 0.2;
          ctx.fillStyle = lit ? `rgba(255,220,130,${0.4 + Math.sin(t * 0.002 + row + col) * 0.2})` : 'rgba(40,50,60,0.5)';
          ctx.fillRect(wx, wy, 5, 12);
        }
      }

      // --- Chrysler Building ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(395, 175, 28, 210);
      ctx.beginPath();
      ctx.moveTo(393, 175);
      ctx.lineTo(409, 140);
      ctx.lineTo(425, 175);
      ctx.fill();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(409, 140);
      ctx.lineTo(409, 115);
      ctx.stroke();
      for (let row = 0; row < 10; row++) {
        for (let col = 0; col < 3; col++) {
          if (Math.sin(row * 2 + col * 5 + t * 0.001) > 0.3) {
            ctx.fillStyle = `rgba(255,220,130,${0.3 + Math.sin(t * 0.002 + row) * 0.15})`;
            ctx.fillRect(399 + col * 8, 185 + row * 20, 4, 12);
          }
        }
      }

      // --- One World Trade Center ---
      ctx.fillStyle = '#1e2838';
      ctx.beginPath();
      ctx.moveTo(480, 385);
      ctx.lineTo(486, 110);
      ctx.lineTo(514, 110);
      ctx.lineTo(520, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(100,140,180,0.2)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(500, 110); ctx.lineTo(500, 385); ctx.stroke();
      ctx.strokeStyle = '#555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(500, 110);
      ctx.lineTo(500, 60);
      ctx.stroke();
      for (let row = 0; row < 13; row++) {
        for (let col = 0; col < 3; col++) {
          if (Math.sin(row * 4 + col * 3 + t * 0.001) > 0.25) {
            ctx.fillStyle = `rgba(180,210,240,${0.3 + Math.sin(t * 0.002 + row) * 0.1})`;
            ctx.fillRect(489 + col * 10, 120 + row * 20, 5, 12);
          }
        }
      }

      // --- More midtown buildings ---
      const midBldgs = [[230,230,25,155],[260,260,22,125],[340,240,20,145],[430,235,22,150],[570,240,26,145],[600,270,22,115],[635,250,24,135]];
      for (const [bx,by,bw,bh] of midBldgs) {
        ctx.fillStyle = '#1a2434';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 18); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 5 + col * 3 + t * 0.001) > 0.3) {
              ctx.fillStyle = `rgba(255,220,130,${0.3 + Math.sin(t * 0.002 + row) * 0.15})`;
              ctx.fillRect(bx + 3 + col * 8, by + 4 + row * 18, 4, 10);
            }
          }
        }
      }

      // --- Statue of Liberty (far right, on island) ---
      ctx.fillStyle = '#3a5a5a';
      ctx.fillRect(880, 320, 24, 65);
      ctx.fillRect(875, 315, 34, 8);
      ctx.beginPath();
      ctx.moveTo(886, 320);
      ctx.lineTo(889, 280);
      ctx.lineTo(895, 280);
      ctx.lineTo(898, 320);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(892, 274, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#3a5a5a';
      ctx.lineWidth = 1.5;
      for (let s = 0; s < 5; s++) {
        const sa = -Math.PI * 0.8 + (s / 4) * Math.PI * 0.6;
        ctx.beginPath();
        ctx.moveTo(892 + Math.cos(sa) * 6, 274 + Math.sin(sa) * 6);
        ctx.lineTo(892 + Math.cos(sa) * 12, 274 + Math.sin(sa) * 12);
        ctx.stroke();
      }
      ctx.strokeStyle = '#3a5a5a';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(896, 285);
      ctx.lineTo(902, 262);
      ctx.stroke();
      ctx.fillStyle = `rgba(255,200,80,${0.6 + Math.sin(t * 0.005) * 0.2})`;
      ctx.beginPath();
      ctx.arc(903, 257, 5, 0, Math.PI * 2);
      ctx.fill();

      // --- Manhattan Bridge (right side) ---
      ctx.fillStyle = '#1e2838';
      ctx.fillRect(680, 330, 200, 8);
      ctx.fillRect(710, 265, 10, 73);
      ctx.fillRect(720, 265, 10, 73);
      ctx.fillRect(830, 265, 10, 73);
      ctx.fillRect(840, 265, 10, 73);
      ctx.fillRect(707, 260, 26, 8);
      ctx.fillRect(827, 260, 26, 8);
      ctx.strokeStyle = '#3a4a5a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(680, 280);
      ctx.quadraticCurveTo(720, 265, 720, 265);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(720, 265);
      ctx.quadraticCurveTo(780, 315, 840, 265);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(840, 265);
      ctx.quadraticCurveTo(860, 275, 880, 285);
      ctx.stroke();
      ctx.lineWidth = 1;
      for (let i = 0; i < 9; i++) {
        const cx = 730 + i * 12;
        const cableT2 = (cx - 720) / (840 - 720);
        const cableY2 = 265 + Math.sin(cableT2 * Math.PI) * 48;
        ctx.beginPath();
        ctx.moveTo(cx, cableY2);
        ctx.lineTo(cx, 330);
        ctx.stroke();
      }

      // --- Snowfall ---
      for (let i = 0; i < 50; i++) {
        const sx = (i * 41 + t * 0.025 + Math.sin(i * 0.8 + t * 0.001) * 40) % 960;
        const sy = (i * 29 + t * 0.018) % 540;
        const size = 1 + (i % 3);
        ctx.fillStyle = `rgba(255,255,255,${0.3 + (i % 3) * 0.15})`;
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Snowy ground ---
      ctx.fillStyle = '#c8d0d8';
      ctx.fillRect(0, 385, 960, 155);
      ctx.fillStyle = 'rgba(255,255,255,0.3)';
      for (let i = 0; i < 15; i++) {
        ctx.beginPath();
        ctx.ellipse(i * 70 + 20, 392, 30, 4, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#d8e0e8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'FOGGY CITY': {
      // SF skyline in fog
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#8a8a8a');
      grad.addColorStop(0.4, '#9a9090');
      grad.addColorStop(1, '#6a6060');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Background hills ---
      ctx.fillStyle = '#5a5555';
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.quadraticCurveTo(150, 280, 300, 320);
      ctx.quadraticCurveTo(450, 350, 600, 310);
      ctx.quadraticCurveTo(750, 280, 960, 330);
      ctx.lineTo(960, 385);
      ctx.lineTo(0, 385);
      ctx.fill();

      // --- Background buildings ---
      const sfBack = [[440,210,28,175],[472,240,24,145],[500,225,26,160],[530,255,20,130],[620,230,24,155],[650,260,20,125],[760,245,28,140],[792,270,22,115],[820,240,26,145],[850,265,20,120],[880,230,30,155],[915,260,25,125]];
      for (const [bx,by,bw,bh] of sfBack) {
        ctx.fillStyle = '#4a4a55';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 18); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 4 + col * 6) > 0.1) {
              ctx.fillStyle = `rgba(200,180,150,${0.2 + Math.sin(t * 0.002 + row) * 0.1})`;
              ctx.fillRect(bx + 3 + col * 8, by + 4 + row * 18, 4, 12);
            }
          }
        }
      }

      // --- Salesforce Tower (tallest, rounded top) ---
      ctx.fillStyle = '#5a5a68';
      ctx.beginPath();
      ctx.moveTo(555, 385);
      ctx.lineTo(562, 120);
      ctx.lineTo(582, 120);
      ctx.lineTo(589, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(572, 120, 15, Math.PI, 0);
      ctx.fill();
      ctx.strokeStyle = 'rgba(120,120,140,0.4)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(572, 105); ctx.lineTo(572, 385); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(565, 120); ctx.lineTo(558, 385); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(579, 120); ctx.lineTo(586, 385); ctx.stroke();

      // --- Transamerica Pyramid ---
      ctx.fillStyle = '#6a6a78';
      ctx.beginPath();
      ctx.moveTo(690, 385);
      ctx.lineTo(710, 130);
      ctx.lineTo(730, 385);
      ctx.fill();
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(710, 130);
      ctx.lineTo(710, 100);
      ctx.stroke();
      // Wing structures
      ctx.fillStyle = '#5a5a68';
      ctx.beginPath();
      ctx.moveTo(690, 385);
      ctx.lineTo(690, 280);
      ctx.lineTo(683, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(730, 385);
      ctx.lineTo(730, 280);
      ctx.lineTo(737, 385);
      ctx.fill();

      // --- Golden Gate Bridge (left, spans x=20 to x=400) ---
      ctx.fillStyle = '#B5470F';
      ctx.fillRect(20, 340, 380, 8);
      // Left tower
      ctx.fillStyle = '#C85A17';
      ctx.fillRect(95, 165, 8, 183);
      ctx.fillRect(110, 165, 8, 183);
      ctx.fillRect(93, 165, 27, 6);
      ctx.fillRect(93, 220, 27, 4);
      ctx.fillRect(93, 270, 27, 4);
      ctx.fillRect(93, 320, 27, 4);
      // Right tower
      ctx.fillRect(285, 165, 8, 183);
      ctx.fillRect(300, 165, 8, 183);
      ctx.fillRect(283, 165, 27, 6);
      ctx.fillRect(283, 220, 27, 4);
      ctx.fillRect(283, 270, 27, 4);
      ctx.fillRect(283, 320, 27, 4);
      // Main cables
      ctx.strokeStyle = '#C85A17';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(20, 240);
      ctx.quadraticCurveTo(55, 200, 103, 170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(103, 170);
      ctx.quadraticCurveTo(200, 300, 296, 170);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(296, 170);
      ctx.quadraticCurveTo(350, 220, 400, 260);
      ctx.stroke();
      // Vertical suspender cables
      ctx.lineWidth = 1;
      for (let i = 1; i <= 14; i++) {
        const cx = 103 + (i / 15) * (296 - 103);
        const cableT = i / 15;
        const cableY = 170 + Math.sin(cableT * Math.PI) * 130;
        ctx.beginPath();
        ctx.moveTo(cx, cableY);
        ctx.lineTo(cx, 340);
        ctx.stroke();
      }

      // --- Fog layers ---
      for (let layer = 0; layer < 4; layer++) {
        const fy = 170 + layer * 55;
        const fogAlpha = 0.12 + layer * 0.04;
        for (let i = 0; i < 8; i++) {
          const fx = (i * 140 + t * (0.005 + layer * 0.003) * (layer % 2 === 0 ? 1 : -1)) % 1200 - 120;
          ctx.fillStyle = `rgba(180,180,180,${fogAlpha})`;
          ctx.beginPath();
          ctx.ellipse(fx, fy, 110 + layer * 20, 28 + layer * 5, 0, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Concrete ground ---
      ctx.fillStyle = '#5a5552';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#6a6562';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'RAINY CITY': {
      // Seattle skyline in rain
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#2a3040');
      grad.addColorStop(0.5, '#3a4555');
      grad.addColorStop(1, '#354050');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Mount Rainier ---
      ctx.fillStyle = '#3a4555';
      ctx.beginPath();
      ctx.moveTo(550, 380);
      ctx.quadraticCurveTo(620, 200, 720, 100);
      ctx.quadraticCurveTo(820, 200, 900, 380);
      ctx.fill();
      ctx.fillStyle = '#8a9aaa';
      ctx.beginPath();
      ctx.moveTo(670, 180);
      ctx.quadraticCurveTo(695, 120, 720, 100);
      ctx.quadraticCurveTo(745, 120, 770, 175);
      ctx.quadraticCurveTo(750, 165, 740, 150);
      ctx.quadraticCurveTo(720, 130, 700, 150);
      ctx.quadraticCurveTo(685, 165, 670, 180);
      ctx.fill();

      // --- Background buildings ---
      const seaBldgs = [[280,245,26,140],[310,265,22,120],[340,235,28,150],[380,255,22,130],[420,240,24,145],[460,260,20,125],[500,245,26,140],[540,270,20,115],[580,250,24,135],[620,265,20,120],[660,255,22,130],[750,240,28,145],[785,265,22,120],[815,250,24,135]];
      for (const [bx,by,bw,bh] of seaBldgs) {
        ctx.fillStyle = '#2a3545';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 16); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            if (Math.sin(bx + row * 3 + col * 5) > 0.2) {
              ctx.fillStyle = `rgba(180,200,220,${0.15 + Math.sin(t * 0.002 + row) * 0.1})`;
              ctx.fillRect(bx + 3 + col * 8, by + 3 + row * 16, 4, 10);
            }
          }
        }
      }

      // --- Space Needle ---
      const snX = 160;
      ctx.fillStyle = '#5a6575';
      // Tripod legs
      ctx.beginPath();
      ctx.moveTo(snX - 35, 385);
      ctx.lineTo(snX - 3, 270);
      ctx.lineTo(snX + 3, 270);
      ctx.lineTo(snX - 25, 385);
      ctx.fill();
      ctx.beginPath();
      ctx.moveTo(snX + 35, 385);
      ctx.lineTo(snX + 3, 270);
      ctx.lineTo(snX - 3, 270);
      ctx.lineTo(snX + 25, 385);
      ctx.fill();
      // Center shaft
      ctx.fillRect(snX - 3, 175, 6, 95);
      // Observation deck
      ctx.fillStyle = '#6a7585';
      ctx.beginPath();
      ctx.moveTo(snX - 45, 180);
      ctx.lineTo(snX - 40, 172);
      ctx.lineTo(snX + 40, 172);
      ctx.lineTo(snX + 45, 180);
      ctx.lineTo(snX + 35, 185);
      ctx.lineTo(snX - 35, 185);
      ctx.closePath();
      ctx.fill();
      ctx.fillStyle = `rgba(180,200,220,${0.3 + Math.sin(t * 0.002) * 0.1})`;
      for (let w = 0; w < 6; w++) {
        ctx.fillRect(snX - 32 + w * 11, 174, 6, 6);
      }
      // Roof
      ctx.fillStyle = '#5a6575';
      ctx.beginPath();
      ctx.moveTo(snX - 38, 172);
      ctx.lineTo(snX, 160);
      ctx.lineTo(snX + 38, 172);
      ctx.fill();
      // Antenna
      ctx.strokeStyle = '#7a8a9a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(snX, 160);
      ctx.lineTo(snX, 120);
      ctx.stroke();

      // --- Smith Tower ---
      ctx.fillStyle = '#3a4858';
      ctx.fillRect(85, 220, 24, 165);
      ctx.beginPath();
      ctx.moveTo(83, 220);
      ctx.lineTo(97, 185);
      ctx.lineTo(111, 220);
      ctx.fill();
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 2; col++) {
          if (Math.sin(row * 3 + col * 7) > 0) {
            ctx.fillStyle = `rgba(180,200,220,${0.15 + Math.sin(t * 0.002 + row) * 0.1})`;
            ctx.fillRect(89 + col * 10, 225 + row * 19, 5, 12);
          }
        }
      }

      // --- Columbia Center ---
      ctx.fillStyle = '#2a3545';
      ctx.fillRect(220, 170, 32, 215);
      ctx.fillRect(224, 160, 24, 10);
      ctx.fillRect(228, 152, 16, 8);
      for (let row = 0; row < 12; row++) {
        for (let col = 0; col < 3; col++) {
          ctx.fillStyle = `rgba(140,170,200,${0.12 + Math.sin(t * 0.002 + row) * 0.08})`;
          ctx.fillRect(224 + col * 9, 175 + row * 17, 5, 10);
        }
      }

      // --- Rain ---
      ctx.strokeStyle = 'rgba(150,170,200,0.3)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 80; i++) {
        const rx = (i * 37 + t * 0.08) % 960;
        const ry = (i * 23 + t * 0.15) % 600 - 60;
        ctx.beginPath();
        ctx.moveTo(rx, ry);
        ctx.lineTo(rx - 2, ry + 15);
        ctx.stroke();
      }

      // --- Wet ground ---
      ctx.fillStyle = '#2a3040';
      ctx.fillRect(0, 385, 960, 155);
      for (let i = 0; i < 6; i++) {
        const px = 80 + i * 160;
        ctx.fillStyle = `rgba(80,100,130,${0.25 + Math.sin(t * 0.003 + i) * 0.1})`;
        ctx.beginPath();
        ctx.ellipse(px, 415 + (i % 3) * 20, 45, 5, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.strokeStyle = '#3a4555';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'GLOWING CITY': {
      // Las Vegas at night
      ctx.fillStyle = '#0a0515';
      ctx.fillRect(0, 0, 960, 540);

      // Night sky with stars
      for (let i = 0; i < 30; i++) {
        ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(t * 0.003 + i * 2) * 0.15})`;
        ctx.beginPath();
        ctx.arc((i * 67) % 960, (i * 31) % 180, 1, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Desert mountains ---
      ctx.fillStyle = '#15101a';
      ctx.beginPath();
      ctx.moveTo(0, 350);
      ctx.lineTo(100, 300);
      ctx.lineTo(250, 330);
      ctx.lineTo(400, 290);
      ctx.lineTo(550, 320);
      ctx.lineTo(700, 280);
      ctx.lineTo(850, 310);
      ctx.lineTo(960, 290);
      ctx.lineTo(960, 385);
      ctx.lineTo(0, 385);
      ctx.fill();

      // --- Strip buildings (back layer) ---
      const vegasBldgs = [[50,220,30,165],[85,245,25,140],[270,215,32,170],[305,245,25,140],[480,230,28,155],[512,255,22,130],[750,215,32,170],[785,245,25,140],[850,225,30,160],[885,250,28,135],[920,240,30,145]];
      for (const [bx,by,bw,bh] of vegasBldgs) {
        ctx.fillStyle = '#1a1520';
        ctx.fillRect(bx, by, bw, bh);
        const neonHue = (bx * 3 + t * 0.02) % 360;
        ctx.strokeStyle = `hsla(${neonHue}, 100%, 60%, 0.4)`;
        ctx.lineWidth = 1;
        ctx.strokeRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 14); row++) {
          for (let col = 0; col < Math.floor(bw / 8); col++) {
            const hue2 = (bx + row * 20 + col * 40 + t * 0.05) % 360;
            ctx.fillStyle = `hsla(${hue2}, 80%, 60%, 0.35)`;
            ctx.fillRect(bx + 3 + col * 8, by + 3 + row * 14, 4, 8);
          }
        }
      }

      // --- Luxor Pyramid ---
      ctx.fillStyle = '#1a1810';
      ctx.beginPath();
      ctx.moveTo(120, 385);
      ctx.lineTo(175, 200);
      ctx.lineTo(230, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(40,35,20,0.5)';
      ctx.lineWidth = 1;
      for (let i = 1; i < 4; i++) {
        const py = 200 + i * 46;
        const w = (py - 200) / (385 - 200) * 55;
        ctx.beginPath();
        ctx.moveTo(175 - w, py);
        ctx.lineTo(175 + w, py);
        ctx.stroke();
      }
      // Sky beam
      ctx.fillStyle = `rgba(255,255,200,${0.06 + Math.sin(t * 0.003) * 0.02})`;
      ctx.beginPath();
      ctx.moveTo(172, 200);
      ctx.lineTo(165, 0);
      ctx.lineTo(185, 0);
      ctx.lineTo(178, 200);
      ctx.fill();
      // Sphinx
      ctx.fillStyle = '#1a1810';
      ctx.beginPath();
      ctx.ellipse(165, 378, 18, 8, 0, 0, Math.PI * 2);
      ctx.fill();

      // --- High Roller Ferris Wheel ---
      const wheelX = 380, wheelY = 250, wheelR = 65;
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.moveTo(wheelX - 8, 385);
      ctx.lineTo(wheelX - 3, wheelY + wheelR);
      ctx.lineTo(wheelX + 3, wheelY + wheelR);
      ctx.lineTo(wheelX + 8, 385);
      ctx.fill();
      ctx.strokeStyle = 'rgba(170,170,255,0.6)';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, wheelR, 0, Math.PI * 2);
      ctx.stroke();
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, wheelR - 6, 0, Math.PI * 2);
      ctx.stroke();
      for (let i = 0; i < 28; i++) {
        const a = (i / 28) * Math.PI * 2 + t * 0.0005;
        ctx.strokeStyle = 'rgba(170,170,255,0.3)';
        ctx.beginPath();
        ctx.moveTo(wheelX, wheelY);
        ctx.lineTo(wheelX + Math.cos(a) * wheelR, wheelY + Math.sin(a) * wheelR);
        ctx.stroke();
        if (i % 2 === 0) {
          ctx.fillStyle = `rgba(220,220,255,${0.5 + Math.sin(t * 0.003 + i) * 0.2})`;
          ctx.beginPath();
          ctx.arc(wheelX + Math.cos(a) * (wheelR - 3), wheelY + Math.sin(a) * (wheelR - 3), 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.fillStyle = '#555';
      ctx.beginPath();
      ctx.arc(wheelX, wheelY, 5, 0, Math.PI * 2);
      ctx.fill();

      // --- MSG Sphere (keeping original LED pattern) ---
      ctx.fillStyle = '#1a1a2a';
      ctx.beginPath();
      ctx.arc(650, 280, 60, 0, Math.PI * 2);
      ctx.fill();
      for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 12; col++) {
          const a = (col / 12) * Math.PI * 2;
          const r = 55 - row * 2;
          const px = 650 + Math.cos(a + t * 0.002) * r * Math.cos((row / 8 - 0.5) * Math.PI);
          const py = 280 + Math.sin((row / 8 - 0.5) * Math.PI) * 55;
          const hue = (col * 30 + row * 20 + t * 0.1) % 360;
          ctx.fillStyle = `hsla(${hue}, 100%, 60%, 0.7)`;
          ctx.beginPath();
          ctx.arc(px, py, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // --- Neon glow on ground ---
      for (let i = 0; i < 8; i++) {
        const nx = 60 + i * 120;
        const hue = (i * 45 + t * 0.04) % 360;
        ctx.fillStyle = `hsla(${hue}, 100%, 55%, ${0.12 + Math.sin(t * 0.005 + i) * 0.06})`;
        ctx.beginPath();
        ctx.ellipse(nx, 375, 35, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }

      // --- Lit strip ground ---
      const floorGrad2 = ctx.createLinearGradient(0, 385, 0, 540);
      floorGrad2.addColorStop(0, '#1a1520');
      floorGrad2.addColorStop(1, '#100a15');
      ctx.fillStyle = floorGrad2;
      ctx.fillRect(0, 385, 960, 155);
      for (let i = 0; i < 10; i++) {
        const hue = (i * 36 + t * 0.03) % 360;
        ctx.fillStyle = `hsla(${hue}, 80%, 50%, 0.08)`;
        ctx.fillRect(i * 96, 385, 96, 155);
      }
      ctx.strokeStyle = '#2a2030';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    case 'SUNNY CITY': {
      // LA skyline under golden sun
      const grad = ctx.createLinearGradient(0, 0, 0, 385);
      grad.addColorStop(0, '#1a6aaa');
      grad.addColorStop(0.3, '#3a8acc');
      grad.addColorStop(0.6, '#5aaaee');
      grad.addColorStop(1, '#8accff');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 385);

      // --- Sun ---
      const sunGrad = ctx.createRadialGradient(820, 70, 0, 820, 70, 90);
      sunGrad.addColorStop(0, 'rgba(255,245,200,1)');
      sunGrad.addColorStop(0.25, 'rgba(255,230,140,0.7)');
      sunGrad.addColorStop(0.6, 'rgba(255,200,80,0.2)');
      sunGrad.addColorStop(1, 'rgba(255,180,50,0)');
      ctx.fillStyle = sunGrad;
      ctx.fillRect(730, 0, 180, 180);
      ctx.fillStyle = '#fffae0';
      ctx.beginPath();
      ctx.arc(820, 70, 28, 0, Math.PI * 2);
      ctx.fill();

      // --- Rolling hills with Hollywood sign ---
      ctx.fillStyle = '#6a9a55';
      ctx.beginPath();
      ctx.moveTo(0, 340);
      ctx.quadraticCurveTo(80, 295, 180, 310);
      ctx.quadraticCurveTo(280, 280, 380, 305);
      ctx.quadraticCurveTo(440, 320, 500, 340);
      ctx.lineTo(500, 385);
      ctx.lineTo(0, 385);
      ctx.fill();
      ctx.fillStyle = '#5a8a4a';
      ctx.beginPath();
      ctx.moveTo(0, 355);
      ctx.quadraticCurveTo(100, 320, 200, 335);
      ctx.quadraticCurveTo(300, 350, 400, 345);
      ctx.quadraticCurveTo(480, 340, 520, 360);
      ctx.lineTo(520, 385);
      ctx.lineTo(0, 385);
      ctx.fill();
      ctx.font = 'bold 14px Arial';
      ctx.textAlign = 'center';
      ctx.fillStyle = '#e8e8e8';
      ctx.fillText('H O L L Y W O O D', 260, 295);

      // --- Downtown LA skyline (right side) ---
      ctx.fillStyle = '#4a6a8a';
      ctx.fillRect(700, 160, 30, 225);
      ctx.fillStyle = '#5a7a9a';
      ctx.beginPath();
      ctx.moveTo(700, 160);
      ctx.lineTo(715, 140);
      ctx.lineTo(730, 160);
      ctx.fill();
      ctx.fillStyle = '#3a5a7a';
      ctx.fillRect(745, 175, 26, 210);
      ctx.strokeStyle = '#6a8aaa';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(758, 175);
      ctx.lineTo(758, 135);
      ctx.stroke();
      const laBldgs = [[650,250,28,135],[680,270,18,115],[775,230,24,155],[802,260,20,125],[825,240,26,145],[855,265,22,120],[880,250,28,135],[912,270,25,115],[940,255,20,130]];
      for (const [bx,by,bw,bh] of laBldgs) {
        ctx.fillStyle = '#3a5a7a';
        ctx.fillRect(bx, by, bw, bh);
        for (let row = 0; row < Math.floor(bh / 16); row++) {
          for (let col = 0; col < Math.floor(bw / 9); col++) {
            ctx.fillStyle = 'rgba(200,230,255,0.25)';
            ctx.fillRect(bx + 3 + col * 9, by + 4 + row * 16, 5, 10);
          }
        }
      }

      // --- Griffith Observatory ---
      const goX = 420;
      ctx.fillStyle = '#6a9a55';
      ctx.beginPath();
      ctx.moveTo(goX - 80, 385);
      ctx.quadraticCurveTo(goX - 40, 290, goX, 280);
      ctx.quadraticCurveTo(goX + 40, 290, goX + 80, 385);
      ctx.fill();
      ctx.fillStyle = '#d8d0c0';
      ctx.fillRect(goX - 30, 305, 60, 18);
      ctx.fillStyle = '#c8c0b0';
      ctx.beginPath();
      ctx.arc(goX, 305, 14, Math.PI, 0);
      ctx.fill();
      ctx.fillRect(goX - 42, 310, 14, 13);
      ctx.fillRect(goX + 28, 310, 14, 13);
      ctx.beginPath();
      ctx.arc(goX - 35, 310, 7, Math.PI, 0);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(goX + 35, 310, 7, Math.PI, 0);
      ctx.fill();

      // --- Palm trees ---
      const palmPositions = [[60, 155], [190, 145], [550, 150], [920, 140]];
      for (let i = 0; i < palmPositions.length; i++) {
        const [px, trunkH] = palmPositions[i];
        const lean = Math.sin(i * 2.3) * 12;
        const topX = px + lean;
        const topY = 385 - trunkH;
        ctx.strokeStyle = '#8B6914';
        ctx.lineWidth = 5;
        ctx.beginPath();
        ctx.moveTo(px, 385);
        ctx.quadraticCurveTo(px + lean * 0.5, 385 - trunkH * 0.5, topX, topY);
        ctx.stroke();
        ctx.strokeStyle = '#7a5a10';
        ctx.lineWidth = 1;
        for (let s = 1; s < 6; s++) {
          const segT = s / 6;
          const segX = px + lean * segT;
          const segY = 385 - trunkH * segT;
          ctx.beginPath();
          ctx.moveTo(segX - 3, segY);
          ctx.lineTo(segX + 3, segY);
          ctx.stroke();
        }
        const frondAngles = [-2.2, -1.6, -1.0, -0.4, 0.2, 0.8, 1.4, 2.0];
        for (let f = 0; f < frondAngles.length; f++) {
          const fa = frondAngles[f];
          const fLen = 32 + Math.sin(f * 2 + t * 0.002) * 3;
          const endX = topX + Math.cos(fa) * fLen;
          const endY = topY + Math.abs(Math.sin(fa)) * fLen * 0.4 + fLen * 0.3;
          ctx.strokeStyle = '#2a7a2a';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(topX, topY);
          ctx.quadraticCurveTo(
            topX + Math.cos(fa) * fLen * 0.5,
            topY - 5 + Math.abs(Math.sin(fa)) * fLen * 0.1,
            endX, endY
          );
          ctx.stroke();
        }
      }

      // --- Sandy ground ---
      ctx.fillStyle = '#c8b898';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#d8c8a8';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }

    default: {
      // Fallback to classic
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#1a1a2e');
      grad.addColorStop(0.6, '#16213e');
      grad.addColorStop(1, '#0f3460');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);
      ctx.fillStyle = '#2a2a4a';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#4a4a7a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      break;
    }
    case 'THE DUST': {
      // Title screen background — dark gradient with floating particles
      const grad = ctx.createLinearGradient(0, 0, 0, 540);
      grad.addColorStop(0, '#0a0a1a');
      grad.addColorStop(0.5, '#1a0a2e');
      grad.addColorStop(1, '#0a1a2e');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 960, 540);
      // Animated particles (same as title screen)
      for (let i = 0; i < 30; i++) {
        const px = (i * 137 + t * 0.02 * (i % 3 + 1)) % 960;
        const py = (i * 89 + t * 0.01 * (i % 2 + 1)) % 540;
        ctx.fillStyle = `rgba(255,100,50,${0.1 + Math.sin(i + t * 0.003) * 0.05})`;
        ctx.beginPath();
        ctx.arc(px, py, 2 + Math.sin(i) * 1, 0, Math.PI * 2);
        ctx.fill();
      }
      // Subtle ancient ruin silhouettes in the background
      ctx.fillStyle = 'rgba(20,10,35,0.6)';
      // Broken pillars
      ctx.fillRect(80, 280, 25, 110);
      ctx.fillRect(80, 260, 35, 25);
      ctx.fillRect(200, 310, 20, 80);
      ctx.fillRect(700, 290, 22, 100);
      ctx.fillRect(700, 270, 32, 25);
      ctx.fillRect(850, 320, 18, 70);
      // Crumbled blocks
      ctx.fillRect(130, 370, 30, 20);
      ctx.fillRect(750, 365, 25, 25);
      ctx.fillRect(440, 375, 35, 15);
      // Floor
      ctx.fillStyle = '#151025';
      ctx.fillRect(0, 385, 960, 155);
      ctx.strokeStyle = '#2a1a3e';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(0, 387);
      ctx.lineTo(960, 387);
      ctx.stroke();
      // Floor cracks
      ctx.strokeStyle = 'rgba(100,50,150,0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 8; i++) {
        ctx.beginPath();
        ctx.moveTo(i * 130, 387);
        ctx.lineTo(i * 130 + 40, 420);
        ctx.lineTo(i * 130 + 15, 460);
        ctx.stroke();
      }
      break;
    }
  }
}

