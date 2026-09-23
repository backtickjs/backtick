export default ($d) => {
  const f1 = ($0, $1) => $0() + $1();
  const f2 = ($0, $1) => {
    const outer = $0();
    return $1(outer);
  };
  const f3 = () => $d[0];
  const f4 = ($0) => $0() + $d[0];
  const f5 = ($0, $1) => {
    const middle = $d[1];
    return middle + $0($1);
  };
  const f6 = ($0) => $0;
  const f7 = () => $d[2];
  return f1(
    () => f2(f3, (outer) => f4(() => f5(f6, outer))),
    () => f2(f7, (outer) => f4(() => f5(f6, outer))),
  );
};
