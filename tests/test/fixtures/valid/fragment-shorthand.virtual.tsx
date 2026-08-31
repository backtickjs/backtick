// `<>…</>` and `<Fragment>` are one component: the JSX transform imports
// `Fragment` from the configured `jsxImportSource`, and the jsx-runtime
// re-exports the core component under that name. The shorthand needs no import.
export default (
  <div>
    <>
      <span>a</span>
      <span>b</span>
    </>
  </div>
);
