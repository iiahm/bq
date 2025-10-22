:root{
  --bg:#0f1724;
  --card:#0b1220;
  --muted:#9aa4b2;
  --accent:#ff6b6b;
  --glass: rgba(255,255,255,0.03);
  --radius:12px;
  --text:#e6eef8;
  --card-gap:18px;
  font-family: "Segoe UI", Tahoma, system-ui, Roboto, "Noto Naskh Arabic", Arial, sans-serif;
}

*{box-sizing:border-box}
html,body{height:100%}
body{
  margin:0;
  background:linear-gradient(180deg,#071021 0%, #081427 100%);
  color:var(--text);
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  direction:rtl;
  line-height:1.45;
}

.container{max-width:1050px;margin:0 auto;padding:22px;}

.site-header{padding:32px 0 18px}
.site-header h1{margin:0;font-size:28px}
.subtitle{margin:6px 0 18px;color:var(--muted)}

.controls{display:flex;flex-wrap:wrap;gap:12px;align-items:center}
#search{
  padding:10px 12px;border-radius:10px;border:1px solid rgba(255,255,255,0.04);
  background:var(--glass);color:var(--text);min-width:240px;flex:1;
}
.filters{display:flex;gap:8px}
.filter-btn{
  background:transparent;border:1px solid rgba(255,255,255,0.06);padding:8px 12px;border-radius:10px;color:var(--muted);
  cursor:pointer;font-weight:600;
}
.filter-btn.active{background:linear-gradient(90deg,var(--accent),#ff8b8b);color:#071021;border:none;box-shadow:0 6px 18px rgba(0,0,0,0.45)}

.grid{
  display:grid;
  grid-template-columns:repeat(auto-fill,minmax(230px,1fr));
  gap:var(--card-gap);
  margin-top:22px;
}

.card{
  background:linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0.01));
  border-radius:var(--radius);
  overflow:hidden;
  box-shadow: 0 6px 18px rgba(4,8,15,0.6);
  cursor:pointer;
  display:flex;
  flex-direction:column;
  transition:transform .14s ease, box-shadow .14s ease;
}
.card:hover{transform:translateY(-6px);box-shadow:0 14px 30px rgba(4,8,15,0.8)}

.card-cover{
  min-height:300px;
  display:flex;align-items:flex-end;justify-content:center;
  background:linear-gradient(180deg, rgba(0,0,0,0.12), rgba(0,0,0,0.35));
  position:relative;padding:12px;
}
.card-cover img{width:100%;height:100%;object-fit:cover;display:block;filter:brightness(.95);}

.card-body{padding:12px 14px}
.card-title{margin:0;font-size:16px}
.card-meta{margin-top:8px;color:var(--muted);font-size:13px;display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap}

.badge{padding:6px 8px;border-radius:8px;font-weight:700;background:rgba(255,255,255,0.03);font-size:12px;color:var(--muted)}

.no-results{text-align:center;color:var(--muted);margin:36px 0}

/* Modal */
.modal{
  position:fixed;inset:0;display:flex;align-items:center;justify-content:center;
  background:rgba(2,6,12,0.6);backdrop-filter: blur(4px);opacity:0;pointer-events:none;transition:opacity .12s ease;
}
.modal[aria-hidden="false"]{opacity:1;pointer-events:auto}
.modal-content{background:var(--card);border-radius:14px;max-width:900px;width:94%;padding:18px;position:relative}
.modal-close{position:absolute;top:12px;left:12px;background:transparent;border:none;color:var(--muted);font-size:26px;cursor:pointer}

/* details */
.detail-grid{display:grid;grid-template-columns:250px 1fr;gap:18px}
.detail-cover{border-radius:10px;overflow:hidden;min-height:320px}
.detail-content h2{margin-top:0}
.detail-meta{color:var(--muted);margin:8px 0 16px}

/* responsive */
@media (max-width:700px){
  .detail-grid{grid-template-columns:1fr}
  .card-cover{min-height:200px}
}