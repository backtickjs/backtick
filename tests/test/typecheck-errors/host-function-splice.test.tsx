import { cs } from "@backtickjs/core";
import type { Prop } from "@backtickjs/solid-js/jsx-runtime";

// A host function is not spliceable (see `Spliceable`): only a tag may name
// one, as a component. Client behaviour is `cs`.
function Card(props: { readonly title: Prop<string> }) {
  return <h2>{props.title}</h2>;
}

export default cs`{
  // @ts-expect-error: Type '(props: { readonly title: Prop<string>; }) => Element' does not satisfy the expected type 'Spliceable'.
  const Heading = $Card;
  return <Card title="tag" />;
}`;
