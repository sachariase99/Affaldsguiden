import { Outlet } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Sticky navbar */}
      <header className="sticky top-0 z-50">
        <Header />
      </header>

      {/* Main content area */}
      <main className="flex-grow max-w-[1280px] mx-8 xl:mx-auto xl:w-full">
        <Outlet />
      </main>

      {/* Footer at the bottom */}
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
