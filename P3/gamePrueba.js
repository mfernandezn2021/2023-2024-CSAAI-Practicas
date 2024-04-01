let canvas = document.getElementById('canvasGame');
let ctx = canvas.getContext('2d');

let ball = {
  x: 0,
  y: canvas.height,
  radius: 10,
  vx: 0,
  vy: 0,
  draw: function() {
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }
};

let target = {
  x: getRandomPosition(),
  y: 0
};

let velocity = 50;
let angle = 45;
let fired = false;
let timer = 0;
let interval;
let projectile = { x: 0, y: canvas.height};


// Update of angle and speed from sliders data
document.getElementById('sliderAngle').addEventListener('input', function() {
  angle = this.value;
});

document.getElementById('sliderSpeed').addEventListener('input', function() {
  velocity = this.value;
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
  ball.x = 0;
  ball.y = canvas.height;
  ball.vx = 0;
  ball.vy = 0;
  target.x = getRandomPosition();
  target.y = 0;
  document.getElementById('displayResult').textContent = '';
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
}

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