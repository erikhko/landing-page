(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const brl = n => n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 });
const store = {
  get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} }
};

/* ---------- DATA ---------- */
const CATS = { all: 'Todos', gpu: 'Placas de Vídeo', cpu: 'Processadores', ram: 'Memória', armazenamento: 'Armazenamento', periferico: 'Periféricos', monitor: 'Monitores', audio: 'Áudio' };
const P = [
  { id: 1, name: 'RTX 5080 Phantom 16GB', cat: 'gpu', art: 'gpu', price: 7299, old: 8999, rating: 4.9, tag: 'hot', pf: 50, w: 360, specs: [['VRAM', '16GB GDDR7'], ['Boost', '2.6 GHz'], ['Ray Tracing', 'Sim'], ['Saída', '4K 240Hz']] },
  { id: 2, name: 'RX 8700 XT Nitro 12GB', cat: 'gpu', art: 'gpu', price: 3899, old: 4499, rating: 4.7, pf: 34, w: 270, specs: [['VRAM', '12GB GDDR6'], ['Boost', '2.5 GHz'], ['Ray Tracing', 'Sim'], ['Saída', '4K 120Hz']] },
  { id: 3, name: 'GTX Volt 4060 Ti 8GB', cat: 'gpu', art: 'gpu', price: 2399, rating: 4.5, pf: 22, w: 160, specs: [['VRAM', '8GB GDDR6'], ['Boost', '2.5 GHz'], ['Ray Tracing', 'Parcial'], ['Saída', '1440p 144Hz']] },
  { id: 4, name: 'Ryzen 9 9950X 16 núcleos', cat: 'cpu', art: 'cpu', price: 3799, old: 4290, rating: 4.9, tag: 'new', pf: 30, w: 170, specs: [['Núcleos', '16 / 32 threads'], ['Boost', '5.7 GHz'], ['Cache', '80MB'], ['Soquete', 'AM5']] },
  { id: 5, name: 'Core i7 15700K 20 núcleos', cat: 'cpu', art: 'cpu', price: 2799, rating: 4.6, pf: 24, w: 125, specs: [['Núcleos', '20 / 28 threads'], ['Boost', '5.6 GHz'], ['Cache', '33MB'], ['Soquete', 'LGA1851']] },
  { id: 6, name: 'Ryzen 5 9600X 6 núcleos', cat: 'cpu', art: 'cpu', price: 1399, rating: 4.6, pf: 15, w: 65, specs: [['Núcleos', '6 / 12 threads'], ['Boost', '5.4 GHz'], ['Cache', '38MB'], ['Soquete', 'AM5']] },
  { id: 7, name: 'Memória DDR5 32GB 7200MHz RGB', cat: 'ram', art: 'ram', price: 899, old: 1149, rating: 4.8, pf: 10, w: 10, specs: [['Capacidade', '32GB (2x16)'], ['Velocidade', '7200 MHz'], ['Latência', 'CL34'], ['RGB', 'Sim']] },
  { id: 8, name: 'Memória DDR5 16GB 5600MHz', cat: 'ram', art: 'ram', price: 429, rating: 4.4, pf: 5, w: 5, specs: [['Capacidade', '16GB (1x16)'], ['Velocidade', '5600 MHz'], ['Latência', 'CL40'], ['RGB', 'Não']] },
  { id: 9, name: 'SSD NVMe Gen5 2TB Blaze', cat: 'armazenamento', art: 'ssd', price: 1599, old: 1899, rating: 4.8, tag: 'hot', pf: 10, w: 10, specs: [['Capacidade', '2TB'], ['Leitura', '12.400 MB/s'], ['Escrita', '11.800 MB/s'], ['Interface', 'PCIe 5.0']] },
  { id: 10, name: 'SSD NVMe Gen4 1TB Flux', cat: 'armazenamento', art: 'ssd', price: 449, rating: 4.7, pf: 6, w: 7, specs: [['Capacidade', '1TB'], ['Leitura', '7.000 MB/s'], ['Escrita', '5.300 MB/s'], ['Interface', 'PCIe 4.0']] },
  { id: 11, name: 'Teclado Mecânico Aero 75% Hot-Swap', cat: 'periferico', art: 'keyboard', price: 649, old: 799, rating: 4.8, tag: 'new', specs: [['Layout', '75%'], ['Switch', 'Óptico linear'], ['Conexão', 'USB / 2.4G / BT'], ['RGB', 'Por tecla']] },
  { id: 12, name: 'Mouse Gamer Strike Pro Wireless 55g', cat: 'periferico', art: 'mouse', price: 459, rating: 4.7, specs: [['Peso', '55g'], ['Sensor', '32.000 DPI'], ['Polling', '4000 Hz'], ['Bateria', '90h']] },
  { id: 13, name: 'Monitor OLED 27" 240Hz QHD', cat: 'monitor', art: 'monitor', price: 4199, old: 4899, rating: 4.9, tag: 'hot', specs: [['Tela', '27" OLED'], ['Resolução', '2560x1440'], ['Taxa', '240 Hz'], ['Resposta', '0,03 ms']] },
  { id: 14, name: 'Monitor Ultrawide 34" 165Hz Curvo', cat: 'monitor', art: 'monitor', price: 2599, rating: 4.6, specs: [['Tela', '34" VA'], ['Resolução', '3440x1440'], ['Taxa', '165 Hz'], ['Resposta', '1 ms']] },
  { id: 15, name: 'Headset Sonic 7.1 Wireless ANC', cat: 'audio', art: 'headset', price: 799, old: 999, rating: 4.7, specs: [['Som', '7.1 virtual'], ['Cancelamento', 'ANC ativo'], ['Bateria', '60h'], ['Microfone', 'Destacável']] },
  { id: 16, name: 'Headset Pulse Lite USB', cat: 'audio', art: 'headset', price: 249, rating: 4.3, specs: [['Som', 'Estéreo'], ['Cancelamento', 'Passivo'], ['Conexão', 'USB-C'], ['Microfone', 'Fixo']] }
];
const byId = id => P.find(p => p.id === id);

