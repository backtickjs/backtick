export default ($d) => {
  const f1 = ($0) => ({
    [$d[0]]: $0()($d[1], $d[1]),
    [$d[2]]: $0()($d[1], $d[3]),
  });
  const f2 = () => (a, b) => {
    const keep = (on) => on;
    if (keep(a && b)) {
      {
        return $d[4];
      }
    }
    return $d[5];
  };
  return f1(f2);
};
