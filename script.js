// ====== إعدادات محلية قابلة للتغيير ======
let GITHUB_USER = "";
let GITHUB_REPO = "";
let GITHUB_BRANCH = "main";
let GITHUB_TOKEN = "";

// ====== أدوات مساعدة ======
function q(sel){return document.querySelector(sel)}
function qAll(sel){return Array.from(document.querySelectorAll(sel))}

// تحويل ملف إلى base64
function fileToBase64(file){
  return new Promise((res, rej)=>{
    const r = new FileReader();
    r.onload = ()=>res(r.result);
    r.onerror = err=>rej(err);
    r.readAsDataURL(file);
  });
}

// ==== وظائف GitHub API ====

// تحقق من صلاحية التوكن والاتصال بالمستودع
async function verifyGitHub(){
  if(!GITHUB_USER || !GITHUB_REPO || !GITHUB_TOKEN) return {ok:false, msg:"يرجى ملء الحقول"};
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}`;
  const r = await fetch(url, {headers: {"Authorization": `token ${GITHUB_TOKEN}`}});
  if(r.status===200) return {ok:true};
  const data = await r.json();
  return {ok:false, msg: data.message || "خطأ في الاتصال"};
}

// جلب محتوى ملف من الريبو (مرتجع JSON إذا موجود)
async function ghGetFile(path){
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}?ref=${GITHUB_BRANCH}`;
  const r = await fetch(url, {headers: {"Authorization": `token ${GITHUB_TOKEN}`}});
  if(r.status===200) return await r.json();
  return null;
}