/* ---------- ART (SVG) ---------- */
let uid = 0;
function art(type) {
  const g = 'g' + (++uid);
  const defs = `<defs><linearGradient id="${g}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2f6bff"/><stop offset="1" stop-color="#22f0ff"/></linearGradient><linearGradient id="${g}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#12204d"/><stop offset="1" stop-color="#060b1d"/></linearGradient></defs>`;
  const F = `url(#${g})`, D = `url(#${g}d)`;
  const S = {
    gpu: `<rect x="8" y="30" width="184" height="68" rx="10" fill="${D}" stroke="${F}" stroke-width="2.5"/><circle cx="62" cy="64" r="24" fill="#050a1a" stroke="${F}" stroke-width="2.5"/><circle cx="138" cy="64" r="24" fill="#050a1a" stroke="${F}" stroke-width="2.5"/><g stroke="${F}" stroke-width="3" stroke-linecap="round"><path d="M62 46v36M44 64h36M49 51l26 26M75 51L49 77"/><path d="M138 46v36M120 64h36M125 51l26 26M151 51l-26 26"/></g><rect x="20" y="98" width="70" height="8" fill="#c9a24a"/><rect x="170" y="38" width="14" height="52" rx="3" fill="${F}" opacity=".35"/>`,
    cpu: `<rect x="40" y="20" width="120" height="90" rx="10" fill="${D}" stroke="${F}" stroke-width="2.5"/><rect x="70" y="40" width="60" height="50" rx="6" fill="${F}" opacity=".85"/><text x="100" y="72" font-family="monospace" font-weight="700" font-size="14" fill="#02040a" text-anchor="middle">CPU</text><g stroke="${F}" stroke-width="3">${[55,75,95,115,135].map(x => `<path d="M${x} 8v12M${x} 110v12"/>`).join('')}${[35,55,75,95].map(y => `<path d="M28 ${y}h12M160 ${y}h12"/>`).join('')}</g>`,
    ram: `<rect x="10" y="38" width="180" height="46" rx="6" fill="${D}" stroke="${F}" stroke-width="2.5"/>${[24,56,88,120].map(x => `<rect x="${x}" y="48" width="24" height="26" rx="3" fill="${F}" opacity=".75"/>`).join('')}<rect x="156" y="48" width="24" height="26" rx="3" fill="#0a1536" stroke="${F}"/><g fill="#c9a24a">${Array.from({length: 22}, (_, i) => `<rect x="${16 + i * 8}" y="84" width="4" height="10"/>`).join('')}</g>`,
    ssd: `<rect x="30" y="26" width="140" height="78" rx="10" fill="${D}" stroke="${F}" stroke-width="2.5"/><rect x="44" y="40" width="46" height="50" rx="4" fill="${F}" opacity=".8"/><rect x="100" y="40" width="56" height="22" rx="4" fill="#0a1536" stroke="${F}"/><rect x="100" y="68" width="56" height="22" rx="4" fill="#0a1536" stroke="${F}"/><text x="67" y="70" font-family="monospace" font-size="10" font-weight="700" fill="#02040a" text-anchor="middle">NVMe</text>`,
    keyboard: `<rect x="8" y="26" width="184" height="80" rx="12" fill="${D}" stroke="${F}" stroke-width="2.5"/>${[0,1,2,3].map(r => Array.from({length: r === 3 ? 1 : 11}, (_, c) => r === 3 ? `<rect x="50" y="${40 + r * 16}" width="100" height="11" rx="3" fill="${F}" opacity=".7"/>` : `<rect x="${18 + c * 15.5}" y="${40 + r * 16}" width="12" height="11" rx="3" fill="${F}" opacity="${.45 + (c + r) % 3 * .2}"/>`).join('')).join('')}`,
    mouse: `<path d="M100 10c32 0 48 22 48 54v18c0 26-18 40-48 40S52 108 52 82V64c0-32 16-54 48-54z" fill="${D}" stroke="${F}" stroke-width="2.5"/><path d="M100 10v44M52 58h96" stroke="${F}" stroke-width="2.5"/><rect x="94" y="26" width="12" height="20" rx="6" fill="${F}"/>`,
    headset: `<path d="M44 80V68c0-32 24-52 56-52s56 20 56 52v12" fill="none" stroke="${F}" stroke-width="7" stroke-linecap="round"/><rect x="28" y="66" width="30" height="46" rx="12" fill="${D}" stroke="${F}" stroke-width="2.5"/><rect x="142" y="66" width="30" height="46" rx="12" fill="${D}" stroke="${F}" stroke-width="2.5"/><path d="M42 112c0 14 14 14 34 14" fill="none" stroke="${F}" stroke-width="3" stroke-linecap="round"/><circle cx="43" cy="89" r="5" fill="${F}"/><circle cx="157" cy="89" r="5" fill="${F}"/>`,
    monitor: `<rect x="14" y="14" width="172" height="90" rx="9" fill="${D}" stroke="${F}" stroke-width="2.5"/><rect x="22" y="22" width="156" height="74" rx="4" fill="#050a1a"/><path d="M22 76l32-22 28 16 34-30 62 26v30H22z" fill="${F}" opacity=".5"/><circle cx="150" cy="40" r="9" fill="${F}"/><path d="M100 104v14M70 120h60" stroke="${F}" stroke-width="5" stroke-linecap="round"/>`
  };
  return `<svg viewBox="0 0 200 130" xmlns="http://www.w3.org/2000/svg">${defs}${S[type] || S.cpu}</svg>`;
}
// foto real do produto (por cima do SVG, que serve de reserva se a imagem falhar)
const photo = p => `<img class="ph" src="img/p${p.id}.jpg" alt="${p.name}" loading="lazy" decoding="async" onerror="this.style.display='none'">`;
$$('[data-art]').forEach(el => el.innerHTML = art(el.dataset.art));

