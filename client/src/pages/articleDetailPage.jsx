import { useParams } from "react-router-dom";
import useArticles from "../hooks/useArticles";
import styles from "../scss/articleDetailPage.module.scss";

const ArticleDetailPage = () => {
  // Extract article ID from the URL parameters
  const { id } = useParams();
  
  // Fetch articles and manage loading and error states
  const { articles, loading, error } = useArticles(true);

  // Show a loading message while articles are being fetched
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

  // Find the specific article based on the ID from URL parameters
  const article = articles.find((article) => article.id === parseInt(id));

  // Show a message if the article is not found
  if (!article) return <p>Article not found.</p>;

  // Format the published date
  const publishedDate = new Date(article.published_at);
  const formattedDate = publishedDate.toLocaleDateString("da-DK", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <article className="mb-64 px-12 py-12">
      {/* Display the article title */}
      <h1 className="text-4xl font-bold">{article.title}</h1>
      
      {/* Display the article teaser */}
      <p className="text-3xl font-bold text-[#119B1E] mt-6">{article.teaser}</p>
      
      {/* Display the formatted publication date */}
      <p className="my-6">{formattedDate}</p>
      
      {/* Display the article image */}
      <img className="mb-6" src={article.image_url} alt={article.title} />
      
      {/* Display the article content with HTML */}
      <div
        className={styles.html_content} // Apply custom styles from SCSS module
        dangerouslySetInnerHTML={{ __html: article.html_content }} // Render HTML content
      />
    </article>
  );
};

export default ArticleDetailPage;
