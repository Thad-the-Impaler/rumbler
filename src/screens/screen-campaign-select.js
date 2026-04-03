function drawCampaignSelectScreen() {
  // Background
  const grad = ctx.createLinearGradient(0, 0, 0, 540);
  grad.addColorStop(0, '#0a0a1a');
  grad.addColorStop(0.5, '#1a0a2e');
  grad.addColorStop(1, '#0a1a2e');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 960, 540);

  // Title
  ctx.font = 'bold 42px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#ff6b35';
  ctx.fillText('SELECT CAMPAIGN', 480, 80);

  // Decorative line
  ctx.strokeStyle = '#ff450066';
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(250, 100);
  ctx.lineTo(710, 100);
  ctx.stroke();

  // Campaign cards
  const keys = campaignKeys;
  for (let i = 0; i < keys.length; i++) {
    const campaign = campaigns[keys[i]];
    const selected = i === campaignSelectCursor;
    const y = 160 + i * 120;
    const pulse = selected ? Math.sin(Date.now() * 0.004) * 0.5 + 0.5 : 0;

    // Card background
    ctx.fillStyle = selected ? 'rgba(255,69,0,0.15)' : 'rgba(255,255,255,0.03)';
    ctx.beginPath();
    ctx.roundRect(180, y, 600, 100, 10);
    ctx.fill();

    // Card border
    ctx.strokeStyle = selected
      ? `rgba(255,${150 + pulse * 105},0,${0.6 + pulse * 0.4})`
      : 'rgba(255,255,255,0.08)';
    ctx.lineWidth = selected ? 2 : 1;
    ctx.beginPath();
    ctx.roundRect(180, y, 600, 100, 10);
    ctx.stroke();

    // Campaign name
    ctx.font = 'bold 28px Arial';
    ctx.textAlign = 'left';
    ctx.fillStyle = selected ? `rgba(255,${150 + pulse * 105},0,1)` : '#666';
    ctx.fillText(campaign.name, 210, y + 40);

    // Description
    ctx.font = '16px Arial';
    ctx.fillStyle = selected ? '#aaa' : '#555';
    ctx.fillText(campaign.desc, 210, y + 65);

    // Fight count (respect hidden count)
    const realTotal = campaign.fights.filter(f => !f.isBonus).length;
    const totalFights = campaign.displayFightCount || realTotal;
    ctx.font = '14px Arial';
    ctx.textAlign = 'right';
    ctx.fillStyle = selected ? '#888' : '#444';
    ctx.fillText(totalFights + ' fights', 760, y + 40);

    // Selection arrow
    if (selected) {
      ctx.font = 'bold 20px Arial';
      ctx.textAlign = 'right';
      ctx.fillStyle = '#ff6b35';
      ctx.fillText('>', 200, y + 42);
    }
  }

  // Footer
  ctx.font = '14px Arial';
  ctx.textAlign = 'center';
  ctx.fillStyle = '#555';
  ctx.fillText('Press ENTER to begin  |  ESC to go back', 480, 480);

  // Show selected player + assist info
  if (selectedPlayer) {
    ctx.font = '14px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = '#666';
    const assistName = selectedAssist ? selectedAssist.name : 'None';
    ctx.fillText('Fighter: ' + selectedPlayer.name + '  |  Assist: ' + assistName, 480, 510);
  }
}
