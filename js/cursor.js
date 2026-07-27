// js/cursor.js — Custom cursor: a small dot with light lag + an expanding ring.
// Disabled on touch / coarse-pointer devices and when reduced motion is requested.

(function () {
  const fine = window.matchMedia('(pointer: fine)').matches;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!fine || reduceMotion) return;

  const dot  = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;

  document.documentElement.classList.add('cursor-enabled');

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let dotX = mouseX, dotY = mouseY;
  let ringX = mouseX, ringY = mouseY;

  window.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function lerp(a, b, n) { return a + (b - a) * n; }

  function loop() {
    dotX = lerp(dotX, mouseX, 0.35);
    dotY = lerp(dotY, mouseY, 0.35);
    ringX = lerp(ringX, mouseX, 0.16);
    ringY = lerp(ringY, mouseY, 0.16);

    dot.style.left = dotX + 'px';
    dot.style.top = dotY + 'px';
    ring.style.left = ringX + 'px';
    ring.style.top = ringY + 'px';

    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // Interactive elements expand the ring
  const interactiveSel = 'a, button, [data-cursor], input, textarea, label';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSel)) {
      ring.classList.add('is-active');
      dot.classList.add('is-active');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSel)) {
      ring.classList.remove('is-active');
      dot.classList.remove('is-active');
    }
  });

  document.addEventListener('mousedown', function () { ring.classList.add('is-down'); });
  document.addEventListener('mouseup', function () { ring.classList.remove('is-down'); });

  // Hide when leaving the window
  document.addEventListener('mouseleave', function () {
    dot.style.opacity = '0';
    ring.style.opacity = '0';
  });
  document.addEventListener('mouseenter', function () {
    dot.style.opacity = '';
    ring.style.opacity = '';
  });
})();
