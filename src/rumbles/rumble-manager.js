function drawRumbleAnimation() {
  const loseFighter = winner === 'player' ? cpu : player;
  const winFighter = winner === 'player' ? player : cpu;
  const winChar = winner === 'player' ? selectedPlayer : selectedCPU;
  const rumbleEntry = characterRumbles[winChar.name];
  const rumble = rumbleEntry ? (Array.isArray(rumbleEntry) ? rumbleEntry.find(r => r.code === rumbleSubType) : rumbleEntry) : null;

  // Show rumble name at top (supports *italic* markers)
  if (rumble) {
    const nameAlpha = Math.min(1, rumbleTimer / 20);
    ctx.save();
    ctx.globalAlpha = nameAlpha;
    ctx.textBaseline = 'middle';
    ctx.shadowColor = winChar.accent;
    ctx.shadowBlur = 15;
    ctx.fillStyle = winChar.accent;
    const parts = rumble.name.split('*');
    if (parts.length > 1) {
      // Has italic markers — measure total width to center
      let totalW = 0;
      for (let p = 0; p < parts.length; p++) {
        ctx.font = p % 2 === 1 ? 'bold italic 30px Arial' : 'bold 30px Arial';
        totalW += ctx.measureText(parts[p]).width;
      }
      let nx = 480 - totalW / 2;
      for (let p = 0; p < parts.length; p++) {
        ctx.font = p % 2 === 1 ? 'bold italic 30px Arial' : 'bold 30px Arial';
        ctx.textAlign = 'left';
        ctx.fillText(parts[p], nx, 45);
        nx += ctx.measureText(parts[p]).width;
      }
    } else {
      ctx.font = 'bold 30px Arial';
      ctx.textAlign = 'center';
      ctx.fillText(rumble.name, 480, 45);
    }
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
  if (rumbleType === 'GOURMAND') {
    drawGourmandRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BATSCH') {
    drawBatschRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'PALETAP') {
    drawPaletapRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'MATADOR') {
    drawMatadorRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'KILLA WATT') {
    drawKillaWattRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BACKTRACK') {
    drawBacktrackRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'EXOR') {
    drawExorRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'BUCK') {
    drawBuckRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'VORTICE') {
    drawVorticeRumble(loseFighter, winFighter);
  }
  if (rumbleType === 'X-HAUST') {
    drawXhaustRumble(loseFighter, winFighter);
  }
}

