// The fetch, and the shaping that follows it. Both run on the server: what
// crosses to the client is a slate of rows it can draw, never ESPN's shape and
// never ESPN's host. The client asks this server back at `SLATE_PATH`, so this
// file is the only thing in the app that knows where a score comes from.

// ESPN's public scoreboard, the one its own site reads. `site.api` serves the
// same JSON but answers 403 to anything whose user-agent it does not know.
const SCOREBOARD =
  "https://site.web.api.espn.com/apis/site/v2/sports/football" +
  "/college-football/scoreboard";

// ESPN's group id for FBS, the poll this board is of, and the rank ESPN writes
// in `curatedRank.current` for a team outside it.
const FBS = "80";
const TOP = 25;
const UNRANKED = 99;

// Where the client asks for a fresh slate, and how often it asks. One name for
// the route that answers and the script that calls, so they cannot drift.
export const SLATE_PATH = "/slate.json";
export const POLL_MS = 15000;

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Game = {
  awayRank: number;
  awayName: string;
  awayScore: number;
  homeRank: number;
  homeName: string;
  homeScore: number;
  // "Q3 · 7:41" while it is being played, "Final", or "Sat 3:30 PM ET".
  clock: string;
  isLive: boolean;
  // Which side has the ball: "away", "home", or "" when nobody does.
  possession: string;
  // "2nd & 7 at TEX 34". Empty unless the game is live.
  detail: string;
};

export type Slate = {
  games: Game[];
  // Where these scores came from and when they were read, written out. One
  // string, because the client only prints it — and a clock the server formats
  // is one the client needs no timezone for.
  asOf: string;
};

// A rank worth drawing, or 0 for a team outside the poll.
function rankOf(competitor: any): number {
  const rank = competitor.curatedRank?.current ?? UNRANKED;
  return rank > TOP ? 0 : rank;
}

// The best rank on the field, used to sort. A game with no ranked team sorts
// last, but those are dropped before this matters.
function bestRank(event: any): number {
  return Math.min(
    ...event.competitions[0].competitors.map((competitor: any) => {
      const rank = rankOf(competitor);
      return rank === 0 ? UNRANKED : rank;
    }),
  );
}

// Being played first, then kicking off, then done — and inside each, the
// highest-ranked team at the top.
const ORDER: Record<string, number> = { in: 0, pre: 1, post: 2 };

function byInterest(a: any, b: any): number {
  const states = ORDER[a.status.type.state] - ORDER[b.status.type.state];
  return states !== 0 ? states : bestRank(a) - bestRank(b);
}

function clockOf(event: any): string {
  const status = event.status;
  if (status.type.state === "post") return status.type.shortDetail;
  if (status.type.state === "pre") return kickoffAt(event.date);
  if (status.type.name === "STATUS_HALFTIME") return "Half";

  // College overtime is untimed possessions, so there is no clock to put
  // beside it — and the periods keep counting up from four.
  if (status.period > 4) {
    return status.period === 5 ? "OT" : status.period - 4 + "OT";
  }
  return "Q" + status.period + " · " + status.displayClock;
}

function kickoffAt(date: string): string {
  const when = new Date(date).toLocaleString("en-US", {
    weekday: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  return when + " ET";
}

// One event, or `null` where neither team is in the Top 25 — which is most of
// them, and the filter that makes this a Top 25 board.
function toGame(event: any): Game | null {
  const competition = event.competitions[0];
  const home = competition.competitors.find((c: any) => c.homeAway === "home");
  const away = competition.competitors.find((c: any) => c.homeAway === "away");

  const homeRank = rankOf(home);
  const awayRank = rankOf(away);
  if (homeRank === 0 && awayRank === 0) return null;

  // `situation` is there only while the ball is in play, and it names the side
  // holding it by team id — resolved here, so the client compares two words.
  const isLive = event.status.type.state === "in";
  const situation = isLive ? competition.situation : undefined;
  const possession =
    situation?.possession === home.id
      ? "home"
      : situation?.possession === away.id
        ? "away"
        : "";

  return {
    awayRank: awayRank,
    awayName: away.team.shortDisplayName,
    awayScore: Number(away.score),
    homeRank: homeRank,
    homeName: home.team.shortDisplayName,
    homeScore: Number(home.score),
    clock: clockOf(event),
    isLive: isLive,
    possession: possession,
    detail: situation?.downDistanceText ?? "",
  };
}

async function fetchGames(): Promise<Game[]> {
  const url = `${SCOREBOARD}?groups=${FBS}&limit=100`;
  const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
  if (!response.ok) throw new Error(`ESPN answered ${response.status}`);

  const events: any[] = (await response.json()).events;
  const games: Game[] = [];
  for (const event of [...events].sort(byInterest)) {
    const game = toGame(event);
    if (game !== null) games.push(game);
  }
  return games;
}

// A Saturday afternoon, used when the network is not there. The example is
// meant to run on a plane, and the two live games are what make the clock and
// the ball worth drawing at all.
const SAMPLE: Game[] = [
  {
    awayRank: 4,
    awayName: "Texas",
    awayScore: 21,
    homeRank: 2,
    homeName: "Georgia",
    homeScore: 24,
    clock: "Q3 · 7:41",
    isLive: true,
    possession: "away",
    detail: "2nd & 7 at GEO 34",
  },
  {
    awayRank: 0,
    awayName: "Purdue",
    awayScore: 3,
    homeRank: 1,
    homeName: "Ohio State",
    homeScore: 31,
    clock: "Q2 · 1:12",
    isLive: true,
    possession: "home",
    detail: "1st & 10 at PUR 22",
  },
  {
    awayRank: 8,
    awayName: "Oregon",
    awayScore: 38,
    homeRank: 17,
    homeName: "Michigan",
    homeScore: 35,
    clock: "Final/OT",
    isLive: false,
    possession: "",
    detail: "",
  },
  {
    awayRank: 11,
    awayName: "Ole Miss",
    awayScore: 14,
    homeRank: 6,
    homeName: "Alabama",
    homeScore: 10,
    clock: "Half",
    isLive: true,
    possession: "",
    detail: "",
  },
  {
    awayRank: 0,
    awayName: "Utah",
    awayScore: 0,
    homeRank: 9,
    homeName: "Penn State",
    homeScore: 0,
    clock: "Sat 7:30 PM ET",
    isLive: false,
    possession: "",
    detail: "",
  },
];

function stamp(source: string): string {
  const now = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    timeZone: "America/New_York",
  });
  return source + " · read at " + now + " ET";
}

async function build(): Promise<Slate> {
  try {
    return { games: await fetchGames(), asOf: stamp("espn.com") };
  } catch {
    return { games: SAMPLE, asOf: stamp("sample slate (offline)") };
  }
}

// The answer in flight, not the answer — two pages asking at once ask ESPN
// once. Held for as long as a score could not have changed, which is the same
// interval the client polls at: every page open costs this server one request
// per interval, however many of them there are.
let held: { at: number; slate: Promise<Slate> } | null = null;

export function load(): Promise<Slate> {
  const now = Date.now();
  if (held === null || now - held.at >= POLL_MS) {
    held = { at: now, slate: build() };
  }
  return held.slate;
}
