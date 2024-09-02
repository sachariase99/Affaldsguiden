import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="border-y-2 border-black">
      <ul className="max-w-[1280px] mx-auto flex">
        <NavLink
          to="/home"
          className={({ isActive }) =>
            `py-8 px-12 text-xl border-l-2 border-r-2 border-black ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          Forside
        </NavLink>
        <NavLink
          to="/sortering"
          className={({ isActive }) =>
            `py-8 px-8 text-xl border-r-2 border-black ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          Sorteringsguide
        </NavLink>
        <NavLink
          to="/genbrug"
          className={({ isActive }) =>
            `py-8 px-8 text-xl border-r-2 border-black ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          Genbrug
        </NavLink>
        <NavLink
          to="/artikler"
          className={({ isActive }) =>
            `py-8 px-8 text-xl border-r-2 border-black ${
              isActive ? "bg-gray-300" : ""
            }`
          }
        >
          Artikler
        </NavLink>
        <NavLink
          to="/bestil"
          className={({ isActive }) =>
            `py-8 px-8 text-xl border-r-2 border-black ${
              isActive ? "bg-gray-300" : ""
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
