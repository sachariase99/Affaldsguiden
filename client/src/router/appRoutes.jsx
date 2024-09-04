import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../layout/layout";
import LoginPage from "../pages/login";
import RegisterPage from "../pages/register";
import Home from "../pages/home";
import ArticleDetailPage from "../pages/articleDetailPage";
import Articles from "../pages/articles";
import OrderContainer from "../pages/orderContainer";
import SortingGuide from "../pages/sortingGuide";
import SortingDetailPage from "../pages/sortingDetailPage";
import Recycle from "../pages/recycle";
import RecycleDetailPage from "../pages/recycleDetailPage";

const AppRoutes = () => {
  return (
    <Router>
      {/* Router component wraps all routes */}
      <Routes>
        {/* Define all routes inside the Layout component */}
        <Route path="/" element={<Layout />}>
          {/* Route for the home page */}
          <Route path="/home" element={<Home />} />
          {/* Route for sorting guide overview */}
          <Route path="/sortingGuide" element={<SortingGuide />} />
          {/* Route for sorting guide details with dynamic id */}
          <Route path="/sortingGuide/:id" element={<SortingDetailPage />} />
          {/* Route for recycling overview */}
          <Route path="/recycle" element={<Recycle />} />
          {/* Route for recycling details with dynamic id */}
          <Route path="/recycle/:id" element={<RecycleDetailPage />} />
          {/* Route for articles overview */}
          <Route path="/articles" element={<Articles />} />
          {/* Route for article details with dynamic id */}
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          {/* Route for order container page */}
          <Route path="/container" element={<OrderContainer />} />
          {/* Route for login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for register page */}
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
