import { it } from "node:test";
import { snapshotCase } from "../snapshotCase.ts";

// A component stands exactly where its tag did, so what it may answer with is
// what may stand there: one drawing, or nothing at all. Text and a list are
// neither — a component with several children to give, or a bare string, wraps
// them in a fragment, which is the one drawing that holds them and draws no
// node of its own.
async function Label() {
  return <>counted</>;
}

async function Pair() {
  return (
    <>
      <em>one</em>
      <em>two</em>
    </>
  );
}

it("componentAnswersChildren", async (t) => {
  await snapshotCase(
    t,
    "componentAnswersChildren",
    <div>
      <Label />
      <Pair />
    </div>,
  );
});
