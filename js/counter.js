// js/counter.js — Animated number counters that fire on viewport entry

(function () {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function format(el, value) {
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    return prefix + Math.round(value) + suffix;
  }

  function run(el) {
    const target = parseFloat(el.dataset.target) || 0;
    const duration = 1500;

    if (reduceMotion) {
      el.textContent = format(el, target);
      return;
    }

    const start = performance.now();

    function frame(now) {
      const t = Math.min((now - start) / duration, 1);
      // easeOutExpo
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      el.textContent = format(el, target * eased);
      if (t < 1) requestAnimationFrame(frame);
      else el.textContent = format(el, target);
    }
    requestAnimationFrame(frame);
  }

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          run(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach(function (el) {
    observer.observe(el);
  });
})();
