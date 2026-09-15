# Rizzfitt API — endpoint inventory

Every endpoint the Rizzfitt tournament platform calls, read out of the public
JavaScript bundles served by their own tournament site on 15 September 2026:

```
https://uattournament.rizzfitt.com/tnpa/TNPALeague/tlpickleball/pickleball/matches
```

Base for all paths: `https://uattournament.rizzfitt.com/rizzapi`

> **None of this is documented by Rizzfitt.** They gave us exactly one endpoint,
> `fetch-league-live-tv`. Everything else here was discovered. Confirm anything
> you intend to depend on before production, because undocumented endpoints can
> change or disappear without warning.

---

## ⚠ Security: the write endpoints

The read endpoints require **no authentication at all** — no key, no token, and
`Access-Control-Allow-Origin: *`. That is fine for public scores.

The same API also exposes endpoints that **change tournament state**, including
one that posts a score:

```
POST /pickleball/matches/{matchId}/score          ← writes a score
POST /pickleball/matches/{matchId}/start
POST /pickleball/matches/{matchId}/end
POST /pickleball/matches/{matchId}/undo-last-rally
POST /pickleball/matches/{matchId}/cut-serve
POST /pickleball/matches/{matchId}/start-next-set/{setId}
POST /pickleball/matches/walkover
POST /pickleball/matches/create
POST /pickleball/matches/generate-fixtures
POST /pickleball/matches/move-to-upcoming
POST /pickleball/auction/undo-last-bid
POST /pickleball/auction/add-sold-and-unsold-players
POST /tournament/create
POST /tournament/generate-teams
POST /pickleball/toss/start/{matchId}
POST /pickleball/league/create-player-suspentions
```

**These have NOT been tested and must not be.** Calling any of them could alter
live tournament data. They are listed only so the risk is visible.

**Ask Rizzfitt to confirm these require authentication.** If they are as open as
the read endpoints, anyone who finds this API could change a live score during
the tournament. This is a question for them, not something to probe.

---

## Read endpoints — verified working

Tested against tournament id **155** (TNPPL League).

| Endpoint | Method | Body | Returns |
|---|---|---|---|
| `pickleball/matches/fetch-league-live-tv` | POST | `{slug, courtId}` | The live match on one court |
| `pickleball/matches/fetch-league-leaderboard` | POST | `{tournamentId}` | Full standings, 12 teams |
| `pickleball/matches/league-groups/fetchAll/{tid}` | POST | `{isleaderboard:false}` | Groups → ties → fixtures → matches |
| `pickleball/matches/league-fetchall/{tid}` | POST | `{matchType,category,subCategory,page,limit}` | Paged match list |
| `pickleball/team/fetchall/{tid}` | GET | — | 229 rows (teams + players) |
| `tournament/get-by-slug` | POST | `{slug}` | Tournament details |
| `tournament/fetchall-live-score-board-configuration` | POST | `{tournamentId}` | Per-court overlay config |
| `pickleball/matches/league-knockout/leaderboard/{tid}` | POST | `{}` | Knockout table (empty for now) |

### Mind the key

`fetch-league-live-tv` is keyed by **`slug`**. The others are keyed by a numeric
**`tournamentId`** and ignore `slug` completely — calling the leaderboard with
`{slug:"tlpickleball"}` returned a different tournament's teams (Venus Estates,
Windsor Kings, Net Ninjas) with a 200 and no warning. An easy way to ship the
wrong league's data.

---

## What `league-groups/fetchAll` gives you

The richest read endpoint, and the one that answers questions the live feed
cannot. Structure: `data[] → ties[] → tieFixtures[] → matches[]`.

- **2 groups**, 15 ties each = **30 ties**, matching the site's "30 League Ties".
- Every fixture's `teamA` / `teamB` with id, name and logo URL.
- **`teamAwinsCount` / `teamBwinsCount`** — the real tie score. For Tie 1 it
  reads 3-2, confirming the value `deriveTieScore()` computes from match
  winners, and confirming the broken `tieScore` field in the live feed.
- Each match with `matchNo`, `courtId`, scores, and status flags.

### It answers the missing-match-numbers question

The live feed's `tieFixtureMatches` returned M1, M2, M3, M4, M7, M8 for Tie 1 —
no M5 or M6. This endpoint returns all eight, and shows M5 and M6 with
`hasStarted: false`. **So the live feed only lists matches that have started.**
The gap is by design, not a bug.

### It answers the court-count question

Distinct `courtId` values across the entire tournament:

| courtId | matches |
|---|---|
| 1 | 14 |
| 1001 | 8 |
| 2 | 2 |

**Courts 3, 4, 5 and 6 do not exist. Court 1001 does.** The page previously
polled 1-6 based on site copy, so a live match on court 1001 would never have
appeared and nothing would have errored. `discoverCourtIds()` now reads this
list at runtime, with a widened static fallback.

Re-check this against production — 1001 looks like a generated id and is
unlikely to carry over.

---

## Other endpoints seen in their bundles

Not exercised here. Listed for completeness.

**Matches** — `fetch/{id}` (GET), `fetchall/{id}`, `fetchRally/{id}`,
`league-fetch/{id}` (GET), `groups/fetchAll/{id}`, `knockout/fetchAll/{id}`,
`timeout`, `timeout-end`, `timeout-summary`, `start-timeout`, `fetch-live-tv`

**Auction** — `fetch-all-auction-teams`, `fetch-auction-team`,
`fetch-auction-configuration`, `fetch-bidding-amounts`,
`fetch-sold-and-unsold-players`, `fetch-available-auction-players/{id}`,
`create-auction-player-history`, `close-auction-animation`

**League** — `fetch-palyer-CardRule` *(their spelling)*,
`get-substitution-players`, `add-substitution-player`

**Tournament** — `categories` (GET), `subcategories/{id}` (GET),
`status/{id}` (GET), `sponsors/{id}` (GET), `get-by-route`,
`fetchbyid/livtv-config`, `tournament-config-fetchbyId/{id}`

**Registration** — `get-tournament-details`, `validate-player-availability`,
`verify-payment`, `verify-payment-token`, `payment-completed-players`,
`create-registration-request`, `fetchall-country-details`

**Other** — `leaderboard/pickleball/fetchAll/{id}`,
`winnerlist/pickleball/fetchAll/{id}`, `dupr/player/{id}`, `users/mobile/{id}`,
`dashboard/getAllCategories`, `admin/fixture/fetch/{id}`
