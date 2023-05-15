import c from "/src/assets/tech/c.svg";
import cpp from "/src/assets/tech/cplusplus.svg";
import css from "/src/assets/tech/css3.svg";
import html from "/src/assets/tech/html5.svg";
import django from "/src/assets/tech/django.svg";
import js from "/src/assets/tech/javascript.svg";
import kotlin from "/src/assets/tech/kotlin.svg";
import next from "/src/assets/tech/nextdotjs.svg";
import node from "/src/assets/tech/nodedotjs.svg";
import python from "/src/assets/tech/python.svg";
import react from "/src/assets/tech/react.svg";

const technologies = {
  C: { imgSrc: c, color: "#A8B9CC" },
  "C++": { imgSrc: cpp, color: "#00599C" },
  CSS: { imgSrc: css, color: "#1572B6" },
  HTML: { imgSrc: html, color: "#E34F26" },
  JavaScript: { imgSrc: js, color: "#F7DF1E" },
  Kotlin: { imgSrc: kotlin, color: "#7F52FF" },
  "Next.js": { imgSrc: next, color: "#000000" },
  "Node.js": { imgSrc: node, color: "#339933" },
  Python: { imgSrc: python, color: "#3776AB" },
  React: { imgSrc: react, color: "#61DAFB" },
  Django: { imgSrc: django, color: "#092E20" },
};

const TechChip = ({ name }) => {
  return (
    <img
      src={technologies[name].imgSrc}
      style={{ backgroundColor: technologies[name].color }}
      className={`rounded-full w-8 h-8 p-1`}
      title={name}
    />
  );
};

export default TechChip;
