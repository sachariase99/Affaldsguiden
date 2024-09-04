import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useBackgroundColor } from "../context/BackgroundColorContext";
import { useEffect } from "react";

// Layout component for consistent page structure
const Layout = () => {
  // Retrieve background color from context
  const { bgColor } = useBackgroundColor();
  const navigate = useNavigate(); // Hook to programmatically navigate
  const location = useLocation(); // Hook to access the current location

  // Mapping of paths to page titles
  const pageTitles = {
    "/": "Home Page",
    "/home": "Home Page",
    "/sortingGuide": "Sorteringsguide",
    "/recycle": "Genbrugsstationer",
    "/articles": "Artikler",
    "/container": "Bestil Container",
  };

  // Function to get the title based on the current path
  const getTitle = (path) => {
    // Return the title if exact path is found
    if (pageTitles[path]) return pageTitles[path];

    // Handle paths that start with certain base paths
    const basePaths = ["/sortingGuide", "/recycle", "/articles"];
    for (const basePath of basePaths) {
      if (path.startsWith(basePath)) {
        return pageTitles[basePath] || "Default Title";
      }
    }

    return "Default Title"; // Default title for undefined paths
  };

  // Effect to redirect from root path to home path
  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home"); // Navigate to home if current path is root
    }
  }, [location, navigate]);

  // Effect to set document title based on the current path
  useEffect(() => {
    const path = location.pathname;
    const title = getTitle(path); // Get title based on path
    document.title = title; // Set document title
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-50">
        <Header /> {/* Header component */}
      </header>

      <main
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor} 10%, #FFFFFF 45%)`, // Background gradient based on context color
        }}
        className="w-full"
      >
        <div
          className="z-10 flex-grow max-w-[1280px] mx-auto px-8 xl:px-0 relative"
          style={{
            backgroundImage:
              "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)", // Additional background gradient
          }}
        >
          <Outlet /> {/* Render child routes here */}
        </div>
      </main>

      <footer className="mt-auto">
        <Footer /> {/* Footer component */}
      </footer>
    </div>
  );
};

export default Layout;
