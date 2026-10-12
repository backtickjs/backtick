import { cs } from "@backtickjs/core";

// What a server-driven screen can't do, said plainly, so the rest of the page
// is believed.
const LIMITS = [
  {
    title: "Native code",
    body: "New native modules still need a store release. Screens use the packages your app already ships, and the bundler checks their versions on every request. Keep EAS Update for that shell.",
  },
  {
    title: "Offline",
    body: "A screen needs a connection unless your app caches it. Keep flows that must work offline in the app.",
  },
  {
    title: "Trust",
    body: "The phone runs the code your server sends, so serve screens only from your own server, over HTTPS. Read Apple's guideline 2.5.2 before you build a product on it.",
  },
];

export const TradeOffsVisual = cs`() => (
  <div class="grid gap-4 md:grid-cols-3">
    {$LIMITS.map((limit) => (
      <div class="rounded-[20px] border border-line bg-wash p-5">
        <p class="text-[17px] font-semibold">{limit.title}</p>
        <p class="mt-2 text-[14.5px] text-muted">{limit.body}</p>
      </div>
    ))}
  </div>
)`;
