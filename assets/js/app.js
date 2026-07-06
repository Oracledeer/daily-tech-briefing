/**
 * 🚀 每日技术晨报 — 应用引擎 v4
 * 杂志网格 · 不平均排布 · 亮色主题
 */

/* ===== 1. 状态 ===== */
const S = {channel:'display', subtab:'news', date:'2026-07-06', data:null};

function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function tags(arr,cls='tag-tech'){return arr?arr.map(t=>`<span class="tag ${cls}">${esc(t)}</span>`).join(''):''}

function routeBadge(st){const c=st.includes('↑')?'up':st.includes('↓')?'down':'stable';return`<span class="route-badge ${c}">${esc(st)}</span>`}

function getData(){
  const ch=CHANNELS[S.channel]; if(!ch)return null;
  if(S.channel==='ai'&&S.subtab==='skills')return ch.data.skills[S.date]||null;
  if(S.channel==='ai')return ch.data.news[S.date]||null;
  const dt=ch.data[S.subtab]; return dt?dt[S.date]||null:null;
}

function getAvailableDates(){
  const ch=CHANNELS[S.channel]; if(!ch)return HISTORY;
  if(S.channel==='ai'&&S.subtab==='skills')return Object.keys(ch.data.skills).sort().reverse();
  if(S.channel==='ai')return Object.keys(ch.data.news).sort().reverse();
  const dt=ch.data[S.subtab]; return dt?Object.keys(dt).sort().reverse():HISTORY;
}

