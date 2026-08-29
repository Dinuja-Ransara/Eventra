/* ============================================
   EVENTARA — Create Event Wizard Logic
   ============================================ */

let currentStep = 1;
const totalSteps = 4;
let tierCount = 0;

document.addEventListener("DOMContentLoaded", () => {
  bindLivePreview();
  bindCategorySelect();
  bindGradPicker();
  bindWizardNav();
  addTierRow("General Admission", 2500, 200);
  safeIcons();
});

/* ---------- live preview ---------- */
function bindLivePreview(){
  const title = document.getElementById("in-title");
  const venue = document.getElementById("in-venue");
  const date = document.getElementById("in-date");

  title.addEventListener("input", () => {
    document.getElementById("preview-title").textContent = title.value || "Your event title";
  });
  venue.addEventListener("input", () => {
    document.getElementById("preview-venue").textContent = venue.value || "Venue will appear here";
  });
  date.addEventListener("input", () => {
    document.getElementById("preview-date").textContent = date.value ? formatDate(date.value) : "Pick a date";
  });
}

function bindCategorySelect(){
  document.querySelectorAll(".category-opt").forEach(opt => {
    opt.addEventListener("click", () => {
      document.querySelectorAll(".category-opt").forEach(o => o.classList.remove("selected"));
      opt.classList.add("selected");
      document.getElementById("preview-cat").textContent = opt.dataset.cat;
    });
  });
}

function bindGradPicker(){
  document.querySelectorAll(".grad-swatch").forEach(sw => {
    sw.addEventListener("click", () => {
      document.querySelectorAll(".grad-swatch").forEach(s => {
        s.style.borderColor = "transparent";
        s.classList.remove("selected");
      });
      sw.style.borderColor = "var(--violet)";
      sw.classList.add("selected");
      const preview = document.getElementById("preview-bg");
      preview.className = "ph " + sw.dataset.grad;
    });
  });
}

/* ---------- ticket tiers (step 2) ---------- */
function addTierRow(name = "", price = "", qty = ""){
  tierCount++;
  const wrap = document.getElementById("ticket-rows");
  const row = document.createElement("div");
  row.className = "glass";
  row.style.cssText = "padding:16px;border-radius:14px;margin-bottom:14px";
  row.innerHTML = `
    <div class="form-grid">
      <div class="field full">
        <label>Tier name</label>
        <input type="text" value="${name}" placeholder="e.g. VIP Lounge" class="tier-name">
      </div>
      <div class="field">
        <label>Price (LKR)</label>
        <input type="number" value="${price}" placeholder="2500" class="tier-price">
      </div>
      <div class="field">
        <label>Quantity available</label>
        <input type="number" value="${qty}" placeholder="200" class="tier-qty">
      </div>
    </div>
    <button class="btn btn-ghost btn-sm remove-tier"><i data-lucide="trash-2" style="width:13px;height:13px"></i> Remove tier</button>
  `;
  wrap.appendChild(row);
  row.querySelector(".remove-tier").addEventListener("click", () => {
    if(wrap.children.length > 1){ row.remove(); }
    else { showToast("You need at least one ticket tier", "alert-triangle"); }
  });
  safeIcons();
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("add-tier-btn").addEventListener("click", () => addTierRow());
});

/* ---------- wizard navigation ---------- */
function bindWizardNav(){
  document.getElementById("next-btn").addEventListener("click", () => {
    if(currentStep === 1 && !validateStep1()) return;
    if(currentStep < totalSteps){
      goToStep(currentStep + 1);
    } else {
      publishEvent();
    }
  });
  document.getElementById("prev-btn").addEventListener("click", () => {
    if(currentStep > 1) goToStep(currentStep - 1);
  });
}

function validateStep1(){
  const title = document.getElementById("in-title").value.trim();
  const venue = document.getElementById("in-venue").value.trim();
  if(!title || !venue){
    showToast("Please add an event title and venue to continue", "alert-triangle");
    return false;
  }
  return true;
}

function goToStep(step){
  document.getElementById(`step-${currentStep}`).classList.add("hidden");
  currentStep = step;
  document.getElementById(`step-${currentStep}`).classList.remove("hidden");

  document.querySelectorAll(".wizard-step").forEach(el => {
    const s = parseInt(el.dataset.step);
    el.classList.toggle("active", s === currentStep);
    el.classList.toggle("done", s < currentStep);
    if(s < currentStep) el.querySelector(".circle").innerHTML = '<i data-lucide="check" style="width:14px;height:14px"></i>';
    else el.querySelector(".circle").textContent = s;
  });
  safeIcons();

  document.getElementById("prev-btn").style.visibility = currentStep === 1 ? "hidden" : "visible";
  const nextBtn = document.getElementById("next-btn");
  nextBtn.innerHTML = currentStep === totalSteps
    ? '<i data-lucide="rocket" style="width:15px;height:15px"></i> Publish Event'
    : 'Continue <i data-lucide="arrow-right" style="width:15px;height:15px"></i>';
  safeIcons();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function publishEvent(){
  const btn = document.getElementById("next-btn");
  btn.innerHTML = '<i data-lucide="loader-2" class="spin" style="width:15px;height:15px"></i> Publishing...';
  safeIcons();
  setTimeout(() => {
    showToast("Event published! Redirecting to your dashboard...", "party-popper");
    setTimeout(() => { window.location.href = "dashboard.html"; }, 1200);
  }, 1000);
}
