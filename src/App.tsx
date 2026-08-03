import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import IndexPage from "./pages/home";
import FAQPage from "./pages/faq";
import FormatPage from "./pages/format";
import MediaKitPage from "./pages/media-kit";
import PrivacyPage from "./pages/privacy";
import RulesPage from "./pages/rules";
import SponsorshipPage from "./pages/sponsorship";
import { NotFound } from "./pages/NotFound";
import { BackToTop } from "./components/BackToTop";

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      let attempts = 0;

      const tryScroll = () => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      // Delay slightly to ensure React has painted the new page components
      setTimeout(tryScroll, 150);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToHash />
      <BackToTop />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/format" element={<FormatPage />} />
        <Route path="/media-kit" element={<MediaKitPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
