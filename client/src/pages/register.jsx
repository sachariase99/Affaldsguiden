import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSupabase } from "../supabase/supabaseClient";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const { supabase } = useSupabase();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else {
        setSuccessMessage("Registration successful! Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setError("Error registering. Please try again.");
    }
  };

  return (
    <div className="p-16 lg:mb-32 mx-8 h-[700px]">
      <div className="w-full md:w-1/2">
        <h2 className="text-4xl font-bold mb-12">Register</h2>
        <form onSubmit={handleRegister} className="flex flex-col">
          {error && <p style={{ color: "red" }}>{error}</p>}
          {successMessage && (
            <p className="text-green absolute top-2 left-1/2 -translate-x-1/2 bg-[#c2c2c2] py-2 px-4">
              {successMessage}
            </p>
          )}

          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Indtast din email"
            className="hover:bg-[#eee] border-[#CCCCCC] border-[1px] px-4 py-3 rounded-md w-full mb-2 outline-none"
          />

          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Indtast din adgangskode"
            className="hover:bg-[#eee] border-[#CCCCCC] border-[1px] px-4 py-3 rounded-md w-full outline-none"
          />

          <div className="flex justify-between items-center mt-6">
            <p className="text-sm">
              Allerede registreret?{" "}
              <Link
                to="/login"
                className="text-blue-400 hover:text-[#1A3636] underline"
              >
                Login
              </Link>
            </p>
            <button
              type="submit"
              className="bg-[#119B1E] hover:bg-[#1A3636] text-white w-1/3 py-3 rounded-md uppercase font-bold"
            >
              Registrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
