(function () {
  function drawBackground(ctx, width, height, time) {
    ctx.save();
    const sky = ctx.createLinearGradient(0, 0, 0, height);
    sky.addColorStop(0, '#21164f');
    sky.addColorStop(0.55, '#c34f63');
    sky.addColorStop(1, '#f2a45d');
    ctx.fillStyle = sky;
    ctx.fillRect(0, 0, width, height);

    const drift = (time || 0) * 3;
    ctx.globalAlpha = 0.35;
    ctx.fillStyle = '#ffd98a';
    for (let i = 0; i < 18; i += 1) {
      const x = ((i * 83 + drift) % (width + 30)) - 15;
      const y = 38 + ((i * 47) % Math.max(90, height * 0.42));
      ctx.fillRect(x, y, 2, 2);
    }
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#ffe8a3';
    ctx.beginPath();
    ctx.arc(width * 0.22, height * 0.2, Math.min(width, height) * 0.075, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#ffbd63';
    ctx.beginPath();
    ctx.arc(width * 0.78, height * 0.29, Math.min(width, height) * 0.05, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = '#713552';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.68);
    for (let x = 0; x <= width; x += 32) {
      ctx.lineTo(x, height * 0.61 + ((x * 17) % 47));
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#a84e4e';
    ctx.beginPath();
    ctx.moveTo(0, height * 0.78);
    for (let x = 0; x <= width; x += 28) {
      ctx.lineTo(x, height * 0.71 + ((x * 11) % 34));
    }
    ctx.lineTo(width, height);
    ctx.lineTo(0, height);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawGround(ctx, width, height, groundHeight, offset) {
    ctx.save();
    const top = height - groundHeight;
    ctx.fillStyle = '#3a2433';
    ctx.fillRect(0, top, width, groundHeight);
    ctx.fillStyle = '#d47a4d';
    ctx.fillRect(0, top, width, 7);
    ctx.strokeStyle = '#1b1522';
    ctx.lineWidth = 2;
    const slide = ((offset || 0) % 32 + 32) % 32;
    for (let x = -32 - slide; x < width + 32; x += 32) {
      ctx.beginPath();
      ctx.moveTo(x, top + 7);
      ctx.lineTo(x + 18, height);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawBird(ctx, x, y, size, velocity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.max(-0.3, Math.min(0.5, velocity / 900)));
    const s = size;
    ctx.lineWidth = Math.max(2, s * 0.07);
    ctx.strokeStyle = '#171525';
    ctx.fillStyle = '#e6e9f4';
    ctx.beginPath();
    ctx.moveTo(-s * 0.47, s * 0.12);
    ctx.lineTo(-s * 0.18, -s * 0.27);
    ctx.lineTo(s * 0.43, -s * 0.2);
    ctx.lineTo(s * 0.5, s * 0.08);
    ctx.lineTo(s * 0.2, s * 0.3);
    ctx.lineTo(-s * 0.35, s * 0.31);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ef6b56';
    ctx.beginPath();
    ctx.moveTo(-s * 0.05, -s * 0.2);
    ctx.lineTo(s * 0.48, -s * 0.04);
    ctx.lineTo(-s * 0.02, s * 0.05);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#2a7de1';
    ctx.beginPath();
    ctx.moveTo(-s * 0.28, -s * 0.18);
    ctx.lineTo(-s * 0.05, -s * 0.48);
    ctx.lineTo(s * 0.13, -s * 0.2);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = '#ffd96a';
    ctx.beginPath();
    ctx.arc(s * 0.16, -s * 0.08, s * 0.055, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  function drawPipe(ctx, x, gapTop, gapBottom, pipeWidth, height) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.strokeStyle = '#171525';
    ctx.fillStyle = '#39c7d4';
    ctx.fillRect(x, 0, pipeWidth, gapTop);
    ctx.strokeRect(x + 1.5, 0, pipeWidth - 3, gapTop);
    ctx.fillRect(x, gapBottom, pipeWidth, height - gapBottom);
    ctx.strokeRect(x + 1.5, gapBottom, pipeWidth - 3, height - gapBottom);
    ctx.fillStyle = '#e85b69';
    const beam = Math.min(10, pipeWidth * 0.2);
    ctx.fillRect(x, Math.max(0, gapTop - beam), pipeWidth, beam);
    ctx.strokeRect(x + 1.5, Math.max(0, gapTop - beam), pipeWidth - 3, beam);
    ctx.fillRect(x, gapBottom, pipeWidth, beam);
    ctx.strokeRect(x + 1.5, gapBottom, pipeWidth - 3, beam);
    ctx.restore();
  }

  window.SPRITES = { drawBackground, drawGround, drawBird, drawPipe };
})();
