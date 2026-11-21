const ICONS = {
  trophy: '<circle cx="12" cy="8" r="5"/><path d="M7 8H3v2a4 4 0 0 0 4 4M17 8h4v2a4 4 0 0 1-4 4M12 13v4M8 21h8M10 17h4"/>',
  crown: '<path d="M3 8l4 4 5-6 5 6 4-4-1.5 10h-15L3 8z"/>',
  star: '<path d="M12 3l2.7 5.6 6.3.9-4.5 4.4 1 6.1-5.5-2.9L6.5 20l1-6.1L3 9.5l6.3-.9L12 3z"/>',
  car: '<path d="M4 13l1.5-4.5A2 2 0 0 1 7.4 7h9.2a2 2 0 0 1 1.9 1.5L20 13v6h-2.5M4 13v6h2.5M4 13h16M7 19a1.8 1.8 0 1 0 0-.01M17 19a1.8 1.8 0 1 0 0-.01"/>',
  gun: '<path d="M3 8h13l4 3-2 2h-6l-1 5H9l1-5H3V8z"/>',
  money: '<rect x="3" y="7" width="18" height="11" rx="2"/><circle cx="12" cy="12.5" r="3"/><path d="M6 10.5h.01M18 15h.01"/>',
  wallet: '<rect x="3" y="6" width="18" height="14" rx="2"/><path d="M15 12h6v4h-6a2 2 0 0 1 0-4z"/>',
  plane: '<path d="M2 12l20-7-6 7 6 7-20-7zM14 12H8"/>',
  boat: '<path d="M4 15l1.5 4h13L20 15M12 3v12M12 4l7 11H5l7-11z"/>',
  anchor: '<circle cx="12" cy="5" r="2.5"/><path d="M12 7.5V21M5 12H2a10 10 0 0 0 20 0h-3"/>',
  camera: '<rect x="3" y="7" width="18" height="13" rx="2"/><circle cx="12" cy="13" r="3.5"/><path d="M8 7l1.5-2h5L16 7"/>',
  phone: '<rect x="7" y="3" width="10" height="18" rx="2"/><path d="M11 18h2"/>',
  map: '<path d="M9 4L3 6v14l6-2 6 2 6-2V4l-6 2-6-2zM9 4v14M15 6v14"/>',
  music: '<path d="M9 18V5l10-2v13"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="16.5" cy="16" r="2.5"/>',
  heart: '<path d="M12 20s-7-4.5-9-9a5 5 0 0 1 9-3 5 5 0 0 1 9 3c-2 4.5-9 9-9 9z"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z"/>',
  shield: '<path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3z"/>',
  eye: '<path d="M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6z"/><circle cx="12" cy="12" r="3"/>',
  dice: '<rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="9" cy="9" r="1" class="fill"/><circle cx="15" cy="15" r="1" class="fill"/><circle cx="15" cy="9" r="1" class="fill"/><circle cx="9" cy="15" r="1" class="fill"/>',
  drink: '<path d="M6 3h12l-1.5 18h-9L6 3zM6 8h12"/>',
  palm: '<path d="M12 21V11M12 11C10 6 6 4 3 5c2 3 4 5 9 6zM12 11c2-5 6-7 9-6-2 3-4 5-9 6zM12 11c0-4 2-7 5-8"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.5 4.5l2 2M17.5 17.5l2 2M19.5 4.5l-2 2M6.5 17.5l-2 2"/>',
  moon: '<path d="M20 13A8 8 0 1 1 11 4a6.5 6.5 0 0 0 9 9z"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.5" class="fill"/>',
  wrench: '<path d="M14 7a4 4 0 0 1 5.5-3.7L16 6.8l1.2 1.2 3.5-3.5A4 4 0 0 1 17 10L7 20l-3-3L14 7z"/>',
  radio: '<rect x="3" y="9" width="18" height="11" rx="2"/><circle cx="8" cy="14.5" r="2"/><path d="M12 9V3M12 3l5 2"/>',
  fish: '<path d="M3 12c3-4 7-6 11-6 3 0 5 2 7 6-2 4-4 6-7 6-4 0-8-2-11-6z"/><circle cx="17" cy="11" r="1" class="fill"/>',
  gem: '<path d="M7 3h10l3 5-8 13L4 8l3-5zM4 8h16M12 21L8.5 8 12 3l3.5 5L12 21z"/>',
  briefcase: '<rect x="3" y="8" width="18" height="12" rx="2"/><path d="M9 8V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18"/>',
  bike: '<circle cx="6" cy="17" r="3.5"/><circle cx="18" cy="17" r="3.5"/><path d="M6 17l4-8h4l4 8M10 9l-2 8M14 9l3 5"/>',
  truck: '<path d="M2 7h11v10H2zM13 10h5l3 3v4h-8z"/><circle cx="6.5" cy="17" r="1.8"/><circle cx="17" cy="17" r="1.8"/>',
  wheel: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/><path d="M12 3v6M12 15v6M3 12h6M15 12h6"/>',
  chat: '<path d="M4 5h16v11H9l-5 4V5z"/><path d="M8 9h8M8 12h5"/>'
};
const KEY = 'leonida-platinum-atlas-v1';
let trophies = [];
let done = new Set(JSON.parse(localStorage.getItem(KEY) || '[]'));

function iconSvg(name) {
  const inner = ICONS[name] || ICONS.star;
  return '<svg viewBox="0 0 24 24" aria-hidden="true">' + inner + '</svg>';
}
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
function save() { localStorage.setItem(KEY, JSON.stringify([...done])); }
function gradeLabel(g) { return g.charAt(0).toUpperCase() + g.slice(1); }

