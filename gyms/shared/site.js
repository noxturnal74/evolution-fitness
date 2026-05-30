/* ==========================================================================
   SHARED JAVASCRIPT — INTERACTIONS & SCROLL SYSTEM
   ========================================================================== */

(() => {
  'use strict';

  /* --- Utilities --- */
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const focusableSelector = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');

  /* --- State --- */
  const state = {
    direction: 'down',
    lastY: window.scrollY,
    ticking: false,
    lastFocus: null
  };

  /* Mark JS as ready — enables CSS animation states */
  document.body.classList.add('js-ready');

  /* =========================================================================
     1. NAVIGATION
     ========================================================================= */
  function initNav() {
    const header = $('[data-header]');
    const btn = $('[data-menu-toggle]');
    const links = $('[data-nav-links]');
    const anchors = $$('.nav-links a');

    if (!btn || !links) return;

    function closeMenu() {
      links.classList.remove('is-open');
      btn.setAttribute('aria-expanded', 'false');
    }

    btn.addEventListener('click', () => {
      const open = links.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', String(open));
    });

    anchors.forEach(a => a.addEventListener('click', closeMenu));

    /* Close on outside click */
    document.addEventListener('click', e => {
      if (links.classList.contains('is-open') && !links.contains(e.target) && !btn.contains(e.target)) {
        closeMenu();
      }
    });

    /* Active section highlighting */
    const sections = $$('main section[id]');
    if ('IntersectionObserver' in window && sections.length) {
      const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (!e.isIntersecting) return;
          anchors.forEach(a => {
            const active = a.getAttribute('href') === '#' + e.target.id;
            a.classList.toggle('is-active', active);
            if (active) a.setAttribute('aria-current', 'true');
            else a.removeAttribute('aria-current');
          });
        });
      }, { threshold: 0.25, rootMargin: '-15% 0px -60% 0px' });
      sections.forEach(s => obs.observe(s));
    }

    /* Header scroll state + sticky CTA */
    let scrollRaf;
    window.addEventListener('scroll', () => {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(() => {
        scrollRaf = null;
        if (header) header.classList.toggle('is-scrolled', window.scrollY > 20);
        const stickyCta = $('[data-sticky-cta]');
        if (stickyCta) stickyCta.classList.toggle('is-visible', window.scrollY > 800);
      });
    }, { passive: true });
  }

  /* =========================================================================
     2. SCROLL MOTION CONTROLLER
     ========================================================================= */
  const ScrollMotionController = {
    observer: null,
    elements: [],

    init() {
      this.elements = $$('[data-animate], .reveal');

      if (reduceMotion.matches) {
        this.elements.forEach(e => e.classList.add('is-visible'));
        return;
      }

      /* Scroll direction tracking */
      window.addEventListener('scroll', () => {
        if (state.ticking) return;
        state.ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          if (Math.abs(y - state.lastY) > 3) {
            state.direction = y > state.lastY ? 'down' : 'up';
            state.lastY = y;
          }
          this.updateParallax();
          state.ticking = false;
        });
      }, { passive: true });

      if (!('IntersectionObserver' in window)) {
        this.elements.forEach(e => e.classList.add('is-visible'));
        return;
      }

      this.observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.remove('is-exiting', 'scroll-up', 'scroll-down');
            el.classList.add('is-visible', 'scroll-' + state.direction);
            el.dispatchEvent(new CustomEvent('animation:enter', { bubbles: true, detail: { direction: state.direction } }));
          } else {
            el.classList.remove('is-visible');
            el.classList.add('is-exiting');
          }
        });
      }, { threshold: 0.14, rootMargin: '0px 0px -8% 0px' });

      this.elements.forEach((e, i) => {
        e.style.transitionDelay = (Math.min(i % 5, 4) * 40) + 'ms';
        this.observer.observe(e);
      });
    },

    updateParallax() {
      if (reduceMotion.matches) return;
      $$('[data-parallax-speed]').forEach(el => {
        const speed = Number(el.dataset.parallaxSpeed || 0.07);
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > window.innerHeight + 100) return;
        const off = Math.max(-30, Math.min(30, (r.top - window.innerHeight / 2) * speed));
        el.style.setProperty('--parallax-y', off + 'px');
      });
    },

    getState() { return { direction: state.direction, elements: this.elements.length }; }
  };

  window.ScrollMotionController = ScrollMotionController;

  /* =========================================================================
     3. PROGRAM FILTER
     ========================================================================= */
  function initFilters() {
    const buttons = $$('[data-filter]');
    if (!buttons.length) return;

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        buttons.forEach(b => {
          b.classList.toggle('is-active', b === btn);
          b.setAttribute('aria-pressed', String(b === btn));
        });
        $$('[data-program]').forEach(card => {
          const matched = filter === 'all' || (card.dataset.program || '').includes(filter);
          card.classList.toggle('is-hidden', !matched);
        });
      });
    });

    /* Set initial aria-pressed */
    buttons.forEach(b => b.setAttribute('aria-pressed', b.classList.contains('is-active') ? 'true' : 'false'));
  }

  /* =========================================================================
     4. MEMBERSHIP PACKAGE SELECTION
     ========================================================================= */
  function initPackages() {
    $$('[data-select-package]').forEach(el => {
      el.addEventListener('click', () => {
        $$('[data-select-package]').forEach(i => i.classList.remove('is-selected'));
        el.classList.add('is-selected');
      });
    });
  }

  /* =========================================================================
     5. FOCUS TRAP
     ========================================================================= */
  function trap(container, event) {
    if (event.key !== 'Tab') return;
    const f = $$(focusableSelector, container).filter(el => !el.closest('[hidden]'));
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  /* =========================================================================
     6. GALLERY LIGHTBOX
     ========================================================================= */
  function initLightbox() {
    const lb = $('[data-lightbox]');
    const imgEl = $('[data-lightbox-image]');
    const titleEl = $('[data-lightbox-title]');
    const textEl = $('[data-lightbox-text]');
    const panel = $('.lightbox-panel');

    if (!lb || !imgEl || !titleEl || !textEl) return;

    function openLightbox(src, title, text) {
      imgEl.src = src;
      imgEl.alt = title || 'Preview visual';
      titleEl.textContent = title || 'Visual';
      textEl.textContent = text || '';
      lb.classList.add('is-open');
      lb.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');
      requestAnimationFrame(() => panel?.focus());
    }

    function closeLightbox() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      state.lastFocus?.focus?.();
    }

    $$('[data-lightbox-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.lastFocus = document.activeElement;
        openLightbox(btn.dataset.lightboxSrc, btn.dataset.lightboxTitle, btn.dataset.lightboxText);
      });
    });

    $$('[data-lightbox-close]').forEach(b => b.addEventListener('click', closeLightbox));
    lb.addEventListener('keydown', e => trap(lb, e));
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) closeLightbox();
    });
  }

  /* =========================================================================
     7. FAQ ACCORDION
     ========================================================================= */
  function initFaq() {
    $$('details.faq-item').forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        $$('details.faq-item').forEach(other => {
          if (other !== item) other.open = false;
        });
      });
    });
  }

  /* =========================================================================
     8. IMAGE ERROR FALLBACK
     ========================================================================= */
  function imageFallback() {
    document.addEventListener('error', e => {
      if (!(e.target instanceof HTMLImageElement)) return;
      const holder = e.target.closest('.hero-media, .program-card, .gallery-card, .lightbox-panel');
      if (holder) holder.classList.add('image-failed');
      e.target.remove();
    }, true);
  }

  /* Reduced motion dynamic change */
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) $$('[data-animate], .reveal').forEach(e => e.classList.add('is-visible'));
  });

  /* Boot */
  imageFallback();
  initNav();
  ScrollMotionController.init();
  initFilters();
  initPackages();
  initLightbox();
  initFaq();
})();

