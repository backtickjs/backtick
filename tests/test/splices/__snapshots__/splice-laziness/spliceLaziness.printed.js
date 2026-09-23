export default ($d) => {
  const f1 = ($0, $1) => ({ [$d[0]]: $0()($d[1]), [$d[2]]: $1()($d[3]) });
  const f2 = ($0) => (flag) => {
    if (flag) {
      {
        return $0();
      }
    }
    return $d[2];
  };
  const f3 = () => $d[4];
  const f4 = () => {
    throw $d[5];
  };
  return f1(
    () => f2(f3),
    () => f2(f4),
  );
};
