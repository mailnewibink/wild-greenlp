document.addEventListener('DOMContentLoaded', () => {
  // Mobile menu
  const burger = document.getElementById('burger');
  const nav = document.getElementById('nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      nav.classList.toggle('open');
      burger.innerHTML = nav.classList.contains('open')
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
    });
    nav.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.innerHTML = '<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  // Subtle header bg on scroll
  const header = document.getElementById('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.style.boxShadow = window.scrollY > 20
        ? '0 4px 16px rgba(0,0,0,.06)'
        : 'none';
    }, { passive: true });
  }

  // Screenshot carousel arrows
  const ssPrev = document.getElementById('ssPrev');
  const ssNext = document.getElementById('ssNext');
  const ssTrack = document.getElementById('ssTrack');
  if (ssPrev && ssNext && ssTrack) {
    ssPrev.addEventListener('click', () => {
      ssTrack.scrollBy({ left: -240, behavior: 'smooth' });
    });
    ssNext.addEventListener('click', () => {
      ssTrack.scrollBy({ left: 240, behavior: 'smooth' });
    });
  }

  // Scroll Reveal Observer
  const revealElements = document.querySelectorAll('.reveal, .reveal-scale');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          obs.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -30px 0px',
      threshold: 0.08
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('revealed'));
  }

  // Support Us Spoiler / Accordion Toggle
  const supportToggle = document.getElementById('supportToggle');
  const supportContent = document.getElementById('supportContent');

  function setSupportOpen(open) {
    if (!supportToggle || !supportContent) return;
    const isOpen = open !== undefined ? open : !supportContent.classList.contains('open');
    if (isOpen) {
      supportContent.classList.add('open');
      supportToggle.classList.add('open');
      supportToggle.setAttribute('aria-expanded', 'true');
      supportContent.setAttribute('aria-hidden', 'false');
      const hint = supportToggle.querySelector('.st-hint');
      if (hint) hint.textContent = 'Klik untuk menutup';
    } else {
      supportContent.classList.remove('open');
      supportToggle.classList.remove('open');
      supportToggle.setAttribute('aria-expanded', 'false');
      supportContent.setAttribute('aria-hidden', 'true');
      const hint = supportToggle.querySelector('.st-hint');
      if (hint) hint.textContent = 'Suka dengan game ini? Dukung pengembang';
    }
  }

  if (supportToggle && supportContent) {
    supportToggle.addEventListener('click', () => setSupportOpen());

    // Auto-expand if user clicks any "Support Us" link in nav/footer
    document.querySelectorAll('a[href="#support"]').forEach(anchor => {
      anchor.addEventListener('click', () => {
        setSupportOpen(true);
      });
    });
  }
});
