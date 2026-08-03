import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import LOGO_SRC from "../assets/Tnppl.webp";

export function NotFound() {
  return (
    <div className="flex min-h-screen flex-col bg-ink selection:bg-gold/30 selection:text-gold relative overflow-hidden">
      <div className="absolute inset-0 z-0 bg-ink pointer-events-none" />
      <div 
        className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-size-[4rem_4rem] pointer-events-none mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" 
      />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center p-6 text-center animate-fade-up">
        <Link to="/" className="mb-10 inline-block transition-transform hover:scale-105">
          <img
            src={LOGO_SRC}
            alt="TNPPL Logo"
            className="h-20 sm:h-24 md:h-32 w-auto"
          />
        </Link>
        
        <h1 className="text-9xl font-bold text-transparent bg-clip-text bg-linear-to-b from-gold to-gold/50 font-display">
          404
        </h1>
        
        <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">
          Out of Bounds!
        </h2>
        
        <p className="mt-4 max-w-md text-foreground/70 sm:text-lg" style={{ fontFamily: "Arial, sans-serif" }}>
          It looks like the page you are looking for has been hit out of the court. Let's get you back in the game!
        </p>
        
        <div className="mt-10">
          <Link
            to="/"
            className="btn-gold inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-bold uppercase tracking-[0.08em] shadow-[0_0_20px_rgba(255,208,0,0.3)] hover:shadow-[0_0_30px_rgba(255,208,0,0.5)] transition-all"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home Court
          </Link>
        </div>
      </div>
    </div>
  );
}
