import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Nav from './nav';

const Header = () => {
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook to handle navigation

  const handleLogout = async () => {
    await logout(); // Ensure logout completes
    navigate('/home'); // Redirect to /home after logout
  };

  return (
    <div>
      <div className="flex items-center justify-between gap-8 mx-24 py-4 bg-white z-50">
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>
        {isLoggedIn ? (
          <button
            className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl"
            onClick={handleLogout} // Use handleLogout function
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
