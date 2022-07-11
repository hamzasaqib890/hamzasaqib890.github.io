const canvas = document.querySelector("#book");
const ctx = canvas.getContext("2d");

setSize();

addEventListener("resize", setSize);

const docElem = document.documentElement;
const body = document.body;
function getScrollDecimal() {
  return (
    (docElem["scrollTop"] || body["scrollTop"]) /
    ((docElem["scrollHeight"] || body["scrollHeight"]) - docElem.clientHeight)
  );
}

function setSize() {
  canvas.height = innerHeight;
  canvas.width = innerWidth;
}

class BookAnimation {
  constructor() {
    this.anim();
  }

  drawPage(scrollDecimal = 0) {
    const pathRadius =
      Math.sqrt(canvas.height ** 2 + (canvas.height / 2) ** 2) - 10;
    const angleStart = Math.asin(canvas.height / pathRadius);
    const angleEnd = Math.PI - angleStart;
    const cornerOffsetX =
      pathRadius *
      Math.cos(angleStart + (angleEnd - angleStart) * scrollDecimal);
    const cornerOffsetY =
      pathRadius *
        Math.sin(angleStart + (angleEnd - angleStart) * scrollDecimal) -
      canvas.height;

    ctx.fillStyle = "rgb(255, 255, 255)";
    ctx.strokeStyle = "rgb(200, 200, 200)";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2 + 20);
    ctx.lineTo(
      canvas.width / 2 + cornerOffsetX,
      canvas.height / 2 - cornerOffsetY + 20
    );
    ctx.lineTo(canvas.width / 2 + cornerOffsetX, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  drawCover(scrollDecimal) {
    const pathRadius = Math.sqrt(canvas.height ** 2 + (canvas.height / 2) ** 2);
    const angleStart = Math.asin(canvas.height / pathRadius);
    const angleEnd = Math.PI - angleStart;
    const cornerOffsetX =
      pathRadius *
      Math.cos(angleStart + (angleEnd - angleStart) * scrollDecimal);
    const cornerOffsetY =
      pathRadius *
        Math.sin(angleStart + (angleEnd - angleStart) * scrollDecimal) -
      canvas.height;

    ctx.fillStyle = "rgb(30, 30, 140)";
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, canvas.height / 2);
    ctx.lineTo(
      canvas.width / 2 + cornerOffsetX,
      canvas.height / 2 - cornerOffsetY
    );
    ctx.lineTo(canvas.width / 2 + cornerOffsetX, canvas.height);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.closePath();
    ctx.fill();
  }

  drawBook() {
    ctx.fillStyle = "rgb(30, 30, 140)";
    ctx.fillRect(
      canvas.width / 2,
      canvas.height / 2,
      canvas.height / 2,
      canvas.height
    );

    const scrollDecimal = getScrollDecimal();

    if (1 - Math.cos((Math.PI * scrollDecimal) / 2) < 0.5) {
      this.drawPage();
      this.drawPage(scrollDecimal ** 4);
      this.drawPage(scrollDecimal ** 3);
      this.drawPage(scrollDecimal ** 2);
      this.drawPage(1 - Math.cos((Math.PI * scrollDecimal) / 2));
      this.drawCover(scrollDecimal);
    } else if (scrollDecimal ** 2 < 0.5) {
      this.drawPage();
      this.drawPage(scrollDecimal ** 4);
      this.drawPage(scrollDecimal ** 3);
      this.drawPage(scrollDecimal ** 2);

      this.drawCover(scrollDecimal);
      this.drawPage(1 - Math.cos((Math.PI * scrollDecimal) / 2));
    } else if (scrollDecimal ** 3 < 0.5) {
      this.drawPage();
      this.drawPage(scrollDecimal ** 4);
      this.drawPage(scrollDecimal ** 3);

      this.drawCover(scrollDecimal);
      this.drawPage(1 - Math.cos((Math.PI * scrollDecimal) / 2));
      this.drawPage(scrollDecimal ** 2);
    } else if (scrollDecimal ** 4 < 0.5) {
      this.drawPage();
      this.drawPage(scrollDecimal ** 4);

      this.drawCover(scrollDecimal);
      this.drawPage(1 - Math.cos((Math.PI * scrollDecimal) / 2));
      this.drawPage(scrollDecimal ** 2);
      this.drawPage(scrollDecimal ** 3);
    } else {
      this.drawCover(scrollDecimal);
      this.drawPage(1 - Math.cos((Math.PI * scrollDecimal) / 2));
      this.drawPage(scrollDecimal ** 2);
      this.drawPage(scrollDecimal ** 3);
      this.drawPage(scrollDecimal ** 4);
      ctx.strokeStyle = "rgb(200, 200, 200)";
      ctx.beginPath();
      ctx.moveTo(canvas.width / 2, canvas.height / 2 + 20);
      ctx.lineTo(canvas.width / 2, canvas.height);
      ctx.stroke();
      this.drawPage();
    }
  }

  anim() {
    requestAnimationFrame(() => this.anim());

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBook();
  }
}

onload = () => new BookAnimation();
