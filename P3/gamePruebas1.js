console.log("Ejecutando JS...");

const canvas = document.getElementById("canvasGame");

//-- Definir el tamaño del canvas

//-- Obtener el contexto del canvas
const ctx = canvas.getContext("2d");

//-- Coordenadas del objeto
let x = 10;
let y = 120;

//-- Velocidad horizontal del objeto
let velx = 1;
let vely = -0.2;

let acelx = Math.floor(Math.random() + 1);

//-- Función principal de animación
function update() 
{
  console.log("test");
  //-- Algoritmo de animación:
  //-- 1) Actualizar posición del  elemento
  //-- (física del movimiento rectilíneo uniforme)
  x = x + velx;
  y = y + vely;

  //-- Comprobar colisión con borde derecho
  //-- Si se alcanza la anchura del canvas, se cambia la velocidad
  //-- de signo (rebote)
  //-- Condición de rebote en extremos del canvas
  if (x <= 0 || x >= (canvas.width -10) ) {
    velx = -velx*acelx;
  }


  //-- Condición de rebote en extremos horizontales del canvas
  if (y <= 0 || y >= canvas.height -10) {
    vely = -vely;
  }

  //-- 2) Borrar el canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  //-- 3) Dibujar los elementos visibles
  ctx.beginPath();
    ctx.rect(x, y, 10, 10);

    //-- Dibujar
    ctx.fillStyle = 'red';

    //-- Rellenar
    ctx.fill();

    //-- Dibujar el trazo
    ctx.stroke()
  ctx.closePath();

  //-- 4) Volver a ejecutar update cuando toque
  requestAnimationFrame(update);
}

//-- ¡Que empiece la función!
update();