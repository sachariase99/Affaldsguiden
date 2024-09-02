import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { articles, loading, error } = useArticles(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) return <p>Article not found.</p>;

  return (
    <div className="h-96">
      <h1>{article.title}</h1>
      <p>{article.teaser}</p>
      <div>{article.content}</div>
    </div>
  );
};

export default ArticleDetailPage;
