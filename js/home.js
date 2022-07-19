const docElem = document.documentElement;
const body = document.body;
const canvas = document.querySelector("#book");
const ctx = canvas.getContext("2d");

function getScrollDecimal() {
  return (
    (docElem["scrollTop"] || body["scrollTop"]) /
    ((docElem["scrollHeight"] || body["scrollHeight"]) - docElem.clientHeight)
  );
}

function getScrollProgress() {
  return Math.floor(
    getScrollDecimal() *
      ((100 * body.clientHeight) / docElem.clientHeight - 100)
  );
}

class BookAnimation {
  setSize() {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    this.anim();
  }

  drawPage(scrollDecimal, translateX, translateY) {
    const pathRadius =
      Math.sqrt(
        canvas.height ** 2 + Math.min(canvas.width, canvas.height) ** 2
      ) - 10;
    const angleStart = Math.PI / 2;
    const angleEnd = Math.PI - Math.asin(canvas.height / pathRadius);
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
    ctx.moveTo(canvas.width, canvas.height / 5 + 20 - translateY); // top right corner
    ctx.lineTo(
      canvas.width + cornerOffsetX - translateX,
      canvas.height / 5 - cornerOffsetY + 20 - translateY
    ); // top left corner
    ctx.lineTo(canvas.width + cornerOffsetX - translateX, canvas.height); // bottom left corner
    ctx.lineTo(canvas.width, canvas.height); // bottom right corner
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }

  drawCover(scrollDecimal, translateX, translateY) {
    if (scrollDecimal < 0) {
      return;
    }
    const pathRadius = Math.sqrt(
      canvas.height ** 2 + Math.min(canvas.width, canvas.height) ** 2
    );
    const angleStart = Math.PI / 2;
    const angleEnd = Math.PI - Math.asin(canvas.height / pathRadius);
    const cornerOffsetX =
      pathRadius *
      Math.cos(angleStart + (angleEnd - angleStart) * scrollDecimal);
    const cornerOffsetY =
      pathRadius *
        Math.sin(angleStart + (angleEnd - angleStart) * scrollDecimal) -
      canvas.height;

    ctx.fillStyle = "#00203F";
    ctx.beginPath();
    ctx.moveTo(canvas.width, canvas.height / 5 - translateY); // top right corner
    ctx.lineTo(
      canvas.width + cornerOffsetX - translateX,
      canvas.height / 5 - cornerOffsetY - translateY
    ); // top left corner
    ctx.lineTo(canvas.width + cornerOffsetX - translateX, canvas.height); // bottom left corner
    ctx.lineTo(canvas.width, canvas.height); // bottom right corner
    ctx.closePath();
    ctx.fill();
  }

  drawBook() {
    let scrollDecimal = 1 - (600 - Math.min(598, getScrollProgress())) / 200;
    const scrollDecimalBackCover = Math.min(
      1 - (800 - getScrollProgress()) / 100,
      0.94
    );
    if (scrollDecimalBackCover >= 0.98) {
      scrollDecimal = 1;
    }

    const scrollDecimalTranslate = 1 - (850 - getScrollProgress()) / 100;
    const translateX =
      Math.min(1, Math.max(0, scrollDecimalTranslate)) ** 2 *
      (canvas.width - Math.min(canvas.width, canvas.height) + 80);
    const translateY =
      Math.min(1, Math.max(0, scrollDecimalTranslate)) ** 2 *
      (canvas.height / 5);

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

  anim() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    this.drawBook();
  }
}

class ScrollAnimation {
  static #animations = [];

