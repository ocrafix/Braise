(()=>{
const $=(s,r=document)=>r.querySelector(s);
const app=$("#app"),page=document.body.dataset.page;
const cap=s=>s[0].toUpperCase()+s.slice(1);
const iso=(d=new Date())=>d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0");
const KEY="routine-v1";
const load=()=>{let d={};try{d=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){}d.done??={};d.notes??={};d.perso??={};return d};
const save=d=>{try{localStorage.setItem(KEY,JSON.stringify(d))}catch(e){}};
const ch=(e,k)=>e.m==2?`2 × ${k} kg`:`${k} kg`;
const today=NOMS[new Date().getDay()];
const q=new URLSearchParams(location.search).get("jour");
const jour=ORDRE.includes(q)?q:today;
const seanceDe=j=>SEANCES[PLAN[j]];
const sportLabel=j=>PLAN[j]==="repos"?"Mobilité douce":seanceDe(j).titre;

function nav(){
const l=(h,t)=>`<a href="${h}" class="${page===h.replace(".html","")||(h==="index.html"&&page==="index")?"on":""}">${t}</a>`;
return `<nav class="nav"><a href="index.html"><strong>🔥 Braise</strong></a><div>${l("index.html","Accueil")}${l("suivi.html","Suivi")}</div></nav>`}
const shell=html=>{let h=$("#top");if(!h){h=document.createElement("header");h.id="top";app.before(h)}h.innerHTML=nav();app.innerHTML=html};
const hero=(e,t,p="")=>`<section class="hero"><span class="eyebrow">${e}</span><h1>${t}</h1>${p?`<p>${p}</p>`:""}</section>`;

function accueil(){
const date=new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"});
const d=load(),fait=d.done[iso()];
shell(hero(date,`Aujourd'hui, ${today}`,fait?"Séance du jour faite. Bravo 💪":"Prêt ? Choisis ton programme.")+
`<section class="today"><a class="btn main" href="sport.html?jour=${today}">🏋️ ${sportLabel(today)}</a><a class="btn sage" href="soin.html?jour=${today}">🧴 Soin du ${today}</a></section>
<h2>La semaine</h2><section class="days">${ORDRE.map(j=>`<a class="day ${j===today?"now":""} ${PLAN[j]==="repos"?"rest":""}" href="jour.html?jour=${j}"><h3>${cap(j)}</h3><span class="small">Soin · ${sportLabel(j)}</span></a>`).join("")}</section>`)}

function pageJour(){
const s=seanceDe(jour),rest=PLAN[jour]==="repos";
shell(hero("Choix du jour",cap(jour))+`<section class="choices">
<a class="card" href="soin.html?jour=${jour}"><span class="pill sage">Soin</span><h2>Routine matin et soir</h2><p class="small">${MATIN.length} étapes le matin, ${(SOIR[jour]||SOIR_DEFAUT).length} le soir.</p></a>
<a class="card" href="sport.html?jour=${jour}"><span class="pill ember">${rest?"Repos actif":"Sport · 15 min"}</span><h2>${s.titre}</h2><p class="small">${s.mission}</p></a></section>`)}

function pageSoin(){
const bloc=(t,a)=>`<article class="card"><div class="mon"><h2>${t}</h2><span class="pill sage">${a.length} étapes</span></div><div class="steps">${a.map((x,i)=>`<div class="step"><b>${i+1}</b>${x}</div>`).join("")}</div></article>`;
shell(hero("Routine soin",`Soin du ${jour}`)+`<section class="soin-grid">${bloc("Matin",MATIN)}${bloc("Soir",SOIR[jour]||SOIR_DEFAUT)}</section><a class="btn ghost" href="jour.html?jour=${jour}">← Retour</a>`)}

function pageSport(){
const s=seanceDe(jour),d=load(),rest=PLAN[jour]==="repos";
const exos=s.exos.map((e,i)=>{const p=d.perso[jour+"-"+e.id]||{};const kg=p.kg??e.kg;
return `<article class="card exo" data-id="${e.id}"><div class="exo-head"><span class="exo-n">${i+1}</span><div><h3>${e.nom}</h3><p class="exo-tip">${e.tip}</p></div></div>
<div class="meta"><span class="pill ember">${e.muscle}</span>${e.kg>0?`<span class="pill" data-o-kg>${ch(e,kg)}</span><span class="pill">${e.m==2?"1 haltère dans chaque main":"1 seul haltère"}</span>`:""}</div>
<a class="small" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=${encodeURIComponent(e.nom+" exercice")}">▶ Voir le mouvement</a>
${e.kg>0?`<button class="btn ghost" data-adj>Ajuster la charge</button><div class="edit" hidden><label>${e.m==2?"Poids par haltère (kg)":"Poids de l'haltère (kg)"}<input type="number" min="0" step="0.5" data-kg value="${kg}"></label><button class="btn main" data-save>Enregistrer</button></div>`:""}</article>`}).join("");
shell(hero(rest?"Repos actif":"Sport · 15 min",s.titre,s.mission)+`
<div class="timers"><section class="timer" data-kind="" id="timer"><div class="t-row"><div><strong data-t-label aria-live="polite">Prêt</strong><div class="t-info" data-t-info></div></div><div class="t-time" data-t-time>00:00</div></div>
<div class="t-bar"><i data-t-bar></i></div>
<div class="t-ctrl"><button class="btn main" data-t-start>Lancer</button><button class="btn" data-t-skip>Passer</button><button class="btn ghost" data-t-reset>Stop</button></div></section><section class="timer" data-kind="" id="timer2" hidden><div class="t-row"><div><strong data-t-label aria-live="polite">Prêt</strong><div class="t-info" data-t-info></div></div><div class="t-time" data-t-time>00:00</div></div>
<div class="t-bar"><i data-t-bar></i></div>
<div class="t-ctrl"><button class="btn main" data-t-start>Lancer</button><button class="btn" data-t-skip>Passer</button><button class="btn ghost" data-t-reset>Stop</button></div></section></div>
<div class="split"><section class="list">${exos}
${rest?"":`<button class="btn sage" id="done"></button>`}</section>
<aside class="list">
<article class="card"><h2>Chronos</h2><p class="small">Séance fixe : ${s.exos.length} exercices × ${s.n} tour${s.n>1?"s":""} × ${s.w} s d'effort / ${s.r} s de transition.</p><div class="presets"><button class="btn" id="guide">Séance guidée</button></div>
<p class="small" style="margin-top:.8rem">Chrono libre</p><div class="presets">${[30,45,60,90].map(x=>`<button class="btn ghost" data-free="${x}">${x} s</button>`).join("")}<input type="number" min="1" id="fs" placeholder="s" aria-label="Secondes"><button class="btn ghost" id="fgo">OK</button></div></article>
${s.echauff.length?`<article class="card"><h2>Échauffement · 2 min</h2><p class="small">Il se déroule dans le chrono guidé, étape par étape.</p><div class="steps">${s.echauff.map((e,i)=>`<div class="step"><b>${i+1}</b><span>${e.nom}<br><span class="small">${e.sec} s</span></span></div>`).join("")}</div></article>`:""}
<article class="card"><h2>Règles</h2><ul class="rules">${s.conseils.map(c=>`<li>${c}</li>`).join("")}</ul></article>
<article class="card"><label>Mes sensations<textarea id="notes" placeholder="Énergie, charges qui passent bien, à ajuster la prochaine fois…"></textarea></label><p class="small" id="ns">Sauvegarde automatique</p><div class="steps" id="nh"></div></article>
</aside></div><a class="btn ghost" href="jour.html?jour=${jour}">← Retour</a>`);

// exercices
document.querySelectorAll(".exo").forEach(c=>{const id=jour+"-"+c.dataset.id,ed=$(".edit",c);
const adj=$("[data-adj]",c);if(adj){adj.onclick=()=>{ed.hidden=!ed.hidden};
$("[data-save]",c).onclick=()=>{const d=load(),k=$("[data-kg]",c),v=parseFloat(k.value)||0;d.perso[id]={kg:v};save(d);$("[data-o-kg]",c).textContent=ch(s.exos.find(x=>x.id===c.dataset.id),v);ed.hidden=true}}});
// notes
const nk=iso()+"|"+jour,nf=$("#notes");nf.value=d.notes[nk]||"";
const hist=()=>{const n=load().notes,h=$("#nh");h.textContent="";Object.keys(n).filter(k=>k.endsWith("|"+jour)&&k!==nk&&n[k]).sort().reverse().forEach(k=>{const r=document.createElement("div");r.className="step";const b=document.createElement("span"),t=document.createElement("span");t.className="small";t.textContent=new Date(k.split("|")[0]+"T12:00").toLocaleDateString("fr-FR",{day:"numeric",month:"long"});b.append(t,document.createElement("br"),n[k]);r.append(b);h.append(r)});if(h.children.length)h.prepend(Object.assign(document.createElement("p"),{className:"small",textContent:"Notes précédentes"}))};hist();
nf.oninput=()=>{const d=load();nf.value.trim()?d.notes[nk]=nf.value:delete d.notes[nk];save(d);$("#ns").textContent="Enregistré ✓";clearTimeout(nf.t);nf.t=setTimeout(()=>$("#ns").textContent="Sauvegarde automatique",1200)};
// chronos
const T=createTimer($("#timer"),{done:()=>document.dispatchEvent(new Event("timer-done"))});
const F=createTimer($("#timer2"),{done:()=>setTimeout(()=>{$("#timer2").hidden=true},4000),stop:()=>{$("#timer2").hidden=true}});
const freeGo=s=>{$("#timer2").hidden=false;F.go(s)};
const nbExo=s.exos.length;
const build=()=>{const w=s.w,r=s.r,n=s.n,st=[{label:"Prépare-toi",sec:5,kind:"rest",cd:true,info:"La séance démarre"}];
s.echauff.forEach((e,i)=>st.push({label:e.nom,sec:e.sec,kind:"rest",info:`Échauffement ${i+1}/${s.echauff.length}`}));
for(let t=1;t<=n;t++)s.exos.forEach((e,i)=>{const last=t===n&&i===nbExo-1;
st.push({label:e.nom,sec:w,kind:"work",info:`Tour ${t}/${n} · exercice ${i+1}/${nbExo}`+(e.kg?` · ${ch(e,(load().perso[jour+"-"+e.id]||{}).kg??e.kg)}`:"")});
if(!last&&r>0){const nx=i<nbExo-1?s.exos[i+1]:s.exos[0];st.push({label:"Ensuite : "+nx.nom,sec:r,kind:"rest",info:"Transition · prépare-toi"})}});return st};
$("#guide").onclick=()=>T.load(build());
document.querySelectorAll("[data-free]").forEach(b=>b.onclick=()=>freeGo([{label:"Repos",sec:+b.dataset.free,kind:"rest"}]));
$("#fgo").onclick=()=>{const v=+$("#fs").value;if(v>0)freeGo([{label:"Chrono",sec:v,kind:"rest"}])};
T.load(build());
// suivi : séance faite
const bd=$("#done");if(bd){const paint=()=>{const f=load().done[iso()];bd.textContent=f?"✓ Séance du jour validée":"Valider ma séance du jour";bd.className="btn "+(f?"main":"sage")};
bd.onclick=()=>{const d=load();if(d.done[iso()])delete d.done[iso()];else d.done[iso()]=jour;save(d);paint()};paint();
document.addEventListener("timer-done",()=>{if(!load().done[iso()]&&jour===today){const d=load();d.done[iso()]=jour;save(d);paint()}})}}

function pageSuivi(){
let m=new Date();m.setDate(1);
const draw=()=>{const d=load().done,y=m.getFullYear(),mo=m.getMonth(),nb=new Date(y,mo+1,0).getDate(),off=(m.getDay()+6)%7;
let c="";["L","M","M","J","V","S","D"].forEach(x=>c+=`<span class="h">${x}</span>`);for(let i=0;i<off;i++)c+=`<span class="e"></span>`;
let tot=0;for(let k=1;k<=nb;k++){const key=iso(new Date(y,mo,k));const ok=d[key];if(ok)tot++;c+=`<span class="${ok?"ok":""} ${key===iso()?"td":""}">${k}</span>`}
let streak=0,x=new Date();if(!d[iso(x)])x.setDate(x.getDate()-1);while(d[iso(x)]){streak++;x.setDate(x.getDate()-1)}
const all=Object.keys(d).length;
$("#sv").innerHTML=`<div class="stats card"><div><b>${streak}</b><span class="small">jours d'affilée</span></div><div><b>${tot}</b><span class="small">ce mois-ci</span></div><div><b>${all}</b><span class="small">au total</span></div></div>
<div class="card"><div class="mon"><button class="btn ghost" id="pv">‹</button><h2>${cap(m.toLocaleDateString("fr-FR",{month:"long",year:"numeric"}))}</h2><button class="btn ghost" id="nx">›</button></div><br><div class="cal">${c}</div></div>`;
$("#pv").onclick=()=>{m.setMonth(m.getMonth()-1);draw()};$("#nx").onclick=()=>{m.setMonth(m.getMonth()+1);draw()}};
shell(hero("Suivi","Mes séances","Seules les séances de sport validées sont comptées.")+`<div id="sv" class="list"></div>`);draw()}

function page404(){shell(hero("Erreur 404","Page introuvable","Le lien a peut-être changé.")+`<a class="btn main" href="index.html">Retour à l'accueil</a>`)}

({index:accueil,jour:pageJour,soin:pageSoin,sport:pageSport,suivi:pageSuivi,404:page404})[page]();
if(navigator.storage&&navigator.storage.persist)navigator.storage.persist();
if("serviceWorker"in navigator)addEventListener("load",()=>navigator.serviceWorker.register("service-worker.js").catch(()=>{}));
})();
