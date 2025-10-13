const materias = {
  fisica: ["Perez","pedro","pepito","cofla","maria"],
  programacion: ["Dalto","pedro","juan","pepito"],
  logica: ["Hernandez","pedro","juan","pepito","cofla","maria"],
  quimica: ["Rodriguez","pedro","juan","pepito","cofla","maria"]
};

const obtenerInformacion = (materia) => {
  if (materia && materias[materia]) {
    return [materias[materia], materia, materias];
  }
  return materias;
};

const cantidadDeClases = (alumno) => {
  const info = obtenerInformacion();
  const clasesPresentes = [];
  let cantidadTotal = 0;

  for (const clave in info) {
    const lista = info[clave];
    const alumnos = lista.slice(1);
    if (alumnos.map(a => a.toLowerCase()).includes(alumno.toLowerCase())) {
      cantidadTotal++;
      clasesPresentes.push(clave);
    }
  }
  return { alumno, cantidadTotal, clasesPresentes };
};

const gridMaterias = document.getElementById('materias');

const entriesOrdenadas = Object.entries(materias).sort((a,b)=> a[0].localeCompare(b[0]));

function renderMaterias(resaltarAlumno = "") {
  gridMaterias.innerHTML = "";

  entriesOrdenadas.forEach(([nombreMateria, lista]) => {
    const profesor = lista[0];
    const alumnos = lista.slice(1);

    const card = document.createElement('article');
    card.className = 'materia';

    const alumnosHTML = alumnos.map(al => {
      const resaltado = resaltarAlumno && al.toLowerCase() === resaltarAlumno.toLowerCase();
      return `<span class="tag ${resaltado ? 'resaltado' : ''}">${al}</span>`;
    }).join('');

    card.innerHTML = `
      <div class="header">
        <div class="nombre">${nombreMateria}</div>
        <span class="badge">Materia</span>
      </div>
      <div class="prof">Profesor: <strong>${profesor}</strong></div>
      <div class="alumnos">${alumnosHTML || '<span class="muted">Sin alumnos</span>'}</div>
    `;

    gridMaterias.appendChild(card);
  });
}

const input = document.getElementById('input-alumno');
const btnBuscar = document.getElementById('btn-buscar');
const btnLimpiar = document.getElementById('btn-limpiar');
const resultado = document.getElementById('resultado-alumno');

function buscar() {
  const nombre = (input.value || "").trim();
  if (!nombre) {
    resultado.textContent = "Ingresa un nombre de alumno (ej: 'cofla').";
    renderMaterias();
    return;
  }

  const { cantidadTotal, clasesPresentes } = cantidadDeClases(nombre);

  if (cantidadTotal === 0) {
    resultado.innerHTML = `🔎 No se encontró a <strong>${nombre}</strong> en ninguna clase.`;
    renderMaterias();
    return;
  }

  const lista = clasesPresentes.join(", ");
  resultado.innerHTML = `<strong>${nombre}</strong> está en <strong>${cantidadTotal}</strong> clase(s): <span class="badge">${lista}</span>`;
  renderMaterias(nombre);
}

function limpiar() {
  input.value = "";
  resultado.textContent = "Escribe un nombre y presiona “Buscar”.";
  renderMaterias();
  input.focus();
}

btnBuscar.addEventListener('click', buscar);
btnLimpiar.addEventListener('click', limpiar);
input.addEventListener('keydown', (e) => { if (e.key === 'Enter') buscar(); });

renderMaterias();
