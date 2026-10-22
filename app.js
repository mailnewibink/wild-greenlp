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
});
