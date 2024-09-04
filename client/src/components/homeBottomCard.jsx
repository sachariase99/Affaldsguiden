import useArticles from "../hooks/useArticles.jsx";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import affaldssortering from "../assets/affaldssortering-1.jpg"; // This import is not used in the component

const HomeBottomCard = () => {
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
    <section className="h-full w-full bg-white shadow mb-32">
      {[articles[7]].map(
        (article, index) =>
          article && (
            <div
              key={index}
              className="max-w-[1280px] py-16 xl:py-0 mx-16 xl:mx-auto flex flex-col xl:flex-row items-center"
            >
              {/* Article image */}
              <img
                className="w-1/3"
                src={article.image_url} // Display article image
                alt="Affald i skoven"
              />
              <div className="flex flex-col mx-8 mt-8 xl:mt-0">
                {/* Description heading */}
                <h3 className="text-2xl text-[#119B1E] font-bold xl:mb-64">
                  Få gode idéer til, hvordan du gør det nemt at sortere affaldet hjemme hos dig.
                </h3>
                <div>
                  {/* Article title rendering */}
                  <h3>{renderArticleTitle(article.title)}</h3>
                  {/* Link to the article details page */}
                  <Link to={`/articles/${article.id}`}>
                    <FaArrowAltCircleRight className="text-6xl mt-4 hover:text-[#D6BD98]" />
                  </Link>
                </div>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default HomeBottomCard;
