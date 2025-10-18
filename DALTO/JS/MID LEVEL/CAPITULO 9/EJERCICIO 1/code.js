const form      = document.getElementById("form-mesa");
const nombre    = document.getElementById("nombre");
const email     = document.getElementById("mail");
const materia   = document.getElementById("materia");
const btn       = document.getElementById("btn-enviar");
const resultado = document.getElementById("resultado");

const errNombre  = document.getElementById("err-nombre");
const errMail    = document.getElementById("err-mail");
const errMateria = document.getElementById("err-materia");

// Validador de email razonable (no perfecto, pero práctico)
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

function setFieldState(input, ok, msgEl, msg="") {
  input.classList.remove("is-invalid", "is-valid");
  msgEl.textContent = "";
  if (ok) {
    input.classList.add("is-valid");
  } else {
    input.classList.add("is-invalid");
    msgEl.textContent = msg;
  }
}

function validarNombre() {
  const v = nombre.value.trim();
  if (v.length < 5 || v.length > 40) {
    setFieldState(nombre, false, errNombre, "El nombre debe tener entre 5 y 40 caracteres.");
    return false;
  }
  setFieldState(nombre, true, errNombre);
  return true;
}

function validarEmail() {
  const v = email.value.trim();
  if (v.length < 5 || v.length > 40 || !emailRegex.test(v)) {
    setFieldState(email, false, errMail, "El email es inválido (ej: usuario@dominio.com).");
    return false;
  }
  setFieldState(email, true, errMail);
  return true;
}

function validarMateria() {
  const v = materia.value.trim();
  // En tu código original comparabas el valor numérico; aquí validamos POR LONGITUD:
  if (v.length < 4 || v.length > 40) {
    setFieldState(materia, false, errMateria, "La materia debe tener entre 4 y 40 caracteres.");
    return false;
  }
  setFieldState(materia, true, errMateria);
  return true;
}

function validarFormulario() {
  const okNombre  = validarNombre();
  const okEmail   = validarEmail();
  const okMateria = validarMateria();
  return okNombre && okEmail && okMateria;
}

// Limpieza de mensajes en tiempo real
[nombre, email, materia].forEach(inp => {
  inp.addEventListener("input", () => {
    // Validación “live” por campo
    if (inp === nombre)  validarNombre();
    if (inp === email)   validarEmail();
    if (inp === materia) validarMateria();
  });
});

// Submit
form.addEventListener("submit", (e) => {
  e.preventDefault();

  resultado.classList.remove("green", "red");

  if (!validarFormulario()) {
    resultado.textContent = "Revisá los errores y volvé a intentar.";
    resultado.classList.add("red");
    return;
  }

  // “Enviar” OK
  btn.disabled = true;
  resultado.textContent = "Solicitud enviada correctamente";
  resultado.classList.add("green");

  // Simular finalización (si no vas a enviar a un backend)
  setTimeout(() => { btn.disabled = false; }, 1200);
});
