

// Every character an HTML parser treats specially inside a `<script>`, as text
// a bundle carries. The tests below check none of it survives unescaped.
const scriptCloseText = <p>{`& < > " ' </script> <!-- -->`}</p>;
