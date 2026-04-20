let currentIndex = 0;

const slideElements = document.querySelectorAll('[data-slide]');
const dotElements = document.querySelectorAll('[data-slide-index]');

function showSlide(index) {
  currentIndex = (index + slideElements.length) % slideElements.length;

  slideElements.forEach((slide, slideIndex) => {
    slide.classList.toggle('is-active', slideIndex === currentIndex);
  });

  dotElements.forEach((dot, dotIndex) => {
    dot.classList.toggle('is-active', dotIndex === currentIndex);
    dot.setAttribute('aria-current', dotIndex === currentIndex ? 'true' : 'false');
  });
}

document.querySelector('[data-action="prev"]')?.addEventListener('click', () => {
  showSlide(currentIndex - 1);
});

document.querySelector('[data-action="next"]')?.addEventListener('click', () => {
  showSlide(currentIndex + 1);
});

dotElements.forEach((button, index) => {
  button.addEventListener('click', () => {
    showSlide(index);
  });
});

