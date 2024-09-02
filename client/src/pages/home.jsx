import homeHeaderBg from "../assets/malerspande.jpg";
import useArticles from "../hooks/useArticles";

const Home = () => {
  const { articles, loading, error } = useArticles(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="h-screen">
      <div className="relative -top-32">
        <img
          className="w-full bg-cover"
          src={homeHeaderBg}
          alt="Header Background Image"
        />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
          {articles.slice(0, 2).map((article) => (
            <div key={article.id}>
              <p>{article.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
