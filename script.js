const header = document.querySelector("[data-header]");
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const revealItems = document.querySelectorAll(".reveal");
const parallaxItems = document.querySelectorAll("[data-parallax]");
const scrollProgress = document.querySelector("[data-scroll-progress]");

function setHeaderState() {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function setScrollProgress() {
  if (!scrollProgress) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
  scrollProgress.style.setProperty("--scroll-progress", `${Math.min(progress, 100)}%`);
}

setHeaderState();
setScrollProgress();
window.addEventListener("scroll", setHeaderState, { passive: true });
window.addEventListener("scroll", setScrollProgress, { passive: true });

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.16, rootMargin: "0px 0px -40px 0px" });

revealItems.forEach((item) => revealObserver.observe(item));

function runCounters() {
  document.querySelectorAll("[data-count]").forEach((item) => {
    const target = Number(item.dataset.count);
    const duration = 1300;
    const startedAt = performance.now();

    function step(now) {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      item.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  });
}

let countersStarted = false;
const counterObserver = new IntersectionObserver((entries) => {
  if (!countersStarted && entries.some((entry) => entry.isIntersecting)) {
    countersStarted = true;
    runCounters();
    counterObserver.disconnect();
  }
}, { threshold: 0.4 });

document.querySelectorAll(".hero-panel").forEach((item) => counterObserver.observe(item));

function updateParallax() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const viewportMid = window.innerHeight / 2;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallax || 0);
    const rect = item.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - viewportMid) * speed;
    const scale = item.classList.contains("hero-media") || item.classList.contains("immersive-media") ? 1.08 : 1;
    item.style.transform = `translate3d(0, ${offset * -1}px, 0) scale(${scale})`;
  });
}

updateParallax();
window.addEventListener("scroll", updateParallax, { passive: true });
window.addEventListener("resize", () => {
  setScrollProgress();
  updateParallax();
});
