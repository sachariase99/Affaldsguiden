import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useBackgroundColor } from "../context/BackgroundColorContext";
import { useEffect } from "react";

const Layout = () => {
  const { bgColor } = useBackgroundColor();
  const navigate = useNavigate();
  const location = useLocation();

  const pageTitles = {
    "/": "Home Page",
    "/home": "Home Page",
    "/sortingGuide": "Sorteringsguide",
    "/recycle": "Genbrugsstationer",
    "/articles": "Artikler",
    "/container": "Bestil Container",
  };

  // Function to get title for the given path
  const getTitle = (path) => {
    // Return the title for static routes
    if (pageTitles[path]) return pageTitles[path];

    // Check for dynamic routes by matching base paths
    const basePaths = ["/sortingGuide", "/recycle", "/articles"];
    for (const basePath of basePaths) {
      if (path.startsWith(basePath)) {
        return pageTitles[basePath] || "Default Title";
      }
    }

    // Default title if no match
    return "Default Title";
  };

  useEffect(() => {
    // Redirect to /home if the current path is /
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  useEffect(() => {
    // Set the document title based on the current path
    const path = location.pathname;
    const title = getTitle(path);
    document.title = title; // Set the document title
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-50">
        <Header />
      </header>

      <main
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor} 10%, #FFFFFF 45%)`,
        }}
        className="w-full"
      >
        <div
          className="z-10 flex-grow max-w-[1280px] mx-auto px-8 xl:px-0 relative"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)",
          }}
        >
          <Outlet />
        </div>
      </main>

      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
