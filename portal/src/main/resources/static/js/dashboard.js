/* ============================================
   EVENTARA — Dashboard Logic
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  animateKPIs();
  renderSalesChart();
  renderTrafficChart();
  renderOrdersTable();
  renderTopEvents();
  safeIcons();
});

function animateKPIs(){
  countUp(document.getElementById("kpi-revenue"), 4820000, 1400, "Rs. ");
  countUp(document.getElementById("kpi-attendees"), 18240, 1400);
  countUp(document.getElementById("kpi-views"), 92100, 1400);
  countUp(document.getElementById("kpi-events"), 12, 900);
}

function chartTheme(){
  return {
    grid: "rgba(255,255,255,.06)",
    text: "#a3a3ba",
    violet: "#b026ff",
    cyan: "#00f0ff",
    pink: "#ff2e97",
    lime: "#d4ff3f"
  };
}

function renderSalesChart(){
  const ctx = document.getElementById("salesChart");
  if(!ctx) return;
  const t = chartTheme();
  const labels = Array.from({length:14}, (_,i) => `Day ${i+1}`);
  const data = [12,19,14,25,22,30,28,35,31,40,38,46,42,52].map(v => v * 4200);

  const gradient = ctx.getContext("2d").createLinearGradient(0,0,0,220);
  gradient.addColorStop(0, "rgba(176,38,255,.35)");
  gradient.addColorStop(1, "rgba(176,38,255,0)");

  new Chart(ctx, {
    type: "line",
    data: {
      labels,
      datasets: [{
        label: "Revenue",
        data,
        borderColor: t.violet,
        backgroundColor: gradient,
        borderWidth: 2.5,
        pointRadius: 0,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: t.cyan,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { display: false }, ticks: { color: t.text, font: { size: 10 } } },
        y: { grid: { color: t.grid }, ticks: { color: t.text, font: { size: 10 }, callback: v => "Rs" + (v/1000) + "k" } }
      },
      interaction: { intersect: false, mode: "index" }
    }
  });
}

function renderTrafficChart(){
  const ctx = document.getElementById("trafficChart");
  if(!ctx) return;
  const t = chartTheme();
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Direct", "Social", "Search", "Referral"],
      datasets: [{
        data: [42, 28, 20, 10],
        backgroundColor: [t.violet, t.cyan, t.pink, t.lime],
        borderColor: "#13131c",
        borderWidth: 4,
        hoverOffset: 8
      }]
    },
    options: {
      responsive: true,
      cutout: "68%",
      plugins: {
        legend: { position: "bottom", labels: { color: t.text, boxWidth: 10, padding: 16, font: { size: 11 } } }
      }
    }
  });
}

function renderOrdersTable(){
  const el = document.getElementById("orders-table");
  const rows = [
    { id: "#EV-8231", event: "Aluth Kalawak 2026", buyer: "D. Perera", amount: 6500, status: "confirmed" },
    { id: "#EV-8230", event: "Nada Gama", buyer: "K. Silva", amount: 4200, status: "confirmed" },
    { id: "#EV-8229", event: "Code Colombo", buyer: "R. Fernando", amount: 8000, status: "pending" },
    { id: "#EV-8228", event: "Yogeshawari", buyer: "T. Jayasuriya", amount: 3000, status: "checked" },
    { id: "#EV-8227", event: "Aluth Kalawak 2026", buyer: "N. Wickrama", amount: 2500, status: "confirmed" }
  ];
  el.innerHTML = rows.map(r => `
    <tr>
      <td style="font-family:var(--font-mono);color:var(--text-faint)">${r.id}</td>
      <td>${r.event}</td>
      <td>${r.buyer}</td>
      <td style="font-family:var(--font-mono)">Rs. ${r.amount.toLocaleString()}</td>
      <td><span class="status-badge ${r.status}">${r.status}</span></td>
    </tr>
  `).join("");
}

function renderTopEvents(){
  const el = document.getElementById("top-events");
  const top = [...EVENTS].sort((a,b) => b.attendees - a.attendees).slice(0, 5);
  const max = top[0].attendees;
  el.innerHTML = top.map(ev => `
    <div class="event-row">
      <div class="thumb ${ev.grad}"></div>
      <div style="flex:1">
        <b>${ev.title}</b>
        <span>${ev.attendees.toLocaleString()} attendees</span>
        <div class="progress-track"><div class="progress-fill" style="width:${(ev.attendees/max*100).toFixed(0)}%"></div></div>
      </div>
    </div>
  `).join("");
}
