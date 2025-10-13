const tareasBase = [
  { clave: 'trabajo',  etiqueta: 'Trabajo',                minutos: 240 },
  { clave: 'descanso', etiqueta: 'Descanso',               minutos: 10  },
  { clave: 'estudio',  etiqueta: 'Estudio',                minutos: 100 },
  { clave: 'tp',       etiqueta: 'Trabajos prácticos',     minutos: 100 },
  { clave: 'casa',     etiqueta: 'Cosas de la casa',       minutos: 30  },
];

const DIAS_TOTAL = 14;
const dias = Array.from({ length: DIAS_TOTAL }, (_, i) => ({
  dia: i + 1,
  tareas: JSON.parse(JSON.stringify(tareasBase))
}));

const semanas = [
  { nombre: 'Semana 1', dias: dias.slice(0, 7) },
  { nombre: 'Semana 2', dias: dias.slice(7, 14) }
];

const toHours = (min) => (min / 60);
const fmt = (valor, unidad) => {
  if (unidad === 'h') {
    const n = toHours(valor);
    return Number.isInteger(n) ? `${n} h` : `${n.toFixed(2).replace(/\.?0+$/,'')} h`;
  }
  return `${valor} min`;
};

const totalDia = (d) => d.tareas.reduce((acc, t) => acc + t.minutos, 0);
const totalSemana = (sem) => sem.dias.reduce((acc, d) => acc + totalDia(d), 0);

const contenedorSemanas = document.getElementById('semanas');
const unidadSelect = document.getElementById('unidad');
const btnExpandir = document.getElementById('expandir');
const btnColapsar = document.getElementById('colapsar');

function render() {
  const unidad = unidadSelect.value; // 'min' | 'h'
  contenedorSemanas.innerHTML = '';

  semanas.forEach((semana, idx) => {
    const wrapper = document.createElement('section');
    wrapper.className = 'week';
    wrapper.dataset.index = idx;

    const totalSem = totalSemana(semana);

    wrapper.innerHTML = `
      <div class="week-header" role="button" tabindex="0" aria-expanded="true">
        <div class="week-title">${semana.nombre}</div>
        <div class="badges">
          <span class="badge ok">Total: ${fmt(totalSem, unidad)}</span>
          <span class="badge warn">Promedio/día: ${fmt(Math.round(totalSem / semana.dias.length), unidad)}</span>
          <span class="chev">⯆</span>
        </div>
      </div>
      <div class="days"></div>
    `;

    const daysBox = wrapper.querySelector('.days');

    semana.dias.forEach(d => {
      const card = document.createElement('article');
      card.className = 'day';

      const tot = totalDia(d);

      card.innerHTML = `
        <h3>Día ${d.dia}</h3>
        <div class="list">
          ${d.tareas.map(t => `
            <div class="item">
              <span class="label">${t.etiqueta}</span>
              <span class="value">${fmt(t.minutos, unidad)}</span>
            </div>
          `).join('')}
        </div>
        <div class="total">
          <span>Total</span>
          <span>${fmt(tot, unidad)}</span>
        </div>
      `;

      daysBox.appendChild(card);
    });

    const header = wrapper.querySelector('.week-header');
    header.addEventListener('click', () => toggleWeek(wrapper));
    header.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleWeek(wrapper); }
    });

    contenedorSemanas.appendChild(wrapper);
  });
}

function toggleWeek(wrapper) {
  const isCollapsed = wrapper.classList.toggle('collapsed');
  const header = wrapper.querySelector('.week-header');
  header.setAttribute('aria-expanded', String(!isCollapsed));
  const chev = wrapper.querySelector('.chev');
  chev.textContent = isCollapsed ? '⯈' : '⯆';
}

btnExpandir.addEventListener('click', () => {
  document.querySelectorAll('.week').forEach(w => {
    w.classList.remove('collapsed');
    w.querySelector('.week-header').setAttribute('aria-expanded', 'true');
    w.querySelector('.chev').textContent = '⯆';
  });
});

btnColapsar.addEventListener('click', () => {
  document.querySelectorAll('.week').forEach(w => {
    w.classList.add('collapsed');
    w.querySelector('.week-header').setAttribute('aria-expanded', 'false');
    w.querySelector('.chev').textContent = '⯈';
  });
});

unidadSelect.addEventListener('change', render);

render();
