(function () {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('site-nav');

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      const isActive = nav.classList.toggle('active');

      hamburger.setAttribute(
        'aria-expanded',
        String(isActive)
      );

      hamburger.setAttribute(
        'aria-label',
        isActive ? 'Close menu' : 'Open menu'
      );
    });

    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');

        hamburger.setAttribute(
          'aria-expanded',
          'false'
        );

        hamburger.setAttribute(
          'aria-label',
          'Open menu'
        );
      });
    });
  }

  const year = document.getElementById('copyright-year');

  if (year) {
    year.textContent = new Date().getFullYear();
  }
})();
