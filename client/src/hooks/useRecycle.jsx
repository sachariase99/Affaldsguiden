import { useState, useEffect } from 'react';
import { useSupabase } from '../supabase/supabaseClient';

// Custom hook to fetch recycling sites and their average ratings from Supabase
const useRecycles = () => {
  const { supabase } = useSupabase(); // Access Supabase client
  const [recycles, setRecycles] = useState([]); // State to store recycling sites with average ratings
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Function to fetch recycling sites and their reviews/ratings
    const fetchRecyclesAndRatings = async () => {
      try {
        // Fetch recycling sites from Supabase
        const { data: recyclingSites, error: recycleError } = await supabase
          .from('recycling_sites')
          .select('*');
        
        if (recycleError) throw recycleError; // Throw error if fetching recycling sites fails

        // Fetch reviews from Supabase
        const { data: reviews, error: reviewError } = await supabase
          .from('reviews')
          .select('site_id, num_stars');

        if (reviewError) throw reviewError; // Throw error if fetching reviews fails

        // Process reviews to calculate average ratings
        const ratingsMap = reviews.reduce((acc, review) => {
          if (!acc[review.site_id]) {
            acc[review.site_id] = { sum: 0, count: 0 }; // Initialize for new site
          }
          acc[review.site_id].sum += review.num_stars; // Accumulate total stars
          acc[review.site_id].count += 1; // Count reviews
          return acc;
        }, {});

        // Map recycling sites to include average ratings and review counts
        const recyclesWithAverage = recyclingSites.map(site => {
          const ratingData = ratingsMap[site.id];
          return {
            ...site,
            average_rating: ratingData ? (ratingData.sum / ratingData.count) : 0, // Calculate average rating
            reviews_count: ratingData ? ratingData.count : 0, // Get number of reviews
          };
        });

        setRecycles(recyclesWithAverage); // Update state with processed data
      } catch (error) {
        setError(error.message); // Set error message if an error occurs
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchRecyclesAndRatings(); // Call function to fetch data
  }, [supabase]); // Dependency array includes supabase to refetch data if it changes

  // Return the state values for use in components
  return { recycles, loading, error };
};

export default useRecycles;
