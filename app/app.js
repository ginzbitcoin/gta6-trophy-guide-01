(function () {
  "use strict";
  var STORE_KEY = "lpa-earned-v1";
  var data = null;
  var earned = {};
  var openId = null;

  function loadEarned() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      earned = raw ? JSON.parse(raw) : {};
    } catch (e) {
      earned = {};
    }
  }
  function saveEarned() {
    try {
      localStorage.setItem(STORE_KEY, JSON.stringify(earned));
    } catch (e) { /* storage penuh atau diblokir, abaikan */ }
  }

  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  function makeCard(t) {
    var card = el("div", "card" + (earned[t.id] ? " earned" : "") + (isMissable(t) ? " missable" : ""));
    card.id = "trophy-" + t.id;
    card.setAttribute("data-grade", t.grade);
    card.setAttribute("data-name", (t.name + " " + t.desc + " " + t.guide).toLowerCase());
    var title = el("h3", null, t.name);
    card.appendChild(title);
    var grade = el("span", "grade " + t.grade, t.grade);
    card.appendChild(grade);
    if (isMissable(t)) {
      card.appendChild(el("span", "badge-missable", "MISSABLE"));
    }
    var detail = el("div", "detail");
    detail.appendChild(p("Deskripsi: ", t.desc));
    detail.appendChild(p("Panduan: ", t.guide));
    detail.appendChild(p("Sumber: ", t.source));
    card.appendChild(detail);
    var row = el("div", "earned-row");
    var label = el("label", null, "");
    var cb = document.createElement("input");
    cb.type = "checkbox";
    cb.checked = !!earned[t.id];
    cb.setAttribute("aria-label", "Tandai " + t.name + " sudah diraih");
    cb.addEventListener("click", function (ev) { ev.stopPropagation(); });
    cb.addEventListener("change", function () {
      if (cb.checked) earned[t.id] = true; else delete earned[t.id];
      saveEarned();
      updateProgress();
      applyFilters();
    });
    label.appendChild(cb);
    label.appendChild(document.createTextNode(" Sudah diraih"));
    row.appendChild(label);
    card.appendChild(row);
    card.addEventListener("click", function (ev) {
      if (ev.target === cb) return;
      card.classList.toggle("open");
      if (card.classList.contains("open")) {
        openId = t.id;
        history.replaceState(null, "", "#trophy-" + t.id);
      } else if (openId === t.id) {
        openId = null;
        history.replaceState(null, "", "#guide");
      }
    });
    return card;
  }

  function p(labelText, body) {
    var para = el("p");
    para.appendChild(el("span", "label", labelText));
    para.appendChild(document.createTextNode(body));
    return para;
  }

  function isMissable(t) {
    return t.id === "truth-is-out-there" ||
      t.id === "catch-me-if-you-can" ||
      t.id === "capital-offense" ||
      t.id === "actions-speak-louder" ||
      t.id === "bad-luck-i-guess";
  }

  function updateProgress() {
    var total = data.trophies.length;
    var got = 0;
    var byGrade = { platinum: [0, 0], gold: [0, 0], silver: [0, 0], bronze: [0, 0] };
    data.trophies.forEach(function (t) {
      byGrade[t.grade][1] += 1;
      if (earned[t.id]) { got += 1; byGrade[t.grade][0] += 1; }
    });
    document.getElementById("earned-count").textContent = got + " of " + total + " earned";
    var pct = total ? Math.round((got / total) * 100) : 0;
    document.getElementById("progress-fill").style.width = pct + "%";
    document.getElementById("platinum-pct").textContent = pct + "% to platinum";
    document.getElementById("grade-counts").textContent =
      "Platinum " + byGrade.platinum[0] + "/" + byGrade.platinum[1] +
      " - Gold " + byGrade.gold[0] + "/" + byGrade.gold[1] +
      " - Silver " + byGrade.silver[0] + "/" + byGrade.silver[1] +
      " - Bronze " + byGrade.bronze[0] + "/" + byGrade.bronze[1];
  }

  function applyFilters() {
    var q = (document.getElementById("search").value || "").toLowerCase().trim();
    var grade = document.getElementById("filter-grade").value;
    var state = document.getElementById("filter-state").value;
    var visible = 0;
    var cards = document.querySelectorAll("#cards .card");
    cards.forEach(function (card) {
      var ok = true;
      var hay = card.getAttribute("data-name") || "";
      if (q && hay.indexOf(q) === -1) ok = false;
      if (grade !== "all" && card.getAttribute("data-grade") !== grade) ok = false;
      var isEarned = card.classList.contains("earned");
      var isMiss = card.classList.contains("missable");
      if (state === "earned" && !isEarned) ok = false;
      if (state === "todo" && isEarned) ok = false;
      if (state === "missable" && !isMiss) ok = false;
      card.style.display = ok ? "" : "none";
      if (ok) visible += 1;
    });
    document.getElementById("empty").hidden = visible !== 0;
  }

  function switchTab(name) {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === name);
    });
    document.querySelectorAll(".panel").forEach(function (s) {
      s.classList.toggle("active", s.id === "tab-" + name);
    });
  }

  function handleHash() {
    var h = (location.hash || "").replace(/^#/, "");
    if (!h) return;
    if (h === "roadmap" || h === "missable" || h === "guide") {
      switchTab(h);
      return;
    }
    if (h.indexOf("trophy-") === 0) {
      switchTab("guide");
      var card = document.getElementById(h);
      if (card) {
        card.classList.add("open");
        card.scrollIntoView({ block: "center" });
      }
    }
  }

  function exportJson() {
    var out = { game: data.game, exported_at: new Date().toISOString(), earned: Object.keys(earned).sort() };
    var blob = new Blob([JSON.stringify(out, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "leonida-platinum-atlas-progress.json";
    a.click();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 1000);
  }

  function importJson(file) {
    var reader = new FileReader();
    reader.onload = function () {
      try {
        var parsed = JSON.parse(reader.result);
        var list = parsed.earned || parsed;
        if (!Array.isArray(list)) throw new Error("format salah");
        var next = {};
        list.forEach(function (id) { next[id] = true; });
        earned = next;
        saveEarned();
        renderAll();
        updateProgress();
      } catch (e) {
        alert("File import tidak valid.");
      }
    };
    reader.readAsText(file);
  }

  function renderAll() {
    var wrap = document.getElementById("cards");
    wrap.innerHTML = "";
    data.trophies.forEach(function (t) { wrap.appendChild(makeCard(t)); });
    var miss = document.getElementById("missable-cards");
    miss.innerHTML = "";
    data.trophies.filter(isMissable).forEach(function (t) { miss.appendChild(makeCard(t)); });
    applyFilters();
  }

  function init() {
    loadEarned();
    fetch("data/trophies.json")
      .then(function (r) { return r.json(); })
      .then(function (json) {
        data = json;
        renderAll();
        updateProgress();
        handleHash();
      })
      .catch(function () {
        document.getElementById("cards").innerHTML =
          "<p>Gagal memuat data trofi. Pastikan file data/trophies.json tersedia.</p>";
      });
    document.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        switchTab(b.getAttribute("data-tab"));
        history.replaceState(null, "", "#" + b.getAttribute("data-tab"));
      });
    });
    document.getElementById("search").addEventListener("input", applyFilters);
    document.getElementById("filter-grade").addEventListener("change", applyFilters);
    document.getElementById("filter-state").addEventListener("change", applyFilters);
    document.getElementById("export-btn").addEventListener("click", exportJson);
    document.getElementById("import-file").addEventListener("change", function (ev) {
      if (ev.target.files && ev.target.files[0]) importJson(ev.target.files[0]);
      ev.target.value = "";
    });
    document.getElementById("reset-btn").addEventListener("click", function () {
      if (!confirm("Reset semua progres tracker?")) return;
      earned = {};
      saveEarned();
      renderAll();
      updateProgress();
    });
    window.addEventListener("hashchange", handleHash);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
