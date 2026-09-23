export default ($d) => {
  const f1 = ($0) => $0();
  const f2 = ($0, $1) => $0() + $1();
  const f3 = () => $d[0];
  const f4 = () => $d[1];
  return f1(() => f2(f3, f4));
};
