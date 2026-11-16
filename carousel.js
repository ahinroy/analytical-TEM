const stage = document.querySelector('.carousel-stage');
const cards = [...stage.querySelectorAll('.data-card')];
let currentIndex = 0;

function renderCarousel() {
  const cardWidth = cards[0].offsetWidth;
  const radius = Math.min(170, Math.max(45, (stage.clientWidth - cardWidth) / 2));
  cards.forEach((card, index) => {
    const isCurrent = index === currentIndex;
    const isPrevious = cards.length > 1 && index === (currentIndex - 1 + cards.length) % cards.length;
    const isNext = cards.length > 2 && index === (currentIndex + 1) % cards.length;
    const visible = isCurrent || isPrevious || isNext;
    const x = isCurrent ? 0 : isPrevious ? -radius : radius;
    card.style.transform = `translateX(calc(-50% + ${x}px)) scale(${isCurrent ? 1 : 0.78})`;
    card.style.opacity = isCurrent ? 1 : visible ? 0.65 : 0;
    card.style.filter = isCurrent ? 'none' : 'blur(1px)';
    card.style.zIndex = isCurrent ? 3 : visible ? 1 : 0;
    card.style.visibility = visible ? 'visible' : 'hidden';
    card.inert = !isCurrent;
    card.setAttribute('aria-hidden', String(!isCurrent));
  });
}

document.querySelector('#carousel-prev').addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  renderCarousel();
});
document.querySelector('#carousel-next').addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % cards.length;
  renderCarousel();
});
window.addEventListener('resize', renderCarousel);
renderCarousel();
