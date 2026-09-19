/**
 * Group chooser, shared by the standings and results sections.
 *
 * Both render their own copy but write to one piece of state in the page, so
 * choosing a group in either moves both. Two independent switchers on one page
 * would let the tables disagree about which group you are looking at.
 */
export function GroupSwitcher({
  groups,
  active,
  onChange,
  label,
}: {
  groups: string[];
  active: string;
  onChange: (group: string) => void;
  label: string;
}) {
  // Nothing to switch between.
  if (groups.length < 2) return null;

  return (
    <div
      role="tablist"
      aria-label={label}
      className="inline-flex flex-wrap gap-1.5 rounded-2xl p-1.5"
      style={{
        border: "1px solid var(--color-border)",
        background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
      }}
    >
      {groups.map((group) => {
        const isActive = group === active;
        return (
          <button
            key={group}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(group)}
            className={`rounded-xl px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-5 sm:text-[13px] ${
              isActive ? "text-ink" : "text-foreground/60 hover:text-foreground"
            }`}
            style={{ background: isActive ? "var(--gold)" : "transparent" }}
          >
            {group}
          </button>
        );
      })}
    </div>
  );
}
