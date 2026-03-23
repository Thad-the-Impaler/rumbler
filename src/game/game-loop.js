function gameLoop() {
  try {
    update();
    draw();
  } catch (e) {
    console.error('Game loop error:', e);
    // Reset canvas state to prevent save/restore stack corruption
    ctx.restore();
    ctx.save();
    ctx.restore();
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
  }
  requestAnimationFrame(gameLoop);
}

function resize() {
  const ratio = 960 / 540;
  let w = window.innerWidth;
  let h = window.innerHeight;
  if (w / h > ratio) {
    w = h * ratio;
  } else {
    h = w / ratio;
  }
  canvas.style.width = w + 'px';
  canvas.style.height = h + 'px';
  canvas.style.marginTop = ((window.innerHeight - h) / 2) + 'px';
}


window.addEventListener('resize', resize);
resize();

gameLoop();
