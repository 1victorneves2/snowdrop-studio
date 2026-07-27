// js/progress.js — Scroll progress bar + vertical process timeline fill

(function () {
  const bar       = document.getElementById('scrollProgress');
  const track     = document.getElementById('processTrack');
  const railFill  = document.getElementById('processRailFill');
  const steps     = track ? Array.from(track.querySelectorAll('[data-step]')) : [];

  let ticking = false;

  function update() {
    ticking = false;

    // ── 1. Page scroll progress bar ──
    if (bar) {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = 'scaleX(' + Math.min(Math.max(pct, 0), 1) + ')';
    }

    // ── 2. Process timeline fill ──
    if (track && railFill) {
      const rect = track.getBoundingClientRect();
      const refLine = window.innerHeight * 0.58; // fill follows a line ~58% down
      const raw = (refLine - rect.top) / rect.height;
      const pct = Math.min(Math.max(raw, 0), 1);
      railFill.style.height = (pct * 100) + '%';

      const fillBottomY = rect.top + rect.height * pct;
      steps.forEach(function (step) {
        const dot = step.querySelector('.process-dot');
        const dotRect = dot.getBoundingClientRect();
        const reached = dotRect.top + dotRect.height / 2 <= fillBottomY;
        dot.classList.toggle('active', reached);
        step.classList.toggle('lit', reached);
      });
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
})();
