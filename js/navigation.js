/* ============================================================
   OLUSOLA ADEKANOLA & CO — NAVIGATION JS
   ============================================================ */

'use strict';

function initNavigation() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('navHamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!nav) return;

  /* Scroll state */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    nav.classList.toggle('nav--scrolled', current > 40);
    lastScroll = current;
  }, { passive: true });

  /* Hamburger */
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  }

  /* Close mobile on outside click */
  document.addEventListener('click', (e) => {
    if (mobileMenu?.classList.contains('open') &&
        !mobileMenu.contains(e.target) &&
        !hamburger?.contains(e.target)) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  /* Active link */
  const currentPath = window.location.pathname;
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href && currentPath.includes(href) && href !== '/') {
      link.classList.add('nav__link--active');
    } else if (href === '/' && currentPath === '/') {
      link.classList.add('nav__link--active');
    }
  });

  /* Keyboard nav */
  nav.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu?.classList.contains('open')) {
      mobileMenu.classList.remove('open');
      hamburger?.classList.remove('open');
      hamburger?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      hamburger?.focus();
    }
  });
}

document.addEventListener('DOMContentLoaded', initNavigation);
