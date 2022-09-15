export const pixelsCanvas = document.querySelector("#pixels");
const pixelsctx = pixelsCanvas.getContext("2d");

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

  draw() {
    const y = this.y + 1300 - scrollY/5;
    if (y < -50 || y > pixelsCanvas.height + 50) {
      return;
    }

    const length = 6;

    pixelsctx.fillStyle = this.color;
    pixelsctx.fillRect(this.x - length / 2, y - length / 2, length, length);
  }
}

export class PixelsAnimation {
  pixelGap = 40;
  pixelArray;

  constructor() {
    this.setSize();
    addEventListener("resize", () => this.setSize());

    this.anim();
  }

  setSize() {
    pixelsCanvas.height = innerHeight;
    pixelsCanvas.width = innerWidth;
    this.generatePixels();
  }

  generatePixels() {
    this.pixelArray = [];

    for (let x = 0; x < pixelsCanvas.width; x += this.pixelGap) {
      for (let y = 0; y < pixelsCanvas.height * 5; y += this.pixelGap) {
        this.pixelArray.push(new Pixel(x, y, ((x) / 10) % 360));
      }
    }
  }

  drawBackground() {
    pixelsctx.clearRect(0, 0, pixelsCanvas.width, pixelsCanvas.height);

    for (let pixel of this.pixelArray) {
      pixel.updateColor();
      pixel.draw();
    }
  }

  anim() {
    requestAnimationFrame(() => this.anim());

    this.drawBackground();
  }
}