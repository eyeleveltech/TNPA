# Live Scoreboard API

Reference for the feed behind the `/scoreboard` page. Captured from the live
server on 15 September 2026.

Consumed by `src/lib/live-scores.ts`. If anything here turns out to be wrong,
that file is where the fix goes.

---

## Endpoint

```
POST https://uattournament.rizzfitt.com/rizzapi/pickleball/matches/fetch-league-live-tv
Content-Type: application/json

{ "slug": "tlpickleball", "courtId": 1 }
```

`slug` identifies the tournament — `tlpickleball` resolves to "TNPPL League",
tournament id 155. `courtId` selects the court.

> **This is the UAT host.** Set `VITE_LIVE_API_BASE` to the production origin
> before the tournament. Do not edit the default in code.

### Provider

Rizzfitt, the league's official tech partner, who run the on-court scoring.

---

## Things that will bite you

**One call returns one match on one court.** There is no all-courts endpoint.
The page fans out one request per court and stitches the results together.

**Success is HTTP 201, not 200.** Test `response.ok`. Never compare to `200`.

**An idle court is a success, not an error.** It returns 201 with `data: null`
and a message. Treat that as the empty state.

**No authentication.** No key, no token. `Access-Control-Allow-Origin: *` is
returned on both the POST and the OPTIONS preflight, so the browser calls it
directly — no proxy, and nothing secret in the bundle.

**Omitting `courtId` does not error.** It falls back to a match rather than
rejecting the request, which can mask a bug in caller code.

**No timestamps anywhere.** No start time, no match clock, no last-updated
field. Freshness has to be measured client-side.

---

## Response shapes

| File | Scenario | Status |
|---|---|---|
| `samples/01-live-doubles.json` | Live doubles match | 201 |
| `samples/02-live-singles.json` | Live singles match | 201 |
| `samples/03-idle-court.json` | Court with no match | 201, `data: null` |
| `samples/04-error-404-unknown-slug.json` | Unknown tournament | 404 |
| `samples/05-error-400-missing-slug.json` | Missing slug | 400 |

### Singles vs doubles

Three differences: the player array holds one person instead of two,
`matchPlayers` holds two entries instead of four, and within each entry
`servePlayer` and `nonServePlayer` are the **same person** rather than two
partners.

---

## What the payload gives you

**Two levels of team identity, which is the most common misreading.**
`tieFixture.teamA` / `.teamB` are the **franchises** — id, uppercase name, logo
URL. `teamA` / `teamB` are the **pairing on court**, named after its players
(`"Vishal,Sai"`), each linking back to its franchise via `teamAId` / `teamBId`.

**Score.** Top-level `teamAScore` / `teamBScore`, plus `currentSetNumber`,
`maxSets`, and a `sets[]` array.

**Status.** `hasStarted`, `hasEnded`, `isCompleted`, `isScheduled`, `winnerTeam`.

**Match identity.** `courtId`, `matchNo`, `displayAlias`, `matchTypeName`,
`mapping.category`, `groupName`, `tieName`.

**Serve state.** `matchPlayers[]`, one entry per player on court, with
`isServing`, `isReceiving`, `isRightSide`, `startingPosition`, `serverNumber`.

**Tie context.** `tieScore`, `tournamentTotalPoints` (league points),
and `tieFixtureMatches[]` — every match in the tie with its score. That last
array is the highest-value field: one call renders the whole tie.

**Broadcast theme.** `liveScoreboardConfiguration` drives Rizzfitt's own
overlay — template name, colours, show/hide toggles. **The site ignores it**;
its background is `#FF007F`, which fights the navy and gold brand. It also
changes without notice (observed switching from `liquid-glass` to `bento`
mid-session).

### Always empty so far

`formatName`, `skillName`, `matchStage`, `toss.tossWinner`, `winnerTeam`,
every player `image`, `lineupSlots`, `teamEventSequences`.

---

## Real-time: a Socket.IO server exists

