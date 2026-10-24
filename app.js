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
      const t = (window.TRANSLATIONS && window.TRANSLATIONS[document.documentElement.lang || 'id']) || window.TRANSLATIONS?.id;
      const hint = supportToggle.querySelector('.st-hint');
      if (hint && t) {
        hint.textContent = isOpen ? t.support.triggerHintOpen : t.support.triggerHintClosed;
      }
    } else {
      supportContent.classList.remove('open');
      supportToggle.classList.remove('open');
      supportToggle.setAttribute('aria-expanded', 'false');
      supportContent.setAttribute('aria-hidden', 'true');
      const t = (window.TRANSLATIONS && window.TRANSLATIONS[document.documentElement.lang || 'id']) || window.TRANSLATIONS?.id;
      const hint = supportToggle.querySelector('.st-hint');
      if (hint && t) {
        hint.textContent = isOpen ? t.support.triggerHintOpen : t.support.triggerHintClosed;
      }
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

  // Language Switcher Logic
  const savedLang = localStorage.getItem('wildgreen_lang') || 'id';

  function applyLanguage(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    const t = window.TRANSLATIONS[lang];
    document.documentElement.lang = lang;
    localStorage.setItem('wildgreen_lang', lang);

    // Update active state on toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
      const isActive = btn.dataset.lang === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    // Update text elements via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const val = key.split('.').reduce((obj, k) => (obj ? obj[k] : null), t);
      if (val !== null && val !== undefined) {
        el.textContent = val;
      }
    });

    // Update html elements via data-i18n-html
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.getAttribute('data-i18n-html');
      const val = key.split('.').reduce((obj, k) => (obj ? obj[k] : null), t);
      if (val !== null && val !== undefined) {
        el.innerHTML = val;
      }
    });

    // Update attributes like data-label for screenshot phones
    document.querySelectorAll('.ss-phone[data-label-i18n]').forEach(el => {
      const key = el.getAttribute('data-label-i18n');
      const val = key.split('.').reduce((obj, k) => (obj ? obj[k] : null), t);
      if (val) {
        el.setAttribute('data-label', val);
      }
    });

    // Update spoiler hint text based on current open state
    if (supportToggle && supportContent) {
      const hint = supportToggle.querySelector('.st-hint');
      if (hint) {
        hint.textContent = supportContent.classList.contains('open')
          ? t.support.triggerHintOpen
          : t.support.triggerHintClosed;
      }
    }
  }

  // Bind click handlers to lang switch buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = btn.dataset.lang;
      applyLanguage(lang);
    });
  });

  // Initial apply
  applyLanguage(savedLang);
});
