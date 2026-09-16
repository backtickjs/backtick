import { jsx as _jsx } from "@backtickjs/web-sdk/jsx-runtime";
// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. The tests below check none of it survives unescaped.
const scriptCloseText = _jsx("p", { children: `& < > " ' </script> <!-- -->` });
