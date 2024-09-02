import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header className="z-50">
        <Header />
      </header>

      {/* Main content area */}
      <div
        style={{
          backgroundImage:
            "linear-gradient(to bottom, #06682D 10%, #FFFFFF 70%)",
        }}
        className="w-full"
      >
        <main
          className="relative z-10 flex-grow max-w-[1280px] mx-auto px-8 xl:px-0"
          style={{
            backgroundImage: "linear-gradient(to bottom, #D8EADB, rgba(255, 255, 255, 0))",
          }}          
        >
          <Outlet />
        </main>
      </div>

      {/* Footer at the bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
