import useArticles from "../hooks/useArticles";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import affaldssortering from "../assets/affaldssortering-1.jpg";

const HomeBottomCard = () => {
  const { articles } = useArticles(true);

  const renderArticleTitle = (title) => {
    // Split the title into an array of words
    const words = title.split(" ");
  
    // Group words into lines with 3 words per line
    const lines = [];
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
      {[articles[3]].map(
        (article, index) =>
          article && (
            <div
              key={index}
              className="max-w-[1280px] py-16 xl:py-0 mx-16 xl:mx-auto flex flex-col xl:flex-row items-center"
            >
              <img
                className="w-1/3"
                src={affaldssortering}
                alt="Affald i skoven"
              />
              <div className="flex flex-col mx-8 mt-8 xl:mt-0">
                <h3 className="text-2xl text-[#119B1E] font-bold xl:mb-64">Få gode idéer til, hvordan du gør det nemt at sortere affaldet hjemme hos dig.</h3>
                <div>
                  <h3>{renderArticleTitle(article.title)}</h3>
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
