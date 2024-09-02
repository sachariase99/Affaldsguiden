import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="border-y-2 border-black bg-white">
      <ul className="max-w-[1280px] mx-auto flex flex-col lg:flex-row">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `py-8 px-12 text-xl text-center lg:text-normal border-b-2 lg:border-b-0 lg:border-l-2 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
              isActive ? "bg-[#D6BD98]" : ""
            }`
          }
        >
          Forside
        </NavLink>
        <NavLink
          to="/sortering"
          className={({ isActive }) =>
            `py-8 px-8 text-xl text-center lg:text-normal border-b-2 lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
              isActive ? "bg-[#D6BD98]" : ""
            }`
          }
        >
          Sorteringsguide
        </NavLink>
        <NavLink
          to="/genbrug"
          className={({ isActive }) =>
            `py-8 px-8 text-xl text-center lg:text-normal border-b-2 lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
              isActive ? "bg-[#D6BD98]" : ""
            }`
          }
        >
          Genbrug
        </NavLink>
        <NavLink
          to="/artikler"
          className={({ isActive }) =>
            `py-8 px-8 text-xl text-center lg:text-normal border-b-2 lg:border-b-0 lg:border-r-2 border-black hover:bg-[#D6BD98] ${
              isActive ? "bg-[#D6BD98]" : ""
            }`
          }
        >
          Artikler
        </NavLink>
        <NavLink
          to="/bestil"
          className={({ isActive }) =>
            `py-8 px-8 text-xl text-center lg:text-normal lg:border-r-2 border-black hover:bg-[#D6BD98] ${
              isActive ? "bg-[#D6BD98]" : ""
            }`
          }
        >
          Bestil Container
        </NavLink>
      </ul>
    </nav>
  );
};

export default Nav;
