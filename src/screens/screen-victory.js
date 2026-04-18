function drawVictoryScreen() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, 960, 540);

  ctx.textAlign = 'center';

  if (gameMode === 'campaign' && testYourMightActive) {
    // Bonus fight results — no standard winner text
    ctx.font = 'bold 40px Arial';
    ctx.fillStyle = '#ffcc00';
    ctx.shadowColor = '#ff6600';
    ctx.shadowBlur = 15;
    ctx.fillText('TEST YOUR MIGHT', 480, 180);
    ctx.shadowBlur = 0;

    ctx.font = 'bold 56px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(Math.floor(testYourMightDamage) + ' DAMAGE', 480, 260);

    const dmg = testYourMightDamage;
    const rating = dmg >= 500 ? 'INCREDIBLE!' : dmg >= 300 ? 'IMPRESSIVE!' : dmg >= 150 ? 'NICE WORK!' : dmg >= 50 ? 'NOT BAD' : 'WEAK...';
    const ratingColor = dmg >= 500 ? '#ff00ff' : dmg >= 300 ? '#ffcc00' : dmg >= 150 ? '#44ff44' : dmg >= 50 ? '#aaaaaa' : '#ff4444';
    ctx.font = 'bold 28px Arial';
    ctx.fillStyle = ratingColor;
    ctx.fillText(rating, 480, 320);

    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = '#ffcc00';
    ctx.fillText('CAMPAIGN COMPLETE!', 480, 380);

    ctx.font = '16px Arial';
    ctx.fillStyle = '#888';
    ctx.fillText('Press ENTER to return to title', 480, 420);
  } else {
    // Standard winner display
    const winnerChar = winner === 'player' ? selectedPlayer : selectedCPU;
    const label = winner === 'player' ? 'YOU WIN!' : 'CPU WINS!';

    ctx.font = 'bold 64px Arial';
    ctx.shadowColor = winnerChar.accent;
    ctx.shadowBlur = 30;
    ctx.fillStyle = winnerChar.accent;
    ctx.fillText(label, 480, 220);
    ctx.shadowBlur = 0;

    ctx.font = 'bold 36px Arial';
    ctx.fillStyle = winnerChar.color;
    ctx.fillText(winnerChar.name, 480, 280);

    ctx.font = '20px Arial';
    ctx.fillStyle = '#aaa';
    if (gameMode === 'campaign') {
      const campaign = campaigns[campaignId];
      if (campaign && campaign.infinite) {
        // Infinite mode — show win streak
        const streak = campaignFightIndex + (winner === 'player' ? 1 : 0);
        if (winner === 'player') {
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = '#ffcc00';
          ctx.fillText('WIN STREAK: ' + streak, 480, 340);
          // Show stage unlock notification
          const justBeat = campaign.fights[campaignFightIndex];
          if (justBeat && justBeat.unlocksTent) {
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#cc3333';
            ctx.shadowColor = '#cc3333';
            ctx.shadowBlur = 10;
            ctx.fillText('NEW STAGE UNLOCKED: THE TENT', 480, 365);
            ctx.shadowBlur = 0;
            ctx.font = '18px Arial';
            ctx.fillStyle = '#aaa';
            ctx.fillText('Press ENTER for next fight', 480, 390);
          } else {
            ctx.font = '18px Arial';
            ctx.fillStyle = '#aaa';
            ctx.fillText('Press ENTER for next fight', 480, 375);
          }
        } else {
          ctx.font = 'bold 24px Arial';
          ctx.fillStyle = '#ff4444';
          ctx.fillText('GAME OVER', 480, 340);
          ctx.font = '20px Arial';
          ctx.fillStyle = '#ffcc00';
          ctx.fillText('FINAL STREAK: ' + streak, 480, 375);
          ctx.font = '16px Arial';
          ctx.fillStyle = '#888';
          ctx.fillText('Press ENTER to return to title', 480, 405);
        }
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Press ESC to return to title', 480, 435);
      } else if (winner === 'player') {
        const nextIdx = campaignFightIndex + 1;
        // Don't count bonus fights in the progress display
        const realFights = campaign.fights.filter(f => !f.isBonus);
        const trueCount = realFights.length;
        // Hide true count until reveal threshold is reached
        const realCount = (campaign.displayFightCount && campaignFightIndex < campaign.revealAtFight) ? campaign.displayFightCount : trueCount;
        const nextFight = campaign.fights[nextIdx];
        if (nextIdx < campaign.fights.length && nextFight) {
          if (nextFight.isBonus) {
            ctx.fillText('Press ENTER for bonus challenge', 480, 360);
          } else {
            ctx.fillText('Press ENTER for next fight', 480, 360);
          }
          ctx.font = '16px Arial';
          ctx.fillStyle = '#888';
          ctx.fillText('Fight ' + Math.min(campaignFightIndex + 1, realCount) + ' of ' + realCount + ' complete', 480, 395);
        } else {
          ctx.fillStyle = '#ffcc00';
          ctx.fillText('CAMPAIGN COMPLETE!', 480, 360);
          // Stage unlock notification
          if (campaignId === 'warrior') {
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#ff6b35';
            ctx.shadowColor = '#ff6b35';
            ctx.shadowBlur = 10;
            ctx.fillText('NEW STAGE UNLOCKED: THE DUST', 480, 390);
            ctx.shadowBlur = 0;
            ctx.font = '16px Arial';
            ctx.fillStyle = '#888';
            ctx.fillText('Press ENTER to return to title', 480, 415);
          } else if (campaignId === 'champion') {
            ctx.font = 'bold 16px Arial';
            ctx.fillStyle = '#aa44ff';
            ctx.shadowColor = '#aa44ff';
            ctx.shadowBlur = 10;
            ctx.fillText('NEW STAGE UNLOCKED: THE PULP', 480, 390);
            ctx.shadowBlur = 0;
            ctx.font = '16px Arial';
            ctx.fillStyle = '#888';
            ctx.fillText('Press ENTER to return to title', 480, 415);
          } else {
            ctx.font = '16px Arial';
            ctx.fillStyle = '#888';
            ctx.fillText('Press ENTER to return to title', 480, 395);
          }
        }
      } else {
        ctx.fillStyle = '#ff4444';
        ctx.fillText('CAMPAIGN OVER', 480, 360);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#888';
        ctx.fillText('Press ENTER to return to title', 480, 395);
      }
      if (!campaign.infinite) {
        ctx.font = '14px Arial';
        ctx.fillStyle = '#666';
        ctx.fillText('Press ESC to return to title', 480, 430);
      }
    } else if (gameMode === 'rumblePractice') {
      ctx.fillText('Press ENTER to retry', 480, 380);
      ctx.font = '14px Arial';
      ctx.fillStyle = '#666';
      ctx.fillText('Press ESC to return to title', 480, 410);
    } else {
      ctx.fillText('Press ENTER to return to title', 480, 380);
    }
  }
}

