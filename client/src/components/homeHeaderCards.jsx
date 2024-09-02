import homeHeaderBg from "../assets/malerspande.jpg";
import useArticles from "../hooks/useArticles";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeHeaderCards = () => {
  const { articles, loading, error } = useArticles(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const renderArticleTitle = (title) => {
    const separatorIndex = title.indexOf(" - ");

    if (separatorIndex !== -1) {
      const firstPart = title.substring(0, separatorIndex + 2);
      const secondPart = title.substring(separatorIndex + 3);

      return (
        <p>
          <span className="text-2xl font-bold">{firstPart}</span>
          <br />
          <span className="text-xl text-[#119B1E] font-bold">{secondPart}</span>
        </p>
      );
    }

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
    <section className="relative top-0 home-header z-0">
      <img
        className="w-full bg-cover header-image hidden lg:block"
        src={homeHeaderBg}
        alt="Header Background Image"
      />
      <div className="relative lg:absolute pt-4 lg:bottom-0 left-1/2 -translate-x-1/2 z-50 grid grid-cols-1 lg:grid-cols-2 gap-8 w-4/5">
        {[articles[6], articles[0]].map(
          (article, index) =>
            article && (
              <div
                key={index}
                className="bg-white rounded-xl px-6 py-6 flex flex-col justify-between"
              >
                <div>
                  <h3>{renderArticleTitle(article.title)}</h3>
                  <p className="mt-2">{article.teaser}</p>
                </div>
                <Link>
                  <FaArrowAltCircleRight className="text-6xl mt-4" />
                </Link>
              </div>
            )
        )}
      </div>
    </section>
  );
};

export default HomeHeaderCards;
