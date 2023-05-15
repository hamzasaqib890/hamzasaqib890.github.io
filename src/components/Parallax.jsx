import "./Parallax.css";
import background1 from "/src/assets/parallax/background1.png";
import background2 from "/src/assets/parallax/background2.png";
import background3 from "/src/assets/parallax/background3.png";
import background4 from "/src/assets/parallax/background4.png";
import background5 from "/src/assets/parallax/background5.png";
import { easeOut, motion } from "framer-motion";
import ScrollingSubtitle from "/src/components/ScrollingSubtitle";
import NavBar from "./NavBar";

const Parallax = ({ scrollY }) => {
  return (
    <header>
      <NavBar
        style={{
          position: "absolute",
          background:
            "radial-gradient(80% 100% at center top, rgb(24, 24, 27) 10%, rgba(24, 24, 27, 0.7) 60%, rgba(24, 24, 27, 0) 100%)",
        }}
      />
      <motion.img
        rel="preload"
        src={background5}
        style={{ translateZ: -12 }}
        animate={{ scale: [0.5, 0.5, 2.2], translateY: [innerWidth * 2, 0, 0] }}
        transition={{ duration: 2, ease: easeOut, times: [0, 0.5, 1] }}
      />
      <motion.img
        rel="preload"
        src={background4}
        style={{ translateZ: -10 }}
        animate={{ scale: [0.5, 0.5, 2], translateY: [innerWidth * 2, 0, 0] }}
        transition={{ duration: 2, ease: easeOut, times: [0.05, 0.5, 1] }}
      />
      <motion.img
        rel="preload"
        src={background3}
        style={{ translateZ: -8 }}
        animate={{ scale: [0.5, 0.5, 1.8], translateY: [innerWidth * 2, 0, 0] }}
        transition={{ duration: 2, ease: easeOut, times: [0.1, 0.5, 1] }}
      />
      <motion.img
        rel="preload"
        src={background2}
        style={{ translateZ: -6 }}
        animate={{ scale: [0.5, 0.5, 1.6], translateY: [innerWidth * 2, 0, 0] }}
        transition={{ duration: 2, ease: easeOut, times: [0.15, 0.5, 1] }}
      />
      <motion.div
        className="title"
        style={{ translateZ: -4, scale: 1.4 }}
        animate={{ opacity: [0, 0, 100] }}
        transition={{ duration: 4 }}
      >
        <h1 className="name">Hamza Saqib</h1>
        <ScrollingSubtitle scrollY={scrollY} />
      </motion.div>
      <motion.img
        rel="preload"
        src={background1}
        style={{ translateZ: -2 }}
        animate={{
          scale: [0.5, 0.5, 1.2],
          translateY: [
            "calc(100vw *2 )",
            "calc(100vw*0.1)",
            "calc(100vw *0.23)",
          ],
        }}
        transition={{ duration: 2, ease: easeOut, times: [0.2, 0.5, 1] }}
      />
    </header>
  );
};

export default Parallax;
