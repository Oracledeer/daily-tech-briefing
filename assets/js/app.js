/**
 * 🚀 每日技术晨报 — 应用引擎
 * 频道路由、报纸布局渲染、论文长文渲染
 */

/* =============================================================
   1. 粒子背景
   ============================================================= */
function initParticles(){
  const c=document.getElementById('bgCanvas'); if(!c)return;
  const ctx=c.getContext('2d'); let w,h;
  const pts=[], N=50;
  function resize(){w=c.width=window.innerWidth;h=c.height=window.innerHeight}
  class P{
    constructor(){this.reset()}
    reset(){this.x=Math.random()*w;this.y=Math.random()*h;this.vx=(Math.random()-0.5)*0.25;this.vy=(Math.random()-0.5)*0.25;this.r=Math.random()*1.5+0.5;this.a=Math.random()*0.35+0.08}
    update(){this.x+=this.vx;this.y+=this.vy;if(this.x<0||this.x>w)this.vx*=-1;if(this.y<0||this.y>h)this.vy*=-1}
    draw(){ctx.beginPath();ctx.arc(this.x,this.y,this.r,0,Math.PI*2);ctx.fillStyle=`rgba(34,211,238,${this.a})`;ctx.fill()}
  }
  for(let i=0;i<N;i++)pts.push(new P());
  function lines(){for(let i=0;i<pts.length;i++)for(let j=i+1;j<pts.length;j++){const dx=pts[i].x-pts[j].x,dy=pts[i].y-pts[j].y,d=Math.sqrt(dx*dx+dy*dy);if(d<140){ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.strokeStyle=`rgba(34,211,238,${0.05*(1-d/140)})`;ctx.lineWidth=0.5;ctx.stroke()}}}
  function ani(){ctx.clearRect(0,0,w,h);pts.forEach(p=>{p.update();p.draw()});lines();requestAnimationFrame(ani)}
  window.addEventListener('resize',resize);resize();ani()
}

/* =============================================================
   2. 状态 & 工具函数
   ============================================================= */
const S = {channel:'display',subtab:'news',date:'2026-07-06',data:null};

function esc(s){if(!s)return'';const d=document.createElement('div');d.textContent=s;return d.innerHTML}

function tags(arr,cls='tag-tech'){return arr?arr.map(t=>`<span class="tag ${cls}">${esc(t)}</span>`).join(''):''}

function routeBadge(st){const c=st.includes('↑')?'up':st.includes('↓')?'down':'stable';return`<span class="route-badge ${c}">${esc(st)}</span>`}

function getData(){
  const c=S.channel,ch=CHANNELS[c]; if(!ch)return null;
  if(c==='ai')return ch.data.news[S.date]||null;
  const dt=ch.data[S.subtab]; return dt?dt[S.date]||null:null;
}

function getAvailableDates(){
  const c=S.channel,ch=CHANNELS[c]; if(!ch)return HISTORY;
  if(c==='ai')return Object.keys(ch.data.news).sort().reverse();
  const dt=ch.data[S.subtab]; return dt?Object.keys(dt).sort().reverse():HISTORY;
}

/* =============================================================
   3. 渲染：新闻速递（报纸布局）
   ============================================================= */
