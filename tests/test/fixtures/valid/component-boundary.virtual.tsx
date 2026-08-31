// A server component's invocation is an instance boundary, so it hoists into a
// tree entry of its own even though each `<Label />` is referenced once and
// would otherwise inline into the `View`. The entry is what a per-instance cell
// will belong to, so it can't depend on how many places reference the element.
//
// The component leaves no named trace: the payload carries `Text`, never
// `Label`.
async function Label(props: { text: string }) {
  return <span>{props.text}</span>;
}

export default (
  <div>
    <Label text="one" />
    <Label text="two" />
  </div>
);
