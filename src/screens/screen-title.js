function drawTitleScreen() {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 540);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#1a0a2e');
  grad.addColorStop(1, '#0a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 540);

  // Animated bg particles
  for (let i = 0; i < 30; i++) {
    const px = (i * 137 + Date.now() * 0.02 * (i % 3 + 1)) % 960;
    const py = (i * 89 + Date.now() * 0.01 * (i % 2 + 1)) % 540;
    ctx.fillStyle = `rgba(255,100,50,${0.1 + Math.sin(i + Date.now() * 0.003) * 0.05})`;
    ctx.beginPath();
    ctx.arc(px, py, 2 + Math.sin(i) * 1, 0, Math.PI * 2);
    ctx.fill();
  }

  // Title
  titlePulse += 0.03;
  const scale = 1 + Math.sin(titlePulse) * 0.03;
  ctx.save();
  ctx.translate(480, 180);
  ctx.scale(scale, scale);

  // Title shadow
  ctx.font = 'bold 90px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = 'rgba(255,50,0,0.3)';
  ctx.fillText('RUMBLER', 4, 4);

  // Title gradient
  const titleGrad = ctx.createLinearGradient(-200, -40, 200, 40);
  titleGrad.addColorStop(0, '#ff4500');
  titleGrad.addColorStop(0.5, '#ff6b35');
  titleGrad.addColorStop(1, '#ffa500');
  ctx.fillStyle = titleGrad;
  ctx.fillText('RUMBLER', 0, 0);

  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2;
  ctx.strokeText('RUMBLER', 0, 0);
  ctx.restore();

  // Subtitle
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#888';
  ctx.fillText('ARCADE FIGHTING', 480, 220);

  // Decorative line
  ctx.strokeStyle = '#ff450066';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(200, 260);
  ctx.lineTo(760, 260);
  ctx.stroke();

  // Menu options
  const menuItems = ['FIGHT CPU', 'CAMPAIGN', 'PRACTICE'];
  if (rumblePracticeUnlocked) menuItems.push('RUMBLE PRACTICE');
  const menuDescs = ['Battle a CPU opponent', 'Fight through a series of challengers', 'Practice combos on a bag or mannequin', 'Practice your Rumble finishers'];
  const menuSpacing = menuItems.length > 2 ? 45 : 55;
  const menuStartY = menuItems.length > 2 ? 310 : 330;
  for (let i = 0; i < menuItems.length; i++) {
    const y = menuStartY + i * menuSpacing;
    const selected = i === titleCursor;
    const btnPulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;

    // Selection indicator
    if (selected) {
      ctx.fillStyle = 'rgba(255,69,0,0.1)';
      ctx.beginPath();
      ctx.roundRect(330, y - 30, 300, 44, 8);
      ctx.fill();
      ctx.strokeStyle = `rgba(255,${150 + btnPulse * 105},0,${0.6 + btnPulse * 0.4})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(330, y - 30, 300, 44, 8);
      ctx.stroke();

      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ff6b35';
      ctx.fillText('>', 365, y);
    }

    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = selected ? `rgba(255,${150 + btnPulse * 105},0,${0.8 + btnPulse * 0.2})` : '#555';
    ctx.fillText(menuItems[i], 480, y);
  }

  // Subtitle for selected mode
  const descY = menuStartY + menuItems.length * menuSpacing + 15;
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#666';
  ctx.fillText(menuDescs[titleCursor] || '', 480, descY);

  // Footer
  ctx.font = '14px Arial';
  ctx.fillStyle = '#555';
  ctx.fillText('Press ENTER to select', 480, descY + 35);

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

