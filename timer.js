function createTimer(p,o={}){let S=[],i=-1,end=0,left=0,iv=0,run=false,wl=null,lb=0;
const q=s=>p.querySelector(s),el={label:q("[data-t-label]"),time:q("[data-t-time]"),info:q("[data-t-info]"),bar:q("[data-t-bar]"),start:q("[data-t-start]")};
const fmt=s=>String(Math.floor(s/60)).padStart(2,"0")+":"+String(s%60).padStart(2,"0");
const beep=(f,d)=>{try{const c=new(window.AudioContext||window.webkitAudioContext)(),x=c.createOscillator(),g=c.createGain();x.frequency.value=f;g.gain.value=.25;x.connect(g);g.connect(c.destination);x.start();x.stop(c.currentTime+d)}catch(e){}};
const buzz=v=>navigator.vibrate&&navigator.vibrate(v);
const lock=async()=>{try{wl=await navigator.wakeLock.request("screen")}catch(e){}};
const unlock=()=>{if(wl){wl.release().catch(()=>{});wl=null}};
function show(s){el.time.textContent=fmt(Math.max(0,Math.ceil(s)));const t=S[i]?S[i].sec:1;el.bar.style.width=(100-(Math.max(0,s)/t)*100)+"%"}
function enter(k){i=k;const s=S[k];left=s.sec;end=Date.now()+left*1000;lb=0;p.dataset.kind=s.kind||"work";el.label.textContent=s.label;el.info.textContent=s.info||"";if(k>0){s.kind==="work"?beep(1100,.4):beep(640,.15);buzz(150)}show(left)}
function stop(){clearInterval(iv);run=false;unlock();el.start.textContent="Lancer"}
function finish(){stop();i=-1;p.dataset.kind="";el.label.textContent="Terminé 💪";el.info.textContent="Bien joué !";el.time.textContent="00:00";el.bar.style.width="100%";beep(880,.2);setTimeout(()=>beep(880,.2),300);setTimeout(()=>beep(1175,.4),600);buzz([200,100,200,100,400]);o.done&&o.done()}
function tick(){left=(end-Date.now())/1000;const c=Math.ceil(left),nx=S[i+1];
if(nx&&(nx.kind==="work"||S[i].cd)&&c<=3&&c>0&&c!==lb){lb=c;beep(520,.1)}
if(left<=0){if(nx)enter(i+1);else{finish();return}}show(left)}
function start(){if(!S.length)return;if(i<0)enter(0);else end=Date.now()+left*1000;run=true;clearInterval(iv);iv=setInterval(tick,200);lock();el.start.textContent="Pause"}
function pause(){left=(end-Date.now())/1000;stop();el.start.textContent="Reprendre"}
function reset(){stop();i=-1;p.dataset.kind="";el.label.textContent="Prêt";el.info.textContent=S.length?S[0].label:"";el.time.textContent=fmt(S.length?S[0].sec:0);el.bar.style.width="0"}
el.start.onclick=()=>run?pause():start();
q("[data-t-skip]").onclick=()=>{if(i<0)return;S[i+1]?enter(i+1):finish()};
q("[data-t-reset]").onclick=()=>{reset();o.stop&&o.stop()};
document.addEventListener("visibilitychange",()=>{if(run&&document.visibilityState==="visible")lock()});
const load=s=>{stop();S=s;reset()};
return{load,go:s=>{load(s);start()}}}
