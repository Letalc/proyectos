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
    if (this.encendido == false) {
      alert("celular prendido");
      this.encendido = true;
    } else {
      alert("celular apagado");
      this.encendido = false;
    }
  }
  reiniciar() {
    if (this.encendido == true) {
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
        Resolución de Video: <b>${this.resolucionDeCamara}</b><br/>
        Memoria RAM: <b>${this.memoriaRam}</b><br/>
      </div>
    `;
  }
}

const motorolla = new Celular("rojo", "150g", "5'", "HD", "1GB");
const apple     = new Celular("negro", "155g", "5.4'", "Full HD", "2GB");
const samsung   = new Celular("blanco", "146g", "5.9'", "Full HD", "2GB");

const phonesDiv = document.getElementById('phones');
const modelos = [
  { nombre: "Motorolla", obj: motorolla },
  { nombre: "Apple",     obj: apple },
  { nombre: "Samsung",   obj: samsung }
];

modelos.forEach(({ nombre, obj }) => {
  const card = document.createElement('article');
  card.className = 'card';
  card.innerHTML = `
    <h2>${nombre}</h2>
    ${obj.mobileInfo()}
    <div class="actions">
      <button class="power">Encender/Apagar</button>
      <button class="restart">Reiniciar</button>
      <button class="photo">Tomar foto</button>
      <button class="video">Grabar video</button>
    </div>
  `;

  card.querySelector('.power').addEventListener('click', () => obj.presionarBotonEncendido());
  card.querySelector('.restart').addEventListener('click', () => obj.reiniciar());
  card.querySelector('.photo').addEventListener('click', () => obj.tomarFoto());
  card.querySelector('.video').addEventListener('click', () => obj.grabarVideo());

  phonesDiv.appendChild(card);
});
