const $ = (id) => document.getElementById(id);
const proto = $('proto'), host = $('host'), port = $('port'), path = $('path');
const hash = $('hash'), search = $('search'), full = $('full-url');
const tbl = $('params'), tbody = tbl.querySelector('tbody'), emptyMsg = $('params-vacios');
const inputUrl = $('input-url'), btnAnalizar = $('btn-analizar'), btnActual = $('btn-actual');
const btnCopyFull = $('copy-full'), btnCopyPath = $('copy-path'), btnRefresh = $('refresh');
const errorBox = $('error');

let ultimaURL = new URL(window.location.href); // estado mostrado

function normalizaEntrada(valor){
  let s = (valor || '').trim();
  if (!s) throw new Error('Pegá una URL primero.');
  // Si no tiene esquema, asumir https
  if (!/^[a-zA-Z][a-zA-Z0-9+.-]*:/.test(s)) s = 'https://' + s;
  return s;
}

function parseURL(str){
  return new URL(str);
}

function getInfo(url) {
  return {
    protocol: url.protocol,
    hostname: url.hostname,
    port: url.port || '(por defecto)',
    pathname: url.pathname || '/',
    hash: url.hash || '(sin hash)',
    search: url.search || '(sin query)',
    href: url.href,
    params: [...url.searchParams.entries()]
  };
}

function escapeHtml(s='') {
  return String(s)
    .replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
}

function render(url = ultimaURL) {
  ultimaURL = url; // persistimos
  const info = getInfo(url);

  proto.textContent  = info.protocol;
  host.textContent   = info.hostname;
  port.textContent   = info.port;
  path.textContent   = info.pathname;
  hash.textContent   = info.hash;
  search.textContent = info.search;
  full.textContent   = `URL Completa: ${info.href}`;

  // tabla de params
  tbody.innerHTML = '';
  if (info.params.length === 0) {
    tbl.hidden = true;
    emptyMsg.hidden = false;
  } else {
    info.params.forEach(([k, v]) => {
      const tr = document.createElement('tr');
      tr.innerHTML = `
        <td><code>${escapeHtml(k)}</code></td>
        <td><code>${escapeHtml(v)}</code></td>
        <td><button class="copy-mini" data-copy="${encodeURIComponent(v)}">Copiar</button></td>
      `;
      tbody.appendChild(tr);
    });
    tbl.hidden = false;
    emptyMsg.hidden = true;
  }
}

function mostrarError(msg){
  errorBox.textContent = '❌ ' + msg;
  errorBox.hidden = false;
}
function limpiarError(){
  errorBox.hidden = true;
  errorBox.textContent = '';
}

// Copiar helpers
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    full.textContent = 'Copiado ✅ ' + new Date().toLocaleTimeString();
    setTimeout(() => render(ultimaURL), 800);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); full.textContent = 'Copiado ✅'; }
    finally { document.body.removeChild(ta); setTimeout(() => render(ultimaURL), 800); }
  }
}

// Listeners barra de entrada
btnAnalizar.addEventListener('click', () => {
  try{
    limpiarError();
    const normal = normalizaEntrada(inputUrl.value);
    const url = parseURL(normal);
    render(url);
  } catch (e){
    mostrarError(e.message || 'URL inválida.');
  }
});

btnActual.addEventListener('click', () => {
  limpiarError();
  inputUrl.value = window.location.href;
  render(new URL(window.location.href));
});

// Accesibilidad: Enter en input
inputUrl.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    btnAnalizar.click();
  }
});

// Botones copiar/refresh
btnCopyFull.addEventListener('click', () => copyText(ultimaURL.href));
btnCopyPath.addEventListener('click', () => copyText(ultimaURL.pathname));
btnRefresh.addEventListener('click', () => render(ultimaURL));

// Copiar valor de fila en params
tbody.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-mini');
  if (!btn) return;
  const val = decodeURIComponent(btn.dataset.copy || '');
  copyText(val);
});

// También escuchar cambios de la URL actual (por si navegan)
window.addEventListener('hashchange', () => render(new URL(window.location.href)));
window.addEventListener('popstate', () => render(new URL(window.location.href)));

// Inicial: mostrar URL actual del navegador
render(new URL(window.location.href));
