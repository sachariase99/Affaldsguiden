import useArticles from "../hooks/useArticles";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";

const Articles = () => {
  const { articles, loading, error } = useArticles(true);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading)
    return (
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
        Loading...
      </p>
    );
  if (error) return <p>Error: {error}</p>;

  return (
    <section
      className="h-full w-full bg-white shadow mb-32 pb-4"
      style={{
        backgroundImage: "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)",
      }}
    >
      <h2 className="text-5xl px-8 py-16 font-bold">Artikler</h2>
      {articles.map(
        (article, index) =>
          article && (
            <div
              key={index}
              className="max-w-[1280px] mx-8 my-16 xl:my-10 flex flex-col-reverse xl:flex-row gap-4"
            >
              <img
                className="w-1/2 xl:w-1/3"
                src={article.image_url}
                alt="Affald i skoven"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  <p className="mb-2">{formatDate(article.published_at)}</p>
                  <p>{article.teaser}</p>
                </div>
                <Link to={`/articles/${article.id}`}>
                  <p>Læs mere</p>
                </Link>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default Articles;
