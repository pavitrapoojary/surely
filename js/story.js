/**
 * SURELY — Marketing & Innovation Story Interactions
 * Spec: SURELY_Website_Spec.md §3, §4, §6, §7
 */

(function() {
  function initStoryInteractions() {
    // 1. Smooth Navigation Highlighting on Scroll
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    function onScroll() {
      const scrollY = window.pageYOffset;

      sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 120;
        const sectionId = current.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', onScroll);

    // 2. Interactive TAM / SAM / SOM Filter
    const funnelRows = document.querySelectorAll('.funnel-row');
    funnelRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        const fill = row.querySelector('.funnel-bar-fill');
        if (fill) {
          fill.style.filter = 'brightness(1.1)';
          fill.style.transform = 'scaleY(1.05)';
        }
      });
      row.addEventListener('mouseleave', () => {
        const fill = row.querySelector('.funnel-bar-fill');
        if (fill) {
          fill.style.filter = 'none';
          fill.style.transform = 'none';
        }
      });
    });

    // 3. Evaluation Matrix Interactive Highlight
    const matrixRows = document.querySelectorAll('.matrix-table tbody tr');
    matrixRows.forEach(row => {
      row.addEventListener('click', () => {
        matrixRows.forEach(r => r.classList.remove('active-inspect'));
        row.classList.add('active-inspect');
      });
    });

    // 4. Interactive Quick Guide buttons for Prototype Section
    const guideCards = document.querySelectorAll('.guide-step-card');
    guideCards.forEach(card => {
      card.addEventListener('click', () => {
        guideCards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        const step = card.getAttribute('data-step');
        if (step === '1') {
          SurelyState.setScreen('checklist');
        } else if (step === '2') {
          SurelyState.setScreen('category', { category: 'insurance' });
        } else if (step === '3') {
          SurelyState.setScreen('add', { category: 'digital' });
        } else if (step === '4') {
          SurelyState.setScreen('emergency');
        }
      });
    });

    // 5. Image Lightbox for Storyboards
    const allStoryboardImages = document.querySelectorAll('.storyboard-img, .hero-image, .closing-image');
    allStoryboardImages.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', () => {
        openImageLightbox(img.src, img.alt || 'SURELY Storyboard Illustration');
      });
    });
  }

  function openImageLightbox(src, caption) {
    let modal = document.getElementById('storyboard-lightbox-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'storyboard-lightbox-modal';
      modal.className = 'modal-overlay';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="modal-content" style="max-width: 840px; padding: 1.25rem; background: var(--cream);">
        <button class="modal-close-btn" id="lightbox-close" style="top: 0.75rem; right: 0.75rem;">${Icons.close()}</button>
        <div style="border-radius: var(--radius-md); overflow: hidden; max-height: 75vh; display: flex; justify-content: center; background: #000;">
          <img src="${src}" alt="${caption}" style="max-width: 100%; max-height: 75vh; object-fit: contain;">
        </div>
        <p style="font-family: var(--font-serif); font-size: 1.05rem; font-style: italic; color: var(--brown-ink); text-align: center; margin-top: 1rem; padding: 0 1rem;">
          ${caption}
        </p>
      </div>
    `;

    modal.classList.add('open');

    modal.querySelector('#lightbox-close').addEventListener('click', () => {
      modal.classList.remove('open');
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) modal.classList.remove('open');
    });
  }

  window.StoryController = {
    init: initStoryInteractions,
    openImageLightbox
  };
})();
