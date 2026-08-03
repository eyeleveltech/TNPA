import { Download, Mail, ChevronRight, Image, FileText, Film } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import ASSET_PRIMARY_LOGO from "@/assets/TNPPL_S2_logo_blue.webp";
import ASSET_REVERSED_LOGO from "@/assets/TNPPL_S2_logo.webp";
import ASSET_TNPA_LOGO from "@/assets/TNPA LOGO (1).webp";
import ASSET_BRAND_MANUAL from "@/assets/TNPPL_BrandGuidelines.pdf";

type AssetItem = {
  name: string;
  size: string;
  downloadUrl?: string;
  fileName?: string;
};

export const ASSETS: {
  category: string;
  icon: any;
  color: string;
  items: AssetItem[];
  note: string;
}[] = [
  {
    category: "Logos & Brand Identity",
    icon: Image,
    color: "45 90% 58%",
    items: [
      {
        name: "TNPPL Primary Logo",
        size: "Transparent background, multiple sizes",
        downloadUrl: ASSET_PRIMARY_LOGO,
        fileName: "TNPPL_Primary_Logo.png",
      },
      {
        name: "TNPPL Logo Reversed (White on Dark)",
        size: "For dark backgrounds",
        downloadUrl: ASSET_REVERSED_LOGO,
        fileName: "TNPPL_Logo_Reversed.png",
      },
      {
        name: "TNPA Official Logo",
        size: "Organizing body",
        downloadUrl: ASSET_TNPA_LOGO,
        fileName: "TNPA_Official_Logo.png",
      },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Brand Guidelines",
    icon: FileText,
    color: "190 85% 58%",
    items: [
      {
        name: "TNPPL Brand Identity Manual",
        size: "Colors, typography, usage rules",
        downloadUrl: ASSET_BRAND_MANUAL,
        fileName: "TNPPL_BrandGuidelines.pdf",
      },
      { name: "Official Color Palette", size: "Navy #011837 · Gold #FFD000 · Chalk #F6F6F6" },
      { name: "Typography Guide", size: "Fontspring Podium (display) · Inter (body)" },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Press & Media",
    icon: FileText,
    color: "120 70% 55%",
    items: [
      { name: "Official Press Release — Season 2 Launch", size: "July 2026" },
      { name: "Event Fact Sheet", size: "Key dates, teams, format summary" },
      { name: "Franchise Owner Profiles", size: "Celebrity and corporate owners" },
      { name: "Event Schedule (When Published)", size: "17–20 September 2026" },
    ],
    note: "Available on request — email tnstatepa@gmail.com",
  },
  {
    category: "Photography & Video",
    icon: Film,
    color: "300 80% 62%",
    items: [
      { name: "Official Event Photography", size: "Available post-event" },
      { name: "TNPPL Opener / Promo Video", size: "For broadcast and social use" },
      { name: "Player Action Shots", size: "Available after Player Auction" },
    ],
    note: "High-resolution assets available to accredited media only",
  },
];

export const PRESS_CONTACTS = [
  { name: "Dr Kavya Somesh", role: "TNPA — Tournament Director", phone: "+91 98944 27793", tel: "+919894427793" },
  { name: "Yogesh Ramchandani", role: "TNPA — Operations", phone: "+91 98841 30737", tel: "+919884130737" },
];

export function MediaKitContent() {
  const handleDownloadAsset = async (e: React.MouseEvent, url: string, targetName: string) => {
    e.preventDefault();
    if (targetName.toLowerCase().endsWith(".pdf") || url.toLowerCase().includes(".pdf")) {
      const pdfFileName = targetName.toLowerCase().endsWith(".pdf")
        ? targetName
        : `${targetName.replace(/\.[^/.]+$/, "")}.pdf`;
      const a = document.createElement("a");
      a.href = url;
      a.download = pdfFileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    const finalFileName = targetName.endsWith(".png")
      ? targetName
      : `${targetName.replace(/\.[^/.]+$/, "")}.png`;

    try {
      const img = new window.Image();
      img.crossOrigin = "anonymous";
      img.src = url;
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
      });

      const canvas = document.createElement("canvas");
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const pngUrl = canvas.toDataURL("image/png");
        const a = document.createElement("a");
        a.href = pngUrl;
        a.download = finalFileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        return;
      }
    } catch (err) {
      console.warn("Canvas PNG conversion fallback", err);
    }

    // Direct fallback
    const a = document.createElement("a");
    a.href = url;
    a.download = finalFileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        {/* CTA banner */}
        <Reveal delay={100}>
        <div
          className="stat-card mb-12 rounded-2xl p-6 sm:flex sm:items-center sm:justify-between sm:p-8"
          style={{
            background: "linear-gradient(135deg, color-mix(in oklab, var(--gold) 12%, var(--card)), var(--card))",
          }}
        >
          <div>
            <h2 className="display-title text-xl text-foreground sm:text-2xl">
              Request the Full Media Kit
            </h2>
            <p className="mt-2 text-[14px] text-foreground/65">
              Email us with your organization name and press credentials to receive the complete asset bundle.
            </p>
          </div>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Media Kit Request — TNPPL Season 2"
            className="btn-gold mt-5 inline-flex shrink-0 items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest sm:mt-0"
          >
            <Mail className="h-4 w-4" />
            Request Kit
          </a>
        </div>
        </Reveal>

        {/* Asset categories */}
        <Reveal delay={200}>
        <div className="grid gap-6 lg:grid-cols-2">
          {ASSETS.map(({ category, icon: Icon, color, items, note }) => (
            <div key={category} className="stat-card rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `color-mix(in oklab, hsl(${color}) 15%, var(--card))`,
                    border: `1px solid color-mix(in oklab, hsl(${color}) 30%, transparent)`,
                  }}
                >
                  <Icon className="h-5 w-5" style={{ color: `hsl(${color})` }} strokeWidth={1.5} />
                </div>
                <h3 className="display-title text-lg text-gold">
                  {category.includes("&") ? (
                    <>
                      {category.split("&")[0]}
                      <span style={{ fontFamily: "Arial, sans-serif", fontWeight: "bold" }}>&amp;</span>
                      {category.split("&")[1]}
                    </>
                  ) : (
                    category
                  )}
                </h3>
              </div>
              <ul className="mt-5 space-y-3">
                {items.map((item) => (
                  <li key={item.name} className="flex items-center justify-between gap-3 border-b border-border pb-3 last:border-0 last:pb-0">
                    <div>
                      {item.downloadUrl ? (
                        <a
                          href={item.downloadUrl}
                          download={item.fileName || item.name}
                          onClick={(e) => handleDownloadAsset(e, item.downloadUrl!, item.fileName || item.name)}
                          className="group block"
                        >
                          <p className="text-[13px] font-semibold text-foreground group-hover:text-gold transition-colors">
                            {item.name}
                          </p>
                          <p className="text-[11px] text-foreground/50">{item.size}</p>
                        </a>
                      ) : (
                        <>
                          <p className="text-[13px] font-semibold text-foreground">{item.name}</p>
                          <p className="text-[11px] text-foreground/50">{item.size}</p>
                        </>
                      )}
                    </div>
                    {item.downloadUrl ? (
                      <a
                        href={item.downloadUrl}
                        download={item.fileName || item.name}
                        onClick={(e) => handleDownloadAsset(e, item.downloadUrl!, item.fileName || item.name)}
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gold/15 text-gold hover:bg-gold hover:text-ink transition-all duration-200 cursor-pointer shadow-sm"
                        title={`Download ${item.name}`}
                      >
                        <Download className="h-4 w-4" />
                      </a>
                    ) : null}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-[11px] text-foreground/40 italic">{note}</p>
            </div>
          ))}
        </div>
        </Reveal>

        {/* Media accreditation */}
        <Reveal delay={300}>
        <div className="mt-12 stat-card rounded-2xl p-6 sm:p-8">
          <h2 className="display-title text-xl text-foreground sm:text-2xl">
            Media <span className="text-gold-gradient">Accreditation</span>
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-foreground/65">
            Accredited media personnel receive access to designated press areas, photography zones, and post-match interviews. Apply with your press credentials at least 7 days before the event.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {PRESS_CONTACTS.map((c) => (
              <div key={c.name} className="rounded-xl border border-border p-4">
                <p className="text-[13px] font-bold text-foreground">{c.name}</p>
                <p className="text-[11px] text-foreground/50">{c.role}</p>
                <a
                  href={`tel:${c.tel}`}
                  className="mt-2 inline-flex items-center gap-1.5 text-[12px] text-gold hover:text-gold/80"
                >
                  <ChevronRight className="h-3.5 w-3.5" />
                  {c.phone}
                </a>
              </div>
            ))}
          </div>
          <a
            href="mailto:tnstatepa@gmail.com?subject=Media Accreditation — TNPPL Season 2"
            className="btn-outline-light mt-6 inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest"
          >
            Apply for Accreditation
            <ChevronRight className="h-4 w-4" />
          </a>
        </div>
        </Reveal>
      </div>
    </section>
  );
}
