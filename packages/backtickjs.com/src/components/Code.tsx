// A listing. Its own component so that every page spells one the same way, and
// because what a `<pre>` holds is text: it goes onto the wire as a string and
// is drawn with `createTextNode`, so nothing in it needs escaping.
export async function Code({ source }: { source: string }) {
  return (
    <pre>
      <code>{source}</code>
    </pre>
  );
}
