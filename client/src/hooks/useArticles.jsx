import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useArticles = (isNews) => {
  const { supabase } = useSupabase();
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!supabase) return;

    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data, error } = await supabase
          .from('articles')
          .select('*')

        if (error) {
          throw error;
        }
        
        
        setArticles(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [supabase, isNews]);

  return { articles, loading, error };
};

export default useArticles;
