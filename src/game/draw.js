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

    case 'bossSelect':
      drawBossSelectScreen();
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

    case 'campaignSelect':
      drawCampaignSelectScreen();
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
      // The Count Final death sequence: custom cpu draw
      if (countDeathPhase >= 0) {
        // Cumulative bow angle: builds during phase 0, holds during phase 1+
        const bowAngle = countDeathPhase === 0 ? Math.min(1, countDeathTimer / 40) * 0.5 : 0.5;

        if (countDeathPhase <= 1) {
          // Draw Count body with bow lean
          ctx.save();
          ctx.translate(cpu.x, cpu.y);
          ctx.rotate(cpu.facing * bowAngle);
          ctx.translate(-cpu.x, -cpu.y);
          cpu.draw(ctx);
          ctx.restore();
          // Draw fireworks/explosions OUTSIDE the rotation
          for (const e of cpu.countExplosions) {
            ctx.save();
            ctx.globalAlpha = Math.min(1, e.timer / 15);
            if (e.text) {
              const scale = 1 + (1 - e.timer / 50) * 0.8;
              ctx.translate(e.x, e.y);
              ctx.scale(scale, scale);
              ctx.font = 'bold 18px Arial';
              ctx.textAlign = 'center';
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 3;
              ctx.strokeText(e.text, 0, 0);
              ctx.fillStyle = e.color;
              ctx.fillText(e.text, 0, 0);
            } else {
              ctx.fillStyle = e.color;
              ctx.beginPath();
              ctx.arc(e.x, e.y, 3 + (1 - e.timer / 30) * 4, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.restore();
          }
        } else if (countDeathPhase === 2) {
          // Burst: fade Count's body
          ctx.save();
          ctx.globalAlpha = Math.max(0, 1 - countDeathTimer / 60);
          ctx.translate(cpu.x, cpu.y);
          ctx.rotate(cpu.facing * 0.5); // stay bowed
          ctx.translate(-cpu.x, -cpu.y);
          cpu.draw(ctx);
          ctx.restore();
          // Draw explosions outside rotation
          for (const e of cpu.countExplosions) {
            ctx.save();
            ctx.globalAlpha = Math.min(1, e.timer / 15);
            if (e.text) {
              const scale = 1 + (1 - e.timer / 50) * 0.8;
              ctx.translate(e.x, e.y);
              ctx.scale(scale, scale);
              ctx.font = 'bold 18px Arial';
              ctx.textAlign = 'center';
              ctx.strokeStyle = '#000';
              ctx.lineWidth = 3;
              ctx.strokeText(e.text, 0, 0);
              ctx.fillStyle = e.color;
              ctx.fillText(e.text, 0, 0);
            } else {
              ctx.fillStyle = e.color;
              ctx.beginPath();
              ctx.arc(e.x, e.y, 3 + (1 - e.timer / 30) * 4, 0, Math.PI * 2);
              ctx.fill();
            }
            ctx.globalAlpha = 1;
            ctx.restore();
          }
        }
        // Phase 3: everything fades to black
        if (countDeathPhase === 3) {
          ctx.fillStyle = `rgba(0,0,0,${Math.min(1, countDeathTimer / 30)})`;
          ctx.fillRect(0, 0, 960, 540);
        }
        // No HUD during death sequence
      } else {
        cpu.draw(ctx);
        drawHUD();
      }

      // Printer Boss: paper projectiles
      if (printerBossPhase === 5) {
        for (const p of printerBossPapers) {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(-8, -6, 16, 12);
          ctx.strokeStyle = '#cccccc';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-8, -6, 16, 12);
          // Fake text lines
          ctx.fillStyle = '#aaa';
          ctx.fillRect(-5, -3, 8, 1);
          ctx.fillRect(-5, 0, 6, 1);
          ctx.fillRect(-5, 3, 9, 1);
          ctx.restore();
        }
      }

      // Printer Boss: ink splats (drawn over everything)
      for (const ink of printerBossInkSplats) {
        ctx.save();
        ctx.globalAlpha = ink.alpha;
        ctx.fillStyle = '#111';
        ctx.beginPath();
        ctx.ellipse(ink.x, ink.y, ink.w / 2, ink.h / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        // Irregular edges
        for (let s = 0; s < 5; s++) {
          const sx = ink.x + (Math.random() - 0.5) * ink.w * 0.8;
          const sy = ink.y + (Math.random() - 0.5) * ink.h * 0.8;
          ctx.beginPath();
          ctx.ellipse(sx, sy, 15 + Math.random() * 20, 10 + Math.random() * 15, Math.random() * Math.PI, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalAlpha = 1;
        ctx.restore();
      }

      // Printer Boss: cutscene text
      if (printerBossPhase >= 1 && printerBossPhase <= 4) {
        ctx.save();
        // Darken screen slightly
        ctx.fillStyle = 'rgba(0,0,0,0.3)';
        ctx.fillRect(0, 0, 960, 540);

        // Fade TYM text/timer out in phase 1
        if (printerBossPhase === 1) {
          const fadeT = printerBossTimer / 90;
          // The TYM HUD fades based on this — handled by the HUD check
        }

        // Text above printer
        ctx.font = 'bold 28px Arial';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#ffffff';
        const textY = cpu.y - 100;
        let text = '';
        let textAlpha = 1;
        if (printerBossPhase === 1) {
          text = 'ENOUGH.';
          textAlpha = Math.min(1, (90 - printerBossTimer) / 20) * Math.min(1, printerBossTimer / 15);
        } else if (printerBossPhase === 2) {
          text = 'FOR EONS I HAVE SUFFERED.';
          textAlpha = Math.min(1, (120 - printerBossTimer) / 20) * Math.min(1, printerBossTimer / 15);
        } else if (printerBossPhase === 3) {
          text = 'NOW YOU SHALL KNOW MY AGONY.';
          textAlpha = Math.min(1, (120 - printerBossTimer) / 20) * Math.min(1, printerBossTimer / 15);
        } else if (printerBossPhase === 4) {
          // Growth animation — no text, just shake
        }
        if (text) {
          ctx.globalAlpha = textAlpha;
          ctx.fillText(text, cpu.x, textY);
          ctx.globalAlpha = 1;
        }
        ctx.restore();
      }

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
      stopFightMusic();
      ctx.save();
      if (cpu && cpu.char && cpu.char.isTheCountFinal) {
        // Full black background after The Count's death — nothing else
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, 960, 540);
      } else if (rumbleType === 'DUPLAIRE' && rumbleDuplaireZoom >= 1) {
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
      if (rumbleBozollokSkeleton) drawBozollokSkeleton(rumbleBozollokSkeleton.x, rumbleBozollokSkeleton.groundY, rumbleBozollokSkeleton.collapseT);
      }
      if (!(cpu && cpu.char && cpu.char.isTheCountFinal)) drawHUD();
      ctx.restore();
      drawVictoryScreen();
      break;
  }
}