The page currently polls, which means a score can be up to one poll interval
stale. There is a better option available.

A Socket.IO server is running on the same host:

```
wss://uattournament.rizzfitt.com/rizzapi/socket.io/?EIO=4&transport=websocket
```

Verified on 15 Sep 2026: the handshake succeeds, the default namespace
connects, and the server advertises a websocket upgrade. Rizzfitt's own TV
overlay almost certainly consumes this, which is why it exists.

**We do not have the contract, and the page no longer needs it.**

`src/lib/live-socket.ts` connects to that socket and treats **every** event as a
single bit of information: "something changed, go and re-read the REST feed".
Payloads are never parsed. That gives near-instant updates without knowing a
single event name, and the socket can never put wrong data on screen, because
the REST response remains the only thing the UI renders.

Polling still runs underneath. While the socket is connected it backs off from
5s to 20s as a safety net; if the socket drops it returns to the full rate. So
the socket only ever accelerates — a socket that never connects leaves the page
behaving exactly as it did before.

Verified 15 Sep 2026: the client completes the Engine.IO handshake against the
real server, and against a mock server it correctly reports events, survives
unknown event names and malformed frames, answers heartbeats, reconnects with
backoff, and tears down cleanly.

**Still worth asking Rizzfitt**, because it would let us do better:

- The event names and the room/subscribe protocol. Today the client sends
  speculative `join` / `subscribe` frames per court, which Socket.IO silently
  ignores if wrong. With the real protocol we could subscribe to only the
  courts on screen, and read the score straight from the push payload instead
  of re-fetching.
- Whether the socket is authoritative. If some score changes never emit an
  event, the 20s poll is the only thing that catches them.

## Other endpoints

A full inventory of every endpoint their platform calls — including a security
note about the write endpoints — is in **[ENDPOINTS.md](./ENDPOINTS.md)**.

### The one we now depend on

Their public tournament page at
`uattournament.rizzfitt.com/tnpa/TNPALeague/tlpickleball/pickleball/matches`
renders fixtures, live, past, teams and a leaderboard — so more endpoints exist
than the one we were handed. These were read out of that page's own JS bundles
and confirmed against the server on 15 Sep 2026.

**Note the parameter change.** The live-tv endpoint takes `slug`. These take a
numeric `tournamentId` (TNPPL League = **155**) and ignore `slug` entirely —
passing a slug silently returns a different tournament's data, which is an easy
way to ship the wrong league's scores without noticing.

```
POST /rizzapi/pickleball/matches/fetch-league-leaderboard
     { "tournamentId": 155 }
```

Returns all 12 franchises with `position`, `teamId`, `teamName`, `played`,
`wins`, `loss`, `points`, `bonus`, `penalty`, `finalPoints`. This is the full
standings table — everything needed for a league table on the site.

Seen in their bundles, not yet exercised here:

| Endpoint | Body |
|---|---|
| `matches/league-groups/fetchAll/{tournamentId}` | `{ isleaderboard: false }` |
| `matches/league-fetchall/{tournamentId}` | `{ matchType, category, subCategory, … }` |
| `matches/league-knockout/leaderboard/{tournamentId}` | — |
| `matches/fetchRally/{matchId}` | `{ page, limit }` |
| `matches/fetch-live-tv` | (non-league variant) |

Treat these as undocumented: Rizzfitt have not offered them, so confirm before
depending on any of them in production.

### Confirmed franchise ids

From the leaderboard response. All twelve are now wired into
`resolveFranchise()`, so team matching no longer depends on name spelling.

| id | Team | id | Team |
|---|---|---|---|
| 533 | Salem Super Smashers | 539 | Twin Eagles Hosur |
| 534 | Chennai's Tamizh Titans | 540 | Rockfort Terminatrz Trichy |
| 535 | Cuddalore Kings | 541 | Madurai All Stars |
| 536 | Kanchi Blackbucks | 542 | Nellai Superstars |
| 537 | Coimbatore Smashers | 543 | Ramnad Royals |
| 538 | Ooty Bisons | 544 | Kodai Tigers |

