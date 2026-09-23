export default ($d) => {
  const f1 = ($0) => ({ [$d[0]]: $0()(null), [$d[1]]: $0()($d[2]) });
  const f2 = () => (n) => {
    return n === null ? $d[3] : n + $d[4];
  };
  return f1(f2);
};
