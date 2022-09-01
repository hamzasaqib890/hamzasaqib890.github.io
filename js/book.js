export const bookCanvas = document.querySelector("#book");
const bookctx = bookCanvas.getContext("2d");

export class BookAnimation {
  setSize() {
    bookCanvas.height = innerHeight;
    bookCanvas.width = innerWidth;
    this.anim();
  }

  drawPage(scrollDecimal, translateX, translateY) {
    const pathRadius =
      Math.sqrt(
        bookCanvas.height ** 2 + Math.min(bookCanvas.width, bookCanvas.height) ** 2
      ) - 10;
    const angleStart = Math.PI / 2;
    const angleEnd = Math.PI - Math.asin(bookCanvas.height / pathRadius);
    const cornerOffsetX =
      pathRadius *
      Math.cos(angleStart + (angleEnd - angleStart) * scrollDecimal);
    const cornerOffsetY =
      pathRadius *
        Math.sin(angleStart + (angleEnd - angleStart) * scrollDecimal) -
      bookCanvas.height;

    bookctx.fillStyle = "rgb(255, 255, 255)";
    bookctx.strokeStyle = "rgb(200, 200, 200)";
    bookctx.beginPath();
    bookctx.moveTo(bookCanvas.width, bookCanvas.height / 5 + 20 - translateY); // top right corner
    bookctx.lineTo(
      bookCanvas.width + cornerOffsetX - translateX,
      bookCanvas.height / 5 - cornerOffsetY + 20 - translateY
    ); // top left corner
    bookctx.lineTo(bookCanvas.width + cornerOffsetX - translateX, bookCanvas.height); // bottom left corner
    bookctx.lineTo(bookCanvas.width, bookCanvas.height); // bottom right corner
    bookctx.closePath();
    bookctx.fill();
    bookctx.stroke();
  }

  drawCover(scrollDecimal, translateX, translateY) {
    if (scrollDecimal < 0) {
      return;
    }
    const pathRadius = Math.sqrt(
      bookCanvas.height ** 2 + Math.min(bookCanvas.width, bookCanvas.height) ** 2
    );
    const angleStart = Math.PI / 2;
    const angleEnd = Math.PI - Math.asin(bookCanvas.height / pathRadius);
    const cornerOffsetX =
      pathRadius *
      Math.cos(angleStart + (angleEnd - angleStart) * scrollDecimal);
    const cornerOffsetY =
      pathRadius *
        Math.sin(angleStart + (angleEnd - angleStart) * scrollDecimal) -
      bookCanvas.height;

    bookctx.fillStyle = "#00203F";
    bookctx.beginPath();
    bookctx.moveTo(bookCanvas.width, bookCanvas.height / 5 - translateY); // top right corner
    bookctx.lineTo(
      bookCanvas.width + cornerOffsetX - translateX,
      bookCanvas.height / 5 - cornerOffsetY - translateY
    ); // top left corner
    bookctx.lineTo(bookCanvas.width + cornerOffsetX - translateX, bookCanvas.height); // bottom left corner
    bookctx.lineTo(bookCanvas.width, bookCanvas.height); // bottom right corner
    bookctx.closePath();
    bookctx.fill();
  }

  drawBook(scrollProgress) {
    let scrollDecimal = 1 - (600 - Math.min(598, scrollProgress)) / 200;
    const scrollDecimalBackCover = Math.min(
      1 - (800 - scrollProgress) / 100,
      0.94
    );
    if (scrollDecimalBackCover >= 0.98) {
      scrollDecimal = 1;
    }

    const scrollDecimalTranslate = 1 - (850 - scrollProgress) / 100;
    const translateX =
      Math.min(1, Math.max(0, scrollDecimalTranslate)) ** 2 *
      (bookCanvas.width - Math.min(bookCanvas.width, bookCanvas.height) + 80);
    const translateY =
      Math.min(1, Math.max(0, scrollDecimalTranslate)) ** 2 *
      (bookCanvas.height / 5);

    this.drawCover(scrollDecimal, translateX, translateY);
    this.drawPage(
      1 - Math.cos((Math.PI * scrollDecimal) / 2),
      translateX,
      translateY
    );
    this.drawPage(scrollDecimal ** 2, translateX, translateY);
    this.drawPage(scrollDecimal ** 3, translateX, translateY);
    this.drawPage(scrollDecimal ** 4, translateX, translateY);

    this.drawCover(scrollDecimalBackCover, translateX, translateY);
  }

  anim(scrollProgress) {
    bookctx.clearRect(0, 0, bookCanvas.width, bookCanvas.height);
    this.drawBook(scrollProgress);
  }
}