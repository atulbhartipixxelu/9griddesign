import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

/* Layout */
import Header from "./layout/header/index.jsx";
import Footer from "./layout/footer/index.jsx";

/* Loader */
import UniqueLoader from "./common/Loader.jsx";

/* Global CSS */
import "./assets/css/style.css";
import "./assets/css/responsive.css";

/* Pages */
import Home from "./pages/home.jsx";
import AboutUs from "./pages/about-us.jsx";
import ContactUs from "./pages/contact-us.jsx";
import Recognition from "./pages/recognition.jsx";
import GalleryData from "./pages/gallery.jsx";
import ProjectData from "./pages/project.jsx";

/* Single Page */
import ProjectSingle from "@common/ProjectSingle.jsx";

/* ===============================
   BODY CLASS HANDLER
================================ */
function BodyClassHandler() {
  const location = useLocation();

  useEffect(() => {
    document.body.className = "";

    let pageClass = "";

    if (location.pathname.startsWith("/projects/")) {
      pageClass = "project-single";
    } else if (location.pathname === "/") {
      pageClass = "home";
    } else {
      pageClass = location.pathname
        .replace("/", "")
        .replace(/\/+/g, "-");
    }

    document.body.classList.add(`page-${pageClass}`);
  }, [location.pathname]);

  return null;
}

/* ===============================
   APP COMPONENT
================================ */
function App() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const loaderShown = sessionStorage.getItem("siteLoaderShown");

    if (!loaderShown) {
      setShowLoader(true);

      const timer = setTimeout(() => {
        setShowLoader(false);
        sessionStorage.setItem("siteLoaderShown", "true");
      }, 1800); // loader duration (ms)

      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        {/* Loader – Only First Visit */}
        {showLoader && <UniqueLoader />}

        <BodyClassHandler />

        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/project" element={<ProjectData />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/recognition" element={<Recognition />} />
          <Route path="/gallery" element={<GalleryData />} />

          {/* Dynamic Project Single */}
          <Route path="/projects/:slug" element={<ProjectSingle />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  );
}

export default App;
