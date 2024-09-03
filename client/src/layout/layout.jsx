import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useBackgroundColor } from "../context/BackgroundColorContext";
import { useEffect } from "react";

const Layout = () => {
  const { bgColor } = useBackgroundColor();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Navigate to /home if the current path is /
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

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
