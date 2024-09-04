import { Link } from "react-router-dom";
import useSortingGuide from "../hooks/useSortingGuide";

const SortingGuide = () => {
  const { sections, loading, error } = useSortingGuide(); // Custom hook to fetch sorting guide data

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

  return (
    <div className="pt-16 pb-8 mb-64 mx-8">
      {/* Title of the sorting guide page */}
      <h2 className="text-4xl font-semibold">Sorteringsguide</h2>
      {/* Subtitle prompting user to select a section */}
      <h3 className="text-2xl font-semibold text-[#119B1E]">Vælg en sektion</h3>
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-16">
        {/* Map through sections and display each as a link */}
        {sections.map((section) => (
          <Link key={section.id} to={`/sortingGuide/${section.id}`}>
            <div
              className="grid grid-cols-3 text-white shadow rounded-l-lg"
              style={{ backgroundColor: `#${section.color}` }}
            >
              {/* Section title displayed in a grid layout */}
              <h2 className="col-span-2 flex items-end p-8 text-2xl font-semibold">
                {section.title}
              </h2>
              {/* Section image displayed on the right side */}
              <img
                className="col-span-1 w-full"
                src={section.image_url}
                alt={section.title}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SortingGuide;
