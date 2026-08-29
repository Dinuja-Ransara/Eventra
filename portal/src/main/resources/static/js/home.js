let globalEventsCache = [];

document.addEventListener("DOMContentLoaded", () => {
  loadEventsFromBackend();

  const searchInput = document.getElementById("hero-search-input");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      filterEventsBySearch(e.target.value.toLowerCase());
    });
  }
});

async function loadEventsFromBackend() {
  try {
    const response = await fetch('/api/events');
    if (!response.ok) throw new Error('Backend error');
    const events = await response.json();

    // Filter strictly for APPROVED events across the public portal
    globalEventsCache = (events || []).filter(e => e.status === "APPROVED");
  } catch (err) {
    console.warn("Could not load events:", err);
    globalEventsCache = [];
  }

  renderAllSections(globalEventsCache);
  updateHeroStats(globalEventsCache);
}

function renderAllSections(events) {
  renderFeaturedBento(events);
  renderLiveTrending(events);
  renderAllEventsGrid(events);
}

// 1. FEATURED: Top 4 upcoming recent events matching dates
function renderFeaturedBento(events) {
  const bentoGrid = document.getElementById("bento-grid");
  if (!bentoGrid) return;

  bentoGrid.innerHTML = "";

  // Sort by closest upcoming date
  const sortedUpcoming = [...events].sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  const featured = sortedUpcoming.slice(0, 4);

  if (featured.length === 0) {
    bentoGrid.innerHTML = `<p style="color:var(--text-dim); padding: 10px;">No upcoming featured events.</p>`;
    return;
  }

  featured.forEach((event, index) => {
    const card = document.createElement("div");
    const bgImage = event.imageUrl || "sources/aluth kalawak.jpg";

    card.style.cssText = `
      background-image: linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(10,10,15,0.9)), url('${bgImage}');
      background-size: cover;
      background-position: center;
      border-radius: 16px;
      overflow: hidden;
      min-height: 180px;
      padding: 20px;
      display: flex;
      flex-direction: column;
      justify-content: flex-end;
      border: 1px solid rgba(48, 54, 61, 0.8);
      cursor: pointer;
    `;

    card.innerHTML = `
      <span style="background: rgba(13,17,23,0.8); width: fit-content; padding: 4px 10px; border-radius: 20px; font-size: 10px; color: var(--cyan); text-transform: uppercase; font-weight: 700; margin-bottom: 8px;">${event.category}</span>
      <h3 style="color: #fff; font-size: 16px; margin: 0 0 4px 0;">${event.title}</h3>
      <p style="color: #8b949e; font-size: 11px; margin: 0;">📅 ${event.eventDate} · 📍 ${event.venue}</p>
    `;
    bentoGrid.appendChild(card);
  });
}

// 2. LIVE & TRENDING: Only events explicitly toggled trending by Admin
function renderLiveTrending(events) {
  const liveScroll = document.getElementById("live-scroll");
  if (!liveScroll) return;

  liveScroll.innerHTML = "";
  const trendingEvents = events.filter(e => e.trending === true);

  if (trendingEvents.length === 0) {
    liveScroll.innerHTML = `<p style="color:var(--text-dim); font-size:13px; padding: 10px;">No trending events selected by admin yet.</p>`;
    return;
  }

  trendingEvents.forEach(event => {
    const card = document.createElement("div");
    card.style.cssText = `
      min-width: 260px;
      background: rgba(22, 27, 34, 0.7);
      border: 1px solid rgba(48, 54, 61, 0.8);
      border-radius: 12px;
      overflow: hidden;
      cursor: pointer;
    `;

    const bgImage = event.imageUrl || "sources/aluth kalawak.jpg";

    card.innerHTML = `
      <div style="background-image: url('${bgImage}'); background-size: cover; background-position: center; height: 130px;"></div>
      <div style="padding: 14px;">
        <span style="font-size: 10px; color: var(--pink); font-weight:700; text-transform:uppercase;">🔥 Trending</span>
        <h4 style="margin: 4px 0; font-size: 14px; color: #fff; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${event.title}</h4>
        <p style="font-size: 11px; color: #8b949e; margin: 0;">📍 ${event.venue} · 📅 ${event.eventDate}</p>
      </div>
    `;
    liveScroll.appendChild(card);
  });
}

// 3. BROWSE EVERYTHING: All approved events
function renderAllEventsGrid(events) {
  const grid = document.getElementById("all-events-grid");
  const countEl = document.getElementById("results-count");
  if (!grid) return;

  if (countEl) countEl.innerText = `${events.length} Events Found`;
  grid.innerHTML = "";

  grid.style.display = "grid";
  grid.style.gridTemplateColumns = "repeat(auto-fill, minmax(280px, 1fr))";
  grid.style.gap = "24px";
  grid.style.marginTop = "20px";

  if (events.length === 0) {
    grid.innerHTML = `<p style="color: var(--text-dim); grid-column: 1/-1; padding: 20px;">No approved events available.</p>`;
    return;
  }

  events.forEach(event => {
    const card = document.createElement("div");
    card.style.cssText = `
      background: rgba(22, 27, 34, 0.7);
      border: 1px solid rgba(48, 54, 61, 0.8);
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(0,0,0,0.3);
    `;

    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px)";
      card.style.borderColor = "var(--pink, #f43f5e)";
    });
    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0)";
      card.style.borderColor = "rgba(48, 54, 61, 0.8)";
    });

    const bgImage = event.imageUrl || "sources/aluth kalawak.jpg";

    card.innerHTML = `
      <div style="position: relative; height: 180px; background-image: url('${bgImage}'); background-size: cover; background-position: center;">
        <span style="position: absolute; top: 12px; left: 12px; background: rgba(13, 17, 23, 0.8); backdrop-filter: blur(4px); font-size: 10px; color: var(--cyan); text-transform: uppercase; font-weight: 700; padding: 4px 10px; border-radius: 20px;">
          ${event.category}
        </span>
      </div>
      <div style="padding: 20px;">
        <h3 style="font-size: 18px; color: #fff; margin: 0 0 8px 0; font-weight: 700;">${event.title}</h3>
        <div style="font-size: 13px; color: #8b949e; margin-bottom: 6px;">📅 ${event.eventDate} • 📍 ${event.venue}</div>
        <div style="background: rgba(13, 17, 23, 0.5); border-radius: 8px; padding: 8px 12px; margin: 12px 0; font-size: 12px; color: #c9d1d9; border: 1px solid #30363d;">
          <strong style="color: var(--pink); font-size: 10px; text-transform: uppercase; display: block; margin-bottom: 2px;">Tickets</strong>
          ${event.ticketPrice}
        </div>
        <button class="btn btn-primary btn-sm" style="width: 100%; justify-content: center; border-radius: 8px;">Get Tickets</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

function filterEventsBySearch(query) {
  const filtered = globalEventsCache.filter(e =>
    e.title.toLowerCase().includes(query) ||
    e.venue.toLowerCase().includes(query) ||
    e.category.toLowerCase().includes(query)
  );
  renderAllSections(filtered);
}

function updateHeroStats(events) {
  const statEvents = document.getElementById("stat-events");
  if (statEvents) statEvents.innerText = events.length;
}