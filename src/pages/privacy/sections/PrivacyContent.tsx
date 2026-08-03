import { Reveal } from "@/components/Reveal";

export const SECTIONS = [
  {
    title: "Information We Collect",
    body: `When you interact with the TNPPL website or register for an event, we may collect:

- Contact information: name, email address, phone number
- Event registration details: franchise, player category, district
- Communication data: messages sent via our contact form or email
- Usage data: browser type, pages visited, time on site (via analytics tools)

We do not collect sensitive personal data such as financial details, government IDs, or health information through this website.`,
  },
  {
    title: "How We Use Your Information",
    body: `Information collected is used solely for:

- Processing event registrations and managing participant records
- Sending official TNPPL communications including schedule updates, results, and news
- Responding to enquiries and support requests
- Improving the website and user experience
- Sharing event-related information with sponsors and franchise owners where relevant

We do not sell or rent your personal information to third parties.`,
  },
  {
    title: "Sharing of Information",
    body: `We may share your information with:

- Tamil Nadu Pickleball Association (TNPA) — the organizing body for TNPPL
- Sports Development Authority of Tamil Nadu (SDAT) — affiliated governing body
- Event management partners and franchise owners, strictly for event operations
- Service providers assisting in website or event operations, under confidentiality agreements

All sharing is governed by this policy and applicable Indian data protection laws.`,
  },
  {
    title: "Cookies & Analytics",
    body: `This website uses cookies and analytics tools to understand user behaviour and improve the experience. By using this site, you consent to the use of cookies. You may disable cookies in your browser settings, though some features of the site may not function as intended.`,
  },
  {
    title: "Data Retention",
    body: `We retain personal data only as long as necessary for the purposes outlined in this policy, or as required by applicable law. Player and franchise registration data may be retained for the duration of the tournament season and for a reasonable period thereafter for record-keeping purposes.`,
  },
  {
    title: "Your Rights",
    body: `You have the right to:

- Access the personal data we hold about you
- Request correction of inaccurate data
- Request deletion of your data (subject to legal obligations)
- Withdraw consent to communications at any time

To exercise these rights, contact us at tnstatepa@gmail.com with the subject "Privacy Request".`,
  },
  {
    title: "Third-Party Links",
    body: `This website may contain links to third-party websites, including social media platforms and partner sites. TNPPL is not responsible for the privacy practices of these sites. We encourage you to review their privacy policies before submitting any information.`,
  },
  {
    title: "Changes to This Policy",
    body: `This Privacy Policy may be updated from time to time. Any material changes will be posted on this page with an updated revision date. Continued use of this website after changes constitutes acceptance of the revised policy.`,
  },
  {
    title: "Contact Us",
    body: `For any questions, concerns, or requests related to this Privacy Policy, please contact:\n\nTamil Nadu Pickleball Premier League (TNPPL)\nOrganized by Tamil Nadu Pickleball Association (TNPA)\nEmail: tnstatepa@gmail.com\nInstagram: @tamilnadupickleball.assn`,
  },
];

export function PrivacyContent() {
  const renderTitle = (text: string) => {
    return text.split(/([&-])/).map((part, i) => {
      if (part === '&') return <strong key={i} className="font-bold" style={{ fontFamily: "Arial, sans-serif" }}>&amp;</strong>;
      if (part === '-') return <strong key={i} className="font-bold" style={{ fontFamily: "Arial, sans-serif" }}>-</strong>;
      return part;
    });
  };

  return (
    <section className="py-10 sm:py-12 lg:py-14">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
        <div className="grid gap-6 lg:grid-cols-[200px_minmax(0,1fr)]">
          {/* Table of contents (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-8 space-y-1.5">
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-foreground/40">
                Contents
              </p>
              {SECTIONS.map(({ title }) => (
                <a
                  key={title}
                  href={`#${title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}`}
                  className="block text-[12px] text-foreground/50 transition-colors hover:text-gold"
                >
                  {renderTitle(title)}
                </a>
              ))}
            </div>
          </aside>

          {/* Content */}
          <div className="space-y-8">
            {SECTIONS.map(({ title, body }) => (
              <Reveal delay={100}>
              <div
                key={title}
                id={title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
                className="stat-card rounded-2xl p-6 sm:p-8"
              >
                <h2 className="display-title text-lg uppercase text-gold sm:text-xl">{renderTitle(title)}</h2>
                <div className="mt-4 space-y-3">
                  {body.split("\n\n").map((para, i) => (
                    <p key={i} className="whitespace-pre-line text-[14px] leading-relaxed text-foreground/65">
                      {para}
                    </p>
                  ))}
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
