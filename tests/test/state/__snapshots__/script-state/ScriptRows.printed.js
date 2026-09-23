export default ($d) => {
  const f1 = () => $d[0];
  const f2 = ($0) => () => {
    const row = $0()($d[1]);
    row.label.set(row.label.get() + $d[2]);
  };
  const f3 = ($0) => (label) => {
    return { [$d[3]]: $0()(label) };
  };
  const f4 = ($0) => $0()($d[1]).label.get();
  return element(
    $d[6],
    [
      [$d[4], () => f1(), false],
      [$d[5], () => f2(() => f3(() => state)), false],
    ],
    () => () => f4(() => f3(() => state)),
  );
};
