const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],esc=t=>String(t??'').replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const HASH=!!window.__HASH__,pad=i=>String(i+1).padStart(2,'0'),dl=i=>`style="--d:${(i%3)*.1}s"`;
const GL={sluzby:{label:'Služby',a:'#sluzby'},pracoviska:{label:'Pracoviská',a:'#pracoviska'}};
const im=(u,a='')=>u?`<img onerror="this.remove()" src="${esc(u)}" alt="${esc(a)}" loading="lazy">`:'';
let D,P={};
const pages=g=>D.pages.filter(p=>p.group===g),key=p=>p.group+'/'+p.slug,url=p=>HASH?'#'+p.group+'-'+p.slug:'/'+key(p);
const cur=()=>P[HASH?location.hash.slice(1).replace('-','/'):location.pathname.replace(/^\/+|\/+$/g,'')]||null;
const words=(t,n=2)=>{const w=t.split(' ');return w.map((x,i)=>`<span class="w${i>=w.length-n?' acc':''}" aria-hidden="true"><i style="--i:${i}">${esc(x)}</i></span>`).join(' ')};
const paras=t=>String(t||'').split(/\n+/).map(x=>`<p>${esc(x)}</p>`).join('');
const stats=a=>`<div class="stats n${a.length}">${a.map((s,i)=>`<div class="stat rv" ${dl(i)}><b><span data-to="${+s.value}">0</span>${esc(s.suffix)}</b><span>${esc(s.label)}</span></div>`).join('')}</div>`;
const card=(p,i)=>`<a class="div rv" data-r href="${url(p)}" ${dl(i)}><span class="cimg">${im(p.image)}</span><span class="n">${pad(i)}</span><h3>${esc(p.title)}</h3><p>${esc(p.short)}</p><ul>${(p.features||[]).map(f=>`<li>${esc(f.title)}</li>`).join('')}</ul><span class="more">Zistiť viac →</span></a>`;

(HASH?Promise.resolve(window.__DATA__):fetch('/content/site.json').then(r=>r.json())).then(d=>{D=d;d.pages.forEach(p=>P[key(p)]=p);build();render();if(window.__DEMO__)demo()})
.catch(e=>{console.error(e);document.body.insertAdjacentHTML('afterbegin','<p style="padding:20px">Obsah sa nepodarilo načítať (spustite stránku cez server alebo Netlify).</p>')});

