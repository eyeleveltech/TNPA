import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FAQHero } from "./sections/FAQHero";
import { FAQSection } from "./sections/FAQSection";

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <FAQHero />
      </div>
      <FAQSection />
      <Footer />
    </main>
  );
}
