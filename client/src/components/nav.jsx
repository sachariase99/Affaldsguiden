import { useState } from "react";
import { NavLink } from "react-router-dom";

// Navigation component
const Nav = () => {
  // State to manage the menu's open/closed state
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu open/closed state
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="border-y-[1px] border-black font-inter">
      <div className="max-w-[1280px] mx-auto flex flex-col lg:flex-row">
        {/* Mobile menu button and navigation link */}
        <div className="lg:hidden flex items-center justify-between py-4 px-8 border-b-2 border-black">
          <NavLink
            to="/home"
            className={({ isActive }) =>
              // Conditional classNames based on whether the link is active
              `py-2 px-4 text-xl text-center border-b-2 border-black hover:bg-[#D6BD98] ${
                isActive ? "bg-[#D6BD98]" : ""
              }`
            }
          >
            Forside
          </NavLink>
          {/* Button to toggle the mobile menu */}
          <button onClick={toggleMenu} className="text-xl">
            {isOpen ? "▲" : "▼"}
          </button>
        </div>

        {/* Navigation menu */}
        <ul
          className={`lg:flex lg:py-6 lg:flex-row lg:items-center lg:overflow-visible lg:max-h-none lg:transition-none 
            flex flex-col overflow-hidden transition-max-height duration-300 ease-in-out uppercase font-semibold ${
              isOpen ? "max-h-[500px]" : "max-h-0"
            }`}
        >
          {/* Navigation links */}
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                // Conditional classNames based on whether the link is active
                `lg:py-6 px-6 text-xl text-center lg:text-normal lg:border-b-0 lg:border-l-[1px] lg:border-r-[1px] border-black hover:bg-[#D6BD98] ${
                  isActive ? "bg-[#D6BD98]" : ""
                }`
              }
            >
              Forside
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/sortingGuide"
              className={({ isActive }) =>
                // Conditional classNames based on whether the link is active
                `lg:py-6 px-6 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-[1px] border-black hover:bg-[#D6BD98] ${
                  isActive ? "bg-[#D6BD98]" : ""
                }`
              }
            >
              Sorteringsguide
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/recycle"
              className={({ isActive }) =>
                // Conditional classNames based on whether the link is active
                `lg:py-6 px-6 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-[1px] border-black hover:bg-[#D6BD98] ${
                  isActive ? "bg-[#D6BD98]" : ""
                }`
              }
            >
              Genbrugsstationer
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/articles"
              className={({ isActive }) =>
                // Conditional classNames based on whether the link is active
                `lg:py-6 px-6 text-xl text-center lg:text-normal lg:border-b-0 lg:border-r-[1px] border-black hover:bg-[#D6BD98] ${
                  isActive ? "bg-[#D6BD98]" : ""
                }`
              }
            >
              Artikler
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/container"
              className={({ isActive }) =>
              // Conditional classNames based on whether the link is active
              `lg:py-6 px-6 text-xl text-center lg:text-normal lg:border-r-[1px] border-black hover:bg-[#D6BD98] ${
                  isActive ? "bg-[#D6BD98]" : ""
                }`
              }
            >
              Bestil Container
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
