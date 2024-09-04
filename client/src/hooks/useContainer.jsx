import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

// Custom hook to fetch container data from Supabase
const useContainer = () => {
  // Access Supabase client from custom hook
  const { supabase } = useSupabase();
  // State to store the fetched containers data
  const [containers, setContainers] = useState([]);
  // State to manage loading state
  const [loading, setLoading] = useState(true);
  // State to manage error state
  const [error, setError] = useState(null);

  useEffect(() => {
    // Function to fetch container data from Supabase
    const fetchContainers = async () => {
      setLoading(true); // Set loading to true before fetching
      setError(null); // Reset any previous errors

      try {
        // Fetch containers from Supabase
        const { data, error } = await supabase
          .from('containers')
          .select('*');

        if (error) {
          // Handle any errors that occur during the fetch
          throw error; // Throw error to be caught in the catch block
        }

        // Update state with fetched containers data
        setContainers(data);
      } catch (err) {
        // Set error state if there was an issue
        setError(err.message);
      } finally {
        // Set loading to false once fetch is complete (successful or error)
        setLoading(false);
      }
    };

    fetchContainers(); // Call the fetch function
  }, [supabase]); // Dependency array includes supabase to refetch data if it changes

  // Return the state values for use in components
  return { containers, loading, error };
};

export default useContainer;
