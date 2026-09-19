import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ScoreboardHero } from "./sections/ScoreboardHero";
import { ScoreboardContent } from "./sections/ScoreboardContent";
import { CountdownPanel, ConcludedPanel } from "./sections/CountdownPanel";
import { ResultsSection } from "./sections/ResultsSection";
import { LeaderboardSection } from "./sections/LeaderboardSection";
import { useLiveScores } from "@/hooks/useLiveScores";
import { useTournament } from "@/hooks/useTournament";
import { useResults } from "@/hooks/useResults";
import { useGroupStandings } from "@/hooks/useGroupStandings";

/**
 * Live scoreboard.
 *
 * The page shows one of three things depending on where we are relative to the
 * tournament, and it decides that from the organisers' own record rather than
 * from a date typed into this file:
 *
 *   before  → a countdown, the dates and the venue
 *   during  → the live board (which has its own empty states underneath)
 *   after   → a short closing note
 *
 * Both hooks live here at the root rather than inside the sections. The hero
 * shows a live-court count taken from the same data as the board, and two
 * independent pollers would double the request rate and let the two halves of
 * the page disagree with each other.
 */
export default function ScoreboardPage() {
  const tournament = useTournament();
  const scores = useLiveScores();
  const results = useResults();
  const standings = useGroupStandings();
  /* One group choice for the whole page. Standings and results each show the
     switcher, but both write here, so the two tables can never disagree about
     which group you are looking at. */
  const [activeGroup, setActiveGroup] = useState<string | null>(null);

  const liveCount = scores.courts.filter((court) => court.match !== null).length;
  const { phase, info, startsAt, hasFixtures } = tournament;

  // Nothing is claimed until the tournament record has loaded: guessing a
  // phase and then flipping would flash a countdown over a live match.
  const showCountdown = phase === "before";
  const showConcluded = phase === "after";
  const showBoard = phase === "during" || phase === "unknown";

  return (
    <main className="min-h-screen bg-ink text-foreground">
      <div className="relative">
        <div className="absolute inset-x-0 top-0 z-30">
          <Navbar />
        </div>
        <ScoreboardHero
          liveCount={liveCount}
          isLoading={tournament.isLoading || scores.isInitialLoading}
          phase={phase}
          info={info}
        />
      </div>

      {showCountdown && (
        <section className="relative bg-ink pb-16 pt-2 sm:pb-20">
          <div className="mx-auto max-w-275 px-5 sm:px-8 lg:px-10">
            <CountdownPanel info={info} startsAt={startsAt} />
          </div>
        </section>
      )}

      {showConcluded && (
        <section className="relative bg-ink pb-16 pt-2 sm:pb-20">
          <div className="mx-auto max-w-275 px-5 sm:px-8 lg:px-10">
            <ConcludedPanel info={info} />
          </div>
        </section>
      )}

      {showBoard && <ScoreboardContent state={scores} hasFixtures={hasFixtures} />}

      {!showCountdown && (
        <section className="relative bg-ink pb-16 sm:pb-20">
          <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-10 xl:px-14">
            <LeaderboardSection
              state={standings}
              activeGroup={activeGroup}
              onGroupChange={setActiveGroup}
            />
            <ResultsSection
              state={results}
              activeGroup={activeGroup}
              onGroupChange={setActiveGroup}
            />
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}
