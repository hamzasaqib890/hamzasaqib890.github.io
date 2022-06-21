const canvas = document.querySelector("#colors");
const ctx = canvas.getContext("2d");
const placeholder = document.querySelector("h1");

setSize();

addEventListener("resize", setSize);

function setSize() {
  canvas.height = 0.9 * innerHeight;
  canvas.width = 0.9 * innerWidth;
}

class Circle {
  static rx = (canvas.height * canvas.width) / 12000;
  static ry = (canvas.height * canvas.width) / 12000;
  static speed = 0.01;
  static minRadius = (canvas.height * canvas.width) / 5000;
  static maxRadius = (canvas.height * canvas.width) / 2000;

  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.angle = Math.random() * 2 * Math.PI;
    this.radius =
      Math.random() * (Circle.maxRadius - Circle.minRadius) + Circle.minRadius;
    this.firstColor = `hsla(${Math.random() * 360}, 100%, 55%, 1)`;
    this.secondColor = `hsla(${Math.random() * 360}, 100%, 60%, 0)`;
  }

  draw() {
    this.angle += Circle.speed;
    const x = this.x + Math.cos(this.angle) * Circle.rx;
    const y = this.y + Math.sin(this.angle) * Circle.ry;
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, this.radius);
    gradient.addColorStop(0, this.firstColor);
    gradient.addColorStop(1, this.secondColor);

    ctx.globalCompositeOperation = "overlay";
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(x, y, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

class GradientAnimation {
  circlesNum = (canvas.height * canvas.width) / 20000;

  constructor() {
    this.generateCircles();
    this.anim();
  }

  generateCircles() {
    this.circles = [];
    for (let i = 0; i < this.circlesNum; i++) {
      this.circles.push(new Circle());
    }
  }

  drawCircles() {
    this.circles.forEach((circle) => circle.draw());
  }

  anim() {
    requestAnimationFrame(() => this.anim());

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawCircles();
  }
}

onload = () => new GradientAnimation();
