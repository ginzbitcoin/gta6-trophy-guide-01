// Leonida Platinum Atlas: the guide and tracker, plain JavaScript, no libraries.
// Loads app/data/trophies.json, renders the checklist, saves ticks in localStorage,
// and offers search, kind and grade filters, a missable-only view, a spoiler-free
// mode, export and import, plus a roadmap and a missable list built from the data.
const KEY = 'leonida-platinum-atlas-v1';
const listEl = document.getElementById('trophy-list');
const missableEl = document.getElementById('missable-list');
const roadmapEl = document.getElementById('roadmap');
const searchEl = document.getElementById('search');
const kindEl = document.getElementById('kind');
const gradeEl = document.getElementById('grade');
const missableOnlyEl = document.getElementById('missable-only');
const hideEarnedEl = document.getElementById('hide-earned');
const spoilerEl = document.getElementById('spoiler');
const spoilerNoteEl = document.getElementById('spoiler-note');
const resultCountEl = document.getElementById('result-count');

const KIND_LABELS = {
  story: 'Story',
  collectibles: 'Collectibles',
  activities: 'Activities',
  combat: 'Combat & robberies',
  money: 'Money & property',
  platinum: 'Platinum',
};

// Seven stages to the platinum, written for this guide from the official list.
const ROADMAP = [
  {
    title: 'Play the story',
    text: 'Chapters 1 to 4, then the final mission. This earns the six chapter and final-mission trophies plus the six named-mission trophies along the way.',
    covers: 'Just Like Paradise, Paradise Lost, T**s Ass Drug Money, Vice City Baby!, Top Of The World Ma, You Gotta Know When to Get Off, Trust, Break the Bank, Family Matters, DWNFALL, Hi-Jacked, Snow Storm',
  },
  {
    title: 'Stranger strands and character finales',
    text: 'Finish the side characters and the stranger strands. Andy, Kenton, Billy, Randy and Tyrone each have a final mission, and eight stranger strands earns the silver.',
    covers: 'Road to Rehabilitation, This Was No Boat Accident, The Lone Rider, Supply & Demand, Spin On This!, Strangers & Freaks',
  },
  {
    title: 'Try every activity, then master them',
    text: 'Sample all nine activity types for Master of None, then work through the shooting range, drone races, street races, fishing, arcade, bowling, hunting and meditation.',
    covers: 'Master of None, The Shootist, Top Fun, Earn Cash, Not Kudos, Baited My Tackle, Stick Fiddler, Let\u2019s Go Bowling, Fair Game, Positive Mental Attitude',
  },
  {
    title: 'Collectibles across Leonida',
    text: 'Cards, WAiNK spots, vehicles, areas and garage properties. Explore region by region and tick each one off in this guide as you find it.',
    covers: "Don't Touch My Deck, You WAiNKer!, Whip It Good, The Goodtime State, Little Boxes, On the Spot",
  },
  {
    title: 'Combat, chaos and robberies',
    text: 'Combat Focus, wanted levels, shop and jewelry robberies, bank vaults, armored trucks and one illegal operation for each of the nine gangs.',
    covers: 'Gunslinger, Hot Together, Retail Therapy, Sneakthief, Maximum Withdrawal, A Classic Blitz Play, Pest Control, Challenging Tank',
  },
  {
    title: 'Money goals',
    text: 'Launder $250,000 of marked bills, spend $100,000 across all shops, and buy all eight garage properties.',
    covers: 'Dime on the Dollar, Treat Yo Self, Little Boxes',
  },
  {
    title: 'Cleanup and the platinum',
    text: 'The long counters: 250 stunts, 50 challenges, 500 choices, the one-time events, and anything left over. A Long Road (100% completion) is usually the last trophy before the platinum.',
    covers: 'Cunning Stunts, One Last Thing, Actions Speak Louder, Bad Luck, I Guess, The Truth Is Out There, Catch Me If You Can, Capital Offense, A Long Road, Vice Got a Price!',
  },
];

let trophies = [];
let earned = new Set(readSaved());

function readSaved() {
  try {
    const raw = localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((n) => typeof n === 'string') : [];
  } catch {
    return [];
  }
}

function save() {
  localStorage.setItem(KEY, JSON.stringify([...earned]));
}

function gradeCount(grade) {
  return trophies.filter((t) => t.grade === grade && earned.has(t.name)).length;
}

function renderProgress() {
  const total = trophies.length;
  const done = earned.size;
  const pct = total ? Math.round((done / total) * 100) : 0;
  document.getElementById('progress-count').textContent = `${done} of ${total} earned`;
  document.getElementById('progress-fill').style.width = `${pct}%`;
  document.getElementById('progress-pct').textContent = `${pct}% to platinum`;
  document.getElementById('progress-grades').textContent =
    `Platinum ${gradeCount('platinum')}/1 · Gold ${gradeCount('gold')}/2 · Silver ${gradeCount('silver')}/6 · Bronze ${gradeCount('bronze')}/46`;
}

function spoilerHides(trophy) {
  return spoilerEl.checked && trophy.kind === 'story' && !earned.has(trophy.name);
}

