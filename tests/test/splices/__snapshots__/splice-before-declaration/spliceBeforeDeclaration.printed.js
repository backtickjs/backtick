export default ($d) => {
  const f1 = ($0, $1) => $0() + $1();
  const f2 = ($0) => {
    const before = $d[0];
    const spliced = $0();
    const after = $d[1];
    return before + spliced + after;
  };
  const f3 = () => $d[2];
  const f4 = () => $d[3];
  return f1(
    () => f2(f3),
    () => f2(f4),
  );
};