/* ---------- TOAST ---------- */
function toast(msg) {
  const t = document.createElement('div'); t.className = 'toast'; t.textContent = msg;
  $('#toasts').append(t); setTimeout(() => t.remove(), 2900);
}

/* ---------- CATALOG ---------- */
const state = { cat: 'all', q: '', sort: 'rel' };
let cmp = store.get('vx-cmp', []).filter(id => byId(id));
function renderChips() {
  $('#chips').innerHTML = Object.entries(CATS).map(([k, v]) => `<button class="chip-btn ${state.cat === k ? 'active' : ''}" data-k="${k}">${v}</button>`).join('');
}
function renderGrid() {
  const q = state.q.trim().toLowerCase();
  let list = P.filter(p => (state.cat === 'all' || p.cat === state.cat) && (!q || (p.name + ' ' + CATS[p.cat] + ' ' + p.specs.flat().join(' ')).toLowerCase().includes(q)));
  if (state.sort === 'asc') list.sort((a, b) => a.price - b.price);
  if (state.sort === 'desc') list.sort((a, b) => b.price - a.price);
  if (state.sort === 'rating') list.sort((a, b) => b.rating - a.rating);
  $('#grid').innerHTML = list.map((p, i) => `
    <article class="card tilt" style="animation-delay:${i * 45}ms" data-id="${p.id}">
      <div class="card-art">${p.tag ? `<span class="pill ${p.tag}">${{ hot: '🔥 EM ALTA', new: 'NOVO' }[p.tag]}</span>` : (p.old ? `<span class="pill">-${Math.round((1 - p.price / p.old) * 100)}%</span>` : '')}
        <button class="cmp-toggle ${cmp.includes(p.id) ? 'on' : ''}" data-cmp="${p.id}" title="Comparar">⇄</button>${art(p.art)}${photo(p)}</div>
      <div><span class="cat mono">${CATS[p.cat]}</span><h3>${p.name}</h3></div>
      <div class="specs">${p.specs.slice(0, 3).map(s => `<span>${s[1]}</span>`).join('')}</div>
      <div class="rating"><b>★</b> ${p.rating.toFixed(1)}</div>
      <div class="price"><strong>${brl(p.price)}</strong>${p.old ? `<s>${brl(p.old)}</s>` : ''}<small>ou 12x de ${brl(p.price / 12)} · PIX ${brl(p.price * .92)}</small></div>
      <button class="add" data-add="${p.id}">Adicionar ao carrinho</button>
    </article>`).join('');
  $('#empty').hidden = list.length > 0;
  bindTilt($$('#grid .card'));
}
$('#chips').addEventListener('click', e => { const b = e.target.closest('[data-k]'); if (!b) return; state.cat = b.dataset.k; renderChips(); renderGrid(); });
$('#search').addEventListener('input', e => { state.q = e.target.value; renderGrid(); });
$('#sort').addEventListener('change', e => { state.sort = e.target.value; renderGrid(); });
addEventListener('keydown', e => { if (e.key === '/' && !/INPUT|TEXTAREA/.test(document.activeElement.tagName)) { e.preventDefault(); $('#search').focus(); $('#produtos').scrollIntoView(); } });
$$('.bento-item').forEach(b => b.addEventListener('click', () => {
  state.cat = b.dataset.cat === 'periferico' ? 'periferico' : b.dataset.cat; renderChips(); renderGrid(); $('#produtos').scrollIntoView();
}));