function renderNews(data){
  const items=data.news||[];
  const heavys=items.filter(i=>i.weight==='heavy');
  const standards=items.filter(i=>i.weight!=='heavy');
  const flashes=data.flash||[];
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

  // ——— 重磅新闻 ———
  if(heavys.length){
    html+=`<div class="section-header"><h2>📰 重磅</h2><span class="section-line"></span></div><div class="news-grid">`;
    heavys.forEach((item,i)=>{
      const im=item.image?`<img src="${esc(item.image)}" alt="${esc(item.imageCaption||item.title)}" loading="lazy">${item.imageCaption?`<div class="img-caption">${esc(item.imageCaption)}</div>`:''}`:'<div class="img-fallback">📰</div>';
      html+=`<article class="news-card heavy animate-in">
        <div class="card-image-wrap">${im}</div>
        <div class="card-body">
          <div class="card-tags">${item.route?routeBadge(item.route):''}<span class="tag tag-cat">${esc(item.category||'')}</span>${tags(item.tags)}</div>
          <h3 class="card-title">${esc(item.title)}</h3>
          <div class="card-event">${esc(item.event||'')}</div>
          ${item.reason?`<div style="font-size:13px;color:var(--cyan);font-weight:500;margin-bottom:6px;">💡 ${esc(item.reason)}</div>`:''}
          <div class="card-footer"><span class="source">📰 ${esc(item.source||'')}</span><span>${item.date||''}</span></div>
          ${item.url?`<a class="card-link" href="${esc(item.url)}" target="_blank" rel="noopener">查看原文</a>`:''}
        </div>
      </article>`;
    });
    html+=`</div>`;
  }

  // ——— 标准新闻 ———
  if(standards.length){
    html+=`<div class="section-header" style="margin-top:8px;"><h2>📋 更多新闻</h2><span class="section-line"></span></div><div class="news-grid grid-2">`;
    standards.forEach((item,i)=>{
      const im=item.image?`<img src="${esc(item.image)}" alt="${esc(item.imageCaption||item.title)}" loading="lazy">${item.imageCaption?`<div class="img-caption">${esc(item.imageCaption)}</div>`:''}`:'<div class="img-fallback">📰</div>';
      html+=`<article class="news-card standard animate-in">
        <div class="card-image-wrap">${im}</div>
        <div class="card-body">
          <div class="card-tags">${item.route?routeBadge(item.route):''}<span class="tag tag-cat">${esc(item.category||'')}</span></div>
          <h3 class="card-title">${esc(item.title)}</h3>
          <div class="card-event">${esc(item.event||'')}</div>
          <div class="card-footer"><span class="source">📰 ${esc(item.source||'')}</span><span>${item.date||''}</span></div>
          ${item.url?`<a class="card-link" href="${esc(item.url)}" target="_blank" rel="noopener">查看原文</a>`:''}
        </div>
      </article>`;
    });
    html+=`</div>`;
  }

  // ——— 快讯 ———
  if(flashes.length){
    html+=`<div class="section-header" style="margin-top:8px;"><h2>⚡ 快讯</h2><span class="section-line"></span></div><div class="news-flash-list">`;
    flashes.forEach(f=>{
      html+=`<div class="news-flash animate-in">
        <span class="flash-badge">快讯</span>
        <span class="flash-title">${esc(f.title)}</span>
        <span class="flash-source">${esc(f.source||'')}</span>
        ${f.url?`<a class="flash-link" href="${esc(f.url)}" target="_blank">查看</a>`:''}
      </div>`;
    });
    html+=`</div>`;
  }

  // Sources
  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* =============================================================
   4. 渲染：论文研讨（长文章式）
   ============================================================= */
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
    const im=p.image?`<img src="${esc(p.image)}" alt="${esc(p.imageCaption||p.title)}" loading="lazy">${p.imageCaption?`<div class="img-caption">${esc(p.imageCaption)}</div>`:''}`:'<div class="img-fallback" style="font-size:48px;display:flex;align-items:center;justify-content:center;height:100%">📄</div>';
    html+=`<article class="paper-article animate-in">
      <div class="paper-image">${im}</div>
      <div class="paper-body">
        <div class="card-tags"><span class="tag tag-tech">${esc(p.paperType||'')}</span><span class="tag tag-cat">${esc(p.field||'')}</span><span class="tag tag-src">${esc(p.venue||'')}</span></div>
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
          <div class="collapsible"><p style="margin-top:10px">${esc(p.content||'')}</p></div>
        </div>
        ${p.techIntro?`<div class="paper-techintro"><span class="section-label">💡 技术简介</span><p>${esc(p.techIntro)}</p></div>`:''}
        ${p.attachments&&p.attachments.length?`<div class="paper-section"><span class="section-label">📎 附件</span><div class="paper-attachments">${p.attachments.map(a=>`<a class="attach-pill ${a.cached?'local':''}" href="${esc(a.url)}" target="_blank" rel="noopener"><span>${a.cached?'📎':'🔗'}</span>${esc(a.label)}</a>`).join('')}</div></div>`:''}
        <div class="paper-footer"><span>📰 ${esc(p.source||'')}</span><span>${p.date||''}</span>${p.url?`<a class="card-link" href="${esc(p.url)}" target="_blank" rel="noopener">查看原文</a>`:''}</div>
      </div>
    </article>`;
  });

  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* =============================================================
   5. 渲染：Skill推荐（AI频道专用）
   ============================================================= */
function renderAISkills(data){
  const skills=data.skills||[]; let html='';

  html+=`<section class="hero animate-in">
    <div class="hero-meta"><span class="hero-date">${esc(data.date)}</span><span class="hero-period">${esc(data.period||'')}</span></div>
    <p class="hero-summary">${esc(data.summary||'')}</p>
  </section>`;

  if(skills.length){
    html+=`<div class="skills-section" style="border:none;padding:0;"><h2>🛠️ 推荐 Skill / 工具</h2>`;
    skills.forEach(s=>{
      html+=`<div class="skill-card animate-in">
        <div class="skill-header"><span class="skill-name">${esc(s.name)}</span><span class="skill-source">${esc(s.source||'')}</span></div>
        <div class="skill-scene">📌 ${esc(s.scene||'')}</div>
        <div class="skill-desc">${esc(s.advantage||'')}</div>
        <div class="skill-reason">💡 ${esc(s.reason||'')}</div>
        ${s.url?`<a class="card-link" href="${esc(s.url)}" target="_blank">查看详情</a>`:''}
      </div>`;
    });
    html+=`</div>`;
  }else{
    html+=`<div style="text-align:center;padding:40px;color:var(--text3);border:1px solid var(--border);border-radius:var(--radius-lg)">暂无 Skill 推荐</div>`;
  }

  if(data.sources&&data.sources.length){
    html+=`<div class="footer-meta"><h3>📚 本期信息源</h3><div class="footer-sources">${tags(data.sources,'tag-src')}</div></div>`;
  }
  return html;
}

