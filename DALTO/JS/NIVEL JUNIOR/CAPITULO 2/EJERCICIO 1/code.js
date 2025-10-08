let free = false;

const ValidateClient = (time)=>{
  let age = prompt("Cual es tu edad?");
  if (age >= 18) {
    if (time >= 2 && time < 7 && free == false) {
      alert("Puedes pasar gratis ya que eres la primer persona despues de las 2 AM");
      free = true;
    } else {
      alert(`son las ${time}:00Hs y puedes pasar, pero tienes que pagar la entrada`);
    }
  } else {
    alert("Eres menor de edad y no puedes pasar");
  }
}

ValidateClient(18);
ValidateClient(19);
ValidateClient(17);
ValidateClient(16);
ValidateClient(20);
ValidateClient(6);
ValidateClient(2);

