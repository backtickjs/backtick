// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. `stringify.test.ts` checks none of it survives unescaped.
export default <p>{`& < > " ' </script> <!-- -->`}</p>;