function trophyCard(trophy) {
  const card = document.createElement('article');
  card.className = 'trophy' + (earned.has(trophy.name) ? ' earned' : '');
  const head = document.createElement('div');
  head.className = 'trophy-head';
  const box = document.createElement('input');
  box.type = 'checkbox';
  box.checked = earned.has(trophy.name);
  box.setAttribute('aria-label', `Mark ${trophy.name} as earned`);
  box.addEventListener('change', () => {
    if (box.checked) earned.add(trophy.name);
    else earned.delete(trophy.name);
    save();
    renderAll();
  });
  head.append(box);
  const name = document.createElement('h3');
  name.className = 'trophy-name';
  if (spoilerHides(trophy)) {
    name.textContent = 'Hidden story trophy';
    name.classList.add('spoiler-hidden');
  } else {
    name.textContent = trophy.name;
  }
  head.append(name);
  const grade = document.createElement('span');
  grade.className = `grade ${trophy.grade}`;
  grade.textContent = trophy.grade;
  head.append(grade);
  const kind = document.createElement('span');
  kind.className = 'kind-tag';
  kind.textContent = KIND_LABELS[trophy.kind] || trophy.kind;
  head.append(kind);
  if (trophy.missable) {
    const flag = document.createElement('span');
    flag.className = 'missable-tag';
    flag.textContent = 'Missable';
    head.append(flag);
  }
  if (typeof trophy.count === 'number') {
    const count = document.createElement('span');
    count.className = 'count-tag';
    count.textContent = `Count: ${trophy.count.toLocaleString('en-US')}`;
    head.append(count);
  }
  card.append(head);
  const desc = document.createElement('p');
  desc.className = 'trophy-desc';
  desc.textContent = spoilerHides(trophy)
    ? 'Hidden until earned (spoiler-free mode).'
    : trophy.description;
  card.append(desc);
  const guide = document.createElement('p');
  guide.className = 'trophy-guide';
  const strong = document.createElement('strong');
  strong.textContent = 'Guide: ';
  guide.append(strong);
  guide.append(document.createTextNode(trophy.guide));
  card.append(guide);
  const sources = document.createElement('p');
  sources.className = 'trophy-sources';
  sources.textContent = 'Sources: ' + (trophy.sources || []).join(' · ');
  card.append(sources);
  return card;
}

function matchesFilters(trophy) {
  const q = searchEl.value.trim().toLowerCase();
  if (q) {
    const hay = `${trophy.name} ${trophy.description} ${trophy.guide} ${(trophy.sources || []).join(' ')}`.toLowerCase();
    if (!hay.includes(q)) return false;
  }
  if (kindEl.value !== 'all' && trophy.kind !== kindEl.value) return false;
  if (gradeEl.value !== 'all' && trophy.grade !== gradeEl.value) return false;
  if (missableOnlyEl.checked && !trophy.missable) return false;
  if (hideEarnedEl.checked && earned.has(trophy.name)) return false;
  return true;
}

function renderList() {
  const shown = trophies.filter(matchesFilters);
  listEl.replaceChildren();
  for (const trophy of shown) listEl.append(trophyCard(trophy));
  resultCountEl.textContent = shown.length === trophies.length
    ? `Showing all ${trophies.length} trophies.`
    : `Showing ${shown.length} of ${trophies.length} trophies.`;
}

function renderMissable() {
  missableEl.replaceChildren();
  const flagged = trophies.filter((t) => t.missable);
  for (const trophy of flagged) missableEl.append(trophyCard(trophy));
}

function renderRoadmap() {
  roadmapEl.replaceChildren();
  for (const stage of ROADMAP) {
    const li = document.createElement('li');
    const h3 = document.createElement('h3');
    h3.textContent = stage.title;
    const p = document.createElement('p');
    p.textContent = stage.text;
    const covers = document.createElement('p');
    covers.className = 'covers';
    const strong = document.createElement('strong');
    strong.textContent = 'Covers: ';
    covers.append(strong);
    covers.append(document.createTextNode(stage.covers));
    li.append(h3, p, covers);
    roadmapEl.append(li);
  }
}

function renderAll() {
  renderProgress();
  renderList();
  renderMissable();
}

function setView(name) {
  for (const button of document.querySelectorAll('.tab')) {
    button.classList.toggle('active', button.dataset.view === name);
  }
  document.getElementById('view-guide').hidden = name !== 'guide';
  document.getElementById('view-roadmap').hidden = name !== 'roadmap';
  document.getElementById('view-missable').hidden = name !== 'missable';
  // Deep-link the view so a link like index.html#roadmap opens that tab.
  const hash = name === 'guide' ? '' : `#${name}`;
  if (location.hash !== hash) history.replaceState(null, '', hash === '' ? location.pathname : hash);
}

for (const button of document.querySelectorAll('.tab')) {
  button.addEventListener('click', () => setView(button.dataset.view));
}
for (const el of [searchEl, kindEl, gradeEl, missableOnlyEl, hideEarnedEl]) {
  el.addEventListener('input', renderList);
  el.addEventListener('change', renderList);
}
spoilerEl.addEventListener('change', () => {
  spoilerNoteEl.hidden = !spoilerEl.checked;
  renderList();
});

document.getElementById('export').addEventListener('click', () => {
  const blob = new Blob([JSON.stringify({ game: 'Grand Theft Auto VI', earned: [...earned] }, null, 2)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'leonida-trophy-progress.json';
  a.click();
  URL.revokeObjectURL(a.href);
});
document.getElementById('import').addEventListener('change', async (event) => {
  const file = event.target.files[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    const names = Array.isArray(parsed) ? parsed : parsed.earned;
    if (!Array.isArray(names)) throw new Error('not a progress file');
    const known = new Set(trophies.map((t) => t.name));
    earned = new Set(names.filter((n) => known.has(n)));
    save();
    renderAll();
  } catch {
    alert('That file is not a trophy progress export from this guide.');
  }
  event.target.value = '';
});

const data = await (await fetch('data/trophies.json')).json();
trophies = data.trophies || data;
renderRoadmap();
renderAll();
// Open the view a deep link names (#roadmap or #missable), else the guide.
const wanted = location.hash.replace('#', '');
if (wanted === 'roadmap' || wanted === 'missable') setView(wanted);
