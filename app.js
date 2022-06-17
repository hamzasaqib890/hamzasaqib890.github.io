const canvas = document.querySelector("#playground");
const ctx = canvas.getContext("2d");

const cursor = {
  x: canvas.height / 2,
  y: canvas.width / 2,
};

function hslToRgb(h, s, l) {
  var r, g, b;

  if (s == 0) {
    r = g = b = l; // achromatic
  } else {
    function hue2rgb(p, q, t) {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    }

    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;

    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }

  return [r * 255, g * 255, b * 255];
}

class Pixel {
  constructor(x, y, hue = 128) {
    this.x = x;
    this.y = y;
    this.hue = hue;
    this.color = `hsl(${hue}, 100%, 50%)`;
  }

  updateColor() {
    this.hue = (360 + this.hue - 1) % 360;
    this.color = `hsl(${this.hue}, 100%, 50%)`;
  }

  draw(horTotalOffset, verTotalOffset) {
    const dist = Math.sqrt((cursor.x - this.x) ** 2 + (cursor.y - this.y) ** 2);
    const length = (1 - Math.min(dist, 250) / 250) * 20 + 6;

    if (length === 6) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - length / 2, this.y - length / 2, length, length);
    } else {
      const horOffset = (1 - dist / 250) * horTotalOffset;
      const verOffset = (1 - dist / 250) * verTotalOffset;

      const rgb = hslToRgb(this.hue / 360, 1, 0.5);

      ctx.fillStyle = `hsl(360, 100%, ${(rgb[0] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + horOffset,
        this.y - length / 2 + verOffset,
        length / 3,
        length
      );
      ctx.fillStyle = `hsl(120, 100%, ${(rgb[1] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + length / 3 + horOffset,
        this.y - length / 2 + verOffset,
        length / 3,
        length
      );
      ctx.fillStyle = `hsl(240, 100%, ${(rgb[2] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + (2 * length) / 3 + horOffset,
        this.y - length / 2 + verOffset,
        length / 3,
        length
      );
    }
  }
}

let pixelArray = [];

setSize();
generatePixels();
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
  generatePixels();
}

function generatePixels() {
  const pixelGap = 40;
  pixelArray = [];

  for (let x = 0; x < canvas.width; x += pixelGap) {
    for (let y = 0; y < canvas.height; y += pixelGap) {
      pixelArray.push(new Pixel(x, y, ((x + y) / 10) % 360));
    }
  }
}

function drawBackground() {
  ctx.fillStyle = "rgb(0, 0, 0)";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const horTotalOffset = (cursor.x - canvas.width / 2) / 15;
  const verTotalOffset = (cursor.y - canvas.height / 2) / 15;

  for (let pixel of pixelArray) {
    pixel.updateColor();
    pixel.draw(horTotalOffset, verTotalOffset);
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
}
