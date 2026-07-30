import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FormatHero } from "./sections/FormatHero";
import { FormatDetails } from "./sections/FormatDetails";

export default function FormatPage() {
  return (
    <main className="min-h-screen bg-ink text-foreground">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <FormatHero />
      </div>
      <FormatDetails />
      <Footer />
    </main>
  );
}
