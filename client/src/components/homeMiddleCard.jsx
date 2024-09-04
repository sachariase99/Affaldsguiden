import useArticles from "../hooks/useArticles";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const HomeMiddleCard = () => {
  // Custom hook to fetch articles; 'true' might be a flag for some condition
  const { articles } = useArticles(true);

  // Function to format the article title into multiple lines
  const renderArticleTitle = (title) => {
    const words = title.split(" "); // Split title into words

    const lines = [];
    // Break words into lines with up to 3 words per line
    for (let i = 0; i < words.length; i += 3) {
      lines.push(words.slice(i, i + 3).join(" "));
    }

    return (
      <p>
        {lines.map((line, index) => (
          <span key={index}>
            <span className={`text-4xl font-bold ${index === 0 ? '' : 'text-2xl text-[#119B1E] font-bold'}`}>
              {line}
            </span>
            <br />
          </span>
        ))}
      </p>
    );
  };

  return (
    <section className="w-screen relative my-16 left-1/2 -ml-[50vw] bg-[#D8EADB]">
      {/* Map over the array to display the article at index 1 */}
      {[articles[1]].map(
        (article, index) =>
          article && (
            <div
              key={index}
              className="max-w-[1280px] py-16 xl:py-0 mx-16 xl:mx-auto flex flex-col items-center xl:grid xl:grid-cols-5"
            >
              {/* Content section */}
              <div className="xl:col-span-3 flex flex-col justify-evenly h-full">
                {/* Title rendering */}
                <h3>{renderArticleTitle(article.title)}</h3>
                <p>{article.teaser}</p>
                <div className="flex justify-end xl:justify-normal my-8">
                  {/* Link to the article details page */}
                  <Link to={`/articles/${article.id}`}>
                    <FaArrowAltCircleRight className="text-6xl hover:text-[#D6BD98]" />
                  </Link>
                </div>
              </div>
              {/* Article image */}
              <img
                className="xl:col-span-2"
                src={article.image_url}
                alt="Affald i skoven"
              />
            </div>
          )
      )}
    </section>
  );
};

export default HomeMiddleCard;
