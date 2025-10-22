// بيانات تجريبية — عدّلها كما تحب
const works = [
  {
    id:1,
    title:"سيف ظل القمر",
    author:"كاتِب مجهول",
    type:"manga",
    status:"مستمر",
    description:"مانجا مغامرات تاريخية مع لمسة خارقة، تدور أحداثها في عالم فنتازيا مستوحى من اليابان القديمة.",
    coverColor:"#7bc4ff"
  },
  {
    id:2,
    title:"مملكة الظلال",
    author:"لي جين",
    type:"manhwa",
    status:"منتهي",
    description:"مانهوا كورية تدور حول شاب يحصل على قوى وقدر عليه تغيير مصير مملكته.",
    coverColor:"#ffd27a"
  },
  {
    id:3,
    title:"قصة المدينة السماوية",
    author:"ليو تشن",
    type:"manhua",
    status:"مستمر",
    description:"مانهوا صينية مع رسومات ملونة وخط درامي طويل، تجمع بين الخيال والدراما السياسية.",
    coverColor:"#b7ffb2"
  },
  {
    id:4,
    title:"قناص الظلال",
    author:"آيومي",
    type:"manga",
    status:"مستمر",
    description:"مانجا قتال/إثارة حول قناص يحارب عصابات المدينة.",
    coverColor:"#f2b0ff"
  }
];

// عناصر الواجهة
const grid = document.getElementById('grid');
const searchInput = document.getElementById('search');
const filterBtns = document.querySelectorAll('.filter-btn');
const noResults = document.getElementById('no-results');
const modal = document.getElementById('modal');
const modalBody = document.getElementById('modal-body');
const modalClose = document.getElementById('modal-close');

let activeType = 'all';
let query = '';

function renderCards(list){
  grid.innerHTML = '';
  if(list.length === 0){
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;

  for(const item of list){
    const card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.innerHTML = `
      <div class="card-cover" aria-hidden="true" style="background:${item.coverColor}">
        ${placeholderSvg(item.title)}
      </div>
      <div class="card-body">
        <h3 class="card-title">${escapeHtml(item.title)}</h3>
        <div class="card-meta">
          <span class="badge">${typeLabel(item.type)}</span>
          <span class="badge">${item.status}</span>
          <span style="flex:1"></span>
          <span class="badge">${escapeHtml(item.author)}</span>
        </div>
      </div>
    `;
    card.addEventListener('click', ()=> openModal(item));
    card.addEventListener('keypress', (e)=> { if(e.key==='Enter') openModal(item) });
    grid.appendChild(card);
  }
}

function filterAndSearch(){
  const q = query.trim().toLowerCase();
  const results = works.filter(w=>{
    if(activeType !== 'all' && w.type !== activeType) return false;
    if(!q) return true;
    return (w.title + ' ' + w.author + ' ' + w.description).toLowerCase().includes(q);
  });
  renderCards(results);
}

searchInput.addEventListener('input', (e)=>{
  query = e.target.value;
  filterAndSearch();
});

filterBtns.forEach(btn=>{
  btn.addEventListener('click', ()=>{
    filterBtns.forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    activeType = btn.dataset.type;
    filterAndSearch();
  });
});

// Modal
function openModal(item){
  modalBody.innerHTML = `
    <div class="detail-grid">
      <div class="detail-cover" style="background:${item.coverColor}">${placeholderSvg(item.title)}</div>
      <div class="detail-content">
        <h2>${escapeHtml(item.title)}</h2>
        <div class="detail-meta">
          <strong>المؤلف:</strong> ${escapeHtml(item.author)} &nbsp; • &nbsp;
          <strong>النوع:</strong> ${typeLabel(item.type)} &nbsp; • &nbsp;
          <strong>الحالة:</strong> ${escapeHtml(item.status)}
        </div>
        <p>${escapeHtml(item.description)}</p>
        <p style="margin-top:14px;color:var(--muted);font-size:13px">ملاحظة: هذه صفحة نموذجية — اضف روابط، صور، أو تقييمات حسب حاجتك.</p>
      </div>
    </div>
  `;
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

modalClose.addEventListener('click', closeModal);
modal.addEventListener('click', (e)=> {
  if(e.target === modal) closeModal();
});
document.addEventListener('keydown', (e)=> {
  if(e.key === 'Escape') closeModal();
});

// أدوات مساعدة
function typeLabel(t){
  if(t==='manga') return 'مانجا';
  if(t==='manhwa') return 'مانهوا';
  if(t==='manhua') return 'مانهوا صينية';
  return t;
}

function escapeHtml(s){
  return (s+'').replace(/[&<>"']/g, (m)=> ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
}

function placeholderSvg(title){
  // صورة افتراضية بسيطة كـ SVG (لا حاجة لصور خارجية)
  const t = escapeHtml(title).slice(0,20);
  const svg = `
    <svg width="100%" height="100%" viewBox="0 0 600 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="g" x1="0" x2="1">
          <stop offset="0" stop-color="rgba(255,255,255,0.06)"/>
          <stop offset="1" stop-color="rgba(255,255,255,0.02)"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g)"/>
      <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle" font-size="36" font-family="sans-serif" fill="rgba(0,0,0,0.14)">${t}</text>
    </svg>
  `;
  return svg;
}

// بداية
renderCards(works);