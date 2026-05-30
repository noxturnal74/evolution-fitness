/* ==========================================================================
   SHARED JAVASCRIPT — SYSTEM MOTIONS & INTERACTION
   ========================================================================== */

(() => {
  'use strict';
  
  // DOM Selectors with Safety Guards
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  
  const focusableSelector = 'a[href], button:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)');
  
  // Animation System State
  const state = {
    direction: 'down',
    lastY: window.scrollY,
    ticking: false,
    lastFocus: null
  };
  
  document.body.classList.add('js-ready');
  
  /* 1. HEADER & INTERACTIVE NAVIGATION */
  function initNav() {
    const header = $('[data-header]');
    const btn = $('[data-menu-toggle]');
    const links = $('[data-nav-links]');
    const anchors = $$('.nav-links a');
    
    if (btn && links) {
      btn.addEventListener('click', () => {
        const open = links.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', String(open));
      });
      
      anchors.forEach(a => a.addEventListener('click', () => {
        links.classList.remove('is-open');
        btn.setAttribute('aria-expanded', 'false');
      }));
    }
    
    // Smooth navigation active marker linking using IntersectionObserver
    const sections = $$('main section[id]');
    const obs = ('IntersectionObserver' in window) ? new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        anchors.forEach(a => {
          const active = a.getAttribute('href') === '#' + e.target.id;
          a.classList.toggle('is-active', active);
          if (active) {
            a.setAttribute('aria-current', 'true');
          } else {
            a.removeAttribute('aria-current');
          }
        });
      });
    }, { threshold: 0.28, rootMargin: '-20% 0px -55% 0px' }) : null;
    
    sections.forEach(s => obs?.observe(s));
    
    // Header scrolled and sticky CTA visibility behaviors
    window.addEventListener('scroll', () => {
      if (header) {
        header.classList.toggle('is-scrolled', window.scrollY > 24);
      }
      
      const stickyCta = $('[data-sticky-cta]');
      if (stickyCta) {
        stickyCta.classList.toggle('is-visible', window.scrollY > 900);
      }
    }, { passive: true });
  }
  
  /* 2. DIRECTIONAL SCROLL MOTION SYSTEM (NON-GSAP FALLBACK) */
  const ScrollMotionController = {
    observer: null,
    elements: [],
    
    init() {
      this.elements = $$('[data-animate], .reveal');
      
      if (reduceMotion.matches) {
        this.elements.forEach(e => e.classList.add('is-visible'));
        return;
      }
      
      // Scroll direction passive tracking
      window.addEventListener('scroll', () => {
        if (state.ticking) return;
        state.ticking = true;
        
        requestAnimationFrame(() => {
          const y = window.scrollY;
          // Apply a 4px tolerance filter to suppress micro jitter
          if (Math.abs(y - state.lastY) > 4) {
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
      
      // Bidirectional entering and leaving triggers
      this.observer = new IntersectionObserver(entries => {
        entries.forEach(e => {
          const el = e.target;
          if (e.isIntersecting) {
            el.classList.remove('is-exiting', 'scroll-up', 'scroll-down');
            el.classList.add('is-visible', 'scroll-' + state.direction);
            
            // Custom motion analytics/event hook
            el.dispatchEvent(new CustomEvent('animation:enter', {
              bubbles: true,
              detail: { direction: state.direction }
            }));
          } else {
            el.classList.remove('is-visible');
            el.classList.add('is-exiting');
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });
      
      this.elements.forEach((e, i) => {
        // Stagger transitions slightly
        e.style.transitionDelay = (Math.min(i % 4, 3) * 45) + 'ms';
        this.observer.observe(e);
      });
    },
    
    updateParallax() {
      if (reduceMotion.matches) return;
      
      $$('[data-parallax-speed]').forEach(el => {
        const speed = Number(el.dataset.parallaxSpeed || 0.08);
        const r = el.getBoundingClientRect();
        if (r.bottom < -80 || r.top > window.innerHeight + 80) return;
        
        const off = Math.max(-34, Math.min(34, (r.top - window.innerHeight / 2) * speed));
        el.style.setProperty('--parallax-y', off + 'px');
      });
    },
    
    getState() {
      return {
        direction: state.direction,
        elements: this.elements.length
      };
    }
  };
  
  window.ScrollMotionController = ScrollMotionController;
  
  /* 3. CARD FILTERING (PROGRAM SECTION) */
  function initFilters() {
    $$('[data-filter]').forEach(btn => {
      btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;
        
        $$('[data-filter]').forEach(b => b.classList.toggle('is-active', b === btn));
        
        $$('[data-program]').forEach(card => {
          const matched = filter === 'all' || (card.dataset.program || '').includes(filter);
          card.classList.toggle('is-hidden', !matched);
        });
      });
    });
  }
  
  /* 4. PLAN PACKAGES INTERACTION */
  function initPackages() {
    $$('[data-select-package]').forEach(el => {
      el.addEventListener('click', () => {
        $$('[data-select-package]').forEach(i => i.classList.remove('is-selected'));
        el.classList.add('is-selected');
      });
    });
  }
  
  /* 5. FOCUS MANAGEMENT & TRAPPING TOOL */
  function trap(container, event) {
    if (event.key !== 'Tab') return;
    const f = $$(focusableSelector, container);
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
  
  /* 6. ACCESSIBLE GALLERY LIGHTBOX DIALOG */
  function initLightbox() {
    const lb = $('[data-lightbox]');
    const img = $('[data-lightbox-image]');
    const title = $('[data-lightbox-title]');
    const text = $('[data-lightbox-text]');
    const panel = $('.lightbox-panel');
    
    if (!lb || !img || !title || !text) return;
    
    function close() {
      lb.classList.remove('is-open');
      lb.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      state.lastFocus?.focus?.();
    }
    
    $$('[data-lightbox-src]').forEach(btn => {
      btn.addEventListener('click', () => {
        state.lastFocus = document.activeElement;
        img.src = btn.dataset.lightboxSrc;
        img.alt = btn.dataset.lightboxTitle || 'Preview visual';
        title.textContent = btn.dataset.lightboxTitle || 'Visual';
        text.textContent = btn.dataset.lightboxText || '';
        
        lb.classList.add('is-open');
        lb.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        panel?.focus();
      });
    });
    
    $$('[data-lightbox-close]').forEach(b => b.addEventListener('click', close));
    
    lb.addEventListener('keydown', e => trap(lb, e));
    
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && lb.classList.contains('is-open')) {
        close();
      }
    });
  }
  
  /* 7. FAQ ACCORDION (MUTUALLY EXCLUSIVE DETAILS) */
  function initFaq() {
    $$('details.faq-item').forEach(item => {
      item.addEventListener('toggle', () => {
        if (!item.open) return;
        $$('details.faq-item').forEach(other => {
          if (other !== item) {
            other.open = false;
          }
        });
      });
    });
  }
  
  /* 8. ROBUST IMAGE BROKEN FALLBACKS */
  function imageFallback() {
    document.addEventListener('error', e => {
      const target = e.target;
      if (!(target instanceof HTMLImageElement)) return;
      
      const holder = target.closest('.hero-media, .program-card, .gallery-card, .lightbox-panel');
      if (holder) {
        holder.classList.add('image-failed');
      }
      target.remove();
    }, true);
  }
  
  // Listen for reduced motion changes dynamically
  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) {
      $$('[data-animate], .reveal').forEach(e => e.classList.add('is-visible'));
    }
  });
  
  // Initialization Trigger
  imageFallback();
  initNav();
  ScrollMotionController.init();
  initFilters();
  initPackages();
  initLightbox();
  initFaq();
})();
/* ==========================================================================
   GSAP SYSTEM ENGINE — ADVANCED BIDIRECTIONAL MOTION PARALLAX
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
    
    // Skip completely if libraries are missing or user prefers reduced motion
    if (!gsap || !ScrollTrigger || reduce.matches) return;
    
    gsap.registerPlugin(ScrollTrigger);
    document.body.classList.add('gsap-ready');
    
    // Set standard premium durations and eases
    gsap.defaults({
      duration: 0.62,
      ease: 'power2.out',
      overwrite: 'auto'
    });
    
    // Initialize reveal starts
    gsap.set('.reveal', { autoAlpha: 0, y: 28 });
    
    // Core Layout Entrances
    gsap.from('.nav-shell', {
      autoAlpha: 0,
      y: -18,
      duration: 0.7,
      ease: 'power3.out',
      delay: 0.04
    });
    
    gsap.from('.hero h1', {
      autoAlpha: 0,
      y: 34,
      duration: 0.9,
      ease: 'power3.out',
      delay: 0.12
    });
    
    gsap.from('.hero .eyebrow, .hero-kicker, .hero-text, .hero-actions', {
      autoAlpha: 0,
      y: 18,
      duration: 0.7,
      stagger: 0.08,
      ease: 'power2.out',
      delay: 0.22
    });
    
    // Bidirectional scroll trigger batches
    ScrollTrigger.batch('.reveal', {
      start: 'top 86%',
      end: 'bottom 8%',
      interval: 0.08,
      batchMax: 6,
      
      // Scroll down: animate in from positive translate offset
      onEnter: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.055, from: 'start' },
        duration: 0.64,
        ease: 'power2.out'
      }),
      
      // Scroll up: re-animate in with smooth entry from negative offset
      onEnterBack: batch => gsap.to(batch, {
        autoAlpha: 1,
        y: 0,
        stagger: { each: 0.035, from: 'end' },
        duration: 0.48,
        ease: 'power2.out'
      }),
      
      // Scroll back up: retreat slightly to prepare for next scroll down
      onLeaveBack: batch => gsap.to(batch, {
        autoAlpha: 0.38,
        y: -18,
        stagger: 0.02,
        duration: 0.32,
        ease: 'power1.out'
      })
    });
    
    // Gentle premium parallax for Hero media container
    const heroImg = document.querySelector('.hero-media img');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 6,
        scale: 1.06,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1
        }
      });
    }
    
    // Hover micro-motion effects for all cards
    gsap.utils.toArray('.program-card, .gallery-card, .price-card, .directory-card').forEach(card => {
      card.addEventListener('pointerenter', () => gsap.to(card, {
        y: -6,
        scale: 1.012,
        duration: 0.24,
        ease: 'power2.out'
      }));
      
      card.addEventListener('pointerleave', () => gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.28,
        ease: 'power2.out'
      }));
      
      card.addEventListener('focusin', () => gsap.to(card, {
        y: -4,
        scale: 1.008,
        duration: 0.22,
        ease: 'power2.out'
      }));
      
      card.addEventListener('focusout', () => gsap.to(card, {
        y: 0,
        scale: 1,
        duration: 0.24,
        ease: 'power2.out'
      }));
    });
    
    // Perform trigger recalculation on fully loaded document
    let refreshTimer;
    window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true });
    
    window.addEventListener('resize', () => {
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 160);
    }, { passive: true });
    
    // Globals exposure for QA debug hooks
    window.GymGsapMotion = {
      refresh: () => ScrollTrigger.refresh(),
      version: gsap.version
    };
  });
})();
