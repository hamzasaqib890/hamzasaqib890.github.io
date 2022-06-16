const canvas = document.querySelector("#playground");
const ctx = canvas.getContext("2d");

const cursor = {
  x: canvas.height / 2,
  y: canvas.width / 2,
};

setSize();
anim();

addEventListener("mousemove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;
});

addEventListener(
  "touchmove",
  (e) => {
    e.preventDefault();
    cursor.x = e.touches[0].clientX;
    cursor.y = e.touches[0].clientY;
  },
  { passive: false }
);

addEventListener("resize", setSize);

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

function drawBackground() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const pixelGap = 40;

  const horTotalOffset = (cursor.x - canvas.width / 2) / 10;
  const verTotalOffset = (cursor.y - canvas.height / 2) / 10;

  for (let x = 0; x < canvas.width; x += pixelGap) {
    for (let y = 0; y < canvas.height; y += pixelGap) {
      const dist = Math.sqrt((cursor.x - x) ** 2 + (cursor.y - y) ** 2);
      const length = (1 - Math.min(dist, 250) / 250) * 20 + 6;
      if (length === 6) {
        ctx.fillStyle = "rgb(128, 128, 128)";
        ctx.fillRect(x - length / 2, y - length / 2, length, length);
      } else {
        const horOffset = (1 - dist / 250) * horTotalOffset;
        const verOffset = (1 - dist / 250) * verTotalOffset;
        const sat = 100 - dist / 3;
        ctx.fillStyle = `hsl(360, ${sat}%, 50%)`;
        ctx.fillRect(
          x - length / 2 + horOffset,
          y - length / 2 + verOffset,
          length / 3,
          length
        );
        ctx.fillStyle = `hsl(120, ${sat}%, 50%)`;
        ctx.fillRect(
          x - length / 2 + length / 3 + horOffset,
          y - length / 2 + verOffset,
          length / 3,
          length
        );
        ctx.fillStyle = `hsl(240, ${sat}%, 50%)`;
        ctx.fillRect(
          x - length / 2 + (2 * length) / 3 + horOffset,
          y - length / 2 + verOffset,
          length / 3,
          length
        );
      }
    }
  }
}

function drawCircle() {
  if (!cursor.x || !cursor.y) {
    return;
  }
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 15;
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, 250, 0, Math.PI * 2, true);
  ctx.stroke();
}
function drawSmallCircle() {
  if (!cursor.x || !cursor.y) {
    return;
  }
  ctx.strokeStyle = "rgb(255, 255, 255)";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(cursor.x, cursor.y, 20, 0, Math.PI * 2, true);
  ctx.stroke();
}

function anim() {
  requestAnimationFrame(anim);

  drawBackground();
  drawCircle();
  //drawSmallCircle();
}
