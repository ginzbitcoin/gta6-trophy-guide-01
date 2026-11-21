const STORE_KEY = "leonida-platinum-atlas-v1";
const DATA_URL = "data/trophies.json";

let trophies = [];
let checked = {};

function isMissable(trophy) {
  return trophy && trophy.missable === true;
}

function loadChecked() {
  try {
    checked = JSON.parse(localStorage.getItem(STORE_KEY) || "{}");
  } catch (e) {
    checked = {};
  }
}

function saveChecked() {
  localStorage.setItem(STORE_KEY, JSON.stringify(checked));
}

function iconSvg(name) {
  const paths = {
    crown: '<path d="M3 8l4 4 5-6 5 6 4-4v9H3z" fill="#7df9ff"/><path d="M5 20h14v2H5z" fill="#ffd34d"/>',
    star: '<path d="M12 2l2.9 6.3 6.9.8-5.1 4.7 1.4 6.8L12 17l-6.1 3.6 1.4-6.8L2.2 9.1l6.9-.8z" fill="#ffd34d"/>',
    trophy: '<path d="M6 2h12v2h3v3a5 5 0 0 1-5 5h-1v3h3v2H6v-2h3v-3H8a5 5 0 0 1-5-5V4h3zm-1 4v1a3 3 0 0 0 3 3V6zm14 0h-3v4a3 3 0 0 0 3-3z" fill="#ffd34d"/>',
    map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2zm0 2l4-1.3V16l-4 1.3zm6 0L19 4.7V16l-4 1.3z" fill="#00c2a8"/>',
    gun: '<path d="M2 8h18v3h-6l-2 6h-3l1-5H6v3H4v-3H2z" fill="#c9b8e0"/>',
    car: '<path d="M4 13l2-5h12l2 5v5h-3v-2H7v2H4zm3-1h10l-1-2H8zm2 5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm8 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="#ff7a1a"/>',
    gem: '<path d="M12 2l7 6-7 14L5 8zm-5 6h10l-5 9zm5-4l3 3H9z" fill="#7df9ff"/>',
    users: '<circle cx="9" cy="8" r="3.5" fill="#ff2e88"/><path d="M2 20a7 7 0 0 1 14 0z" fill="#ff2e88"/><circle cx="18" cy="9" r="2.5" fill="#00c2a8"/><path d="M16 20a5.5 5.5 0 0 1 6-4.5V20z" fill="#00c2a8"/>',
    key: '<circle cx="8" cy="8" r="4" fill="none" stroke="#ffd34d" stroke-width="2.5"/><path d="M11 11l9 9-2 2-2-2-2 2-2-2-2 2z" fill="#ffd34d"/>',
    user: '<circle cx="12" cy="8" r="4" fill="#ff2e88"/><path d="M4 22a8 8 0 0 1 16 0z" fill="#ff2e88"/>',
    money: '<rect x="2" y="6" width="20" height="12" rx="2" fill="#2e9e5b"/><circle cx="12" cy="12" r="3.5" fill="#ffd34d"/><text x="12" y="15" font-size="7" text-anchor="middle" fill="#1a3a24">$</text>',
    moon: '<path d="M20 14A8.5 8.5 0 0 1 10 4 8.5 8.5 0 1 0 20 14z" fill="#cfd8e3"/>',
    eye: '<path d="M12 5C6 5 2 12 2 12s4 7 10 7 10-7 10-7-4-7-10-7zm0 11a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" fill="#00c2a8"/>',
    fist: '<path d="M7 11V6a2 2 0 0 1 4 0v4h1V4a2 2 0 0 1 4 0v6h1V7a2 2 0 0 1 4 0v7a7 7 0 0 1-7 7h-2a7 7 0 0 1-7-7v-3z" fill="#e09a5f"/>',
    fish: '<path d="M3 12c3-4 7-6 10-6 3 0 6 2 8 6-2 4-5 6-8 6-3 0-7-2-10-6zm13 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" fill="#00c2a8"/>',
    music: '<path d="M9 3v12.5a3.5 3.5 0 1 0 2 3.2V8h7V3zm2 16a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm6-11H11V5h6z" fill="#ff2e88"/>',
    sun: '<circle cx="12" cy="12" r="5" fill="#ffd34d"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" stroke="#ffd34d" stroke-width="2"/>',
    camera: '<path d="M4 7h3l2-2h6l2 2h3v12H4zm8 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" fill="#c9b8e0"/>',
    heart: '<path d="M12 21C7 16 3 13 3 8.5A4.5 4.5 0 0 1 12 6a4.5 4.5 0 0 1 9 2.5c0 4.5-4 7.5-9 12.5z" fill="#ff2e88"/>',
    dice: '<rect x="4" y="4" width="16" height="16" rx="3" fill="#f5eefc"/><circle cx="9" cy="9" r="1.8" fill="#12081f"/><circle cx="15" cy="15" r="1.8" fill="#12081f"/><circle cx="15" cy="9" r="1.8" fill="#12081f"/><circle cx="9" cy="15" r="1.8" fill="#12081f"/>',
    boat: '<path d="M3 15h18l-2 4H5zm10-9l4 7H7zm-2-3v10h2V3z" fill="#00c2a8"/>',
    plane: '<path d="M22 12L2 3l4 9-4 9z" fill="#cfd8e3"/>'
  };
  const inner = paths[name] || paths.trophy;
  return '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + '</svg>';
}