/* ==========================================================================
   GSAP ENHANCEMENT — PROGRESSIVE ENHANCEMENT LAYER
   ========================================================================== */

(() => {
  'use strict';

  const reduce = matchMedia('(prefers-reduced-motion: reduce)');

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn, { once: true });
    } else {
      fn();
    }
  }

  ready(() => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;

    if (!gsap || !ScrollTrigger || reduce.matches) return;

    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('gsap-ready');

    gsap.defaults({ duration: 0.58, ease: 'power2.out', overwrite: 'auto' });

    /* Set initial hidden state for reveal elements */
    gsap.set('.reveal', { autoAlpha: 0, y: 24 });

    /* Hero entrance sequence */
    const tl = gsap.timeline({ delay: 0.06 });
    tl.from('.nav-shell', { autoAlpha: 0, y: -16, duration: 0.6, ease: 'power3.out' }, 0);
    tl.from('.hero h1', { autoAlpha: 0, y: 30, duration: 0.8, ease: 'power3.out' }, 0.10);
    tl.from('.hero .eyebrow', { autoAlpha: 0, y: 14, duration: 0.6 }, 0.18);
    tl.from('.hero-kicker', { autoAlpha: 0, y: 14, duration: 0.6 }, 0.24);
    tl.from('.hero-text', { autoAlpha: 0, y: 14, duration: 0.6 }, 0.30);
    tl.from('.hero-actions', { autoAlpha: 0, y: 14, duration: 0.6 }, 0.36);
    tl.from('.hero-status', { autoAlpha: 0, scale: 0.97, duration: 0.7, ease: 'power2.out' }, 0.20);

    /* Bidirectional scroll batch reveals */
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%',
      end: 'bottom 6%',
      interval: 0.07,
      batchMax: 5,
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0,
        stagger: { each: 0.05, from: 'start' },
        duration: 0.60, ease: 'power2.out'
      }),
      onEnterBack: batch => gsap.to(batch, {
        autoAlpha: 1, y: 0,
        stagger: { each: 0.03, from: 'end' },
        duration: 0.44, ease: 'power2.out'
      }),
      onLeaveBack: batch => gsap.to(batch, {
        autoAlpha: 0.22, y: -16,
        stagger: 0.02, duration: 0.28, ease: 'power1.out'
      })
    });

    /* Hero parallax */
    const heroImg = document.querySelector('.hero-media img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 7, scale: 1.07, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: 1.2 }
      });
    }

    /* Card hover micro-animations */
    gsap.utils.toArray('.program-card, .gallery-card, .price-card, .directory-card').forEach(card => {
      let hoverTween;
      card.addEventListener('pointerenter', () => {
        hoverTween = gsap.to(card, { y: -5, scale: 1.010, duration: 0.22, ease: 'power2.out', overwrite: true });
      });
      card.addEventListener('pointerleave', () => {
        gsap.to(card, { y: 0, scale: 1, duration: 0.26, ease: 'power2.out', overwrite: true });
      });
      card.addEventListener('focusin', () => gsap.to(card, { y: -3, scale: 1.006, duration: 0.20, ease: 'power2.out', overwrite: true }));
      card.addEventListener('focusout', () => gsap.to(card, { y: 0, scale: 1, duration: 0.22, ease: 'power2.out', overwrite: true }));
    });

    /* Refresh on load and resize */
    let resizeTimer;
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => ScrollTrigger.refresh(), 180);
    }, { passive: true });

    window.GymGsapMotion = { refresh: () => ScrollTrigger.refresh(), version: gsap.version };
  });
})();
