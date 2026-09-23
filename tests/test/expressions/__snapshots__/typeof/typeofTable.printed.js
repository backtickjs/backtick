export default ($d) => {
  const f1 = ($0) => {
    const count = $0()($d[0]);
    return [
      typeof void 0,
      typeof null,
      typeof $d[1],
      typeof $d[2],
      typeof $d[3],
      typeof [$d[2]],
      typeof { [$d[3]]: $d[2] },
      typeof ((n) => n),
      typeof Math.floor,
      typeof count,
    ];
  };
  return f1(() => state);
};
