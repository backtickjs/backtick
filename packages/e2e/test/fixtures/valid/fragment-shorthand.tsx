import { Text, View } from "@backtickjs/core";

// `<>…</>` and `<Fragment>` are one component: the JSX transform imports
// `Fragment` from the configured `jsxImportSource`, and the jsx-runtime
// re-exports the core component under that name. The shorthand needs no import.
export default (
  <View>
    <>
      <Text>a</Text>
      <Text>b</Text>
    </>
  </View>
);
