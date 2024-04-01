const canvas = document.getElementById("canvasGame");
const ctx = canvas.getContext("2d");
let raf;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 10,
  color: "blue",
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

let angle = 45;
let speed = 50;
let projectile = { x: 0, y: canvas.height};
let fired = false;
let timer = 0;
let interval;

// Update of angle and speed from sliders data
document.getElementById('sliderAngle').addEventListener('input', function() {
  angle = this.value;
});

document.getElementById( 'sliderSpeed' ).addEventListener('input', function() {
  speed = this.value;
});

// Fire button of parabolic shot
document.getElementById('buttonFire').addEventListener('click', function() {
  if (!fired) {
    fired = true;
    interval = setInterval(updateTimer, 100); // Start counting time for the shot
    fireProjectile();
  }
});

// Reset button of game
document.getElementById('buttonReset').addEventListener('click', resetGame);

function updateTimer() {
  timer += 0.1;
  document.getElementById('displayTimer').textContent = `Time: ${timer.toFixed(1)}s`;
}

function getRandomPosition() {
  return Math.random() * (canvas.width - 50) + 50;
}

function resetGame() {
  clearInterval(interval);
  fired = false;
  timer = 0;
  projectile = {x:0, y: canvas.height};
  target = {x: getRandomPosition(), y: 0};
  draw();
}

// Drawing canvas
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Así añadimos el efecto de la aceleración al movimiento
  ball.vy *= 0.99;
  ball.vy += 0.25;

  if (
    ball.y + ball.vy > canvas.height - ball.radius ||
    ball.y + ball.vy < ball.radius
  ) {
    ball.vy = -ball.vy;
  }
  if (
    ball.x + ball.vx > canvas.width - ball.radius ||
    ball.x + ball.vx < ball.radius
  ) {
    ball.vx = -ball.vx;
  }

  ctx.fillStyle = 'red';
  ctx.beginPath();
  ctx.arc(target.x, target.y, 10, 0, Math.PI * 2);
  ctx.fill();
  // Draw projectile
  ctx.fillStyle = 'green';
  ctx.fillRect(projectile.x, projectile.y - 10, 10, 10);
  requestAnimationFrame(draw);
  raf = window.requestAnimationFrame(draw);
}

/* canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});
*/

function fireProjectile() {
  // Convert angle to radians
  let angleRad = angle * (Math.PI / 180);
  // Time since the projectile was fired
  let time = timer;
  // Initial velocity components
  let vx = velocity * Math.cos(angleRad);
  let vy = velocity * Math.sin(angleRad);
  // Update projectile position
  projectile.x = vx * time;
  projectile.y = canvas.height - (vy * time - 0.5 * 9.81 * time * time);
  // Check for collision with target
  if (Math.abs(projectile.x - target.x) < 10 && projectile.y <= 10) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Hit!';
      fired = false;
  } else if (projectile.x > canvas.width || projectile.y > canvas.height) {
      clearInterval(interval);
      document.getElementById('resultDisplay').textContent = 'Result: Miss!';
      fired = false;
  }
}

ball.draw();
