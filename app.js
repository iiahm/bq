window.APP = (function () {
  const qs = (s) => document.querySelector(s);
  const qsa = (s) => Array.from(document.querySelectorAll(s));
  const urlParams = new URLSearchParams(location.search);

  async function fetchJSON(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error(`Failed to load ${path}`);
    return res.json();
  }

  function initTheme() {
    const key = 'theme';
    const saved = localStorage.getItem(key) || 'dark';
    document.documentElement.dataset.theme = saved;
    const btn = qs('#theme');
    if (btn) btn.onclick = () => {
      const next = (document.documentElement.dataset.theme === 'dark') ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem(key, next);
    };
  }

  async function loadConfig() {
    try {
      const cfg = await fetchJSON('config.json');
      qs('#siteName') && (qs('#siteName').textContent = cfg.name || 'أورورا مانجا');
      qs('#siteNameFoot') && (qs('#siteNameFoot').textContent = cfg.name || 'أورورا مانجا');
      document.title = cfg.name || document.title;
    } catch {}
    qs('#year') && (qs('#year').textContent = new Date().getFullYear());
  }

  function renderSeries(list) {
    const grid = qs('#grid');
    grid.innerHTML = list.map(s => `
      <article class="tile">
        <a href="series.html?slug=${encodeURIComponent(s.slug)}">
          <img loading="lazy" src="${s.cover || 'assets/placeholder.jpg'}" alt="${s.title}">
        </a>
        <div class="content">
          <h3><a href="series.html?slug=${encodeURIComponent(s.slug)}">${s.title}</a></h3>
          <div class="row">
            <span class="badge">${s.type}</span>
            <span class="badge">${s.status}</span>
          </div>
          <p class="muted">${s.author || ''}</p>
        </div>
      </article>
    `).join('');
  }

  function renderTags(list) {
    const tagsEl = qs('#tags');
    const unique = Array.from(new Set(list.flatMap(s => s.tags || [])));
    tagsEl.innerHTML = unique.map(t => `<button class="tag" data-tag="${t}">${t}</button>`).join('');
    qsa('.tag').forEach(btn => {
      btn.onclick = () => {
        const tag = btn.dataset.tag;
        const filtered = list.filter(s => (s.tags || []).includes(tag));
        renderSeries(filtered);
      };
    });
  }

  async function initHome() {
    initTheme();
    await loadConfig();
    const series = await fetchJSON('data/series.json');
    renderSeries(series);
    renderTags(series);

    const search = qs('#search');
    if (search) {
      search.addEventListener('input', e => {
        const term = e.target.value.toLowerCase();
        const filtered = series.filter(s =>
          s.title.toLowerCase().includes(term) ||
          (s.tags || []).some(t => t.toLowerCase().includes(term))
        );
        renderSeries(filtered);
      });
    }
  }

  async function initSeries() {
    initTheme();
    await loadConfig();
    const slug = new URLSearchParams(location.search).get('slug');
    if (!slug) return;

    const seriesList = await fetchJSON('data/series.json');
    const s = seriesList.find(x => x.slug === slug);
    const file = `data/chapters/${slug}.json`;
    const ch = await fetchJSON(file);

    qs('#title').textContent = `${s.title} — الفصول`;
    qs('#hero').innerHTML = `
      <img src="${s.cover || 'assets/placeholder.jpg'}" alt="${s.title}">
      <div>
        <h2>${s.title}</h2>
        <p>${s.description || ''}</p>
        <p class="muted">${s.type} • ${s.status} • ${s.author || ''}</p>
      </div>
    `;

    const listEl = qs('#chapters');
    const items = ch.chapters
      .slice().sort((a,b) => a.number - b.number)
      .map(c => `
        <div class="item">
          <a href="chapter.html?slug=${encodeURIComponent(slug)}&ch=${encodeURIComponent(c.number)}">
            الفصل ${c.number} — ${c.title || ''}
          </a>
          <span class="badge">${(c.images || []).length} صفحة</span>
        </div>
      `).join('');
    listEl.innerHTML = items;
  }

  async function initChapter() {
    initTheme();
    await loadConfig();
    const slug = urlParams.get('slug');
    const chNum = Number(urlParams.get('ch'));
    if (!slug || !chNum) return;

    const data = await fetchJSON(`data/chapters/${slug}.json`);
    const ch = data.chapters.find(c => c.number === chNum);
    qs('#back').href = `series.html?slug=${encodeURIComponent(slug)}`;

    const pages = qs('#pages');
    pages.innerHTML = (ch.images || []).map(src => `
      <img loading="lazy" src="${src}" alt="صفحة ${chNum}">
    `).join('');

    const idx = data.chapters.findIndex(c => c.number === chNum);
    const prev = data.chapters[idx - 1], next = data.chapters[idx + 1];
    const prevBtn = qs('#prev'), nextBtn = qs('#next');
    prevBtn.disabled = !prev; nextBtn.disabled = !next;
    prevBtn.onclick = () => prev && (location.href = `chapter.html?slug=${slug}&ch=${prev.number}`);
    nextBtn.onclick = () => next && (location.href = `chapter.html?slug=${slug}&ch=${next.number}`);
  }

  return { initHome, initSeries, initChapter };
})();
