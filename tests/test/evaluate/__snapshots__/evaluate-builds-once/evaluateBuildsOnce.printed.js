export default ($d) => {
  const f1 = ($0, $1, $2) => {
    const asked = $0()($d[0]);
    return element($d[6], [], () => [
      element($d[2], [], () => () => $d[1] + asked.get()),
      memo(() =>
        component($2(), [
          [
            $d[3],
            () => () => () => {
              asked.set(asked.get() + $d[4]);
              return asked.get() > $d[5] ? null : $1();
            },
          ],
        ]),
      ),
    ]);
  };
  const f2 = ($0, $1, $2, $3) => {
    const drawn = $0()(null);
    const started = $1().setTimeout(() => drawn.set($2()()), $d[0]);
    return memo(() => (drawn.get() === null ? null : $3()(drawn.get())));
  };
  return f1(
    () => state,
    () => ({
      [$d[7]]: { [$d[8]]: [$d[9], [], [$d[10], $d[11], {}, $d[12]]] },
      [$d[13]]: [$d[14], [$d[9], [], [$d[15], [$d[16], $d[8]], []]], {}, null],
    }),
    () => ($0) =>
      f2(
        () => state,
        () => window,
        () => $0.ask(),
        () => evaluate,
      ),
  );
};