// رفع ملف (PUT) وارجاع الاستجابة
async function ghPutFile(path, base64Content, sha = undefined, message = "Add file"){
  const url = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${encodeURIComponent(path)}`;
  const body = {message, branch: GITHUB_BRANCH, content: base64Content.split(",")[1]};
  if(sha) body.sha = sha;
  const r = await fetch(url, {
    method: "PUT",
    headers: {"Authorization": `token ${GITHUB_TOKEN}`, "Content-Type": "application/json"},
    body: JSON.stringify(body)
  });
  return r;
}

// جلب أو إنشاء data.json
async function loadDataJson(){
  const file = await ghGetFile("data.json");
  if(!file) return {manga:[]};
  const content = atob(file.content);
  try { return JSON.parse(content); } catch(e){ return {manga:[]}; }
}

// تحديث data.json في الريبو
async function saveDataJson(data){
  const content = btoa(JSON.stringify(data, null, 2));
  const existing = await ghGetFile("data.json");
  const sha = existing ? existing.sha : undefined;
  const res = await ghPutFile("data.json", "data:" + content, sha, "Update data.json");
  return res;
}

// رفع صور الفصل إلى المجلد المناسب داخل repo
async function uploadChapterFiles(mangaName, chapterNum, files, onProgress){
  const uploaded = [];
  for(let i=0;i<files.length;i++){
    const file = files[i];
    const ext = file.name.split(".").pop().toLowerCase();
    const filename = `${i+1}.${ext}`;
    const path = `manga/${encodeURIComponent(mangaName)}/${chapterNum}/${filename}`;
    const base64 = await fileToBase64(file);
    const r = await ghPutFile(path, base64, undefined, `Upload ${path}`);
    if(r.status===201 || r.status===200){
      uploaded.push({path, name: filename});
    } else {
      const resp = await r.json();
      throw new Error(resp.message || "Upload failed");
    }
    if(onProgress) onProgress(i+1, files.length);
  }
  return uploaded;
}

// ===== واجهة الاستخدام العامة (عرض المانجا) =====
async function loadMangaList(){
  // حاول جلب data.json محلي أولاً
  try {
    const res = await fetch('data.json');
    if(res.ok){
      const j = await res.json();
      renderMangaGrid(j.manga || []);
      return;
    }
  } catch(e){}
  // إن لم يكن محلياً، جرب GitHub إذا تم ضبط الإعدادات
  if(GITHUB_USER && GITHUB_REPO && GITHUB_TOKEN){
    try {
      const data = await loadDataJson();
      renderMangaGrid(data.manga || []);
    } catch(e){}
  }
}

function renderMangaGrid(list){
  const grid = q("#manga-grid");
  if(!grid) return;
  grid.innerHTML = "";
  if(!list.length) { grid.innerHTML = '<div class="card">لم يتم إضافة مانجا بعد</div>'; return; }
  list.forEach(m=>{
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `<h3>${escapeHtml(m.title)}</h3><p class="muted">${escapeHtml(m.description||'')}</p>
      <a href="manga.html?manga=${encodeURIComponent(m.title)}">عرض المانجا</a>`;
    grid.appendChild(div);
  });
}

function loadMangaListIntoPage(){
  // لصفحة manga-list.html
  loadDataFromAnySource().then(list=>{
    const ul = q("#manga-list-ul");
    if(!ul) return;
    ul.innerHTML = "";
    list.forEach(m=>{
      const li = document.createElement("li");
      li.innerHTML = `<a href="manga.html?manga=${encodeURIComponent(m.title)}">${escapeHtml(m.title)}</a>`;
      ul.appendChild(li);
    });
  });
}

async function loadDataFromAnySource(){
  // جرب data.json محلي ثم GitHub
  try {
    const r = await fetch('data.json');
    if(r.ok) return (await r.json()).manga || [];
  } catch(e){}
  if(GITHUB_USER && GITHUB_REPO && GITHUB_TOKEN){
    const d = await loadDataJson();
    return d.manga || [];
  }
  return [];
}

function loadMangaPage(){
  const params = new URLSearchParams(location.search);
  const name = params.get("manga");
  if(!name) return;
  loadDataFromAnySource().then(list=>{
    const m = list.find(x=>x.title===name);
    if(!m) return;
    q("#manga-title").textContent = m.title;
    q("#manga-desc").textContent = m.description || "";
    const ul = q("#chapters-list");
    ul.innerHTML = "";
    (m.chapters || []).slice().reverse().forEach(ch=>{
      const li = document.createElement("li");
      li.innerHTML = `<a href="chapter.html?manga=${encodeURIComponent(m.title)}&chapter=${encodeURIComponent(ch.number)}">الفصل ${ch.number}</a>`;
      ul.appendChild(li);
    });
  });
}

function loadChapterPage(){
  const params = new URLSearchParams(location.search);
  const manga = params.get("manga");
  const chapter = params.get("chapter");
  if(!manga || !chapter) return;
  q("#chapter-heading").textContent = `${manga} - الفصل ${chapter}`;
  // نحاول جلب قائمة الصور من data.json
  loadDataFromAnySource().then(list=>{
    const m = list.find(x=>x.title===manga);
    const container = q("#chapter-images");
    container.innerHTML = "";
    if(!m) return;
    const ch = (m.chapters||[]).find(c=>String(c.number)===String(chapter));
    if(!ch || !ch.images) {
      // نحاول توليد روابط تلقائيا من GitHub paths
      // توقع أسماء 1.jpg,2.jpg...
      for(let i=1;i<=50;i++){
        const img = document.createElement("img");
        img.src = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/manga/${encodeURIComponent(manga)}/${encodeURIComponent(chapter)}/${i}.jpg`;
        img.onerror = ()=>img.remove();
        container.appendChild(img);
      }
      return;
    }
    ch.images.forEach(src=>{
      const img = document.createElement("img");
      if(src.startsWith("http")) img.src = src;
      else img.src = `https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/${GITHUB_BRANCH}/${src.replace(/^\/+/,'')}`;
      container.appendChild(img);
    });
  });
}

