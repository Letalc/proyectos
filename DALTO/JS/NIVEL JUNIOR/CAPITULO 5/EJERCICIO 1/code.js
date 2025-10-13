const materias = {
  fisica:        [90,  6, 3, "fisica"],
  matematica:    [84,  8, 2, "matematica"],
  logica:        [92,  8, 4, "logica"],
  quimica:       [96,  8, 4, "quimica"],
  calculo:       [91,  6, 3, "calculo"],
  programacion:  [79,  7, 4, "programacion"],
  biologia:      [75,  9, 2, "biologia"],
  bbdd:          [98,  9, 1, "bbdd"],
  algebra:       [100,10, 4, "algebra"]
};

const REGLAS = {
  asistenciaMin: 90,
  promedioMin: 7,
  trabajosMin: 3
};

const grid = document.getElementById('grid');
const filtro = document.getElementById('filtro');

function evalMateria(entry) {
  const [clave, arr] = entry;
  const [asist, prom, trab, nombre] = arr;

  const okAsist = asist >= REGLAS.asistenciaMin;
  const okProm  = prom  >= REGLAS.promedioMin;
  const okTrab  = trab  >= REGLAS.trabajosMin;

  const aprueba = okAsist && okProm && okTrab;

  return {
    clave,
    nombre,
    asist,
    prom,
    trab,
    okAsist,
    okProm,
    okTrab,
    aprueba
  };
}

function chip(ok){ return ok ? 'ok' : 'bad'; }
function formatPct(n){ return `${n}%`; }

function render() {
  const modo = filtro.value;
  grid.innerHTML = '';

  const evaluadas = Object.entries(materias)
    .map(evalMateria)
    .sort((a,b) => a.nombre.localeCompare(b.nombre));

  const filtradas = evaluadas.filter(m => {
    if (modo === 'aprobadas') return m.aprueba;
    if (modo === 'desaprobadas') return !m.aprueba;
    return true;
  });

  if (filtradas.length === 0) {
    grid.innerHTML = `<div class="card"><p class="muted">No hay materias para este filtro.</p></div>`;
    return;
  }

  filtradas.forEach(m => {
    const card = document.createElement('article');
    card.className = 'materia';
    card.innerHTML = `
      <div class="header">
        <div class="nombre">${m.nombre}</div>
        <span class="badge ${m.aprueba ? 'ok' : 'bad'}">${m.aprueba ? 'Aprobada' : 'Desaprobada'}</span>
      </div>

      <div class="stats">
        <div class="stat"><span class="label">Asistencias</span><span class="value">${formatPct(m.asist)}</span></div>
        <div class="stat"><span class="label">Promedio</span><span class="value">${m.prom}</span></div>
        <div class="stat"><span class="label">Trabajos</span><span class="value">${m.trab}</span></div>
      </div>

      <div class="checks">
        <div class="check ${chip(m.okAsist)}">Asistencias ${m.okAsist ? 'en orden' : `insuficientes (< ${REGLAS.asistenciaMin}%)`}</div>
        <div class="check ${chip(m.okProm)}">Promedio ${m.okProm ? 'en orden' : `desaprobado (< ${REGLAS.promedioMin})`}</div>
        <div class="check ${chip(m.okTrab)}">Trabajos ${m.okTrab ? 'en orden' : `faltan (< ${REGLAS.trabajosMin})`}</div>
      </div>

      <div class="legend">
        <span>✔︎ Requiere asistencia ≥ ${REGLAS.asistenciaMin}%</span>
        <span>✔︎ Promedio ≥ ${REGLAS.promedioMin}</span>
        <span>✔︎ Trabajos ≥ ${REGLAS.trabajosMin}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

filtro.addEventListener('change', render);

render();
