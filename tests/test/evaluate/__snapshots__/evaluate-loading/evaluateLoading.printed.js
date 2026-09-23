export default ($d) => {
  const f1 = ($0, $1) => {
    const held = $0()(null);
    return element(
      $d[2],
      [],
      () => () =>
        held.get() === null
          ? element($d[1], [], () => $d[0])
          : $1()(held.get()),
    );
  };
  return f1(
    () => state,
    () => evaluate,
  );
};