// ====== واجهة الإدارة UI و أحداث ======
function setupAdminUI(){
  // ربط الحقول
  q("#btn-verify").addEventListener("click", async ()=>{
    GITHUB_USER = q("#gh-user").value.trim();
    GITHUB_REPO = q("#gh-repo").value.trim();
    GITHUB_BRANCH = q("#gh-branch").value.trim() || "main";
    GITHUB_TOKEN = q("#gh-token").value.trim();
    q("#verify-result").textContent = "جاري التحقق...";
    const res = await verifyGitHub();
    q("#verify-result").textContent = res.ok ? "تم الاتصال" : ("خطأ: "+res.msg);
    if(res.ok) await populateMangaSelect();
  });

  q("#btn-add-manga").addEventListener("click", async ()=>{
    const title = q("#new-manga-title").value.trim();
    const desc = q("#new-manga-desc").value.trim();
    if(!title){ q("#add-manga-msg").textContent = "ادخل اسم المانجا"; return; }
    const data = await loadDataJson();
    if(!data.manga) data.manga = [];
    if(data.manga.find(m=>m.title===title)){ q("#add-manga-msg").textContent = "المانجا موجودة بالفعل"; return; }
    data.manga.push({title, description:desc, chapters:[]});
    const r = await saveDataJson(data);
    if(r.status===201 || r.status===200) q("#add-manga-msg").textContent = "تمت إضافة المانجا";
    else q("#add-manga-msg").textContent = "فشل الحفظ";
    await populateMangaSelect();
  });

  q("#btn-upload-ch").addEventListener("click", async ()=>{
    const manga = q("#select-manga").value;
    const chNum = q("#new-ch-num").value.trim();
    const files = q("#new-ch-files").files;
    if(!manga || !chNum || !files.length){ q("#upload-status").textContent="اكمل الحقول"; return; }
    q("#upload-status").textContent = "جاري الرفع...";
    try{
      const uploaded = await uploadChapterFiles(manga, chNum, Array.from(files), (cur,total)=> q("#upload-status").textContent = `رفع ${cur}/${total}`);
      // الآن تحديث data.json
      const data = await loadDataJson();
      if(!data.manga) data.manga = [];
      let m = data.manga.find(x=>x.title===manga);
      if(!m){ m = {title: manga, description: "", chapters: []}; data.manga.push(m); }
      const imgs = uploaded.map(u=>u.path.replace(/^\/+/,''));
      m.chapters.push({number: chNum, images: imgs});
      const res = await saveDataJson(data);
      if(res.status===201 || res.status===200) q("#upload-status").textContent = "تم رفع الملفات وتحديث data.json";
      else q("#upload-status").textContent = "فشل تحديث data.json";
      await populateMangaSelect();
    }catch(err){
      q("#upload-status").textContent = "خطأ: "+err.message;
    }
  });

  q("#btn-refresh-list").addEventListener("click", populateMangaSelect);
  q("#btn-clear-token").addEventListener("click", ()=>{
    GITHUB_TOKEN = "";
    q("#gh-token").value = "";
    q("#verify-result").textContent = "تم مسح التوكن";
  });
  populateMangaSelect();
}

async function populateMangaSelect(){
  const sel = q("#select-manga");
  if(!sel) return;
  sel.innerHTML = "";
  // جرب data.json محلي
  let list = [];
  try {
    const r = await fetch('data.json');
    if(r.ok){ list = (await r.json()).manga || []; }
  }catch(e){}
  // إذا لا شيء، جرب GitHub
  if(!list.length && GITHUB_USER && GITHUB_REPO && GITHUB_TOKEN){
    const d = await loadDataJson();
    list = d.manga || [];
  }
  list.forEach(m=>{
    const opt = document.createElement("option");
    opt.value = m.title; opt.textContent = m.title;
    sel.appendChild(opt);
  });
}

// ===== أدوات صغيرة =====
function escapeHtml(s){ if(!s) return ""; return s.replace(/[&<>"']/g, c=>({ '&':"&amp;", '<':"&lt;", '>':"&gt;", '"':"&quot;", "'":"&#39;" }[c])); }
