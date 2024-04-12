
console.log("Ejecutando JS...");

const press = {
  display : document.getElementById("displayTimer"),
  start : document.getElementById("buttonFire"),
  reset : document.getElementById("buttonReset")
}

const crono = new Crono(press.display);

const canvas = document.getElementById("canvasGame");

const valueAngle = document.getElementById("sliderAngle"); // Angle has to be choosen by user
const valueSpeed = document.getElementById("sliderSpeed"); // Speed has to be choosen by user

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth * 0.5;
canvas.height = window.innerHeight * 0.5;

let target =  {x: getRandomPosition(), y: 0 };
// Position of object
let x = 10;
let y = canvas.height - 50;

let projectile = {x: 0, y: canvas.height}; // Projectile
// Speeds of object
let speedX = 0;
let speedY = 0;
let gravity = 0.15;

let angle = valueAngle.value * (Math.PI/180);
let speed = valueSpeed.value;
let cronoStopped = false;

let fired = false;
let counter = 0;
let circle = 360;
let xCircle = getRandomPosition();
let yCircle = canvas.height - 25;

let hitTarget = false;

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

// Fire button   MIRAR DONDE PONER REBOUND CANVAS
document.getElementById('buttonFire').addEventListener('click', () => {
  if (buttonFire) {
    if (cronoStopped == true) {
      crono.start();
      cronoStopped = false;
    }
    speedX = speed * Math.cos(angle);
    speedY = -speed * Math.sin(angle);
    /*
    if (Math.abs(projectile.x - target.x) < 10 && projectile.y <= 10) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Hit!';
      fired = false;
    } else if (projectile.x > canvas.width || projectile.y > canvas.height) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Miss!';
      fired = false;
    }*/
    console.log('Projectile fired');
    counter += 1;
    if (counter == 1) {
      crono.start();
    }
    fired = true;
  }
});

function reboundCanvas() {
  if (x >= (canvas.width - 50) ) {
    speedX = -speedX;
  }
  if (y >= canvas.height -50) {
    speedY = -speedY;
  }
}

function stopCrono() {
  if (cronoStopped == false) {
    crono.stop();
    cronoStopped = true;
    console.log('Stopping timer...');
  }
}

function resetDisplay() {
  console.log('Button clicked, resetting game...');
  target =  {x: getRandomPosition(), y: 0 };
  x = 10;
  y = canvas.height - 50;
  projectile = {x: 0, y: canvas.height}; // Projectile
  speedX = 0;
  speedY = 0;
  gravity = 0.15;
  angle = valueAngle.value * (Math.PI/180);
  speed = valueSpeed.value;
  fired = false;
  counter = 0;
  circle = 360;
  xCircle = getRandomPosition();
  yCircle = canvas.height - 25;
  hitTarget = false;
  crono.stop();
  crono.reset();
  console.log('Game reset done');
}

document.getElementById('buttonReset').addEventListener('click', resetDisplay());

function getRandomPosition() {
  return Math.random() * (canvas.width - 50) + 55;
}

function finalProjectile() {
  ctx.beginPath();
  ctx.rect(x, y, 50, 50);
  ctx.fillStyle = 'green';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

function finalTarget() {
  ctx.beginPath();
  if (xCircle >= canvas.width - 50) {
    xCircle = canvas.width - 70;
  } else if (xCircle <= 80) {
    xCircle = 100;
  }
  ctx.arc(xCircle, yCircle, 25, 0, 2*Math.PI);
  ctx.strokeStyle = 'blue';
  ctx.lineWidth = 3;
  ctx.fillStyle = 'red';
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

function calculateDistance(x, y, xCircle, yCircle) {
  return Math.sqrt(Math.pow(xCircle - x, 2) + Math.pow(yCircle - y, 2));
}

// Updating position
function update() {
  if (fired) {
    speedY += gravity;
    x += speedX;
    y += speedY;
    if(x < 0 || x > canvas.width - 50 || y > canvas.height - 50) {
      reboundCanvas();
      if (y = canvas.height - 50) { 
        fired = false;
      }
    }
    if (y <= 0) {
      speedY = -speedY;
    }
  }

  if (hitTarget == false) {
    console.log('Target not hitted');
    document.getElementById('displayResult').textContent = 'Result: None';
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height); // Cleaning canvas
  finalProjectile();
  finalTarget();


  requestAnimationFrame(update);

  let distanceCenters = calculateDistance(xCircle, 430, x + 25, y + 25);
  document.getElementById("distance").textContent = "Distance: " + distanceCenters.toFixed(2);
  if (distanceCenters <= 51) {
    hitTarget = true; 
    crono.stop();
    console.log("Target hitted");
    document.getElementById('displayResult').textContent = 'Result: Hit!';
    Swal.fire({
      title: 'Target REACHED!',
      text: `Your gaming time is: ${document.getElementById("displayTimer").textContent}  Number of times Fire! pressed: ${counter}`,
      icon: 'success',
    });
    resetDisplay();
    cancelAnimationFrame(update);
  } else if (counter >= 10 && hitTarget == false) {
    document.getElementById('displayResult').textContent = 'Result: Miss!';
    Swal.fire({
        title: 'Out of bounds!',
        text: `You lost the target! ${document.getElementById("displayTimer").textContent} Times Fire! pressed: ${counter}`,
        icon: 'error',  
    });
    resetDisplay();
    cancelAnimationFrame(update);
  }
}

update(); // Animation