/* =============================================================
   6. 主渲染
   ============================================================= */
function render(){
  const ct=document.getElementById('appContent'),ld=document.getElementById('loadingIndicator');
  if(!ct)return;
  const data=getData();
  ld.style.display='none';

  if(!data){
    ct.innerHTML=`<div style="text-align:center;padding:60px 20px;color:var(--text3);border:1px solid var(--border);border-radius:var(--radius-lg);font-size:14px">
      ⚠️ ${S.date} 暂无${S.subtab==='skills'?'Skill推荐':S.subtab==='news'?'新闻':'论文'}数据</div>`;
    return;
  }

  let html;
  if(S.channel==='ai'&&S.subtab==='skills'){html=renderAISkills(data);}
  else if(S.subtab==='news'){html=renderNews(data);}
  else{html=renderPaper(data);}
  ct.innerHTML=html;

  // 绑定日期选择
  const sel=document.getElementById('dateSelect');
  if(sel)sel.addEventListener('change',function(){S.date=this.value;refreshDateTag();render();window.scrollTo({top:0,behavior:'smooth'})});
}

/* =============================================================
   7. 日期下拉更新
   ============================================================= */
function refreshDateTag(){
  const sel=document.getElementById('dateSelect');
  const tag=document.getElementById('weekdayTag');
  if(!sel)return;
  const dates=getAvailableDates();
  sel.innerHTML=dates.map(d=>`<option value="${d}" ${d===S.date?'selected':''}>${d}</option>`).join('');
  if(tag){
    const data=getData();
    tag.textContent=data&&data.weekday?`· ${data.weekday}`:'';
  }
}

/* =============================================================
   8. 初始化
   ============================================================= */
document.addEventListener('DOMContentLoaded',function(){
  initParticles();

  // 频道Tab切换
  document.querySelectorAll('.tab').forEach(tab=>{
    tab.addEventListener('click',function(){
      document.querySelectorAll('.tab').forEach(t=>t.classList.remove('active'));
      this.classList.add('active');
      S.channel=this.dataset.channel;
      S.subtab='news';
      const ch=CHANNELS[S.channel];
      const bar=document.getElementById('subtabBar');
      const nav=document.getElementById('subtabNav');
      if(ch.hasSubtab){
        bar.classList.add('visible');
        nav.innerHTML=ch.subtabs.map((st,i)=>`<button class="subtab ${i===0?'active':''}" data-sub="${st.key}"><span>${st.icon}</span> ${st.label}</button>`).join('');
        // 子Tab切换
        nav.querySelectorAll('.subtab').forEach(btn=>{
          btn.addEventListener('click',function(){
            nav.querySelectorAll('.subtab').forEach(b=>b.classList.remove('active'));
            this.classList.add('active');
            S.subtab=this.dataset.sub;
            const avail=getAvailableDates();
            if(avail.length&&!avail.includes(S.date))S.date=avail[0];
            refreshDateTag();
            render();
            window.scrollTo({top:0,behavior:'smooth'});
          });
        });
      }else{
        bar.classList.remove('visible');
        nav.innerHTML='';
      }
      // 切换频道时，如果当前日期在该频道无数据，自动选最新日期
      const avail=getAvailableDates();
      if(avail.length&&!avail.includes(S.date))S.date=avail[0];
      refreshDateTag();
      render();
      window.scrollTo({top:0,behavior:'smooth'});
    });
  });

  // 默认加载
  const ch=CHANNELS[S.channel];
  if(ch.hasSubtab){
    document.getElementById('subtabBar').classList.add('visible');
    const nav=document.getElementById('subtabNav');
    nav.innerHTML=ch.subtabs.map((st,i)=>`<button class="subtab ${i===0?'active':''}" data-sub="${st.key}"><span>${st.icon}</span> ${st.label}</button>`).join('');
    nav.querySelectorAll('.subtab').forEach(btn=>{
      btn.addEventListener('click',function(){
        nav.querySelectorAll('.subtab').forEach(b=>b.classList.remove('active'));
        this.classList.add('active');
        S.subtab=this.dataset.sub;
        const avail=getAvailableDates();
        if(avail.length&&!avail.includes(S.date))S.date=avail[0];
        refreshDateTag();
        render();
        window.scrollTo({top:0,behavior:'smooth'});
      });
    });
  }
  refreshDateTag();
  render();
});
