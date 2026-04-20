import './app.element.css';

const slides = [
  {
    alt: 'Sunlit canyon cliffs',
    src: 'https://picsum.photos/seed/canyon/1200/800',
  },
  {
    alt: 'Glass building facade at dusk',
    src: 'https://picsum.photos/seed/facade/1200/800',
  },
  {
    alt: 'Coastal road near the sea',
    src: 'https://picsum.photos/seed/coastline/1200/800',
  },
];

export class AppElement extends HTMLElement {
  private currentIndex = 0;
  private intervalId?: number;

  connectedCallback() {
    this.render();
    this.bindEvents();
    this.startAutoRotate();
  }

  disconnectedCallback() {
    this.stopAutoRotate();
  }

  private bindEvents() {
    this.querySelector('[data-action="prev"]')?.addEventListener('click', () => {
      this.showSlide(this.currentIndex - 1);
    });

    this.querySelector('[data-action="next"]')?.addEventListener('click', () => {
      this.showSlide(this.currentIndex + 1);
    });

    this.querySelectorAll<HTMLButtonElement>('[data-slide-index]').forEach(
      (button) => {
        button.addEventListener('click', () => {
          const index = Number(button.dataset.slideIndex);
          this.showSlide(index);
        });
      }
    );
  }

  private startAutoRotate() {
    this.stopAutoRotate();
    this.intervalId = window.setInterval(() => {
      this.showSlide(this.currentIndex + 1);
    }, 4500);
  }

  private stopAutoRotate() {
    if (this.intervalId !== undefined) {
      window.clearInterval(this.intervalId);
    }
  }

  private showSlide(index: number) {
    this.currentIndex = (index + slides.length) % slides.length;

    this.querySelectorAll<HTMLElement>('[data-slide]').forEach((slide, slideIndex) => {
      slide.classList.toggle('is-active', slideIndex === this.currentIndex);
    });

    this.querySelectorAll<HTMLButtonElement>('[data-slide-index]').forEach(
      (dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === this.currentIndex);
        dot.setAttribute(
          'aria-current',
          dotIndex === this.currentIndex ? 'true' : 'false'
        );
      }
    );
  }

  private render() {
    this.innerHTML = `
      <div class="page-shell">
        <section class="hero-card">
          <header class="topbar">
            <a class="brand" href="#">test1</a>
            <a class="top-link" href="#">Open App</a>
          </header>

          <div class="hero-layout">
            <div class="hero-copy">
              <p class="eyebrow">Vanilla JS landing page</p>
              <h1>Simple now, ready to grow later.</h1>
              <p class="lede">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris.
              </p>
            </div>

            <div class="carousel" aria-label="Featured images carousel">
              <div class="carousel-viewport">
                ${slides
                  .map(
                    (slide, index) => `
                      <figure class="carousel-slide ${index === 0 ? 'is-active' : ''}" data-slide>
                        <img src="${slide.src}" alt="${slide.alt}" />
                      </figure>
                    `
                  )
                  .join('')}
              </div>

              <div class="carousel-controls">
                <button type="button" class="carousel-button" data-action="prev" aria-label="Previous image">
                  Prev
                </button>
                <div class="carousel-dots" aria-label="Choose image">
                  ${slides
                    .map(
                      (_, index) => `
                        <button
                          type="button"
                          class="carousel-dot ${index === 0 ? 'is-active' : ''}"
                          data-slide-index="${index}"
                          aria-label="Go to slide ${index + 1}"
                          aria-current="${index === 0 ? 'true' : 'false'}"
                        ></button>
                      `
                    )
                    .join('')}
                </div>
                <button type="button" class="carousel-button" data-action="next" aria-label="Next image">
                  Next
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    `;
  }
}

customElements.define('org-root', AppElement);
