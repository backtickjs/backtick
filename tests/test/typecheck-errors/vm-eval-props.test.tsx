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

const rows = (await bundler.run(
  cs`(props: { count: number }) => ${(<Row count={cs`props.count`} />)}`,
)) as Bundle<Rows>;

const empty = (await bundler.run(<Nothing />)) as Bundle<BacktickElement>;

export default cs`{
  const Rows = $vm.eval($rows);
  const Empty = $vm.eval($empty);

  // Wrong: the wrong type, a name it hasn't got, and none at all.
  // @ts-expect-error: Type 'string' is not assignable to type 'number'.
  const wrongType = <Rows count={"one"} />;
  // @ts-expect-error: Type '{ nope: number; }' is not assignable to type '{ count: number; }'.
  const unknownName = <Rows nope={1} />;
  // @ts-expect-error: Property 'count' is missing in type '{}' but required in type '{ count: number; }'.
  const missing = <Rows />;

  // A drawing is finished: there is no call for props to reach.
  // @ts-expect-error: JSX element type 'Empty' does not have any construct or call signatures.
  const called = <Empty count={1} />;

  return (
    <div>
      {/* Right: what the bundle takes, and a drawing, placed as one. */}
      <Rows count={1} />
      {Empty}
      {wrongType}
      {unknownName}
      {missing}
      {called}
      {/* Only a bundle: not nothing, and not the text one came as. */}
      {
        // @ts-expect-error: Argument of type 'null' is not assignable to parameter of type 'Bundle<string | number | BacktickElement | null>'.
        $vm.eval(null)
      }
      {
        // @ts-expect-error: Argument of type 'string' is not assignable to parameter of type 'Bundle<string | number | BacktickElement | null>'.
        $vm.eval(JSON.stringify({}))
      }
    </div>
  );
}`;
