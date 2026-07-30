import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { SponsorshipHero } from "./sections/SponsorshipHero";
import { SponsorshipContent } from "./sections/SponsorshipContent";

export default function SponsorshipPage() {
  return (
    <main className="min-h-screen bg-ink text-foreground">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <SponsorshipHero />
      </div>
      <SponsorshipContent />
      <Footer />
    </main>
  );
}
