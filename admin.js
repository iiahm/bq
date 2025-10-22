(function () {
  const qs = (s) => document.querySelector(s);

  // Local cache
  let series = [];
  let connected = false;
  let gh = { token: '', repo: '', branch: 'main' };

  async function loadSeries() {
    try {
      series = await (await fetch('data/series.json', { cache: 'no-store' })).json();
    } catch {
      series = [];
    }
  }

  function saveLocal(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
    alert('تم الحفظ محليًا. يمكنك تنزيل الملف ورفعه للمستودع.');
  }

  async function githubWrite(path, content, message) {
    if (!connected) throw new Error('غير متصل بـ GitHub');
    const api = 'https://api.github.com';
    // Get current file SHA (if exists)
    let sha = null;
    const getRes = await fetch(`${api}/repos/${gh.repo}/contents/${path}?ref=${gh.branch}`, {
      headers: { Authorization: `Bearer ${gh.token}`, Accept: 'application/vnd.github+json' }
    });
    if (getRes.status === 200) {
      const info = await getRes.json();
      sha = info.sha;
    }
    // Create or update
    const body = {
      message: message || `Update ${path}`,
      content: btoa(unescape(encodeURIComponent(content))),
      branch: gh.branch,
      sha
    };
    const putRes = await fetch(`${api}/repos/${gh.repo}/contents/${path}`, {
      method: 'PUT',
      headers: { Authorization: `Bearer ${gh.token}`, Accept: 'application/vnd.github+json' },
      body: JSON.stringify(body)
    });
    if (!putRes.ok) throw new Error('فشل الكتابة إلى GitHub');
    alert('تم التحديث على GitHub بنجاح.');
  }

  function download(filename, text) {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'application/json' }));
    a.download = filename;
    a.click();
  }

  // Connect buttons
  qs('#connect').onclick = async () => {
    gh.token = qs('#ghToken').value.trim();
    gh.repo = qs('#ghRepo').value.trim();
    gh.branch = qs('#ghBranch').value.trim() || 'main';
    connected = !!(gh.token && gh.repo);
    if (connected) alert('تم الاتصال. تأكد أن الرمز لديه صلاحية تعديل المحتوى لهذا المستودع.');
  };
  qs('#disconnect').onclick = () => { connected = false; alert('تم قطع الاتصال.'); };

  // Config handlers
  qs('#saveConfig').onclick = async () => {
    const cfg = {
      name: qs('#siteName').value.trim() || 'أورورا مانجا',
      description: qs('#siteDesc').value.trim() || '',
      logo: qs('#siteLogo').value.trim() || 'assets/logo.svg'
    };
    const json = JSON.stringify(cfg, null, 2);
    if (connected) await githubWrite('config.json', json, 'Update config');
    else saveLocal('config.json', cfg);
  };
  qs('#downloadConfig').onclick = () => {
    const cfg = {
      name: qs('#siteName').value.trim() || 'أورورا مانجا',
      description: qs('#siteDesc').value.trim() || '',
      logo: qs('#siteLogo').value.trim() || 'assets/logo.svg'
    };
    download('config.json', JSON.stringify(cfg, null, 2));
  };

  // Series handlers
  qs('#addSeries').onclick = async () => {
    await loadSeries();
    const item = {
      slug: qs('#sSlug').value.trim(),
      title: qs('#sTitle').value.trim(),
      type: qs('#sType').value.trim(),
      status: qs('#sStatus').value.trim(),
      author: qs('#sAuthor').value.trim(),
      cover: qs('#sCover').value.trim(),
      tags: qs('#sTags').value.split(',').map(t => t.trim()).filter(Boolean),
      description: qs('#sDesc').value.trim()
    };
    if (!item.slug || !item.title) return alert('الرجاء إدخال المعرف والعنوان.');
    const exists = series.find(s => s.slug === item.slug);
    if (exists) {
      // update existing
      Object.assign(exists, item);
    } else {
      series.push(item);
    }
    const json = JSON.stringify(series, null, 2);
    if (connected) await githubWrite('data/series.json', json, 'Update series list');
    else saveLocal('data.series', series);
  };

  qs('#downloadSeries').onclick = async () => {
    await loadSeries();
    download('series.json', JSON.stringify(series, null, 2));
  };

  // Chapter handlers
  qs('#addChapter').onclick = async () => {
    const slug = qs('#cSlug').value.trim();
    const number = Number(qs('#cNumber').value);
    const title = qs('#cTitle').value.trim();
    const images = qs('#cImages').value.split('\n').map(x => x.trim()).filter(Boolean);
    if (!slug || !number || images.length === 0) return alert('أدخل المعرف، رقم الفصل، وروابط الصور.');

    let file;
    try {
      file = await (await fetch(`data/chapters/${slug}.json`, { cache: 'no-store' })).json();
    } catch {
      file = { title: slug, slug, chapters: [] };
    }
    const idx = file.chapters.findIndex(c => c.number === number);
    const ch = { number, title, images };
    if (idx >= 0) file.chapters[idx] = ch; else file.chapters.push(ch);

    const json = JSON.stringify(file, null, 2);
    if (connected) await githubWrite(`data/chapters/${slug}.json`, json, `Update ${slug} chapters`);
    else saveLocal(`data.chapters.${slug}`, file);
  };

  qs('#downloadChapter').onclick = async () => {
    const slug = qs('#cSlug').value.trim();
    if (!slug) return alert('أدخل معرف السلسلة.');
    let file;
    try {
      file = await (await fetch(`data/chapters/${slug}.json`, { cache: 'no-store' })).json();
    } catch {
      file = { title: slug, slug, chapters: [] };
    }
    download(`${slug}.json`, JSON.stringify(file, null, 2));
  };
})();
