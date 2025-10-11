class Calculadora {
  sumar(a,b){ return parseFloat(a) + parseFloat(b); }
  restar(a,b){ return parseFloat(a) - parseFloat(b); }
  dividir(a,b){ return parseFloat(a) / parseFloat(b); }
  multiplicar(a,b){ return parseFloat(a) * parseFloat(b); }
  potenciar(num, exp){
    return Math.pow(parseFloat(num), parseFloat(exp));
  }
  raizCuadrada(num){ return Math.sqrt(parseFloat(num)); }
  raizCubica(num){ return Math.cbrt(parseFloat(num)); }
}

const calculadora = new Calculadora();

const operacionEl = document.getElementById('operacion');
const num1El = document.getElementById('numero1');
const num2El = document.getElementById('numero2');
const labelNum2 = document.getElementById('label-num2');
const labelNum1 = document.getElementById('label-num1');
const btnCalcular = document.getElementById('calcular');
const btnLimpiar = document.getElementById('limpiar');
const resultadoEl = document.getElementById('resultado');
const historialEl = document.getElementById('historial');
const borrarHistorialBtn = document.getElementById('borrar-historial');

function esOperacionUnaria(op){
  return op === 'raizCuadrada' || op === 'raizCubica';
}

function actualizarFormulario(){
  const op = operacionEl.value;
  if(op === 'potenciar'){
    labelNum1.textContent = 'Base';
    labelNum2.textContent = 'Exponente';
  } else if(esOperacionUnaria(op)){
    labelNum1.textContent = op === 'raizCuadrada' ? 'Número (√)' : 'Número (∛)';
    labelNum2.textContent = '—';
  } else {
    labelNum1.textContent = 'Número 1';
    labelNum2.textContent = 'Número 2';
  }

  num2El.disabled = esOperacionUnaria(op);
  if(num2El.disabled){
    num2El.value = '';
  }
}

function formatea(x){
  const n = Number(x);
  if(!isFinite(n)) return String(x);
  return Number.isInteger(n) ? n.toString() : n.toFixed(12).replace(/\.?0+$/,'');
}

function calcular(){
  const op = operacionEl.value;
  const a = num1El.value;
  const b = num2El.value;

  if(a.trim() === ''){
    return mostrarResultado('⚠️ Ingresa un número válido en el campo 1', true);
  }
  if(!esOperacionUnaria(op) && b.trim() === ''){
    return mostrarResultado('⚠️ Ingresa un número válido en el campo 2', true);
  }

  let res;
  try{
    switch(op){
      case 'sumar':        res = calculadora.sumar(a,b); break;
      case 'restar':       res = calculadora.restar(a,b); break;
      case 'dividir':
        if(parseFloat(b) === 0) throw new Error('No se puede dividir por 0');
        res = calculadora.dividir(a,b); break;
      case 'multiplicar':  res = calculadora.multiplicar(a,b); break;
      case 'potenciar':    res = calculadora.potenciar(a,b); break;
      case 'raizCuadrada':
        if(parseFloat(a) < 0) throw new Error('La raíz cuadrada de un número negativo no es real');
        res = calculadora.raizCuadrada(a); break;
      case 'raizCubica':   res = calculadora.raizCubica(a); break;
      default: throw new Error('Operación no soportada');
    }
  } catch(err){
    return mostrarResultado(`❌ ${err.message}`, true);
  }

  if(Number.isNaN(res)) return mostrarResultado('❌ Operación inválida (revisa los números)', true);

  const pretty = formatea(res);
  mostrarResultado(`Resultado: ${pretty}`);
  agregarHistorial(op, a, b, pretty);
}

function mostrarResultado(mensaje, esError = false){
  resultadoEl.textContent = mensaje;
  resultadoEl.style.borderColor = esError ? '#fecaca' : '#d1d5db';
  resultadoEl.style.background = esError ? '#fff1f2' : '#f9fafb';
}

function simbolo(op){
  return ({
    sumar:'+',
    restar:'−',
    dividir:'÷',
    multiplicar:'×',
    potenciar:'^',
    raizCuadrada:'√',
    raizCubica:'∛'
  })[op] || '?';
}

function agregarHistorial(op, a, b, res){
  const li = document.createElement('li');
  const s = simbolo(op);

  let expr;
  if(esOperacionUnaria(op)){
    expr = `${s}(${formatea(a)})`;
  }else if(op === 'potenciar'){
    expr = `${formatea(a)} ${s} ${formatea(b)}`;
  }else{
    expr = `${formatea(a)} ${s} ${formatea(b)}`;
  }

  li.innerHTML = `
    <span>${expr} = <strong>${res}</strong></span>
    <span class="badge">${op}</span>
  `;
  historialEl.prepend(li);
}

function limpiar(){
  num1El.value = '';
  num2El.value = '';
  mostrarResultado('Resultado: —');
  num1El.focus();
}

function borrarHistorial(){
  historialEl.innerHTML = '';
}

operacionEl.addEventListener('change', actualizarFormulario);
btnCalcular.addEventListener('click', calcular);
btnLimpiar.addEventListener('click', limpiar);
borrarHistorialBtn.addEventListener('click', borrarHistorial);

document.addEventListener('keydown', (e)=>{
  if(e.key === 'Enter') calcular();
});

actualizarFormulario();
num1El.focus();
