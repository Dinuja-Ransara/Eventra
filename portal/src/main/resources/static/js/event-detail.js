/* ============================================
   EVENTARA — Event Detail Page Logic
   ============================================ */

let currentEvent = null;
let selectedTierIndex = 0;
let qty = 1;
let countdownInterval = null;

document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id") || EVENTS[0].id;
  currentEvent = getEventById(id) || EVENTS[0];

  renderEventHero();
  renderInfoRow();
  renderAbout();
  renderLineup();
  renderReviews();
  renderLocation();
  renderTiers();
  renderRelated();
  bindTabs();
  bindQty();
  bindBuy();
  startCountdown();

  safeIcons();
  initReveal();
});

function renderEventHero(){
  document.title = `${currentEvent.title} — Eventara`;
  document.getElementById("crumb-cat").textContent = currentEvent.category;
  document.getElementById("event-hero-bg").className = `bg ${currentEvent.grad}`;
  document.getElementById("event-title").textContent = currentEvent.title;
  document.getElementById("event-tags").innerHTML = `
    <span class="tag"><i data-lucide="${getCategoryIcon(currentEvent.category)}" style="width:13px;height:13px"></i> ${currentEvent.category}</span>
    ${currentEvent.live ? `<span class="tag" style="background:var(--pink);color:#0a0a0f;border-color:transparent">● Live now</span>` : ""}
  `;
}

function renderInfoRow(){
  const el = document.getElementById("info-row");
  el.innerHTML = `
    <div class="info-chip"><div class="ic"><i data-lucide="calendar-days" style="width:18px;height:18px"></i></div><div><b>${formatDate(currentEvent.date)}</b><span>${currentEvent.time}</span></div></div>
    <div class="info-chip"><div class="ic"><i data-lucide="map-pin" style="width:18px;height:18px"></i></div><div><b>${currentEvent.venue.split(",")[0]}</b><span>${currentEvent.city}</span></div></div>
    <div class="info-chip"><div class="ic"><i data-lucide="users" style="width:18px;height:18px"></i></div><div><b>${currentEvent.attendees.toLocaleString()}+ going</b><span>Attendees</span></div></div>
    <div class="info-chip"><div class="ic"><i data-lucide="star" style="width:18px;height:18px"></i></div><div><b>${currentEvent.rating} / 5.0</b><span>${currentEvent.reviewsCount} reviews</span></div></div>
  `;
}

function renderAbout(){
  document.getElementById("event-desc").textContent = currentEvent.description;
  const stack = document.getElementById("avatar-stack");
  const colors = ["var(--violet)", "var(--cyan)", "var(--pink)", "var(--lime)", "var(--amber)"];
  stack.innerHTML = Array.from({ length: 5 }).map((_, i) => `
    <div style="width:34px;height:34px;border-radius:50%;background:${colors[i]};border:2px solid var(--bg);margin-left:${i ? "-10px" : "0"};display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#0a0a0f">${String.fromCharCode(65 + i)}</div>
  `).join("");
  document.getElementById("attendee-count-text").textContent = `${currentEvent.attendees.toLocaleString()} people are going, including friends`;
}

function renderLineup(){
  const el = document.getElementById("lineup-list");
  if(!currentEvent.lineup.length){
    el.innerHTML = `<p style="color:var(--text-faint)">Lineup announcements coming soon.</p>`;
    return;
  }
  el.innerHTML = currentEvent.lineup.map(a => `
    <div class="lineup-item">
      <div class="avatar">${a.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
      <div><b>${a.name}</b><span>${a.role}</span></div>
    </div>
  `).join("");
}

function renderReviews(){
  document.getElementById("rating-big").textContent = currentEvent.rating.toFixed(1);
  document.getElementById("rating-count-text").textContent = `Based on ${currentEvent.reviewsCount} reviews`;
  const el = document.getElementById("reviews-list");
  el.innerHTML = REVIEWS.map(r => `
    <div class="review-item">
      <div class="review-head">
        <div class="who">
          <div class="av">${r.name[0]}</div>
          <b style="font-size:14px">${r.name}</b>
        </div>
        <span class="stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</span>
      </div>
      <p>${r.text}</p>
    </div>
  `).join("");
}

function renderLocation(){
  document.getElementById("loc-venue").textContent = currentEvent.venue;
  document.getElementById("loc-city").textContent = currentEvent.city + ", Sri Lanka";
}

function renderTiers(){
  const el = document.getElementById("tier-list");
  el.innerHTML = currentEvent.tiers.map((t, i) => `
    <div class="ticket-tier ${i === selectedTierIndex ? "selected" : ""}" data-idx="${i}">
      <div><b>${t.name}</b><span>${t.desc} · ${t.left} left</span></div>
      <div class="price">${formatPrice(t.price, currentEvent.currency)}</div>
    </div>
  `).join("");
  el.querySelectorAll(".ticket-tier").forEach(tier => {
    tier.addEventListener("click", () => {
      selectedTierIndex = parseInt(tier.dataset.idx);
      renderTiers();
      updateTotal();
    });
  });
  updateTotal();
}

function bindQty(){
  document.getElementById("qty-minus").addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    document.getElementById("qty-val").textContent = qty;
    updateTotal();
  });
  document.getElementById("qty-plus").addEventListener("click", () => {
    qty = Math.min(10, qty + 1);
    document.getElementById("qty-val").textContent = qty;
    updateTotal();
  });
}

function updateTotal(){
  const tier = currentEvent.tiers[selectedTierIndex];
  const total = tier.price * qty;
  document.getElementById("total-price").textContent = formatPrice(total, currentEvent.currency);
}

function bindBuy(){
  document.getElementById("buy-btn").addEventListener("click", () => {
    const btn = document.getElementById("buy-btn");
    btn.innerHTML = `<i data-lucide="loader-2" class="spin" style="width:16px;height:16px"></i> Processing...`;
    safeIcons();
    btn.style.opacity = ".7";
    setTimeout(() => {
      btn.innerHTML = `<i data-lucide="ticket" style="width:16px;height:16px"></i> Get Tickets`;
      btn.style.opacity = "1";
      safeIcons();
      showToast(`${qty} ticket${qty > 1 ? "s" : ""} reserved — check your email for QR codes`, "check-circle-2");
    }, 1100);
  });
}

function bindTabs(){
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      document.querySelectorAll(".tab-panel").forEach(p => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
    });
  });
}

function startCountdown(){
  const target = new Date(currentEvent.date + "T00:00:00").getTime();
  function tick(){
    const now = Date.now();
    let diff = Math.max(0, target - now);
    const days = Math.floor(diff / 86400000); diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000); diff -= hours * 3600000;
    const mins = Math.floor(diff / 60000); diff -= mins * 60000;
    const secs = Math.floor(diff / 1000);
    document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
    document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
    document.getElementById("cd-mins").textContent = String(mins).padStart(2, "0");
    document.getElementById("cd-secs").textContent = String(secs).padStart(2, "0");
  }
  tick();
  countdownInterval = setInterval(tick, 1000);
}

function renderRelated(){
  const el = document.getElementById("related-scroll");
  const related = EVENTS.filter(e => e.id !== currentEvent.id && e.category === currentEvent.category);
  const list = (related.length ? related : EVENTS.filter(e => e.id !== currentEvent.id)).slice(0, 5);
  el.innerHTML = list.map(ev => buildEventCard(ev, { noSize: true })).join("");
  safeIcons();
}
