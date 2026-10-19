/* Small, pointer-driven echo of the original cube field. No animation on touch or reduced motion. */
(() => {
  const section = document.getElementById('project-request');
  if (!section || !window.matchMedia('(pointer: fine)').matches) return;

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const far = section.querySelector('[data-depth="far"]');
  const near = section.querySelector('[data-depth="near"]');
  if (!far || !near) return;

  let frame = 0;
  let x = 0;
  let y = 0;

  function draw() {
    frame = 0;
    const activeX = reducedMotion.matches ? 0 : x;
    const activeY = reducedMotion.matches ? 0 : y;
    far.setAttribute('transform', `translate(${(-activeX * 11).toFixed(1)} ${(-activeY * 8).toFixed(1)})`);
    near.setAttribute('transform', `translate(${(activeX * 23).toFixed(1)} ${(activeY * 17).toFixed(1)})`);
  }

  function queueDraw() {
    if (!frame) frame = requestAnimationFrame(draw);
  }

  section.addEventListener('pointermove', (event) => {
    if (reducedMotion.matches) return;
    const bounds = section.getBoundingClientRect();
    x = Math.max(-1, Math.min(1, ((event.clientX - bounds.left) / bounds.width - .5) * 2));
    y = Math.max(-1, Math.min(1, ((event.clientY - bounds.top) / bounds.height - .5) * 2));
    queueDraw();
  }, { passive: true });

  section.addEventListener('pointerleave', () => {
    x = 0;
    y = 0;
    queueDraw();
  });

  reducedMotion.addEventListener('change', queueDraw);
})();
