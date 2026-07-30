import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Hero } from "./sections/Hero";
import { About } from "./sections/About";
import { Teams } from "./sections/Teams";
import { Players } from "./sections/Players";
import { Schedule } from "./sections/Schedule";
import { Sponsors } from "./sections/Sponsors";
import { News } from "./sections/News";
import { Contact } from "./sections/Contact";

export default function IndexPage() {
  return (
    <main className="min-h-screen bg-ink">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <Hero />
      </div>
      <About />
      <Teams />
      <Players />
      <Schedule />
      <Sponsors />
      <News />
      <Contact />
      <Footer />
    </main>
  );
}
