import homeHeaderBg from "../assets/malerspande.jpg";
import useArticles from "../hooks/useArticles";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeHeaderCards = () => {
  // Destructure articles, loading, and error states from the useArticles hook
  const { articles, loading, error } = useArticles(true);

  // Display a loading message while articles are being fetched
  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );
  
  // Display an error message if there's an issue fetching articles
  if (error) return <p>Error: {error}</p>;

  // Function to format the article title with a special styling
  const renderArticleTitle = (title) => {
    // Check if title contains " - " to split into two parts
    const separatorIndex = title.indexOf(" - ");

    if (separatorIndex !== -1) {
      const firstPart = title.substring(0, separatorIndex + 2); // First part of the title
      const secondPart = title.substring(separatorIndex + 3); // Second part of the title

      return (
        <p>
          <span className="text-2xl font-bold">{firstPart}</span>
          <br />
          <span className="text-xl text-[#119B1E] font-bold">{secondPart}</span>
        </p>
      );
    }

    // If no separator, split the title into first word and the rest
    const firstSpaceIndex = title.indexOf(" ");
    const firstWord = title.substring(0, firstSpaceIndex);
    const restOfTitle = title.substring(firstSpaceIndex + 1);

    return (
      <p>
        <span className="text-2xl font-bold">{firstWord}</span>
        <br />
        <span className="text-lg text-[#119B1E] font-bold">
          - {restOfTitle}
        </span>
      </p>
    );
  };

  return (
    <section className="relative top-0 z-0">
      {/* Background image and gradient overlays for large screens */}
      <div className="relative hidden xl:block">
        <img
          className="w-full bg-cover"
          src={homeHeaderBg}
          alt="Header Background Image"
        />
        <div
          className="absolute bottom-48 h-48 w-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, #D2E4D9 90%)",
          }}
        ></div>
        <div
          className="h-48 w-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, rgba(255, 255, 255, 0) 10%, #ffffff 90%)",
          }}
        ></div>
      </div>

      {/* Cards section with articles */}
      <div className="relative xl:absolute pt-16 xl:bottom-0 left-1/2 -translate-x-1/2 z-50 grid grid-cols-1 lg:grid-cols-2 gap-8 w-4/5">
        {/* Map over selected articles to display them */}
        {[articles[6], articles[0]].map(
          (article, index) =>
            article && (
              <div
                key={index}
                className="bg-white rounded-xl px-6 py-6 flex flex-col justify-between shadow"
              >
                <div>
                  {/* Display formatted article title and teaser */}
                  <h3>{renderArticleTitle(article.title)}</h3>
                  <p className="mt-2">{article.teaser}</p>
                </div>
                {/* Link to the article details page with an arrow icon */}
                <Link to={`/articles/${article.id}`}>
                  <FaArrowAltCircleRight className="text-6xl mt-4 hover:text-[#D6BD98]" />
                </Link>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default HomeHeaderCards;
