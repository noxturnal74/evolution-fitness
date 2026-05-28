(() => {
  'use strict';

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const WHATSAPP_NUMBER = '6289506753131';
  const focusableSelector = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  document.body.classList.add('js-ready');

  const state = {
    direction: 'down',
    lastY: window.scrollY,
    selectedPackage: 'Pro',
    lastFocus: null,
    ticking: false,
    testimonial: 0
  };

  const encode = (value) => encodeURIComponent(value || '');

  function getWhatsAppUrl(extra = {}) {
    const form = $('[data-join-form]');
    const data = form ? new FormData(form) : new FormData();
    const name = extra.name || data.get('name') || 'Visitor';
    const goal = extra.goal || data.get('goal') || $('[data-goal-select]')?.value || 'Body transformation';
    const selected = extra.package || data.get('package') || state.selectedPackage || 'Pro';
    const time = extra.time || data.get('time') || 'Flexible';
    const message = [
      'Hello Evolution 20 Gym admin, I want to book a trial session.',
      `Name: ${name}`,
      `Goal: ${goal}`,
      `Package: ${selected}`,
      `Preferred visit time: ${time}`,
      'Please send me the next available slot and membership details.'
    ].join('\n');
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${encode(message)}`;
  }

  function refreshIcons() {
    if (window.lucide?.createIcons) {
      window.lucide.createIcons();
    }
  }

  function updateOpenStatus() {
    const target = $('[data-open-status]');
    if (!target) return;
    const now = new Date();
    const hour = now.getHours();
    const open = hour >= 6 && hour < 22;
    target.textContent = open ? 'Open Now' : 'Closed Now';
  }

  function initNavigation() {
    const header = $('[data-header]');
    const menuButton = $('[data-menu-toggle]');
    const navLinks = $('[data-nav-links]');
    const links = $$('.nav-links a');

    menuButton?.addEventListener('click', () => {
      const open = navLinks?.classList.toggle('is-open') || false;
      menuButton.setAttribute('aria-expanded', String(open));
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        navLinks?.classList.remove('is-open');
        menuButton?.setAttribute('aria-expanded', 'false');
      });
    });

    const sections = $$('main section[id]');
    const activeObserver = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('is-active', isActive);
          if (isActive) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { threshold: 0.35, rootMargin: '-20% 0px -55% 0px' }) : null;

    sections.forEach((section) => activeObserver?.observe(section));

    window.addEventListener('scroll', () => {
      header?.classList.toggle('is-scrolled', window.scrollY > 24);
      $('[data-sticky-cta]')?.classList.toggle('is-visible', window.scrollY > 680);
    }, { passive: true });
  }

  const ScrollMotionController = {
    observer: null,
    elements: [],
    init() {
      this.elements = $$('[data-animate], .reveal');
      if (reduceMotion.matches) {
        this.elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      window.addEventListener('scroll', () => {
        if (state.ticking) return;
        state.ticking = true;
        requestAnimationFrame(() => {
          const current = window.scrollY;
          if (Math.abs(current - state.lastY) > 4) {
            state.direction = current > state.lastY ? 'down' : 'up';
            state.lastY = current;
          }
          this.updateParallax();
          state.ticking = false;
        });
      }, { passive: true });

      if (!('IntersectionObserver' in window)) {
        this.elements.forEach((element) => element.classList.add('is-visible'));
        return;
      }

      this.observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const element = entry.target;
          if (entry.isIntersecting) {
            element.classList.remove('is-exiting', 'scroll-up', 'scroll-down');
            element.classList.add('is-visible', `scroll-${state.direction}`);
            element.dispatchEvent(new CustomEvent('animation:enter', { bubbles: true, detail: { direction: state.direction } }));
          } else if (!element.hasAttribute('data-animate-once')) {
            element.classList.remove('is-visible');
            element.classList.add('is-exiting');
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -10% 0px' });

      this.elements.forEach((element, index) => {
        element.style.transitionDelay = `${Math.min(index % 4, 3) * 58}ms`;
        this.observer.observe(element);
      });
    },
    updateParallax() {
      if (reduceMotion.matches) return;
      $$('[data-parallax-speed]').forEach((element) => {
        const speed = Number(element.dataset.parallaxSpeed || 0.08);
        const rect = element.getBoundingClientRect();
        if (rect.bottom < -80 || rect.top > window.innerHeight + 80) return;
        const offset = (rect.top - window.innerHeight / 2) * speed;
        element.style.setProperty('--parallax-y', `${Math.max(-38, Math.min(38, offset))}px`);
      });
    },
    getState() {
      return { direction: state.direction, elements: this.elements.length };
    }
  };

  window.ScrollMotionController = ScrollMotionController;

  function initProgramFilters() {
    const buttons = $$('[data-filter]');
    const cards = $$('[data-program]');
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const filter = button.dataset.filter;
        buttons.forEach((item) => item.classList.toggle('is-active', item === button));
        cards.forEach((card) => {
          const show = filter === 'all' || (card.dataset.program || '').includes(filter);
          card.classList.toggle('is-hidden', !show);
        });
      });
    });
  }

  function initPackageSelector() {
    const packageSelect = $('[data-package-select]');
    $$('[data-select-package]').forEach((button) => {
      button.addEventListener('click', () => {
        state.selectedPackage = button.dataset.selectPackage;
        if (packageSelect) packageSelect.value = state.selectedPackage;
        $$('[data-package]').forEach((card) => card.classList.toggle('is-selected', card.dataset.package === state.selectedPackage));
        openModal('trial');
      });
    });
    packageSelect?.addEventListener('change', () => {
      state.selectedPackage = packageSelect.value;
    });
  }

  function trapFocus(container, event) {
    if (event.key !== 'Tab') return;
    const focusable = $$(focusableSelector, container);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function openModal(name) {
    const modal = $(`[data-modal="${name}"]`);
    const panel = $('.modal-panel', modal);
    if (!modal || !panel) return;
    state.lastFocus = document.activeElement;
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    setTimeout(() => panel.focus(), 0);
  }

  function closeModal() {
    const modal = $('.modal.is-open');
    if (!modal) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    state.lastFocus?.focus?.();
  }

  function initModal() {
    $$('[data-open-modal]').forEach((button) => {
      button.addEventListener('click', () => openModal(button.dataset.openModal));
    });
    $$('[data-close-modal]').forEach((button) => button.addEventListener('click', closeModal));
    $('[data-modal="trial"]')?.addEventListener('keydown', (event) => trapFocus(event.currentTarget, event));
    $('[data-modal-book]')?.addEventListener('click', () => {
      window.open(getWhatsAppUrl(), '_blank', 'noopener');
    });
  }

  function initLightbox() {
    const lightbox = $('[data-lightbox]');
    const image = $('[data-lightbox-image]');
    const title = $('[data-lightbox-title]');
    const text = $('[data-lightbox-text]');
    if (!lightbox || !image || !title || !text) return;

    $$('[data-lightbox-src]').forEach((button) => {
      button.addEventListener('click', () => {
        state.lastFocus = document.activeElement;
        image.src = button.dataset.lightboxSrc;
        image.alt = button.dataset.lightboxTitle || 'Evolution 20 Gym gallery image';
        title.textContent = button.dataset.lightboxTitle || 'Evolution 20 Gym';
        text.textContent = button.dataset.lightboxText || '';
        lightbox.classList.add('is-open');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('modal-open');
        $('.lightbox-panel')?.focus();
      });
    });

    const close = () => {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      document.body.classList.remove('modal-open');
      state.lastFocus?.focus?.();
    };

    $$('[data-lightbox-close]').forEach((button) => button.addEventListener('click', close));
    lightbox.addEventListener('keydown', (event) => trapFocus(lightbox, event));
  }

  function initTestimonials() {
    const testimonials = $$('[data-testimonial]');
    const show = (index) => {
      if (!testimonials.length) return;
      state.testimonial = (index + testimonials.length) % testimonials.length;
      testimonials.forEach((item, itemIndex) => item.classList.toggle('is-active', itemIndex === state.testimonial));
    };
    $('[data-testimonial-prev]')?.addEventListener('click', () => show(state.testimonial - 1));
    $('[data-testimonial-next]')?.addEventListener('click', () => show(state.testimonial + 1));
  }

  function initCounters() {
    const counters = $$('[data-count]');
    if (reduceMotion.matches || !('IntersectionObserver' in window)) {
      counters.forEach((counter) => { counter.textContent = counter.dataset.count; });
      return;
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const element = entry.target;
        const target = Number(element.dataset.count || 0);
        const start = performance.now();
        const duration = 900;
        const tick = (now) => {
          const progress = Math.min(1, (now - start) / duration);
          const eased = 1 - Math.pow(1 - progress, 3);
          element.textContent = String(Math.round(target * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
        observer.unobserve(element);
      });
    }, { threshold: 0.4 });
    counters.forEach((counter) => observer.observe(counter));
  }

  function initJoinForm() {
    const form = $('[data-join-form]');
    const error = $('[data-form-error]');
    if (!form) return;
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const name = String(data.get('name') || '').trim();
      if (!name) {
        if (error) error.textContent = 'Please enter your name before generating WhatsApp booking.';
        $('input[name="name"]', form)?.focus();
        return;
      }
      if (error) error.textContent = '';
      window.open(getWhatsAppUrl({ name }), '_blank', 'noopener');
    });
  }

  function initImageFallbacks() {
    document.addEventListener('error', (event) => {
      const target = event.target;
      if (!(target instanceof HTMLImageElement)) return;
      const holder = target.closest('.hero-backdrop, .story-media, .program-card, .coach-card, .gallery-card, .lightbox-panel');
      holder?.classList.add('image-failed');
      target.remove();
    }, true);
  }

  function initKeyboard() {
    document.addEventListener('keydown', (event) => {
      if (event.key !== 'Escape') return;
      closeModal();
      const lightbox = $('[data-lightbox].is-open');
      if (lightbox) {
        lightbox.classList.remove('is-open');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        state.lastFocus?.focus?.();
      }
    });
  }

  reduceMotion.addEventListener?.('change', () => {
    if (reduceMotion.matches) {
      $$('[data-animate], .reveal').forEach((element) => element.classList.add('is-visible'));
    }
  });

  initImageFallbacks();
  initNavigation();
  ScrollMotionController.init();
  initProgramFilters();
  initPackageSelector();
  initModal();
  initLightbox();
  initTestimonials();
  initCounters();
  initJoinForm();
  initKeyboard();
  updateOpenStatus();
  refreshIcons();
})();
