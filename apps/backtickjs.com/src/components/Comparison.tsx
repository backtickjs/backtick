import { cs } from "@backtickjs/core";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Row = { label: string; other: string; backtick: string };

// Backtick beside the tool a React Native developer already compares it to.
// On a phone each row stacks, and each cell names its column.
export async function Comparison({
  other,
  rows,
}: {
  other: string;
  rows: Row[];
}) {
  return cs`(
    <div class="overflow-hidden rounded-[20px] border border-line">
      <div class="grid grid-cols-[160px_1fr_1fr] border-b border-line bg-wash text-sm font-semibold max-sm:hidden">
        <span class="px-5 py-3" />
        <span class="px-5 py-3 text-muted">{$other}</span>
        <span class="px-5 py-3 text-react">Backtick</span>
      </div>
      {$rows.map((row) => (
        <div class="grid border-b border-line text-[15px] last:border-b-0 sm:grid-cols-[160px_1fr_1fr]">
          <span class="px-5 pt-4 font-semibold sm:py-4">{row.label}</span>
          <span class="px-5 pt-1 text-muted sm:py-4">
            <span class="font-medium sm:hidden">{$other + ": "}</span>
            {row.other}
          </span>
          <span class="px-5 pt-1 pb-4 sm:py-4">
            <span class="font-medium text-react sm:hidden">{"Backtick: "}</span>
            {row.backtick}
          </span>
        </div>
      ))}
    </div>
  )`;
}
