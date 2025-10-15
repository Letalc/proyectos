// Util: obtiene dimensiones reales de viewport, DPR y orientación
function getScreenInfo() {
  const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  const dpr = (window.devicePixelRatio || 1);
  const ori = (screen.orientation && screen.orientation.type) ||
              (w >= h ? 'landscape' : 'portrait');
  return { w, h, dpr, ori };
}

const vpEl = document.getElementById('vp');
const dprEl = document.getElementById('dpr');
const oriEl = document.getElementById('ori');
const resEl = document.getElementById('resultado');
const btnComprar = document.getElementById('comprar');
const btnCancelar = document.getElementById('cancelar');

// Render inicial y on-resize (con throttle rAF)
let ticking = false;
function renderInfo() {
  const { w, h, dpr, ori } = getScreenInfo();
  vpEl.textContent = `${w} × ${h} px`;
  dprEl.textContent = `${dpr}`;
  oriEl.textContent = `${ori}`;
}
function onResize() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    renderInfo();
    ticking = false;
  });
}

// Acciones de usuario
btnComprar.addEventListener('click', () => {
  resEl.textContent = '✅ Compra realizada exitosamente';
  resEl.classList.remove('err');
  resEl.classList.add('ok');
});
btnCancelar.addEventListener('click', () => {
  resEl.textContent = '❌ Compra cancelada';
  resEl.classList.remove('ok');
  resEl.classList.add('err');
});

// Listeners
window.addEventListener('resize', onResize);
if (screen.orientation && screen.orientation.addEventListener) {
  screen.orientation.addEventListener('change', onResize);
}

// Init
renderInfo();
