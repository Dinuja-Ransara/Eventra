/* ============================================
   EVENTARA — Core Interactivity
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  initCursorGlow();
  initBurger();
  initReveal();
  initPageTransition();
  initToastHost();
  safeIcons();
});

/* ---------- defensive icon render ----------
   Guards every lucide.createIcons() call so a blocked/slow CDN
   (e.g. offline use, restrictive network) never throws and halts
   the rest of a script's execution. */
function safeIcons() {
  try {
    if (window.lucide && typeof lucide.createIcons === "function") {
      lucide.createIcons();
    }
  } catch (err) {
    console.warn("Icon render skipped:", err);
  }
}

/* ---------- cursor glow ---------- */
function initCursorGlow() {
  const glow = document.createElement("div");
  glow.className = "cursor-glow";
  document.body.appendChild(glow);
  let x = window.innerWidth / 2, y = window.innerHeight / 2, cx = x, cy = y;
  window.addEventListener("mousemove", e => { x = e.clientX; y = e.clientY; });
  (function loop() {
    cx += (x - cx) * 0.12;
    cy += (y - cy) * 0.12;
    glow.style.transform = `translate(${cx}px, ${cy}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  })();
}

/* ---------- mobile nav ---------- */
function initBurger() {
  const burger = document.querySelector(".burger");
  const links = document.querySelector(".nav-links");
  if (!burger || !links) return;
  burger.addEventListener("click", () => {
    const open = links.classList.toggle("mobile-open");
    burger.innerHTML = open
      ? '<i data-lucide="x"></i>'
      : '<i data-lucide="menu"></i>';
    links.style.cssText = open
      ? "display:flex;flex-direction:column;position:absolute;top:76px;left:0;right:0;background:rgba(8,8,13,.97);padding:24px 32px;gap:20px;border-bottom:1px solid var(--border)"
      : "";
    safeIcons();
  });
}

/* ---------- scroll reveal ---------- */
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]");
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  els.forEach((el, i) => {
    el.style.transitionDelay = `${(i % 6) * 70}ms`;
    io.observe(el);
  });
}

/* ---------- page transition on internal nav ---------- */
function initPageTransition() {
  const overlay = document.createElement("div");
  overlay.className = "page-transition";
  overlay.innerHTML = `<div class="bars"><span></span><span></span><span></span><span></span></div>`;
  document.body.appendChild(overlay);

  document.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#") || href.startsWith("http") || link.target === "_blank") return;
    if (!href.endsWith(".html") && !href.includes(".html?")) return;
    e.preventDefault();
    overlay.classList.add("active");
    setTimeout(() => { window.location.href = href; }, 380);
  });

  window.addEventListener("pageshow", () => overlay.classList.remove("active"));
}

/* ---------- toast ---------- */
function initToastHost() {
  const host = document.createElement("div");
  host.id = "toast-host";
  document.body.appendChild(host);
}
function showToast(message, icon = "check") {
  let el = document.querySelector(".toast");
  if (el) el.remove();
  el = document.createElement("div");
  el.className = "toast";
  el.innerHTML = `<span class="dot"><i data-lucide="${icon}" style="width:18px;height:18px"></i></span><span>${message}</span>`;
  document.getElementById("toast-host").appendChild(el);
  safeIcons();
  requestAnimationFrame(() => el.classList.add("show"));
  setTimeout(() => { el.classList.remove("show"); setTimeout(() => el.remove(), 400); }, 3200);
}

/* ---------- card builder (used across pages) ---------- */
function buildEventCard(ev, opts = {}) {
  const size = opts.size || ev.size || "sm";
  const sizeClass = size === "lg" ? "card-lg" : size === "md" ? "card-md" : "card-sm";

  // Check if an image exists. If yes, apply it as a background. If no, fallback to the gradient.
  const bgMarkup = ev.image
    ? `<div class="bg" style="background-image: url('${ev.image}'); background-size: cover; background-position: center;"></div>`
    : `<div class="bg ${ev.grad}"></div>`;

  return `
  <a href="event.html?id=${ev.id}" class="ecard ${opts.noSize ? "" : sizeClass}" data-reveal="scale">
    ${bgMarkup}
    <span class="ecard-cat">${ev.category}</span>
    ${ev.live ? `<span class="ecard-live">Live</span>` : ""}
    <div class="ecard-body">
      <h3>${ev.title}</h3>
      <div class="meta">
        <span><i data-lucide="calendar" style="width:13px;height:13px"></i> ${formatDate(ev.date)}</span>
        <span><i data-lucide="map-pin" style="width:13px;height:13px"></i> ${ev.city}</span>
      </div>
      <div class="price">${formatPrice(ev.price, ev.currency)}</div>
    </div>
  </a>`;
}

/* ---------- animated count-up (used on dashboard/home stats) ---------- */
function countUp(el, target, duration = 1400, prefix = "", suffix = "") {
  const start = performance.now();
  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = Math.floor(eased * target);
    el.textContent = prefix + val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
    else el.textContent = prefix + target.toLocaleString() + suffix;
  }
  requestAnimationFrame(tick);
}

/* ---------- generic debounce ---------- */
function debounce(fn, wait = 250) {
  let t;
  return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), wait); };
}
