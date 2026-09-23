export default ($d) => {
  const f1 = ($0, $1, $2, $3) => {
    const n = $0()($1());
    n.set($d[0]);
    const c = $0()($2());
    c.set($3());
  };
  return f1(
    () => state,
    () => $d[1],
    () => $d[2],
    () => $d[3],
  );
};
