import type { GymConfig } from "../gyms.config";

export function initials(name: string) {
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((word) => word[0]).join("").toUpperCase();
}

export function Logo(gym: GymConfig) {
  return `<span class="logo-shell" data-logo><img src="${gym.logo}" alt="${gym.name} logo"><span>${initials(gym.name)}</span></span>`;
}

export function Hero(gym: GymConfig) {
  return `<section class="hero variant-${gym.layoutVariant}" style="--hero-image:url('${gym.heroImage}')">${Logo(gym)}<h1>${gym.name}</h1><p>${gym.tagline}</p></section>`;
}

export function ParallaxSection(content: string, tone = "default") {
  return `<section class="parallax-section tone-${tone}">${content}</section>`;
}

export function GymLandingPage(gym: GymConfig) {
  return `${Hero(gym)}${ParallaxSection(`<h2>${gym.city}</h2><p>${gym.description}</p>`)}`;
}
