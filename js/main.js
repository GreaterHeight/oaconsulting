/* ============================================================
   OLUSOLA ADEKANOLA & CO — MAIN JS
   ============================================================ */

'use strict';

/* ── Scroll Reveal ── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (!elements.length) return;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  elements.forEach(el => observer.observe(el));
}

/* ── Cookie Banner ── */
function initCookieBanner() {
  const banner = document.getElementById('cookieBanner');
  if (!banner) return;
  const accepted = localStorage.getItem('oa-consulting-cookies');
  if (!accepted) banner.classList.add('visible');

  const acceptBtn = document.getElementById('cookieAccept');
  const declineBtn = document.getElementById('cookieDecline');
  if (acceptBtn) acceptBtn.addEventListener('click', () => {
    localStorage.setItem('oa-consulting-cookies', 'accepted');
    banner.classList.remove('visible');
  });
  if (declineBtn) declineBtn.addEventListener('click', () => {
    localStorage.setItem('oa-consulting-cookies', 'declined');
    banner.classList.remove('visible');
  });
}

/* ── Back To Top ── */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.opacity = window.scrollY > 600 ? '1' : '0';
    btn.style.pointerEvents = window.scrollY > 600 ? 'auto' : 'none';
  }, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── Smooth Anchor Scroll ── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-height')) || 72;
      window.scrollTo({ top: target.offsetTop - navH - 16, behavior: 'smooth' });
    });
  });
}

/* ── Form Validation ── */
function initForms() {
  document.querySelectorAll('form[data-validate]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      let valid = true;
      form.querySelectorAll('[required]').forEach(field => {
        const err = field.closest('.form-group')?.querySelector('.form-error');
        if (!field.value.trim()) {
          valid = false;
          field.style.borderColor = 'var(--red)';
          if (err) err.style.display = 'block';
        } else {
          field.style.borderColor = '';
          if (err) err.style.display = 'none';
        }
      });
      if (valid) {
        const successMsg = form.querySelector('.form-success');
        if (successMsg) {
          form.querySelectorAll('.form-group, button[type="submit"]').forEach(el => el.style.display = 'none');
          successMsg.style.display = 'block';
        }
      }
    });
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.style.borderColor = '';
        const err = field.closest('.form-group')?.querySelector('.form-error');
        if (err) err.style.display = 'none';
      });
    });
  });
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  initScrollReveal();
  initCookieBanner();
  initBackToTop();
  initSmoothScroll();
  initForms();
});
