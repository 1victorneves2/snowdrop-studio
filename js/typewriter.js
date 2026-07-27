// js/typewriter.js — Cycling word animation in the hero headline

(function () {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const words = ['build', 'ship', 'grow', 'create'];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  const TYPING_SPEED  = 90;
  const DELETING_SPEED = 55;
  const PAUSE_AFTER   = 1800;
  const PAUSE_BEFORE  = 300;

  function tick() {
    const current = words[wordIndex];

    if (!isDeleting) {
      charIndex++;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(tick, PAUSE_AFTER);
        return;
      }
    } else {
      charIndex--;
      el.textContent = current.slice(0, charIndex);

      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(tick, PAUSE_BEFORE);
        return;
      }
    }

    setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
  }

  // Start after hero fade-in
  setTimeout(tick, 1400);
})();
