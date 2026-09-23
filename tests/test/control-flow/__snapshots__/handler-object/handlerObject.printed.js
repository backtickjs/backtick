export default ($d) => {
  const f1 = ($0) => {
    const handlers = { [$d[0]]: $0(), [$d[1]]: $0() };
    return handlers;
  };
  const f2 = ($0) => (id) => {
    $0();
  };
  const f3 = () => {
    let n = $d[2];
    n = $d[3];
  };
  return f1(() => f2(f3));
};
