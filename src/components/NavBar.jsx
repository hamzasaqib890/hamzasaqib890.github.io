import { Link } from "react-router-dom";

const NavBar = ({ ...props }) => {
  return (
    <nav {...props} className="w-full h-32 px-24">
      <div className="w-full h-full flex items-center justify-center gap-10 max-w-[1536px] m-auto">
        <Link to="/" className="text-lg font-bold text-neutral-200">
          HS
        </Link>
        <hr className="grow border border-solid border-zinc-500" />
        <Link to="/experience" className="text-[1.2rem] text-neutral-200">
          Experience
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
