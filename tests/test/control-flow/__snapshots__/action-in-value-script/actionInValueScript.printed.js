export default ($d) => {
  const f1 = ($0, $1) => (b) => {
    let n = $d[0];
    $0();
    if (b) {
      {
        $1()();
        n = $d[1];
      }
    }
    return n;
  };
  const f2 = () => {
    const x = $d[1];
  };
  const f3 = () => () => {
    let n = $d[0];
    n = $d[1];
  };
  return f1(f2, f3);
};
