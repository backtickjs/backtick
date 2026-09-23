export default ($d) => {
  const f1 = ($0, $1, $2) => ({
    [$d[0]]: $0()($d[1]),
    [$d[2]]: $0()(void 0),
    [$d[3]]: $0()(),
    [$d[4]]: $1()($2()),
    [$d[5]]: $1()(void 0),
    [$d[6]]: $1()(),
  });
  const f2 = () => (name) => {
    return name?.concat($d[7]);
  };
  const f3 = () => (cb) => {
    return cb?.() ?? $d[8];
  };
  const f4 = () => () => $d[9];
  return f1(f2, f3, f4);
};