function card(t) {
  const isDone = done.has(t.id);
  const spoiler = document.getElementById('spoiler-toggle').checked;
  return '<article class="card' + (isDone ? ' done' : '') + (t.missable ? ' missable' : '') + '" id="trophy-' + t.id + '">' +
    '<div class="icon">' + iconSvg(t.icon) + '</div>' +
    '<h3>' + esc(t.name) + (t.missable ? '<span class="badge">Missable</span>' : '') + '</h3>' +
    '<div class="grade ' + t.grade + '">' + gradeLabel(t.grade) + ' &middot; ' + esc(t.category || '') + '</div>' +
    '<p class="desc' + (spoiler ? ' hidden-desc' : '') + '">' + esc(t.description) + '</p>' +
    '<label class="check"><input type="checkbox" data-id="' + t.id + '"' + (isDone ? ' checked' : '') + '> Selesai</label>' +
    '</article>';
}

function render() {
  const q = (document.getElementById('search').value || '').toLowerCase();
  const grade = document.getElementById('filter-grade').value;
  const status = document.getElementById('filter-status').value;
  const list = trophies.filter(function (t) {
    if (grade && t.grade !== grade) return false;
    if (status === 'done' && !done.has(t.id)) return false;
    if (status === 'todo' && done.has(t.id)) return false;
    if (status === 'missable' && !t.missable) return false;
    if (q && (t.name + ' ' + t.description + ' ' + (t.category || '')).toLowerCase().indexOf(q) === -1) return false;
    return true;
  });
  document.getElementById('trophy-list').innerHTML = list.map(card).join('') || '<p class="muted">Tidak ada trofi yang cocok.</p>';
  document.getElementById('result-count').textContent = list.length + ' dari ' + trophies.length + ' trofi ditampilkan.';
  document.getElementById('missable-list').innerHTML = trophies.filter(function (t) { return t.missable; }).map(card).join('');
  const total = trophies.length || 55;
  const pct = Math.round(done.size / total * 100);
  document.getElementById('progress-text').textContent = done.size + ' dari ' + total + ' trofi selesai (' + pct + '%)';
  document.getElementById('progress-fill').style.width = pct + '%';
  const byGrade = function (g) { return trophies.filter(function (t) { return t.grade === g && done.has(t.id); }).length; };
  const missDone = trophies.filter(function (t) { return t.missable && done.has(t.id); }).length;
  document.getElementById('progress-detail').textContent = 'Platinum: ' + byGrade('platinum') + ' \u00b7 Gold: ' + byGrade('gold') + '/2 \u00b7 Silver: ' + byGrade('silver') + '/6 \u00b7 Bronze: ' + byGrade('bronze') + '/46 \u00b7 Missable: ' + missDone + '/5';
  document.querySelectorAll('#trophy-list input[type=checkbox], #missable-list input[type=checkbox]').forEach(function (cb) {
    cb.addEventListener('change', function () {
      if (cb.checked) done.add(cb.dataset.id); else done.delete(cb.dataset.id);
      save(); render();
    });
  });
}

function showTab(name) {
  document.querySelectorAll('.tab').forEach(function (b) { b.classList.toggle('active', b.dataset.tab === name); });
  document.querySelectorAll('.panel').forEach(function (p) { p.classList.toggle('active', p.id === 'panel-' + name); });
}
function applyHash() {
  const h = location.hash.replace(/^#/, '');
  const params = new URLSearchParams(h.replace(/;/g, '&'));
  const tab = params.get('tab');
  if (tab === 'guide' || tab === 'roadmap' || tab === 'missable') showTab(tab);
  const trophy = params.get('trophy');
  if (trophy) {
    showTab('guide');
    setTimeout(function () {
      const el = document.getElementById('trophy-' + trophy);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  }
}

document.querySelectorAll('.tab').forEach(function (b) {
  b.addEventListener('click', function () { showTab(b.dataset.tab); history.replaceState(null, '', '#tab=' + b.dataset.tab); });
});
['search', 'filter-grade', 'filter-status'].forEach(function (id) {
  document.getElementById(id).addEventListener('input', render);
});
document.getElementById('spoiler-toggle').addEventListener('change', render);
document.getElementById('export-btn').addEventListener('click', function () {
  const blob = new Blob([JSON.stringify({ app: 'Leonida Platinum Atlas', done: [...done], exported_at: new Date().toISOString() }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob); a.download = 'leonida-platinum-atlas-progress.json'; a.click();
  URL.revokeObjectURL(a.href);
});
document.getElementById('import-btn').addEventListener('click', function () { document.getElementById('import-file').click(); });
document.getElementById('import-file').addEventListener('change', function (e) {
  const f = e.target.files[0]; if (!f) return;
  const r = new FileReader();
  r.onload = function () {
    try {
      const data = JSON.parse(r.result);
      const ids = Array.isArray(data) ? data : data.done;
      done = new Set(ids.filter(function (id) { return trophies.some(function (t) { return t.id === id; }); }));
      save(); render();
    } catch (err) { alert('File JSON tidak valid.'); }
  };
  r.readAsText(f);
});
document.getElementById('reset-btn').addEventListener('click', function () {
  if (confirm('Reset semua progres tracker?')) { done = new Set(); save(); render(); }
});
window.addEventListener('hashchange', applyHash);

fetch('data/trophies.json').then(function (r) { return r.json(); }).then(function (data) {
  trophies = data; render(); applyHash();
}).catch(function () {
  document.getElementById('trophy-list').innerHTML = '<p class="muted">Gagal memuat data trofi.</p>';
});
