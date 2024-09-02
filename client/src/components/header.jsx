import { Link } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Nav from './nav'

const Header = () => {
  // AuthContext to check if the user is logged in
  const { isLoggedIn, logout } = useContext(AuthContext);

  return (
    <div>
      <div className="flex items-center justify-between gap-8 mx-24 py-4 bg-white">
      <Link to="/home">
        <img src={logo} alt="Logo" />
      </Link>
      {isLoggedIn ? (
        <button
          className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl"
          onClick={logout}
        >
          Logout
          <IoMdLogIn className="rotate-180"/>
        </button>
      ) : (
        <Link
          className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl"
          to="/login"
        >
          Login
          <IoMdLogIn />
        </Link>
      )}
    </div>
    <Nav />
    </div>
  );
};

export default Header;
