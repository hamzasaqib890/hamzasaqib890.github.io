import {bookCanvas, BookAnimation} from "./book.js"
import {pixelsCanvas, PixelsAnimation} from "./pixels.js"

const docElem = document.documentElement;
const body = document.body;

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
    const socials = document.querySelector("#introSocials");
    const sdDefinition = document.querySelector("#sdDefinition");
    const creativityText = document.querySelector("#creativity");
    const creativityRainbowText = document.querySelector("#creativityRainbow");
    const opportunitiesText = document.querySelector("#opportunitiesText");

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

    nameFirst.style.left = `${hiddenFirstStartRect.left}px`;
    this.#addAnimation(
      (val) => {
        nameFirst.style.translateX = val - hiddenFirstStartRect.left;
        nameFirst.style.translate = `${nameFirst.style.translateX}px ${nameFirst.style.translateY}px`
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

    nameFirst.style.top = `${hiddenFirstStartRect.top - 65}px`
    this.#addAnimation(
      (val) => {
        nameFirst.style.translateY = val - (hiddenFirstStartRect.top - 65);
        nameFirst.style.translate = `${nameFirst.style.translateX}px ${nameFirst.style.translateY}px`
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

    introText.style.top = `${introScreen.clientHeight}px`
    this.#addAnimation(
      (val) => {
        introText.style.translate= `0 ${val - introScreen.clientHeight}px`;
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
    studentText.style.top = `${introScreen.clientHeight}px`;
    this.#addAnimation(
      (val) => {
        studentText.style.translate = `0 ${val - introScreen.clientHeight}px`;
      },
      {
        150: introScreen.clientHeight,
        200: (innerHeight - studentText.clientHeight) / 2,
        400: (innerHeight - studentText.clientHeight) / 2,
        500: (innerHeight - studentText.clientHeight) / 2 - innerHeight,
      }
    );

    developerText.style.top = `${introScreen.clientHeight}px`
    this.#addAnimation(
      (val) => {
        developerText.style.translate = `0 ${val - introScreen.clientHeight}px`;
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

    socials.style.bottom = `${20}px`
    this.#addAnimation(
      (val) => {
        socials.style.translate = `0 -${val - 20}px`;
      },
      {
        400: 20,
        500: innerHeight + 20,
      }
    );

    sdDefinition.style.top = `${bookCanvas.height / 5}px`;
    sdDefinition.style.left = `${Math.max(bookCanvas.width - bookCanvas.height, 0)}px`;
    sdDefinition.style.width = `${
      Math.min(bookCanvas.height, bookCanvas.width) - 80
    }px`;
    sdDefinition.style.height = `${(bookCanvas.height * 4) / 5}px`;

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
        creativityRainbowText.style.opacity = `${val}%`;
      },
      {
        900: 0,
        999: 100,
      }
    );

    this.#addAnimation(
      (val) => {
        creativityRainbowText.style.scale = `${val ** 4}`;
      },
      {
        1100: 1 ** (1 / 4),
        1300: 150 ** (1 / 4),
      }
    );

    this.#addAnimation(
      (val) => {
        pixelsCanvas.style.opacity = `${val ** 2}%`;
      },
      { 1200: 0, 1300: 100 ** (1 / 2) }
    );

    opportunitiesText.style.top = `40%`;
    this.#addAnimation(
      (val) => {
        opportunitiesText.style.translate = `0 ${(val - 40) / 100 * innerHeight}px`;
      },
      { 1350: 40, 1600: 0 }
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

  static #addReveal(element, appear, disappear, className="active") {
    this.#reveals.push({
      element: element,
      appear: appear,
      disappear: disappear,
      className: className
    });
  }

  static addAll() {
    const heyText = document.querySelector("#heyText");
    const studentText = document.querySelector("#studentText");
    const developerText = document.querySelector("#developerText");
    const psText = document.querySelector("#problemSolvingText");
    const expressingText = document.querySelector("#expressingText");
    const opportunitiesText = document.querySelector("#opportunitiesText");
    const timeline = document.querySelector(".timeline");
    const contents = document.querySelectorAll(".content");
    const containers = document.querySelectorAll(".container");

    this.#addReveal(heyText, 100, 0);
    this.#addReveal(studentText, 200, 100);
    this.#addReveal(developerText, 300, 175);
    this.#addReveal(psText, 850, 820);
    this.#addReveal(expressingText, 850, 820);
    this.#addReveal(opportunitiesText, 1350, 1300);
    this.#addReveal(timeline, 1600, 1600);
    for (let i = 0; i < 4; i++) {
      this.#addReveal(containers[i], 1600 + i * 100, 1600)
      this.#addReveal(containers[i], 2100, 2100, "hidden")
      this.#addReveal(contents[i], 1600 + i * 100, 1600)
    }
  }

  static updateAll() {
    const scrollProgress = getScrollProgress();

    for (let reveal of this.#reveals) {
      if (scrollProgress >= reveal.appear) {
        reveal.element.classList.add(reveal.className);
      } else if (scrollProgress <= reveal.disappear) {
        reveal.element.classList.remove(reveal.className);
      }
    }
  }
}

