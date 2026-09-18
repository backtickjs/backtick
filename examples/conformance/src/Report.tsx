import { cs, For } from "@backtickjs/core";
import { verdict, type Verdict } from "./Case.js";
import { cases } from "./cases/index.js";

// A server component: it picks the cases and wraps each in its verdict. The
// client under test runs them and judges them, so what this draws is that
// client's answer.
//
// Drawn with text, `<>` and `<For>` alone — no client's own elements — so any
// client that draws text draws this.
export async function Report({ grep }: { grep: string }) {
  const verdicts = cases
    .filter((test) => test.name.includes(grep))
    .map((test) => verdict(test));

  return cs`{
    const results = $verdicts;
    const failed = results.filter((result) => !result.ok);

    return (
      <>
        {results.length - failed.length + " of " + results.length + " passed"}
        {failed.length === 0 ? "\n\n" : ", " + failed.length + " failed\n\n"}
        <For each={results}>
          {(result: Verdict) => (
            <>
              {(result.ok ? "pass  " : "FAIL  ") + result.name}
              {result.ok ? "\n" : "\n      " + result.detail + "\n"}
            </>
          )}
        </For>
      </>
    );
  }`;
}
