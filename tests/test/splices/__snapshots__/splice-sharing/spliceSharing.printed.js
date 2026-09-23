export default ($d) => {
  const f1 = ($0, $1) => ({ [$d[0]]: $0(), [$d[1]]: $1() });
  const f2 = ($0, $1) => $0() + $1();
  const f3 = () => $d[2];
  const f4 = () => $d[3];
  const f5 = () => $d[4];
  const f6 = () => $d[5];
  return f1(
    () => f2(f3, f4),
    () => f2(f5, f6),
  );
};
