import { cs, state } from "@backtickjs/core";

const page = "display: grid; gap: 8px; padding: 24px; justify-items: start";
const heading = "margin: 0; font-size: 24px";
const body = "margin: 0; font-size: 16px";
const link = "font-size: 16px; color: royalblue";
const press =
  "font: inherit; font-size: 16px; color: royalblue; background: none;" +
  " border: 0; padding: 0; cursor: pointer";

// Every screen is an ordinary server component. Nothing about it knows which
// path reached it, or which client asked — that is the router's business, and
// the same screen answers a browser and a phone.
export async function Home() {
  return (
    <div style={page}>
      <h1 style={heading}>Backtick</h1>
      <p style={body}>Three routes, one bundle each.</p>
      <a href="/counter" style={link}>
        Counter
      </a>
      <a href="/about" style={link}>
        About
      </a>
    </div>
  );
}

// Client state: the count lives on the client, so pressing re-renders without
// asking the server for anything. The bundle for this route carries the
// handler as a script, not a round trip.
export async function Counter() {
  const count = state(0);
  return (
    <div style={page}>
      <h1 style={heading}>{cs`"Pressed " + $count.read() + " times"`}</h1>
      <button
        id="press"
        style={press}
        onclick={cs`() => $count.write($count.read() + 1)`}
      >
        Press me
      </button>
      <a href="/" style={link}>
        Home
      </a>
    </div>
  );
}

// Built per request, so what it reports is the moment it was asked for — the
// simplest demonstration that a route is a function, not a constant.
export async function About({ started }: { started: Date }) {
  const uptime = Math.round((Date.now() - started.getTime()) / 1000);
  return (
    <div style={page}>
      <h1 style={heading}>About</h1>
      <p style={body}>Rendered on the server, drawn by the client.</p>
      <p style={body}>{`Server up ${uptime}s.`}</p>
      <a href="/" style={link}>
        Home
      </a>
    </div>
  );
}
