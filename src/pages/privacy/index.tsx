import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { PrivacyHero } from "./sections/PrivacyHero";
import { PrivacyContent } from "./sections/PrivacyContent";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <PrivacyHero />
      </div>
      <PrivacyContent />
      <Footer />
    </main>
  );
}
