// js/reveal.js — Scroll-triggered reveal with sibling stagger + hero tagline line

(function () {
  // ── Hero tagline ice-line: grow on load ──
  const taglineLine = document.getElementById('taglineLine');
  if (taglineLine) {
    requestAnimationFrame(function () {
      requestAnimationFrame(function () { taglineLine.classList.add('grown'); });
    });
  }

  // ── Scroll reveal ──
  const items = Array.from(document.querySelectorAll('[data-reveal]'));
  if (!items.length) return;

  // Stagger: delay each item by its index among [data-reveal] siblings.
  items.forEach(function (el) {
    const siblings = Array.from(el.parentElement.children)
      .filter(function (c) { return c.hasAttribute('data-reveal'); });
    const index = siblings.indexOf(el);
    if (index > 0) {
      el.style.transitionDelay = Math.min(index, 6) * 90 + 'ms';
    }
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -8% 0px' }
  );

  items.forEach(function (el) { observer.observe(el); });
})();
