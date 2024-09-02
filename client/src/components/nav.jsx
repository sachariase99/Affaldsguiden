import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-y-2 border-black">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row">
        <div className="lg:hidden flex items-center justify-between py-4 px-8 border-b-2 border-black">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `py-2 px-4 text-xl text-center border-b-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Forside
          </NavLink>
          <button onClick={toggleMenu} className="text-xl">
            {isOpen ? "▲" : "▼"}
          </button>
        </div>

        <ul className={`flex flex-col lg:flex lg:flex-row lg:items-center overflow-hidden transition-max-height duration-300 ease-in-out ${isOpen ? "max-h-[500px]" : "max-h-0"}`}>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              `lg:py-8 px-2 text-xl text-center lg:text-normal lg:border-b-0 lg:border-l-2 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Forside
          </NavLink>
          <NavLink
            to="/sortering"
            className={({ isActive }) =>
              `lg:py-8 px-2 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Sorteringsguide
          </NavLink>
          <NavLink
            to="/genbrug"
            className={({ isActive }) =>
              `lg:py-8 px-2 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Genbrug
          </NavLink>
          <NavLink
            to="/artikler"
            className={({ isActive }) =>
              `lg:py-8 px-2 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Artikler
          </NavLink>
          <NavLink
            to="/bestil"
            className={({ isActive }) =>
              `lg:py-8 px-2 text-xl text-center lg:text-normal lg:border-r-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Bestil Container
          </NavLink>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
