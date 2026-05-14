/* ===== OPTICS HUB — main.js ===== */

/* ── Background particle canvas ── */
(function initBg() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, particles = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function initParticles() {
    particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.2 + 0.3,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      hue: Math.random() * 360,
    }));
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${p.hue},70%,70%,0.35)`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  }

  resize();
  initParticles();
  draw();
  window.addEventListener('resize', () => { resize(); initParticles(); });
})();


/* ── Prism ray animation (home page only) ── */
(function initPrism() {
  const rayIn = document.querySelector('.ray-in');
  const raysOut = document.querySelectorAll('.ray-out');
  const conceptGroup = document.getElementById('concept-group');
  if (!rayIn) return;

  function setDash(el, len) {
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
  }

  // Prepare dash arrays
  setDash(rayIn, 230);
  raysOut.forEach(r => setDash(r, 420));

  // Animate in sequence
  setTimeout(() => {
    // 1. White ray enters
    rayIn.style.transition = 'opacity 0s';
    rayIn.style.opacity = '1';
    rayIn.style.transition = 'stroke-dashoffset 0.5s ease';
    rayIn.style.strokeDashoffset = '0';

    // 2. Coloured rays emerge
    raysOut.forEach((r, i) => {
      setTimeout(() => {
        r.style.transition = 'opacity 0s';
        r.style.opacity = '1';
        r.style.transition = 'stroke-dashoffset 0.55s ease';
        r.style.strokeDashoffset = '0';
      }, 550 + i * 80);
    });

    // 3. Labels fade in
    setTimeout(() => {
      conceptGroup.style.transition = 'opacity 0.6s ease';
      conceptGroup.style.opacity = '1';
    }, 550 + raysOut.length * 80 + 200);
  }, 800);
})();
