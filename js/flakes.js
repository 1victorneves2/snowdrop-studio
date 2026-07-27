// js/flakes.js — Ambient snow with simple depth parallax.
// Three layers: near (larger, faster, more opaque) → far (tiny, slow, faint).

(function () {
  const container = document.getElementById('heroBg');
  if (!container) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // [count, sizeMin, sizeMax, durMin, durMax, opMin, opMax, parallax]
  const layers = [
    { name: 'far',  count: 14, sMin: 1, sMax: 2.5, dMin: 16, dMax: 24, oMin: 0.04, oMax: 0.12, par: 0.04 },
    { name: 'mid',  count: 12, sMin: 2, sMax: 4,   dMin: 11, dMax: 17, oMin: 0.10, oMax: 0.22, par: 0.10 },
    { name: 'near', count: 8,  sMin: 4, sMax: 7,   dMin: 7,  dMax: 12, oMin: 0.18, oMax: 0.34, par: 0.20 },
  ];

  const layerEls = [];

  layers.forEach(function (layer) {
    const wrap = document.createElement('div');
    wrap.className = 'flake-layer flake-layer--' + layer.name;
    wrap.style.cssText = 'position:absolute;inset:0;will-change:transform;';
    wrap.dataset.par = layer.par;

    for (let i = 0; i < layer.count; i++) {
      const flake = document.createElement('div');
      flake.className = 'flake';
      const size = Math.random() * (layer.sMax - layer.sMin) + layer.sMin;
      const duration = Math.random() * (layer.dMax - layer.dMin) + layer.dMin;
      const delay = Math.random() * 14;
      const left = Math.random() * 100;
      const opacity = Math.random() * (layer.oMax - layer.oMin) + layer.oMin;

      flake.style.cssText = [
        'width:' + size + 'px',
        'height:' + size + 'px',
        'left:' + left + '%',
        'top:' + (Math.random() * 8) + '%',
        'animation-duration:' + duration + 's',
        'animation-delay:' + delay + 's',
        'opacity:' + opacity,
      ].join(';');

      wrap.appendChild(flake);
    }

    container.appendChild(wrap);
    layerEls.push(wrap);
  });

  // Simple scroll parallax
  if (!reduceMotion) {
    let ticking = false;
    window.addEventListener('scroll', function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        const y = window.scrollY;
        layerEls.forEach(function (el) {
          el.style.transform = 'translateY(' + (y * parseFloat(el.dataset.par)) + 'px)';
        });
        ticking = false;
      });
    }, { passive: true });
  }
})();
