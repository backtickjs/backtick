export default ($d) => {
  const f1 = ($0) => {
    const greet = $0()((name) => $d[0] + name);
    return element(
      $d[4],
      [[$d[1], () => () => greet.set((name) => $d[2] + name), true]],
      () => () => greet.get()($d[3]),
    );
  };
  return component(() => f1(() => state), []);
};
