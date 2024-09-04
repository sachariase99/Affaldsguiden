import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useRecycles = (isNews) => {
  const { supabase } = useSupabase();
  const [recycles, setRecycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    const fetchRecycles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('recycling_sites')
          .select('*')

        if (error) {
          throw error;
        }

        console.log(data);
        setRecycles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecycles();
  }, [supabase, isNews]);

  return { recycles, loading, error };
};

export default useRecycles;
