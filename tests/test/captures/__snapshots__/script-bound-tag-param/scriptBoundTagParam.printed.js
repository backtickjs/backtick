export default ($d) => {
  const f1 = ($0, $1) => {
    const twice = (Row) =>
      element($d[0], [], () => [memo(() => $0(Row)), memo(() => $1(Row))]);
    return twice((p) => element($d[2], [], () => () => $d[1] + p.n));
  };
  const f2 = ($0) => component($0, [[$d[3], () => $d[4]]]);
  const f3 = ($0) => component($0, [[$d[3], () => $d[5]]]);
  return f1(f2, f3);
};
