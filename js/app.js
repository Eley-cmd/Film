'use strict';

/* 1. NAVIGATION — Burger Menu */
const Navigation = (() => {

  const burgerBtn  = document.getElementById('navBurger');
  const drawer     = document.getElementById('navDrawer');
  const backdrop   = document.getElementById('navBackdrop');

  if (!burgerBtn || !drawer || !backdrop) return;

  let isOpen = false;

  /* Toggle the navigation drawer open / closed */
  function toggle() {
    isOpen = !isOpen;

    burgerBtn.classList.toggle('is-open',    isOpen);
    drawer.classList.toggle('is-open',       isOpen);
    backdrop.classList.toggle('is-visible',  isOpen);

    // Prevent body scrolling while drawer is open
    document.body.style.overflow = isOpen ? 'hidden' : '';

    // Accessibility
    burgerBtn.setAttribute('aria-expanded', String(isOpen));
  }

  /* Close the drawer */
  function close() {
    if (!isOpen) return;
    isOpen = false;

    burgerBtn.classList.remove('is-open');
    drawer.classList.remove('is-open');
    backdrop.classList.remove('is-visible');
    document.body.style.overflow = '';
    burgerBtn.setAttribute('aria-expanded', 'false');
  }

  // Bind events
  burgerBtn.addEventListener('click', toggle);
  backdrop.addEventListener('click', close);

  // Close drawer when a nav link is clicked
  drawer.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', close);
  });

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') close();
  });

  // Mark active nav link based on current page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  drawer.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('is-active');
    }
  });

  return { toggle, close };

})();


/* 2. HERO TRANSITION (index.html only) */
const HeroTransition = (() => {

  const hero         = document.getElementById('hero');
  const mainContent  = document.getElementById('mainContent');
  const watchBtn     = document.getElementById('watchBtn');
  const mainVideo    = document.getElementById('mainVideo'); 

  if (!hero || !watchBtn) return;

  function activate() {
    hero.classList.add('is-hidden');
    document.body.classList.remove('hero-active');

    if (mainContent) {
      mainContent.classList.add('is-visible');
    }

    // transition duration (1.5s)
    setTimeout(() => {
      hero.style.display = 'none';

      if (mainVideo) {
        // FIXED FOR YOUTUBE: 
        // 1. Gagamit tayo ng embed URL format.
        // 2. autoplay=1 para mag-play agad.
        // 3. mute=1 para payagan ng browser ang autoplay.
        // 4. rel=0 para hindi magpakita ng ibang video sa dulo.
        const ytEmbed = "https://www.youtube.com/embed/aAmEFXGwHpk?autoplay=1&mute=1&rel=0&enablejsapi=1";
        mainVideo.src = ytEmbed;
      }
    }, 1500);
  }

  watchBtn.addEventListener('click', activate);

  return { activate };
})();


/* 3. SCROLL REVEAL */
const ScrollReveal = (() => {

  const elements = document.querySelectorAll('.reveal');

  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Stagger delay for grouped elements
          const delay = index * 65;

          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, delay);

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -20px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));

  return { observer };

})();


/* 4. PAGE ANCHOR SMOOTH SCROLL */
const SmoothScroll = (() => {

  const NAV_OFFSET = 70; // px — height of fixed nav

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (event) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;

      event.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

})();
