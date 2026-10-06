import { cs } from "@backtickjs/core";

// A type alias rather than an interface: what is spliced into a script has to
// answer as a plain record of client values, and an interface does not.
export type Card = { icon: string; name: string; text: string };

// Feather's icons (MIT), as the markup inside a 24 by 24 stroked `<svg>`.
export const ICONS = {
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>',
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

// A row of cards, each an icon, a name and a sentence or two: one look for
// every set of points the page makes.
export async function Cards({ cards }: { cards: Card[] }) {
  return cs`(
    <div class="grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-3.5">
      {$cards.map((card) => (
        <div class="grid content-start gap-1.5 rounded-[20px] border border-line bg-paper p-6 transition hover:-translate-y-0.5 hover:border-react/40">
          <span class="mb-3 text-react">
            <svg
              class="size-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              aria-hidden="true"
              innerHTML={card.icon}
            />
          </span>
          <p class="text-lg font-bold tracking-[-0.01em]">{card.name}</p>
          <p class="text-[15px] text-muted">{card.text}</p>
        </div>
      ))}
    </div>
  )`;
}
