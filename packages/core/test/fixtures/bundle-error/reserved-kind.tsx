// `#kind` discriminates the bundle's body AST nodes, so a plain data object
// can't use it any more than the expression tag keys.
export default <button data={{ "#kind": "value" }} />;
