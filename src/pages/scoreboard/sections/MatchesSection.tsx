import { useState } from "react";
import { CalendarClock } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { GroupSwitcher } from "./GroupSwitcher";
import { UpcomingBody } from "./UpcomingSection";
import { ResultsBody } from "./ResultsSection";
import type { UpcomingState } from "@/hooks/useUpcoming";
import type { ResultsState } from "@/hooks/useResults";

type View = "upcoming" | "results";

/* ─────────────────────────────────────────────
   MATCHES

   Upcoming and results were two separate sections stacked on one page, each
   with its own heading and its own copy of the group switcher. That is three
   switchers on a single screen counting the standings, and a lot of vertical
   space spent on chrome rather than content.

   They are one section now, with a view toggle. Both halves answer the same
   question — what has happened in this group and what is left — so they
   belong behind one pair of buttons rather than one above the other.
───────────────────────────────────────────── */

export function MatchesSection({
  upcoming,
  results,
  activeGroup,
  onGroupChange,
}: {
  upcoming: UpcomingState;
  results: ResultsState;
  /** Shared with the standings section. */
  activeGroup: string | null;
  onGroupChange: (group: string) => void;
}) {
  const [picked, setPicked] = useState<View | null>(null);

  const loading = upcoming.isLoading || results.isLoading;
  if (loading) return null;

  /* Group names come from whichever list has them. Results can be empty on
     day one morning, and upcoming empties on the final afternoon, so neither
     alone is a reliable source. */
  const groupNames = [
    ...new Set([
      ...upcoming.groups.map((g) => g.groupName),
      ...results.ties.map((t) => t.groupName),
    ]),
  ]
    .filter(Boolean)
    .sort();

  if (groupNames.length === 0) return null;

  const activeGroupName =
    activeGroup !== null && groupNames.includes(activeGroup)
      ? activeGroup
      : groupNames[0];

  const groupUpcoming =
    upcoming.groups.find((g) => g.groupName === activeGroupName) ?? null;
  const hasUpcoming =
    groupUpcoming !== null &&
    (groupUpcoming.nextMatches.length > 0 || groupUpcoming.ties.length > 0);

  const groupTies =
    groupNames.length > 1
      ? results.ties.filter((t) => t.groupName === activeGroupName)
      : results.ties;
  const hasResults = groupTies.length > 0;

  if (!hasUpcoming && !hasResults) return null;

  /* Default to results, which is the larger body of content, but fall back to
     upcoming when nothing has finished yet — day one morning — and to results
     once everything has been played. A tab with nothing behind it is hidden
     rather than shown empty. */
  const fallback: View = hasResults ? "results" : "upcoming";
  const view: View =
    picked === "upcoming" && hasUpcoming
      ? "upcoming"
      : picked === "results" && hasResults
        ? "results"
        : fallback;

  const matchCount = groupTies.reduce((n, t) => n + t.matches.length, 0);

  const tabs: Array<{ id: View; label: string; show: boolean }> = [
    { id: "upcoming", label: "Still To Play", show: hasUpcoming },
    { id: "results", label: "Results", show: hasResults },
  ];
  const visibleTabs = tabs.filter((t) => t.show);

  return (
    <Reveal delay={80}>
      <section className="mt-10 sm:mt-12">
        <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
          <h2 className="inline-block text-[11px] font-black uppercase tracking-[0.22em] text-foreground">
            Matches
            <span className="mt-1.5 block h-0.5 w-8 rounded-full bg-gold" aria-hidden="true" />
          </h2>

          {/* The note changes with the view: results state how many, upcoming
              states plainly that no times exist rather than implying any. */}
          {view === "results" ? (
            <span
              className="text-[11px] text-foreground/40"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              {matchCount} match{matchCount === 1 ? "" : "es"} completed
            </span>
          ) : (
            <span
              className="inline-flex items-center gap-1.5 text-[11px] text-foreground/40"
              style={{ fontFamily: "Arial, sans-serif" }}
            >
              <CalendarClock className="h-3.5 w-3.5" aria-hidden="true" />
              Order of play — start times are not published
            </span>
          )}
        </div>

        {/* Group on the left, view on the right: two different questions, so
            two controls, but one row rather than two stacked switchers. */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <GroupSwitcher
            groups={groupNames}
            active={activeGroupName}
            onChange={onGroupChange}
            label="Choose a group"
          />

          {visibleTabs.length > 1 && (
            <div
              role="tablist"
              aria-label="Upcoming matches or results"
              className="inline-flex flex-wrap gap-1.5 rounded-2xl p-1.5"
              style={{
                border: "1px solid var(--color-border)",
                background: "color-mix(in oklab, var(--chalk) 4%, transparent)",
              }}
            >
              {visibleTabs.map((tab) => {
                const isActive = tab.id === view;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setPicked(tab.id)}
                    className={`rounded-xl px-4 py-2.5 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors sm:px-5 ${
                      isActive ? "text-ink" : "text-foreground/60 hover:text-foreground"
                    }`}
                    style={{ background: isActive ? "var(--gold)" : "transparent" }}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-4">
          {view === "upcoming" && groupUpcoming ? (
            <UpcomingBody group={groupUpcoming} />
          ) : (
            <ResultsBody ties={groupTies} />
          )}
        </div>

        {(upcoming.failed || results.failed) && (
          <p
            className="mt-3 text-[11px] text-foreground/40"
            style={{ fontFamily: "Arial, sans-serif" }}
          >
            This section could not be refreshed just now. Showing the last loaded set.
          </p>
        )}
      </section>
    </Reveal>
  );
}
