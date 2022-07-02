function getScrollPercent() {
  var h = document.documentElement,
    b = document.body,
    st = "scrollTop",
    sh = "scrollHeight";
  return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
}

addEventListener("scroll", () => {
  updateName();
  updateBackground();
  updateIntroText();
  updateStudent();
  updateDeveloper();
});

function updateName() {
  const scrollDecimal = getScrollPercent() / 100;
  const name = document.querySelector("#name");

  const hiddenNameRect = document
    .querySelector("#hiddenName")
    .getBoundingClientRect();

  const introScreenRect = document
    .querySelector("#introScreen")
    .getBoundingClientRect();

  const sizeVals = {
    0: 300,
    100: 100,
    200: 100,
  };

  const leftVals = {
    0: (innerWidth - name.clientWidth) / 2,
    100: hiddenNameRect.left,
    200: hiddenNameRect.left,
  };

  const topVals = {
    0: 570,
    100: (introScreenRect.height - hiddenNameRect.height) / 2,
    150: (introScreenRect.height - hiddenNameRect.height) / 2,
    200:
      (introScreenRect.height - hiddenNameRect.height) / 2 -
      introScreenRect.height / 4,
  };

  const size = getProgress(sizeVals, scrollDecimal);
  name.style.fontSize = `${size}px`;
  const top = getProgress(topVals, scrollDecimal);
  name.style.top = `${top}px`;
  const left = getProgress(leftVals, scrollDecimal);
  name.style.left = `${left}px`;
}

function updateIntroText() {
  const scrollPercent = getScrollPercent();
  const introText = document.querySelector("#introText");
  const introScreen = document.querySelector("#introScreen");

  const topVals = {
    0: introScreen.clientHeight,
    100: (introScreen.clientHeight - introText.clientHeight) / 2,
    150: (introScreen.clientHeight - introText.clientHeight) / 2,
    200:
      (introScreen.clientHeight - introText.clientHeight) / 2 -
      introScreen.clientHeight / 4,
    250:
      (introScreen.clientHeight - introText.clientHeight) / 2 -
      introScreen.clientHeight / 4,
    300:
      (introScreen.clientHeight - introText.clientHeight) / 2 -
      introScreen.clientHeight / 4,
  };

  const top = getProgress(topVals, scrollPercent / 100);
  introText.style.top = `${top}px`;

  const revealText = document.querySelector("#introText .reveal");

  if (scrollPercent > 33) {
    revealText.classList.add("active");
  } else if (scrollPercent < 5) {
    revealText.classList.remove("active");
  }
}

function updateStudent() {
  const scrollPercent = getScrollPercent();
  const studentText = document.querySelector("#studentText");
  const introScreen = document.querySelector("#introScreen");

  const topVals = {
    0: introScreen.clientHeight,
    100: introScreen.clientHeight,
    150: introScreen.clientHeight,
    200: (introScreen.clientHeight - studentText.scrollHeight + 80) / 2,
    250: (introScreen.clientHeight - studentText.scrollHeight + 80) / 2,
    300: (introScreen.clientHeight - studentText.scrollHeight + 80) / 2,
  };

  const top = getProgress(topVals, scrollPercent / 100);
  studentText.style.top = `${top}px`;

  if (scrollPercent > 70) {
    studentText.classList.add("active");
  } else if (scrollPercent < 40) {
    studentText.classList.remove("active");
  }
}

function updateDeveloper() {
  const scrollPercent = getScrollPercent();
  const developerText = document.querySelector("#developerText");
  const introScreen = document.querySelector("#introScreen");

  const topVals = {
    0: introScreen.clientHeight,
    100: introScreen.clientHeight,
    150: introScreen.clientHeight,
    200: introScreen.clientHeight,
    250: introScreen.clientHeight,
    275: (introScreen.clientHeight - developerText.scrollHeight + 80) / 2,
  };

  const top = getProgress(topVals, scrollPercent / 100);
  developerText.style.top = `${top}px`;

  if (scrollPercent > 95) {
    developerText.classList.add("active");
  } else if (scrollPercent < 70) {
    developerText.classList.remove("active");
  }
}

function updateBackground() {
  const scrollDecimal = getScrollPercent() / 100;

  const opacityVals = { 0: 100, 100: 0, 200: 0 };

  const opacity = getProgress(opacityVals, scrollDecimal);

  const bg = document.querySelector("#background");
  bg.style.opacity = `${opacity}%`;
}

function getProgress(vals, progressPercent) {
  const totalHeight = 400;
  const progress = Math.floor(progressPercent * (totalHeight - 100));

  const startProgress = (() => {
    const start = Math.floor(progress / 25) * 25;
    for (let i = 0; i < totalHeight; i += 25) {
      if (start - i in vals) {
        return start - i;
      }
    }
  })();
  if (startProgress == progress) {
    return vals[startProgress];
  }

  const endProgress = (() => {
    const start = Math.floor(progress / 25 + 1) * 25;
    for (let i = 0; i < totalHeight; i += 25) {
      if (start + i in vals) {
        return start + i;
      }
    }
  })();

  const sectionProgress =
    (progress - startProgress) / (endProgress - startProgress);

  return (
    vals[startProgress] +
    (vals[endProgress] - vals[startProgress]) * sectionProgress
  );
}

window.onload = () => {
  updateName();
  updateIntroText();
  updateBackground();
  updateStudent();
  updateDeveloper();
};