const bg=(s,u)=>{const i=$(s);if(!i||!u)return;i.onerror=()=>i.remove();i.src=u;i.hidden=false};
const setTheme=c=>document.documentElement.style.setProperty('--ac',c);
function demo(){const w=document.createElement('div');w.className='sw';w.innerHTML='<span>Farba webu</span>'+['#ff6b1a','#1d4ed8','#059669','#dc2626','#7c3aed','#0f766e'].map(c=>`<button style="background:${c}" data-c="${c}" aria-label="${c}"></button>`).join('');w.onclick=e=>{const b=e.target.closest('button');if(b)setTheme(b.dataset.c)};document.body.appendChild(w)}
function build(){const d=D,h=d.hero,p=d.profile;
  document.title=`${d.legal} – Stavebná spoločnosť`;
  setTheme((d.theme&&d.theme.color)||'#ff6b1a');
  $('#logo').textContent=d.company;$('#logoSub').textContent=d.legal.replace(d.company+' ','');$('#f-name').textContent=d.company;$('#f-legal').textContent=d.legal;$('#yr').textContent=new Date().getFullYear();
  $('#t-addr').textContent=d.address1;const ph=$('#t-phone');ph.textContent=d.phone;ph.href='tel:'+d.phone.replace(/\s/g,'');const ml=$('#t-mail');ml.textContent=d.email;ml.href='mailto:'+d.email;
  const dd=g=>`<div class="dd"><a href="${GL[g].a}" data-a="${GL[g].a}">${GL[g].label} ▾</a><div class="menu">${pages(g).map(x=>`<a data-r href="${url(x)}">${esc(x.title)}</a>`).join('')}</div></div>`;
  $('#nav').innerHTML=`<a href="#profil" data-a="#profil">Profil</a>${dd('sluzby')}${dd('pracoviska')}<a href="#projekty" data-a="#projekty">Projekty</a><a href="#aktuality" data-a="#aktuality">Aktuality</a><a class="btn sm" href="#kontakt" data-a="#kontakt">Kontakt</a>`;
  bg('#h-img',h.image);bg('#b-img',d.banner.image);
  $('#h-eyebrow').textContent=h.eyebrow;$('#h-text').textContent=h.text;$('#h-cta1').textContent=h.cta1;$('#h-cta2').textContent=h.cta2;$('#h-title').setAttribute('aria-label',h.title);$('#h-title').innerHTML=words(h.title);
  $('#stats').outerHTML=stats(d.stats).replace('class="stats','id="stats" class="stats');
  $('#p-eyebrow').textContent=p.eyebrow;$('#p-title').textContent=p.title;$('#p-year').textContent=p.year;$('#p-ylabel').textContent=p.yearLabel;$('#p-text').innerHTML=paras(p.text);
  $('#p-points').innerHTML=p.points.map(x=>`<li>${esc(x)}</li>`).join('');if(p.image)$('#p-photo').innerHTML=`<img onerror="this.remove()" src="${esc(p.image)}" alt="" loading="lazy">`;
  $('#p-photo2').innerHTML=im(p.image2);$('#p-photo2').hidden=!p.image2;
  $('#divs').innerHTML=pages('sluzby').map(card).join('');
  const cats=[...new Set(d.projects.map(x=>x.category))];
  $('#chips').innerHTML=['Všetko',...cats].map((c,i)=>`<button class="chip${i?'':' on'}" data-f="${i?esc(c):''}">${esc(c)}</button>`).join('');
  $('#projects').innerHTML=d.projects.map(x=>`<article class="proj" data-c="${esc(x.category)}">${x.image?`<img onerror="this.remove()" src="${esc(x.image)}" alt="${esc(x.title)}" loading="lazy">`:''}<div><small>${esc(x.category)} · ${esc(x.year)}</small><h3>${esc(x.title)}</h3></div></article>`).join('');
  $('#b-title').textContent=d.banner.title;$('#b-text').textContent=d.banner.text;$('#b-btn').textContent=d.banner.button;
  $('#rows').innerHTML=pages('pracoviska').map((x,i)=>`<a class="row rv" data-r href="${url(x)}"><span class="n">${pad(i)}</span><span class="thumb">${im(x.image)}</span><h3>${esc(x.title)}</h3><p>${esc(x.short)}</p><span class="ar">→</span></a>`).join('');
  const fl=g=>pages(g).map(x=>`<a data-r href="${url(x)}">${esc(x.title)}</a>`).join('');$('#f-s').innerHTML=fl('sluzby');$('#f-p').innerHTML=fl('pracoviska');
  $('#news').innerHTML=d.news.map((x,i)=>`<article class="nw rv" ${dl(i)}><span class="nimg">${im(x.image)}</span><small>${esc(x.date)}</small><h3>${esc(x.title)}</h3><p>${esc(x.text)}</p></article>`).join('');
  $('#c-title').textContent=d.contact.title;$('#c-text').textContent=d.contact.text;
  $('#infos').innerHTML=[['Sídlo spoločnosti',d.address1],['Korešpondenčná adresa',d.address2],['Telefón',d.phone],['E-mail',d.email]].map(([a,b])=>`<div><h4>${a}</h4><p>${esc(b)}</p></div>`).join('');
  $('#f-contact').innerHTML=`${esc(d.address1)}<br>${esc(d.email)}<br>${esc(d.phone)}`;
  $('#chips').addEventListener('click',e=>{const b=e.target.closest('.chip');if(!b)return;$$('.chip').forEach(c=>c.classList.toggle('on',c===b));
    $$('.proj').forEach(x=>{const s=!b.dataset.f||x.dataset.c===b.dataset.f;x.classList.toggle('hide',!s);if(s){x.style.animation='none';x.offsetWidth;x.style.animation=''}})});
}

