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
    const background = document.querySelector("#background");
    const name = document.querySelector("#name");
    const hiddenNameRect = document
      .querySelector("#hiddenName")
      .getBoundingClientRect();
    const introScreenRect = document
      .querySelector("#introScreen")
      .getBoundingClientRect();
    const introScreen = document.querySelector("#introScreen");
    const introText = document.querySelector("#introText");
    const studentText = document.querySelector("#studentText");
    const developerText = document.querySelector("#developerText");

    this.#addAnimation(
      (val) => {
        background.style.opacity = `${val}%`;
      },
      { 0: 100, 100: 0 }
    );

    this.#addAnimation(
      (val) => {
        name.style.fontSize = `${val}px`;
      },
      { 0: 300, 100: 100 }
    );

    this.#addAnimation(
      (val) => {
        name.style.left = `${val}px`;
      },
      {
        0: (innerWidth - name.clientWidth) / 2,
        100: hiddenNameRect.left,
      }
    );

    this.#addAnimation(
      (val) => {
        name.style.top = `${val}px`;
      },
      {
        0: 570,
        100: (introScreenRect.height - hiddenNameRect.height) / 2,
        150: (introScreenRect.height - hiddenNameRect.height) / 2,
        200:
          (introScreenRect.height - hiddenNameRect.height) / 2 -
          introScreenRect.height / 4,
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
          (introScreen.clientHeight - introText.clientHeight) / 2 -
          introScreen.clientHeight / 4,
      }
    );

    this.#addAnimation(
      (val) => {
        studentText.style.top = `${val}px`;
      },
      {
        150: introScreen.clientHeight,
        200: (introScreen.clientHeight - studentText.scrollHeight + 80) / 2,
      }
    );

    this.#addAnimation(
      (val) => {
        developerText.style.top = `${val}px`;
      },
      {
        250: introScreen.clientHeight,
        275: (introScreen.clientHeight - developerText.scrollHeight + 80) / 2,
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
  ScrollAnimation.updateAll();
  Reveal.addAll();
  Reveal.updateAll();
};
