import { useState, useEffect } from "react";
import { useSupabase } from "../supabase/supabaseClient";

const useSortingGuide = () => {
    const { supabase } = useSupabase();
    const [sections, setSections] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSortingGuide = async () => {
            try {
                const { data: sectionsData, error: sectionsError } = await supabase
                    .from("trash_sections")
                    .select("*");

                if (sectionsError) throw sectionsError;

                const sectionsWithCategories = await Promise.all(
                    sectionsData.map(async (section) => {
                        const { data: categoriesData, error: categoriesError } = await supabase
                            .from("trash_categories")
                            .select("*")
                            .eq("section_id", section.id);

                        if (categoriesError) throw categoriesError;

                        const categoriesWithTypes = await Promise.all(
                            categoriesData.map(async (category) => {
                                // Fetch the relationships from trash_category_type_rel
                                const { data: categoryTypeRelData, error: categoryTypeRelError } = await supabase
                                    .from("trash_category_type_rel")
                                    .select("type_id, is_allowed")
                                    .eq("category_id", category.id);

                                if (categoryTypeRelError) throw categoryTypeRelError;

                                // Fetch all types related to the category
                                const typeIds = categoryTypeRelData.map(rel => rel.type_id);
                                const { data: typesData, error: typesError } = await supabase
                                    .from("trash_types")
                                    .select("*")
                                    .in("id", typeIds);

                                if (typesError) throw typesError;

                                // Add is_allowed property to each type
                                const typesWithAllowance = typesData.map(type => ({
                                    ...type,
                                    is_allowed: categoryTypeRelData.find(rel => rel.type_id === type.id).is_allowed
                                }));

                                return {
                                    ...category,
                                    types: typesWithAllowance,
                                };
                            })
                        );

                        return {
                            ...section,
                            categories: categoriesWithTypes,
                        };
                    })
                );

                console.log("All sections with categories and types:", sectionsWithCategories);
                setSections(sectionsWithCategories);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchSortingGuide();
    }, [supabase]);

    return { sections, loading, error };
};

export default useSortingGuide;