  static #addAnimation(propertySetter, keyframes) {
    this.#animations.push({
      setProperty: propertySetter,
      keyframes: keyframes,
      keys: Object.keys(keyframes).map(Number).sort(),
    });
  }

  static addAll() {
    this.#animations = [];
    const hiddenName = document.querySelector("#hiddenName");
    const nameFirst = document.querySelector("#nameFirst");
    const nameLast = document.querySelector("#nameLast");
    const hiddenFirstStartRect = document
      .querySelector("#hiddenFirstStart")
      .getBoundingClientRect();
    const hiddenLastStartRect = document
      .querySelector("#hiddenLastStart")
      .getBoundingClientRect();
    const hiddenFirstEndRect = document
      .querySelector("#hiddenFirstEnd")
      .getBoundingClientRect();
    const introScreen = document.querySelector("#introScreen");
    const introText = document.querySelector("#introText");
    const studentText = document.querySelector("#studentText");
    const uwlogo = document.querySelector("#uwlogo");
    const developerText = document.querySelector("#developerText");
    const sdDefinition = document.querySelector("#sdDefinition");
    const creativityText = document.querySelector("#creativity");
    const creativityRainbowText = document.querySelector("#creativityRainbow");
    const pixelsScreen = document.querySelector("#pixels");

    const fontSizeAttr = getComputedStyle(body).getPropertyValue("font-size");

    hiddenName.style.bottom = `${innerHeight * 0.3}px`;

    this.#addAnimation(
      (val) => {
        introScreen.style.backgroundColor = `rgba(0,0,0,${val})`;
      },
      { 0: 0, 100: 1 }
    );

    this.#addAnimation(
      (val) => {
        nameFirst.style.fontSize = `${val}px`;
        nameLast.style.fontSize = `${val}px`;
      },
      {
        0: parseInt(getComputedStyle(hiddenName).fontSize, 10),
        100: parseInt(fontSizeAttr, 10),
      }
    );

    this.#addAnimation(
      (val) => {
        nameFirst.style.left = `${val}px`;
      },
      {
        0: hiddenFirstStartRect.left,
        100: hiddenFirstEndRect.left,
      }
    );
    nameLast.style.left = `${hiddenLastStartRect.left}px`;

    this.#addAnimation(
      (val) => {
        nameLast.style.opacity = `${val}%`;
      },
      {
        0: 100,
        60: 0,
      }
    );
    nameLast.style.top = `${hiddenLastStartRect.top - 65}px`;

    this.#addAnimation(
      (val) => {
        nameFirst.style.top = `${val}px`;
      },
      {
        0: hiddenFirstStartRect.top - 65,
        100: (introScreen.clientHeight - introText.clientHeight) / 2,
        150: (introScreen.clientHeight - introText.clientHeight) / 2,
        200:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40,
        400:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40,
        500:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40 -
          innerHeight,
      }
    );

    this.#addAnimation(
      (val) => {
        introText.style.top = `${val}px`;
      },
      {
        0: introScreen.clientHeight,
        100: (introScreen.clientHeight - introText.clientHeight) / 2,
        150: (introScreen.clientHeight - introText.clientHeight) / 2,
        200:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40,
        400:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40,
        500:
          (innerHeight - studentText.clientHeight) / 2 -
          introText.clientHeight -
          innerHeight / 40 -
          innerHeight,
      }
    );

    uwlogo.style.height = `${hiddenFirstEndRect.height}px`;
    this.#addAnimation(
      (val) => {
        studentText.style.top = `${val}px`;
      },
      {
        150: introScreen.clientHeight,
        200: (innerHeight - studentText.clientHeight) / 2,
        400: (innerHeight - studentText.clientHeight) / 2,
        500: (innerHeight - studentText.clientHeight) / 2 - innerHeight,
      }
    );

    this.#addAnimation(
      (val) => {
        developerText.style.top = `${val}px`;
      },
      {
        250: introScreen.clientHeight,
        275:
          (innerHeight - studentText.clientHeight) / 2 +
          studentText.clientHeight +
          innerHeight / 40,
        400:
          (innerHeight - studentText.clientHeight) / 2 +
          studentText.clientHeight +
          innerHeight / 40,
        500:
          (innerHeight - studentText.clientHeight) / 2 +
          studentText.clientHeight +
          innerHeight / 40 -
          innerHeight,
      }
    );

    sdDefinition.style.top = `${canvas.height / 5}px`;
    sdDefinition.style.left = `${Math.max(canvas.width - canvas.height, 0)}px`;
    sdDefinition.style.width = `${
      Math.min(canvas.height, canvas.width) - 80
    }px`;
    sdDefinition.style.height = `${(canvas.height * 4) / 5}px`;

    this.#addAnimation(
      (val) => {
        sdDefinition.style.opacity = `${val}%`;
      },
      {
        590: 0,
        600: 100,
        700: 100,
        710: 0,
      }
    );

    creativityRainbowText.style.left = `${
      creativityText.getBoundingClientRect().left
    }px`;
    creativityRainbowText.style.top = `${
      creativityText.getBoundingClientRect().top
    }px`;

    this.#addAnimation(
      (val) => {
        if (getScrollProgress() < 900) {
          creativityRainbowText.style.display = "none";
          return;
        }
        creativityRainbowText.style.display = "block";
        creativityRainbowText.style.opacity = `${val}%`;
      },
      {
        900: 0,
        999: 100,
      }
    );

    this.#addAnimation(
      (val) => {
        creativityRainbowText.style.fontSize = `${val ** 4}%`;
      },
      {
        1100: 100 ** (1 / 4),
        1300: 10000 ** (1 / 4),
      }
    );

    this.#addAnimation(
      (val) => {
        creativityRainbowText.style.left = `${
          val - creativityRainbowText.getBoundingClientRect().width / 2
        }px`;
      },
      {
        1100:
          creativityText.getBoundingClientRect().left +
          creativityText.getBoundingClientRect().width / 2,
        1300: innerWidth / 2,
      }
    );
    this.#addAnimation(
      (val) => {
        creativityRainbowText.style.top = `${
          val - creativityRainbowText.getBoundingClientRect().height / 2
        }px`;
      },
      {
        1100:
          creativityText.getBoundingClientRect().top +
          creativityText.getBoundingClientRect().height / 2,
        1300: innerHeight / 2,
      }
    );

    this.#addAnimation(
      (val) => {
        pixelsScreen.style.opacity = `${val ** 2}%`;
      },
      { 1200: 0, 1300: 100 ** (1 / 2) }
    );
  }

  static #updateAnimation(animation, scrollProgress) {
    if (animation.keys.length === 0) {
      return;
    }

    const startKey = (() => {
      if (animation.keys[0] >= scrollProgress) {
        return animation.keys[0];
      }
      for (let i = 1; i < animation.keys.length; i++) {
        if (animation.keys[i] > scrollProgress) {
          return animation.keys[i - 1];
        }
      }
      return animation.keys[animation.keys.length - 1];
    })();
    const startFrame = animation.keyframes[startKey.toString()];

    if (startKey >= scrollProgress) {
      animation.setProperty(startFrame);
      return;
    }

    const endKey = (() => {
      if (animation.keys[0] >= scrollProgress) {
        return animation.keys[0];
      }
      for (let i = 1; i < animation.keys.length; i++) {
        if (animation.keys[i] >= scrollProgress) {
          return animation.keys[i];
        }
      }
      return animation.keys[animation.keys.length - 1];
    })();
    const endFrame = animation.keyframes[endKey.toString()];

    if (endKey <= scrollProgress) {
      animation.setProperty(endFrame);
      return;
    }

    const sectionProgress = (scrollProgress - startKey) / (endKey - startKey);

    animation.setProperty(
      startFrame + (endFrame - startFrame) * sectionProgress
    );
  }

  static updateAll() {
    const scrollProgress = getScrollProgress();

    for (let animation of this.#animations) {
      this.#updateAnimation(animation, scrollProgress);
    }
  }
}

