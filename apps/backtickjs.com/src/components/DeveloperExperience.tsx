import { cs } from "@backtickjs/core";
import { highlight, type Token } from "../highlight.js";

// What writing a server component is like: one file, with the lines that
// show each benefit numbered, and the benefits beside it.

type NumberedLine = { tokens: Token[]; number: number | null };

// Code coloured once, when the server starts. A line written with a leading
// `@n` gets the badge for benefit n.
async function numbered(source: string): Promise<NumberedLine[]> {
  const written = source.replace(/^\n/, "").replace(/\n$/, "").split("\n");
  const numbers = written.map((line) => {
    const match = /^@(\d)/.exec(line);
    return match === null ? null : Number(match[1]);
  });
  const code = written.map((line) => line.replace(/^@\d/, "")).join("\n");
  const lines = await highlight(code, "tsx");
  return lines.map((line, index) => ({
    tokens: line.tokens,
    number: numbers[index] ?? null,
  }));
}

const SERVER = await numbered(`
// A client component: it runs on the phone.
@1const ReorderButton = cs\`(props: { order: Order }) => {
@2  const [added, setAdded] = $useState(false);
  const reorder = async () => {
    await fetch($CART, { method: "POST", body: props.order.id });
    setAdded(true);
  };
  return (
    <$Pressable onPress={reorder}>
      <$Text>{added ? "Added ✓" : "Reorder " + props.order.name}</$Text>
    </$Pressable>
  );
}\`;

// A server component: it runs on your server, for every request.
export async function Home({ user }: { user: User }) {
@3  const usual = await db.usualOrder(user.id);

  return cs\`(
    <$ScrollView>
      <$Text>Good morning, {$user.name}</$Text>
@4      <$ReorderButton order={$usual} />
    </$ScrollView>
  )\`;
}
`);

const BENEFITS = [
  {
    title: "Client code inline",
    body: "Client components live next to the server code that uses them. A $ marks every value that crosses to the phone.",
  },
  {
    title: "Just React Native",
    body: "Hooks, Pressable, styles and the packages your app ships, written the way you already write them. Tests run in Node.",
  },
  {
    title: "Reads without plumbing",
    body: "Query your database where the screen is built. No endpoint, query key or client cache just to read, and secrets never leave the server.",
  },
  {
    title: "Type-checked end to end",
    body: "backtick-tsc checks every prop and splice across the wire. A wrong type is an error at its line, before it ships.",
  },
];

const Badge = cs`(props: { number: number }) => (
  <span class="inline-flex size-5 flex-none items-center justify-center rounded-full bg-react font-sans text-[11px] font-bold text-paper">
    {props.number}
  </span>
)`;

export const DeveloperExperienceVisual = cs`() => (
  <div class="grid items-start gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
    <div class="min-w-0 overflow-hidden rounded-2xl border border-code-line bg-code">
      <p class="border-b border-code-line px-4 py-2.5 font-mono text-xs text-code-muted">
        server/Home.tsx
      </p>
      <pre class="m-0 overflow-x-auto py-3 font-mono text-[12.5px] leading-[1.6]">
        {$SERVER.map((line) => (
          <div
            class={
              "code-line relative pl-8! " +
              (line.number === null
                ? ""
                : "bg-react/20 shadow-[inset_3px_0_0_var(--color-react)]")
            }
          >
            {line.number === null ? null : (
              <span class="absolute top-1/2 left-2 -translate-y-1/2 scale-75">
                <$Badge number={line.number} />
              </span>
            )}
            {line.tokens.map((token) => (
              <span style={{ color: token.color }}>{token.text}</span>
            ))}
          </div>
        ))}
      </pre>
    </div>
    <ol class="grid gap-3">
      {$BENEFITS.map((benefit, index) => (
        <li class="flex gap-3 rounded-[20px] border border-line bg-wash p-5">
          <$Badge number={index + 1} />
          <div>
            <p class="text-[16px] leading-5 font-semibold">{benefit.title}</p>
            <p class="mt-1.5 text-[14.5px] text-muted">{benefit.body}</p>
          </div>
        </li>
      ))}
    </ol>
  </div>
)`;
