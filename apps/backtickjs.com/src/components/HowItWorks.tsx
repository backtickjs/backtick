import { cs } from "@backtickjs/core";
import { highlight } from "../highlight.js";
import { type Part, RECEIVED, WRITTEN } from "../samples.js";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
type Benefit = { icon: string; name: string; text: string };

// Feather's icons (MIT), as the markup inside a 24 by 24 stroked `<svg>`.
const ICONS = {
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
  database:
    '<ellipse cx="12" cy="5" rx="9" ry="3"/>' +
    '<path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/>' +
    '<path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/>',
  package:
    '<line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/>' +
    '<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3' +
    ' 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>' +
    '<polyline points="3.27 6.96 12 12.01 20.73 6.96"/>' +
    '<line x1="12" y1="22.08" x2="12" y2="12"/>',
  map:
    '<polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"/>' +
    '<line x1="8" y1="2" x2="8" y2="18"/>' +
    '<line x1="16" y1="6" x2="16" y2="22"/>',
};

const BENEFITS: Benefit[] = [
  {
    icon: ICONS.zap,
    name: "Fast to serve",
    text:
      "The compiler runs once, at build time. A request only runs your server" +
      " components and links code that's already compiled.",
  },
  {
    icon: ICONS.database,
    name: "No API round trip",
    text:
      "Your server components read the database directly, so the app needs" +
      " no fetching hooks, no client cache and no endpoint built just for the" +
      " screen.",
  },
  {
    // `@backtickjs/react-native-client`'s dist/index.js, gzipped: re-measure
    // before the client grows past it.
    icon: ICONS.package,
    name: "Under 1 KB in your app",
    text:
      "The client is one component, with no dependencies. Screens run on the" +
      " React Native your app already ships.",
  },
  {
    icon: ICONS.map,
    name: "Easy to debug",
    text:
      "Each screen is plain JavaScript with its own source map, generated per" +
      " request when it's linked, pointing back to the lines you wrote.",
  },
];

// How a screen gets from your server to the phone: the file as written,
// coloured by what each part is, beside what the phone receives.
export async function HowItWorks() {
  const written = await banded(WRITTEN);
  const received = (await highlight(RECEIVED, "tsx")).map((line) => ({
    tokens: line.tokens,
    edge: EDGES.blank,
  }));

  return cs`(
    <div class="grid gap-14">
      <div class="grid gap-5">
        <div class="flex flex-wrap gap-x-6 gap-y-2 text-[14.5px]">
          <span class="inline-flex items-center gap-2">
            <span class="size-2.5 rounded-full bg-code-muted" />
            <span class="font-semibold">Imports</span>
            <span class="text-muted">React Native, from the app</span>
          </span>
          <span class="inline-flex items-center gap-2">
            <span class="size-2.5 rounded-full bg-[#a78bfa]" />
            <span class="font-semibold">Server code</span>
            <span class="text-muted">runs per request</span>
          </span>
          <span class="inline-flex items-center gap-2">
            <span class="size-2.5 rounded-full bg-[#61dafb]" />
            <span class="font-semibold">Client script</span>
            <span class="text-muted">compiled at build time</span>
          </span>
        </div>

        <div class="grid gap-4 lg:grid-cols-2">
          {[
            { file: "What you write · Home.tsx", lines: $written },
            {
              file: "What the phone receives (simplified)",
              lines: $received,
            },
          ].map((panel) => (
            <div class="min-w-0 overflow-hidden rounded-[20px] border border-code-line bg-code">
              <p class="border-b border-code-line px-5 py-3 font-mono text-xs text-code-muted">
                {panel.file}
              </p>
              <pre class="m-0 overflow-x-auto py-4 font-mono text-[13.5px] leading-[1.6]">
                {panel.lines.map((line) => (
                  <div class={"code-line border-l-4 " + line.edge}>
                    {line.tokens.map((token) => (
                      <span style={{ color: token.color }}>{token.text}</span>
                    ))}
                  </div>
                ))}
              </pre>
            </div>
          ))}
        </div>

        <p class="max-w-[44em] text-[15.5px] text-muted">
          Each $ in the script becomes a parameter of the compiled component.
          The call at the end of the file passes the values: View and Text from
          the app, and the user's data from your server. That call is the only
          place the data lives.
        </p>
      </div>

      <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
        {$BENEFITS.map((benefit) => (
          <div class="group grid content-start gap-1.5 rounded-[20px] border border-line bg-linear-to-b from-wash to-paper p-6 transition hover:-translate-y-0.5 hover:border-react/40 hover:shadow-[0_12px_32px_-16px_rgb(97_218_251/0.45)]">
            <span class="mb-3 grid size-11 place-items-center rounded-xl border border-react/25 bg-linear-135 from-react/15 to-brand/15 text-react transition group-hover:scale-105">
              <svg
                class="size-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                innerHTML={benefit.icon}
              />
            </span>
            <p class="text-lg font-bold tracking-[-0.01em]">{benefit.name}</p>
            <p class="text-[15px] text-muted">{benefit.text}</p>
          </div>
        ))}
      </div>
    </div>
  )`;
}

// The left edge each kind of line is drawn with, written out whole so the
// stylesheet generator finds the classes.
const EDGES: Record<Part["kind"] | "blank", string> = {
  app: "border-l-code-muted",
  server: "border-l-[#a78bfa]",
  script: "border-l-[#61dafb]",
  blank: "border-l-transparent",
};

// A file in parts, coloured as one so each part reads in context, then every
// line marked with the edge of the part it came from.
async function banded(parts: Part[]) {
  const code = parts.map((part) => part.code).join("\n");
  const kinds = parts.flatMap((part) =>
    part.code.split("\n").map((text) => (text === "" ? "blank" : part.kind)),
  );
  const lines = await highlight(code, "tsx");
  return lines.map((line, index) => ({
    tokens: line.tokens,
    edge: EDGES[kinds[index] ?? "blank"],
  }));
}
