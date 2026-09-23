export default ($d) => {
  const f1 = ($0, $1, $2, $3) => {
    const held = $0()($1());
    return element(
      $d[1],
      [[$d[0], () => () => held.set($2()), true]],
      () => () => $3()(held.get()),
    );
  };
  const f2 = ($0) => (c) => {
    return c === $0() ? $d[2] : $d[3];
  };
  return component(
    () =>
      f1(
        () => state,
        () => $d[4],
        () => $d[5],
        () => f2(() => $d[5]),
      ),
    [],
  );
};
