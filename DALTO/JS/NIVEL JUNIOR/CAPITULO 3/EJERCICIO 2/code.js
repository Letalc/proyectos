class Celular {
  constructor(color, peso, tamaño, rdc, ram) {
    this.color = color;
    this.peso = peso;
    this.tamaño = tamaño;
    this.resolucionDeCamara = rdc;
    this.memoriaRam = ram;
    this.encendido = false;
  }
  presionarBotonEncendido() {
    if (!this.encendido) {
      alert("celular prendido");
      this.encendido = true;
    } else {
      alert("celular apagado");
      this.encendido = false;
    }
  }
  reiniciar() {
    if (this.encendido) {
      alert("reiniciando celular");
    } else {
      alert("el celular está apagado");
    }
  }
  tomarFoto() {
    alert(`foto tomada en una resolución de: ${this.resolucionDeCamara}`);
  }
  grabarVideo() {
    alert(`grabando video en ${this.resolucionDeCamara}`);
  }
  mobileInfo() {
    return `
      <div class="specs">
        Color: <b>${this.color}</b><br/>
        Peso: <b>${this.peso}</b><br/>
        Tamaño: <b>${this.tamaño}</b><br/>
        Memoria RAM: <b>${this.memoriaRam}</b><br/>
        Resolución de Video: <b>${this.resolucionDeCamara}</b><br/>
      </div>
    `;
  }
}

class CelularAltaGama extends Celular {
  constructor(color, peso, tamaño, rdc, ram, rdce) {
    super(color, peso, tamaño, rdc, ram);
    this.resolucionDeCamaraExtra = rdce;
  }
  grabarVideoLento() {
    alert("estás grabando en cámara lenta");
  }
  reconocimientoFacial() {
    alert("vamos a iniciar un reconocimiento facial");
  }
  infoAltaGama() {
    return `
      ${this.mobileInfo()}
      <div class="specs">
        Resolución de Cámara Extra: <b>${this.resolucionDeCamaraExtra}</b>
      </div>
    `;
  }
}

const celular1 = new CelularAltaGama("rojo", "130g", "5.2\"", "4K", "3GB", "Full HD");
const celular2 = new CelularAltaGama("negro", "142g", "6\"", "4K", "4GB", "HD");

const phonesDiv = document.getElementById("phones");
[
  { nombre: "Samsung", obj: celular1 },
  { nombre: "Apple", obj: celular2 }
].forEach(({ nombre, obj }) => {
  const card = document.createElement("article");
  card.className = "card";
  card.innerHTML = `
    <h2>${nombre} <span class="badge">Alta gama</span></h2>
    ${obj.infoAltaGama()}
    <div class="actions">
      <button class="power">Encender/Apagar</button>
      <button class="restart">Reiniciar</button>
      <button class="photo">Tomar foto</button>
      <button class="video">Grabar video</button>
      <button class="slowmo">Cámara lenta</button>
      <button class="faceid">Reconocimiento facial</button>
    </div>
  `;

  card.querySelector(".power").addEventListener("click", () => obj.presionarBotonEncendido());
  card.querySelector(".restart").addEventListener("click", () => obj.reiniciar());
  card.querySelector(".photo").addEventListener("click", () => obj.tomarFoto());
  card.querySelector(".video").addEventListener("click", () => obj.grabarVideo());
  card.querySelector(".slowmo").addEventListener("click", () => obj.grabarVideoLento());
  card.querySelector(".faceid").addEventListener("click", () => obj.reconocimientoFacial());

  phonesDiv.appendChild(card);
});
