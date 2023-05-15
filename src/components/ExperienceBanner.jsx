import { Link } from "react-router-dom";
import waveTop from "/src/assets/wave-top.svg";
import waveBottom from "/src/assets/wave-bottom.svg";

const ExperienceBanner = () => {
  return (
    <div className="text-neutral-200 font-semibold">
      <img src={waveTop} className="w-full" />
      <div className="bg-zinc-800 flex justify-center items-center gap-14 px-24 flex-wrap text-center">
        <h2 className="text-sm">Learn more about my internships</h2>
        <Link
          to="experience"
          className="bg-gradient-to-r from-cyan-500 to-green-500 rounded-2xl px-6 py-2 text-xs hover:from-cyan-400 hover:to-green-400 "
        >
          Experience
        </Link>
      </div>
      <img src={waveBottom} className="w-full absolute bottom-100" />
    </div>
  );
};

export default ExperienceBanner;
