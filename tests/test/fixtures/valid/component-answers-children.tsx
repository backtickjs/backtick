// A component stands exactly where its tag did, so what it may answer with is
// what may stand in a children position: `Children<D>`, where `D` is what the
// target draws with. A browser draws a bare string or a number there, and a
// list of children is a children position too.
async function Label() {
  return "counted";
}

async function Pair() {
  return [<em>one</em>, <em>two</em>];
}

export default (
  <div>
    <Label />
    <Pair />
  </div>
);
