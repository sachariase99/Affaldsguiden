import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import { useBackgroundColor } from "../context/BackgroundColorContext";

const Layout = () => {
  const { bgColor } = useBackgroundColor();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="z-50">
        <Header />
      </header>

      <main
        style={{
          backgroundImage: `linear-gradient(to bottom, ${bgColor} 10%, #FFFFFF 45%)`,
        }}
        className="w-full relative"
      >
        <div
          className="relative z-10 flex-grow max-w-[1280px] mx-auto px-8 xl:px-0"
          style={{ backgroundImage: "linear-gradient(to bottom, #D8EADB 40%, #FFFFFF 50%)" }}
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
