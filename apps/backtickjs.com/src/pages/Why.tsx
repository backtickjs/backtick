import { cs } from "@backtickjs/core";
import { Comparison, type Column, type Row } from "../components/Comparison.js";
import {
  EXPO_COLUMNS,
  EXPO_ROWS,
  MODEL_COLUMNS,
  MODEL_ROWS,
  NEXT_COLUMNS,
  NEXT_ROWS,
} from "../comparisons.js";
import type { Heading } from "../docs.js";

type Part = {
  id: string;
  title: string;
  lede: string;
  columns: Column[];
  rows: Row[];
};

// Each question a reader brings, answered by a comparison.
const PARTS: Part[] = [
  {
    id: "the-webs-deploy-model",
    title: "React Native, with the web's deploy model",
    lede: "On the web, you deploy and users have the change the next time they load the page. A native app carries its screens in the binary, so every change waits for a store release. Backtick serves screens from your server, the way the web does.",
    columns: MODEL_COLUMNS,
    rows: MODEL_ROWS,
  },
  {
    id: "no-api-layer",
    title: "No API layer, no split files",
    lede: "The server renders each screen where its data lives, so there's no endpoint to build, nothing overfetched and no query cache to keep in sync. Unlike Next.js, the client code sits in the same file, and every $ that crosses is type-checked.",
    columns: NEXT_COLUMNS,
    rows: NEXT_ROWS,
  },
  {
    id: "eas-update-and-expo-server-components",
    title: "Isn't this EAS Update, or Expo's server components?",
    lede: "All three get code to the phone without a store release. Only Backtick ships each screen per request, client components included.",
    columns: EXPO_COLUMNS,
    rows: EXPO_ROWS,
  },
];

export const WHY_HEADINGS: Heading[] = PARTS.map((part) => ({
  id: part.id,
  text: part.title,
}));

export const Why = cs`() => (
  <>
    {$PARTS.map((part) => (
      <section>
        <h2 id={part.id}>{part.title}</h2>
        <p>{part.lede}</p>
        <div class="mt-8">
          <$Comparison columns={part.columns} rows={part.rows} />
        </div>
      </section>
    ))}
  </>
)`;

// The page as Markdown, each comparison a table.
export const WHY_MARKDOWN = PARTS.map((part) => {
  const cell = (text: string) => text.replaceAll("|", "\\|");
  const header = `| | ${part.columns
    .map((column) => `${column.name}: ${column.summary}`)
    .map(cell)
    .join(" | ")} |`;
  const rule = `|---|${part.columns.map(() => "---").join("|")}|`;
  const rows = part.rows.map(
    (row) =>
      `| ${cell(row.label)} | ${row.values
        .map((value) =>
          cell(
            value.detail === ""
              ? value.verdict
              : `${value.verdict}. ${value.detail}`,
          ),
        )
        .join(" | ")} |`,
  );
  return `## ${part.title}\n\n${part.lede}\n\n${[header, rule, ...rows].join("\n")}`;
}).join("\n\n");
