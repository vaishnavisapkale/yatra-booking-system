import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Navbar */}
      <Navbar />

      {/* Content */}
      <div className="flex-grow bg-[#fdf6f6] ">
        {children}
      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default MainLayout;