class Reveal {
  static #reveals = [];

  static #addReveal(element, appear, disappear) {
    this.#reveals.push({
      element: element,
      appear: appear,
      disappear: disappear,
    });
  }

  static addAll() {
    const heyText = document.querySelector("#heyText");
    const studentText = document.querySelector("#studentText");
    const developerText = document.querySelector("#developerText");
    const psText = document.querySelector("#problemSolvingText");
    const expressingText = document.querySelector("#expressingText");
    const thinkingImg = document.querySelector("#thinking");

    this.#addReveal(heyText, 100, 0);
    this.#addReveal(studentText, 200, 100);
    this.#addReveal(developerText, 300, 175);
    this.#addReveal(psText, 850, 820);
    this.#addReveal(expressingText, 850, 820);
  }

  static updateAll() {
    const scrollProgress = getScrollProgress();

    for (let reveal of this.#reveals) {
      if (scrollProgress >= reveal.appear) {
        reveal.element.classList.add("active");
      } else if (scrollProgress <= reveal.disappear) {
        reveal.element.classList.remove("active");
      }
    }
  }
}

const bookAnimation = new BookAnimation();
bookAnimation.setSize();

addEventListener("scroll", () => {
  ScrollAnimation.updateAll();
  Reveal.updateAll();
  if (getScrollProgress() > 400) {
    canvas.style.display = "block";
    bookAnimation.anim();
  } else {
    canvas.style.display = "none";
  }
});

addEventListener("resize", () => {
  bookAnimation.setSize();
  ScrollAnimation.addAll();
  ScrollAnimation.updateAll();
  Reveal.updateAll();
});

window.onload = () => {
  ScrollAnimation.addAll();
  ScrollAnimation.addAll();
  ScrollAnimation.updateAll();
  Reveal.addAll();
  Reveal.updateAll();
};
