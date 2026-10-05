import { cs } from "@backtickjs/core";

type Stage = { step: string; name: string; text: string; chip: string };

const STAGES: Stage[] = [
  {
    step: "01 · YOUR SERVER",
    name: "Server components",
    text:
      "Async functions that run per request. Query the database, read a flag," +
      " call the CMS, check who is asking. Keys and queries never leave.",
    chip: "async function Home()",
  },
  {
    step: "02 · THE WIRE",
    name: "A JavaScript bundle",
    text:
      "Built for the exact React and React Native versions your app shipped" +
      " with. Serve it from any route; cache it, version it, roll it back.",
    chip: "bundler.build({ input, external })",
  },
  {
    step: "03 · THE PHONE",
    name: "Client components",
    text:
      "Run on the device with real hooks and real state, and render as" +
      " native views. A tap never waits on the network unless you ask it to.",
    chip: "cs`(props) => …`",
  },
];

export async function Flow() {
  return cs`(
    <div class="flex flex-wrap items-stretch gap-3.5">
      {$STAGES.map((stage, index) => (
        <>
          {index > 0 && (
            <span class="self-center text-[22px] text-muted max-[860px]:hidden">
              →
            </span>
          )}
          <div class="flex-[1_1_260px] rounded-[20px] border border-line bg-wash p-[26px]">
            <p class="font-mono text-xs text-react">{stage.step}</p>
            <p class="mt-2.5 mb-2 text-[21px] font-bold tracking-[-0.02em]">
              {stage.name}
            </p>
            <p class="text-[15.5px] text-muted">{stage.text}</p>
            <code class="code-chip mt-[18px] bg-paper">{stage.chip}</code>
          </div>
        </>
      ))}
    </div>
  )`;
}
