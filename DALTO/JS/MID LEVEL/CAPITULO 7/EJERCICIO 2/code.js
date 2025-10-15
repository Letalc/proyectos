const el = (id) => document.getElementById(id);
const proto = el('proto'), host = el('host'), port = el('port'), path = el('path');
const hash = el('hash'), search = el('search'), full = el('full-url');
const tbl = el('params'), tbody = tbl.querySelector('tbody'), emptyMsg = el('params-vacios');

function getInfo() {
  // La API URL es más robusta que concatenar window.location.*
  const url = new URL(window.location.href);
  return {
    protocol: url.protocol,          // ej. "https:"
    hostname: url.hostname,          // ej. "example.com"
    port: url.port || '(por defecto)',
    pathname: url.pathname || '/',
    hash: url.hash || '(sin hash)',
    search: url.search || '(sin query)',
    href: url.href,
    params: [...url.searchParams.entries()] // array de [k,v]
  };
}

function render() {
  const info = getInfo();
  proto.textContent = info.protocol;
  host.textContent  = info.hostname;
  port.textContent  = info.port;
  path.textContent  = info.pathname;
  hash.textContent  = info.hash;
  search.textContent = info.search;
  full.textContent  = `URL Completa: ${info.href}`;

  // Parámetros
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

function escapeHtml(s='') {
  return String(s)
    .replaceAll('&','&amp;').replaceAll('<','&lt;')
    .replaceAll('>','&gt;').replaceAll('"','&quot;').replaceAll("'","&#39;");
}

// Copiar helpers
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    toast('Copiado ✅');
  } catch {
    // Fallback
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); toast('Copiado ✅'); }
    finally { document.body.removeChild(ta); }
  }
}
function toast(msg){
  full.textContent = msg + ' · ' + new Date().toLocaleTimeString();
  setTimeout(render, 800);
}

// Botones
el('copy-full').addEventListener('click', () => copyText(window.location.href));
el('copy-path').addEventListener('click', () => copyText(window.location.pathname));
el('refresh').addEventListener('click', render);

// Copiar valor de fila params
tbody.addEventListener('click', (e) => {
  const btn = e.target.closest('.copy-mini');
  if (!btn) return;
  const val = decodeURIComponent(btn.dataset.copy || '');
  copyText(val);
});

// Actualizar cuando cambian hash o historial
window.addEventListener('hashchange', render);
window.addEventListener('popstate', render);

// Inicial
render();
