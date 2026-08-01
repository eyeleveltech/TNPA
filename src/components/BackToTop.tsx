import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-gold text-navy shadow-[0_4px_20px_rgba(244,196,48,0.4)] transition-all duration-300 hover:-translate-y-1 hover:scale-105 hover:shadow-[0_8px_28px_rgba(244,196,48,0.65)] active:scale-95 sm:right-8 sm:bottom-8 ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5 stroke-[2.5]" />
    </button>
  );
}
