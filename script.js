const isFilePreview = location.protocol === "file:";
if (isFilePreview) {
  document.querySelectorAll('img[src^="/gyms/"]').forEach((img) => {
    img.src = `.${img.getAttribute("src")}`;
  });
  const heroPath = getComputedStyle(document.body).getPropertyValue("--hero-image");
  document.body.style.setProperty("--hero-image", heroPath.replace("url('/gyms/", "url('./gyms/").replace('url("/gyms/', 'url("./gyms/'));
}
const progress = document.getElementById("progress");
function update() {
  const max = document.documentElement.scrollHeight - innerHeight;
  const ratio = max > 0 ? scrollY / max : 0;
  document.documentElement.style.setProperty("--scroll-y", String(scrollY));
  if (progress) progress.style.setProperty("--progress", `${Math.max(0, Math.min(1, ratio)) * 100}%`);
  document.querySelectorAll(".parallax-section").forEach((section) => {
    const speed = Number(section.dataset.parallax || 0.03);
    const rect = section.getBoundingClientRect();
    section.style.transform = `translate3d(0, ${(rect.top - innerHeight / 2) * speed}px, 0)`;
  });
}
addEventListener("scroll", update, { passive: true });
addEventListener("resize", update);
update();
document.querySelectorAll("[data-fallback-image]").forEach((img) => {
  img.addEventListener("error", () => img.closest(".visual-card")?.classList.add("failed"), { once: true });
});
