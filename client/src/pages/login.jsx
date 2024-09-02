import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";
import { AuthContext } from "../context/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { isLoggedIn, login } = useContext(AuthContext);
  const navigate = useNavigate();

  const { supabase } = useSupabase();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        login(email);
        navigate("/home");
      }
    } catch (error) {
      setError("Error signing in. Please try again.");
    }
  };

  return (
    <div className="p-16 mx-8 h-[700px]">
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-12">Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#CCCCCC] border-[1px] px-4 py-3 rounded-md w-full mb-2 outline-none"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#CCCCCC] border-[1px] px-4 py-3 rounded-md w-full outline-none"
          />
          <div className="flex justify-between items-center mt-6">
            <p className="text-sm">
              Ikke registreret endnu?{" "}
              <Link
                to="/register"
                className="text-blue-400 hover:text-[#1A3636] underline"
              >
                Register
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#119B1E] hover:bg-[#1A3636] text-white w-1/3 py-3 rounded-md uppercase font-bold"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
