:root {
  --bg: #0b0e12;
  --card: #121720;
  --line: #1f2532;
  --text: #e8ecf1;
  --muted: #a3acb9;
  --accent: #6dd3ff;
  --accent2: #8b6dff;
}
* { box-sizing: border-box }
html, body { margin:0; padding:0; background:var(--bg); color:var(--text); font-family: "Tajawal", system-ui, sans-serif }
a { color: var(--accent) }
.hdr, .ftr { display:flex; align-items:center; justify-content:space-between; padding:12px 16px; border-bottom:1px solid var(--line) }
.ftr { border-top:1px solid var(--line); border-bottom:none; }
.brand { display:flex; align-items:center; gap:8px; text-decoration:none }
.logo { width:28px; height:28px }
.nav { display:flex; gap:10px; align-items:center }
.wrap { max-width:1100px; margin:24px auto; padding:0 16px }
input[type="search"], input[type="text"], input[type="password"], input[type="number"], textarea, select {
  background:#0e1320; border:1px solid var(--line); color:var(--text); padding:10px 12px; border-radius:10px; width:100%;
}
.btn { background: linear-gradient(90deg, var(--accent), var(--accent2)); color:#041018; border:0; padding:10px 14px; border-radius:10px; cursor:pointer }
.btn.ghost { background:transparent; border:1px solid var(--line); color:var(--text) }
.grid { display:grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap:16px }
.card { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:12px; margin-bottom:16px }
.tile { background:var(--card); border:1px solid var(--line); border-radius:12px; overflow:hidden }
.tile img { width:100%; aspect-ratio: 3/4; object-fit:cover }
.tile .content { padding:10px }
.badge { display:inline-block; padding:4px 8px; border-radius:999px; border:1px solid var(--line); color:var(--muted); font-size:12px }
.tags { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px }
.tag { padding:6px 10px; border-radius:999px; background:#0e1320; border:1px solid var(--line); cursor:pointer }
.list { display:grid; gap:8px }
.item { display:flex; align-items:center; justify-content:space-between; background:var(--card); border:1px solid var(--line); border-radius:10px; padding:10px 12px }
.hero { display:grid; grid-template-columns: 220px 1fr; gap:16px; margin-bottom:16px }
.hero img { width:100%; border-radius:12px }
.reader { max-width:900px; margin:0 auto; padding:12px }
.pages { display:grid; gap:12px }
.pages img { width:100%; height:auto; border-radius:10px; background:#0e1320 }
.grid2 { display:grid; grid-template-columns: 1fr 1fr; gap:12px }
.row { display:flex; gap:8px; align-items:center }
.muted { color:var(--muted); font-size:13px }
@media (max-width: 800px) {
  .grid2 { grid-template-columns: 1fr }
  .hero { grid-template-columns: 1fr }
}
