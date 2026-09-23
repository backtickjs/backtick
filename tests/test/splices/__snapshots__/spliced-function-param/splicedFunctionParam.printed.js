export default ($d) => {
  const f1 = ($0) => {
    const apply = (f) => f() + $d[0];
    return apply($0());
  };
  const f2 = () => () => $d[1];
  return f1(f2);
};
