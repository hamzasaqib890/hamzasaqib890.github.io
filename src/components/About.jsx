import { useState } from "react";
import Tilt from "react-parallax-tilt";
import portrait from "/src/assets/portrait.jpg";
import TechChip from "/src/components/TechChip";

const isSafari =
  /constructor/i.test(window.HTMLElement) ||
  (function (p) {
    return p.toString() === "[object SafariRemoteNotification]";
  })(
    !window["safari"] ||
      (typeof safari !== "undefined" && window["safari"].pushNotification)
  );

const Tabs = () => {
  const [selected, setSelected] = useState(0);
  const selectedClasses =
    "border-neutral-200 bg-gradient-to-r from-cyan-500 to-green-500";
  const unselectedClasses =
    "border-gray-500 bg-neutral-800 hover:bg-neutral-700";

  return (
    <div className="flex flex-col items-center justify-center mt-4 gap-8">
      <div className="flex text-[1.1rem] font-semibold max-w-[636px] w-full">
        <button
          className={`${
            selected === 0 ? selectedClasses : unselectedClasses
          } border py-2 rounded-l-full grow`}
          onClick={() => setSelected(0)}
        >
          Skills
        </button>
        <button
          className={`${
            selected === 1 ? selectedClasses : unselectedClasses
          } border py-2 grow`}
          onClick={() => setSelected(1)}
        >
          Learning
        </button>
        <button
          className={`${
            selected === 2 ? selectedClasses : unselectedClasses
          } border py-2 rounded-r-full grow`}
          onClick={() => setSelected(2)}
        >
          Hobbies
        </button>
      </div>
      <div className="w-3/4 min-h-[128px] text-center">
        {selected === 2 ? (
          <ul className=" max-w-full w-fit mx-auto columns-1 sm:columns-2 text-left gap-36 whitespace-nowrap leading-8">
            <li>🍔 Cooking</li>
            <li>📈 Investing</li>
            <li>📖 Reading</li>
            <li>🏋🏽 Weight lifting</li>
            <li>🏔️ Hiking</li>
            <li>🎾 Tennis</li>
          </ul>
        ) : selected === 1 ? (
          <p>
            I'm currently taking my first <b>computer graphics</b> course and
            enjoying it tremendously. I have my eyes set on learning{" "}
            <b>Three.js</b> next to develep 3D websites. I'm also looking
            forward to expanding my <b>full stack development</b> skills with
            Next.js and more backend technologies.
          </p>
        ) : (
          <div className="flex gap-4 flex-wrap px-14 justify-center">
            <TechChip name="C" />
            <TechChip name="C++" />
            <TechChip name="CSS" />
            <TechChip name="HTML" />
            <TechChip name="JavaScript" />
            <TechChip name="Kotlin" />
            <TechChip name="Next.js" />
            <TechChip name="Node.js" />
            <TechChip name="Python" />
            <TechChip name="React" />
            <TechChip name="Django" />
          </div>
        )}
      </div>
    </div>
  );
};

const About = () => {
  return (
    <section className="w-full bg-[url('/src/assets/low-poly.svg')] bg-cover">
      <div className="max-w-screen-2xl flex flex-col lg:flex-row justify-center items-center mx-auto gap-16 px-8 md:px-16 pt-36 pb-56 lg:pt-56 lg:pb-80">
        <div className="w-full flex lg:hidden flex-col text-neutral-200 gap-5">
          <h1 className="text-sm font-semibold">About Me</h1>
          <hr className=" border-t border-solid border-t-green-500" />
        </div>
        <Tilt
          tiltEnable={!isSafari && innerWidth >= 1024}
          trackOnWindow={true}
          tiltReverse={true}
        >
          <img src={portrait} className=" max-w-[456px] rounded-2xl" />
        </Tilt>
        <div className="flex flex-col text-neutral-200 gap-5">
          <h1 className="text-sm font-semibold hidden lg:block">About Me</h1>
          <hr className="border-t border-solid border-t-green-500 hidden lg:block" />
          <p className="text-[1rem]">
            I've always been interested in technology growing up. I started
            dabbling in programming at a very tender age and completed my first
            large project for a tenth grade CS course. Ever since then I knew
            that I wanted to continue in this field so when I was given the
            opportunity to pursue an undergraduate CS degree at the University
            of Waterloo I swiftly jumped on it. I'm now in my final year with
            four internships under my belt!
            <br />
            <br />I love learning and trying new things so feel free to reach
            out to me for any opportunities, to chat about stocks, or even to
            exchange food recipes.
          </p>
          <Tabs />
        </div>
      </div>
    </section>
  );
};

export default About;