/* ===== 2. 渲染：新闻速递（杂志网格）===== */
function renderNews(data){
  const items=data.news||[], flashes=data.flash||[];
  let html='';

  // Hero
  html+=`<section class="hero animate-in">
    <div class="hero-meta"><span class="hero-date">${esc(data.date)}</span><span class="hero-period">${esc(data.period||'')}</span></div>
    <p class="hero-summary">${esc(data.summary||'')}</p>
    ${data.highlights?`<div class="hero-highlights"><h3>📌 本期重点</h3><ul>${data.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul></div>`:''}
  </section>`;

  // Routes
  if(data.routes&&data.routes.length){
    html+=`<section class="route-section animate-in"><h2>📊 技术路线动态</h2><div class="route-grid">${data.routes.map(r=>`<div class="route-card"><div class="route-name">${routeBadge(r.status)} ${esc(r.name)}</div><div class="route-note">${esc(r.note||'')}</div></div>`).join('')}</div></section>`;
  }

  // 杂志网格
  html+=`<div class="magazine-grid">`;

  // 重磅 (span6)
  items.filter(i=>i.weight==='heavy').forEach(item=>{
    const im=item.image
      ?`<img src="${esc(item.image)}" alt="${esc(item.imageCaption||item.title)}" loading="lazy">${item.imageCaption?`<div class="img-caption">${esc(item.imageCaption)}</div>`:''}`
      :`<div class="img-fallback">📰</div>`;
    html+=`<article class="news-card heavy animate-in">
      <div class="card-image-wrap">${im}</div>
      <div class="card-body">
        <div class="card-tags">${item.route?routeBadge(item.route):''}<span class="tag tag-cat">${esc(item.category||'')}</span>${tags(item.tags)}</div>
        <h3 class="card-title">${esc(item.title)}</h3>
        <div class="card-event">${esc(item.event||'')}</div>
        ${item.reason?`<div class="card-reason">💡 ${esc(item.reason)}</div>`:''}
        <div class="card-footer"><span>📰 ${esc(item.source||'')}</span><span>${item.date||''}</span></div>
        ${item.url?`<a class="card-link" href="${esc(item.url)}" target="_blank" rel="noopener">查看原文</a>`:''}
      </div>
    </article>`;
  });

  // 次重点（不等宽：wide/medium/narrow）
  const seclist=items.filter(i=>i.weight==='secondary');
  // 交替排布避免呆板: 尝试 wide→narrow→medium→narrow→medium→wide...
  const spanOrder=seclist.map((item,i)=>{
    if(item.span)return item.span;
    // 自动交替
    const pattern=['wide','narrow','medium','narrow','medium','wide','narrow','medium'];
    return pattern[i%pattern.length];
  });
  seclist.forEach((item,i)=>{
    const sp=spanOrder[i];
    const im=item.image
     ?`<img src="${esc(item.image)}" alt="${esc(item.imageCaption||item.title)}" loading="lazy">${item.imageCaption?`<div class="img-caption">${esc(item.imageCaption)}</div>`:''}`
      :`<div class="img-fallback">📰</div>`;
    html+=`<article class="news-card secondary ${sp} animate-in">
      <div class="card-image-wrap">${im}</div>
      <div class="card-body">
        <div class="card-tags">${item.route?routeBadge(item.route):''}<span class="tag tag-cat">${esc(item.category||'')}</span></div>
        <h3 class="card-title">${esc(item.title)}</h3>
        <div class="card-event">${esc(item.event||'')}</div>
        <div class="card-footer"><span>📰 ${esc(item.source||'')}</span><span>${item.date||''}</span></div>
        ${item.url?`<a class="card-link" href="${esc(item.url)}" target="_blank">查看原文</a>`:''}
      </div>
    </article>`;
  });

  html+=`</div>`; // close magazine-grid

  // 快讯
  if(flashes.length){
    html+=`<div class="flash-section animate-in">
      <div class="flash-header">⚡ 快讯</div>
      <div class="flash-list">${flashes.map(f=>`<div class="flash-item"><span class="flash-badge">快讯</span><span class="flash-title">${esc(f.title)}</span><span class="flash-source">${esc(f.source||'')}</span>${f.url?`<a class="flash-link" href="${esc(f.url)}" target="_blank">查看</a>`:''}</div>`).join('')}</div>
    </div>`;
  }

  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* ===== 3. 渲染：论文研讨 ===== */
function renderPaper(data){
  const papers=data.papers||[]; let html='';

  html+=`<section class="hero animate-in">
    <div class="hero-meta"><span class="hero-date">${esc(data.date)}</span><span class="hero-period">${esc(data.period||'')}</span></div>
    <p class="hero-summary">${esc(data.summary||'')}</p>
    ${data.highlights?`<div class="hero-highlights"><h3>📌 本期重点</h3><ul>${data.highlights.map(h=>`<li>${esc(h)}</li>`).join('')}</ul></div>`:''}
  </section>`;

  if(data.routes&&data.routes.length){
    html+=`<section class="route-section animate-in"><h2>📊 技术路线动态</h2><div class="route-grid">${data.routes.map(r=>`<div class="route-card"><div class="route-name">${routeBadge(r.status)} ${esc(r.name)}</div><div class="route-note">${esc(r.note||'')}</div></div>`).join('')}</div></section>`;
  }

  papers.forEach((p,i)=>{
    const im=p.image
      ?`<img src="${esc(p.image)}" alt="${esc(p.imageCaption||p.title)}" loading="lazy">${p.imageCaption?`<div class="img-caption">${esc(p.imageCaption)}</div>`:''}`
      :`<div class="img-fallback">📄</div>`;
    html+=`<article class="paper-article animate-in">
      <div class="paper-image">${im}</div>
      <div class="paper-body">
        <div class="card-tags"><span class="tag tag-tech">${esc(p.paperType||'')}</span><span class="tag tag-cat">${esc(p.field||'')}</span></div>
        <h2 class="paper-title">${esc(p.title)}</h2>
        ${p.authors?`<div class="paper-authors">${esc(p.authors)}</div>`:''}
        ${p.venue?`<div class="paper-venue">${esc(p.venue)}</div>`:''}
        ${p.oneLiner?`<div class="paper-oneliner">${esc(p.oneLiner)}</div>`:''}
        ${p.techTags?`<div class="paper-tag-cloud">${p.techTags.map(t=>`<span class="paper-tag">${esc(t)}</span>`).join('')}</div>`:''}
        ${p.metrics?`<div class="paper-metrics">${p.metrics.map(m=>`<div class="metric-row"><span class="metric-name">${esc(m.name)}</span><span class="metric-value">${esc(m.value)}<span class="metric-unit">${esc(m.unit||'')}</span></span>${m.note?`<div class="metric-note">${esc(m.note)}</div>`:''}</div>`).join('')}</div>`:''}
        <div class="paper-section"><span class="section-label">📝 摘要</span><p>${esc(p.abstract||'')}</p></div>
        <div class="paper-section">
          <span class="section-label">🔬 主要内容</span>
          <button class="collapse-btn" onclick="this.nextElementSibling.classList.toggle('open');this.textContent=this.nextElementSibling.classList.contains('open')?'收起全文 ▲':'展开全文 ▼'">展开全文 ▼</button>
          <div class="collapsible"><p style="margin-top:8px">${esc(p.content||'')}</p></div>
        </div>
        ${p.techIntro?`<div class="paper-techintro"><span class="section-label">💡 技术简介</span><p>${esc(p.techIntro)}</p></div>`:''}
        ${p.attachments&&p.attachments.length?`<div class="paper-section"><span class="section-label">📎 附件</span><div class="paper-attachments">${p.attachments.map(a=>`<a class="attach-pill ${a.cached?'local':''}" href="${esc(a.url)}" target="_blank"><span>${a.cached?'📎':'🔗'}</span>${esc(a.label)}</a>`).join('')}</div></div>`:''}
        <div class="paper-footer"><span>📰 ${esc(p.source||'')}</span><span>${p.date||''}</span>${p.url?`<a class="card-link" href="${esc(p.url)}" target="_blank">查看原文</a>`:''}</div>
      </div>
    </article>`;
  });

  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* ===== 4. 渲染：Skill推荐 ===== */
function renderAISkills(data){
  const skills=data.skills||[]; let html='';
  html+=`<section class="hero animate-in">
    <div class="hero-meta"><span class="hero-date">${esc(data.date)}</span><span class="hero-period">${esc(data.period||'')}</span></div>
    <p class="hero-summary">${esc(data.summary||'')}</p>
  </section>`;
  if(skills.length){
    html+=`<div class="skills-section" style="border:none;padding:0;"><h2>🛠️ 推荐 Skill / 工具</h2>`;
    skills.forEach(s=>{html+=`<div class="skill-card animate-in">
      <div class="skill-header"><span class="skill-name">${esc(s.name)}</span><span class="skill-source">${esc(s.source||'')}</span></div>
      <div class="skill-scene">📌 ${esc(s.scene||'')}</div>
      <div class="skill-desc">${esc(s.advantage||'')}</div>
      <div class="skill-reason">💡 ${esc(s.reason||'')}</div>
      ${s.url?`<a class="card-link" href="${esc(s.url)}" target="_blank">查看详情</a>`:''}
    </div>`;});
    html+=`</div>`;
  }else{
    html+=`<div style="text-align:center;padding:40px;color:var(--text3);border:1px solid var(--border);border-radius:var(--radius-lg)">暂无 Skill 推荐</div>`;
  }
  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* ===== 5. 主渲染 ===== */
function render(){
  const ct=document.getElementById('appContent'),ld=document.getElementById('loadingIndicator');
  if(!ct)return;
  const data=getData();
  ld.style.display='none';
  if(!data){
    ct.innerHTML=`<div style="text-align:center;padding:60px 20px;color:var(--text3);border:1px solid var(--border);border-radius:var(--radius-lg);font-size:14px;background:#fff">⚠️ ${S.date} 暂无${S.subtab==='skills'?'Skill推荐':S.subtab==='news'?'新闻':'论文'}数据</div>`;
    return;
  }
  let html;
  if(S.channel==='ai'&&S.subtab==='skills'){html=renderAISkills(data);}
  else if(S.subtab==='news'){html=renderNews(data);}
  else{html=renderPaper(data);}
  ct.innerHTML=html;
  const sel=document.getElementById('dateSelect');
  if(sel)sel.addEventListener('change',function(){S.date=this.value;refreshDateTag();render();window.scrollTo({top:0,behavior:'smooth'})});
}

/* ===== 6. 日期 ===== */
function refreshDateTag(){
  const sel=document.getElementById('dateSelect'),tag=document.getElementById('weekdayTag');
  if(!sel)return;
  const dates=getAvailableDates();
  sel.innerHTML=dates.map(d=>`<option value="${d}" ${d===S.date?'selected':''}>${d}</option>`).join('');
  if(tag){const d=getData();tag.textContent=d&&d.weekday?`· ${d.weekday}`:'';}
}

/* ===== 7. 初始化 ===== */
document.addEventListener('DOMContentLoaded',function(){
  // 频道Tab
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      this.classList.add('active');
      S.channel=this.dataset.channel; S.subtab='news';
      const ch=CHANNELS[S.channel],bar=document.getElementById('subtabBar'),nav=document.getElementById('subtabNav');
      if(ch.hasSubtab){
        bar.classList.add('visible');
        nav.innerHTML=ch.subtabs.map((st,i)=>`<button class="subtab ${i===0?'active':''}" data-sub="${st.key}"><span>${st.icon}</span> ${st.label}</button>`).join('');
        nav.querySelectorAll('.subtab').forEach(btn=>{
          btn.addEventListener('click',function(){
            nav.querySelectorAll('.subtab').forEach(b=>b.classList.remove('active'));
            this.classList.add('active'); S.subtab=this.dataset.sub;
            const av=getAvailableDates(); if(av.length&&!av.includes(S.date))S.date=av[0];
            refreshDateTag(); render(); window.scrollTo({top:0,behavior:'smooth'});
          });
        });
      }else{bar.classList.remove('visible');nav.innerHTML='';}
      const av=getAvailableDates(); if(av.length&&!av.includes(S.date))S.date=av[0];
      refreshDateTag(); render(); window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // 默认加载
  const ch=CHANNELS[S.channel],bar=document.getElementById('subtabBar'),nav=document.getElementById('subtabNav');
  if(ch.hasSubtab){
    bar.classList.add('visible');
    nav.innerHTML=ch.subtabs.map((st,i)=>`<button class="subtab ${i===0?'active':''}" data-sub="${st.key}"><span>${st.icon}</span> ${st.label}</button>`).join('');
    nav.querySelectorAll('.subtab').forEach(btn=>{
      btn.addEventListener('click',function(){
        nav.querySelectorAll('.subtab').forEach(b=>b.classList.remove('active'));
        this.classList.add('active'); S.subtab=this.dataset.sub;
        const av=getAvailableDates(); if(av.length&&!av.includes(S.date))S.date=av[0];
        refreshDateTag(); render(); window.scrollTo({top:0,behavior:'smooth'});
      });
    });
  }
  refreshDateTag(); render();
});
