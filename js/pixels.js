const canvas = document.querySelector("#pixels");
const ctx = canvas.getContext("2d");
ctx.filter = "blur(1000px)";

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

  draw(horTotalOffset, verTotalOffset, magnifyX, magnifyY) {
    const y = this.y - scrollY / 4;
    if (y < -50 || y > canvas.height + 50) {
      return;
    }

    const dist = Math.sqrt((magnifyX - this.x) ** 2 + (magnifyY - y) ** 2);
    const length = (1 - Math.min(dist, 250) / 250) * 20 + 6;

    if (length === 6) {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x - length / 2, y - length / 2, length, length);
    } else {
      const horOffset = (1 - dist / 250) * horTotalOffset;
      const verOffset = (1 - dist / 250) * verTotalOffset;

      const rgb = hslToRgb(this.hue / 360, 1, 0.5);

      ctx.fillStyle = `hsl(360, 100%, ${(rgb[0] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + horOffset,
        y - length / 2 + verOffset,
        length / 3,
        length
      );
      ctx.fillStyle = `hsl(120, 100%, ${(rgb[1] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + length / 3 + horOffset,
        y - length / 2 + verOffset,
        length / 3,
        length
      );
      ctx.fillStyle = `hsl(240, 100%, ${(rgb[2] / 255 / 4) * 100 + 25}%)`;
      ctx.fillRect(
        this.x - length / 2 + (2 * length) / 3 + horOffset,
        y - length / 2 + verOffset,
        length / 3,
        length
      );
    }
  }
}

class PixelsAnimation {
  pixelGap = 40;
  pixelArray;

  constructor() {
    this.setSize();
    addEventListener("resize", () => this.setSize());

    this.magnify = {
      x: 100,
      y: 400,
      radius: 250,
      width: 15,
    };

    addEventListener("scroll", () => {
      this.magnify.x = scrollY * 1.4 + 100;
      this.magnify.y = scrollY * 0.5 + 400;
    });

    this.anim();

    /*addEventListener("mousemove", (e) => {
      circle.x = e.clientX;
      circle.y = e.clientY;
    });*/
  }

  setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    this.generatePixels();
  }

  generatePixels() {
    this.pixelArray = [];

    for (let x = 0; x < canvas.width; x += this.pixelGap) {
      for (let y = 0; y < canvas.height * 2; y += this.pixelGap) {
        this.pixelArray.push(new Pixel(x, y, ((x + y) / 10) % 360));
      }
    }
  }

  drawBackground() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const horTotalOffset = (this.magnify.x - canvas.width / 2) / 15;
    const verTotalOffset = (this.magnify.y - innerHeight / 2) / 15;

    for (let pixel of this.pixelArray) {
      pixel.updateColor();
      pixel.draw(
        horTotalOffset,
        verTotalOffset,
        this.magnify.x,
        this.magnify.y
      );
    }
  }

  drawMagnify() {
    ctx.strokeStyle = "rgb(255, 255, 255)";
    ctx.lineWidth = this.magnify.width;
    ctx.beginPath();
    ctx.arc(
      this.magnify.x,
      this.magnify.y,
      this.magnify.radius,
      0,
      Math.PI * 2,
      true
    );
    ctx.stroke();
  }

  anim() {
    requestAnimationFrame(() => this.anim());

    this.drawBackground();
    this.drawMagnify();
  }
}

onload = () => new PixelsAnimation();
