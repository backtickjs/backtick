import { bundler } from "@backtickjs/bundler";
import { cs, vm } from "@backtickjs/core";
import type { BacktickElement, Bundle, Prop } from "@backtickjs/core";

// What `vm.eval` answers with is what the bundle says it evaluates to — a
// drawing, or a function of what it takes — so a tag naming it is checked the
// way any component is. Nothing here writes a type argument.
type Rows = (props: { count: number }) => BacktickElement;

// Built rather than written out: what a bundle looks like is the bundler's, and
// a fixture that spelled one would pin the format twice. The claim about what
// each takes is still written, because that is what is under test.
async function Row({ count }: { count: Prop<number> }) {
  return cs`<em>{"rows " + $count}</em>`;
}

async function Nothing() {
  return cs`<em>{"nothing to hand it"}</em>`;
}

const rows = (await bundler.run(cs`(props: { count: number }) => ${(
  <Row count={cs`props.count`} />
)}`)) as Bundle<Rows>;

const empty = (await bundler.run(<Nothing />)) as Bundle<BacktickElement>;

export default cs`{
  const Rows = $vm.eval($rows);
  const Empty = $vm.eval($empty);

  return (
    <div>
      {/* Right: what the bundle takes, and a drawing, placed as one. */}
      <Rows count={1} />
      {Empty}

      {/* Wrong: the wrong type, a name it hasn't got, and none at all. */}
      <Rows count={"one"} />
      <Rows nope={1} />
      <Rows />

      {/* A drawing is finished: there is no call for props to reach. */}
      <Empty count={1} />

      {/* Only a bundle: not nothing, and not the text one came as. */}
      {$vm.eval(null)}
      {$vm.eval(JSON.stringify({}))}
    </div>
  );
}`;
