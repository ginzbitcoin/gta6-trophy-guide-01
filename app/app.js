(function () {
  var STORE_KEY = "leonida-platinum-atlas-earned-v1";
  var state = { trophies: [], earned: {}, spoilerFree: false };

  function loadEarned() {
    try {
      var raw = localStorage.getItem(STORE_KEY);
      state.earned = raw ? JSON.parse(raw) : {};
    } catch (e) {
      state.earned = {};
    }
  }
  function saveEarned() {
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state.earned)); } catch (e) {}
  }
  function kindOf(t) {
    var n = (t.name + " " + t.description + " " + t.guide).toLowerCase();
    if (n.indexOf("hidden package") !== -1 || n.indexOf("photograph") !== -1 || n.indexOf("find all") !== -1) return "collectible";
    if (n.indexOf("race") !== -1 || n.indexOf("golf") !== -1 || n.indexOf("pool") !== -1 || n.indexOf("dart") !== -1 || n.indexOf("fish") !== -1 || n.indexOf("taxi") !== -1) return "activity";
    if (n.indexOf("headshot") !== -1 || n.indexOf("wanted level") !== -1 || n.indexOf("police") !== -1) return "combat";
    if (n.indexOf("visit") !== -1 || n.indexOf("explore") !== -1 || n.indexOf("reach") !== -1 || n.indexOf("dive") !== -1) return "exploration";
    return "story";
  }
  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function cardHtml(t) {
    var earned = !!state.earned[t.id];
    var badges = '<span class="badge ' + t.grade + '">' + t.grade + '</span>';
    if (t.missable) badges += ' <span class="badge miss">Missable</span>';
    badges += ' <span class="badge">' + kindOf(t) + '</span>';
    var cls = "card" + (earned ? " earned" : "") + (state.spoilerFree ? " spoiler" : "");
    return '<article class="' + cls + '" data-id="' + t.id + '">' +
      '<h3>' + esc(t.name) + '</h3>' +
      '<p class="desc">' + esc(t.description) + '</p>' +
      '<div class="meta">' + badges + '</div>' +
      '<p class="guide">' + esc(t.guide) + '</p>' +
      '<p class="src">Source: ' + esc(t.source) + '</p>' +
      '<label class="earn"><input type="checkbox" data-earn="' + t.id + '"' + (earned ? " checked" : "") + '> Earned</label>' +
      '</article>';
  }
  function filtered() {
    var q = (document.getElementById("search").value || "").toLowerCase();
    var g = document.getElementById("filterGrade").value;
    var k = document.getElementById("filterKind").value;
    var mo = document.getElementById("missableOnly").checked;
    var he = document.getElementById("hideEarned").checked;
    return state.trophies.filter(function (t) {
      if (q && (t.name + " " + t.description + " " + t.guide).toLowerCase().indexOf(q) === -1) return false;
      if (g && t.grade !== g) return false;
      if (k && kindOf(t) !== k) return false;
      if (mo && !t.missable) return false;
      if (he && state.earned[t.id]) return false;
      return true;
    });
  }
  function renderCards() {
    var list = filtered();
    document.getElementById("cards").innerHTML = list.map(cardHtml).join("") ||
      '<p class="count-line">No trophies match these filters.</p>';
    document.getElementById("countLine").textContent =
      "Showing " + list.length + " of " + state.trophies.length + " trophies.";
    var miss = state.trophies.filter(function (t) { return t.missable; });
    document.getElementById("missableCards").innerHTML = miss.map(cardHtml).join("");
  }
  function renderProgress() {
    var total = state.trophies.length;
    var earned = state.trophies.filter(function (t) { return state.earned[t.id]; }).length;
    var pct = total ? Math.round((earned / total) * 100) : 0;
    document.getElementById("earnedCount").textContent = earned;
    document.getElementById("barFill").style.width = pct + "%";
    document.getElementById("pctText").textContent = pct + "% to platinum";
    function count(grade) {
      var all = state.trophies.filter(function (t) { return t.grade === grade; }).length;
      var got = state.trophies.filter(function (t) { return t.grade === grade && state.earned[t.id]; }).length;
      return got + " / " + all;
    }
    document.getElementById("cPlatinum").textContent = count("platinum");
    document.getElementById("cGold").textContent = count("gold");
    document.getElementById("cSilver").textContent = count("silver");
    document.getElementById("cBronze").textContent = count("bronze");
    var mAll = state.trophies.filter(function (t) { return t.missable; }).length;
    var mGot = state.trophies.filter(function (t) { return t.missable && state.earned[t.id]; }).length;
    document.getElementById("cMissable").textContent = mGot + " / " + mAll;
  }
  function renderAll() { renderProgress(); renderCards(); }
  var ROADMAP = [
    ["Play the story blind first", "Finish the opening chapter and learn both protagonists. Do not rush, and save often."],
    ["Grab the five missable trophies", "Catch Me If You Can, Capital Offense, Actions Speak Louder, Bad Luck I Guess, and The Truth Is Out There only appear once. Save before each story moment and check the Missable tab."],
    ["Finish the story", "Complete every story mission as Lucia and Jason to earn Leonida Legend and The Big One."],
    ["Clear side activities", "Races, sports, minigames, taxi, paramedic, firefighter, vigilante, bounty, and smuggling runs. One of each unlocks Completionist."],
    ["Hunt collectibles", "Find every hidden package and photograph the wildlife. Use the tracker to mark each one."],
    ["Grind combat and money", "Headshots, wanted levels, and a million dollars held and spent. Missions and businesses pay the best."],
    ["Mop up and platinum", "Check the tracker for the last few trophies, finish 100 percent completion, and Vice Got a Price! is yours."]
  ];
  function renderRoadmap() {
    document.getElementById("steps").innerHTML = ROADMAP.map(function (s, i) {
      return "<li><h3><span class=\"n\">" + (i + 1) + "</span>" + esc(s[0]) + "</h3><p>" + esc(s[1]) + "</p></li>";
    }).join("");
  }
  function goTab(name) {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.classList.toggle("active", b.getAttribute("data-tab") === name);
    });
    document.querySelectorAll(".panel").forEach(function (p) {
      p.classList.toggle("active", p.id === "panel-" + name);
    });
  }
  function fromHash() {
    var h = (location.hash || "").replace("#", "");
    if (h === "roadmap" || h === "missable" || h === "guide") goTab(h);
  }
  function bind() {
    document.querySelectorAll(".tab").forEach(function (b) {
      b.addEventListener("click", function () {
        var name = b.getAttribute("data-tab");
        goTab(name);
        history.replaceState(null, "", "#" + name);
      });
    });
    ["search", "filterGrade", "filterKind", "missableOnly", "hideEarned"].forEach(function (id) {
      document.getElementById(id).addEventListener("input", renderCards);
      document.getElementById(id).addEventListener("change", renderCards);
    });
    document.getElementById("spoilerFree").addEventListener("change", function (e) {
      state.spoilerFree = e.target.checked;
      renderCards();
    });
    document.addEventListener("change", function (e) {
      var box = e.target.closest ? e.target.closest("[data-earn]") : null;
      if (!box) return;
      var id = box.getAttribute("data-earn");
      if (box.checked) state.earned[id] = true; else delete state.earned[id];
      saveEarned();
      renderAll();
    });
    document.getElementById("exportBtn").addEventListener("click", function () {
      var blob = new Blob([JSON.stringify({ earned: state.earned }, null, 2)], { type: "application/json" });
      var a = document.createElement("a");
      a.href = URL.createObjectURL(blob);
      a.download = "leonida-platinum-atlas-progress.json";
      a.click();
      URL.revokeObjectURL(a.href);
    });
    document.getElementById("importBtn").addEventListener("click", function () {
      document.getElementById("importFile").click();
    });
    document.getElementById("importFile").addEventListener("change", function (e) {
      var f = e.target.files && e.target.files[0];
      if (!f) return;
      var r = new FileReader();
      r.onload = function () {
        try {
          var data = JSON.parse(r.result);
          state.earned = data.earned || data || {};
          saveEarned();
          renderAll();
        } catch (err) {
          alert("That file is not valid tracker JSON.");
        }
      };
      r.readAsText(f);
    });
    document.getElementById("resetBtn").addEventListener("click", function () {
      if (!confirm("Reset all earned trophies?")) return;
      state.earned = {};
      saveEarned();
      renderAll();
    });
    window.addEventListener("hashchange", fromHash);
  }
  function init() {
    loadEarned();
    renderRoadmap();
    bind();
    fetch("data/trophies.json")
      .then(function (r) { return r.json(); })
      .then(function (data) {
        state.trophies = data.trophies || [];
        renderAll();
        fromHash();
      })
      .catch(function () {
        document.getElementById("cards").innerHTML =
          '<p class="count-line">Could not load trophies.json. Run the app from a local server.</p>';
      });
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
