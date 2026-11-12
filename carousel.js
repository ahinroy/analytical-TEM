const stage = document.querySelector('.carousel-stage');
const cards = [...stage.querySelectorAll('.data-card')];
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
let angle = 0;
let lastTime = 0;
let frame;
let paused = false;

function renderCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const radius = Math.min(170, Math.max(45, (stage.clientWidth - cardWidth) / 2));
  cards.forEach((card, index) => {
    const position = angle + index * (2 * Math.PI / cards.length);
    const depth = (Math.cos(position) + 1) / 2;
    const scale = 0.7 + depth * 0.3;
    const x = Math.sin(position) * radius;
    card.style.transform = `translateX(calc(-50% + ${x}px)) scale(${scale})`;
    card.style.opacity = 0.55 + depth * 0.45;
    card.style.filter = `blur(${(1 - depth) * 1.5}px)`;
    card.style.zIndex = Math.round(depth * 100);
  });
}

function animate(time) {
  if (lastTime && !paused && !reducedMotion.matches) {
    angle += Math.min(time - lastTime, 50) * 0.00035;
  }
  lastTime = time;
  renderCarousel();
  frame = requestAnimationFrame(animate);
}

stage.addEventListener('mouseenter', () => { paused = true; });
stage.addEventListener('mouseleave', () => { paused = false; });
window.addEventListener('resize', renderCarousel);
reducedMotion.addEventListener('change', () => {
  if (reducedMotion.matches) angle = 0;
  renderCarousel();
});
renderCarousel();
frame = requestAnimationFrame(animate);
