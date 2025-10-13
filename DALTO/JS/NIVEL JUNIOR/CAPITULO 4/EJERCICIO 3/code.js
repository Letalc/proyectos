const state = {
  fisica: ["Perez","pedro","pepito","cofla","maria"],
  programacion: ["Dalto","pedro","juan","pepito"],
  logica: ["Hernandez","pedro","juan","pepito","cofla","maria"],
  quimica: ["Rodriguez","pedro","juan","pepito","cofla","maria"]
};

const CAP_TOTAL = 21;
const grid = document.getElementById('grid');
const inputAlumno = document.getElementById('alumno');
const selectMateria = document.getElementById('materia');
const btnInscribir = document.getElementById('btn-inscribir');
const btnLimpiar = document.getElementById('btn-limpiar');
const mensaje = document.getElementById('mensaje');

const getProfesor = (arr) => arr[0];
const getAlumnos  = (arr) => arr.slice(1);
const capacidadUsada = (arr) => arr.length;
const materiaLlena = (arr) => capacidadUsada(arr) >= CAP_TOTAL;

function pintarMensaje(texto, tipo = "") {
  mensaje.textContent = texto;
  mensaje.classList.remove('ok','err');
  if (tipo) mensaje.classList.add(tipo);
}

function render() {
  grid.innerHTML = "";
  Object.entries(state).forEach(([nombre, lista]) => {
    const prof = getProfesor(lista);
    const alumnos = getAlumnos(lista);
    const usada = capacidadUsada(lista);
    const disponible = CAP_TOTAL - usada;
    const full = materiaLlena(lista);

    const card = document.createElement('article');
    card.className = 'materia';
    card.innerHTML = `
      <div class="header">
        <div class="nombre">${nombre}</div>
        <span class="badge">Materia</span>
      </div>
      <div class="prof">Profesor: <strong>${prof}</strong></div>
      <div class="alumnos">
        ${
          alumnos.length
            ? alumnos.map(a => `<span class="tag">${a}</span>`).join('')
            : '<span class="muted">Sin alumnos</span>'
        }
      </div>
      <div class="cap">
        Capacidad: ${usada}/${CAP_TOTAL} ·
        ${
          full
            ? `<span class="full">¡Completa!</span>`
            : `<span class="ok">${disponible} lugar(es) disponible(s)</span>`
        }
      </div>
    `;
    grid.appendChild(card);
  });
}

function inscribir(alumno, materia) {
  const nombre = (alumno || "").trim();
  if (!nombre) {
    pintarMensaje("Ingresa un nombre de alumno válido.", "err");
    return;
  }
  if (!state[materia]) {
    pintarMensaje(`La materia "${materia}" no existe.`, "err");
    return;
  }

  const lista = state[materia];

  if (materiaLlena(lista)) {
    pintarMensaje(`Lo siento ${nombre}, las clases de ${materia} ya están llenas.`, "err");
    return;
  }

  const yaInscripto = getAlumnos(lista).some(a => a.toLowerCase() === nombre.toLowerCase());
  if (yaInscripto) {
    pintarMensaje(`${nombre} ya está inscripto en ${materia}.`, "err");
    return;
  }

  state[materia] = [...lista, nombre];

  pintarMensaje(`¡Felicidades ${nombre}! Te has inscrito a ${materia} correctamente.`, "ok");
  render();
}

function limpiar() {
  inputAlumno.value = "";
  pintarMensaje("Ingresa un nombre y elige una materia.");
  inputAlumno.focus();
}

btnInscribir.addEventListener('click', () => inscribir(inputAlumno.value, selectMateria.value));
btnLimpiar.addEventListener('click', limpiar);
inputAlumno.addEventListener('keydown', (e) => { if (e.key === 'Enter') inscribir(inputAlumno.value, selectMateria.value); });

render();
inputAlumno.focus();
