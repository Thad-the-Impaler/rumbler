function drawVersusScreen() {
  const t = versusTimer / VERSUS_DURATION; // 0→1 progress
  const W = 960, H = 540;

  // Black background
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, W, H);

  // Diagonal split line angle
  const splitX = W / 2;
  const skew = 40; // diagonal offset

  // --- Left side (Player) ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(splitX + skew, 0);
  ctx.lineTo(splitX - skew, H);
  ctx.lineTo(0, H);
  ctx.closePath();
  ctx.clip();

  // Slide in from left
  const slideInL = Math.min(1, t * 3); // completes at t=0.33
  const easeL = 1 - Math.pow(1 - slideInL, 3); // ease-out cubic
  const offsetL = (1 - easeL) * -500;

  // Tinted background
  ctx.fillStyle = selectedPlayer.accent + '33';
  ctx.fillRect(0, 0, splitX + skew, H);

  // Draw portrait icon
  const iconSize = 280;
  const pImg = portraitImages[selectedPlayer.name];
  if (pImg) {
    const px = splitX / 2 - iconSize / 2 + offsetL;
    const py = H / 2 - iconSize / 2 - 10;
    // Glow behind icon
    ctx.shadowColor = selectedPlayer.accent;
    ctx.shadowBlur = 30 * easeL;
    ctx.globalAlpha = easeL;
    ctx.drawImage(pImg, px, py, iconSize, iconSize);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // P1 label (top-left corner)
  ctx.globalAlpha = easeL;
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'left';
  ctx.fillStyle = '#fff';
  ctx.fillText('P1', 16, 32);

  // Player name
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedPlayer.accent;
  ctx.fillText(selectedPlayer.name, splitX / 2 + offsetL, H / 2 + iconSize / 2 + 20);

  // Player assist name
  if (selectedAssist) {
    ctx.font = '18px Arial';
    ctx.fillStyle = selectedAssist.color || '#aaa';
    ctx.fillText('Assist: ' + selectedAssist.name, splitX / 2 + offsetL, H / 2 + iconSize / 2 + 44);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- Right side (CPU) ---
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(splitX + skew, 0);
  ctx.lineTo(W, 0);
  ctx.lineTo(W, H);
  ctx.lineTo(splitX - skew, H);
  ctx.closePath();
  ctx.clip();

  // Slide in from right
  const slideInR = Math.min(1, t * 3);
  const easeR = 1 - Math.pow(1 - slideInR, 3);
  const offsetR = (1 - easeR) * 500;

  // Tinted background
  ctx.fillStyle = selectedCPU.accent + '33';
  ctx.fillRect(splitX - skew, 0, W - splitX + skew, H);

  // Draw portrait icon
  const cImg = portraitImages[selectedCPU.name];
  if (cImg) {
    const cx = splitX + (W - splitX) / 2 - iconSize / 2 + offsetR;
    const cy = H / 2 - iconSize / 2 - 10;
    ctx.shadowColor = selectedCPU.accent;
    ctx.shadowBlur = 30 * easeR;
    ctx.globalAlpha = easeR;
    ctx.drawImage(cImg, cx, cy, iconSize, iconSize);
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }

  // CPU label (top-right corner)
  ctx.globalAlpha = easeR;
  ctx.font = 'bold 22px Arial';
  ctx.textAlign = 'right';
  ctx.fillStyle = '#fff';
  ctx.fillText('CPU', W - 16, 32);

  // CPU name
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = selectedCPU.accent;
  ctx.fillText(selectedCPU.name, splitX + (W - splitX) / 2 + offsetR, H / 2 + iconSize / 2 + 20);

  // CPU assist name
  const cpuAssistVS = assists[cpuAssistIndex];
  if (cpuAssistVS) {
    ctx.font = '18px Arial';
    ctx.fillStyle = cpuAssistVS.color || '#aaa';
    ctx.fillText('Assist: ' + cpuAssistVS.name, splitX + (W - splitX) / 2 + offsetR, H / 2 + iconSize / 2 + 44);
  }
  ctx.globalAlpha = 1;
  ctx.restore();

  // --- Diagonal divider line ---
  ctx.save();
  const lineAlpha = Math.min(1, t * 4); // fades in quickly
  ctx.globalAlpha = lineAlpha;
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 4;
  ctx.shadowColor = '#fff';
  ctx.shadowBlur = 15;
  ctx.beginPath();
  ctx.moveTo(splitX + skew, 0);
  ctx.lineTo(splitX - skew, H);
  ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.restore();

  // --- "VS" text ---
  const vsAppear = Math.max(0, (t - 0.3) / 0.2); // appears at t=0.3, done at t=0.5
  if (vsAppear > 0) {
    const vsEase = Math.min(1, vsAppear);
    const vsScale = 0.5 + vsEase * 0.5; // scale from 0.5 to 1
    const vsBounce = vsEase < 1 ? (1 + Math.sin((vsEase - 1) * Math.PI) * 0.15) : 1;

    ctx.save();
    ctx.translate(splitX, H / 2 - 10);
    ctx.scale(vsScale * vsBounce, vsScale * vsBounce);
    ctx.globalAlpha = vsEase;

    // VS background circle
    ctx.beginPath();
    ctx.arc(0, 0, 45, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 4;
    ctx.stroke();

    // VS text
    ctx.font = 'bold 42px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#ffcc00';
    ctx.fillText('VS', 0, 2);

    ctx.restore();
  }

  // --- Flash transition at the end ---
  if (t > 0.85) {
    const flashT = (t - 0.85) / 0.15; // 0→1 over last 15%
    ctx.globalAlpha = flashT;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, W, H);
    ctx.globalAlpha = 1;
  }
}

