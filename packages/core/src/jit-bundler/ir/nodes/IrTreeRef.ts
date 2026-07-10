// A reference into the IR's tree table — how a script body, another tree,
// or the IR root embeds a JSX tree. Unlike an `IrScriptRef` it carries no
// arguments: a tree's data is baked into its entry, and the captures its
// scripts need (the tree's slot signature) are derived and threaded by the
// serializer.
export class IrTreeRef {
  readonly target: number;

  constructor(target: number) {
    this.target = target;
  }
}
