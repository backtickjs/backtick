import { cs } from "@backtickjs/core";

// The script between them binds `Badge` to a number, and the nearest binding is
// the one a tag names: the innermost `<Badge />` calls a number.
export default cs`{
  const Badge = (p: { n: number }) => <b>{"n " + p.n}</b>;
  return ${cs`{
    const Badge = 5;
    // @ts-expect-error: JSX element type 'Badge' does not have any construct or call signatures.
    return ${cs`<Badge n={1} />`};
  }`};
}`;
