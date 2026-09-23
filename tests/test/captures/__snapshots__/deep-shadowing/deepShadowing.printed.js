export default ($d) => {
  const f1 = ($0) => {
    const base = $d[0];
    return $0(base);
  };
  const f2 = ($0) => {
    const base = $d[1];
    return base + $0();
  };
  const f3 = ($0) => {
    const base = $d[2];
    return base * $0();
  };
  const f4 = ($0) => $0;
  return f1((base) => f2(() => f3(() => f4(base))));
};