/* ---------- CART ---------- */
let cart = store.get('vx-cart', []).filter(i => byId(i.id));
let coupon = store.get('vx-coupon', null);
const saveCart = () => { store.set('vx-cart', cart); store.set('vx-coupon', coupon); };
function addToCart(id, n = 1, silent) {
  const it = cart.find(i => i.id === id);
  it ? it.n += n : cart.push({ id, n });
  saveCart(); renderCart();
  if (!silent) toast('✓ ' + byId(id).name + ' adicionado');
  const b = $('#cartCount'); b.classList.remove('bump'); void b.offsetWidth; b.classList.add('bump');
}
function renderCart() {
  const sub = cart.reduce((s, i) => s + byId(i.id).price * i.n, 0);
  const disc = coupon ? Math.round(sub * .1) : 0;
  $('#cartCount').textContent = cart.reduce((s, i) => s + i.n, 0);
  $('#cartItems').innerHTML = cart.length ? cart.map(i => { const p = byId(i.id); return `
    <div class="ci"><div class="th">${art(p.art)}${photo(p)}</div><div><h5>${p.name}</h5><small>${brl(p.price)}</small>
    <div class="qty"><button data-q="-1" data-id="${p.id}">−</button><span class="mono">${i.n}</span><button data-q="1" data-id="${p.id}">+</button></div></div>
    <button class="rm" data-rm="${p.id}">remover</button></div>`; }).join('')
    : '<div class="cart-empty"><div style="font-size:3rem">🛒</div><p>Seu carrinho está vazio.</p></div>';
  $('#subtotal').textContent = brl(sub);
  $('#discRow').hidden = !disc; $('#discount').textContent = '-' + brl(disc);
  $('#total').textContent = brl(sub - disc);
  const left = 499 - (sub - disc);
  $('#freeShip').textContent = !cart.length ? '' : left > 0 ? `// FALTAM ${brl(left)} PARA FRETE GRÁTIS` : '// FRETE GRÁTIS DESBLOQUEADO ✓';
  $('#checkout').disabled = !cart.length;
}
$('#cartItems').addEventListener('click', e => {
  const q = e.target.closest('[data-q]'), r = e.target.closest('[data-rm]');
  if (q) { const it = cart.find(i => i.id == q.dataset.id); it.n += +q.dataset.q; if (it.n < 1) cart = cart.filter(i => i !== it); }
  if (r) cart = cart.filter(i => i.id != r.dataset.rm);
  saveCart(); renderCart();
});
$('#applyCoupon').addEventListener('click', () => {
  const v = $('#coupon').value.trim().toUpperCase();
  if (v === 'INFO10') { coupon = v; toast('Cupom INFO10 aplicado: 10% off'); } else toast('Cupom inválido');
  saveCart(); renderCart();
});
$('#checkout').addEventListener('click', () => {
  const total = $('#total').textContent;
  $('#doneTxt').textContent = `Total ${total}. Pedido #IT${Math.floor(Math.random() * 90000 + 10000)} — enviamos os detalhes por e-mail (simulação).`;
  cart = []; coupon = null; saveCart(); renderCart(); closeAll(); open($('#doneModal'));
});
$('#grid').addEventListener('click', e => {
  const a = e.target.closest('[data-add]');
  if (a) { addToCart(+a.dataset.add); a.classList.add('ok'); a.textContent = '✓ Adicionado'; setTimeout(() => { a.classList.remove('ok'); a.textContent = 'Adicionar ao carrinho'; }, 1200); return; }
  const c = e.target.closest('[data-cmp]');
  if (c) toggleCmp(+c.dataset.cmp);
});

