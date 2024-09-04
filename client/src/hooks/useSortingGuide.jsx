import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

// Custom hook to fetch and organize sorting guide data from Supabase
const useSortingGuide = () => {
  const { supabase } = useSupabase(); // Access Supabase client
  const [sections, setSections] = useState([]); // State to store sections with categories and types
  const [loading, setLoading] = useState(true); // State to manage loading state
  const [error, setError] = useState(null); // State to manage error state

  useEffect(() => {
    // Function to fetch sorting guide data from Supabase
    const fetchSortingGuide = async () => {
      try {
        // Fetch sections from the 'trash_sections' table
        const { data: sectionsData, error: sectionsError } = await supabase
          .from("trash_sections")
          .select("*");

        if (sectionsError) throw sectionsError; // Throw error if fetching sections fails

        // Map over each section to fetch related categories and types
        const sectionsWithCategories = await Promise.all(
          sectionsData.map(async (section) => {
            // Fetch categories for the current section
            const { data: categoriesData, error: categoriesError } =
              await supabase
                .from("trash_categories")
                .select("*")
                .eq("section_id", section.id);

            if (categoriesError) throw categoriesError; // Throw error if fetching categories fails

            // Map over each category to fetch related types
            const categoriesWithTypes = await Promise.all(
              categoriesData.map(async (category) => {
                // Fetch type-category relationships for the current category
                const {
                  data: categoryTypeRelData,
                  error: categoryTypeRelError,
                } = await supabase
                  .from("trash_category_type_rel")
                  .select("type_id, is_allowed")
                  .eq("category_id", category.id);

                if (categoryTypeRelError) throw categoryTypeRelError; // Throw error if fetching category-type relationships fails

                // Extract type IDs from the relationships
                const typeIds = categoryTypeRelData.map((rel) => rel.type_id);

                // Fetch types for the extracted type IDs
                const { data: typesData, error: typesError } = await supabase
                  .from("trash_types")
                  .select("*")
                  .in("id", typeIds);

                if (typesError) throw typesError; // Throw error if fetching types fails

                // Map types to include allowance information
                const typesWithAllowance = typesData.map((type) => ({
                  ...type,
                  is_allowed: categoryTypeRelData.find(
                    (rel) => rel.type_id === type.id
                  ).is_allowed,
                }));

                return {
                  ...category,
                  types: typesWithAllowance, // Attach types with allowance info to the category
                };
              })
            );

            return {
              ...section,
              categories: categoriesWithTypes, // Attach categories with types to the section
            };
          })
        );

        setSections(sectionsWithCategories); // Update state with fetched data
      } catch (err) {
        setError(err.message); // Set error message if an error occurs
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchSortingGuide(); // Call function to fetch data
  }, [supabase]); // Dependency array includes supabase to refetch data if it changes

  // Return the state values for use in components
  return { sections, loading, error };
};

export default useSortingGuide;
