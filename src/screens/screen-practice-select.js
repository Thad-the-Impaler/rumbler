function drawPracticeTargetScreen() {
  ctx.fillStyle = '#0a0a1a';
  ctx.fillRect(0, 0, 960, 540);

  // Title
  ctx.font = 'bold 32px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT PRACTICE TARGET', 480, 60);

  ctx.font = '16px Arial';
  ctx.fillStyle = '#aaa';
  ctx.fillText('Choose what to train against', 480, 90);
  // Player icon
  drawPortraitIcon(selectedPlayer.name, 30, 30, 22);
  ctx.font = '11px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, 48, 34);

  const targets = [
    { name: 'BAG', desc: ['Punching bag.', 'Stands still, takes hits.'], color: '#8B4513', accent: '#D2691E' },
    { name: 'MANNEQUIN', desc: ['Wooden dummy.', 'Punches every 2 seconds.'], color: '#c4a36e', accent: '#dbc09a' },
    { name: 'DRONE', desc: ['Moving target.', 'Walks around, no attacks.'], color: '#7a8a9a', accent: '#aabbcc' },
    { name: 'PRACTICE BOSS', desc: ['Fight a boss.', 'From Campaign Mode.'], color: '#cc2222', accent: '#ff4444' }
  ];

  for (let i = 0; i < targets.length; i++) {
    const t = targets[i];
    const x = 170 + i * 175;
    const selected = i === practiceTargetCursor;
    const pulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;

    // Card background
    ctx.fillStyle = selected ? 'rgba(255,107,53,0.15)' : 'rgba(255,255,255,0.05)';
    ctx.beginPath();
    ctx.roundRect(x - 70, 130, 140, 280, 12);
    ctx.fill();
    ctx.strokeStyle = selected ? `rgba(255,${150 + pulse * 105},0,${0.6 + pulse * 0.4})` : '#333';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Draw preview
    ctx.save();
    ctx.translate(x, 250);
    if (i === 0) {
      // Bag preview
      ctx.fillStyle = t.color;
      ctx.strokeStyle = '#5C3317';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-18, -50);
      ctx.quadraticCurveTo(-22, -25, -18, 0);
      ctx.quadraticCurveTo(0, 5, 18, 0);
      ctx.quadraticCurveTo(22, -25, 18, -50);
      ctx.closePath();
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = t.accent;
      ctx.beginPath(); ctx.ellipse(0, -50, 18, 6, 0, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#888';
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -56); ctx.lineTo(0, -80); ctx.stroke();
      ctx.strokeStyle = t.accent;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(0, -48); ctx.lineTo(0, -5); ctx.stroke();
    } else if (i === 1) {
      // Mannequin preview
      const wood = t.color;
      const joint = '#8a7040';
      // Head
      ctx.fillStyle = wood;
      ctx.beginPath(); ctx.arc(0, -50, 12, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = '#a08050'; ctx.lineWidth = 1.5; ctx.stroke();
      // Eyes
      ctx.fillStyle = '#333';
      ctx.beginPath(); ctx.arc(-4, -52, 2, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -52, 2, 0, Math.PI * 2); ctx.fill();
      // Smile
      ctx.strokeStyle = '#333'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(0, -48, 5, 0.1, Math.PI - 0.1); ctx.stroke();
      // Neck
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(0, -38, 3, 0, Math.PI * 2); ctx.fill();
      // Torso
      ctx.fillStyle = wood;
      ctx.beginPath(); ctx.roundRect(-14, -36, 28, 36, 4); ctx.fill();
      // Arms
      ctx.fillRect(-22, -34, 6, 20);
      ctx.fillRect(16, -34, 6, 20);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(-14, -34, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(14, -34, 3, 0, Math.PI * 2); ctx.fill();
      // Legs
      ctx.fillStyle = wood;
      ctx.fillRect(-10, 0, 7, 24);
      ctx.fillRect(3, 0, 7, 24);
      ctx.fillStyle = joint;
      ctx.beginPath(); ctx.arc(-7, 0, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(7, 0, 3, 0, Math.PI * 2); ctx.fill();
      // Base
      ctx.fillStyle = '#a08050';
      ctx.beginPath(); ctx.roundRect(-18, 24, 36, 4, 2); ctx.fill();
    } else if (i === 2) {
      // Drone preview - looks like a normal fighter
      const c = t.color;
      const a = t.accent;
      const o = '#4a5a6a';
      // Head
      ctx.fillStyle = c;
      ctx.strokeStyle = o;
      ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(0, -48, 12, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      // Eyes
      ctx.fillStyle = '#fff';
      ctx.beginPath(); ctx.arc(-4, -50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(4, -50, 3, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#111';
      ctx.beginPath(); ctx.arc(-3, -50, 1.5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -50, 1.5, 0, Math.PI * 2); ctx.fill();
      // Body
      ctx.fillStyle = c;
      ctx.strokeStyle = o;
      ctx.beginPath(); ctx.roundRect(-14, -36, 28, 32, 4); ctx.fill(); ctx.stroke();
      // Accent stripe
      ctx.fillStyle = a;
      ctx.fillRect(-10, -28, 20, 4);
      // Arms
      ctx.fillStyle = c;
      ctx.fillRect(-22, -34, 8, 22);
      ctx.fillRect(14, -34, 8, 22);
      // Legs
      ctx.fillRect(-12, -4, 9, 26);
      ctx.fillRect(3, -4, 9, 26);
      // Arrow indicators (showing movement)
      ctx.fillStyle = a;
      ctx.globalAlpha = 0.5 + Math.sin(Date.now() * 0.005) * 0.3;
      ctx.beginPath(); ctx.moveTo(-30, -20); ctx.lineTo(-24, -26); ctx.lineTo(-24, -14); ctx.closePath(); ctx.fill();
      ctx.beginPath(); ctx.moveTo(30, -20); ctx.lineTo(24, -26); ctx.lineTo(24, -14); ctx.closePath(); ctx.fill();
      ctx.globalAlpha = 1;
    } else if (i === 3) {
      // Practice Boss preview — skull icon
      ctx.fillStyle = t.color;
      ctx.strokeStyle = '#880000';
      ctx.lineWidth = 2;
      // Skull shape
      ctx.beginPath();
      ctx.arc(0, -40, 20, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      // Eyes
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(-7, -43, 5, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(7, -43, 5, 0, Math.PI * 2); ctx.fill();
      // Eye glow
      ctx.fillStyle = t.accent;
      ctx.globalAlpha = 0.6 + Math.sin(Date.now() * 0.005) * 0.3;
      ctx.beginPath(); ctx.arc(-7, -43, 3, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(7, -43, 3, 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
      // Jaw
      ctx.fillStyle = t.color;
      ctx.beginPath();
      ctx.roundRect(-12, -22, 24, 10, 3);
      ctx.fill(); ctx.stroke();
      // Teeth
      ctx.fillStyle = '#fff';
      for (let ti = 0; ti < 5; ti++) {
        ctx.fillRect(-10 + ti * 5, -22, 3, 5);
      }
      // Crown
      ctx.fillStyle = '#ccaa00';
      ctx.beginPath();
      ctx.moveTo(-16, -58);
      ctx.lineTo(-12, -50);
      ctx.lineTo(-6, -64);
      ctx.lineTo(0, -52);
      ctx.lineTo(6, -64);
      ctx.lineTo(12, -50);
      ctx.lineTo(16, -58);
      ctx.lineTo(16, -50);
      ctx.lineTo(-16, -50);
      ctx.closePath();
      ctx.fill();
    }
    ctx.restore();

    // Name
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? '#fff' : '#888';
    ctx.fillText(t.name, x, 340);

    // Description
    ctx.font = '11px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText(t.desc[0], x, 360);
    ctx.fillText(t.desc[1], x, 375);
  }

  // Instructions
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('LEFT/RIGHT to browse | ENTER to select | ESC to go back', 480, 470);

  // Master passkey flash
  if (masterUnlockFlash > 0) {
    masterUnlockFlash--;
    ctx.save();
    ctx.globalAlpha = masterUnlockFlash / 60 * 0.6;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, 960, 540);
    ctx.globalAlpha = Math.min(1, masterUnlockFlash / 30);
    ctx.font = 'bold 48px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#000';
    ctx.fillText('MASTER PASSKEY ACTIVATED', 480, 270);
    ctx.restore();
  }
}

