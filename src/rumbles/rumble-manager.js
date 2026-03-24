function drawRumbleAnimation() {
  const loseFighter = winner === 'player' ? cpu : player;
  const winFighter = winner === 'player' ? player : cpu;
  const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
  const rumbleEntry = characterRumbles[winChar.name];
  const rumble = rumbleEntry ? (Array.isArray(rumbleEntry) ? rumbleEntry.find(r => r.code === rumbleSubType) : rumbleEntry) : null;

  // Show rumble name at top
  if (rumble) {
    const nameAlpha = Math.min(1, rumbleTimer / 20);
    ctx.save();
    ctx.globalAlpha = nameAlpha;
    ctx.font = 'bold 30px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowColor = winChar.accent;
    ctx.shadowBlur = 15;
    ctx.fillStyle = winChar.accent;
    ctx.fillText(rumble.name, 480, 45);
    ctx.shadowBlur = 0;
    ctx.restore();
  }

  if (rumbleType === 'BLAZE') {
    drawBlazeRumble(loseFighter);
  }
  if (rumbleType === 'ARTIK') {
    drawArtikRumble(loseFighter);
  }
  if (rumbleType === 'VENOM') {
    drawVenomRumble(loseFighter);
  }
  if (rumbleType === 'SURGE') {
    drawSurgeRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TITAN') {
    drawTitanRumble(loseFighter);
  }
  if (rumbleType === 'SHADE') {
    drawShadeRumble(loseFighter, winFighter);
  }
  if ((rumbleType === 'BOJDO' || rumbleType === 'BOJDOBOJDO') && rumbleSubType === 'pellet') {
    drawBojdoRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv') {
    drawBojdoStompRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'RUBBERMAN') {
    drawRubbermanRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TORRENA') {
    drawTorrenaRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'SNAZZ MCJAZZ') {
    drawSnazzRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'HAYSTACK') {
    drawHaystackRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'CODEMAX') {
    drawCodemaxRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'CORVIDA') {
    drawCorvidaRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'GOLGAR') {
    drawGolgarRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'TELATRINE') {
    drawTelatrineRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'DUPLAIRE') {
    drawDuplaireRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BOZOLLOK') {
    drawBozollokRumble(loseFighter, winFighter);
  }
}

