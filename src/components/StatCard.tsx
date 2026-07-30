import type { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  delay?: number;
  children: React.ReactNode;
}

export function StatCard({ icon: Icon, delay = 0, children }: StatCardProps) {
  return (
    <li
      className="stat-card animate-fade-up flex items-center gap-4 rounded-xl px-5 py-4 sm:px-6 sm:py-5"
      style={{ animationDelay: `${delay}ms` }}
    >
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-gold/40 text-gold sm:h-14 sm:w-14"
        aria-hidden="true"
      >
        <Icon className="h-6 w-6 sm:h-7 sm:w-7" strokeWidth={1.5} />
      </span>
      <div className="min-w-0">{children}</div>
    </li>
  );
}
