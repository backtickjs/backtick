

const componentLabels = ["alpha", "beta", "gamma"];

async function Row({ label }: { label: string }) {
  return <span>{label}</span>;
}

// The same list, but each item is a component invocation rather than an
// element. Every invocation is an instance, so each gets a tree entry of its
// own and the key rides the `#apply` that instantiates it — the contrast with
// `mappedElements`, where the key sits inside an inlined element instead.
const mappedComponents = (
  <div>
    {componentLabels.map((item) => (
      <Row label={item} />
    ))}
  </div>
);
