import { Outlet, useLocation } from "react-router-dom";
import NavBar from "/src/components/NavBar";
import Footer from "/src/components/Footer";
import { useEffect } from "react";

const Root = () => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col justify-start">
      {location.pathname !== "/" && <NavBar />}
      <Outlet />
      {location.pathname !== "/" && <Footer />}
    </div>
  );
};

export default Root;
