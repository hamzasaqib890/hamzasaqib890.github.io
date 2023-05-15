import github from "/src/assets/icons/github.svg";
import linkedin from "/src/assets/icons/linkedin.svg";

const Footer = ({ ...props }) => {
  return (
    <footer {...props} className="w-full h-16 px-24 mt-auto">
      <div className="flex justify-between items-center w-full h-full max-w-[1536px] border-t border-zinc-500 m-auto text-zinc-500 p-2">
        <p>© 2023 Hamza Saqib</p>
        <span className="flex gap-4">
          <a href="https://github.com/hamzasaqib890" target="_blank">
            <img src={github} className="h-7" />
          </a>
          <a href="https://www.linkedin.com/in/hamza-saqib1/" target="_blank">
            <img src={linkedin} className="h-7" />
          </a>
        </span>
      </div>
    </footer>
  );
};

export default Footer;
