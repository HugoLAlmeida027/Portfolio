const canvas = document.getElementById("ceu-estrelado");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const estrelas = [];

for (let i = 0; i < 200; i++) {
  estrelas.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5,
    alpha: Math.random(),
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    da: (Math.random() - 0.5) * 0.02,
  });
}

// Posição atual do mouse, inicialmente fora do canvas
const mouse = { x: -1000, y: -1000 };

// Distância mínima para as estrelas fugirem do mouse
const distanciaFuga = 100;
const intensidadeFuga = 2;

window.addEventListener("mousemove", (e) => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
});

function desenharEstrelas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let estrela of estrelas) {
    // Calcular distância do mouse à estrela
    const dxMouse = estrela.x - mouse.x;
    const dyMouse = estrela.y - mouse.y;
    const distancia = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

    if (distancia < distanciaFuga) {
      // Calcular vetor de fuga normalizado
      const fugaX = (dxMouse / distancia) * intensidadeFuga;
      const fugaY = (dyMouse / distancia) * intensidadeFuga;

      // Aplicar vetor de fuga na posição da estrela
      estrela.x += fugaX;
      estrela.y += fugaY;
    } else {
      // Movimento normal da estrela
      estrela.x += estrela.dx;
      estrela.y += estrela.dy;
    }

    estrela.alpha += estrela.da;

    // Inverter velocidade nas bordas
    if (estrela.x < 0) {
      estrela.x = 0;
      estrela.dx *= -1;
    } else if (estrela.x > canvas.width) {
      estrela.x = canvas.width;
      estrela.dx *= -1;
    }
    if (estrela.y < 0) {
      estrela.y = 0;
      estrela.dy *= -1;
    } else if (estrela.y > canvas.height) {
      estrela.y = canvas.height;
      estrela.dy *= -1;
    }

    if (estrela.alpha < 0.1 || estrela.alpha > 1) estrela.da *= -1;

    // Desenhar estrela
    ctx.beginPath();
    ctx.arc(estrela.x, estrela.y, estrela.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${estrela.alpha})`;
    ctx.fill();
  }

  requestAnimationFrame(desenharEstrelas);
}

desenharEstrelas();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
