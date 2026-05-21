export function Logo(name: string) {
  return `<span class="text-logo">${name}</span>`;
}

export function Hero(title: string, subtitle: string) {
  return `<section class="hero"><div class="hero-copy"><h1>${title}</h1><p class="lead">${subtitle}</p></div></section>`;
}

export function ParallaxSection(content: string) {
  return `<section class="section parallax-section">${content}</section>`;
}

export function GymLandingPage(title: string, subtitle: string) {
  return `${Hero(title, subtitle)}`;
}
