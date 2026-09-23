export default ($d) => {
  const f1 = ($0, $1) => {
    return $0() + $1();
  };
  const f2 = ($0) => {
    return $0()($d[0]).get();
  };
  const f3 = ($0) => (n) => $0()(n + $d[1]);
  return f1(
    () => f2(() => state),
    () => f2(() => f3(() => state)),
  );
};
