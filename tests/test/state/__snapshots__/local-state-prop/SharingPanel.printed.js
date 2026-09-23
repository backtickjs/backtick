export default ($d) => {
  const f1 = ($0, $1) => {
    const size = $0()($d[0]);
    return element($d[2], [], () => [
      memo(() => component($1(), [[$d[1], () => () => size]])),
      memo(() => component($1(), [[$d[1], () => () => size]])),
    ]);
  };
  const f2 = ($0) => $d[3] + $0().get() + $d[4];
  const f3 = ($0) => () => {
    $0().set($0().get() + $d[5]);
  };
  return component(
    () =>
      f1(
        () => state,
        () => ($0) =>
          element(
            $d[9],
            [
              [$d[6], () => f2(() => $0.size()), false],
              [$d[7], () => f3(() => $0.size()), false],
            ],
            () => $d[8],
          ),
      ),
    [],
  );
};
