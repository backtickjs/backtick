export default ($d) => {
  const f1 = ($0) => ({
    [$d[0]]: $0()(null),
    [$d[1]]: $0()($d[2]),
    [$d[3]]: null,
  });
  const f2 = () => (value) => {
    if (value === null) {
      {
        return $d[4];
      }
    }
    return value;
  };
  return f1(f2);
};
