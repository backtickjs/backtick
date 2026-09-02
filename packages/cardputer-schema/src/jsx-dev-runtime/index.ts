// What the JSX transform imports when it is compiled for development, which is
// the toolchain's decision and not the app's: the same functions under the
// names that transform expects.
export { jsx as jsxDEV, jsxs, Fragment } from "../jsx-runtime/index.js";
export type { JSX } from "../jsx-runtime/index.js";
