export default ($d) => {
  const f1 = ($0) => {
    const stored = $0();
    const caught = $0()();
    return $d[0];
  };
  const f2 = () => () => $d[1];
  return f1(f2);
};
