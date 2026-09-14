// Declared here rather than imported from Solid, though Solid is what consumes
// it: a target implements this package's contract and carries no dependency for
// it. The reactive graph behind these calls is an implementation detail of the
// interpreter, and the shape is checked structurally where the two meet.
export interface RendererOptions<NodeType> {
  // A tag drawn inside an `svg` arrives as `svg:<tag>`
  createElement(tag: string): NodeType;
  createTextNode(value: string): NodeType;
  replaceText(textNode: NodeType, value: string): void;
  isTextNode(node: NodeType): boolean;
  setProperty<T>(node: NodeType, name: string, value: T, prev?: T): void;
  insertNode(parent: NodeType, node: NodeType, anchor?: NodeType): void;
  removeNode(parent: NodeType, node: NodeType): void;
  getParentNode(node: NodeType): NodeType | undefined;
  getFirstChild(node: NodeType): NodeType | undefined;
  getNextSibling(node: NodeType): NodeType | undefined;
}
