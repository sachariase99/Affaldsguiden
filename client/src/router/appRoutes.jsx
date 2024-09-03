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

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/sortingGuide" element={<SortingGuide />} />
          <Route path="/sortingGuide/:id" element={<SortingDetailPage />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:id" element={<ArticleDetailPage />} />
          <Route path="/container" element={<OrderContainer />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRoutes;
