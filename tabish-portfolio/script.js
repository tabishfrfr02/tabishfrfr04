// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Nav scroll state =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ===== Mobile nav (simple toggle) =====
const burger = document.getElementById('navBurger');
const navLinks = document.querySelector('.nav-links');
burger?.addEventListener('click', () => {
  const open = navLinks.style.display === 'flex';
  navLinks.style.display = open ? 'none' : 'flex';
  navLinks.style.cssText += 'flex-direction:column; position:fixed; top:64px; right:24px; background:#12151f; border:1px solid rgba(255,255,255,0.09); padding:20px; gap:16px; z-index:200;';
});
document.querySelectorAll('.nav-links a').forEach(a => {
  a.addEventListener('click', () => { if (window.innerWidth <= 860) navLinks.style.display = 'none'; });
});

// ===== Cursor glow (desktop only) =====
const glow = document.getElementById('cursorGlow');
if (glow && window.matchMedia('(min-width:900px)').matches) {
  window.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
  }, { passive: true });
}

// ===== Typewriter hero subtitle =====
const typeTarget = document.getElementById('typeTarget');
const phrases = [
  'Video Editor',
  'UI / Motion Animation',
  'Content Writer',
  'DaVinci Resolve'
];
let pIndex = 0, cIndex = 0, deleting = false;
function typeLoop() {
  if (!typeTarget) return;
  const current = phrases[pIndex];
  if (!deleting) {
    cIndex++;
    typeTarget.textContent = current.slice(0, cIndex);
    if (cIndex === current.length) {
      deleting = true;
      setTimeout(typeLoop, 1400);
      return;
    }
  } else {
    cIndex--;
    typeTarget.textContent = current.slice(0, cIndex);
    if (cIndex === 0) {
      deleting = false;
      pIndex = (pIndex + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 35 : 65);
}
typeLoop();

// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Skill bar fill =====
const bars = document.querySelectorAll('.bar-fill');
const barObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      el.style.width = el.dataset.pct + '%';
      barObserver.unobserve(el);
    }
  });
}, { threshold: 0.4 });
bars.forEach(b => barObserver.observe(b));

// ===== Feature video play/pause =====
const featureVideo = document.getElementById('featureVideo');
const playFeature = document.getElementById('playFeature');
if (featureVideo && playFeature) {
  playFeature.addEventListener('click', () => {
    if (featureVideo.paused) {
      featureVideo.play();
      playFeature.classList.add('is-playing');
    } else {
      featureVideo.pause();
      playFeature.classList.remove('is-playing');
    }
  });
  featureVideo.addEventListener('pause', () => playFeature.classList.remove('is-playing'));
  featureVideo.addEventListener('play', () => playFeature.classList.add('is-playing'));
}

// ===== Project card video play/pause + hover preview =====
document.querySelectorAll('.project-card').forEach(card => {
  const video = card.querySelector('video');
  const btn = card.querySelector('.pc-play');
  if (!video || !btn) return;

  btn.addEventListener('click', () => {
    if (video.paused) { video.play(); btn.classList.add('is-playing'); }
    else { video.pause(); btn.classList.remove('is-playing'); }
  });
  video.addEventListener('pause', () => btn.classList.remove('is-playing'));
  video.addEventListener('play', () => btn.classList.add('is-playing'));

  const media = card.querySelector('.pc-media');
  if (window.matchMedia('(hover:hover)').matches) {
    media.addEventListener('mouseenter', () => { video.play().catch(()=>{}); btn.classList.add('is-playing'); });
    media.addEventListener('mouseleave', () => { video.pause(); video.currentTime = 0; btn.classList.remove('is-playing'); });
  }
});

// ===== Pause offscreen videos =====
const allVideos = document.querySelectorAll('video');
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting && !entry.target.paused) {
      entry.target.pause();
    }
  });
}, { threshold: 0 });
allVideos.forEach(v => videoObserver.observe(v));

// ===== HUD canvas background (hero) =====
const canvas = document.getElementById('hudCanvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let w, h, particles = [];
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = window.innerWidth < 700 ? 26 : 55;
  function initParticles() {
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      hue: Math.random() > 0.5 ? 'gold' : 'violet'
    }));
  }
  initParticles();

  function draw() {
    ctx.clearRect(0, 0, w, h);

    // grid
    ctx.strokeStyle = 'rgba(255,255,255,0.035)';
    ctx.lineWidth = 1;
    const gap = 64 * devicePixelRatio;
    for (let x = 0; x < w; x += gap) {
      ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke();
    }
    for (let y = 0; y < h; y += gap) {
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
    }

    // particles + connections
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
      ctx.fillStyle = p.hue === 'gold' ? 'rgba(245,166,35,0.55)' : 'rgba(178,76,255,0.5)';
      ctx.fill();
    });

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 140 * devicePixelRatio;
        if (dist < maxDist) {
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(178,76,255,${0.08 * (1 - dist / maxDist)})`;
          ctx.stroke();
        }
      }
    }

    if (!reduceMotion) requestAnimationFrame(draw);
  }
  draw();
}
