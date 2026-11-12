const carousel = document.querySelector('#data-carousel');

function moveCarousel(direction) {
  const card = carousel.querySelector('.data-card');
  if (!card) return;
  const gap = parseFloat(getComputedStyle(carousel).gap) || 0;
  carousel.scrollBy({ left: direction * (card.offsetWidth + gap) });
}

document.querySelector('[data-carousel-prev]').addEventListener('click', () => moveCarousel(-1));
document.querySelector('[data-carousel-next]').addEventListener('click', () => moveCarousel(1));
