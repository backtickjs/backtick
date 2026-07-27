import { cs, Fragment, Text } from "@backtickjs/core";
import type { Client, JSX } from "@backtickjs/core";

async function Row({ label }: { label: string }) {
  return <Text>{label}</Text>;
}

// The remedy for `bundle-error/keyed-component-in-script.tsx`. A component's
// key rides the reference that instantiates it, and a script instantiates a
// tree with a plain call, which carries no key — so splicing a keyed component
// straight into a script is refused.
//
// A `Fragment` puts the invocations back in tree position. What the script
// splices is now an element, and an element keeps its own identity through a
// splice; its children are placed in a tree, where a keyed reference is an
// `#apply` with a key on it.
const rows = (
  <Fragment>
    <Row key="a" label="one" />
    <Row key="b" label="two" />
  </Fragment>
);

const script: Client<() => JSX.Element> = cs.lift(cs.const(() => cs.splice((rows))));
export default script;
