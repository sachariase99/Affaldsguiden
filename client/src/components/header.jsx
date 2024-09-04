import { Link, useNavigate } from "react-router-dom";
import { IoMdLogIn } from "react-icons/io";
import logo from "../assets/logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import Nav from './nav';

const Header = () => {
  // Accessing authentication context for login status and logout function
  const { isLoggedIn, logout } = useContext(AuthContext);
  const navigate = useNavigate(); // Hook to programmatically navigate

  // Function to handle user logout
  const handleLogout = async () => {
    await logout(); // Call the logout function
    navigate('/home'); // Redirect to the home page after logout
  };

  return (
    <div>
      {/* Header container with flex layout and styling */}
      <div className="flex items-center justify-between gap-8 mx-24 py-4 bg-white z-50">
        {/* Logo section with a link to the home page */}
        <Link to="/home">
          <img src={logo} alt="Logo" />
        </Link>

        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          // Render logout button if the user is logged in
          <button
            className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl"
            onClick={handleLogout}
          >
            Logout
            <IoMdLogIn className="rotate-180" /> {/* Rotate icon for logout button */}
          </button>
        ) : (
          // Render login link if the user is not logged in
          <Link
            className="bg-[#D8EADB] hover:bg-[#D6BD98] rounded-xl px-8 py-2 flex items-center gap-2 text-xl"
            to="/login"
          >
            Login
            <IoMdLogIn /> {/* Login icon */}
          </Link>
        )}
      </div>

      {/* Navigation component */}
      <Nav />
    </div>
  );
};

export default Header;