/* ---------- COMPARE ---------- */
function toggleCmp(id) {
  if (cmp.includes(id)) cmp = cmp.filter(x => x !== id);
  else if (cmp.length >= 3) return toast('Máximo de 3 produtos para comparar');
  else cmp.push(id);
  store.set('vx-cmp', cmp); updateCmp();
  $$('[data-cmp]').forEach(b => b.classList.toggle('on', cmp.includes(+b.dataset.cmp)));
}
function updateCmp() {
  $('#cmpCount').textContent = cmp.length;
  $('#tray').classList.toggle('on', cmp.length > 0);
  $('#trayTxt').textContent = `// ${cmp.length}/3 SELECIONADOS`;
}
function showCmp() {
  if (cmp.length < 2) return toast('Selecione ao menos 2 produtos (⇄)');
  const ps = cmp.map(byId);
  const labels = [...new Set(ps.flatMap(p => p.specs.map(s => s[0])))];
  const minPrice = Math.min(...ps.map(p => p.price));
  $('#cmpBody').innerHTML = `<table><thead><tr><th></th>${ps.map(p => `<th><div class="th">${art(p.art)}${photo(p)}</div>${p.name}</th>`).join('')}</tr></thead><tbody>
    <tr><td>PREÇO</td>${ps.map(p => `<td class="${p.price === minPrice ? 'best' : ''}">${brl(p.price)}</td>`).join('')}</tr>
    <tr><td>AVALIAÇÃO</td>${ps.map(p => `<td>★ ${p.rating.toFixed(1)}</td>`).join('')}</tr>
    ${labels.map(l => `<tr><td>${l.toUpperCase()}</td>${ps.map(p => `<td>${(p.specs.find(s => s[0] === l) || [])[1] || '—'}</td>`).join('')}</tr>`).join('')}
    <tr><td></td>${ps.map(p => `<td><button class="btn primary" data-addcmp="${p.id}" style="padding:10px 16px;font-size:.8rem">Adicionar</button></td>`).join('')}</tr></tbody></table>`;
  open($('#cmpModal'));
}
$('#cmpBody').addEventListener('click', e => { const b = e.target.closest('[data-addcmp]'); if (b) addToCart(+b.dataset.addcmp); });
$('#openCompare').addEventListener('click', showCmp);
$('#trayGo').addEventListener('click', showCmp);
$('#trayClear').addEventListener('click', () => { cmp = []; store.set('vx-cmp', cmp); updateCmp(); $$('[data-cmp]').forEach(b => b.classList.remove('on')); });

