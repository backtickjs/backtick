

const shared = <span>hi</span>;

// The same element instance referenced twice hoists into its own tree entry;
// each occurrence becomes a `#call` instead of inlining twice.
const jsxSharedSubtree = <div>{[shared, shared]}</div>;
