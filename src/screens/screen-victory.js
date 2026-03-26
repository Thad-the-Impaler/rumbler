function drawVictoryScreen() {
  ctx.fillStyle = 'rgba(0,0,0,0.6)';
  ctx.fillRect(0, 0, 960, 540);

  const winnerChar = winner === 'player' ? selectedPlayer : selectedCPU;
  const label = winner === 'player' ? 'YOU WIN!' : 'CPU WINS!';

  ctx.font = 'bold 64px Arial';
  ctx.textAlign = 'center';

  // Glow
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
    if (winner === 'player') {
      const campaign = campaigns[campaignId];
      const nextIdx = campaignFightIndex + 1;
      if (nextIdx < campaign.fights.length && campaign.fights[nextIdx] !== null) {
        ctx.fillText('Press ENTER for next fight', 480, 360);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#888';
        ctx.fillText('Fight ' + (campaignFightIndex + 1) + ' of ' + campaign.fights.filter(f => f !== null).length + ' complete', 480, 395);
      } else {
        ctx.fillStyle = '#ffcc00';
        ctx.fillText('CAMPAIGN COMPLETE!', 480, 360);
        ctx.font = '16px Arial';
        ctx.fillStyle = '#888';
        ctx.fillText('Press ENTER to return to title', 480, 395);
      }
    } else {
      ctx.fillStyle = '#ff4444';
      ctx.fillText('CAMPAIGN OVER', 480, 360);
      ctx.font = '16px Arial';
      ctx.fillStyle = '#888';
      ctx.fillText('Press ENTER to return to title', 480, 395);
    }
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Press ESC to return to title', 480, 430);
  } else if (gameMode === 'rumblePractice') {
    ctx.fillText('Press ENTER to retry', 480, 380);
    ctx.font = '14px Arial';
    ctx.fillStyle = '#666';
    ctx.fillText('Press ESC to return to title', 480, 410);
  } else {
    ctx.fillText('Press ENTER to return to title', 480, 380);
  }
}