/* ---------- OVERLAYS ---------- */
function open(el) { el.classList.add('on'); if (el.classList.contains('drawer')) $('#overlay').classList.add('on'); }
function closeAll() { $$('.drawer.on,.modal.on,.overlay.on').forEach(e => e.classList.remove('on')); }
$('#openCart').addEventListener('click', () => open($('#cartDrawer')));
$('#overlay').addEventListener('click', closeAll);
$$('[data-close]').forEach(b => b.addEventListener('click', closeAll));
$$('.modal').forEach(m => m.addEventListener('click', e => { if (e.target === m) closeAll(); }));
addEventListener('keydown', e => e.key === 'Escape' && closeAll());

/* ---------- BUILDER ---------- */
const STEPS = [
  { k: 'cpu', label: '01 · PROCESSADOR', ids: [6, 5, 4] },
  { k: 'gpu', label: '02 · PLACA DE VÍDEO', ids: [3, 2, 1] },
  { k: 'ram', label: '03 · MEMÓRIA', ids: [8, 7] },
  { k: 'ssd', label: '04 · ARMAZENAMENTO', ids: [10, 9] }
];
const pick = { cpu: 5, gpu: 2, ram: 8, ssd: 10 };
const BASE_W = 80, BASE_PRICE = 1290; // placa-mãe + gabinete + fonte (kit base)
function renderBuilder() {
  $('#bSteps').innerHTML = STEPS.map(s => `<div class="step"><h4>${s.label}<span>${byId(pick[s.k]) ? '✓' : ''}</span></h4><div class="opts">${s.ids.map(id => { const p = byId(id); return `<button class="opt ${pick[s.k] === id ? 'sel' : ''}" data-k="${s.k}" data-id="${id}"><b>${p.name}</b><small>${brl(p.price)} · ${p.w}W</small></button>`; }).join('')}</div></div>`).join('')
    + `<p class="mono" style="font-size:.7rem;color:var(--muted)">// Kit base incluso (placa-mãe, gabinete e fonte): ${brl(BASE_PRICE)}</p>`;
  updateBuilder(true);
}
function updateBuilder() {
  const parts = STEPS.map(s => byId(pick[s.k]));
  const perf = parts.reduce((s, p) => s + p.pf, 0);
  const watt = BASE_W + parts.reduce((s, p) => s + p.w, 0);
  const total = BASE_PRICE + parts.reduce((s, p) => s + p.price, 0);
  $('#rig').innerHTML = STEPS.map((s, i) => `<div class="slot filled" data-s="${s.k}">${art(parts[i].art)}<span>${s.k.toUpperCase()}</span></div>`).join('');
  animateNum($('#mPerf'), perf, '');
  $('#barPerf').style.width = Math.min(perf, 100) + '%';
  $('#mWatt').textContent = watt + 'W'; $('#barWatt').style.width = Math.min(watt / 600 * 100, 100) + '%';
  $('#mPsu').textContent = (Math.ceil(watt * 1.4 / 50) * 50) + 'W';
  $('#bTotal').textContent = brl(total); $('#bInst').textContent = `12x de ${brl(total / 12)} · PIX ${brl(total * .92)}`;
}
$('#bSteps').addEventListener('click', e => {
  const o = e.target.closest('.opt'); if (!o) return;
  pick[o.dataset.k] = +o.dataset.id;
  $$(`.opt[data-k="${o.dataset.k}"]`).forEach(x => x.classList.toggle('sel', x === o));
  updateBuilder();
});
$('#bAdd').addEventListener('click', () => {
  STEPS.forEach(s => addToCart(pick[s.k], 1, true));
  toast('✓ Setup adicionado (kit base é enviado na finalização)'); open($('#cartDrawer'));
});
function animateNum(el, to, suf) {
  const from = +el.textContent || 0, t0 = performance.now();
  (function f(t) { const k = Math.min((t - t0) / 600, 1); el.textContent = Math.round(from + (to - from) * k) + suf; if (k < 1) requestAnimationFrame(f); })(t0);
}

