import { Link } from "react-router-dom";
import useSortingGuide from "../hooks/useSortingGuide";

const SortingGuide = () => {
  const { sections, loading, error } = useSortingGuide();

  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="pt-16 pb-8 mb-64 mx-8">
      <h2 className="text-4xl font-semibold">Sorteringsguide</h2>
      <h3 className="text-2xl font-semibold text-[#119B1E]">Vælg en sektion</h3>
      <div className="mt-8 grid grid-cols-1 xl:grid-cols-2 gap-16">
        {sections.map((section) => (
          <Link key={section.id} to={`/sortingGuide/${section.id}`}>
            <div
              className="grid grid-cols-3 text-white shadow rounded-l-lg"
              style={{ backgroundColor: `#${section.color}` }}
            >
              <h2 className="col-span-2 flex items-end p-8 text-2xl font-semibold">
                {section.title}
              </h2>
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
