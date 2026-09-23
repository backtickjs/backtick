export default ($d) => {
  const f1 = ($0, $1, $2) => ({
    [$d[0]]: $0()({ [$d[1]]: $d[2] }),
    [$d[3]]: $0()(null),
    [$d[4]]: $1()({ [$d[5]]: { [$d[6]]: $d[7] } }),
    [$d[8]]: $1()({ [$d[5]]: null }),
    [$d[9]]: $1()(null),
    [$d[10]]: $2()($d[11]),
    [$d[12]]: $2()(null),
  });
  const f2 = () => (p) => {
    return p?.x;
  };
  const f3 = () => (o) => {
    return o?.inner?.z;
  };
  const f4 = () => (s) => {
    return s?.concat($d[13]);
  };
  return f1(f2, f3, f4);
};
