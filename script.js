// Scroll reveals
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) {
      e.target.classList.add("in");
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

// Interactive demo toggle
const demo = document.querySelector(".demo");
const demoToggle = document.querySelector(".demo-toggle");
if (demo && demoToggle) {
  // start on
  demo.classList.add("on");
  demoToggle.addEventListener("click", () => {
    demo.classList.toggle("on");
  });

  // auto-cycle for drama if user hasn't interacted
  let userTouched = false;
  demoToggle.addEventListener("click", () => (userTouched = true));
  let cycles = 0;
  const cycle = setInterval(() => {
    if (userTouched || cycles > 4) { clearInterval(cycle); return; }
    demo.classList.toggle("on");
    cycles++;
  }, 2800);
}

// Subtle parallax on hero demo
const parallaxEl = document.querySelector(".demo");
if (parallaxEl && window.matchMedia("(pointer: fine)").matches) {
  const hero = document.querySelector(".hero");
  hero?.addEventListener("mousemove", (e) => {
    const r = hero.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    parallaxEl.style.transform = `perspective(1400px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg) translateZ(0)`;
  });
  hero?.addEventListener("mouseleave", () => {
    parallaxEl.style.transform = "";
  });
}

// Current year
document.querySelectorAll("[data-year]").forEach((el) => {
  el.textContent = new Date().getFullYear();
});