/* ---------- DEAL ---------- */
const DEAL_KEY = 'vx-deal-end';
let end = store.get(DEAL_KEY, 0);
if (end < Date.now()) { end = Date.now() + (5 * 3600 + 42 * 60) * 1000; store.set(DEAL_KEY, end); }
function tick() {
  let s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  const v = [Math.floor(s / 3600), Math.floor(s % 3600 / 60), s % 60].map(n => String(n).padStart(2, '0'));
  $$('#countdown b').forEach((b, i) => b.textContent = v[i]);
}
tick(); setInterval(tick, 1000);
let stock = 9; $('#stockBar').style.width = '18%'; $('#stockTxt').textContent = `// RESTAM APENAS ${stock} UNIDADES`;
$('#dealBuy').addEventListener('click', () => {
  addToCart(1);
  if (stock > 1) { stock--; $('#stockTxt').textContent = `// RESTAM APENAS ${stock} UNIDADES`; $('#stockBar').style.width = (stock * 2) + '%'; }
});

/* ---------- NEWSLETTER ---------- */
$('#newsForm').addEventListener('submit', e => { e.preventDefault(); e.target.reset(); toast('Você está na lista! Use o cupom INFO10'); });

/* ---------- EFFECTS ---------- */
// Tilt + spotlight
function bindTilt(els) {
  els.forEach(el => {
    if (el._tilt) return; el._tilt = 1;
    el.addEventListener('pointermove', e => {
      const r = el.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      el.style.setProperty('--mx', x * 100 + '%'); el.style.setProperty('--my', y * 100 + '%');
      el.style.transform = `perspective(900px) rotateX(${(.5 - y) * 5}deg) rotateY(${(x - .5) * 6}deg) translateZ(0)`;
    });
    el.addEventListener('pointerleave', () => el.style.transform = '');
  });
}
bindTilt($$('.tilt'));

