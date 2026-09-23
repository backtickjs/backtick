export default ($d) => {
  const f1 = ($0) => {
    const x = $d[0];
    return $0(x);
  };
  const f2 = ($0) => $0;
  return f1(f2);
};
