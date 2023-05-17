import sapLogo from "/src/assets/experience/SAP_logo.png";
import psLogo from "/src/assets/experience/ps_colour_logo.png";
import newtonLogo from "/src/assets/experience/newton_logo.png";
import superLogo from "/src/assets/experience/super_logo-cropped.svg";
import "./Experience.css";
import { motion } from "framer-motion";
import Tilt from "react-parallax-tilt";
import { useState } from "react";

const Chip = ({ children }) => {
  return (
    <p className="text-[1rem] border-solid border-gray-400 px-3 rounded-full bg-zinc-700 text-neutral-200">
      {children}
    </p>
  );
};

const ExperienceCard = ({
  title,
  company,
  dates,
  description,
  imgSrc,
  chips,
}) => {
  const isMobile = innerWidth < 640;
  const [flip, setFlip] = useState(false);
  return (
    <motion.div onClick={isMobile ? null : () => setFlip((prev) => !prev)}>
      <Tilt
        className=" bg-zinc-800 text-neutral-200 h-[512px] w-[316px] rounded-2xl flex flex-col items-center p-8 card mx-auto"
        perspective={500}
        scale={isMobile ? 1 : 1.1}
        tiltReverse={true}
        flipHorizontally={flip}
        onLeave={isMobile ? null : () => setFlip(false)}
        tiltEnable={!isMobile}
      >
        <div className="absolute w-full h-1/2 flex justify-center items-center front0">
          <div className="w-24 h-24 rounded-full z-10 shadow1" />
        </div>
        <div className="relative h-1/2 front1">
          <img
            src={imgSrc}
            className="z-20 relative h-full"
            draggable="false"
          />
        </div>
        <div className="w-full flex flex-col items-center grow justify-between gap-4 h-1/2 front2">
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-xs font-semibold text-center">{title}</h2>
            <h2 className="text-[1rem] font-thin italic text-center">
              {company}
            </h2>
          </div>
          <div className="flex gap-4 flex-wrap justify-center">
            {chips.map((chip, i) => (
              <Chip key={i}>{chip}</Chip>
            ))}
          </div>
        </div>

        <div className="w-full flex flex-col justify-top h-full px-10 pt-5 pb-20 back">
          <h2 className="text-[1.2rem] font-semibold leading-9">{company}</h2>
          <h3 className="text-[0.9rem] font-thin italic">{dates}</h3>
          <hr className=" border-t border-solid border-t-green-500 my-4" />
          <h3 className="text-[1rem] leading-8 font-semibold">{title}</h3>
          <p className="text-[1rem] mt-2 whitespace-pre-line">{description}</p>
        </div>
      </Tilt>
    </motion.div>
  );
};

const Experience = () => {
  return (
    <section className="flex flex-wrap w-full h-full justify-center items-center gap-16 p-10">
      <ExperienceCard
        title="QE Automation Developer"
        company="SAP"
        dates="Jan - Apr 2021"
        imgSrc={sapLogo}
        chips={["Python", "Selenium"]}
        description="• Automated test streams via Selenium WebDriver for Python to identify performance and usability issues
          • Constructed a framework with Python to test various web applications (e.g Database Explorer, Web IDE, Cockpit) in Mozilla Firefox using GeckoDriver"
      />
      <ExperienceCard
        title="Software Developer in Test"
        company="PlayStation"
        dates="Sept - Dec 2021"
        imgSrc={psLogo}
        chips={["Python", "Pytest", "Jenkins"]}
        description="• Automated 30+ test cases in the Pytest framework
          • Conducted regression testing for three PS5 OTA updates through a Jenkins CI pipeline
          • Independently wrote an office-wide CLI tool in Python to automate running regression test suites on a developer PR by making API calls, editing JenkinsFile etc."
      />
      <ExperienceCard
        title="Software Developer"
        company="Newton"
        dates="May - Aug 2022"
        imgSrc={newtonLogo}
        chips={["React", "React Native", "Django", "AWS"]}
        description="• Won second place in company hackathon by implementing a “sort coins by most watched” feature with AWS Lambda
        • Migrated email delivery service to SendGrid, including writing logic for new emails in the Django backend
        • Worked on report generation to comply with FINTRAC regulations"
      />
      <ExperienceCard
        title="Software Engineer"
        company="Super"
        dates="Jan - Apr 2023"
        imgSrc={superLogo}
        chips={["React", "React Native", "Next.js", "Flask"]}
        description="• Revamped SuperApp homepage with custom React components
        • Launched user referral program by implementing the UI, adding backend logic & building rules in Talon.One
        • Increased native app downloads by 11% by running an experiment to gate credit redemption to mobile only"
      />
    </section>
  );
};

export default Experience;
