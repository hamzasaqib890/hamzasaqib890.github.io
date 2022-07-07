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
      }
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

    this.#addReveal(heyText, 100, 0);
    this.#addReveal(studentText, 200, 100);
    this.#addReveal(developerText, 275, 175);
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

addEventListener("scroll", () => {
  ScrollAnimation.updateAll();
  Reveal.updateAll();
});

addEventListener("resize", () => {
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