⚠ `teamName` for 544 comes back as `KODAI TIGERS"` — with a stray double quote.
A data-entry error in their admin, harmless to us because we match on id.

## Open questions for the scoring team

These are data-quality problems observed in UAT. Each needs a real answer
before the tournament, because the page is guessing at present.

1. **Which score field is authoritative?** `sets[0]` reports `0-0` while the
   top-level score reports `11-2` for that same set. The page trusts the
   top-level score.

2. **What actually marks a match finished?** Nothing is ever flagged
   `isCompleted`, and matches sitting at `0-0` still report `hasStarted: true`.
   The status booleans currently cannot signal a finished match, so the page
   only claims "final" when the feed says so explicitly.

3. **Why is `tieScore` stuck at `0-0`?** Six matches in that tie carry real
   scores. WORKED AROUND: the page ignores that field and derives the tie score
   by counting winners in `tieFixtureMatches` (`deriveTieScore()`), which
   reproduces exactly what your own tournament UI shows — 3-2 for Tie 1. Still
   worth fixing at source, since our workaround assumes "most matches won"
   is the rule.

4. **`mapping.category` is wrong for singles.** A singles match reports
   `category.name: "Men's Doubles"` with `participants: 2`. The page reads
   `displayAlias` first to work around it.

5. ~~Franchise ids for all twelve teams.~~ **RESOLVED** — recovered from
   ; see the table above. All twelve are wired in.

6. **Is there a combined endpoint?** Six courts means six requests per refresh
   cycle, per viewer.

7. **Rate limits?** The page currently polls every 10 seconds.

8. **What events does the Socket.IO server emit, and how do we subscribe to a
   court?** This is the single highest-value answer on the list: it is the
   difference between a ten-second delay and instant updates. See the
   real-time section above.

9. **Will player photos be populated** before the tournament?

10. ~~How many courts are there?~~ **RESOLVED** — `league-groups/fetchAll`
    shows the tournament uses courts **1, 2 and 1001**. Courts 3-6 do not
    exist; court 1001 was being missed entirely. `discoverCourtIds()` now
    reads the list at runtime. STILL CONFIRM for production, since 1001 looks
    like a generated id.

11. ~~`tieFixtureMatches` skips match numbers.~~ **EXPLAINED** — `league-groups`
    returns all 8 matches for Tie 1, with M5 and M6 at `hasStarted: false`.
    The live feed only lists matches that have started, so the gap is by
    design. Worth confirming that is intentional and not a side effect.

---

12. **Are the write endpoints authenticated?** The read endpoints need no key
    at all. The same API exposes `matches/{id}/score`, `matches/{id}/end`,
    `walkover`, `generate-fixtures` and more. We have NOT tested these and
    will not. Please confirm they are protected — see ENDPOINTS.md.

---

## Name matching

The feed's spellings do not match this site's. It sends
`CHENNAI'S TAMIZH TITANS` where the site writes `Chennai Tamizh Titans`, so
raw string comparison fails silently and drops the logo.

`resolveFranchise()` therefore matches by **id first**, then by a normalised
name (uppercased, non-alphanumerics stripped), with alias spellings registered
per team. An unrecognised franchise falls back to the feed's own logo, then to
initials — it must never render blank.

Player surnames also arrive inconsistently cased (`muthukumar`, `swaroop`
alongside `Premkumar`). `titleCaseName()` raises a first letter only when the
whole word is lower case, so `McDonald` and `D'Souza` survive untouched.

---

## Re-capturing these samples

```sh
curl -X POST https://uattournament.rizzfitt.com/rizzapi/pickleball/matches/fetch-league-live-tv \
  -H "Content-Type: application/json" \
  -d '{"slug":"tlpickleball","courtId":1}'
```
