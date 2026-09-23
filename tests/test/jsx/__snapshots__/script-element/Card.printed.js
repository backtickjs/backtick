export default ($d) => {
  const f1 = ($0) => {
    const label = $0()($d[0]);
    const row = (size) => {
      const css = $d[1] + size + $d[2];
      const press = () => label.set($d[3]);
      return element($d[10], [[$d[4], () => css, false]], () => [
        element(
          $d[7],
          [
            [$d[4], () => css, false],
            [$d[5], () => () => label.set($d[6]), true],
          ],
          () => () => label.get(),
        ),
        element($d[7], [[$d[4], () => $d[8], true]], () => $d[9]),
        element(
          $d[7],
          [
            [$d[4], () => css, false],
            [$d[5], () => press, false],
          ],
          () => $d[3],
        ),
      ]);
    };
    return element(
      $d[10],
      [[$d[4], () => $d[11], true]],
      () => () => row($d[12]),
    );
  };
  return component(() => f1(() => state), []);
};
