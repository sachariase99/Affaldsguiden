import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useContainer = () => {
  const { supabase } = useSupabase();
  const [containers, setContainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContainers = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('containers')
        .select('*');
        

      if (error) {
        setError(error);
      } else {
        setContainers(data);
      }
      setLoading(false);
    };

    fetchContainers();
  }, [supabase]);

  return { containers, loading, error };
};

export default useContainer;
