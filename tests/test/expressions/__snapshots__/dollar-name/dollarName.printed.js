export default ($d) => {
  const f1 = ($0) => {
    const foo$ = $d[0];
    return $0(foo$);
  };
  const f2 = ($0) => $0() + $d[1];
  const f3 = ($0) => $0;
  return f1((foo$) => f2(() => f3(foo$)));
};
