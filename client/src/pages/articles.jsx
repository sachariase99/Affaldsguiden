import useArticles from "../hooks/useArticles";
import { Link } from "react-router-dom";

const Articles = () => {
  // Fetch articles and manage loading and error states using the custom hook
  const { articles, loading, error } = useArticles(true);

  // Format the publication date into a readable format
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Display a loading message while fetching articles
  if (loading)
    return (
      <div className="w-full h-screen relative">
        <p className="absolute top-[30%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl">
          Loading...
        </p>
      </div>
    );

  // Display an error message if there is an error
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="h-full w-full bg-white mb-32 pb-4">
      {/* Section heading */}
      <h2 className="text-5xl px-8 py-16 font-bold">Artikler</h2>
      {/* Map through articles and display each one */}
      {articles.map(
        (article, index) =>
          article && (
            <div
              key={index} // Use a unique key for list items
              className="max-w-[1280px] mx-8 my-16 xl:my-10 flex flex-col-reverse xl:flex-row gap-4"
            >
              {/* Article image */}
              <img
                className="w-1/2 xl:w-1/3"
                src={article.image_url}
                alt="Affald i skoven" // Use a descriptive alt text for accessibility
              />
              <div className="flex flex-col justify-between">
                <div>
                  {/* Article title */}
                  <h3 className="text-xl font-semibold">{article.title}</h3>
                  {/* Formatted publication date */}
                  <p className="mb-2">{formatDate(article.published_at)}</p>
                  {/* Article teaser */}
                  <p>{article.teaser}</p>
                </div>
                {/* Link to the article detail page */}
                <Link to={`/articles/${article.id}`}>
                  <p className="text-blue-500 underline">Læs mere</p>
                </Link>
              </div>
            </div>
          )
      )}
    </section>
  );
};

export default Articles;
