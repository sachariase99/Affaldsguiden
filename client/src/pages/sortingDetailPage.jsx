import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import useSortingGuide from "../hooks/useSortingGuide";
import { useBackgroundColor } from "../context/BackgroundColorContext";

const SortingDetailPage = () => {
  const { id } = useParams();
  const { sections, loading, error } = useSortingGuide();
  const [openCategoryId, setOpenCategoryId] = useState(null);
  const { setBgColor } = useBackgroundColor();

  useEffect(() => {
    const section = sections.find((section) => section.id == parseInt(id));

    if (section) {
      const color = `#${section.color}`;
      setBgColor(color);
    }

    return () => {
      setBgColor("#06682D");
    };
  }, [id, sections, setBgColor]);

  const toggleMenu = (categoryId) => {
    setOpenCategoryId(openCategoryId === categoryId ? null : categoryId);
  };

  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );
  if (error) return <p>Error: {error}</p>;

  const section = sections.find((section) => section.id == parseInt(id));

  if (!section) return <p>Section not found</p>;

  return (
    <div>
      <div className="py-8 mx-8 grid grid-cols-1 gap-16">
        {section.categories.map((category) => (
          <div
            key={category.id}
            className={`relative flex flex-col justify-between border border-[#677D6A] rounded-lg px-8 transition-all duration-500 ease-in-out ${
              openCategoryId === category.id ? "h-auto" : ""
            }`}
          >
            <div className="flex justify-between">
              <div className="flex items-end">
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
            <span
              className="absolute left-1/2 -translate-x-1/2 -bottom-6 h-12 w-12 cursor-pointer bg-[#D8EADB] border border-[#677D6A] rounded-full flex items-center justify-center"
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
