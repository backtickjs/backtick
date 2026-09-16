import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. `stringify.test.ts` checks none of it survives unescaped.
export default _jsx("p", { children: `& < > " ' </script> <!-- -->` });
