class App {
  constructor(descargas, puntuacion, peso) {
    this.descargas = descargas;
    this.puntuacion = puntuacion;
    this.peso = peso;
    this.iniciada = false;
    this.instalada = false;
  }

  instalar() {
    if (!this.instalada) {
      this.instalada = true;
      alert("app instalada correctamente");
    }
  }
  desinstalar() {
    if (this.instalada) {
      this.instalada = false;
      this.iniciada = false;
      alert("app desinstalada correctamente");
    }
  }
  abrir() {
    if (!this.iniciada && this.instalada) {
      this.iniciada = true;
      alert("app iniciada");
    }
  }
  cerrar() {
    if (this.iniciada && this.instalada) {
      this.iniciada = false;
      alert("app cerrada");
    }
  }

  appInfo() {
    return `
      <div class="specs">
        Descargas: <b>${this.descargas}</b><br/>
        Puntuación: <b>${this.puntuacion}</b><br/>
        Peso: <b>${this.peso}</b><br/>
      </div>
    `;
  }
}

const apps = [
  { nombre: "App 1", obj: new App("16.000","5 estrellas","900mb") },
  { nombre: "App 2", obj: new App("1.000","4 estrellas","400mb") },
  { nombre: "App 3", obj: new App("6.000","4.5 estrellas","100mb") },
  { nombre: "App 4", obj: new App("23.000","4.8 estrellas","1gb") },
  { nombre: "App 5", obj: new App("900","5 estrellas","250mb") },
  { nombre: "App 6", obj: new App("17","3.7 estrellas","522mb") },
  { nombre: "App 7", obj: new App("42.981","2.9 estrellas","723mb") },
];

const container = document.getElementById("apps");

apps.forEach(({ nombre, obj }) => {
  const card = document.createElement("article");
  card.className = "card";

  const render = () => {
    const badges = `
      <div class="badges">
        ${obj.instalada
          ? `<span class="badge inst">Instalada</span>`
          : `<span class="badge noinst">No instalada</span>`}
        ${obj.iniciada
          ? `<span class="badge run">Iniciada</span>`
          : `<span class="badge stopped">Detenida</span>`}
      </div>
    `;

    card.innerHTML = `
      <h2>${nombre}</h2>
      ${badges}
      ${obj.appInfo()}
      <div class="actions">
        <button class="install">Instalar</button>
        <button class="uninstall">Desinstalar</button>
        <button class="open">Abrir</button>
        <button class="close">Cerrar</button>
      </div>
    `;

    card.querySelector(".install").disabled = obj.instalada;
    card.querySelector(".uninstall").disabled = !obj.instalada;
    card.querySelector(".open").disabled = !obj.instalada || obj.iniciada;
    card.querySelector(".close").disabled = !obj.instalada || !obj.iniciada;

    card.querySelector(".install").onclick = () => { obj.instalar(); render(); };
    card.querySelector(".uninstall").onclick = () => { obj.desinstalar(); render(); };
    card.querySelector(".open").onclick = () => { obj.abrir(); render(); };
    card.querySelector(".close").onclick = () => { obj.cerrar(); render(); };
  };

  render();
  container.appendChild(card);
});
