function draw() {
  ctx.clearRect(0, 0, 960, 540);

  switch (gameState) {
    case 'title':
      drawTitleScreen();
      break;

    case 'charSelect':
      drawCharSelectScreen();
      break;

    case 'practiceTargetSelect':
      drawPracticeTargetScreen();
      break;

    case 'assistSelect':
      drawAssistSelectScreen();
      break;

    case 'difficultySelect':
      drawDifficultySelectScreen();
      break;

    case 'levelSelect':
      drawLevelSelectScreen();
      break;

    case 'versus':
      versusTimer++;
      if (versusTimer >= VERSUS_DURATION) {
        if (gameMode === 'rumblePractice') {
          startRumblePractice();
        } else {
          startFight();
        }
      } else {
        drawVersusScreen();
      }
      break;

    case 'fight':
      ctx.save();
      if (shakeTimer > 0) {
        ctx.translate(
          (Math.random() - 0.5) * shakeIntensity,
          (Math.random() - 0.5) * shakeIntensity
        );
      }
      drawBackground();
      player.draw(ctx);
      cpu.draw(ctx);
      drawHUD();
      // Backtrack rewind screen flash
      const btEffect = player.btRewindEffect || cpu.btRewindEffect || 0;
      if (btEffect > 0) {
        ctx.save();
        ctx.globalAlpha = btEffect / 40 * 0.5;
        ctx.fillStyle = '#b44dff';
        ctx.fillRect(0, 0, 960, 540);
        // Rewind text
        ctx.globalAlpha = Math.min(1, btEffect / 20);
        ctx.font = 'bold 36px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#fff';
        ctx.fillText('⏪ REWIND ⏪', 480, 270);
        ctx.restore();
      }
      ctx.restore();
      if (paused) drawPauseOverlay();
      break;

    case 'finishHim':
      ctx.save();
      drawBackground();
      {
        const loserF = winner === 'player' ? cpu : player;
        const winnerF = winner === 'player' ? player : cpu;
        // Draw winner — clip if gargantuan (Death from Above)
        if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && winnerF.bojdoScale > 2) {
          ctx.save();
          // Only show the bottom portion of the giant — clip top of screen
          ctx.beginPath();
          ctx.rect(0, 0, 960, 540);
          ctx.clip();
          winnerF.draw(ctx);
          ctx.restore();
        } else {
          winnerF.draw(ctx);
        }
        // Draw loser with special rumble effects if applicable
        if (!rumbleLoserHidden) {
          if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
            drawMeltingFighter(loserF);
          } else if (rumbleType === 'TITAN' && rumbleSinkProgress > 0) {
            drawSinkingFighter(loserF);
          } else {
            loserF.draw(ctx);
          }
        }
      }
      if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
      if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
      if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
      if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      ctx.restore();
      drawFinishHimScreen();
      if (paused) drawPauseOverlay();
      break;

    case 'victory':
      ctx.save();
      if (rumbleType === 'DUPLAIRE' && rumbleDuplaireZoom >= 1) {
        // Show clone-covered Earth as victory background
        drawDuplaireRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      } else {
        drawBackground();
        {
          const loserF = winner === 'player' ? cpu : player;
          const winnerF = winner === 'player' ? player : cpu;
          winnerF.draw(ctx);
          if (!rumbleLoserHidden) {
            if (rumbleType === 'VENOM' && rumbleVenomMeltPct > 0) {
              drawMeltingFighter(loserF);
            } else {
              loserF.draw(ctx);
            }
          }
        }
        if (rumbleAshes) drawAshPile(rumbleAshes.x, rumbleAshes.y);
        if (rumbleGoo) drawVenomRumble(winner === 'player' ? cpu : player);
        if (rumbleLightBurst && rumbleLoserHidden) drawSurgeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleSinkhole && rumbleLoserHidden) drawTitanRumble(winner === 'player' ? cpu : player);
        if (rumbleShadePoof) drawShadeRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleType === 'BOJDOBOJDO' && rumbleSubType === 'massiv' && rumbleLoserHidden) drawBojdoStompRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleType === 'RUBBERMAN' && rumbleTetherCracked) drawRubbermanRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleHailCracked) drawTorrenaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleCorvidaGulpChick >= 0 && rumbleLoserHidden) drawCorvidaRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleGolgarEntity2 && rumbleLoserHidden) drawGolgarRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
        if (rumbleTelatrinePhase === 5) drawTelatrineRumble(winner === 'player' ? cpu : player, winner === 'player' ? player : cpu);
      }
      drawHUD();
      ctx.restore();
      drawVictoryScreen();
      break;
  }
}

