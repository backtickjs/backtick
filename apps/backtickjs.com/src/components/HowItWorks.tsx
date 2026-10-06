import { cs } from "@backtickjs/core";
import { highlight } from "../highlight.js";
import { type Part, RECEIVED, WRITTEN } from "../samples.js";
import { type Card, Cards, ICONS } from "./Cards.js";

const BENEFITS: Card[] = [
  {
    icon: ICONS.zap,
    name: "Fast to serve",
    text:
      "The compiler runs once, at build time. A request only runs your server" +
      " components and links code that's already compiled.",
  },
  {
    // `@backtickjs/react-native-client`'s dist/index.js, minified as an app's
    // release build is, then gzipped. Re-measure as the client grows.
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

      {${(<Cards cards={BENEFITS} />)}}
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
