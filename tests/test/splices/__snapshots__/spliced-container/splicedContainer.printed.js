export default ($d) => {
  const f1 = ($0) => $0().x + $d[0];
  const f2 = () => $d[0];
  const f3 = () => $d[1];
  return f1(() => ({ [$d[2]]: f2(), [$d[3]]: f3() }));
};