function escapeHtml(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function trophyCard(t) {
  const done = !!checked[t.id];
  const miss = isMissable(t);
  return '<article class="trophy' + (done ? ' done' : '') + '" data-id="' + escapeHtml(t.id) + '">' +
    '<div class="trophy-icon">' + iconSvg(t.icon) + '</div>' +
    '<div class="trophy-body">' +
    '<div class="badge-row"><span class="grade grade-' + escapeHtml(t.grade) + '">' + escapeHtml(t.grade) + '</span>' +
    '<span class="cat">' + escapeHtml(t.category) + '</span>' +
    (miss ? '<span class="miss">MISSABLE</span>' : '') + '</div>' +
    '<h3>' + escapeHtml(t.name) + '</h3>' +
    '<p>' + escapeHtml(t.description) + '</p></div>' +
    '<label class="trophy-check"><input type="checkbox" data-check="' + escapeHtml(t.id) + '"' + (done ? ' checked' : '') + '> Didapat</label>' +
    '</article>';
}

function updateProgress() {
  const total = trophies.length || 55;
  const done = trophies.filter(function (t) { return checked[t.id]; }).length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const text = document.getElementById("progressText");
  const pctEl = document.getElementById("progressPct");
  const fill = document.getElementById("progressFill");
  if (text) text.textContent = done + " dari " + total + " trofi didapat";
  if (pctEl) pctEl.textContent = pct + "%";
  if (fill) fill.style.width = pct + "%";
}

function renderList(list, container) {
  const el = document.getElementById(container);
  if (!el) return;
  el.innerHTML = list.length ? list.map(trophyCard).join("") : "<p>Trofi tidak ditemukan. Coba kata kunci lain.</p>";
}

function applyFilters() {
  const q = (document.getElementById("search").value || "").toLowerCase();
  const grade = document.getElementById("gradeFilter").value;
  const cat = document.getElementById("catFilter").value;
  const filtered = trophies.filter(function (t) {
    const hay = (t.name + " " + t.description + " " + t.category).toLowerCase();
    if (q && hay.indexOf(q) === -1) return false;
    if (grade !== "all" && t.grade !== grade) return false;
    if (cat !== "all" && t.category !== cat) return false;
    return true;
  });
  renderList(filtered, "trophyList");
}

function renderAll() {
  renderList(trophies, "trophyList");
  renderList(trophies.filter(isMissable), "missableList");
  updateProgress();
}

function switchTab(name) {
  document.querySelectorAll(".tab").forEach(function (b) {
    const active = b.getAttribute("data-tab") === name;
    b.classList.toggle("active", active);
    b.setAttribute("aria-selected", active ? "true" : "false");
  });
  document.querySelectorAll(".panel").forEach(function (p) {
    p.classList.toggle("active", p.id === "tab-" + name);
  });
  if (name === "checklist") applyFilters();
  if (name === "missable") renderList(trophies.filter(isMissable), "missableList");
}

document.addEventListener("DOMContentLoaded", function () {
  loadChecked();
  document.querySelectorAll(".tab").forEach(function (b) {
    b.addEventListener("click", function () { switchTab(b.getAttribute("data-tab")); });
  });
  document.getElementById("search").addEventListener("input", applyFilters);
  document.getElementById("gradeFilter").addEventListener("change", applyFilters);
  document.getElementById("catFilter").addEventListener("change", applyFilters);
  document.getElementById("resetBtn").addEventListener("click", function () {
    if (confirm("Reset semua progres tracker?")) {
      checked = {};
      saveChecked();
      renderAll();
    }
  });
  const hash = (location.hash || "").replace("#", "");
  if (hash === "roadmap" || hash === "missable") switchTab(hash);
  document.addEventListener("change", function (e) {
    const id = e.target && e.target.getAttribute && e.target.getAttribute("data-check");
    if (!id) return;
    if (e.target.checked) checked[id] = true; else delete checked[id];
    saveChecked();
    const card = e.target.closest(".trophy");
    if (card) card.classList.toggle("done", e.target.checked);
    updateProgress();
  });
  fetch(DATA_URL)
    .then(function (r) { return r.json(); })
    .then(function (data) {
      trophies = Array.isArray(data) ? data : data.trophies || [];
      renderAll();
    })
    .catch(function () {
      document.getElementById("trophyList").innerHTML = "<p>Gagal memuat data trofi. Pastikan file data/trophies.json tersedia.</p>";
    });
});
