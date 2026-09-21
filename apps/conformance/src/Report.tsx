import { cs, evaluate, For, http, onMount, state } from "@backtickjs/core";
import type { Bundle, ClientValue, State } from "@backtickjs/core";
import { shown, type Verdict } from "./Case.js";

// A group as the page holds it: nothing, then its verdicts or why there are none.
type Row = {
  name: string;
  verdicts: State<readonly Verdict[] | null>;
  problem: State<string | null>;
};

// A skip-list entry, and how many of the cases asked for it took out.
type Skip = { key: string; reason: string; count: number };

// A server component: it names the groups and what was skipped, and nothing
// more. The client under
// test fetches each one's bundle from `base`, runs it and judges it, so what
// this draws is that client's answer — group by group, as each arrives.
//
// Drawn with text, `<>` and `<For>` alone, and fetched with `http` and `vm`,
// which are the language's — so any client that draws text draws this.
export async function Report({
  groups,
  skips,
  base,
  detailed,
}: {
  groups: string[];
  skips: Skip[];
  base: string;
  detailed: boolean;
}) {
  return cs`{
    const rows: readonly Row[] = $groups.map((name: string) => ({
      name: name,
      verdicts: $state<readonly Verdict[] | null>(null),
      problem: $state<string | null>(null),
    }));

    // A few groups at a time, each starting the next as it settles: a
    // browser turns away a page that asks for them all at once. next is kept
    // in storage because a function cannot name itself where it is declared.
    $onMount(() => {
      const cursor = $state(0);
      const next = $state<() => boolean>(() => false);
      next.set(() => {
        const at = cursor.get();
        if (at >= rows.length) {
          return false;
        }
        cursor.set(at + 1);
        const row = rows[at];
        $http.get(
          $base + "/group/" + row.name,
          (response) => {
            if (response.status !== 200) {
              row.problem.set("answered " + response.status);
            } else {
              try {
                const cases = JSON.parse(response.data) as readonly {
                  name: string;
                  bundle: Bundle<Verdict>;
                }[];
                row.verdicts.set(
                  cases.map((held) => {
                    try {
                      return $evaluate(held.bundle);
                    } catch (error) {
                      return {
                        name: held.name,
                        outcome: "fail",
                        detail: "did not run: " + $shown(error as ClientValue),
                      };
                    }
                  }),
                );
              } catch (error) {
                row.problem.set("did not run: " + $shown(error as ClientValue));
              }
            }
            const started = next.get()();
          },
          (message) => {
            row.problem.set(message);
            const started = next.get()();
          },
        );
        return true;
      });
      // Six: as many connections as a browser keeps open to one host.
      for (let lane = 0; lane < 6; lane = lane + 1) {
        const started = next.get()();
      }
    });

    const count = (verdicts: readonly Verdict[] | null, outcome: string) =>
      (verdicts ?? []).filter((verdict) => verdict.outcome === outcome).length;
    const total = (outcome: string) =>
      rows.reduce((sum, row) => sum + count(row.verdicts.get(), outcome), 0);
    const loaded = () =>
      rows.filter(
        (row) => row.verdicts.get() !== null || row.problem.get() !== null,
      ).length;

    return (
      <>
        {total("pass") +
          " passed, " +
          total("fail") +
          " failed, " +
          total("unsupported") +
          " not client script, " +
          $skips.reduce((sum: number, skip: Skip) => sum + skip.count, 0) +
          " skipped"}
        {"  (" + loaded() + " of " + rows.length + " groups)\n\n"}
        <For each={$skips}>
          {(skip: Skip) => (
            <>
              {"skipped  " +
                skip.key +
                "  " +
                skip.count +
                (skip.count === 1 ? " case" : " cases") +
                ": " +
                skip.reason +
                "\n"}
            </>
          )}
        </For>
        {$skips.length > 0 ? "\n" : ""}
        <For each={rows}>
          {(row: Row) => (
            <>
              {row.problem.get() !== null
                ? row.name + "  " + row.problem.get() + "\n"
                : row.verdicts.get() === null
                  ? row.name + "  ...\n"
                  : row.name +
                    "  " +
                    count(row.verdicts.get(), "pass") +
                    " passed, " +
                    count(row.verdicts.get(), "fail") +
                    " failed, " +
                    count(row.verdicts.get(), "unsupported") +
                    " not client script\n"}
              <For
                each={
                  $detailed
                    ? (row.verdicts.get() ?? []).filter(
                        (v: Verdict) => v.outcome !== "pass",
                      )
                    : []
                }
              >
                {(verdict: Verdict) => (
                  <>
                    {(verdict.outcome === "fail"
                      ? "    FAIL  "
                      : "    ----  ") +
                      verdict.name +
                      "  " +
                      verdict.detail +
                      "\n"}
                  </>
                )}
              </For>
            </>
          )}
        </For>
      </>
    );
  }`;
}
