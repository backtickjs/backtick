export default ($d) => {
  const f1 = ($0, $1) => {
    const selected = $0()($d[0]);
    return element($d[7], [], () => [
      element(
        $d[4],
        [[$d[1], () => () => selected.set($d[2]), true]],
        () => $d[3],
      ),
      memo(() =>
        component($1(), [
          [$d[5], () => () => $d[0]],
          [$d[6], () => () => selected],
        ]),
      ),
      memo(() =>
        component($1(), [
          [$d[5], () => () => $d[2]],
          [$d[6], () => () => selected],
        ]),
      ),
    ]);
  };
  const f2 = ($0, $1) =>
    $d[8] + ($0().get() === $1() ? $d[9] : $d[10]) + $d[11];
  const f3 = ($0, $1) => $d[12] + $0() + $d[13] + $1().get();
  const f4 = ($0, $1, $2) => ($0().get() === $1() ? $2() : null);
  return component(
    () =>
      f1(
        () => state,
        () => ($0) =>
          element($d[7], [], () => [
            element(
              $d[4],
              [
                [
                  $d[14],
                  () =>
                    f2(
                      () => $0.selected(),
                      () => $0.id(),
                    ),
                  false,
                ],
              ],
              () => () =>
                f3(
                  () => $0.id(),
                  () => $0.selected(),
                ),
            ),
            memo(() =>
              f4(
                () => $0.selected(),
                () => $0.id(),
                () => element($d[4], [], () => $d[15]),
              ),
            ),
          ]),
      ),
    [],
  );
};
