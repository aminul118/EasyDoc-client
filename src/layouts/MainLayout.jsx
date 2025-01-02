import { Outlet } from "react-router-dom";
import Footer from "../pages/shared/Footer/Footer";
import Navbar from "../pages/shared/Navbar/Navbar";
import AOS from "aos";
import "aos/dist/aos.css"; // Required AOS styles
import { useEffect } from "react";

const MainLayout = () => {
  useEffect(() => {
    AOS.init({
      duration: 500,
      once: true,
    });
    AOS.refresh();
    return () => {
      AOS.refreshHard();
    };
  }, []);

  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-220px)] pt-16">
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
