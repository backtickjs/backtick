export default ($d) => {
  const f1 = ($0, $1) => {
    const builds = $0()($d[0]);
    return element($d[7], [], () => [
      element($d[2], [], () => () => $d[1] + builds.get()),
      element(
        $d[6],
        [],
        () => () =>
          component($1(), [
            [
              $d[3],
              () => () => () => {
                builds.set(builds.get() + $d[4]);
                return builds.get() < $d[5];
              },
            ],
          ]),
      ),
    ]);
  };
  const f2 = ($0, $1, $2) => {
    const shown = $0()($d[8]);
    const started = $1().setTimeout(() => {
      if ($2()()) {
        {
          shown.set($d[9]);
        }
      }
    }, $d[0]);
    return memo(() =>
      shown.get()
        ? element($d[11], [], () => $d[10])
        : element($d[13], [], () => $d[12]),
    );
  };
  return f1(
    () => state,
    () => ($0) =>
      f2(
        () => state,
        () => window,
        () => $0.again(),
      ),
  );
};
