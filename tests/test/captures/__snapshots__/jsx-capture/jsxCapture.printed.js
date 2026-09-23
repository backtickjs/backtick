export default ($d) => {
  const f1 = ($0) => () => {
    const x = $d[0];
    return $0(x);
  };
  const f2 = ($0) => () => $0;
  return f1((x) => element($d[2], [[$d[1], () => f2(x), false]], null));
};
