import { cs } from "@backtickjs/core";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
type Row = { label: string; eas: string; backtick: string };

const ROWS: Row[] = [
  {
    label: "What ships",
    eas: "The whole app's JavaScript bundle",
    backtick: "One screen at a time",
  },
  {
    label: "Who gets what",
    eas: "Everyone on a channel gets the same bundle",
    backtick: "Each request can get its own screen: per user, region or flag",
  },
  {
    label: "When it's built",
    eas: "Once, at publish time, by Metro",
    backtick: "At request time, by your server components",
  },
  {
    label: "Data",
    eas: "Fetched by the app after it loads",
    backtick: "Already in the screen when it arrives",
  },
  {
    label: "When it's live",
    eas: "Usually on the next launch",
    backtick: "On the next fetch of that screen, no restart",
  },
  {
    label: "Offline",
    eas: "The cached bundle runs offline",
    backtick: "Needs your server to load a screen",
  },
];

// The question every React Native developer asks first, answered side by
// side. On a phone each row stacks, and each cell names its column.
export async function EasUpdate() {
  return cs`(
    <div class="overflow-hidden rounded-[20px] border border-line">
      <div class="grid grid-cols-[160px_1fr_1fr] border-b border-line bg-wash text-sm font-semibold max-sm:hidden">
        <span class="px-5 py-3" />
        <span class="px-5 py-3 text-muted">EAS Update</span>
        <span class="px-5 py-3 text-react">Backtick</span>
      </div>
      {$ROWS.map((row) => (
        <div class="grid border-b border-line text-[15px] last:border-b-0 sm:grid-cols-[160px_1fr_1fr]">
          <span class="px-5 pt-4 font-semibold sm:py-4">{row.label}</span>
          <span class="px-5 pt-1 text-muted sm:py-4">
            <span class="font-medium sm:hidden">{"EAS Update: "}</span>
            {row.eas}
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
