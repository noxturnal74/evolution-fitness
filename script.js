(() => {
  if (document.querySelector('script[src="/gyms/shared/site.js"]')) return;
  const sharedScript = document.createElement("script");
  sharedScript.src = "/gyms/shared/site.js";
  sharedScript.defer = true;
  document.head.appendChild(sharedScript);
})();
