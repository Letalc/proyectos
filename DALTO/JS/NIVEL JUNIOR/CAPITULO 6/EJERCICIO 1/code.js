const contenedor = document.querySelector(".flex-container");
const hiddenInput = document.querySelector(".key-data");
const form = document.getElementById("form-compra");
const btnComprar = document.querySelector(".send-button");
const feedback = document.getElementById("feedback");

function crearLlave(nombre, modelo, precio){
  const img = `<img class="llave-img" src="llave.png" alt="Llave ${modelo}">`;
  const titulo = `<h2>${nombre}</h2>`;
  const subtitulo = `<h3>${modelo}</h3>`;
  const etiquetaPrecio = `<p>Precio: <span class="price">$${precio}</span></p>`;
  return [img, titulo, subtitulo, etiquetaPrecio].join("");
}

function randomModelo(){ return Math.round(Math.random() * 10000); }
function randomPrecio(){ return Math.round(Math.random() * 10 + 30); }

const fragment = document.createDocumentFragment();

for (let i = 1; i <= 20; i++) {
  const modeloRandom = randomModelo();
  const precioRandom = randomPrecio();
  const div = document.createElement("div");
  div.classList.add(`item-${i}`, "flex-item");
  div.tabIndex = 0;
  div.setAttribute("role", "button");
  div.setAttribute("aria-pressed", "false");
  div.dataset.modelo = modeloRandom;
  div.dataset.precio = precioRandom;
  div.dataset.nombre = `llave ${i}`;
  div.innerHTML = crearLlave(`Llave ${i}`, `Modelo ${modeloRandom}`, precioRandom);

  div.addEventListener("click", () => seleccionar(div));
  div.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      seleccionar(div);
    }
  });

  fragment.appendChild(div);
}
contenedor.appendChild(fragment);

function seleccionar(card){
  document.querySelectorAll(".flex-item.selected").forEach(el => {
    el.classList.remove("selected");
    el.setAttribute("aria-pressed", "false");
  });

  card.classList.add("selected");
  card.setAttribute("aria-pressed", "true");

  const modelo = card.dataset.modelo;
  hiddenInput.value = modelo;

  btnComprar.disabled = false;
  feedback.textContent = `Seleccionaste ${card.dataset.nombre} — Modelo ${modelo} por $${card.dataset.precio}.`;
  feedback.classList.remove("success");
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const modelo = hiddenInput.value;
  if (!modelo) return;

  feedback.textContent = `✅ Compra lista para enviar: modelo ${modelo}.`;
  feedback.classList.add("success");
});
