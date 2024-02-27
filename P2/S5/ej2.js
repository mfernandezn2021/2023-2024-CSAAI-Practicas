console.log("Ejecutando JS...");

const elemento = document.getElementById("elemento");
const boton = document.getElementById("boton");

boton.onclick = () => {
  console.log("Clic!");

  elemento.style.backgroundColor = randomColor()
}

function randomColor () {
  // Calcula los valores RGB de manera aleatoria por separado
  // combina un unico color hexadecimal valido que es rcolor
  // Genera un número aleatorio dentro del rango de valores hexadecimales posibles para un color
  let randomNumber = Math.floor(Math.random() * 0xFFFFFF);
  // Convierte el número aleatorio a una cadena hexadecimal
  let hexString = randomNumber.toString(16);
  // Asegura que la cadena hexadecimal tenga una longitud de 6 caracteres, añadiendo ceros al inicio si es necesario
  let hexColor = hexString.padStart(6, '0');
  // Combina el color hexadecimal con el prefijo '#' para formar un color hexadecimal válido
  let rcolor = `#${hexColor.toUpperCase()}`;
  // Retorna el color hexadecimal generado


  return rcolor
}