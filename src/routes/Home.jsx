import { useRef } from "react";
import { useScroll } from "framer-motion";
import Parallax from "/src/components/Parallax";
import Info from "/src/components/Info";
import About from "/src/components/About";
import ExperienceBanner from "/src/components/ExperienceBanner";
import Footer from "/src/components/Footer";
import Contact from "/src/components/Contact";

const Home = () => {
  const wrapperRef = useRef(null);
  const { scrollY } = useScroll({ container: wrapperRef });

  return (
    <div
      className="h-screen overflow-y-auto overflow-x-hidden [perspective:10px]"
      ref={wrapperRef}
    >
      <Parallax scrollY={scrollY} />
      <Info />
      <ExperienceBanner />
      <About />
      <Contact />
      <Footer style={{ backgroundColor: "rgb(39, 39, 42)" }} />
    </div>
  );
};

export default Home;