// Hero chip follows mouse
const hv = $('#heroVisual'), chip = $('#chip');
hv.addEventListener('pointermove', e => {
  const r = hv.getBoundingClientRect(), x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
  chip.style.transform = `rotateX(${-y * 16 + 10}deg) rotateY(${x * 20 - 10}deg)`;
});
hv.addEventListener("pointerleave", () => chip.style.transform = "rotateX(10deg) rotateY(-10deg)");
chip.style.transform = "rotateX(10deg) rotateY(-10deg)";
setInterval(() => {
  $('#temp').textContent = (36 + Math.floor(Math.random() * 8)) + '°C';
  $('#clock').textContent = (5.6 + Math.random() * .4).toFixed(1) + ' GHz';
  $('#fps').textContent = 232 + Math.floor(Math.random() * 18);
}, 1400);

// Magnetic buttons
$$('.magnetic').forEach(b => {
  b.addEventListener('pointermove', e => { const r = b.getBoundingClientRect(); b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`; });
  b.addEventListener('pointerleave', () => b.style.transform = '');
});

// Reveal + counters
const io = new IntersectionObserver(es => es.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); } }), { threshold: .12 });
$$('.reveal').forEach(el => io.observe(el));
const cio = new IntersectionObserver(es => es.forEach(en => {
  if (!en.isIntersecting) return; cio.unobserve(en.target);
  const el = en.target, to = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suffix || '', t0 = performance.now();
  (function f(t) { const k = Math.min((t - t0) / 1800, 1), e = 1 - Math.pow(1 - k, 3); el.textContent = (to * e).toLocaleString('pt-BR', { minimumFractionDigits: dec, maximumFractionDigits: dec }) + (k === 1 ? suf : ''); if (k < 1) requestAnimationFrame(f); })(t0);
}), { threshold: .5 });
$$('[data-count]').forEach(el => cio.observe(el));

// Nav + progress
addEventListener('scroll', () => {
  $('#nav').classList.toggle('scrolled', scrollY > 30);
  const h = document.documentElement.scrollHeight - innerHeight;
  $('#progress').style.width = (scrollY / h * 100) + '%';
}, { passive: true });

// Interactive particle network background
(() => {
  const c = $('#bg'), x = c.getContext('2d'); let w, h, pts = [], m = { x: -999, y: -999 };
  const resize = () => { w = c.width = innerWidth; h = c.height = innerHeight; pts = Array.from({ length: Math.min(90, Math.floor(w * h / 18000)) }, () => ({ x: Math.random() * w, y: Math.random() * h, vx: (Math.random() - .5) * .3, vy: (Math.random() - .5) * .3 })); };
  resize(); addEventListener('resize', resize);
  addEventListener('pointermove', e => { m.x = e.clientX; m.y = e.clientY; });
  (function draw() {
    x.clearRect(0, 0, w, h);
    pts.forEach((p, i) => {
      p.x += p.vx; p.y += p.vy; if (p.x < 0 || p.x > w) p.vx *= -1; if (p.y < 0 || p.y > h) p.vy *= -1;
      const dm = Math.hypot(p.x - m.x, p.y - m.y);
      if (dm < 160) { p.x += (p.x - m.x) * .004; p.y += (p.y - m.y) * .004; x.strokeStyle = `rgba(34,240,255,${.5 - dm / 320})`; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(m.x, m.y); x.stroke(); }
      x.fillStyle = 'rgba(80,140,255,.7)'; x.fillRect(p.x, p.y, 2, 2);
      for (let j = i + 1; j < pts.length; j++) { const q = pts[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 120) { x.strokeStyle = `rgba(47,107,255,${.18 * (1 - d / 120)})`; x.beginPath(); x.moveTo(p.x, p.y); x.lineTo(q.x, q.y); x.stroke(); } }
    });
    requestAnimationFrame(draw);
  })();
})();

/* ---------- INIT ---------- */
renderChips(); renderGrid(); renderCart(); renderBuilder(); updateCmp();
})();
