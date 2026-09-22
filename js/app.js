/**
 * SURELY — Application Main Entry Point
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Prototype Component
  if (window.PrototypeController) {
    window.PrototypeController.init();
  }

  // Initialize Story Scroll Interactions
  if (window.StoryController) {
    window.StoryController.init();
  }

  // Wire Hero CTAs
  const tryProtoBtns = document.querySelectorAll('a[href="#prototype"], .btn-try-proto');
  tryProtoBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const protoSection = document.getElementById('prototype');
      if (protoSection) {
        protoSection.scrollIntoView({ behavior: 'smooth' });
        const phone = document.querySelector('.phone-mockup-frame');
        if (phone) {
          phone.style.transition = 'transform 300ms ease, box-shadow 300ms ease';
          phone.style.transform = 'scale(1.02)';
          phone.style.boxShadow = '0 30px 80px rgba(198, 107, 79, 0.35)';
          setTimeout(() => {
            phone.style.transform = 'none';
            phone.style.boxShadow = '';
          }, 800);
        }
      }
    });
  });

  console.log('SURELY initialized — The key to what your family already owns.');
});