function detail(p){const g=GL[p.group],rel=pages(p.group).filter(x=>x!==p);
  return `<section class="dhero">${im(p.image).replace("<img ","<img class=\"bgimg\" ")}<div class="mesh"><i></i><i></i><i></i></div><div class="grid"></div><div class="shape s1" data-p=".12"></div><div class="wrap hero-in">
<nav class="crumbs"><a href="#hero" data-a="#hero">Domov</a><span>/</span><a href="${g.a}" data-a="${g.a}">${g.label}</a><span>/</span><b>${esc(p.title)}</b></nav>
<p class="eyebrow">${g.label}</p><h1 class="d1" aria-label="${esc(p.title)}">${words(p.title,1)}</h1><p class="lead">${esc(p.lead)}</p></div></section>
${p.facts&&p.facts.length?`<div class="wrap statwrap">${stats(p.facts)}</div>`:''}
<section><div class="wrap two"><div class="txt rv"><p class="eyebrow">O ${g.label==='Služby'?'službe':'pracovisku'}</p><h2>${esc(p.title)}</h2>${paras(p.text)}<a class="btn" href="#kontakt" data-a="#kontakt" style="margin-top:14px">Nezáväzný dopyt</a></div>
<div class="media rv"><div class="photo">${p.image?`<img onerror="this.remove()" src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">`:''}</div></div></div></section>
<section class="tint"><div class="wrap"><p class="eyebrow rv">Čo ponúkame</p><h2 class="rv">Naše riešenia</h2><div class="feat">${(p.features||[]).map((f,i)=>`<div class="ft rv" ${dl(i)}><div class="ic">${i+1}</div><h3>${esc(f.title)}</h3><p>${esc(f.text)}</p></div>`).join('')}</div></div></section>
${(p.gallery||[]).length?`<section><div class="wrap"><p class="eyebrow rv">Galéria</p><h2 class="rv">Z našich stavieb</h2><div class="gal">${p.gallery.map((g,n)=>`<div class="rv" ${dl(n)}>${im(typeof g==='string'?g:g.image)}</div>`).join('')}</div></div></section>`:''}
${rel.length?`<section><div class="wrap"><p class="eyebrow rv">Ďalej</p><h2 class="rv">${p.group==='sluzby'?'Ďalšie služby':'Ďalšie pracoviská'}</h2><div class="divs">${rel.slice(0,3).map(card).join('')}</div></div></section>`:''}
<section class="banner"><div class="stripes"></div><div class="wrap bn"><div><h2>${esc(D.banner.title)}</h2><p>${esc(D.banner.text)}</p></div><a class="btn light" href="#kontakt" data-a="#kontakt">${esc(D.banner.button)}</a></div></section>`}

function render(){const p=cur(),dt=$('#detail');$('#home').hidden=!!p;dt.hidden=!p;
  if(p){dt.innerHTML=detail(p);dt.classList.remove('pg');void dt.offsetWidth;dt.classList.add('pg');scrollTo(0,0)}
  else{const h=location.hash.slice(1),t=h&&document.getElementById(h);t?setTimeout(()=>t.scrollIntoView({behavior:'smooth'}),30):scrollTo(0,0)}
  document.title=p?`${p.title} – ${D.legal}`:`${D.legal} – Stavebná spoločnosť`;$$('.rv:not(.in)').forEach(el=>io.observe(el));sc()}

const io=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;e.target.classList.add('in');io.unobserve(e.target);
  e.target.querySelectorAll('[data-to]').forEach(n=>{const to=+n.dataset.to,t0=performance.now();(function f(t){const k=Math.min((t-t0)/1800,1);n.textContent=Math.round(to*(1-Math.pow(1-k,4)));if(k<1)requestAnimationFrame(f)})(t0)})}),{threshold:.15});
function sc(){const y=scrollY;$('#hdr').classList.toggle('s',y>20);$('#progress').style.transform=`scaleX(${y/Math.max(1,document.documentElement.scrollHeight-innerHeight)})`;$$('.shape').forEach(s=>s.style.setProperty('--y',y*(+s.dataset.p)+'px'))}
addEventListener('scroll',sc,{passive:true});
addEventListener(HASH?'hashchange':'popstate',()=>D&&render());
document.addEventListener('click',e=>{const a=e.target.closest('a');if(!a||!D)return;
  if(a.matches('.dd>a')&&innerWidth<=980){e.preventDefault();a.parentNode.classList.toggle('open');return}
  $('#nav').classList.remove('open');
  if(!HASH&&a.hasAttribute('data-r')){e.preventDefault();history.pushState(0,'',a.getAttribute('href'));render()}
  else if(!HASH&&a.dataset.a&&cur()){e.preventDefault();history.pushState(0,'','/'+a.dataset.a);render()}});
