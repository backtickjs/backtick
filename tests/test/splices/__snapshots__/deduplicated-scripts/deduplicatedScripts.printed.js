export default ($d) => {
  const f1 = ($0) => ({ [$d[0]]: $0(), [$d[1]]: $0() });
  const f2 = () => $d[2];
  return f1(f2);
};
