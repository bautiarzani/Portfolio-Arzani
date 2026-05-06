/* ===== CUSTOM CURSOR ===== */
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

if (cursor && follower) {
  let mx = 0, my = 0, fx = 0, fy = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    cursor.style.left = mx + 'px';
    cursor.style.top  = my + 'px';
  });

  function animateFollower() {
    fx += (mx - fx) * 0.12;
    fy += (my - fy) * 0.12;
    follower.style.left = fx + 'px';
    follower.style.top  = fy + 'px';
    requestAnimationFrame(animateFollower);
  }
  animateFollower();

  const hoverables = 'a, button, .skill-tag, .project-card, .timeline-item';
  document.querySelectorAll(hoverables).forEach(el => {
    el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
    el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
  });
}

/* ===== NAVIGATION ===== */
const nav        = document.getElementById('nav');
const toggle     = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');

toggle?.addEventListener('click', () => {
  const open = toggle.classList.toggle('active');
  mobileMenu.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
});

document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});


/* ===== SCROLL REVEAL ===== */
(function initReveal() {
  const targets = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
  const images  = document.querySelectorAll('.project-image');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        obs.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  const imgObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        imgObs.unobserve(e.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(t => obs.observe(t));
  images.forEach(img => imgObs.observe(img));
})();

/* ===== HERO TEXT STAGGER ===== */
(function heroStagger() {
  const heroName = document.querySelector('.hero-name');
  if (heroName) {
    const lines = heroName.querySelectorAll('.name-line');
    lines.forEach(line => {
      const outer = document.createElement('span');
      outer.className = 'name-word' + (line.classList.contains('italic') ? ' italic' : '');
      const inner = document.createElement('span');
      inner.className = 'name-word-inner';
      inner.textContent = line.textContent;
      outer.appendChild(inner);
      line.replaceWith(outer);
    });
    heroName.classList.remove('reveal-up');
    heroName.classList.add('anim-ready');
    requestAnimationFrame(() => requestAnimationFrame(() => {
      heroName.classList.add('visible');
    }));
  }

  const items = document.querySelectorAll('.hero-content .reveal-up');
  items.forEach((el, i) => {
    el.style.transitionDelay = `${0.35 + i * 0.13}s`;
    requestAnimationFrame(() => requestAnimationFrame(() => el.classList.add('visible')));
  });
})();

/* ===== HERO PARALLAX ===== */
(function heroParallax() {
  const heroContent = document.querySelector('.hero-content');
  if (!heroContent) return;
  const vh = window.innerHeight;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    if (y < vh) heroContent.style.transform = `translateY(${y * 0.18}px)`;
  }, { passive: true });
})();

/* ===== ACTIVE NAV LINK ===== */
(function activeNav() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-link');

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        links.forEach(l => l.classList.remove('active'));
        const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
        active?.classList.add('active');
      }
    });
  }, { threshold: 0.4 });

  sections.forEach(s => obs.observe(s));
})();
