export default ($d) => {
  const f1 = ($0, $1, $2) => {
    const flag = $0()($d[0]);
    const tone = $0()($1());
    const step = $0()(() => $d[1]);
    return element(
      $d[6],
      [
        [
          $d[2],
          () => () => {
            flag.set($d[3]);
            tone.set($2());
            step.set(() => $d[4]);
          },
          true,
        ],
      ],
      () => () => flag.get() + $d[5] + tone.get() + $d[5] + step.get()(),
    );
  };
  return component(
    () =>
      f1(
        () => state,
        () => $d[7],
        () => $d[8],
      ),
    [],
  );
};
