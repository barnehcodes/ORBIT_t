import React, { useState } from "react";
import { styles } from "../styles";
import { logo_me_2, logo_me, menu, close, orbit_logo } from "../assets";
import { navLinks } from "../constants";
import { Link } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Navbar2 = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(true);
  const navigate = useNavigate();

  const handelSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        console.log("signed out");
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 bg-primary
    }`}
    >
      <div className="w-full flex justify-between items-center max-w-7xl mx-auto">
        <Link
          to="/Palace"
          className="flex items-center gap-2"
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={orbit_logo} alt="logo" className="w-9 h-9 object-contain" />
          <p className="text-white text-[18px] font-bold cursor-pointer flex ">
            Palace &nbsp;{" "}
            <spam className="sm:block hidden"> | Project Orbit</spam>
          </p>
        </Link>
        <ul className="list-none hidden sm:flex flex-row gap-10">
          <Link to="/Explore2">
            <li>explore</li>
          </Link>
          <Link to="/profile">
            <li>profile</li>
          </Link>
          <li onClick={handelSignOut}>logout</li>
        </ul>
        {/** menu bar  */}
      </div>
    </nav>
  );
};

export default Navbar2;