class DisplayControl {
  static #visibleRanges = []

  static #addRange(element, visibleMin, visibleMax, display="block") {
    this.#visibleRanges.push({
      element: element,
      visibleMin: visibleMin,
      visibleMax: visibleMax,
      display: display
    });
  }

  static addAll() {
    this.#addRange(bookCanvas, 400, 905);
    this.#addRange(pixelsCanvas, 1200, 2500);
    this.#addRange(document.querySelector("#hiddenName"), -50, 100);
    this.#addRange(document.querySelector("#nameFirst"), -50, 500);
    this.#addRange(document.querySelector("#nameLast"), -50, 60);
    this.#addRange(document.querySelector("#introPage"), 0, 500);
    this.#addRange(document.querySelector("#sdDefinition"), 585, 710);
    this.#addRange(document.querySelector("#creativityPage"), 820, 1300, "flex");
    this.#addRange(document.querySelector("#creativityRainbow"), 900, 1300);
    this.#addRange(document.querySelector("#opportunitiesText"), 1300, 2500);
    this.#addRange(document.querySelector(".timeline"), 1500, 2500, "flex");
  }

  static displayAll() {
    for (let range of this.#visibleRanges) {
      range.element.style.display = range.display;;
    }
  }

  static updateAll() {
    const scrollProgress = getScrollProgress();

    for (let range of this.#visibleRanges) {
      if (scrollProgress > range.visibleMin && scrollProgress < range.visibleMax) {
        range.element.style.display = range.display;
      } else {
        range.element.style.display = "none";
      }
    }
  }
}

const bookAnimation = new BookAnimation();
bookAnimation.setSize();

addEventListener("scroll", () => {
  ScrollAnimation.updateAll();
  Reveal.updateAll();
  DisplayControl.updateAll();
  if (getScrollProgress() > 900) {
    document.querySelector("#creativityPage").classList.add("bookColour");
  } else {
    document.querySelector("#creativityPage").classList.remove("bookColour");
  }
  if (getScrollProgress() > 2100) {
    document.querySelector("#content4").classList.add("expand");
  } else {
    document.querySelector("#content4").classList.remove("expand");
  }
  if (getScrollProgress() > 2100) {
    document.querySelector(".timeline").classList.add("hidden");
  } else {
    document.querySelector(".timeline").classList.remove("hidden");
  }
  bookAnimation.anim(getScrollProgress());
});

addEventListener("resize", () => {
  DisplayControl.displayAll();
  bookAnimation.setSize();
  ScrollAnimation.addAll();
  ScrollAnimation.addAll();
  ScrollAnimation.updateAll();
  Reveal.updateAll();
  DisplayControl.updateAll();
});

window.onload = () => {
  ScrollAnimation.addAll();
  ScrollAnimation.addAll();
  ScrollAnimation.updateAll();
  Reveal.addAll();
  Reveal.updateAll();
  new PixelsAnimation();
  DisplayControl.addAll();
  DisplayControl.updateAll();
  document.querySelector("#returnTop").addEventListener("click", () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  })
  document.querySelector("#nameFirst").classList.remove("hidden");
  document.querySelector("#nameLast").classList.remove("hidden");
  document.querySelector("#creativityRainbow").classList.remove("hidden");
  document.querySelector("#introScreen").classList.remove("hidden");
};
