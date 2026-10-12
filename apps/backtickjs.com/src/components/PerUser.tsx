import { cs } from "@backtickjs/core";
import { CodePanel, marked } from "./CodePanel.js";

// Per user: one server component branching on who asked, and what each phone
// was sent. The server's code and the branch not taken never leave it.

const SERVER = await marked(`
export async function Home({ user }: { user: User }) {
  if (user.subscription) {
    const delivery = await db.nextDelivery(user.id);
*    return cs\`(<$NextDelivery delivery={$delivery} />)\`;
  }

  const offer = await cms.welcomeOffer(user.region);
*  return cs\`(<$WelcomeOffer offer={$offer} />)\`;
}
`);

type Received = { who: string; sent: string[]; kept: string[] };

const RECEIVED: Received[] = [
  {
    who: "A subscriber's phone",
    sent: ["NextDelivery", "their next delivery"],
    kept: ["WelcomeOffer", "your server code"],
  },
  {
    who: "A new customer's phone",
    sent: ["WelcomeOffer", "the offer for their region"],
    kept: ["NextDelivery", "other regions' offers", "your server code"],
  },
];

export const PerUserVisual = cs`() => (
  <div class="grid items-start gap-4 md:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
    <$CodePanel file="server/Home.tsx" lines={$SERVER} />
    <div class="grid gap-4">
      {$RECEIVED.map((received) => (
        <figure class="m-0 grid gap-3 rounded-[20px] border border-line bg-wash p-5">
          <p class="font-mono text-xs tracking-[0.12em] text-react uppercase">
            {received.who}
          </p>
          <div class="grid gap-4 sm:grid-cols-2">
            {[
              { label: "Sent", items: received.sent, ink: "" },
              {
                label: "Stays on your server",
                items: received.kept,
                ink: " text-muted",
              },
            ].map((group) => (
              <div class="grid content-start gap-1.5">
                <p class="font-mono text-[11px] tracking-[0.08em] text-muted uppercase">
                  {group.label}
                </p>
                <ul class={"grid gap-1 text-[14.5px]" + group.ink}>
                  {group.items.map((item) => (
                    <li>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </figure>
      ))}
      <p class="text-[14.5px] text-muted">
        Each phone gets one small JavaScript file, made for that request.
      </p>
    </div>
  </div>
)`;
