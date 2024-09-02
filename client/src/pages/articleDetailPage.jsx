import { useParams } from 'react-router-dom';
import useArticles from '../hooks/useArticles';
import styles from '../scss/articleDetailPage.module.scss';

const ArticleDetailPage = () => {
  const { id } = useParams();
  const { articles, loading, error } = useArticles(true);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const article = articles.find((article) => article.id === parseInt(id));

  if (!article) return <p>Article not found.</p>;

  // Convert the published_at string to a Date object
  const publishedDate = new Date(article.published_at);

  // Format the date as "Day, Month Date, Year"
  const formattedDate = publishedDate.toLocaleDateString('da-DK', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className='mb-64 px-12 py-12' style={{ backgroundImage: "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)" }}>
      <h1 className='text-4xl font-bold'>{article.title}</h1>
      <p className='text-3xl font-bold text-[#119B1E] mt-6'>{article.teaser}</p>
      <p className='my-6'>{formattedDate}</p> {/* Display formatted date */}
      <img className='mb-6' src={article.image_url} alt={article.title} />
      <div className={styles.html_content} dangerouslySetInnerHTML={{ __html: article.html_content }} />
    </div>
  );
};

export default ArticleDetailPage;
