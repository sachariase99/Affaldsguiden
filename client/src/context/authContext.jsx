import { createContext, useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

// Create a context for authentication state
export const AuthContext = createContext();

// AuthProvider component to manage authentication state and provide context to its children
export const AuthProvider = ({ children }) => {
  const { supabase } = useSupabase(); // Get Supabase client instance
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track if user is logged in
  const [userId, setUserId] = useState(null); // State to store user ID
  const [userEmail, setUserEmail] = useState(null); // State to store user email

  // Effect to check authentication session and set up a listener for authentication state changes
  useEffect(() => {
    if (!supabase) return; // Early exit if Supabase client is not available

    const checkSession = async () => {
      try {
        // Check current session
        const {
          data: { session },
        } = await supabase.auth.getSession();
        if (session && session.user) {
          // If session exists and user is present, update state
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        }
      } catch (error) {
        // Log any errors that occur while checking the session
        console.error("Error checking session:", error.message);
      }
    };

    checkSession(); // Check session on component mount

    // Set up listener for authentication state changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session && session.user) {
          // Update state based on new authentication state
          setIsLoggedIn(true);
          setUserId(session.user.id);
          setUserEmail(session.user.email);
        } else {
          // If no session, clear authentication state
          setIsLoggedIn(false);
          setUserId(null);
          setUserEmail(null);
        }
      }
    );

    // Cleanup subscription on component unmount
    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [supabase]); // Dependency array ensures effect runs when `supabase` changes

  // Function to log in the user (for demonstration or manual login)
  const login = (email) => {
    setIsLoggedIn(true);
    setUserEmail(email);
  };

  // Function to log out the user
  const logout = async () => {
    await supabase.auth.signOut(); // Sign out using Supabase client
    setIsLoggedIn(false); // Clear authentication state
    setUserId(null);
    setUserEmail(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userId, userEmail, login, logout }}
    >
      {children} {/* Render children components with access to the AuthContext */}
    </AuthContext.Provider>
  );
};
