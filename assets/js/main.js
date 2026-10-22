document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-navigation");

  // Company section fade-in on scroll
  const companyLayout = document.querySelector(".company-layout");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (companyLayout && "IntersectionObserver" in window && !reduceMotion) {
    document.documentElement.classList.add("reveal-ready");

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    observer.observe(companyLayout);
  }

  // Mobile navigation toggle
  if (!toggle || !nav) return;

  const setOpen = (open) => {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "メニューを閉じる" : "メニューを開く");
    nav.classList.toggle("open", open);
  };

  toggle.addEventListener("click", () => {
    setOpen(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => setOpen(false));
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setOpen(false);
  });
});
