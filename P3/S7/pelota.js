const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let raf;

const ball = {
  x: 100,
  y: 100,
  vx: 5,
  vy: 2,
  radius: 25,
  color: "blue",
  gravity: 0.2, // Ajuste de la gravedad
  friction: 0.05, // Ajuste de la fricción del aire
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = this.color;
    ctx.fill();
  },
};

function draw() {
  ctx.fillStyle = "rgb(255 255 255 / 30%)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ball.draw();
  
  // Aplicar gravedad
  ball.vy += ball.gravity;
  
  // Aplicar fricción del aire
  ball.vx *= (1 - ball.friction);
  ball.vy *= (1 - ball.friction);
  
  ball.x += ball.vx;
  ball.y += ball.vy;

  // Verificar colisiones con los bordes
  if (ball.y + ball.vy > canvas.height - ball.radius) {
    ball.y = canvas.height - ball.radius;
    ball.vy = -ball.vy;
  }
  if (ball.y + ball.vy < ball.radius) {
    ball.y = ball.radius;
    ball.vy = -ball.vy;
  }
  if (ball.x + ball.vx > canvas.width - ball.radius) {
    ball.x = canvas.width - ball.radius;
    ball.vx = -ball.vx;
  }
  if (ball.x + ball.vx < ball.radius) {
    ball.x = ball.radius;
    ball.vx = -ball.vx;
  }

  // Detener la animación si la velocidad es muy baja
  if (Math.abs(ball.vx) < 0.1 && Math.abs(ball.vy) < 0.1) {
    window.cancelAnimationFrame(raf);
  } else {
    raf = window.requestAnimationFrame(draw);
  }
}

canvas.addEventListener("mouseover", (e) => {
  raf = window.requestAnimationFrame(draw);
});

canvas.addEventListener("mouseout", (e) => {
  window.cancelAnimationFrame(raf);
});

ball.draw();
