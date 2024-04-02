console.log("Ejecutando JS...");

const canvas = document.getElementById("canvasGame");

const valueAngle = document.getElementById("sliderAngle");
const valueSpeed = document.getElementById("sliderSpeed"); // Speed has to be choosen by user

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;
let target =  {x: getRandomPosition(), y: 0 };
// Position of object
let x = 10;
let y = canvas.height - 25;

let projectile = {x: 0, y: canvas.height}; // Projectile
// Speeds of object
let speedX = 0;
let speedY = 0;
let gravity = 0.15;

let angle = valueAngle.value * (Math.PI/180);
let speed = valueSpeed.value;

let fired = false;
let circle = 360;
let xCircle = getRandomPosition();
let yCircle = canvas.height - 25;

// Angle display 
valueAngle.addEventListener('input', () => {
  angle = valueAngle.value * (Math.PI/180); // rad to grad
  document.getElementById('valueA').textContent = `Shot angle: ${angle.toFixed(1)}`;
});

// Speed display 
valueSpeed.addEventListener('input', () => {
  speed = valueSpeed.value;
  document.getElementById('valueS').textContent = `Speed: ${speed}`;
});



document.getElementById('buttonFire').addEventListener('click', () => {
  if (buttonFire) {
    speedX = speed * Math.cos(angle);
    speedY = -speed * Math.sin(angle);
    if (Math.abs(projectile.x - target.x) < 10 && projectile.y <= 10) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Hit!';
      fired = false;
    } else if (projectile.x > canvas.width || projectile.y > canvas.height) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Miss!';
      fired = false;
    }
    console.log('Projectile fired');
    fired = true;
  }
});

document.getElementById('buttonReset').addEventListener('click', function() {
  x = 10;
  y = canvas.height - 25;
  speedX = 0;
  speedY = 0;
  fired = false;
  xCircle = getRandomPosition();
  yCircle = canvas.height - 25;
  console.log('Game reset done');
});

function getRandomPosition() {
  return Math.random() * (canvas.width - 50) + 50;
}




// Updating position
function update() {

  if (fired) {
    speedY += gravity;
    x += speedX;
    y += speedY;
    if(x < 0 || x > canvas.width - 50 || y < 0 || y > canvas.height - 50) {
      fired = false;
    }
  }
  requestAnimationFrame(update);

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Limpiar el lienzo
  ctx.beginPath();
  ctx.rect(x, y, 25, 25);
  ctx.fillStyle = 'green';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();

  ctx.beginPath();
  ctx.arc(xCircle, yCircle, 25, 0, 2*Math.PI);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'red';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();

  

  let distanciaCentros = calcularDistancia(xCircle, 430, x + 25, y + 25); // Sumamos 25 para obtener el centro del cuadrado
  document.getElementById("distancia").textContent = distanciaCentros.toFixed(2);
  }

function calcularDistancia(x, y, xCircle, yCircle) {
  return Math.sqrt(Math.pow(xCircle - x, 2) + Math.pow(yCircle - y, 2));
}

update();

