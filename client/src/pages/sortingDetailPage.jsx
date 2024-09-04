import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSortingGuide from "../hooks/useSortingGuide";
import { useBackgroundColor } from "../context/BackgroundColorContext";

const SortingDetailPage = () => {
  const { id } = useParams(); // Get the ID from URL parameters
  const { sections, loading, error } = useSortingGuide(); // Custom hook to fetch sorting guide data
  const [openCategoryId, setOpenCategoryId] = useState(null); // State to track which category is open
  const { setBgColor } = useBackgroundColor(); // Context to manage background color

  useEffect(() => {
    // Find the section that matches the ID from URL
    const section = sections.find((section) => section.id == parseInt(id));

    if (section) {
      // Set the background color based on the section's color
      const color = `#${section.color}`;
      setBgColor(color);
    }

    // Reset the background color when the component is unmounted or ID changes
    return () => {
      setBgColor("#06682D");
    };
  }, [id, sections, setBgColor]);

  // Toggle function to expand or collapse a category
  const toggleMenu = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  if (loading)
    return (
      <div className="w-full h-screen relative">
        {/* Loading indicator */}
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  // Find the section that matches the ID from URL
  const section = sections.find((section) => section.id == parseInt(id));

  if (!section) return <p>Section not found</p>;

  return (
    <div>
      <div className="py-8 mx-8 grid grid-cols-1 gap-16">
        {/* Iterate over categories in the section */}
        {section.categories.map((category) => (
          <div
            key={category.id}
            className={`relative flex flex-col justify-between border border-[#677D6A] rounded-lg px-8 transition-all duration-500 ease-in-out ${
              openCategoryId === category.id ? "h-auto" : ""
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-end">
                {/* Category icon and title */}
                <img
                  className="py-8 h-40"
                  src={category.icon_url}
                  alt={category.title}
                />
                <p className="py-8 pl-4 font-semibold text-xl">
                  {category.title}
                </p>
              </div>
              <img
                className="w-40 h-40"
                src={category.image_url}
                alt={category.title}
              />
            </div>
            {/* Toggle button for expanding/collapsing category details */}
            <span
              className={`absolute left-1/2 -translate-x-1/2 -bottom-6 h-12 w-12 cursor-pointer border border-[#677D6A] hover:bg-[#677D6A] rounded-full flex items-center justify-center ${
                openCategoryId === category.id ? "bg-[#677D6A]" : "bg-[#D8EADB]"
              }`}
              onClick={() => toggleMenu(category.id)}
            >
              {openCategoryId === category.id ? "▲" : "▼"}
            </span>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                openCategoryId === category.id ? "max-h-64 py-4" : "max-h-0"
              }`}
            >
              <div className="">
                <div className="grid grid-cols-2 gap-16">
                  <div>
                    <h3 className="text-[#119B1E] mb-2 text-2xl border-b border-[#119B1E]">
                      Ja tak
                    </h3>
                    {/* List of allowed types */}
                    {category.types
                      ?.filter((type) => type.is_allowed)
                      .map((type) => (
                        <div key={type.id}>{type.title}</div>
                      ))}
                  </div>
                  <div>
                    <h3 className="text-[#951C3F] mb-2 text-2xl border-b border-[#951C3F]">
                      Nej tak
                    </h3>
                    {/* List of not allowed types */}
                    {category.types
                      ?.filter((type) => !type.is_allowed)
                      .map((type) => (
                        <div key={type.id}>{type.title}</div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SortingDetailPage;
