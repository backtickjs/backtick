import { cs } from "@backtickjs/core";
import { highlight, type Token } from "../highlight.js";
import { Pair } from "./Pair.js";

// Data: one feature, from database to screen. Without Backtick, an endpoint
// and a fetch move the data; with it, one query in the screen's own file.

type Mark = "none" | "warn" | "react";
type MarkedLine = { tokens: Token[]; mark: Mark };

// Code coloured once, when the server starts. A line written with a leading
// `!` is marked as boilerplate, one with `*` as the line that does its job.
async function marked(source: string): Promise<MarkedLine[]> {
  const written = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const marks = written.map(
    (line): Mark =>
      line.startsWith("!") ? "warn" : line.startsWith("*") ? "react" : "none",
  );
  const code = written.map((line) => line.replace(/^[!*]/, "")).join("\n");
  const lines = await highlight(code, "tsx");
  return lines.map((line, index) => ({
    tokens: line.tokens,
    mark: marks[index] ?? "none",
  }));
}

const ROUTE = await marked(`
!app.get("/offers", async (req, res) => {
!  res.json(await db.offersFor(req.user.id));
!});
`);
const SCREEN = await marked(`
export function Offers() {
!  const { data } = useSuspenseQuery<Offer[]>({
!    queryKey: ["offers"],
!    queryFn: () => fetch(\`\${API}/offers\`).then((r) => r.json()),
!  });
  return (
    <ScrollView>
      {data.map((o) => <Text key={o.id}>{o.title}</Text>)}
    </ScrollView>
  );
}
`);
const SERVER = await marked(`
export async function Offers({ user }: { user: User }) {
*  const offers = await db.offersFor(user.id);
  return cs\`(
    <$ScrollView>
      {$offers.map((o) => <$Text key={o.id}>{o.title}</$Text>)}
    </$ScrollView>
  )\`;
}
`);

// Each mark's tint and left edge, written out whole so the stylesheet
// generator finds the classes.
const MARKS: Record<Mark, string> = {
  none: "",
  warn: " bg-warn/15 shadow-[inset_3px_0_0_var(--color-warn)]",
  react: " bg-react/20 shadow-[inset_3px_0_0_var(--color-react)]",
};

const Code = cs`(props: { file: string; lines: MarkedLine[] }) => (
  <div class="min-w-0 overflow-hidden rounded-2xl border border-code-line bg-code">
    <p class="border-b border-code-line px-4 py-2.5 font-mono text-xs text-code-muted">
      {props.file}
    </p>
    <pre class="m-0 overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.6]">
      {props.lines.map((line) => (
        <div class={"code-line" + $MARKS[line.mark]}>
          {line.tokens.map((token) => (
            <span style={{ color: token.color }}>{token.text}</span>
          ))}
        </div>
      ))}
    </pre>
  </div>
)`;

export const DataVisual = cs`() => (
  <$Pair
    without={
      <div class="grid gap-3">
        <$Code file="api/routes/offers.ts" lines={$ROUTE} />
        <$Code file="app/screens/Offers.tsx" lines={$SCREEN} />
      </div>
    }
    withoutCaption="Seven of these lines are boilerplate. They only move data from your database to the screen."
    backtick={<$Code file="server/Offers.tsx" lines={$SERVER} />}
    backtickCaption="One line does the same job, type-checked from the query to the screen."
  />
)`;
