import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { RulesHero } from "./sections/RulesHero";
import { RulesContent } from "./sections/RulesContent";

export default function RulesPage() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <RulesHero />
      </div>
      <RulesContent />
      <Footer />
    </main>
  );
}
