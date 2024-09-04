import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

// Custom hook to fetch articles from Supabase
const useArticles = (isNews) => {
  // Access Supabase client from custom hook
  const { supabase } = useSupabase();
  // State to store the fetched articles
  const [articles, setArticles] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage error state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Early exit if Supabase client is not available
    if (!supabase) return;

    // Function to fetch articles from Supabase
    const fetchArticles = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset any previous errors
      try {
        // Fetch articles from Supabase
        const { data, error } = await supabase
          .from('articles')
          .select('*');

        // Check if there was an error with the fetch
        if (error) {
          throw error; // Throw error to be caught in the catch block
        }
        
        // Update state with fetched articles
        setArticles(data);
      } catch (err) {
        // Set error state if there was an issue
        setError(err.message);
      } finally {
        // Set loading to false once fetch is complete (successful or error)
        setLoading(false);
      }
    };

    // Call the fetch function
    fetchArticles();
  }, [supabase, isNews]); // Dependency array includes supabase and isNews

  // Return the state values for use in components
  return { articles, loading, error };
};

export default useArticles;
