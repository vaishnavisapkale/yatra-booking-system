import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <div className="flex-grow bg-surface-muted">{children}</div>

      <Footer />
    </div>
  );
}

export default MainLayout;
