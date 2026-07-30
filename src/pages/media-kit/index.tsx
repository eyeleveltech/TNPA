import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MediaKitHero } from "./sections/MediaKitHero";
import { MediaKitContent } from "./sections/MediaKitContent";

export default function MediaKitPage() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <MediaKitHero />
      </div>
      <MediaKitContent />
      <Footer />
    </main>
  );
}
