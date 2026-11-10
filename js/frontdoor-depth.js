/* Subtle pointer depth for the workshop image. Text and controls stay still. */
(() => {
  const hero = document.getElementById('hero');
  if (!hero || !window.matchMedia('(pointer: fine)').matches) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0;
  let x = 0;
  let y = 0;

  const draw = () => {
    frame = 0;
    const dx = reducedMotion.matches ? 0 : x * 8;
    const dy = reducedMotion.matches ? 0 : y * 6;
    hero.style.setProperty('--hero-shift-x', `${dx.toFixed(1)}px`);
    hero.style.setProperty('--hero-shift-y', `${dy.toFixed(1)}px`);
  };
  const queueDraw = () => { if (!frame) frame = window.requestAnimationFrame(draw); };

  hero.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches) return;
    const bounds = hero.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, (event.clientX - bounds.left) / bounds.width * 2 - 1));
    y = Math.max(-1, Math.min(1, (event.clientY - bounds.top) / bounds.height * 2 - 1));
    queueDraw();
  }, { passive: true });
  hero.addEventListener('pointerleave', () => { x = 0; y = 0; queueDraw(); });
  reducedMotion.addEventListener('change', queueDraw);
})();
