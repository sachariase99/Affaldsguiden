import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

const useRecycles = () => {
  const { supabase } = useSupabase();
  const [recycles, setRecycles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecyclesAndRatings = async () => {
      try {
        // Fetch recycling sites
        const { data: recyclingSites, error: recycleError } = await supabase
          .from('recycling_sites') // Update with your actual table name
          .select('*');
        
        if (recycleError) throw recycleError;

        // Fetch reviews
        const { data: reviews, error: reviewError } = await supabase
          .from('reviews') // Update with your actual table name
          .select('site_id, num_stars');

        if (reviewError) throw reviewError;

        // Calculate average ratings and review counts
        const ratingsMap = reviews.reduce((acc, review) => {
          if (!acc[review.site_id]) {
            acc[review.site_id] = { sum: 0, count: 0 };
          }
          acc[review.site_id].sum += review.num_stars;
          acc[review.site_id].count += 1;
          return acc;
        }, {});

        const recyclesWithAverage = recyclingSites.map(site => {
          const ratingData = ratingsMap[site.id];
          return {
            ...site,
            average_rating: ratingData ? (ratingData.sum / ratingData.count) : 0,
            reviews_count: ratingData ? ratingData.count : 0,
          };
        });

        setRecycles(recyclesWithAverage);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRecyclesAndRatings();
  }, [supabase]);

  return { recycles, loading, error };
};

export default useRecycles;
