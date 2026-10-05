import { cs } from "@backtickjs/core";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Column = { name: string; summary: string };
export type Cell = {
  verdict: string;
  detail: string;
  tone: "good" | "partial" | "bad";
};
export type Row = { label: string; values: Cell[] };

// A cell's tint and its verdict's color, by tone, written out whole so the
// stylesheet generator finds each class. The verdict says the same in words,
// so color is never the only signal.
const TINTS: Record<Cell["tone"], string> = {
  good: "bg-green-500/10",
  partial: "bg-amber-500/12",
  bad: "bg-red-500/10",
};
const VERDICTS: Record<Cell["tone"], string> = {
  good: "text-green-700 dark:text-green-400",
  partial: "text-amber-700 dark:text-amber-400",
  bad: "text-red-700 dark:text-red-400",
};

// Backtick beside the tools a React Native developer already compares it to,
// Backtick last: what each ships under its name, then a verdict per row. On a
// phone each row stacks, and each cell names its column.
export async function Comparison({
  columns,
  rows,
}: {
  columns: Column[];
  rows: Row[];
}) {
  const last = columns.length - 1;
  return cs`(
    <div class="overflow-hidden rounded-[20px] border border-line">
      <div class="grid gap-3 border-b border-line bg-wash py-4 md:grid-cols-[190px_1fr_1fr_1fr] md:gap-0 md:py-0">
        <span class="max-md:hidden" />
        {$columns.map((column, index) => (
          <span class="grid content-start gap-0.5 px-5 md:py-4">
            <span
              class={
                "text-[15px] font-semibold " +
                (index === $last ? "text-react" : "")
              }
            >
              {column.name}
            </span>
            <span class="text-sm text-muted">{column.summary}</span>
          </span>
        ))}
      </div>
      {$rows.map((row) => (
        <div class="grid border-b border-line text-[15px] last:border-b-0 md:grid-cols-[190px_1fr_1fr_1fr]">
          <span class="px-5 pt-4 pb-2 font-semibold md:py-4">{row.label}</span>
          {row.values.map((value, index) => (
            <span
              class={
                "grid content-start gap-0.5 px-5 py-2.5 md:py-4 " +
                $TINTS[value.tone]
              }
            >
              <span class="font-medium text-muted md:hidden">
                {$columns[index].name}
              </span>
              <span class={"font-semibold " + $VERDICTS[value.tone]}>
                {value.verdict}
              </span>
              {value.detail === "" ? null : (
                <span class="text-muted">{value.detail}</span>
              )}
            </span>
          ))}
        </div>
      ))}
    </div>
  )`;
}
