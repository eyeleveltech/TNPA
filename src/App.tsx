import { BrowserRouter, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/home";
import FAQPage from "./pages/faq";
import FormatPage from "./pages/format";
import MediaKitPage from "./pages/media-kit";
import PrivacyPage from "./pages/privacy";
import RulesPage from "./pages/rules";
import SponsorshipPage from "./pages/sponsorship";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/format" element={<FormatPage />} />
        <Route path="/media-kit" element={<MediaKitPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/rules" element={<RulesPage />} />
        <Route path="/sponsorship" element={<SponsorshipPage />} />
      </Routes>
    </BrowserRouter>
  );
}
